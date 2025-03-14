import { z } from "zod";

export const LOGIN_DTO_SCHEMA = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8).max(28),
});

export type LoginDto = z.infer<
    typeof LOGIN_DTO_SCHEMA
>;
