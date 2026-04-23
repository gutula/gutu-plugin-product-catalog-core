export const scenarioDefinitions = [
  {
    "id": "item-lifecycle",
    "owningPlugin": "product-catalog-core",
    "workflowId": "catalog-lifecycle",
    "actionIds": [
      "catalog.products.create",
      "catalog.products.revise",
      "catalog.products.substitute"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "variant-generation",
    "owningPlugin": "product-catalog-core",
    "workflowId": "catalog-lifecycle",
    "actionIds": [
      "catalog.products.create",
      "catalog.products.revise",
      "catalog.products.substitute"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "substitution-and-obsolescence",
    "owningPlugin": "product-catalog-core",
    "workflowId": "catalog-lifecycle",
    "actionIds": [
      "catalog.products.create",
      "catalog.products.revise",
      "catalog.products.substitute"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;
