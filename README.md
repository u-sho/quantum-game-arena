# Quantum Game Arena

![Quantum Game Arena](https://github.com/user-attachments/assets/c67841ea-cecc-485c-b372-b7c45ac61429)

Quantum Game Arena is a online game arena that allows you to play the "Quantum Games" without registration.
Quantum Games incorporate fundamental concepts of quantum mechanics.
You can enjoy the complexity of the quantum games.

powered by [`SvelteKit`](https://svelte.dev/docs/kit);

## Developing

Once you've created a project and installed dependencies with `npm instal`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Format & Lint

Please exec formatter & linter before commit.

```bash
# check format
npm run format:dry

# fix format
npm run format

# check lint
npm run lint:dry

# fix lint
npm run lint
```

## Typecheck

```sh
npm run check
```

## Test

### Unit Test

We use Vitest to unit test.
Vitest reports coverage to ./coverage folder.

```sh
npm run test
```

## Component Naming

1. **Single-file component filename casing**: filenames of single-file components should be always PascalCase.
1. **Base component names**: base components (a.k.a. presentational, dumb, or pure components) that apply app-specific styling and conventions should all begin with `App` prefix.
1. **Tightly coupled component names**: child components that are tightly coupled with their parent should include the parent component name as a prefix.
1. **Order of words in component names**: component names should start with the highest-level (often most general) words and end with descriptive modifying words.
1. **Full-word component names**: component names should prefer full words over abbreviations.

The above list is a little bit customized a part of [Vue.js Style Guide](https://vuejs.org/style-guide/)
