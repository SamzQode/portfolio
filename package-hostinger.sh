#!/bin/bash
# Create a zip ready to upload to Hostinger public_html
set -e
cd "$(dirname "$0")"

OUT="portfolio-deploy.zip"
rm -f "$OUT"

zip -r "$OUT" \
  admin \
  content \
  css \
  images \
  js \
  index.html \
  projects.html \
  lab.html \
  -x "*.DS_Store" -x "*/node_modules/*"

echo ""
echo "Created: $(pwd)/$OUT"
echo "Upload to Hostinger → File Manager → public_html → Extract (or upload files)"
echo "Skip node_modules and .git — not needed on Hostinger."
