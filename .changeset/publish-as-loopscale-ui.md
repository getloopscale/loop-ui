---
"@loopscale/ui": minor
---

The package is now published as `@loopscale/ui`.

Install `@loopscale/ui` and change every import and stylesheet path to the new name; the exports and
subpaths are otherwise the same. Three names a consumer may have written by hand changed with it:

- the control sizing variables are `--loopscale-control-h` and `--loopscale-control-px`;
- the Tailwind preset is exported as `loopscaleUIPreset`;
- the copy-paste registry is served from `https://getloopscale.github.io/ui/r/`.

The previous names are no longer read, so an app that overrides the control height has to rename
the variable when it upgrades.
