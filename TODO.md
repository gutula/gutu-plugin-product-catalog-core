# Product & Catalog Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

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

## Current Gaps

- Repo-local documentation verification entrypoints were missing before this pass and need to stay green as the repo evolves.

## Recommended Next

- Deepen variant, substitution, and lifecycle controls before more downstream domains treat the catalog as fixed truth.
- Add stronger packaging for product templates, quality defaults, and manufacturing-facing policy overlays.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Item`, `Item Variant`, `Item Attribute`.

## Later / Optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
