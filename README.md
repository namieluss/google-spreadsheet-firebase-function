# Google Spreadsheet with Firebase Function
Simple code samples to illustrate how to implement firebase functions with google spreadsheet api v4. To run this app, follow the instructions below.

> Prerequisites to start this project, you need the following installed:
```
- A Google account
- Node.js & npm installed.
```

#### Steps 
1. Clone the project. Navigate to project directory, install the packages required i.e `npm i`.

2. Create Firebase account
Login to an existing account or create new firebase account. After then navigate to [firebase console](https://console.firebase.google.com). Create a new project and take note of the project ID and credentials.

3. Turn on the Google Sheets API
Complete the steps described in [Node.js Quickstart](https://developers.google.com/sheets/api/quickstart/nodejs) page to create a simple Node.js commmand-line application. Once google sheets API is enable, download client configuration and save/replace the file _`credentials.json`_ to with the _`firebase-function-googlesheet/functions/credentials.json`_. Read more about how to generate token in [Node.js Quickstart](https://developers.google.com/sheets/api/quickstart/nodejs).

4. Deploy Functions 
Once all the above, deploy the function to the firebase project you created earlier. Ensure that firebase tools is installed i.e `npm install -g firebase-tools`. You can learn more about [firebase cli](https://firebase.google.com/docs/cli). Run the following commands
    - `firebase init`, select functions
    - `firebase deploy --only functions` to deploy.
    - Take note of the function url triggers.

#### Testing the app
There 4 basic function implemented in these project which are as follow:
- Create new Spreadsheet
    - Parameters 
        - spreadsheet title (title)
    - `curl -d "title=Awesome+Spreadsheet" -X GET https://us-central1-fir-spreadsheet.cloudfunctions.net/createSpreadSheet`
    
- Create new Worksheet 
    - Parameters 
        - spreadsheet id (ssid) and 
        - worksheet name (title)
    - `curl -d "ssid=1RDDg1KlVaiKA-PfHfCz_PYfV7Sj83RTxQitebvy178I&title=Sheet2" -X GET https://us-central1-fir-spreadsheet.cloudfunctions.net/createWorkSheet`
- Update WorkSheet
    - Parameters
        - spreadsheet id (ssid)
        - worksheet name (sheetRange) and 
        - data to add/update
    - `curl -d '{"ssid":"1RDDg1KlVaiKA-PfHfCz_PYfV7Sj83RTxQitebvy178I", "sheetRange": "Sheet2", "data":[['name', 'age', 'gender'], ['john doe', 24, 'male'], ['felicia', 28, 'female']]}' -H "Content-Type: application/json" -X POST https://us-central1-fir-spreadsheet.cloudfunctions.net/updateWorkSheet`
- Remove Worksheek
    - Parameters 
        - spreadsheet id (ssid) and 
        - worksheet id (sheetId)
    - `curl -d "ssid=1RDDg1KlVaiKA-PfHfCz_PYfV7Sj83RTxQitebvy178I&sheetId=492779989" -X GET https://us-central1-fir-spreadsheet.cloudfunctions.net/removeWorkSheet`


#### Note: Enabling billing and APIs for the Cloud Platform project
In order for the backend service to run on Cloud Platform, you need to enable billing and APIs for the project. The Cloud Platform project is the same project you created in Create a Firebase project and has the same project identifier.
1. In the [Cloud Platform Console](https://console.cloud.google.com), select the Firebase project you initially created.
2. Make sure that [billing](https://cloud.google.com/billing/docs/how-to/modify-project) is enabled for your Google Cloud Platform project.

#### References
- [Firebase Setup](https://firebase.google.com/docs/functions/get-started).
- [Google Sheet API v4 - NodeJs Quick Start](https://developers.google.com/sheets/api/quickstart/nodejs).

###### Author: [Suleiman](https://namieluss.com)
