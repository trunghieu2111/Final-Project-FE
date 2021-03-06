import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerService } from '../customer.service';
import { ServiceCommon } from 'src/app/share/common.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  isShowCreateOrUpdate: boolean = false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');
  //flag = true;

  selectedValue = null;
  Citys = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hòa Bình', 'Sơn La', 'Điện Biên',
    'Lai Châu', 'Lào Cai', 'Yên Bái', 'Thanh Hóa', 'Nghệ An', 'Hà Tĩnh',
    'Quảng Bình', 'Quảng Trị', 'Thừa Thiên Huế', 'Vũng Tàu', 'Bình Dương', 'Bình Phước', 'Đồng Nai',
    'Tây Ninh', 'Phú Thọ', 'Hà Giang', 'Tuyên Quang', 'Cao Bằng', 'Bắc Kan', 'Thái Nguyên',
    'Lạng Sơn', 'Bắc Giang', 'Quảng Ninh', 'Quảng Nam', 'Quảng Ngãi', 'Bình Định',
    'Phú Yên', 'Khách Hòa', 'Ninh Thuận', 'Bình Thuận', 'Hà Nội', 'Bắc Ninh',
    'Hà Nam', 'Hải Dương', 'Hải Phòng', 'Hưng Yên', 'Nam Định', 'Thái Bình', 'Vĩnh Phúc', 'Ninh Bình',
    'Kon Tum', 'Gia Lai', 'Đăk Lăk', 'Đăk Nông', 'Lâm Đồng', 'An Giang', 'Bạc Liêu', 'Bến Tre',
    'Cà Mau', 'Cần Thơ', 'Đồng Tháp', 'Hậu Giang', 'Kiên Giang', 'Long An', 'Sóc Trăng', 'Tiền Giang',
    'Trà Vinh', 'Vĩnh Long'];

  submitForm: FormGroup;

  constructor(
    private _location: Location,
    public serviceCommon: ServiceCommon,
    private route: ActivatedRoute,
    public customerService: CustomerService,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      customerId: [null, [Validators.required]],
      taxCode: [null, Validators.required],
      fullName: [null, [Validators.required]],
      address: [null, Validators.required],
      legalName: [null, Validators.required],
      bankAcount: [null, Validators.required],
      bankName: [null, Validators.required],
      phone: [null, Validators.required],
      soFax: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      district: [null, Validators.required],
      city: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    if (String(this.ids) !== '0') {
      this.isShowCreateOrUpdate = true;
      this.loadData(this.ids);
      //this.flag = false;
    }
  }

  public loadData(id: any) {
    this.customerService.getInfoCustomerByID(id).subscribe((data) => {
      this.submitForm.patchValue({
        customerId: data.customerId,
        taxCode: data.taxCode,
        fullName: data.name,
        address: data.address,
        legalName: data.daidienphapnhan,
        bankAcount: data.stk,
        bankName: data.tenNH,
        phone: data.sdt,
        soFax: data.fax,
        email: data.email,
        district: data.district,
        city: data.city
      })
    });
  }

  onSubmit() {
    const valid = this.submitForm.valid;
    if (valid) {
      if (this.isShowCreateOrUpdate) { // Update
        const params = {
          id: this.ids,
          tenantId: this.serviceCommon.tokenTenant.id,
          customerId: this.submitForm.get('customerId')?.value,
          taxCode: this.submitForm.get('taxCode')?.value,
          address: this.submitForm.get('address')?.value,
          name: this.submitForm.get('fullName')?.value,
          city: this.submitForm.get('city')?.value,
          district: this.submitForm.get('district')?.value,
          daidienphapnhan: this.submitForm.get('legalName')?.value,
          stk: String(this.submitForm.get('bankAcount')?.value),
          tenNH: this.submitForm.get('bankName')?.value,
          sdt: "0" + this.submitForm.get('phone')?.value,
          fax: this.submitForm.get('soFax')?.value,
          email: this.submitForm.get('email')?.value
        }
        this.customerService.updateCustomer(params).subscribe((data) => {
          this._location.back();
        })
      } else { // CREATE
        const params = {
          tenantId: this.serviceCommon.tokenTenant.id,
          customerId: this.submitForm.get('customerId')?.value,
          taxCode: this.submitForm.get('taxCode')?.value,
          address: this.submitForm.get('address')?.value,
          name: this.submitForm.get('fullName')?.value,
          city: this.submitForm.get('city')?.value,
          district: this.submitForm.get('district')?.value,
          daidienphapnhan: this.submitForm.get('legalName')?.value,
          stk: String(this.submitForm.get('bankAcount')?.value),
          tenNH: this.submitForm.get('bankName')?.value,
          sdt: "0" + this.submitForm.get('phone')?.value,
          fax: this.submitForm.get('soFax')?.value,
          email: this.submitForm.get('email')?.value
        }
        this.customerService.createCustomer(params).subscribe((data) => {
          this._location.back();
        })
      }
    } else {
      for (const i in this.submitForm.controls) {
        if (this.submitForm.controls.hasOwnProperty(i)) {
          this.submitForm.controls[i].markAsDirty();
          this.submitForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }

  back() {
    this._location.back();
  }

}
