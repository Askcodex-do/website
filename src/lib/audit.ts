import "@/lib/server-guard";

import { db } from "@/lib/db";
import { hashIp } from "@/lib/utils";

/**
 * Append-only audit trail for privileged actions. Never throws into the caller:
 * an audit failure must not break the user-facing operation, but it is logged.
 */
export async function audit(entry: {
  actorId?: string | null;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ip?: string | null;
}): Promise<void> {
  try {
    await db.auditLog.create({
      data: {
        actorId: entry.actorId ?? null,
        action: entry.action,
        entityType: entry.entityType ?? null,
        entityId: entry.entityId ?? null,
        metadata: (entry.metadata ?? undefined) as never,
        ipHash: hashIp(entry.ip),
      },
    });
  } catch (error) {
    console.error("[audit] failed to record entry", {
      action: entry.action,
      error,
    });
  }
}
