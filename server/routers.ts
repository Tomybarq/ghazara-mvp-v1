import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRfqRequest } from "./db";
import { authRouter } from "./auth/authRouter";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: authRouter,
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
