export const reportDefinitions = [
  {
    "id": "product-catalog-core.report.01",
    "label": "Item Price Report",
    "owningPlugin": "product-catalog-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "variant-generation-conflicts",
      "uom-conversion-mismatches",
      "catalog-policy-review"
    ]
  },
  {
    "id": "product-catalog-core.report.02",
    "label": "Item Variant Matrix",
    "owningPlugin": "product-catalog-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "variant-generation-conflicts",
      "uom-conversion-mismatches",
      "catalog-policy-review"
    ]
  },
  {
    "id": "product-catalog-core.report.03",
    "label": "Product Bundle Usage",
    "owningPlugin": "product-catalog-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "variant-generation-conflicts",
      "uom-conversion-mismatches",
      "catalog-policy-review"
    ]
  },
  {
    "id": "product-catalog-core.report.04",
    "label": "Catalog Obsolescence Review",
    "owningPlugin": "product-catalog-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "variant-generation-conflicts",
      "uom-conversion-mismatches",
      "catalog-policy-review"
    ]
  }
] as const;
