import { DolarValue, DolarValueFromDB } from "../types";
import DolarValueModel from "../models/DolarValue";
import BCV_ForeignExchange from "../utils/BCV_ForeignExchange";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getDolar_service = async (): Promise<
	DolarValueFromDB | DolarValue
> => {
	try {

		const foreignExchange = await BCV_ForeignExchange();

		if (foreignExchange != null) {
			await createDolarValue({
				value: foreignExchange.dolar,
				date: new Date(),
			});
		}


		const dolar =
			(await DolarValueModel.findOne().sort({ date: -1 })) ||
			(await getDolarFromBCV());

		return dolar;
	} catch (error) {
		console.log(error);
		return { value: 0, date: new Date(1997) };
	}
};

export const getDolarFromBCV = async (): Promise<DolarValueFromDB> => {
	return new DolarValueModel({});
};

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
