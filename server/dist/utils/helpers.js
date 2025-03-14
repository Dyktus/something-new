"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare_password = exports.hash_password = void 0;
const bcrypt = require("bcryptjs");
const hash_password = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};
exports.hash_password = hash_password;
const compare_password = (raw, hash) => bcrypt.compareSync(raw, hash);
exports.compare_password = compare_password;
//# sourceMappingURL=helpers.js.map