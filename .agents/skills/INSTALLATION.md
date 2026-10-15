# Project-local skill installation

Installed on 2026-10-15 in `/workspace/cinqueh`.

## Scope

- Skills are real project-local copies under `.agents/skills/`; no global skill installation or symlink to a temporary checkout.
- No existing tracked file, application source, application dependency, configuration, or lockfile was modified.
- The application was not redesigned, built, or deployed. No application tests were added.
- Changes are local and uncommitted; nothing was pushed to GitHub.

## Installed entries

| Requested package | Skill entries | Method |
| --- | --- | --- |
| Frontend Design | `frontend-design` | Reviewed skills CLI, Codex, copy mode |
| UI/UX Pro Max | `ui-ux-pro-max` | Reviewed upstream UI/UX CLI, `init --ai codex --offline` |
| Motion Design | `motion-design` | Reviewed skills CLI, Codex, copy mode |
| Web Design Guidelines | `web-design-guidelines` | Reviewed skills CLI, Codex, copy mode |
| Framer Motion Skills | `framer-motion-core`, `framer-motion-react`, `framer-motion-variants`, `framer-motion-scroll`, `framer-motion-gestures`, `framer-motion-layout` | Reviewed skills CLI for five; documented copy method for repaired core |
| Improve UI | `improve-ui` | Reviewed skills CLI, Codex, copy mode; upstream website documents this installation method |

The UI/UX installer additionally bundles six companion entries: `banner-design`, `brand`, `design`, `design-system`, `slides`, and `ui-styling`. These are retained with all bundled supporting resources. There are 17 skill entrypoints in total. The Framer collection index is preserved as `.agents/skills/llms.txt`.

## Installer inspection

- `skills` npm package version: **1.7.2**. Downloaded tarball integrity was checked against npm SHA-512 metadata before inspecting its entrypoint, directory-copy logic, Codex path selection, lockfile writes, telemetry, and dependency metadata.
- `ui-ux-pro-max-cli` npm package version: **2.15.0**. Tarball integrity was checked before inspecting the bundled installer, Codex template, data/script copying, companion copying, global/force switches, and network/legacy paths.
- Executed the reviewed Node entrypoints from `/tmp/cinqueh-skill-installers/` rather than allowing npx to execute an uninspected download.
- Only the skills CLI runtime dependencies were installed, under `/tmp`, with `npm install --ignore-scripts --omit=dev --no-audit --no-fund`. No dependency lifecycle scripts ran. The seven resolved packages were yaml, tar, chownr, minipass, minizlib, yallist, and @isaacs/fs-minipass.
- UI/UX installer dependencies are bundled in its reviewed distribution; no project npm install was performed.
- Skills CLI used `--agent codex --copy --yes`; no `--global` option was used. Telemetry was disabled. Later commands explicitly used the inherited HTTP proxy through Node environment-proxy support.
- Python 3.12.14 was already present. UI/UX search uses the standard library; no Python package was installed.

## Sources inspected

| Repository | Inspected Git commit |
| --- | --- |
| `anthropics/skills` | `dbd4588f9e1033efb41dad4bef2f7947c8993d44` |
| `nextlevelbuilder/ui-ux-pro-max-skill` | `56ea9cf174ed86786187daa9de0e6247cb0747e4` |
| `LottieFiles/motion-design-skill` | `f9a8a041b85185ee4881b3471d3415e939aac772` |
| `vercel-labs/agent-skills` | `063bee94c3f4df8453406c830b0a7df0f2860278` |
| `C-Jeril/framer-motion-skills` | `837d7268fc4a3cf5b1f8904616ec97c7485e3eda` |
| `ibelick/ui-skills` | `91b63e621202b06929acd4e1b0fab663a075641c` |

The UI/UX install is generated from the published npm **2.15.0** bundle, not from the inspected Git checkout; its installed support files were verified against that exact bundle.

## Error repaired

`framer-motion-core/SKILL.md` upstream has an unquoted colon in its description (`Trigger terms: ...`), making its YAML frontmatter invalid. The standard installer skipped that entry and returned exit status 1 while successfully installing the other five Framer entries.

Installed core using the repository’s documented copy method and quoted the description as a JSON-compatible YAML string. The description text and all other lines are unchanged. All 17 frontmatters now parse with nonempty, unique names and descriptions. A future upstream update may require the same fix if the source has not been repaired.

## Verification

- `skills list --agent codex --json` lists all **17** entries in project scope.
- Every entry has valid YAML frontmatter and a name matching its directory. Descriptions are within Codex’s usual 1024-character limit.
- 199 upstream/supporting files were verified byte-for-byte against the inspected sources or published UI/UX bundle; the generated UI/UX entrypoint and the repaired core are the two intentional exceptions. The collection index is also copied unchanged.
- No missing local Markdown resource links were found in the installed packages.
- UI/UX search smoke check passed: `PYTHONDONTWRITEBYTECODE=1 python3 .agents/skills/ui-ux-pro-max/scripts/search.py contrast --domain ux -n 1 --json`.
- All 48 pre-existing tracked project files match their pre-install SHA-256 hashes.

### Native Codex discovery limitation

Attempted the installed Codex app-server’s actual `skills/list` method with `cwds: ["/workspace/cinqueh"]` and `forceReload: true`, without starting a model turn. The app-server failed before initialization because `/run/codex-environment/codex-home` is read-only (SQLite state initialization failure). A retry with state/log directories directed to `/tmp` still failed with `Read-only file system (os error 30)`. Runtime-native discovery could not be confirmed here. The skills CLI and static frontmatter checks succeeded; start or reload Codex with this repository as the working directory to load the project-local entries.

No network or permission blocker prevented the skill installations themselves. Native runtime verification is the remaining environmental limitation. No global configuration was changed to work around it.

## Maintenance notes

`skills-lock.json` contains nine entries written by the skills CLI. The manually repaired Framer core and the seven UI/UX installer entries are recorded here rather than represented as unmodified skills-CLI installs. Refresh UI/UX through its own Codex installer; preserve/recheck the core YAML repair on Framer updates.

Some bundled UI/UX companion documentation retains upstream Claude-specific/global command examples. No such commands were executed or global paths created; adapt those examples to the installed project-local resources when using them. The requested UI/UX main entrypoint correctly names `.agents/skills/ui-ux-pro-max/scripts/search.py`.

## Files added

**204 files added; zero existing project files modified.** This inventory includes this report and the installer-generated root `skills-lock.json`.

```text
.agents/skills/INSTALLATION.md
.agents/skills/banner-design/SKILL.md
.agents/skills/banner-design/references/banner-sizes-and-styles.md
.agents/skills/brand/SKILL.md
.agents/skills/brand/references/approval-checklist.md
.agents/skills/brand/references/asset-organization.md
.agents/skills/brand/references/brand-guideline-template.md
.agents/skills/brand/references/color-palette-management.md
.agents/skills/brand/references/consistency-checklist.md
.agents/skills/brand/references/logo-usage-rules.md
.agents/skills/brand/references/messaging-framework.md
.agents/skills/brand/references/typography-specifications.md
.agents/skills/brand/references/update.md
.agents/skills/brand/references/visual-identity.md
.agents/skills/brand/references/voice-framework.md
.agents/skills/brand/scripts/extract-colors.cjs
.agents/skills/brand/scripts/inject-brand-context.cjs
.agents/skills/brand/scripts/sync-brand-to-tokens.cjs
.agents/skills/brand/scripts/tests/test_sync_brand_to_tokens.py
.agents/skills/brand/scripts/validate-asset.cjs
.agents/skills/brand/templates/brand-guidelines-starter.md
.agents/skills/design-system/SKILL.md
.agents/skills/design-system/data/slide-backgrounds.csv
.agents/skills/design-system/data/slide-charts.csv
.agents/skills/design-system/data/slide-color-logic.csv
.agents/skills/design-system/data/slide-copy.csv
.agents/skills/design-system/data/slide-layout-logic.csv
.agents/skills/design-system/data/slide-layouts.csv
.agents/skills/design-system/data/slide-strategies.csv
.agents/skills/design-system/data/slide-typography.csv
.agents/skills/design-system/references/component-specs.md
.agents/skills/design-system/references/component-tokens.md
.agents/skills/design-system/references/primitive-tokens.md
.agents/skills/design-system/references/semantic-tokens.md
.agents/skills/design-system/references/states-and-variants.md
.agents/skills/design-system/references/tailwind-integration.md
.agents/skills/design-system/references/token-architecture.md
.agents/skills/design-system/scripts/embed-tokens.cjs
.agents/skills/design-system/scripts/fetch-background.py
.agents/skills/design-system/scripts/generate-slide.py
.agents/skills/design-system/scripts/generate-tokens.cjs
.agents/skills/design-system/scripts/html-token-validator.py
.agents/skills/design-system/scripts/search-slides.py
.agents/skills/design-system/scripts/slide-token-validator.py
.agents/skills/design-system/scripts/slide_search_core.py
.agents/skills/design-system/scripts/tests/test_validate_tokens.py
.agents/skills/design-system/scripts/validate-tokens.cjs
.agents/skills/design-system/templates/design-tokens-starter.json
.agents/skills/design/SKILL.md
.agents/skills/design/data/cip/deliverables.csv
.agents/skills/design/data/cip/industries.csv
.agents/skills/design/data/cip/mockup-contexts.csv
.agents/skills/design/data/cip/styles.csv
.agents/skills/design/data/icon/styles.csv
.agents/skills/design/data/logo/colors.csv
.agents/skills/design/data/logo/industries.csv
.agents/skills/design/data/logo/styles.csv
.agents/skills/design/references/banner-sizes-and-styles.md
.agents/skills/design/references/cip-deliverable-guide.md
.agents/skills/design/references/cip-design.md
.agents/skills/design/references/cip-prompt-engineering.md
.agents/skills/design/references/cip-style-guide.md
.agents/skills/design/references/design-routing.md
.agents/skills/design/references/icon-design.md
.agents/skills/design/references/logo-color-psychology.md
.agents/skills/design/references/logo-design.md
.agents/skills/design/references/logo-prompt-engineering.md
.agents/skills/design/references/logo-style-guide.md
.agents/skills/design/references/slides-copywriting-formulas.md
.agents/skills/design/references/slides-create.md
.agents/skills/design/references/slides-html-template.md
.agents/skills/design/references/slides-layout-patterns.md
.agents/skills/design/references/slides-strategies.md
.agents/skills/design/references/slides.md
.agents/skills/design/references/social-photos-design.md
.agents/skills/design/scripts/cip/core.py
.agents/skills/design/scripts/cip/generate.py
.agents/skills/design/scripts/cip/render-html.py
.agents/skills/design/scripts/cip/search.py
.agents/skills/design/scripts/icon/generate.py
.agents/skills/design/scripts/logo/core.py
.agents/skills/design/scripts/logo/generate.py
.agents/skills/design/scripts/logo/search.py
.agents/skills/framer-motion-core/SKILL.md
.agents/skills/framer-motion-gestures/SKILL.md
.agents/skills/framer-motion-layout/SKILL.md
.agents/skills/framer-motion-react/SKILL.md
.agents/skills/framer-motion-scroll/SKILL.md
.agents/skills/framer-motion-variants/SKILL.md
.agents/skills/frontend-design/LICENSE.txt
.agents/skills/frontend-design/SKILL.md
.agents/skills/improve-ui/SKILL.md
.agents/skills/improve-ui/agents/openai.yaml
.agents/skills/improve-ui/references/plan-template.md
.agents/skills/llms.txt
.agents/skills/motion-design/SKILL.md
.agents/skills/motion-design/director/choreography.md
.agents/skills/motion-design/director/context-adaptation.md
.agents/skills/motion-design/director/core-philosophy.md
.agents/skills/motion-design/director/decision-framework.md
.agents/skills/motion-design/director/disney-principles.md
.agents/skills/motion-design/director/emotion-mapping.md
.agents/skills/motion-design/director/motion-personality.md
.agents/skills/motion-design/director/narrative-structure.md
.agents/skills/motion-design/patterns/ambient-continuous.md
.agents/skills/motion-design/patterns/entrance-exit.md
.agents/skills/motion-design/patterns/multi-element.md
.agents/skills/motion-design/patterns/state-feedback.md
.agents/skills/motion-design/reference/property-selection.md
.agents/skills/motion-design/reference/quality-checklist.md
.agents/skills/motion-design/reference/timing-easing-tables.md
.agents/skills/motion-design/reference/troubleshooting.md
.agents/skills/slides/SKILL.md
.agents/skills/slides/references/copywriting-formulas.md
.agents/skills/slides/references/create.md
.agents/skills/slides/references/html-template.md
.agents/skills/slides/references/layout-patterns.md
.agents/skills/slides/references/slide-strategies.md
.agents/skills/ui-styling/LICENSE.txt
.agents/skills/ui-styling/SKILL.md
.agents/skills/ui-styling/references/canvas-design-system.md
.agents/skills/ui-styling/references/shadcn-accessibility.md
.agents/skills/ui-styling/references/shadcn-components.md
.agents/skills/ui-styling/references/shadcn-theming.md
.agents/skills/ui-styling/references/tailwind-customization.md
.agents/skills/ui-styling/references/tailwind-responsive.md
.agents/skills/ui-styling/references/tailwind-utilities.md
.agents/skills/ui-styling/scripts/requirements.txt
.agents/skills/ui-styling/scripts/shadcn_add.py
.agents/skills/ui-styling/scripts/tailwind_config_gen.py
.agents/skills/ui-styling/scripts/tests/coverage-ui.json
.agents/skills/ui-styling/scripts/tests/requirements.txt
.agents/skills/ui-styling/scripts/tests/test_shadcn_add.py
.agents/skills/ui-styling/scripts/tests/test_tailwind_config_gen.py
.agents/skills/ui-ux-pro-max/SKILL.md
.agents/skills/ui-ux-pro-max/data/app-interface.csv
.agents/skills/ui-ux-pro-max/data/catalog-summary.json
.agents/skills/ui-ux-pro-max/data/charts.csv
.agents/skills/ui-ux-pro-max/data/colors.csv
.agents/skills/ui-ux-pro-max/data/data-provenance.json
.agents/skills/ui-ux-pro-max/data/google-font-licenses.json
.agents/skills/ui-ux-pro-max/data/google-fonts.csv
.agents/skills/ui-ux-pro-max/data/icons.csv
.agents/skills/ui-ux-pro-max/data/landing.csv
.agents/skills/ui-ux-pro-max/data/motion.csv
.agents/skills/ui-ux-pro-max/data/phosphor-icons-upstream.json
.agents/skills/ui-ux-pro-max/data/products.csv
.agents/skills/ui-ux-pro-max/data/react-performance.csv
.agents/skills/ui-ux-pro-max/data/stacks/angular.csv
.agents/skills/ui-ux-pro-max/data/stacks/astro.csv
.agents/skills/ui-ux-pro-max/data/stacks/avalonia.csv
.agents/skills/ui-ux-pro-max/data/stacks/flutter.csv
.agents/skills/ui-ux-pro-max/data/stacks/html-tailwind.csv
.agents/skills/ui-ux-pro-max/data/stacks/javafx.csv
.agents/skills/ui-ux-pro-max/data/stacks/jetpack-compose.csv
.agents/skills/ui-ux-pro-max/data/stacks/laravel.csv
.agents/skills/ui-ux-pro-max/data/stacks/nextjs.csv
.agents/skills/ui-ux-pro-max/data/stacks/nuxt-ui.csv
.agents/skills/ui-ux-pro-max/data/stacks/nuxtjs.csv
.agents/skills/ui-ux-pro-max/data/stacks/react-native.csv
.agents/skills/ui-ux-pro-max/data/stacks/react.csv
.agents/skills/ui-ux-pro-max/data/stacks/shadcn.csv
.agents/skills/ui-ux-pro-max/data/stacks/svelte.csv
.agents/skills/ui-ux-pro-max/data/stacks/swiftui.csv
.agents/skills/ui-ux-pro-max/data/stacks/threejs.csv
.agents/skills/ui-ux-pro-max/data/stacks/uno.csv
.agents/skills/ui-ux-pro-max/data/stacks/uwp.csv
.agents/skills/ui-ux-pro-max/data/stacks/vue.csv
.agents/skills/ui-ux-pro-max/data/stacks/winui.csv
.agents/skills/ui-ux-pro-max/data/stacks/wpf.csv
.agents/skills/ui-ux-pro-max/data/styles.csv
.agents/skills/ui-ux-pro-max/data/typography.csv
.agents/skills/ui-ux-pro-max/data/ui-reasoning.csv
.agents/skills/ui-ux-pro-max/data/ux-guidelines.csv
.agents/skills/ui-ux-pro-max/scripts/core.py
.agents/skills/ui-ux-pro-max/scripts/design_system.py
.agents/skills/ui-ux-pro-max/scripts/reasoning_contract.py
.agents/skills/ui-ux-pro-max/scripts/search.py
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/google-api.json
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/google-catalog.json
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/google-existing.csv
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/google-metadata.json
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/google-overrides.json
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/icons-curated.csv
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/phosphor-core.json
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/phosphor-package.json
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/phosphor-react-exports.json
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/phosphor-react-package.json
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/relevance-baseline.json
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/relevance-cases.json
.agents/skills/ui-ux-pro-max/scripts/tests/fixtures/relevance-thresholds.json
.agents/skills/ui-ux-pro-max/scripts/tests/test_catalog_refresh.py
.agents/skills/ui-ux-pro-max/scripts/tests/test_core.py
.agents/skills/ui-ux-pro-max/scripts/tests/test_core_data_quality.py
.agents/skills/ui-ux-pro-max/scripts/tests/test_data_contracts.py
.agents/skills/ui-ux-pro-max/scripts/tests/test_design_system_mode.py
.agents/skills/ui-ux-pro-max/scripts/tests/test_native_desktop_stack_freshness.py
.agents/skills/ui-ux-pro-max/scripts/tests/test_relevance_evaluator.py
.agents/skills/ui-ux-pro-max/scripts/tests/test_style_taxonomy.py
.agents/skills/ui-ux-pro-max/scripts/tests/test_text_layout_resilience.py
.agents/skills/ui-ux-pro-max/scripts/tests/test_web_stack_freshness.py
.agents/skills/ui-ux-pro-max/scripts/validate_data.py
.agents/skills/web-design-guidelines/SKILL.md
skills-lock.json
```
