const express = require("express");
require("./cronJob");

const app = express();

const PORT = process.env.PORT || 3000;

/**
 * Starts the Express server on the specified port.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
