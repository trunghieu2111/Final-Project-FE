import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface InvoiceDetailDto {
  id: number;
  invoiceId: number;
  nameProduct?: string;
  productId: number;
  content?: string;
  unit?: string;
  quantity: number;
  price: number;
  percentTaxSell: number;
  percentDiscountBeforeTax: number;
  percentMoney: number;
  intoMoney: number;
}

export interface InvoiceHeaderDto {
  id: number;
  taxCodeBuyer?: string;
  companyNameBuyer?: string;
  addressBuyer?: string;
  taxCodeSeller?: string;
  customerIdSeller: number;
  companyNameSeller?: string;
  fulNameSeller?: string;
  emailSeller?: string;
  addressSeller?: string;
  bankNumberSeller?: string;
  nameBankSeller?: string;
  invoiceNumber: number;
  invoiceForm?: string;
  invoiceSign?: string;
  invoiceDay?: string;
  payments?: string;
  invoiceNote?: string;
  totalDiscountBeforeTax: number;
  totalDiscountAfterTax: number;
  percentDiscountAfterTax: number;
  totalProduct: number;
  totalTax: number;
  totalPay: number;
  invoiceDetails: InvoiceDetailDto[];
  invoiceTaxBreaks: InvoiceTaxBreakDto[];
}

export interface InvoiceHeaderPageDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface InvoiceTaxBreakDto {
  invoiceId: number;
  id: number;
  nameTaxSell?: string;
  percentTaxSell: number;
  moneyTaxSell: number;
}
