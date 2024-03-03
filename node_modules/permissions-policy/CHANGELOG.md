# Changelog

## 0.6.0 - 2021-04-19

### Changed

- Removed restrictions on which directives can be set, any key is allowed.
- Added interest-cohort to the documentation.

## 0.5.0 - 2021-04-14

### Added

- Added support for interest-cohort policy.
- Change compilation target to ES6.

## 0.4.0 - 2021-03-2

### Added

- Prettier configuration to auto format the code
- Usage of Readonly on the user configuration feeded into the PermissionsPolicy function.
- Usage of Record to declare the types of keys and objects when useful.

### Changed

- Updated dependencies to their latest version.

## 0.3.0 - 2020-11-22

### Changed

- Fixed an issue in the unit tests.

## 0.2.0 - 2020-09-27

### Added

- Features support empty arrays to indicate that the specific feature should be disable in every case.

### Changed

- **BREAKING-CHANGE** Removed support for Node < 10.

## 0.1.1 - 2020-09-25

### Changed

- Fixed the readme typos.

## 0.1.0 - 2020-09-25

### Added

- Initial release containing all the adaptations of the [Feature Policy](https://github.com/helmetjs/feature-policy) project to support the new `Permissions-Policy` header.

### Changed

- If you're migrating from the [Feature Policy](https://github.com/helmetjs/feature-policy) repo make note that for now on the reserved keywords don't need to be quoted but the specific feature values must be.
- Added errors to safeguard the usage with the newest changes.
- Reviewed all the tests.
