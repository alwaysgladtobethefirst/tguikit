# Changesets

This folder is managed by [changesets](https://github.com/changesets/changesets).

Every PR that changes published behaviour needs a changeset. Add one with:

```bash
bunx changeset
```

Pick the bump (patch / minor / major) and write a one-line summary — it becomes the changelog entry. The release workflow collects pending changesets into a "Version Packages" PR; merging that bumps the version, updates `CHANGELOG.md`, and publishes to npm.

[Detailed docs.](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md)
