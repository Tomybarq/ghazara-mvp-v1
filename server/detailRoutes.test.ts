import { describe, it, expect } from "vitest";
import {
  normalizeSlug,
  isValidSlug,
  resolvePublishedProduct,
  resolvePublishedProject,
  getPublicProductSlugs,
  getPublicProjectSlugs,
  buildContextualRfqUrl,
} from "../client/src/data/detailRoutes";
import { isPubliclyPublishable, isApproved } from "../client/src/data/contentApproval";
import { productsData } from "../client/src/data/products";
import { projectsData } from "../client/src/data/projects";

describe("Content Approval Predicates (client/src/data/contentApproval.ts)", () => {
  it("verifies isApproved only when approval status is 'approved'", () => {
    expect(isApproved({ status: "approved" })).toBe(true);
    expect(isApproved({ status: "draft" })).toBe(false);
    expect(isApproved({ status: "pending" })).toBe(false);
    expect(isApproved({ status: "blocked" })).toBe(false);
    expect(isApproved(undefined)).toBe(false);
  });

  it("verifies isPubliclyPublishable requires both published=true and status='approved'", () => {
    expect(isPubliclyPublishable({ published: true, approval: { status: "approved" } })).toBe(true);
    expect(isPubliclyPublishable({ published: false, approval: { status: "approved" } })).toBe(false);
    expect(isPubliclyPublishable({ published: true, approval: { status: "draft" } })).toBe(false);
    expect(isPubliclyPublishable({ published: true, approval: { status: "blocked" } })).toBe(false);
    expect(isPubliclyPublishable(null)).toBe(false);
    expect(isPubliclyPublishable(undefined)).toBe(false);
  });
});

describe("Slug Normalization and Validation (client/src/data/detailRoutes.ts)", () => {
  it("normalizes slugs safely", () => {
    expect(normalizeSlug("  Maeen-NGO-Platform  ")).toBe("maeen-ngo-platform");
    expect(normalizeSlug("Ghazara_Digital_Network")).toBe("ghazara_digital_network");
    expect(normalizeSlug("invalid slug with spaces")).toBe("invalidslugwithspaces");
    expect(normalizeSlug("")).toBe("");
    expect(normalizeSlug(null)).toBe("");
    expect(normalizeSlug(undefined)).toBe("");
  });

  it("validates strict URL-safe slug pattern", () => {
    expect(isValidSlug("maeen-ngo-platform")).toBe(true);
    expect(isValidSlug("ghazara-digital-network")).toBe(true);
    expect(isValidSlug("invalid slug")).toBe(false);
    expect(isValidSlug("invalid/slug")).toBe(false);
    expect(isValidSlug("")).toBe(false);
    expect(isValidSlug(null)).toBe(false);
  });
});

describe("Catalog Resolvers & Publication Integrity (client/src/data/detailRoutes.ts)", () => {
  it("does not expose unpublished/draft products through public resolvers", () => {
    // Current catalog baseline has all products as draft
    const product = resolvePublishedProduct("maeen-ngo-platform");
    expect(product).toBeUndefined();

    const slugs = getPublicProductSlugs();
    expect(slugs).toEqual([]);
  });

  it("does not expose unpublished/draft projects through public resolvers", () => {
    // Current catalog baseline has all projects as draft
    const project = resolvePublishedProject("moeen-ngo-platform-development");
    expect(project).toBeUndefined();

    const slugs = getPublicProjectSlugs();
    expect(slugs).toEqual([]);
  });

  it("returns undefined for non-existent or invalid slugs", () => {
    expect(resolvePublishedProduct("non-existent-product")).toBeUndefined();
    expect(resolvePublishedProduct("")).toBeUndefined();
    expect(resolvePublishedProduct(null)).toBeUndefined();

    expect(resolvePublishedProject("non-existent-project")).toBeUndefined();
    expect(resolvePublishedProject("")).toBeUndefined();
    expect(resolvePublishedProject(null)).toBeUndefined();
  });

  it("ensures all raw product records have valid structure and slug formats", () => {
    expect(productsData.length).toBeGreaterThan(0);
    const slugs = new Set<string>();

    for (const prod of productsData) {
      expect(prod.id.trim().length).toBeGreaterThan(0);
      expect(prod.slug.trim().length).toBeGreaterThan(0);
      expect(isValidSlug(prod.slug)).toBe(true);
      expect(slugs.has(prod.slug)).toBe(false);
      slugs.add(prod.slug);

      expect(prod.title.ar.trim().length).toBeGreaterThan(0);
      expect(prod.title.en.trim().length).toBeGreaterThan(0);
      expect(prod.shortDesc.ar.trim().length).toBeGreaterThan(0);
      expect(prod.shortDesc.en.trim().length).toBeGreaterThan(0);
      expect(prod.approval).toBeDefined();
    }
  });

  it("ensures all raw project records have valid structure and slug formats", () => {
    expect(projectsData.length).toBeGreaterThan(0);
    const slugs = new Set<string>();

    for (const proj of projectsData) {
      expect(proj.id.trim().length).toBeGreaterThan(0);
      expect(proj.slug.trim().length).toBeGreaterThan(0);
      expect(isValidSlug(proj.slug)).toBe(true);
      expect(slugs.has(proj.slug)).toBe(false);
      slugs.add(proj.slug);

      expect(proj.title.ar.trim().length).toBeGreaterThan(0);
      expect(proj.title.en.trim().length).toBeGreaterThan(0);
      expect(proj.shortDesc.ar.trim().length).toBeGreaterThan(0);
      expect(proj.shortDesc.en.trim().length).toBeGreaterThan(0);
      expect(proj.approval).toBeDefined();
    }
  });
});

describe("Contextual RFQ URL Builder (client/src/data/detailRoutes.ts)", () => {
  it("builds fallback URL when no parameters are supplied", () => {
    expect(buildContextualRfqUrl({})).toBe("/request-quote");
  });

  it("safely ignores unpublished or invalid product slugs in RFQ URL", () => {
    expect(buildContextualRfqUrl({ productSlug: "maeen-ngo-platform" })).toBe("/request-quote");
    expect(buildContextualRfqUrl({ productSlug: "non-existent" })).toBe("/request-quote");
  });

  it("safely includes standard service, sector, and region params", () => {
    const url = buildContextualRfqUrl({
      serviceId: "software-dev",
      sectorId: "ngo",
      regionId: "hadramout",
    });
    expect(url).toBe("/request-quote?service=software-dev&sector=ngo&region=hadramout");
  });
});
