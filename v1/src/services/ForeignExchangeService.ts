import ForeignExchangeModel from "../models/ForeignExchange.model";
import { ForeignExchange, ForeignExchangeFromDB } from "../types";

import BCV_ForeignExchange from "../utils/BCV_ForeignExchange";

// ****************************************************************************
// 										              crear
// ****************************************************************************

export const createForeignExchange_service = async (
	data: ForeignExchange
): Promise<ForeignExchangeFromDB | null> => {
	try {
		const foreignExchange = new ForeignExchangeModel(data);

		await foreignExchange.save();

		return foreignExchange;
	} catch (error) {
		console.log(error);
		return null;
	}
};

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getForeignExchangeFromBCV =
	async (): Promise<ForeignExchangeFromDB | null> => {
		try {
			const foreignExchangeFromBCV = await BCV_ForeignExchange();

			if (foreignExchangeFromBCV == null) return null;

			const foreignExchange = await createForeignExchange_service({
				...foreignExchangeFromBCV,
				date: new Date(),
			});

			return foreignExchange;
		} catch (error) {
			console.log(error);
			return new ForeignExchangeModel({ value: -1, date: new Date() });
		}
	};

export const getLastForeignExchange_service =
	async (): Promise<ForeignExchangeFromDB | null> => {
		try {
			const dolar = await ForeignExchangeModel.findOne().sort({ date: -1 });

			if (!dolar) return await getForeignExchangeFromBCV();

			return dolar;
		} catch (error) {
			console.log(error);
			return null;
		}
	};
