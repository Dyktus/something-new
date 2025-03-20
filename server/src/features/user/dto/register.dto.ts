import { z } from "zod";

export const REGISTER_DTO_SCHEMA = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8).max(28),
    teamData: z.object({
        tax_id: z.string(),
        companyName: z.string(),
        street: z.string(),
        postalCode: z.string(),
        city: z.string(),
        country: z.string(),
        invoice_email: z.string().optional()
    }),
    subscriptionPlanId: z.string()
});

export type RegisterDto = z.infer<
    typeof REGISTER_DTO_SCHEMA
>;
