import {
  ForeignExchange,
  ForeignExchangeDocument,
} from 'src/foreign-exchange/models/foreign-exchange.model';
import { CurrencyType } from 'src/common/enums/currency-type.enum';
import { IBill, IBillItem } from '../interfaces/bill.interface';
import mongoose from 'mongoose';

interface BillHelperResponse extends Pick<IBill, 'items' | 'totals'> {
  updatedItem?: IBillItem;
}

export const updateBillItem = (
  items: IBillItem[],
  billItem: IBillItem,
  foreignExchange: ForeignExchangeDocument,
  options?: { setQuantity?: boolean },
): BillHelperResponse => {
  let newItems = items;

  const oldBillItem = items.find(
    (item) => item.productId.toString() === billItem.productId.toString(),
  );

  const oldQuantity = oldBillItem ? oldBillItem.quantity : 0;

  const newQuantity = options?.setQuantity
    ? billItem.quantity
    : oldQuantity + billItem.quantity;

  // error si se coloca directamente 0 o negativo
  if (newQuantity <= 0)
    throw new Error(
      'no se puede colocar en negativo o en 0, use el boton de eliminar si desea eleminar el producto',
    );

  // anadirlo
  if (!oldBillItem && newQuantity > 0) {
    newItems = [...newItems, billItem];
  } else if (!oldBillItem) {
    const totals = calculateTotals(newItems, foreignExchange);

    return { items: newItems, totals, updatedItem: billItem };
  }

  // actualizarlo
  if (newQuantity > 0) {
    newItems = newItems.map((item) =>
      item.productId === billItem.productId
        ? { ...item, quantity: newQuantity }
        : item,
    );
  }

  const totals = calculateTotals(newItems, foreignExchange);

  return { items: newItems, totals, updatedItem: billItem };
};

export const deleteItemInBill = (
  items: IBillItem[],
  productId: mongoose.Types.ObjectId | string,
  foreignExchange: ForeignExchangeDocument,
): BillHelperResponse => {
  const newItems = items.filter(
    (item) => item.productId.toString() !== productId.toString(),
  );

  const totals = calculateTotals(newItems, foreignExchange);

  return { items: newItems, totals };
};

const calculateTotals = (
  items: IBillItem[],
  foreignExchange: ForeignExchange,
) => {
  const USD = items.reduce((total: number, item: IBillItem) => {
    const { cost, currencyType, quantity } = item;

    let toSum = cost * quantity;

    if (currencyType === CurrencyType.EUR)
      toSum = (toSum * foreignExchange.euro) / foreignExchange.dolar;
    if (currencyType === CurrencyType.BSF)
      toSum = toSum / foreignExchange.dolar;

    return total + toSum;
  }, 0);

  return { USD, BSF: USD * foreignExchange.dolar };
};

export const isIncomingItemMoreRecent = (
  old: string | Date | undefined,
  current: string | Date | undefined,
): boolean => {
  if (!old) return true;
  if (!current) return false;

  const o = typeof old === 'string' ? new Date(old) : old;
  const n = typeof current === 'string' ? new Date(current) : current;

  return n.getTime() > o.getTime();
};

export const getItemInBillList = (
  productId: string,
  items: IBillItem[],
): IBillItem | undefined =>
  items.find((item) => item.productId.toString() === productId);
