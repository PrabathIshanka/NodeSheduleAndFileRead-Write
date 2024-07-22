const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const { processTextFiles, processCSVFiles } = require("./fileProcessor");

// Define the path to the log file in the current directory
const logFilePath = path.join(__dirname, "cron.log");

/**
 * Schedules a task to run every minute.
 * The task processes text and CSV files from specified directories.
 */
cron.schedule("*/1 * * * *", () => {
  // Process text files and CSV files in parallel
  Promise.all([
    processTextFiles("D:\\Dev\\Node Shedule\\BankDetails", "txt"),
    processCSVFiles("D:\\Dev\\Node Shedule\\BankExcel", "csv"),
  ])
    .then(() => {
      const logMessage = `Successful\n`;
      // Append a success message to the log file
      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
          console.error("Failed to write to log file", err);
        } else {
          console.log("Log message written to file");
        }
      });
    })
    .catch((err) => {
      console.error("Error processing files:", err);
    });
});
