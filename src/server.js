import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();
const server = app;

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
