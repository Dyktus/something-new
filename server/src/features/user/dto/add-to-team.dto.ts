import { z } from "zod";

export const ADD_TO_TEAM_DTO = z.object({
    email: z.string().email("Invalid email format"),
    teamId: z.string().uuid()
});

export type AddToTeamDto = z.infer<
    typeof ADD_TO_TEAM_DTO
>;
