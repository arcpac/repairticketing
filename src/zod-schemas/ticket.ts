import { tickets } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const insertTicketSchema = createInsertSchema(tickets, {
  id: (schema) => z.union([z.number(), z.literal("(NEW)")]),
  title: (schema) => schema.min(1, "Title is required"),
  description: (schema) => schema.min(1, "Desctiption is required"),
  tech: (schema) => schema.email("Tech is required"),
});

export const selectTicketSchema = createSelectSchema(tickets);

export type insertTicketSchemaType = typeof insertTicketSchema._type;
export type selectTicketSchemaType = typeof selectTicketSchema._type;
