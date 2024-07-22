const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Arrays to store statuses from text and CSV files
const jTextArray = [];
const jCsvArray = [];

/**
 * Processes all text files in the given directory and extracts 'Status' and 'BatchReferenceNo'.
 * @param {string} sourceDir - The directory containing the text files.
 * @param {string} fileStatus - The status of the file (not used in the current implementation).
 * @returns {Promise<void>}
 */
const processTextFiles = (sourceDir, fileStatus) => {
  return new Promise((resolve, reject) => {
    fs.readdir(sourceDir, (err, files) => {
      if (err) return reject(err);

      const promises = files.map((file) => {
        const filePath = path.join(sourceDir, file);
        return new Promise((res, rej) => {
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) return rej(err);

            // Split file content into lines
            const lines = data.split("\n");
            if (lines.length >= 2) {
              const headers = lines[0].split(",");
              const values = lines[1].split(",");

              const statusIndex = headers.indexOf("Status");
              const batchReferenceNoIndex = headers.indexOf("BatchReferenceNo");

              if (statusIndex !== -1 && batchReferenceNoIndex !== -1) {
                const status = values[statusIndex];
                const batchReferenceNo = values[batchReferenceNoIndex];
                jTextArray[batchReferenceNo] = status;
              }
            }
            res();
          });
        });
      });

      // Wait for all file processing promises to resolve
      Promise.all(promises).then(resolve).catch(reject);
    });
  });
};

/**
 * Processes all CSV files in the given directory and extracts 'DocEntry' and 'U_TS_Status'.
 * @param {string} directory - The directory containing the CSV files.
 * @param {string} fileStatus - The status of the file (not used in the current implementation).
 * @returns {Promise<void>}
 */
const processCSVFiles = (directory, fileStatus) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) return reject(err);

      const promises = files.map((file) => {
        if (path.extname(file) === ".csv") {
          return new Promise((res, rej) => {
            const filePath = path.join(directory, file);
            fs.createReadStream(filePath)
              .pipe(csv())
              .on("data", (row) => {
                const docEntry = row["DocEntry"];
                const bpStatus = row["U_TS_Status"];
                if (docEntry && bpStatus)
                  jCsvArray[docEntry] = bpStatus;
              })
              .on("end", () => {
                console.log(`Processed ${file}`);
                res();
              })
              .on("error", rej);
          });
        }
        return Promise.resolve();
      });

      // Wait for all file processing promises to resolve
      Promise.all(promises).then(resolve).catch(reject);
    });
  });
};

module.exports = { processTextFiles, processCSVFiles };
