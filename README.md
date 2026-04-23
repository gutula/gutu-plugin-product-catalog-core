# Product & Catalog Core

<p align="center">
  <img src="./docs/assets/gutu-mascot.png" alt="Gutu mascot" width="220" />
</p>

Canonical product, variant, UOM, and policy metadata for goods, services, assets, subscriptions, and kit-style catalog composition.

![Maturity: Hardened](https://img.shields.io/badge/Maturity-Hardened-2563eb) ![Verification: Build+Typecheck+Lint+Test+Contracts+Migrations+Integration](https://img.shields.io/badge/Verification-Build%2BTypecheck%2BLint%2BTest%2BContracts%2BMigrations%2BIntegration-2563eb) ![DB: postgres+sqlite](https://img.shields.io/badge/DB-postgres%2Bsqlite-2563eb) ![Integration Model: Actions+Resources+Jobs+Workflows+UI](https://img.shields.io/badge/Integration%20Model-Actions%2BResources%2BJobs%2BWorkflows%2BUI-2563eb)

## Part Of The Gutu Stack

| Aspect | Value |
| --- | --- |
| Repo kind | First-party plugin |
| Domain group | Operational Data |
| Default category | Business / Product & Catalog |
| Primary focus | products, variants, shared defaults |
| Best when | You need a governed domain boundary with explicit contracts and independent release cadence. |
| Composes through | Actions+Resources+Jobs+Workflows+UI |

- Gutu keeps plugins as independent repos with manifest-governed boundaries, compatibility channels, and verification lanes instead of hiding everything behind one giant mutable codebase.
- This plugin is meant to compose through explicit actions, resources, jobs, workflows, and runtime envelopes, not through undocumented hook chains.

## What It Does Now

Owns the shared catalog, variant, and operational default records that downstream selling, buying, inventory, and production plugins can reuse safely.

- Exports 3 governed actions: `catalog.products.create`, `catalog.products.revise`, `catalog.products.substitute`.
- Owns 3 resource contracts: `catalog.products`, `catalog.variants`, `catalog.policies`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 6 owned entity surface(s): `Product`, `Variant Matrix`, `UOM Conversion`, `Catalog Policy`, `Bundle Definition`, `Substitution Mapping`.
- Carries 4 report surface(s) and 3 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `Stock`, `Selling`, `Buying`, `Manufacturing`.
- Operational scenario matrix includes `item-lifecycle`, `variant-generation`, `substitution-and-obsolescence`.
- Governs 3 settings or policy surface(s) for operator control and rollout safety.

## Maturity

**Maturity Tier:** `Hardened`

This tier is justified because unit coverage exists, contract coverage exists, integration coverage exists, migration coverage exists, job definitions are exported, and workflow definitions are exported.

## Verified Capability Summary

- Domain group: **Operational Data**
- Default category: **Business / Product & Catalog**
- Verification surface: **Build+Typecheck+Lint+Test+Contracts+Migrations+Integration**
- Tests discovered: **5** total files across unit, contract, integration, migration lanes
- Integration model: **Actions+Resources+Jobs+Workflows+UI**
- Database support: **postgres + sqlite**

## Dependency And Compatibility Summary

| Field | Value |
| --- | --- |
| Package | `@plugins/product-catalog-core` |
| Manifest ID | `product-catalog-core` |
| Repo | [gutu-plugin-product-catalog-core](https://github.com/gutula/gutu-plugin-product-catalog-core) |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.catalog`, `events.publish.catalog` |
| Provided Capabilities | `catalog.products`, `catalog.variants`, `catalog.policies` |
| Runtime | bun>=1.3.12 |
| Database | postgres, sqlite |
| Integration Model | Actions+Resources+Jobs+Workflows+UI |

## Capability Matrix

| Surface | Count | Details |
| --- | --- | --- |
| Actions | 3 | `catalog.products.create`, `catalog.products.revise`, `catalog.products.substitute` |
| Resources | 3 | `catalog.products`, `catalog.variants`, `catalog.policies` |
| Jobs | 2 | `catalog.projections.refresh`, `catalog.reconciliation.run` |
| Workflows | 1 | `catalog-lifecycle` |
| UI | Present | base UI surface, admin contributions |
| Owned Entities | 6 | `Product`, `Variant Matrix`, `UOM Conversion`, `Catalog Policy`, `Bundle Definition`, `Substitution Mapping` |
| Reports | 4 | `Item Price Report`, `Item Variant Matrix`, `Product Bundle Usage`, `Catalog Obsolescence Review` |
| Exception Queues | 3 | `variant-generation-conflicts`, `uom-conversion-mismatches`, `catalog-policy-review` |
| Operational Scenarios | 3 | `item-lifecycle`, `variant-generation`, `substitution-and-obsolescence` |
| Settings Surfaces | 3 | `Stock Settings`, `Selling Settings`, `Buying Settings` |
| ERPNext Refs | 4 | `Stock`, `Selling`, `Buying`, `Manufacturing` |

## Quick Start For Integrators

Use this repo inside a **compatible Gutu workspace** or the **ecosystem certification workspace** so its `workspace:*` dependencies resolve honestly.

```bash
# from a compatible workspace that already includes this plugin's dependency graph
bun install
bun run build
bun run test
bun run docs:check
```

```ts
import { manifest, createPrimaryRecordAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/product-catalog-core";

console.log(manifest.id);
console.log(createPrimaryRecordAction.id);
console.log(BusinessPrimaryResource.id);
```

Use the root repo scripts for day-to-day work **after the workspace is bootstrapped**, or run the nested package directly from `framework/builtin-plugins/product-catalog-core` if you need lower-level control.

## Current Test Coverage

- Root verification scripts: `bun run build`, `bun run typecheck`, `bun run lint`, `bun run test`, `bun run test:contracts`, `bun run test:unit`, `bun run test:integration`, `bun run test:migrations`, `bun run docs:check`
- Unit files: 1
- Contracts files: 1
- Integration files: 1
- Migrations files: 2

## Known Boundaries And Non-Goals

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.
- Cross-plugin composition should use Gutu command, event, job, and workflow primitives. This repo should not be documented as exposing a generic WordPress-style hook system unless one is explicitly exported.

## Recommended Next Milestones

- Deepen variant, substitution, and lifecycle controls before more downstream domains treat the catalog as fixed truth.
- Add stronger packaging for product templates, quality defaults, and manufacturing-facing policy overlays.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Item`, `Item Variant`, `Item Attribute`.

## More Docs

See [DEVELOPER.md](./DEVELOPER.md), [TODO.md](./TODO.md), [SECURITY.md](./SECURITY.md), [CONTRIBUTING.md](./CONTRIBUTING.md). The internal domain sources used to build those docs live under:

- `plugins/gutu-plugin-product-catalog-core/framework/builtin-plugins/product-catalog-core/docs/AGENT_CONTEXT.md`
- `plugins/gutu-plugin-product-catalog-core/framework/builtin-plugins/product-catalog-core/docs/BUSINESS_RULES.md`
- `plugins/gutu-plugin-product-catalog-core/framework/builtin-plugins/product-catalog-core/docs/EDGE_CASES.md`
- `plugins/gutu-plugin-product-catalog-core/framework/builtin-plugins/product-catalog-core/docs/FLOWS.md`
- `plugins/gutu-plugin-product-catalog-core/framework/builtin-plugins/product-catalog-core/docs/GLOSSARY.md`
- `plugins/gutu-plugin-product-catalog-core/framework/builtin-plugins/product-catalog-core/docs/MANDATORY_STEPS.md`
