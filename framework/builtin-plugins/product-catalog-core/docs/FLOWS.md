# Product & Catalog Core Flows

## Happy paths

- `catalog.products.create`: Create Catalog Product
- `catalog.products.revise`: Revise Catalog Product
- `catalog.products.substitute`: Declare Product Substitute

## Operational scenario matrix

- `item-lifecycle`
- `variant-generation`
- `substitution-and-obsolescence`

## Action-level flows

### `catalog.products.create`

Create Catalog Product

Permission: `catalog.products.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s idempotent semantics.

Side effects:

- Mutates or validates state owned by `catalog.products`, `catalog.variants`, `catalog.policies`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `catalog.products.revise`

Revise Catalog Product

Permission: `catalog.products.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `catalog.products`, `catalog.variants`, `catalog.policies`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `catalog.products.substitute`

Declare Product Substitute

Permission: `catalog.products.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `catalog.products`, `catalog.variants`, `catalog.policies`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


## Cross-package interactions

- Direct dependencies: `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`
- Requested capabilities: `ui.register.admin`, `api.rest.mount`, `data.write.catalog`, `events.publish.catalog`
- Integration model: Actions+Resources+Jobs+Workflows+UI
- ERPNext doctypes used as parity references: `Item`, `Item Variant`, `Item Attribute`, `Item Price`, `UOM Category`, `Item Alternative`, `Product Bundle`
- Recovery ownership should stay with the host orchestration layer when the plugin does not explicitly export jobs, workflows, or lifecycle events.
