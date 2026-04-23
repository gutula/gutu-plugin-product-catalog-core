import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "catalog.products.create",
    "label": "Create Catalog Product",
    "phase": "create",
    "methodName": "createCatalogProduct"
  },
  {
    "id": "catalog.products.revise",
    "label": "Revise Catalog Product",
    "phase": "advance",
    "methodName": "reviseCatalogProduct"
  },
  {
    "id": "catalog.products.substitute",
    "label": "Declare Product Substitute",
    "phase": "reconcile",
    "methodName": "declareProductSubstitute"
  }
] as const;

export async function createCatalogProduct(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function reviseCatalogProduct(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function declareProductSubstitute(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}
