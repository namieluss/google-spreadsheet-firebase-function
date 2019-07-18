"use strict";

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

const {
    createSpreadSheet,
    createWorkSheet,
    updateWorkSheet,
    removeWorkSheet
} = require("./spreadsheet");

// Create and Deploy Multiple Cloud Functions
module.exports = {
    createSpreadSheet: functions.https.onRequest(createSpreadSheet.handler),
    createWorkSheet: functions.https.onRequest(createWorkSheet.handler),
    updateWorkSheet: functions.https.onRequest(updateWorkSheet.handler),
    removeWorkSheet: functions.https.onRequest(removeWorkSheet.handler)
};
