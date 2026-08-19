/**
 * Content Approval & Governance Vocabulary
 * Enforces strict verification boundaries across all Ghazara commercial catalogs.
 */

export type ContentApprovalStatus = "approved" | "draft" | "pending" | "blocked";

export interface ContentApproval {
  status: ContentApprovalStatus;
  source?: string;
  approvedBy?: string;
  approvedAt?: string;
  reviewDueAt?: string;
}

export interface PublishableEntity {
  published?: boolean;
  approval?: ContentApproval;
}

/**
 * Checks if a record has explicit, documented approval.
 */
export function isApproved(approval?: ContentApproval): boolean {
  return approval?.status === "approved";
}

/**
 * Predicate determining whether an entity can be exposed in public routes,
 * collections, search indices, and sitemaps.
 * 
 * Rules:
 * 1. Must have `published === true`
 * 2. Must have `approval.status === 'approved'`
 */
export function isPubliclyPublishable<T extends PublishableEntity>(item?: T | null): item is T {
  if (!item) return false;
  return Boolean(item.published === true && item.approval?.status === "approved");
}
