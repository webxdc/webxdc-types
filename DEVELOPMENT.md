## Development

### How is the spec developed?

This follows the spec in https://github.com/webxdc/webxdc_docs, api changes are discussed in the forum or over there unless it is only about these typings.

### Release Workflow

You can create a new npm release automatically by doing the following on the
`main` branch:

```shell
npm version patch  # or minor, major, etc
git push --follow-tags
```

[`npm version`](https://docs.npmjs.com/cli/v8/commands/npm-version) updates the
version number automatically and also puts the latest date in `CHANGELOG.md`.
You then need to push using `--follow-tags` (**NOT** `--tags`).
Though you should write what you changed under unreleased before, because the changelog writing is still manual.

The release process is done through a github action defined in
`.workflows/publish.yml` which publishes to the npm registry automatically.
