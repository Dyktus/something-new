import { z } from "zod";

export const CHANGE_TEAM_OWNER_DTO_SCHEMA = z.object({
    userId: z.string().uuid(),
});

export type ChangeTeamOwnerDto = z.infer<
    typeof CHANGE_TEAM_OWNER_DTO_SCHEMA
>;
