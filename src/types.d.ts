import mongoose, { Document, ObjectId } from "mongoose";

export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
export type Visibility = "great" | "good" | "ok" | "poor";

enum CurrencyType {
	USD = "USD",
	BSF = "BSF",
}

export interface ProductReference {
	parentId?: mongoose.Types.ObjectId;
	cost: number;
	percentage: number;
}

export interface Product extends Document {
	_id: string;
	name: string;
	cost: number;
	currencyType: CurrencyType;
	keywords: string[];
	costByReference: boolean;
	parentReferences: ProductReference[];
	calculateCost(references: ProductReference[]): number;
}

export interface Frontend_Product {
	_id?: string;
	name: string;
	cost: number;
	currencyType: CurrencyType;
	keywords: string[];
	costByReference: boolean;
	parentReferences: ProductReference[];
}

export interface DiaryEntry {
	id: number;
	date: string;
	weather: Weather;
	visibility: Visibility;
	commet: string;
}

export interface SpecialDiaryEntry extends DiaryEntry {
	flightNumber: number;
}
