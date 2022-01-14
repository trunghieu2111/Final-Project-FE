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
  flagCreateorUpdateInvoiceDetail = true; //Create
  indexOfInvoiceDetailUpdate: number;
  isVisible = false;
  //MoneyTaxSellBeforeEdit: number;

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
  SubInvoiceTaxBreaks: IDataTaxBreaks[] = [];
  TaxBreaks: number[] = [];
  nameTaxBreak: string;
  totalProduct: number = 0;
  totalTax: number = 0;
  totalPay: number = 0;

  intoMoneyAffer: number;
  PercentDiscountBeforeTax: number = 0;
  MoneyTaxSell: number;
  quantity: number;
  priceAffter: number = 0;
  PercentTaxSellinForm = 0;

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
      //id: [],
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
    //tính thuế suất khi âm
    // if (Number(this.submitFormDetails.get('percentTaxSell')?.value) < 0) {
    //   this.PercentTaxSellinForm = 0;
    //   console.log("vào <0");
    // }
    // else {
    //   console.log("vào >0");
    //   this.PercentTaxSellinForm = (Number(this.submitFormDetails.get('percentTaxSell')?.value) * Number(this.submitFormDetails.get('intoMoney')?.value)) / 100;
    // }

    if (this.flagCreateorUpdateInvoiceDetail == true) {
      const par = {
        id: 0,
        //invoiceId: this.InvoiceDetails[0].invoiceId,
        nameProduct: this.submitFormDetails.get('nameProduct')?.value,
        productId: this.submitFormDetails.get('productId')?.value,
        content: this.submitFormDetails.get('content')?.value,
        unit: this.submitFormDetails.get('unit')?.value,
        quantity: this.submitFormDetails.get('quantity')?.value,
        price: this.submitFormDetails.get('price')?.value,
        percentTaxSell: Number(this.submitFormDetails.get('percentTaxSell')?.value),
        percentDiscountBeforeTax: this.submitFormDetails.get('percentDiscountBeforeTax')?.value,
        percentMoney: this.submitFormDetails.get('percentMoney')?.value,
        intoMoney: this.submitFormDetails.get('intoMoney')?.value,
      }
      this.InvoiceDetails.push(par);
      this.InvoiceDetails = [...this.InvoiceDetails];
      this.calculateTaxSell();
      console.log("dataTaxx:", this.InvoiceTaxBreaks);
      console.log("data:", this.InvoiceDetails);
    }
    else {
      for (let i = 0; i < this.InvoiceDetails.length; i++) {
        if (this.InvoiceDetails[i].id == this.InvoiceDetails[this.indexOfInvoiceDetailUpdate].id) {
          const par = {
            id: this.InvoiceDetails[i].id,
            //invoiceId: this.InvoiceDetails[i].invoiceId,
            nameProduct: this.submitFormDetails.get('nameProduct')?.value,
            productId: this.submitFormDetails.get('productId')?.value,
            content: this.submitFormDetails.get('content')?.value,
            unit: this.submitFormDetails.get('unit')?.value,
            quantity: this.submitFormDetails.get('quantity')?.value,
            price: this.submitFormDetails.get('price')?.value,
            percentTaxSell: Number(this.submitFormDetails.get('percentTaxSell')?.value),
            percentDiscountBeforeTax: this.submitFormDetails.get('percentDiscountBeforeTax')?.value,
            percentMoney: this.submitFormDetails.get('percentMoney')?.value,
            intoMoney: this.submitFormDetails.get('intoMoney')?.value,
          }
          this.InvoiceDetails[i] = par;
          this.InvoiceDetails = [...this.InvoiceDetails];
          console.log("dataDetail Sửa:", this.InvoiceDetails);
          break;
        }
      }
      this.calculateTaxSell();
      console.log("dataTaxx:", this.InvoiceTaxBreaks);
      console.log("data:", this.InvoiceDetails);
      this.flagCreateorUpdateInvoiceDetail = true;
    }
    this.submitFormDetails.reset();
    this.isVisible = false;
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
        dateInvoice: String(data.invoiceDay).slice(0, 10),
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

      // console.log("dataTaxxLoad:", this.InvoiceTaxBreaks);
      // console.log("dataLoad:", this.InvoiceDetails);
      this.SubInvoiceTaxBreaks = this.InvoiceTaxBreaks;
    });
  }

  removeInvoiceDetail(id: any) {
    for (let i of this.InvoiceDetails) {
      if (i.id == id) {
        this.InvoiceDetails = this.InvoiceDetails.filter(item => item != i);
        this.InvoiceDetails = [...this.InvoiceDetails];
        // console.log("data:", this.InvoiceDetails);
        break;
      }
    }
    this.calculateTaxSell();
    // console.log("dataTaxx:", this.InvoiceTaxBreaks);
    // console.log("data:", this.InvoiceDetails);

  }

  handTaxSell() {
    //gán id cho thuế sau khi xử lý
    for(let i = 0; i< this.InvoiceTaxBreaks.length; i++){
      var check = 0;
      for(let j =0; j<this.SubInvoiceTaxBreaks.length;j++){
        if(this.InvoiceTaxBreaks[i].percentTaxSell==this.SubInvoiceTaxBreaks[j].percentTaxSell){
          this.InvoiceTaxBreaks[i].id = this.SubInvoiceTaxBreaks[j].id;
          check = 1;
          //console.log("check vào:", check);
          break;
        }
      }
      if(check == 0){
        this.InvoiceTaxBreaks[i].id = 0;
        //console.log("check không vào:", check);
      }
    }
    //console.log("datatxxxxx:", this.InvoiceTaxBreaks);
  }
  calculateTaxSell() {
    //tính thuế suất khi âm
    this.InvoiceTaxBreaks = [];
    this.TaxBreaks = [];
    //console.log("chitite:", this.InvoiceDetails);
    for (let i = 0; i < this.InvoiceDetails.length; i++) {
      //console.log("chitite:", this.InvoiceDetails[i]);
      if (this.InvoiceDetails[i].percentTaxSell < 0) {
        this.PercentTaxSellinForm = 0;
        //console.log("vào <0");
      }
      else {
        //console.log("vào >0");
        this.PercentTaxSellinForm = (this.InvoiceDetails[i].percentTaxSell * this.InvoiceDetails[i].intoMoney) / 100;
      }

      if (this.TaxBreaks.includes(this.InvoiceDetails[i].percentTaxSell)) {
        //console.log("trùng");
        for (let j of this.InvoiceTaxBreaks) {
          if (j.percentTaxSell == this.InvoiceDetails[i].percentTaxSell) {
            j.moneyTaxSell += this.PercentTaxSellinForm;
            break;
          }
        }
        //console.log("tax:", this.TaxBreaks);
      }
      else {
        //console.log("khongtrùng");
        for (let j of this.taxs) {
          if (j.value == this.InvoiceDetails[i].percentTaxSell) {
            this.nameTaxBreak = j.lable;
          }
        }
        const taxBreak = {
          nameTaxSell: this.nameTaxBreak,
          percentTaxSell: this.InvoiceDetails[i].percentTaxSell,
          moneyTaxSell: this.PercentTaxSellinForm,
        }
        this.InvoiceTaxBreaks.push(taxBreak);
        this.InvoiceTaxBreaks = [...this.InvoiceTaxBreaks];
        this.TaxBreaks.push(Number(this.InvoiceDetails[i].percentTaxSell));
        //console.log("tax:", this.TaxBreaks);
      }
    }

    this.totalProduct = 0;
    for (let i of this.InvoiceDetails) {
      this.totalProduct += i.intoMoney;
    }
    this.totalTax = 0;
    for (let i of this.InvoiceTaxBreaks) {
      this.totalTax += i.moneyTaxSell;
    }
    this.totalPay = this.totalProduct + this.totalTax;
    this.handTaxSell();
  }
  editInvoiceDetail(id: any) {
    this.flagCreateorUpdateInvoiceDetail = false;
    for (let i = 0; i < this.InvoiceDetails.length; i++) {
      if (this.InvoiceDetails[i].id == id) {
        this.submitFormDetails.patchValue({
          nameProduct: this.InvoiceDetails[i].nameProduct,
          productId: this.InvoiceDetails[i].productId,
          content: this.InvoiceDetails[i].content,
          unit: this.InvoiceDetails[i].unit,
          quantity: this.InvoiceDetails[i].quantity,
          price: this.InvoiceDetails[i].price,
          percentTaxSell: this.InvoiceDetails[i].percentTaxSell,
          percentMoney: this.InvoiceDetails[i].percentMoney,
          percentDiscountBeforeTax: this.InvoiceDetails[i].percentDiscountBeforeTax,
        })
        this.intoMoneyAffer = this.InvoiceDetails[i].intoMoney;
        this.indexOfInvoiceDetailUpdate = i;
        //this.MoneyTaxSellBeforeEdit = this.InvoiceDetails[i].percentMoney;
        // console.log(this.InvoiceDetails[i].percentMoney);

        //xử lý chọn sau:
        // this.selectedValueTaxSell = i.percentTaxSell;
        break;
      }
    }
    this.showModal();
  }
  onSubmit() {
    //console.log(this.flagInvoiceDetail);
    const valid = this.submitForm.valid;
    if(valid){
      if (this.isShowCreateOrUpdate) { // Update
        const params = {
          id: this.ids,
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
        this.invoiceService.updateInvoiceGTKT(params).subscribe((data) => {
          this._location.back();
        })
      } else { // CREATE
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
      }
    }else{
      for (const i in this.submitForm.controls) {
        if (this.submitForm.controls.hasOwnProperty(i)) {
          this.submitForm.controls[i].markAsDirty();
          this.submitForm.controls[i].updateValueAndValidity();
        }
      }
    }

  }
  onChange(taxSell: any) {
    if (taxSell < 0) {
      this.MoneyTaxSell = 0;
    }
    else {
      this.MoneyTaxSell = (taxSell * this.intoMoneyAffer) / 100;
    }
    //test để chạy được đã phần chiết khấu
    this.PercentDiscountBeforeTax = 0;
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
