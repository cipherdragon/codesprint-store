import { google } from 'googleapis';

export async function POST() {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });

    try {
        const result = await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'Sheet1!A1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [['Hello, Google Sheets API!']]
            }
        });

        console.log(result.data)
    } catch (error) {
        console.error(error);
    }
    return Response.json({ message: 'POST request' });
}

export async function GET() {
    return Response.json({ message: 'GET request' });
}