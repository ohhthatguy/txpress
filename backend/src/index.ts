import  express from "express"
import type { Application, Request, Response } from "express";


const app: Application = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());



// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
