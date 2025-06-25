import mongoose from "mongoose";
import { MONGODB_URI } from "../../config";

// Función para conectar a MongoDB
const connectToMongoDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			// useFindAndModify: false,
			// useCreateIndex: true,
		});
		console.log("Conectado a MongoDB");
	} catch (error) {
		console.log("No se pudo conectar a MongoDB");
		console.log(error);
		await new Promise((resolve) => setTimeout(resolve, 5000));
		await connectToMongoDB();
	}
};

export default connectToMongoDB;