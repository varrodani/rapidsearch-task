"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
function connectDB(db) {
    // @ts-ignore
    (0, mongoose_1.connect)(db, { useNewUrlParser: true })
        .then(() => {
        return console.info(`Successfully connected to ${db}`);
    })
        .catch(error => {
        console.error('Error connecting to database: ', error);
    });
}
exports.connectDB = connectDB;
