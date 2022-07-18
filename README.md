# Types for webxdc

When you develop a [webxdc app](https://webxdc.org), you use the [webxdc
API](https://docs.webxdc.org/spec.html) to communicate with other instances of
the same webxdc application.

The API is available on `window.webxdc`.

When you develop your webxdc app in TypeScript, it's handy to have proper
types for this API. This library provides those types for you.

## Usage

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
import { WebXdc } from "./webxdc";

declare global {
  interface Window {
    webxdc: WebXdc<Payload>;
  }
}
```

Now `window.webxdc` should be fully typed.
