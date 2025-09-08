import express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("Hello from Thin Server (CommonJS)!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
