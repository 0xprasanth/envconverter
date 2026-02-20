# Env Parser CLI

A CLI tool to convert `.env` files into formats that can be easily pasted into Google Sheets, Excel, or other tools.

## Features

- Parse `.env` files
- Output as CSV, TSV, JSON, or Markdown table
- Works globally from any directory
- Simple and lightweight
- No external dependencies

---

## Usage

Run directly using npx:

```bash
npx envparser <input-file> [output-file] [options]
```

## Options
```
-h, --help           Show help
-v, --version        Show version
-f, --format <type>  Output format: csv | tsv | json | md
                     Default: csv
```

## Examples

Print CSV to console:
```
npx envparser .env
```

## Save CSV to file:
```
npx envparser .env output.csv
```

## Generate TSV for Google Sheets:
```
npx envparser .env --format tsv
```

## Generate JSON:
```
npx envparser .env config.json --format json
```

## Generate Markdown table:

```
npx envparser .env --format md
```

## Example Input

`.env`
```
PORT=3000
DB_URL="mongodb://localhost:27017/test"
JWT_SECRET=supersecret
```

## Example Output (CSV)
```
KEY,VALUE
PORT,3000
DB_URL,mongodb://localhost:27017/test
JWT_SECRET,supersecret
```

## Google Sheets Tip

Use TSV format for direct paste without column splitting:
```
npx envparser .env --format tsv
```