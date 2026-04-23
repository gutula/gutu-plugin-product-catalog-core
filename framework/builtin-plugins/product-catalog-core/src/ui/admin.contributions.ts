import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "business-foundations",
      label: "Business Foundations",
      icon: "briefcase-business",
      description: "Canonical shared masters and governed reference data.",
      permission: "catalog.products.read",
      homePath: "/admin/business/catalog",
      quickActions: ["product-catalog-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "business-foundations",
      group: "control-room",
      items: [
        {
          id: "product-catalog-core.overview",
          label: "Control Room",
          icon: "briefcase-business",
          to: "/admin/business/catalog",
          permission: "catalog.products.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "product-catalog-core.page",
      kind: "dashboard",
      route: "/admin/business/catalog",
      label: "Catalog Control Room",
      workspace: "business-foundations",
      group: "control-room",
      permission: "catalog.products.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "product-catalog-core.open.control-room",
      label: "Open Product & Catalog Core",
      permission: "catalog.products.read",
      href: "/admin/business/catalog",
      keywords: ["product & catalog core","business foundations","business"]
    })
  ]
};
