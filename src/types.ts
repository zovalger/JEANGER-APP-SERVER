import mongoose, { Document } from "mongoose";

// ****************************************************************************
// 										              Productos
// ****************************************************************************

export enum CurrencyType {
	USD = "USD",
	BSF = "BSF",
}
export interface DolarValue {
	value: number;
	date: Date;
}

export interface DolarValueFromDB extends Document, DolarValue {}

export interface Product {
	_id?: string;
	name: string;
	cost: number;
	currencyType: CurrencyType;
	keywords: string[];
}

export interface ProductFromDB extends Document, Product {
	_id: string;
	updateCostReferences(): void;
	updateMyCost(dolarValue: DolarValue): number;
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
// 										          productos: Tareas
// ****************************************************************************

export interface ProductTask extends Document {
	productId: string;
	date: Date;
	timeoutId: number;
}
