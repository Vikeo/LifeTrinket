# Release Scripts

## create-release.sh

This script automates the process of creating a new release for LifeTrinket.

### Usage

```bash
npm run release
# or
pnpm release
# or
bash scripts/create-release.sh
```

### What it does

1. **Reads the current version** from `package.json`
2. **Checks for existing tags** - If a tag with the current version already exists, it will prompt you to update the version in `package.json` first
3. **Warns about uncommitted changes** - Prompts for confirmation if you have uncommitted changes
4. **Prompts for release description** - You can enter a multi-line description for the release
5. **Creates an annotated git tag** with the version and description
6. **Pushes the tag to remote** - This triggers the GitHub Actions workflow that builds and deploys the app

### Workflow

When you push a tag, the following happens:

1. The `firebase-release.yml` workflow is triggered
2. The app is built and deployed to Firebase Hosting
3. A GitHub release is created with the version number

### Before running

Make sure to:

1. **Update the version** in `package.json` if needed
2. **Commit all changes** you want to include in the release
3. **Test the build** with `npm run build` to ensure everything works

### Example

```bash
# 1. Update version in package.json to 1.0.3
# 2. Commit your changes
git add .
git commit -m "feat: add new features for v1.0.3"

# 3. Run the release script
npm run release

# The script will:
# - Show current version: 1.0.3
# - Prompt for confirmation
# - Ask for release description
# - Create and push the tag
# - Trigger the deployment workflow
```

### Troubleshooting

**"Tag already exists" error:**

- Update the version in `package.json` before creating a new release

**"Failed to push tag" error:**

- Check your git remote permissions
- Try pushing manually: `git push origin <version>`

**Script won't run:**

- Make sure the script is executable: `chmod +x scripts/create-release.sh`
