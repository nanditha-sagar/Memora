const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
