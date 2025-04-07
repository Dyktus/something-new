import { z } from "zod";

export const CHANGE_PASSWORD_DTO_SCHEMA = z.object({
    oldPassword: z.string().min(8).max(28),
    newPassword: z.string().min(8).max(28),
    repeatPassword: z.string().min(8).max(28),
}).refine((data) => data.newPassword === data.repeatPassword, {
    message: 'Hasła muszą być takie same',
    path: ['newPassword'],
});

export type ChangePasswordDto = z.infer<
    typeof CHANGE_PASSWORD_DTO_SCHEMA
>;
