# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

The `unreleased` heading is updated automatically to the right version and
release date when you use `npm version` (see `README.md`).

## [Unreleased]

## [2.2.0][] - 2026-06-25

### Changed

- **BREAKING**: make `Webxdc.sendUpdateInterval`, `Webxdc.sendUpdateMaxSize` and
  `Webxdc.joinRealtimeChannel` optional, matching the spec. The messaging layer
  only `SHOULD` expose `sendUpdateInterval`/`sendUpdateMaxSize` (apps assume
  defaults of `10000`/`128000` when absent), and `joinRealtimeChannel` is
  experimental and may not be implemented by every webxdc host environment.

  If you get type errors because of this change, these indicate real possible
  issues in the portability of your webxdc code that you can fix.

## [2.1.2][] - 2024-11-27

### Fixed

- fix `RealtimeListener` interface, don't declare internal private methods

## [2.1.1][] - 2024-11-27

### Fixed

- add missing fields to `SendingStatusUpdate`

## [2.1.0][] - 2024-11-27

### Added

- `ReceivedStatusUpdate.href` API
- `ReceivedStatusUpdate.notify` API
- `Webxdc.sendUpdateInterval` API
- `Webxdc.sendUpdateMaxSize` API
- deprecate `description` parameter in `Webxdc.sendUpdate()`

## [2.0.0][] - 2024-11-15

### Changed

- package renamed to `@webxdc/types`

## [1.1.0] - 2023-04-22

### Added

- Realtime data API

### Changed

- clarify what `T` is

## [1.0.1] - 2023-10-19

### Fixed

- add dummy js files, because vite complained that it did not found the code, see #5

## [1.0.0] - 2023-10-11

### Added

- Release process is now documented in `DEVELOPMENT.md`
- Add documentation of different uses of this package to readme

### Changed

- updated to the newest definitions from webxdc docs, as this repo should now become the source of truth for the typescript bindings. 

## [0.1.0] - 2022-07-18

### Changed

- Fix import in README

## [0.0.3] - 2022-07-18

Initial public release.


[Unreleased]: https://github.com/webxdc/webxdc-types/compare/v2.2.0...HEAD
[2.2.0]: https://github.com/webxdc/webxdc-types/compare/v2.1.2...v2.2.0
[2.1.2]: https://github.com/webxdc/webxdc-types/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/webxdc/webxdc-types/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/webxdc/webxdc-types/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/webxdc/webxdc-types/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/webxdc/webxdc-types/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/webxdc/webxdc-types/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/webxdc/webxdc-types/tree/v1.0.0
[0.1.0]: https://github.com/webxdc/webxdc-types/tree/v0.1.0
[0.0.3]: https://github.com/webxdc/webxdc-types/tree/v0.0.3
