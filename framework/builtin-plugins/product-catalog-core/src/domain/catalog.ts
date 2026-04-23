export const domainCatalog = {
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
} as const;
