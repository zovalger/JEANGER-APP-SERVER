import BillModel from "../models/Bill.model";
import { Bill, BillFromDB } from "../types";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getBills_service = async (): Promise<
	BillFromDB[] | [] | undefined
> => {
	try {
		const bills = await BillModel.find();

		return bills;
	} catch (error) {
		console.log(error);
		return;
	}
};

// export const getBill_service = async (
// 	_id: string | ObjectId
// ): Promise<BillFromDB | undefined> => {
// 	try {
// 		const bill = await BillModel.findById(_id);

// 		return bill || undefined;
// 	} catch (error) {
// 		console.log();
// 		return;
// 	}
// };

// ****************************************************************************
// 										              crear
// ****************************************************************************

export const createBill_service = async (
	data: Bill
): Promise<BillFromDB | undefined> => {
	const { name, date, items, foreignExchange, totals } = data;

	try {
		const bill = new BillModel({ name, date, items, foreignExchange, totals });

		await bill.save();

		return bill;
	} catch (error) {
		return;
	}
};

// ****************************************************************************
// 										              actualizar
// ****************************************************************************

export const updateBills_service = async (
	_id: string,
	data: Bill
): Promise<BillFromDB | undefined> => {
	const { items, totals, foreignExchange, name } = data;

	try {
		const bill = await BillModel.findById(_id);

		if (!bill) return;

		bill.name = name;
		bill.items = items;
		bill.totals = totals;
		bill.foreignExchange = foreignExchange;

		await bill.save();

		return bill;
	} catch (error) {
		return;
	}
};

// ****************************************************************************
// 										              eliminar
// ****************************************************************************

export const deleteBill_service = async (
	_id: string
): Promise<boolean | undefined> => {
	try {
		const result = await BillModel.deleteOne({ _id });

		return !!result.deletedCount;
	} catch (error) {
		return;
	}
};
