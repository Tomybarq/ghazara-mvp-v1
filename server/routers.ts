import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRfqRequest, getAllUsers, getRecentActivities } from "./db";
import { authRouter } from "./auth/authRouter";
import { authService } from "./auth/authRouter";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: authRouter,
  admin: router({
    /** List all users — admin only. */
    listUsers: adminProcedure.query(async () => {
      return await getAllUsers();
    }),

    /** Recent activity log entries — admin only. */
    recentActivities: adminProcedure
      .input(z.object({ limit: z.number().min(1).max(100).default(30) }).optional())
      .query(async ({ input }) => {
        return await getRecentActivities(input?.limit ?? 30);
      }),

    /** Create a new credentials user — admin only (RLS: only admins can add users). */
    addUser: adminProcedure
      .input(
        z.object({
          name: z.string().trim().min(2, "Name is too short").max(120, "Name is too long"),
          email: z.string().trim().min(5, "Email is too short").max(320, "Email is too long").email("Please enter a valid email address"),
          password: z.string().min(8, "Password must be at least 8 characters").max(128, "Password must be at most 128 characters"),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        return await authService.addUser(ctx.user, input);
      }),
  }),
  rfq: router({
    submit: publicProcedure
      .input(
        z.object({
          sector: z.string().min(1).max(64),
          service: z.string().min(1).max(64),
          region: z.string().min(1).max(64),
          clientName: z.string().trim().min(2).max(120),
          companyName: z.string().trim().min(2).max(160),
          notes: z.string().trim().max(1200).optional(),
        }),
      )
	      .mutation(async ({ input }) => {
	        const saved = await createRfqRequest({
          sector: input.sector,
          service: input.service,
          region: input.region,
          clientName: input.clientName,
          companyName: input.companyName,
	          notes: input.notes || null,
	        });

	        if (!saved) {
	          throw new TRPCError({
	            code: "SERVICE_UNAVAILABLE",
	            message: "RFQ storage is unavailable",
	          });
	        }

	        return { saved } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
