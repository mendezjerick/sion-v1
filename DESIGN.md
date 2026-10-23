# Sion visual system

## World

Sion is a dark computer-vision lab workbench shaped by a boxed reference manual and transparent acetate sheets. The manual supplies type, density, palette, and a signature tab rail; standard web controls keep the app familiar and operational.

## Palette

- `--void` `#05080C`: app ground and strongest contrast field
- `--shell` `#080D13`: shell surface
- `--rail` `#0B1219`: activity rail
- `--panel` `#0F171E`: working surface
- `--panel-2` `#121C24`: input and control surface
- `--ink` `#EEF6F8`: primary text
- `--ink-dim` `#A0B0B7`: secondary text
- `--ink-faint` `#65757E`: metadata and quiet labels
- `--cyan` `#57E8FF`: active state, focus, primary action, output emphasis
- `--cyan-strong` `#18C9E7`: stronger interaction accent
- `--green` `#90E8AE`: browser runtime ready state
- `--amber` `#F5C56A`: guided or model-dependent state
- `--red` `#FF7F83`: reserved for errors and critical notices

Color has semantic jobs: cyan means selected or executable, green means local runtime readiness, amber means a documented handoff, and red is reserved for failure.

## Type

- Display: Barlow Condensed, uppercase, used for activity titles and bench headings.
- Body: Manrope, used for readable explanations and UI labels.
- Data: IBM Plex Mono, used for metadata, code, thresholds, and source markers.

## Composition

The app uses a fixed activity rail on desktop and a horizontally scrollable activity rail on small screens. The workspace uses a brief panel beside an active bench. The stepped tab rail and `LAB ACTIVITY 01 / ...` markers are the primary wayfinding devices.

## Signature move

The current module reads like a lifted acetate sheet: a thin cyan top edge, transparent dark working surface, and tab-like activity navigation. The signature is restrained so it supports the task instead of turning the app into a costume manual.

## Interaction states

Every interactive control has a visible focus ring. Active activity tabs and active method tabs use cyan. Browser demos use green readiness; guided/model-dependent activities use amber or quiet gray labels. Run actions trigger one short scan pulse around the output stage.

## Responsive behavior

At `1060px`, the brief moves above the bench. At `720px`, the activity rail becomes a horizontal scroll strip, the workspace stacks, output cards become one column, and dense metadata reduces to two-column stat cells.

## Accessibility

Semantic landmarks, real buttons, labeled inputs, keyboard focus, reduced-motion handling, and explicit text for browser-only/model-dependent limits are part of the visual system.
