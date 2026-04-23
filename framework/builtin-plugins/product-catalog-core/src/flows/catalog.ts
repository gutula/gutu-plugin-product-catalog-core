import {
  advancePrimaryRecord,
  amendPrimaryRecord,
  createPrimaryRecord,
  placePrimaryRecordOnHold,
  reconcilePrimaryRecord,
  releasePrimaryRecordHold,
  reversePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type AmendPrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type PlacePrimaryRecordOnHoldInput,
  type ReconcilePrimaryRecordInput,
  type ReleasePrimaryRecordHoldInput,
  type ReversePrimaryRecordInput
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
  },
  {
    "id": "catalog.products.hold",
    "label": "Place Record On Hold",
    "phase": "hold",
    "methodName": "placeRecordOnHold"
  },
  {
    "id": "catalog.products.release",
    "label": "Release Record Hold",
    "phase": "release",
    "methodName": "releaseRecordHold"
  },
  {
    "id": "catalog.products.amend",
    "label": "Amend Record",
    "phase": "amend",
    "methodName": "amendRecord"
  },
  {
    "id": "catalog.products.reverse",
    "label": "Reverse Record",
    "phase": "reverse",
    "methodName": "reverseRecord"
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

export async function placeRecordOnHold(input: PlacePrimaryRecordOnHoldInput) {
  return placePrimaryRecordOnHold(input);
}

export async function releaseRecordHold(input: ReleasePrimaryRecordHoldInput) {
  return releasePrimaryRecordHold(input);
}

export async function amendRecord(input: AmendPrimaryRecordInput) {
  return amendPrimaryRecord(input);
}

export async function reverseRecord(input: ReversePrimaryRecordInput) {
  return reversePrimaryRecord(input);
}
