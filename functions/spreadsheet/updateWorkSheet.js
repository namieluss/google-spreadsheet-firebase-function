const { authorize } = require("./authorize");
const { google } = require("googleapis");

exports.handler = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");

    const spreadsheetId = String(req.body.ssid);
    const range = String(req.body.sheetRange);

    if (spreadsheetId && range) {
        const updateWorkSheet = auth => {
            const sheet = google.sheets({ version: "v4", auth });
            const valueInputOption = "USER_ENTERED";

            const resource = { values: req.body.data };
            const request = {
                range,
                spreadsheetId,
                valueInputOption,
                resource
            };

            // sheet.spreadsheets.values.update
            // sheet.spreadsheets.values.append

            sheet.spreadsheets.values.update(request, (err, response) => {
                if (err) {
                    res.status(501).json({
                        msg: "update worksheet failed",
                        err: err
                    });
                } else {
                    res.status(200).json({
                        msg: "remove worksheet successful",
                        res: response
                    });
                }
            });
        };

        authorize(updateWorkSheet);
    } else {
        res.status(404).json({
            msg: "spreadsheet and range required"
        });
    }
};
