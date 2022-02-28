import { Component, OnInit } from '@angular/core';
import { AuthService } from '@abp/ng.core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ServiceCommon } from 'src/app/share/common.service';
import { AccountService } from './taikhoan/Account.service';
import { CustomerService } from '../danhmuc/khachhang/customer.service';
import { BranchService } from './chinhanh/branch.service';
import { InvoiceGTKTService } from '../invoice01/invoice-gtkt/InvoiceGTKT.service';

@Component({
  selector: 'app-hethong',
  templateUrl: './hethong.component.html',
  styleUrls: ['./hethong.component.css']
})
export class HethongComponent implements OnInit {
  lengthInvoice:number = 0;
  lengthAccount:number = 0;
  lengthTenant:number = 0;
  lengthCustomer:number = 0;
  constructor(
    public serviceCommon: ServiceCommon,
    public accountService: AccountService,
    public customerService: CustomerService,
    public branchService: BranchService,
    public invoiceGTKTService: InvoiceGTKTService
  ) { }

  ngOnInit(): void {
    this.accountService.getListAccount(this.serviceCommon.tokenTenant.id).subscribe((data) => {
      this.lengthAccount = data.items.length;
    })

    this.customerService.getListCustomer(this.serviceCommon.tokenTenant.id).subscribe((data) => {
      this.lengthCustomer = data.items.length;
    })

    this.branchService.getListBranch(this.serviceCommon.tokenTenant.id).subscribe((data) => {
      this.lengthTenant = data.items.length;
    })

    this.invoiceGTKTService.getListInvoiceGTKT(this.serviceCommon.tokenTenant.id).subscribe((data) => {
      this.lengthInvoice = data.items.length;
    })
  }

}
