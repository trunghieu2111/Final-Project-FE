import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ServiceCommon } from 'src/app/share/common.service';
import { BranchService } from '../chinhanh/branch.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-infortenant',
  templateUrl: './infortenant.component.html',
  styleUrls: ['./infortenant.component.scss']
})
export class InfortenantComponent implements OnInit {

  taxCodeBuy: any;
  companyNameBuy: any;
  addressBuy: any;
  submitForm: FormGroup;
  ids: any;

  constructor(
    private router: Router,
    private modal: NzModalService,
    private _location: Location,
    public fb: FormBuilder,
    public serviceCommon: ServiceCommon,
    public branchService: BranchService,
  ) {
    this.submitForm = this.fb.group({
      taxCodeBuy: this.taxCodeBuy,
      companyNameBuy: this.companyNameBuy,
      addressBuy: this.addressBuy,
      legalName: [null, Validators.required],
      bankAcount: [null, Validators.required],
      bankName: [null, Validators.required],
      phone: [null, Validators.required],
      soFax: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
    this.taxCodeBuy = this.serviceCommon.tokenTenant.mst;
    this.companyNameBuy = this.serviceCommon.tokenTenant.nameBranch;
    this.addressBuy = this.serviceCommon.tokenTenant.address;
    this.ids = this.serviceCommon.tokenTenant.id;

    this.loadData(this.ids);
  }

  public loadData(id: any) {
    this.branchService.getInfoBranchByID(id).subscribe((data) => {
      this.submitForm.patchValue({
        taxCodeBuy: data.mst,
        companyNameBuy: data.nameBranch,
        addressBuy: data.address,
        legalName: data.legalName,
        bankAcount: data.bankAcount,
        bankName: data.bankName,
        phone: data.phone,
        soFax: data.fax,
        email: data.email,
      })
    });
  }

  onSubmit() {
    const valid = this.submitForm.valid;
    if (valid) {

      const params = {
        id: this.ids,
        legalName: this.submitForm.get('legalName')?.value,
        bankAcount: String(this.submitForm.get('bankAcount')?.value),
        bankName: this.submitForm.get('bankName')?.value,
        phone: "0" + this.submitForm.get('phone')?.value,
        fax: this.submitForm.get('soFax')?.value,
        email: this.submitForm.get('email')?.value
      }
      console.log("dâta", params);
      this.branchService.updateInforBranch(params).subscribe((data) => {
        this.modal.success({
          nzTitle: 'Lưu thông tin doanh nghiệp thành công!'
        });
      })

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
    this.router.navigate(['/hethong']);
  }

}
