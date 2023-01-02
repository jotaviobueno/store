import cors from "cors";

import {indexRouter} from "./routes/index.js";

export default function Application (app, express) {
	app.use(cors());
	app.use(express());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json({limit: "50mb"}));
	app.use(indexRouter);
	
}