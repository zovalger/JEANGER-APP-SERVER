import { DolarValue, DolarValueFromDB } from "../types";
import DolarValueModel from "../models/DolarValue";
import BCV_ForeignExchange from "../utils/BCV_ForeignExchange";

// ****************************************************************************
// 										              crear
// ****************************************************************************

export const createDolarValue = async (
	data: DolarValue
): Promise<DolarValueFromDB | null> => {
	try {
		const dolar = new DolarValueModel(data);

		await dolar.save();

		return dolar;
	} catch (error) {
		console.log(error);
		return null;
	}
};

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getDolarFromBCV = async (): Promise<DolarValueFromDB | null> => {
	try {
		const foreignExchange = await BCV_ForeignExchange();

		if (foreignExchange == null) return null;

		const dolarValue = await createDolarValue({
			value: foreignExchange.dolar,
			date: new Date(),
		});

		return dolarValue;
	} catch (error) {
		console.log(error);
		return new DolarValueModel({ value: -1, date: new Date() });
	}
};

export const getLastDolar_service = async (): Promise<DolarValueFromDB | null> => {
	try {
		const dolar = await DolarValueModel.findOne().sort({ date: -1 });

		if (!dolar) return await getDolarFromBCV();

		return dolar;
	} catch (error) {
		console.log(error);
		return null;
	}
};
