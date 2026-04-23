export const scenarioDefinitions = [
  {
    "id": "item-lifecycle",
    "owningPlugin": "product-catalog-core",
    "workflowId": "catalog-lifecycle",
    "actionIds": [
      "catalog.products.create",
      "catalog.products.revise",
      "catalog.products.substitute",
      "catalog.products.hold",
      "catalog.products.release",
      "catalog.products.amend",
      "catalog.products.reverse"
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
      "catalog.products.substitute",
      "catalog.products.hold",
      "catalog.products.release",
      "catalog.products.amend",
      "catalog.products.reverse"
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
      "catalog.products.substitute",
      "catalog.products.hold",
      "catalog.products.release",
      "catalog.products.amend",
      "catalog.products.reverse"
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
