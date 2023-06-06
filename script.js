const fs = require('fs');

// Get the file path from command line arguments
const filePath = process.argv[2];

// Check if the file path is provided
if (!filePath) {
  console.error('File path not provided. Please provide the path to the input JSON file.');
  return;
}

// Read the input from a JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading input file:', err);
    return;
  }

  try {
    const input = JSON.parse(data);

    // Calculate and display the balance sheet
    const balanceSheet = calculateBalanceSheet(input);

    // ------- Print the balanceSheet to console --------
    console.log(balanceSheet);

  } catch (err) {
    console.error('Error parsing input JSON:', err);
  }
});

// Calculate Balance Sheet from revenue, expense data object ------------------------
const calculateBalanceSheet = (input) => {
    try {
        const { revenueData, expenseData } = input;

        // Extract unique timestamps from revenue and expense data
        const timestamps = Array.from(
            new Set([...revenueData.map((entry) => entry.startDate), ...expenseData.map((entry) => entry.startDate)])
        ).sort();

        // Initialize balance sheet array
        const balanceSheet = [];

        // Calculate balance for each timestamp
        for (const timestamp of timestamps) {
            const revenue = revenueData.filter((entry) => entry.startDate === timestamp).reduce((sum, entry) => sum + entry.amount, 0);
            const expense = expenseData.filter((entry) => entry.startDate === timestamp).reduce((sum, entry) => sum + entry.amount, 0);

            const balance = {
                amount: revenue - expense,
                startDate: timestamp,
            };

            balanceSheet.push(balance);
        }

        // Return -----------------------
        return { balance: balanceSheet };

    } catch (err) {
        console.error('Error: ', err);
    }
}
