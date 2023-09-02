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
	priority: number;
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
// 										          sockets
// ****************************************************************************

// export enum CurrencyType {
// 	USD = "USD",
// 	BSF = "BSF",
// }

// export interface ServerToClientEvents {
//   [StopwatchEvents.create]: () => void;
//   basicEmit: (a: number, b: string, c: Buffer) => void;
//   withAck: (d: string, callback: (e: number) => void) => void;
// }

// interface ClientToServerEvents {
//   hello: () => void;
// }
