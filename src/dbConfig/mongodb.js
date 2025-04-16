import debugConsole from "@/utils/debugger";
import mongoose from "mongoose";

const connectMongoDB = async () => {
	try {
		if (process.env.MONGODB_URI) {
			mongoose.connect(process.env.MONGODB_URI);
			const connection = mongoose.connection;
			connection.on("connected", () => debugConsole("Connected to MongoDB"));
			connection.on("error", (err) => {
				debugConsole("MongoDB connection error, Please make sure MogoDB is running, " + err);
				process.exit();
			});
		} else {
			throw new Error("MONGODB_URI is missing in your environment variable");
		}
	} catch (error) {
		debugConsole(error);
	}
};

export default connectMongoDB;
