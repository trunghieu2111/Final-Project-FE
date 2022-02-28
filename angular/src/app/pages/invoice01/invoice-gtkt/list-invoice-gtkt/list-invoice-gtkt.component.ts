import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    
  constructor(public invoiceGTKTService: InvoiceGTKTService,
    public serviceCommon: ServiceCommon,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.tenantId = this.serviceCommon.tokenTenant.id;
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
