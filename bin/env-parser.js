#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function parseEnv(content) {
  const lines = content.split("\n");
  const result = [];

  for (let line of lines) {
    line = line.trim();

    // Skip empty lines and comments
    if (!line || line.startsWith("#")) continue;

    const equalIndex = line.indexOf("=");
    if (equalIndex === -1) continue;

    const key = line.slice(0, equalIndex).trim();
    let value = line.slice(equalIndex + 1).trim();

    // Remove surrounding quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result.push({ key, value });
  }

  return result;
}

function toCSV(data) {
  const header = "KEY,VALUE\n";
  const rows = data
    .map(({ key, value }) => `${key},${value}`)
    .join("\n");

  return header + rows;
}

function main() {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];

  if (!inputPath) {
    console.error("❌ Please provide input .env file path");
    process.exit(1);
  }

  const absolutePath = path.resolve(process.cwd(), inputPath);

  if (!fs.existsSync(absolutePath)) {
    console.error("❌ File not found:", absolutePath);
    process.exit(1);
  }

  const content = fs.readFileSync(absolutePath, "utf8");
  const parsed = parseEnv(content);
  const csv = toCSV(parsed);

  if (outputPath) {
    const outputAbsolute = path.resolve(process.cwd(), outputPath);
    fs.writeFileSync(outputAbsolute, csv);
    console.log("✅ CSV written to:", outputAbsolute);
  } else {
    console.log(csv);
  }
}

main();