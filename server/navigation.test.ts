import { describe, it, expect } from "vitest";
import { navigationItems, headerNavLinks, footerNavLinks, getRouteByPath } from "../client/src/data/navigation";
import { contactData } from "../client/src/data/contact";

describe("Navigation Manifest & Route Integrity", () => {
  it("defines all mandatory routes with valid format", () => {
    const requiredRoutes = [
      "/",
      "/about",
      "/services",
      "/products",
      "/projects",
      "/blog",
      "/contact",
      "/request-quote",
    ];

    requiredRoutes.forEach((route) => {
      const item = navigationItems.find((n) => n.href === route);
      expect(item, `Route ${route} should exist in navigation manifest`).toBeDefined();
      expect(item?.label.ar).toBeTruthy();
      expect(item?.label.en).toBeTruthy();
    });
  });

  it("ensures all routes have absolute leading slashes and no empty hrefs", () => {
    navigationItems.forEach((item) => {
      expect(item.href.startsWith("/")).toBe(true);
      expect(item.href.trim().length).toBeGreaterThan(0);
      expect(item.id.trim().length).toBeGreaterThan(0);
    });
  });

  it("correctly filters header and footer navigation links", () => {
    expect(headerNavLinks.length).toBeGreaterThan(4);
    expect(footerNavLinks.length).toBeGreaterThan(5);

    headerNavLinks.forEach((item) => {
      expect(item.showInHeader).toBe(true);
    });

    footerNavLinks.forEach((item) => {
      expect(item.showInFooter).toBe(true);
    });
  });

  it("locates routes via getRouteByPath with and without trailing slash", () => {
    const aboutRoute = getRouteByPath("/about");
    expect(aboutRoute?.id).toBe("about");

    const aboutRouteTrailing = getRouteByPath("/about/");
    expect(aboutRouteTrailing?.id).toBe("about");

    const homeRoute = getRouteByPath("/");
    expect(homeRoute?.id).toBe("home");
  });

  it("validates contact single source of truth format", () => {
    expect(contactData.phone.value).toBe("967783334002");
    expect(contactData.whatsapp.number).toBe("967783334002");
    expect(contactData.email.address).toBe("info@ghazara.net");
    expect(contactData.phone.isApproved).toBe(true);
  });
});
