import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ServiceCommon } from 'src/app/share/common.service';
import { InvoiceGTKTService } from '../InvoiceGTKT.service';

@Component({
  selector: 'app-list-invoice-gtkt',
  templateUrl: './list-invoice-gtkt.component.html',
  styleUrls: ['./list-invoice-gtkt.component.css']
})
export class ListInvoiceGTKTComponent implements OnInit {

  data: any;
//   checked = false;
//   data = [{acc:"test", tt:"Đã ký", hd:"0001", bb:"abc", tongtienhang: 100000, tongtienthue:10000, tongtt:1110111}
// ];
  pageIndex: number = 1;
  pageSize: number = 5;
  total:number = 0;
  tenantId:any;
  // pageIndexChange:number = 1;
  permissionAthen = {add: false, list: false, edit: false, del: false};
    
  constructor(public invoiceGTKTService: InvoiceGTKTService,
    private modal: NzModalService,
    public serviceCommon: ServiceCommon,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.tenantId = this.serviceCommon.tokenTenant.id;
    for(let i of this.serviceCommon.permission){
      if(i.id.toUpperCase() ==  "F06BE707-4D1D-458A-84CE-C0E5B1BB15B8"){
        this.permissionAthen.list = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "5FDA7B60-2569-4188-88BB-E81433F1AAA6"){
        this.permissionAthen.edit = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "C5385A8F-B8C6-4C02-BF3F-22AF32C8F04A"){
        this.permissionAthen.del = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "32F38657-BDED-4232-91D1-BA558394FF7F"){
        this.permissionAthen.add = true;
        continue;
      }
    }
    this.loadData();
  }
  public loadData(){
    this.invoiceGTKTService.getListInvoiceGTKT(this.tenantId).subscribe((data) => {
      this.data = data.items;
      this.total = this.data.length;
    })
  }

  addInvoice(){
    this.router.navigate(['invoice/invoiceGTKT/form-invoice', 0]);
  }

  notifiPermission(){
    this.modal.error({
      nzTitle: 'Lỗi',
      nzContent: 'Tài khoản của bạn không được phép sử dụng chức năng này!'
    });
  }

  removeInvoice(index:any){
    this.invoiceGTKTService.deleteInvoiceGTKT(index).subscribe((data) => {
      this.loadData();
    });
  }

  editInvoice(index:any){
    this.router.navigate(['invoice/invoiceGTKT/form-invoice', index]);
  }
  
  onKey(keyword:any){
    this.invoiceGTKTService.getListInvoiceGTKT(this.tenantId, keyword.target.value).subscribe((data) =>{
      this.data = data.items;
      this.total = this.data.length;
    })
  }
}
