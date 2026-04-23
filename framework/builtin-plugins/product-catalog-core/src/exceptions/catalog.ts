export const exceptionQueueDefinitions = [
  {
    "id": "variant-generation-conflicts",
    "label": "Variant Generation Conflicts",
    "severity": "medium",
    "owner": "catalog-manager",
    "reconciliationJobId": "catalog.reconciliation.run"
  },
  {
    "id": "uom-conversion-mismatches",
    "label": "Uom Conversion Mismatches",
    "severity": "medium",
    "owner": "catalog-manager",
    "reconciliationJobId": "catalog.reconciliation.run"
  },
  {
    "id": "catalog-policy-review",
    "label": "Catalog Policy Review",
    "severity": "medium",
    "owner": "catalog-manager",
    "reconciliationJobId": "catalog.reconciliation.run"
  }
] as const;
