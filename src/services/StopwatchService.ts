import { Stopwatch, StopwatchFromDB } from "../types";
import StopwatchModel from "../models/Stopwatch.model";
import mongoose from "mongoose";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getAllStopwatch_service = async (): Promise<StopwatchFromDB[]> => {
	try {
		const stopwatches = await StopwatchModel.find();

		return stopwatches;
	} catch (error) {
		console.log(error);
		return [];
	}
};

// ****************************************************************************
// 										              Crear
// ****************************************************************************

export const createStopwatch_service = async (
	data: Stopwatch
): Promise<StopwatchFromDB | undefined> => {
	try {
		const stopwatch = new StopwatchModel(data);

		await stopwatch.save();

		return stopwatch;
	} catch (error) {
		console.log(error);
		return;
	}
};

// ****************************************************************************
// 										              Actualizar
// ****************************************************************************

export const updateStopwatch_service = async (
	_id: string | mongoose.Types.ObjectId,
	data: Stopwatch
): Promise<StopwatchFromDB | undefined> => {
	try {
		await StopwatchModel.updateOne({ _id }, data);

		const stopwatch = await StopwatchModel.findById(_id);

		if (!stopwatch) return;

		return stopwatch;
	} catch (error) {
		console.log(error);
		return;
	}
};

// ****************************************************************************
// 										              Actualizar
// ****************************************************************************

export const deleteStopwatch_service = async (
	_id: string | mongoose.Types.ObjectId
): Promise<boolean | undefined> => {
	try {
		const result = await StopwatchModel.deleteOne({ _id });

		return !!result.deletedCount;
	} catch (error) {
		console.log(error);
		return;
	}
};
