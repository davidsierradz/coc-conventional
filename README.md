# coc-conventional

[![npm version](https://badge.fury.io/js/coc-conventional.svg)](https://badge.fury.io/js/coc-conventional)

Completes types (with `@commitlint/config-conventional`) and scopes (with `lerna`).

## Install

`:CocInstall coc-conventional`

## Usage

This extension will start when you edit a commit (`:set filetype gitcommit`) and follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

[![asciicast](https://asciinema.org/a/mkyOnWbbQjJLIoLP1IrzXzpUE.svg)](https://asciinema.org/a/mkyOnWbbQjJLIoLP1IrzXzpUE)

## Settings

```json
{
  "coc-conventional.enabled": {
    "type": "boolean",
    "default": true,
    "description": "Enable coc-conventional extension"
  },
  "coc-conventional.enableLernaScopes": {
    "type": "boolean",
    "default": false,
    "description": "Enable Lerna scopes completion"
  }
}
```

## License

MIT

---

> This extension is created by [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
