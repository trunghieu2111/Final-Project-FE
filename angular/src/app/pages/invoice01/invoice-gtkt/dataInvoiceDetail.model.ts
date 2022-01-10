export interface IDataDetails {
    id?: number;
    invoiceId?: number;
    nameProduct?: string;
    productId?: number;
    content?: string;
    unit?: string;
    quantity?: number;
    price?: number;
    percentTaxSell?: number;
    percentDiscountBeforeTax?: number;
    percentMoney?: number;
    intoMoney?: number;
}
export interface IDataTaxBreaks {
    id?: number;
    invoiceId?: number;
    nameTaxSell?: string;
    percentTaxSell?: number;
    moneyTaxSell?: number;
    // "invoiceId": 0,
    //   "id": 0,
    //   "nameTaxSell": "string",
    //   "percentTaxSell": 0,
    //   "moneyTaxSell": 0
}