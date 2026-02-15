# Copilot Instructions (Svelte 5)

This repo uses Svelte 5 + SvelteKit + TypeScript. Follow these rules strictly.
このリポジトリは Svelte 5 + SvelteKit + TypeScript です。以下のルールを厳守してください。

## Must (必須)

- Use Svelte 5 runes in components (`$state`, `$derived`, `$effect`, `$props`). Do not use legacy `$:` reactive statements unless required by existing code.
- Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`) を使う。既存コードの要請がない限り `$:` は使わない。
- Prefer TypeScript in `<script lang="ts">`. No JS blocks.
- `<script lang="ts">` を優先し、JS ブロックは使わない。
- Use `$lib/*` for internal imports. Do not import via `../` or `src/lib/*`.
- 内部 import は `$lib/*` を使う。`../` や `src/lib/*` は使わない。
- Follow component naming rules (PascalCase, `App` prefix for base components, parent-name prefix for tight coupling, full words).
- コンポーネント命名規則を守る（PascalCase、ベースは `App` 接頭辞、親子は親名接頭辞、略語より完全な単語）。
- Keep lint/typecheck/test green. Assume CI runs: format check, lint, Svelte typecheck, Vitest.
- CI は format check / lint / Svelte typecheck / Vitest を実行する前提で変更する。

## Svelte 5 runes (Svelte 5 ルーン)

- Use `$props` to read props; avoid destructuring props outside `$props`.
- props の読み取りは `$props` を使い、`$props` 外での分割代入は避ける。
- Use `$state` for local mutable state; keep it minimal and component-scoped.
- ローカルの可変状態は `$state` を使い、最小限かつコンポーネント内に閉じる。
- Use `$derived` for computed values; do not mutate inside `$derived`.
- 計算値は `$derived` を使い、`$derived` 内での mutation は禁止。
- Use `$effect` only for side effects; do not cause state loops.
- 副作用は `$effect` のみ。状態ループを作らない。

## State & stores (状態管理とストア)

- Prefer component-local `$state` unless state is shared across routes/components.
- 共有が必要になるまで `$state` を優先。
- When shared, use a store in `src/lib/stores` and keep API minimal.
- 共有が必要なら `src/lib/stores` に store を置き、API は最小限。
- Do not mutate store values directly in components; use store methods or setters.
- コンポーネントから store 値を直接 mutation しない。setter かメソッド経由。

## SvelteKit routing (SvelteKit ルーティング)

- Use SvelteKit file-based routing (`+page.svelte`, `+layout.svelte`, `+page.ts`).
- SvelteKit のファイルベースルーティングを使う（`+page.svelte` 等）。

## Quality gates (品質ゲート)

- Do not introduce lint rule violations (ESLint + Svelte rules apply).
- ESLint/Svelte のルール違反を入れない。
- Ensure TypeScript explicit return types for functions you add.
- 追加する関数は明示的に返り値型を付ける。
- Tests use Vitest. Add/adjust tests if behavior changes.
- テストは Vitest。振る舞いが変わるならテストを追加/更新。

## Avoid (禁止)

- Do not use `any` without a clear reason; prefer exact types.
- 明確な理由がない `any` は禁止。正確な型を使う。
- Do not add inline styles unless existing code requires it.
- 既存コードの要請がない限り inline style を追加しない。
- Do not add new abbreviations in names.
- 新しい略語命名は禁止。
