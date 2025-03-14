"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
// Function for retrieving user details
const User_1 = require("../database/schemas/User");
const index = async (req, res) => {
    try {
        // Fetch user profile using req.userId
        const user_db = await User_1.User.findByPk(req.userId);
        if (!user_db) {
            return res.status(404).json({ error: "User not found" });
        }
        else {
            res.json({ username: user_db.username, email: user_db.email });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching profile" });
    }
};
exports.index = index;
//# sourceMappingURL=profileController.js.map