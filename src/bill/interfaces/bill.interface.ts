import mongoose from 'mongoose';
import { CurrencyType } from 'src/common/enums/currency-type.enum';

export interface IBillItem {
  productId: mongoose.Types.ObjectId | string;

  quantity: number;

  cost: number;

  currencyType: CurrencyType;

  createdBy: mongoose.Types.ObjectId | string;

  createdAt: Date | string;

  updatedAt: Date | string;
}

export interface ITotals {
  BSF: number;

  USD: number;
}

export interface IBill {
  _id: mongoose.Types.ObjectId | string;

  tempId: string;

  name: string;

  items: IBillItem[];

  // foreignExchange: ForeignExchangeDocument;

  totals: ITotals;

  createdBy: mongoose.Types.ObjectId | string;

  createdAt: Date | string;

  updatedAt: Date | string;
}
