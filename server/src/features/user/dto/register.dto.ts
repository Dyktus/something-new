import { z } from "zod";

export const REGISTER_DTO_SCHEMA = z.object({
    username: z.string(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8).max(28),
});

export type RegisterDto = z.infer<
    typeof REGISTER_DTO_SCHEMA
>;
