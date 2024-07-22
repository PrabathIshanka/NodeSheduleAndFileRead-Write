# File Processing with Node.js and Cron

This project demonstrates how to set up a Node.js application that processes text and CSV files from specified directories on a scheduled basis using `node-cron`. The application also logs the success of each scheduled job.

## Features

- Scheduled file processing using `node-cron`.
- Processing of text and CSV files.
- Logging of job success.

## Project Structure

```plaintext
.
├── cronJob.js          # Contains the cron job configuration
├── fileProcessor.js    # Contains functions to process text and CSV files
├── server.js           # Express server setup
├── cron.log            # Log file to track job success (created automatically)
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
