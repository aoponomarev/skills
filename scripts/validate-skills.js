const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "skills");
const SKILLS_DIRS = ["architecture", "core-systems", "process", "protocols", "libs", "security"];

const REQUIRED_FRONTMATTER = ["id", "title", "scope", "tags", "priority", "created_at", "updated_at"];
const REQUIRED_SECTIONS = ["Overview", "Steps", "Validation"];

let errorsCount = 0;

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const fileName = path.basename(filePath);
  const relativePath = path.relative(path.resolve(__dirname, ".."), filePath);

  // 1. Check YAML Front-matter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    console.error(`[ERROR] ${relativePath}: Missing YAML front-matter`);
    errorsCount++;
    return;
  }

  const fmContent = fmMatch[1];
  REQUIRED_FRONTMATTER.forEach((field) => {
    if (!fmContent.includes(`${field}:`)) {
      console.error(`[ERROR] ${relativePath}: Missing field "${field}" in front-matter`);
      errorsCount++;
    }
  });

  // 2. Check Required Sections
  REQUIRED_SECTIONS.forEach((section) => {
    const sectionRegex = new RegExp(`^#+\\s+${section}`, "m");
    if (!sectionRegex.test(content)) {
      console.error(`[ERROR] ${relativePath}: Missing required section "${section}"`);
      errorsCount++;
    }
  });

  // 3. Check Header Title
  if (!content.match(/^#\s+.+$/m)) {
    console.error(`[ERROR] ${relativePath}: Missing H1 title`);
    errorsCount++;
  }
}

function walkDir(dir) {
  const fullDir = path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) return;

  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".md"));
  files.forEach((file) => {
    validateFile(path.join(fullDir, file));
  });
}

console.log("Starting Skills validation...");
SKILLS_DIRS.forEach(walkDir);

if (errorsCount > 0) {
  console.log(`\nValidation failed with ${errorsCount} errors.`);
  process.exit(1);
} else {
  console.log("\nValidation successful. All skills follow the standard.");
}
