# Product & Catalog Core Developer Guide

Canonical product, variant, UOM, and policy metadata for goods, services, assets, subscriptions, and kit-style catalog composition.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Owns the shared catalog, variant, and operational default records that downstream selling, buying, inventory, and production plugins can reuse safely.

### This plugin is the right fit when

- You need **products**, **variants**, **shared defaults** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/product-catalog-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/product-catalog-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/product-catalog-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/product-catalog-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/product-catalog-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/product-catalog-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/product-catalog-core` |
| Manifest ID | `product-catalog-core` |
| Display Name | Product & Catalog Core |
| Domain Group | Operational Data |
| Default Category | Business / Product & Catalog |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.catalog`, `events.publish.catalog` |
| Provides Capabilities | `catalog.products`, `catalog.variants`, `catalog.policies` |
| Owns Data | `catalog.products`, `catalog.variants`, `catalog.uoms`, `catalog.policies` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `catalog.products.create` | Permission: `catalog.products.write` | Create Catalog Product<br>Idempotent<br>Audited |
| Action | `catalog.products.revise` | Permission: `catalog.products.write` | Revise Catalog Product<br>Non-idempotent<br>Audited |
| Action | `catalog.products.substitute` | Permission: `catalog.products.write` | Declare Product Substitute<br>Non-idempotent<br>Audited |
| Action | `catalog.products.hold` | Permission: `catalog.products.write` | Place Record On Hold<br>Non-idempotent<br>Audited |
| Action | `catalog.products.release` | Permission: `catalog.products.write` | Release Record Hold<br>Non-idempotent<br>Audited |
| Action | `catalog.products.amend` | Permission: `catalog.products.write` | Amend Record<br>Non-idempotent<br>Audited |
| Action | `catalog.products.reverse` | Permission: `catalog.products.write` | Reverse Record<br>Non-idempotent<br>Audited |
| Resource | `catalog.products` | Portal disabled | Canonical products with behavior flags and revision-safe metadata.<br>Purpose: Give every business plugin one governed catalog truth instead of disconnected product masters.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `catalog.variants` | Portal disabled | Variant combinations, identifiers, and conversion-friendly item detail.<br>Purpose: Keep purchasable and sellable product permutations traceable without forking the core catalog.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `catalog.policies` | Portal disabled | Procurement, manufacturing, valuation, and quality defaults for catalog records.<br>Purpose: Publish reusable commercial and operational defaults to downstream domains.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `catalog.projections.refresh` | `catalog-projections` | Retry policy not declared | No timeout declared |
| `catalog.reconciliation.run` | `catalog-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `catalog-lifecycle` | `catalog-manager`, `approver`, `operations` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep catalog lifecycle changes explicit so downstream planning, selling, and buying flows stay stable. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `catalog.projections.refresh`, `catalog.reconciliation.run`.
- Workflow surface: `catalog-lifecycle`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/product-catalog-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/product-catalog-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["catalog.products.create"]
  action --> validation["Schema + permission guard"]
  validation --> service["Product & Catalog Core service layer"]
  service --> state["catalog.products"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, createCatalogProductAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/product-catalog-core";

export const pluginSurface = {
  manifest,
  createCatalogProductAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, createCatalogProductAction } from "@plugins/product-catalog-core";

console.log("plugin", manifest.id);
console.log("action", createCatalogProductAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

- Exports 7 governed actions: `catalog.products.create`, `catalog.products.revise`, `catalog.products.substitute`, `catalog.products.hold`, `catalog.products.release`, `catalog.products.amend`, `catalog.products.reverse`.
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

### Current gaps

- No extra gaps were discovered beyond the plugin’s declared boundaries.

### Recommended next

- Deepen variant, substitution, and lifecycle controls before more downstream domains treat the catalog as fixed truth.
- Add stronger packaging for product templates, quality defaults, and manufacturing-facing policy overlays.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Item`, `Item Variant`, `Item Attribute`.

### Later / optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
