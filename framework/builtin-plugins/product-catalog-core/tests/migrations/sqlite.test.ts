import { describe, expect, it } from "bun:test";

import {
  buildProductCatalogCoreSqliteMigrationSql,
  buildProductCatalogCoreSqliteRollbackSql,
  getProductCatalogCoreSqliteLookupIndexName,
  getProductCatalogCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("product-catalog-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildProductCatalogCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS product_catalog_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS product_catalog_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS product_catalog_core_exception_records");
    expect(sql).toContain(getProductCatalogCoreSqliteLookupIndexName("product_catalog_core_"));
    expect(sql).toContain(getProductCatalogCoreSqliteStatusIndexName("product_catalog_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildProductCatalogCoreSqliteRollbackSql({ tablePrefix: "product_catalog_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS product_catalog_core_preview_exception_records");
  });
});
