"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express = require("express");
const authRoutes_1 = require("./routes/authRoutes");
const profileRoute_1 = require("./routes/profileRoute");
const cors = require("cors");
(0, dotenv_1.config)();
const app = express();
// const while_list = process.env.CORS_ORIGINS;
// const corsOptions = {
//   origin: (origin, cb) => {
//     if (while_list.indexOf(origin) !== -1) {
//       cb(null, true);
//     } else {
//       cb(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', authRoutes_1.authRoutes);
app.use('/profile', profileRoute_1.profileRoute);
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map