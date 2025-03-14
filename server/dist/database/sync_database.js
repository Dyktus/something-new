"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const db_1 = require("./db");
(0, dotenv_1.config)();
async function syncDatabase() {
    try {
        await db_1.sequelize.sync();
        console.log('Tables synchronized successfully');
    }
    catch (error) {
        console.error('Error synchronizing tables:', error);
    }
    finally {
        // Close the database connection when synchronization is complete
        await db_1.sequelize.close();
    }
}
// Call the syncDatabase function to run the synchronization once
syncDatabase();
//# sourceMappingURL=sync_database.js.map