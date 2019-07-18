const { authorize } = require("./authorize");
const { google } = require("googleapis");

exports.handler = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");

    const spreadsheetId = String(req.query.ssid);

    const title = String(req.query.title);

    if (spreadsheetId && title) {
        const resource = {
            requests: [{ addSheet: { properties: { title } } }]
        };
        const createWorkSheet = auth => {
            try {
                const sheet = google.sheets({ version: "v4", auth });
                const request = { spreadsheetId, resource };

                sheet.spreadsheets.batchUpdate(request, (response, err) => {
                    console.log(response, err);
                    if (response) {
                        res.status(200).json({
                            msg: "worksheet created successfully",
                            response: response
                        });
                    } else {
                        res.status(501).json({
                            msg: "error creating spreadsheet",
                            err: err
                        });
                    }
                });
            } catch (e) {
                console.log("error", e.message);
            }
        };

        authorize(createWorkSheet);
    } else {
        res.status(501).json({
            msg: "spreadsheetId and worksheet title required...",
            err: err
        });
    }
};
