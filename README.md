# Types for webxdc

When you develop a [webxdc app](https://webxdc.org), you use the [webxdc
API](https://docs.webxdc.org/spec.html) to communicate with other instances of
the same webxdc application.

The API is available on `window.webxdc`.

When you develop your webxdc app in TypeScript, it's handy to have proper
types for this API. This library provides those types for you.

## Usage

You can install this using:

```shell
npm install -D webxdc-types
```

You should have a type that describes your webxdc payload structure in use
by your application:

```typescript
type Payload = {
  label: string;
  value: number;
};
```

Once you have a `Payload` type, you can declare the type of `window.webxdc` in
your application:

```typescript
import { WebXdc } from "webxdc-types";

declare global {
  interface Window {
    webxdc: WebXdc<Payload>;
  }
}
```

Now `window.webxdc` should be fully typed.

## Development

You can create a new npm release automatically by doing the following on the
`main` branch:

```shell
npm version patch  # or minor, major, etc
git push --follow-tags
```

[`npm version`](https://docs.npmjs.com/cli/v8/commands/npm-version) updates the
version number automatically and also puts the latest date in `CHANGELOG.md`.
You then need to push using `--follow-tags` (**NOT** `--tags`).

The release process is done through a github action defined in
`.workflows/publish.yml` which publishes to the npm registry automatically.
