import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const ADD_TO_TEAM_DTO = z.object({
    email: z.string().email("Invalid email format"),
    teamId: z.string().uuid()
}).openapi('user');

export type AddToTeamDto = z.infer<
    typeof ADD_TO_TEAM_DTO
>;
