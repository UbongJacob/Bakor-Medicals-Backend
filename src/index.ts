import express from "express";

import startup from "./startup/routes";
import logging from "./startup/logging";
import config from "./startup/config";

const app = express();

logging();
config();
startup(app);

const port = process.env.APP_PORT || 1209;
app.listen(port, () => console.log(`Serving in port ${port}...`));
