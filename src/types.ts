import mongoose, { Document } from "mongoose";

// ****************************************************************************
// 										              Productos
// ****************************************************************************

export enum CurrencyType {
	USD = "USD",
	BSF = "BSF",
}
export interface ForeignExchange {
	euro: number;
	dolar: number;
	date: Date;
}

export interface ForeignExchangeFromDB extends Document, ForeignExchange {}

export interface Product {
	_id?: string;
	name: string;
	cost: number;
	currencyType: CurrencyType;
	keywords: string[];
	priority: number;
	favorite: boolean;
}

export interface ProductFromDB extends Document, Product {
	_id: string;
	updateCostReferences(): void;
	updateMyCost(foreignExchange: ForeignExchange): number;
}

// ****************************************************************************
// 										          productos: referencias
// ****************************************************************************

export interface ProductReference {
	parentId: string;
	childId: string;
	cost: number;
	currencyType: CurrencyType;
	percentage: number;
	// cambiar por "quantity"
	amount: number;
}

export interface ProductReferenceFromDB extends ProductReference, Document {
	_id: mongoose.Types.ObjectId;
}

// ****************************************************************************
// 										          productos: Settings
// ****************************************************************************

export interface ProductSettings {
	stopwatchProductId: mongoose.Types.ObjectId | null;
}

export interface ProductSettingsFromDB extends ProductSettings, Document {
	_id: mongoose.Types.ObjectId;
}

// ****************************************************************************
// 										          Cronometros
// ****************************************************************************

export interface Stopwatch {
	_id?: string;
	name: string;
	timeDate: number;
	accumulatedTime: number;
	timeSeted: number | null;
}

export interface StopwatchFromDB extends Document {
	_id: mongoose.Types.ObjectId;
}

// ****************************************************************************
// 										          bills
// ****************************************************************************

export interface BillItem {
	productId: string;
	quantity: number;
	cost: number;
	currencyType: CurrencyType;
}

export interface BillTotals {
	BSF: number;
	USD: number;
}

export interface Bill {
	name: string;
	date: Date;
	items: BillItem[];
	foreignExchange: ForeignExchange;
	totals: BillTotals;
}

export interface BillFromSocket extends Bill {
	_id: string;
}

export interface BillFromDB extends Bill, Document {
	_id: mongoose.Types.ObjectId;
}
