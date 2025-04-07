import {
    OpenAPIRegistry,
    OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import {ADD_TO_TEAM_DTO} from "../src/features/user/dto/add-to-team.dto";

// Register definitions here

const generator = new OpenApiGeneratorV3([ADD_TO_TEAM_DTO]);

generator.generateComponents();
