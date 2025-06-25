// import mongoose, { Document, ObjectId } from "mongoose";


// enum CurrencyType {
// 	USD = "USD",
// 	BSF = "BSF",
// }

// export interface ProductReference {
// 	parentId?: mongoose.Types.ObjectId;
// 	cost: number;
// 	percentage: number;
// }

// export interface Product extends Document {
// 	_id: string;
// 	name: string;
// 	cost: number;
// 	currencyType: CurrencyType;
// 	keywords: string[];
// 	costByReference: boolean;
// 	parentReferences: ProductReference[];
// 	calculateCost(references: ProductReference[]): number;
// }

// export interface Frontend_Product {
// 	_id?: string;
// 	name: string;
// 	cost: number;
// 	currencyType: CurrencyType;
// 	keywords: string[];
// 	costByReference: boolean;
// 	parentReferences: ProductReference[];
// }
