const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "skills");
const INDEX_DIR = path.join(ROOT, "index");

const INDEXES = [
  {
    file: "index-architecture.md",
    title: "Index: Architecture Skills",
    subtitle: "Навигационный индекс по архитектурным skills",
    sections: [
      { title: "Architecture", dir: "architecture" },
      { title: "Core Systems", dir: "core-systems" },
    ],
    related: [
      { label: "index-operations", href: "./index-operations.md", note: "Операционные skills" },
    ],
  },
  {
    file: "index-operations.md",
    title: "Index: Operations Skills",
    subtitle: "Навигационный индекс по операционным skills",
    sections: [
      { title: "Process", dir: "process" },
      { title: "Protocols", dir: "protocols" },
      { title: "Libraries", dir: "libs" },
    ],
    related: [
      { label: "index-architecture", href: "./index-architecture.md", note: "Архитектурные skills" },
    ],
  },
];

function readTitle(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^#\s+(.+)$/m);
  if (match) return match[1].trim();
  return path.basename(filePath, ".md");
}

function listMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".md"))
    .filter((file) => !file.startsWith("index-"))
    .sort((a, b) => a.localeCompare(b, "ru"));
}

function renderIndex(def) {
  const lines = [];
  lines.push(`# ${def.title}`);
  lines.push("");
  lines.push(`> ${def.subtitle}`);
  lines.push("");

  def.sections.forEach((section) => {
    const sectionDir = path.join(ROOT, section.dir);
    const files = listMarkdownFiles(sectionDir);
    lines.push(`## ${section.title}`);
    lines.push("");
    if (files.length === 0) {
      lines.push("- _Пока нет skills_");
      lines.push("");
      return;
    }
    files.forEach((file) => {
      const fullPath = path.join(sectionDir, file);
      const title = readTitle(fullPath);
      const rel = `../${section.dir}/${file}`;
      lines.push(`- [\`${title}\`](${rel})`);
    });
    lines.push("");
  });

  if (def.related && def.related.length > 0) {
    lines.push("## Related Indexes");
    lines.push("");
    def.related.forEach((item) => {
      lines.push(`- [\`${item.label}\`](${item.href}) - ${item.note}`);
    });
    lines.push("");
  }

  return lines.join("\n");
}

function writeIndex(def) {
  const content = renderIndex(def);
  const target = path.join(INDEX_DIR, def.file);
  fs.writeFileSync(target, content, "utf8");
}

INDEXES.forEach(writeIndex);
console.log("Indexes generated.");
