import app from "./app";
import { PORT } from "./config";
import connectToMongoDB from "./db";

(async () => {
	await connectToMongoDB();
	app.listen(PORT);
})();
