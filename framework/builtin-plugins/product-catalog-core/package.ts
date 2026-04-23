import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "product-catalog-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-product-catalog-core",
  "displayName": "Product & Catalog Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "business",
    "label": "Business",
    "subcategoryId": "product_catalog",
    "subcategoryLabel": "Product & Catalog"
  },
  "description": "Canonical product, variant, UOM, and policy metadata for goods, services, assets, subscriptions, and kit-style catalog composition.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "audit-core",
    "workflow-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for Product & Catalog Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for Product & Catalog Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for Product & Catalog Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "audit-core",
      "class": "required",
      "rationale": "Required for Product & Catalog Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for Product & Catalog Core to keep its boundary governed and explicit."
    }
  ],
  "optionalWith": [],
  "conflictsWith": [],
  "providesCapabilities": [
    "catalog.products",
    "catalog.variants",
    "catalog.policies"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.catalog",
    "events.publish.catalog"
  ],
  "ownsData": [
    "catalog.products",
    "catalog.variants",
    "catalog.uoms",
    "catalog.policies"
  ],
  "extendsData": [],
  "publicCommands": [
    "catalog.products.create",
    "catalog.products.revise",
    "catalog.products.substitute"
  ],
  "publicQueries": [
    "catalog.product-summary",
    "catalog.variant-matrix"
  ],
  "publicEvents": [
    "catalog.product-created.v1",
    "catalog.product-revised.v1",
    "catalog.substitute-declared.v1"
  ],
  "domainCatalog": {
    "erpnextModules": [
      "Stock",
      "Selling",
      "Buying",
      "Manufacturing"
    ],
    "erpnextDoctypes": [
      "Item",
      "Item Variant",
      "Item Attribute",
      "Item Price",
      "UOM Category",
      "Item Alternative",
      "Product Bundle"
    ],
    "ownedEntities": [
      "Product",
      "Variant Matrix",
      "UOM Conversion",
      "Catalog Policy",
      "Bundle Definition",
      "Substitution Mapping"
    ],
    "reports": [
      "Item Price Report",
      "Item Variant Matrix",
      "Product Bundle Usage",
      "Catalog Obsolescence Review"
    ],
    "exceptionQueues": [
      "variant-generation-conflicts",
      "uom-conversion-mismatches",
      "catalog-policy-review"
    ],
    "operationalScenarios": [
      "item-lifecycle",
      "variant-generation",
      "substitution-and-obsolescence"
    ],
    "settingsSurfaces": [
      "Stock Settings",
      "Selling Settings",
      "Buying Settings"
    ],
    "edgeCases": [
      "variant attribute conflicts",
      "stockable to service policy changes",
      "bundle substitutions across active orders"
    ]
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});
