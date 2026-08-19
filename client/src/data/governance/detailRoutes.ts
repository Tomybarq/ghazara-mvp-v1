import { productsData, type ProductItem } from "../catalog/products";
import { projectsData, type ProjectItem } from "../catalog/projects";
import { isPubliclyPublishable } from "./contentApproval";

/**
 * Normalizes a route slug: trims whitespace, converts to lowercase,
 * and ensures safe URL characters.
 */
export function normalizeSlug(slug?: string | null): string {
  if (!slug || typeof slug !== "string") return "";
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "");
}

/**
 * Validates whether a slug matches the strict URL-safe slug pattern.
 */
export function isValidSlug(slug?: string | null): boolean {
  if (!slug || typeof slug !== "string") return false;
  const normalized = normalizeSlug(slug);
  return normalized.length > 0 && normalized === slug.trim().toLowerCase();
}

/**
 * Resolves an approved and published product by slug.
 * Returns undefined if slug is missing, invalid, or belongs to a draft/blocked record.
 */
export function resolvePublishedProduct(slug?: string | null): ProductItem | undefined {
  const clean = normalizeSlug(slug);
  if (!clean) return undefined;
  return productsData.find(
    (p) => normalizeSlug(p.slug) === clean && isPubliclyPublishable(p)
  );
}

/**
 * Resolves an approved and published project by slug.
 * Returns undefined if slug is missing, invalid, or belongs to a draft/blocked record.
 */
export function resolvePublishedProject(slug?: string | null): ProjectItem | undefined {
  const clean = normalizeSlug(slug);
  if (!clean) return undefined;
  return projectsData.find(
    (p) => normalizeSlug(p.slug) === clean && isPubliclyPublishable(p)
  );
}

/**
 * Returns all public, approved, published product slugs.
 */
export function getPublicProductSlugs(): string[] {
  return productsData
    .filter(isPubliclyPublishable)
    .map((p) => normalizeSlug(p.slug));
}

/**
 * Returns all public, approved, published project slugs.
 */
export function getPublicProjectSlugs(): string[] {
  return projectsData
    .filter(isPubliclyPublishable)
    .map((p) => normalizeSlug(p.slug));
}

export interface ContextualRfqParams {
  productSlug?: string;
  projectSlug?: string;
  serviceId?: string;
  sectorId?: string;
  regionId?: string;
}

/**
 * Builds a validated, safe contextual RFQ URL.
 * Verifies that referenced product or project slugs are published before appending.
 */
export function buildContextualRfqUrl(params: ContextualRfqParams): string {
  const query = new URLSearchParams();

  if (params.productSlug) {
    const matched = resolvePublishedProduct(params.productSlug);
    if (matched) {
      query.set("product", matched.slug);
    }
  } else if (params.projectSlug) {
    const matched = resolvePublishedProject(params.projectSlug);
    if (matched) {
      query.set("project", matched.slug);
    }
  }

  if (params.serviceId) {
    query.set("service", params.serviceId);
  }
  if (params.sectorId) {
    query.set("sector", params.sectorId);
  }
  if (params.regionId) {
    query.set("region", params.regionId);
  }

  const qs = query.toString();
  return qs ? `/request-quote?${qs}` : "/request-quote";
}
