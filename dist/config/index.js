"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
};
exports.default = config;
