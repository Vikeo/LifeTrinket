#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== LifeTrinket Release Script ===${NC}\n"

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")

if [ -z "$CURRENT_VERSION" ]; then
  echo -e "${RED}Error: Could not read version from package.json${NC}"
  exit 1
fi

echo -e "${BLUE}Current version:${NC} ${GREEN}$CURRENT_VERSION${NC}"

# Check if we're on a clean working tree
if [[ -n $(git status -s) ]]; then
  echo -e "${RED}Error: You have uncommitted changes. Please commit or stash them first.${NC}"
  exit 1
fi

# Fetch latest tags from remote
echo -e "\n${BLUE}Fetching latest tags from remote...${NC}"
git fetch --tags

# Prompt for version bump type
echo -e "\n${BLUE}Select version bump type:${NC}"
echo -e "  1) patch (${CURRENT_VERSION} → x.x.+1)"
echo -e "  2) minor (${CURRENT_VERSION} → x.+1.0)"
echo -e "  3) major (${CURRENT_VERSION} → +1.0.0)"
echo -e "  4) custom"
read -rp "Choice [1]: " BUMP_CHOICE
BUMP_CHOICE=${BUMP_CHOICE:-1}

# Parse current version
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

case "$BUMP_CHOICE" in
  1) NEW_VERSION="$MAJOR.$MINOR.$((PATCH + 1))" ;;
  2) NEW_VERSION="$MAJOR.$((MINOR + 1)).0" ;;
  3) NEW_VERSION="$((MAJOR + 1)).0.0" ;;
  4)
    read -rp "Enter new version: " NEW_VERSION
    if [[ ! "$NEW_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
      echo -e "${RED}Error: Invalid version format. Expected x.y.z${NC}"
      exit 1
    fi
    ;;
  *)
    echo -e "${RED}Error: Invalid choice${NC}"
    exit 1
    ;;
esac

echo -e "\n${BLUE}Version bump:${NC} ${YELLOW}$CURRENT_VERSION${NC} → ${GREEN}$NEW_VERSION${NC}"

# Check if tag already exists
if git rev-parse "$NEW_VERSION" >/dev/null 2>&1; then
  echo -e "${RED}Error: Tag '$NEW_VERSION' already exists!${NC}"
  exit 1
fi

# Get release description from user
echo -e "\n${BLUE}Enter release description (optional, press Enter to skip):${NC}"
read -r RELEASE_DESCRIPTION

if [ -z "$RELEASE_DESCRIPTION" ]; then
  RELEASE_DESCRIPTION="Release $NEW_VERSION"
fi

# Bump version in package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
pkg.version = '$NEW_VERSION';
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n');
"

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Failed to update package.json${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Updated package.json to $NEW_VERSION${NC}"

# Commit the version bump
git add package.json
git commit -m "$NEW_VERSION"

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Failed to commit version bump${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Committed version bump${NC}"

# Create annotated tag with description
echo -e "\n${BLUE}Creating tag '$NEW_VERSION'...${NC}"
git tag -a "$NEW_VERSION" -m "$RELEASE_DESCRIPTION"

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Failed to create tag${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Tag created successfully${NC}"

# Push commit and tag to remote
echo -e "\n${BLUE}Pushing to remote...${NC}"
git push && git push origin "$NEW_VERSION"

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Failed to push${NC}"
  echo -e "${YELLOW}Commit and tag were created locally. You can try pushing manually:${NC}"
  echo -e "  git push && git push origin $NEW_VERSION"
  exit 1
fi

echo -e "\n${GREEN}✓ Release $NEW_VERSION pushed successfully!${NC}"
echo -e "${BLUE}GitHub Actions will now build and deploy version $NEW_VERSION${NC}"
echo -e "${BLUE}Check the progress at:${NC} https://github.com/Vikeo/LifeTrinket/actions"
