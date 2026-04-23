import {
  createBusinessDomainStateStore,
  createBusinessOrchestrationState,
  createBusinessPluginService,
  type BusinessAdvancePrimaryRecordInput,
  type BusinessAmendPrimaryRecordInput,
  type BusinessCreatePrimaryRecordInput,
  type BusinessFailPendingDownstreamItemInput,
  type BusinessPlacePrimaryRecordOnHoldInput,
  type BusinessReconcilePrimaryRecordInput,
  type BusinessReleasePrimaryRecordHoldInput,
  type BusinessReplayDeadLetterInput,
  type BusinessReversePrimaryRecordInput,
  type BusinessResolvePendingDownstreamItemInput
} from "@platform/business-runtime";

import { type ExceptionRecord, type PrimaryRecord, type SecondaryRecord } from "../model";

export type CreatePrimaryRecordInput = BusinessCreatePrimaryRecordInput;
export type AdvancePrimaryRecordInput = BusinessAdvancePrimaryRecordInput;
export type PlacePrimaryRecordOnHoldInput = BusinessPlacePrimaryRecordOnHoldInput;
export type ReleasePrimaryRecordHoldInput = BusinessReleasePrimaryRecordHoldInput;
export type AmendPrimaryRecordInput = BusinessAmendPrimaryRecordInput;
export type ReconcilePrimaryRecordInput = BusinessReconcilePrimaryRecordInput;
export type ReversePrimaryRecordInput = BusinessReversePrimaryRecordInput;
export type ResolvePendingDownstreamItemInput = BusinessResolvePendingDownstreamItemInput;
export type FailPendingDownstreamItemInput = BusinessFailPendingDownstreamItemInput;
export type ReplayDeadLetterInput = BusinessReplayDeadLetterInput;

function seedState() {
  return {
    primaryRecords: [
      {
        id: "product-catalog-core:seed",
        tenantId: "tenant-platform",
        title: "Product & Catalog Core Seed Record",
        counterpartyId: "party:seed",
        companyId: "company:primary",
        branchId: "branch:head-office",
        recordState: "active",
        approvalState: "approved",
        postingState: "unposted",
        fulfillmentState: "none",
        amountMinor: 125000,
        currencyCode: "USD",
        revisionNo: 1,
        reasonCode: null,
        effectiveAt: "2026-04-23T00:00:00.000Z",
        correlationId: "product-catalog-core:seed",
        processId: "catalog-lifecycle:seed",
        upstreamRefs: [],
        downstreamRefs: [],
        updatedAt: "2026-04-23T00:00:00.000Z"
      }
    ] satisfies PrimaryRecord[],
    secondaryRecords: [] satisfies SecondaryRecord[],
    exceptionRecords: [] satisfies ExceptionRecord[],
    orchestration: createBusinessOrchestrationState()
  };
}

const store = createBusinessDomainStateStore({
  pluginId: "product-catalog-core",
  sqlite: {
    primaryTable: "product_catalog_core_primary_records",
    secondaryTable: "product_catalog_core_secondary_records",
    exceptionTable: "product_catalog_core_exception_records",
    dbFileName: "business-runtime.sqlite"
  },
  postgres: {
    schemaName: "product_catalog_core"
  },
  seedStateFactory: seedState
});

const service = createBusinessPluginService({
  pluginId: "product-catalog-core",
  displayName: "Product & Catalog Core",
  primaryResourceId: "catalog.products",
  secondaryResourceId: "catalog.variants",
  exceptionResourceId: "catalog.policies",
  createEvent: "catalog.product-created.v1",
  advanceEvent: "catalog.product-revised.v1",
  reconcileEvent: "catalog.substitute-declared.v1",
  projectionJobId: "catalog.projections.refresh",
  reconciliationJobId: "catalog.reconciliation.run",
  advanceActionLabel: "Revise Catalog Product",
  orchestrationTargets: {
  "create": [],
  "advance": [
    "traceability.links.record"
  ],
  "reconcile": [
    "traceability.reconciliation.queue"
  ]
},
  store
});

export const {
  listPrimaryRecords,
  listSecondaryRecords,
  listExceptionRecords,
  listPublishedMessages,
  listPendingDownstreamItems,
  listDeadLetters,
  listProjectionRecords,
  getBusinessOverview,
  createPrimaryRecord,
  advancePrimaryRecord,
  placePrimaryRecordOnHold,
  releasePrimaryRecordHold,
  amendPrimaryRecord,
  reconcilePrimaryRecord,
  reversePrimaryRecord,
  resolvePendingDownstreamItem,
  failPendingDownstreamItem,
  replayDeadLetter
} = service;
