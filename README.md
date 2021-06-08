# Quantum Game Arena

powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

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
# check & fix format
npm run format

# check format & lint
npm run lint

# fix lint
npm run lint --fix
```

## Component Naming

1. **Single-file component filename casing**: filenames of single-file components should be always PascalCase.
1. **Base component names**: base components (a.k.a. presentational, dumb, or pure components) that apply app-specific styling and conventions should all begin with `App` prefix.
1. **Single-instance component names**: components that should only ever have a single active instance should begin with the `The` prefix, to denote that there can be only one. (This does not mean the component is only used in a single page, but it will only be used once per page.)
1. **Tightly coupled component names**: child components that are tightly coupled with their parent should include the parent component name as a prefix.
1. **Order of words in component names**: component names should start with the highest-level (often most general) words and end with descriptive modifying words.
1. **Full-word component names**: component names should prefer full words over abbreviations.

The above list is a little bit customized a part of [Vue.js Style Guide](https://v3.vuejs.org/style-guide/)
