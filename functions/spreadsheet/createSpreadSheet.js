const { authorize } = require("./authorize");
const { google } = require("googleapis");

exports.handler = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");

    /** new spreadsheet title */
    const title = String(req.query.title);

    if (title) {
        const createSheet = auth => {
            const sheet = google.sheets({ version: "v4", auth });

            const resource = { properties: { title } };
            const request = { resource, fields: "spreadsheetId" };

            sheet.spreadsheets.create(request, (err, response) => {
                if (err) {
                    res.status(501).json({
                        msg: "error creating spreadsheet",
                        err: err
                    });
                } else {
                    res.status(200).json({
                        msg: "created spreadsheet successful",
                        spreadsheetId: response.data.spreadsheetId
                    });
                }
            });
        };

        authorize(createSheet);
    } else {
        res.status(404).json({ msg: "spreadsheet title required" });
    }
};
