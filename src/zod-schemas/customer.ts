import { customers } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "First name is required"),
  lastName: (schema) => schema.min(1, "Last name is required"),
  email: (schema) => schema.email("Email is required"),
  address1: (schema) => schema.min(1, "Address line 1 is required"),
  address2: (schema) => schema.optional(),
  city: (schema) => schema.min(1, "City is required"),
  state: (schema) => schema.length(2, "State should be 2 characters"),
  zip: (schema) =>
    schema
      .min(5, "Zip code should be at least 5 characters")
      .max(10, "Zip code should be at most 10 characters"),
  phone: (schema) => schema.min(1, "Phone number is required"),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;
export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
