#!/bin/bash
# Push portfolio to github.com/SamzQode/portfolio
# Run after logging in: gh auth login --hostname github.com --web

set -e
cd "$(dirname "$0")"

ACCOUNT=$(gh api user --jq '.login' 2>/dev/null || echo "unknown")
if [ "$ACCOUNT" != "SamzQode" ]; then
  echo "Current GitHub account: $ACCOUNT"
  echo "Please log in as SamzQode first:"
  echo "  gh auth login --hostname github.com --web"
  exit 1
fi

gh repo create SamzQode/portfolio --public --description "Personal portfolio site — Samz Qode" --source=. --remote=origin --push

echo ""
echo "Done: https://github.com/SamzQode/portfolio"
