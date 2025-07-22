import { ForeignExchange } from 'src/foreign-exchange/models/foreign-exchange.model';
import { CurrencyType } from 'src/common/enums/currency-type.enum';
import { IBill, IBillItem } from '../interfaces/bill.interface';

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

export const updateBillItem = (
  items: IBillItem[],
  billItem: IBillItem,
  foreignExchange: ForeignExchange,
  options?: { setQuantity?: boolean },
): Pick<IBill, 'items' | 'totals'> => {
  const foreignExchangeCurrent = foreignExchange;

  let newItems = items;

  const oldBillItem = items.find(
    (item) => item.productId === billItem.productId,
  );

  const oldQuantity = oldBillItem ? oldBillItem.quantity : 0;

  const newQuantity = options?.setQuantity
    ? billItem.quantity
    : oldQuantity + billItem.quantity;

  // anadirlo
  if (!oldBillItem && newQuantity > 0) {
    newItems = [...newItems, billItem];
  } else if (!oldBillItem) {
    const totals = calculateTotals(newItems, foreignExchangeCurrent);

    return { items: newItems, totals };
  }

  // quitarlo
  if (newQuantity <= 0) {
    newItems = newItems.filter((item) => item.productId !== billItem.productId);
  }

  // actualizarlo
  if (newQuantity > 0) {
    newItems = newItems.map((item) =>
      item.productId === billItem.productId
        ? { ...item, quantity: newQuantity }
        : item,
    );
  }

  const totals = calculateTotals(newItems, foreignExchangeCurrent);

  return { items: newItems, totals };
};

// todo: comentar paso
// export const setOneBillItem = (
//   bill: Bill,
//   billItem: BillItem,
//   foreignExchange: ForeignExchange,
// ): Bill => {
//   const currentBill = bill;
//   const foreignExchangeCurrent = foreignExchange;

//   let newItems = currentBill.items;

//   const oldBillItem = currentBill.items.find(
//     (item) => item.productId === billItem.productId,
//   );

//   const newQuantity = billItem.quantity;

//   // todo: anadirlo

//   if (!oldBillItem && newQuantity > 0) {
//     newItems = [...newItems, billItem];
//   } else if (!oldBillItem) return currentBill;

//   // todo actualizarlo
//   if (newQuantity > 0) {
//     newItems = newItems.map((item) =>
//       item.productId === billItem.productId
//         ? { ...item, quantity: newQuantity }
//         : item,
//     );
//   }

//   const newBillWithTotals = calculateTotals(
//     {
//       ...currentBill,
//       items: newItems,
//     },
//     foreignExchangeCurrent,
//   );

//   return newBillWithTotals;
// };

// export const deleteItemInBill = (
//   bill: Bill,
//   foreignExchange: ForeignExchange,
//   productId: string,
// ): Bill => {
//   const currentBill = bill;

//   const { items } = currentBill;

//   currentBill.items = items.filter(
//     (item) => item.productId.toString() !== productId,
//   );

//   return calculateTotals(currentBill, foreignExchange || undefined);
// };
