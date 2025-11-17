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

echo -e "${BLUE}Current version in package.json:${NC} ${GREEN}$CURRENT_VERSION${NC}"

# Check if we're on a clean working tree
if [[ -n $(git status -s) ]]; then
  echo -e "${YELLOW}Warning: You have uncommitted changes.${NC}"
fi

# Fetch latest tags from remote
echo -e "\n${BLUE}Fetching latest tags from remote...${NC}"
git fetch --tags

# Check if tag already exists locally or remotely
if git rev-parse "$CURRENT_VERSION" >/dev/null 2>&1; then
  echo -e "${RED}Error: Tag '$CURRENT_VERSION' already exists!${NC}"
  echo -e "${YELLOW}Please update the version in package.json before creating a new release.${NC}"
  echo -e "${YELLOW}Current version: $CURRENT_VERSION${NC}"
  exit 1
fi

# Get the latest tag (if any)
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null)

if [ -n "$LATEST_TAG" ]; then
  echo -e "${BLUE}Latest existing tag:${NC} ${YELLOW}$LATEST_TAG${NC}"

  # Compare versions
  if [ "$LATEST_TAG" = "$CURRENT_VERSION" ]; then
    echo -e "${RED}Error: Latest tag matches current version ($CURRENT_VERSION)${NC}"
    echo -e "${YELLOW}Please update the version in package.json before creating a new release.${NC}"
    exit 1
  fi
else
  echo -e "${YELLOW}No existing tags found. This will be the first release.${NC}"
fi

# Get release description from user
echo -e "\n${BLUE}Enter release description (optional, press Enter to skip):${NC}"
read -r RELEASE_DESCRIPTION

if [ -z "$RELEASE_DESCRIPTION" ]; then
  RELEASE_DESCRIPTION="Release $CURRENT_VERSION"
fi

# Create annotated tag with description
echo -e "\n${BLUE}Creating tag '$CURRENT_VERSION'...${NC}"
git tag -a "$CURRENT_VERSION" -m "$RELEASE_DESCRIPTION"

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Failed to create tag${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Tag created successfully${NC}"

# Push tag to remote
echo -e "\n${BLUE}Pushing tag to remote...${NC}"
git push origin "$CURRENT_VERSION"

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Failed to push tag${NC}"
  echo -e "${YELLOW}Tag was created locally. You can try pushing manually:${NC}"
  echo -e "  git push origin $CURRENT_VERSION"
  exit 1
fi

echo -e "\n${GREEN}✓ Tag pushed successfully!${NC}"
echo -e "${BLUE}GitHub Actions will now build and deploy version $CURRENT_VERSION${NC}"
echo -e "${BLUE}Check the progress at:${NC} https://github.com/Vikeo/LifeTrinket/actions"
