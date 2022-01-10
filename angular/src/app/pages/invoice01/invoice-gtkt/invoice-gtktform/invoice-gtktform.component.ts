import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InvoiceGTKTService } from '../InvoiceGTKT.service';
import { IDataDetails, IDataTaxBreaks } from '../dataInvoiceDetail.model';

interface ITax {
  lable: string;
  value: number;
};


@Component({
  selector: 'app-invoice-gtktform',
  templateUrl: './invoice-gtktform.component.html',
  styleUrls: ['./invoice-gtktform.component.css']
})
export class InvoiceGTKTFormComponent implements OnInit {

  pageIndex: number = 1;
  pageSize: number = 5;
  total: number = 0;
  data: any;

  flagInvoiceDetail = false;
  isVisible = false;

  selectedValueTaxSell = null;
  taxs: ITax[] = [
    {
      lable: 'Thuế suất 10%',
      value: 10,
    },
    {
      lable: 'Thuế suất 5%',
      value: 5
    },
    {
      lable: 'Thuế suất 0%',
      value: 0
    },
    {
      lable: 'Không chịu thuế',
      value: -1
    },
    {
      lable: 'Không kê khai',
      value: -2
    }
  ];
  //TaxSell = ['Thuế suất 10%', 'Thuế suất 5%', 'Thuế suất 0%', 'Không chịu thuế', 'Không kê khai', '10% x 70%'];

  isShowCreateOrUpdate: boolean = false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');
  //flag = true;

  selectedValue = null;
  payTypes = ['Tiền mặt', 'Chuyển khoản'];

  submitForm: FormGroup;
  submitFormDetails: FormGroup;
  InvoiceDetails: IDataDetails[] = [];
  InvoiceTaxBreaks: IDataTaxBreaks[] = [];
  TaxBreaks: IDataTaxBreaks[] = [];
  nameTaxBreak: string;
  totalProduct: number = 0;
  totalTax: number = 0;
  totalPay: number = 0;

  intoMoneyAffer: number;
  quantity: number;
  priceAffter: number = 0;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    public invoiceService: InvoiceGTKTService,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      taxCodeBuy: [null, Validators.required],
      companyNameBuy: [null, [Validators.required, Validators.minLength(6)]],
      addressBuy: [null, Validators.required],
      dateInvoice: [null],
      payType: [null],
      invoiceNumber: [null],
      invoiceForm: [null],
      invoiceSign: [null],
      noteInvoice: [null],
      customerIdSell: [],
      taxCodeSell: [],
      companyNameSell: [],
      addressSell: [],
      nameSell: [],
      emailSell: [],
      nameBankSell: [],
      accountBankSell: [],
      //checkbox hóa đơn chiết khấu.
      flagInvoiceDetail: [],
      //detail

      // nameProduct: [],
      // productId: [],
      // content: [],
      // unit: [],
      // quantity: [],
      // price: [],
      // percentTaxSell: [],
      // percentMoney: [],
      // percentDiscountBeforeTax: [],
      // intoMoney: [],
    })

    this.submitFormDetails = this.fb.group({
      //detail
      id: [],
      nameProduct: [],
      productId: [],
      content: [],
      unit: [],
      quantity: [],
      price: [],
      percentTaxSell: [],
      percentMoney: [0],
      percentDiscountBeforeTax: [0],
      intoMoney: [],
    })
  }

  ngOnInit(): void {
    if (String(this.ids) !== '0') {
      this.isShowCreateOrUpdate = true;
      this.loadData(this.ids);
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    //console.log('Button ok clicked!');
    if (this.TaxBreaks.includes(this.submitFormDetails.get('percentTaxSell')?.value)) {
      //console.log("trùng");
      for (let i of this.InvoiceTaxBreaks) {
        if (i.percentTaxSell == this.submitFormDetails.get('percentTaxSell')?.value) {
          i.moneyTaxSell += (Number(this.submitFormDetails.get('percentTaxSell')?.value) * Number(this.submitFormDetails.get('intoMoney')?.value)) / 100;
        }
      }
    }
    else {
      //console.log("khongtrùng");
      for (let i of this.taxs) {
        if (i.value == this.submitFormDetails.get('percentTaxSell')?.value) {
          this.nameTaxBreak = i.lable;
        }
      }
      const taxBreak = {
        nameTaxSell: this.nameTaxBreak,
        percentTaxSell: this.submitFormDetails.get('percentTaxSell')?.value,
        moneyTaxSell: (Number(this.submitFormDetails.get('percentTaxSell')?.value) * Number(this.submitFormDetails.get('intoMoney')?.value)) / 100,
      }
      this.InvoiceTaxBreaks.push(taxBreak);
      this.InvoiceTaxBreaks = [...this.InvoiceTaxBreaks];
    }
    //console.log("dataTax:", this.InvoiceTaxBreaks);
    this.InvoiceDetails.push(this.submitFormDetails.value);
    this.InvoiceDetails = [...this.InvoiceDetails];
    this.TaxBreaks.push(this.submitFormDetails.get('percentTaxSell')?.value);
    this.isVisible = false;

    this.totalProduct = 0;
    for (let i of this.InvoiceDetails) {
      this.totalProduct += i.intoMoney;
    }
    this.totalTax = 0;
    for (let i of this.InvoiceTaxBreaks) {
      this.totalTax += i.moneyTaxSell;
    }
    this.totalPay = this.totalProduct + this.totalTax;
  }

  handleCancel(): void {
    //console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  public loadData(id: any) {
    this.invoiceService.getInfoInvoiceGTKTByID(id).subscribe((data) => {
      this.InvoiceDetails = data.invoiceDetails;
      this.InvoiceTaxBreaks = data.invoiceTaxBreaks;

      this.submitForm.patchValue({
        taxCodeBuy: data.taxCodeBuyer,
        companyNameBuy: data.companyNameBuyer,
        addressBuy: data.addressBuyer,
        // kiểu date input chỉ nhận y-m-d
        dateInvoice: String(data.invoiceDay).slice(0,10),
        payType: data.payments,
        invoiceNumber: data.invoiceNumber,
        invoiceForm: data.invoiceForm,
        invoiceSign: data.invoiceSign,
        noteInvoice: data.invoiceNote,
        customerIdSell: data.customerIdSeller,
        taxCodeSell: data.taxCodeSeller,
        companyNameSell: data.companyNameSeller,
        addressSell: data.addressSeller,
        nameSell: data.fulNameSeller,
        emailSell: data.emailSeller,
        nameBankSell: data.nameBankSeller,
        accountBankSell: data.bankNumberSeller,
      })
      this.totalProduct = data.totalProduct;
      this.totalTax = data.totalTax;
      this.totalPay = data.totalPay;
      //console.log("date:",String(data.invoiceDay).slice(0,10));
    });
  }

  removeInvoiceDetail(id:any){
    for(let i of this.InvoiceDetails){
      if(i.id == id){
        this.InvoiceDetails = this.InvoiceDetails.filter(item => item != i);
        this.InvoiceDetails = [...this.InvoiceDetails];
        // console.log("data:", this.InvoiceDetails);
        break;
      }
    }
  }
  editInvoiceDetail(id:any){
    for(let i of this.InvoiceDetails){
      if(i.id == id){
        this.submitFormDetails.patchValue({
          nameProduct: i.nameProduct,
          productId: i.productId,
          content: i.content,
          unit: i.unit,
          quantity: i.quantity,
          price: i.price,
          percentTaxSell: i.percentTaxSell,
          percentMoney: i.percentMoney,
          percentDiscountBeforeTax: i.percentDiscountBeforeTax,
        })
        this.intoMoneyAffer = i.intoMoney;
        // this.selectedValueTaxSell = i.percentTaxSell;
        break;
      }
    }
    this.showModal();
  }
  onSubmit() {
    const params = {
      taxCodeBuyer: this.submitForm.get('taxCodeBuy')?.value,
      companyNameBuyer: this.submitForm.get('companyNameBuy')?.value,
      addressBuyer: this.submitForm.get('addressBuy')?.value,
      taxCodeSeller: this.submitForm.get('taxCodeSell')?.value,
      customerIdSeller: this.submitForm.get('customerIdSell')?.value,
      companyNameSeller: this.submitForm.get('companyNameSell')?.value,
      fulNameSeller: this.submitForm.get('nameSell')?.value,
      emailSeller: this.submitForm.get('emailSell')?.value,
      addressSeller: this.submitForm.get('addressSell')?.value,
      bankNumberSeller: this.submitForm.get('accountBankSell')?.value,
      nameBankSeller: this.submitForm.get('nameBankSell')?.value,
      invoiceNumber: this.submitForm.get('invoiceNumber')?.value,
      invoiceForm: this.submitForm.get('invoiceForm')?.value,
      invoiceSign: this.submitForm.get('invoiceSign')?.value,
      invoiceDay: this.submitForm.get('dateInvoice')?.value,
      payments: this.submitForm.get('payType')?.value,
      invoiceNote: this.submitForm.get('noteInvoice')?.value,
      totalProduct: this.totalProduct,
      totalTax: this.totalTax,
      totalPay: this.totalPay,
      totalDiscountBeforeTax: 0,
      totalDiscountAfterTax: 0,
      percentDiscountAfterTax: 0,
      invoiceDetails: this.InvoiceDetails,
      invoiceTaxBreaks: this.InvoiceTaxBreaks
    }
    //console.log("data:", params);
    this.invoiceService.createInvoiceGTKT(params).subscribe((data) => {
      this._location.back();
    })


    //console.log(this.flagInvoiceDetail);
    // const valid = this.submitForm.valid;
    // if(valid){
    //   if (this.isShowCreateOrUpdate) { // Update
    //     const params = {
    //       id: this.ids,
    //       customerId: this.submitForm.get('customerId')?.value,
    //       taxCode: this.submitForm.get('taxCode')?.value,
    //       address: this.submitForm.get('address')?.value,
    //       name: this.submitForm.get('fullName')?.value,
    //       city: this.submitForm.get('city')?.value,
    //       district: this.submitForm.get('district')?.value,
    //       daidienphapnhan: this.submitForm.get('legalName')?.value,
    //       stk: this.submitForm.get('bankAcount')?.value,
    //       tenNH: this.submitForm.get('bankName')?.value,
    //       sdt: this.submitForm.get('phone')?.value,
    //       fax: this.submitForm.get('soFax')?.value,
    //       email: this.submitForm.get('email')?.value
    //     }
    //     this.customerService.updateCustomer(params).subscribe((data) => {
    //       this._location.back();
    //     })
    //   } else { // CREATE
    //     const params = {
    //       customerId: this.submitForm.get('customerId')?.value,
    //       taxCode: this.submitForm.get('taxCode')?.value,
    //       address: this.submitForm.get('address')?.value,
    //       name: this.submitForm.get('fullName')?.value,
    //       city: this.submitForm.get('city')?.value,
    //       district: this.submitForm.get('district')?.value,
    //       daidienphapnhan: this.submitForm.get('legalName')?.value,
    //       stk: this.submitForm.get('bankAcount')?.value,
    //       tenNH: this.submitForm.get('bankName')?.value,
    //       sdt: this.submitForm.get('phone')?.value,
    //       fax: this.submitForm.get('soFax')?.value,
    //       email: this.submitForm.get('email')?.value
    //     }
    //     this.customerService.createCustomer(params).subscribe((data) => {
    //       this._location.back();
    //     })
    //   }
    // }else{
    //   for (const i in this.submitForm.controls) {
    //     if (this.submitForm.controls.hasOwnProperty(i)) {
    //       this.submitForm.controls[i].markAsDirty();
    //       this.submitForm.controls[i].updateValueAndValidity();
    //     }
    //   }
    // }

  }

  onKeyQuantity(quantity: any) {
    this.quantity = quantity.target.value;
    this.intoMoneyAffer = this.quantity * this.priceAffter;
  }
  onKey(p: any) {
    this.intoMoneyAffer = this.quantity * Number(p.target.value);
    this.priceAffter = Number(p.target.value);
  }

  back() {
    this._location.back();
  }

}
