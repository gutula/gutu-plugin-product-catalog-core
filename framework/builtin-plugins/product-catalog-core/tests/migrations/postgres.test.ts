import { describe, expect, it } from "bun:test";

import {
  buildProductCatalogCoreMigrationSql,
  buildProductCatalogCoreRollbackSql,
  getProductCatalogCoreLookupIndexName,
  getProductCatalogCoreStatusIndexName
} from "../../src/postgres";

describe("product-catalog-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildProductCatalogCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS product_catalog_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS product_catalog_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS product_catalog_core.exception_records");
    expect(sql).toContain(getProductCatalogCoreLookupIndexName());
    expect(sql).toContain(getProductCatalogCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildProductCatalogCoreRollbackSql({ schemaName: "product_catalog_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS product_catalog_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS product_catalog_core_preview CASCADE");
  });
});
