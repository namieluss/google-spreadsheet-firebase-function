const { authorize } = require("./authorize");
const { google } = require("googleapis");

exports.handler = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");

    const spreadsheetId = String(req.query.ssid);
    const sheetId = String(req.query.sheetId);

    if (spreadsheetId && sheetId) {
        const removeWorkSheet = auth => {
            const request = {
                spreadsheetId,
                resource: { requests: [{ deleteSheet: { sheetId } }] }
            };

            const sheet = google.sheets({ version: "v4", auth });
            sheet.spreadsheets.batchUpdate(request, (err, response) => {
                if (err)
                    res.status(501).json({
                        msg: "remove worksheet failed",
                        err: err
                    });
                else
                    res.status(200).json({
                        msg: "remove worksheet successful",
                        res: response
                    });
            });
        };
        authorize(removeWorkSheet);
    } else {
        res.status(404).json({
            msg: "spreadsheet id and work sheet id required"
        });
    }
};
