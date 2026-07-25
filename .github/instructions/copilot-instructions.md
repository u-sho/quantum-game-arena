# Copilot Instructions

This repository is built with Svelte 5 + SvelteKit + TypeScript. Please follow the below rules.

## Must

- Use Svelte 5 runes in components (`$state`, `$derived`, `$effect`, `$props`). Don't use legacy `$:` reactive statements.
- Prefer TypeScript in `<script lang="ts">`. No JS blocks.
- Use `$lib/*` for internal imports. Don't import via `../` or `src/lib/*`.
- Follow component naming rules
  - PascalCase
  - `App` prefix for base components
  - parent-name prefix for tight coupling
  - full words
- Keep lint/typecheck/test green. Assume CI runs: `npm run ci`

## State & stores

- 共有が必要になるまで `$state` を優先。
- 共有が必要なら `src/lib/stores` に store を置き、API は最小限
- コンポーネントから store 値を直接 mutation しない。setter かメソッド経由。

## Quality gates

- テストは Vitest。振る舞いが変わるならテストを追加/更新。

## Avoid

- Do not use `any`; prefer exact types.
- Do not add inline styles unless existing code requires it.
