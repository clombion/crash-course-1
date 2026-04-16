#!/bin/bash
# Script to publish a Geodata Visualizer instance to a unique URL on GitHub Pages

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <folder_name> <html_file_path>"
    exit 1
fi

FOLDER_NAME=$1
HTML_FILE=$2

# Create directory
mkdir -p "$FOLDER_NAME"

# Copy HTML to index.html in that directory
cp "$HTML_FILE" "$FOLDER_NAME/index.html"

# Git operations
git add "$FOLDER_NAME/index.html"
git commit -m "feat: publish geodata visualizer to $FOLDER_NAME"
git push origin main

echo "Successfully published to GitHub Pages at: /$FOLDER_NAME/"
