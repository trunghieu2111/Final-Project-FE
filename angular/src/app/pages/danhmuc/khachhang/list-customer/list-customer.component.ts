import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCommon } from 'src/app/share/common.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  data: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  total:number = 0;
  tenantId:any;
  // pageIndexChange:number = 1;
  permissionAthen = {add: false, list: false, edit: false, del: false};
    
  constructor(public customerService: CustomerService,
    private router: Router,
    public serviceCommon: ServiceCommon,
    ) { }

  ngOnInit(): void {
    this.tenantId = this.serviceCommon.tokenTenant.id;
    for(let i of this.serviceCommon.permission){
      if(i.id.toUpperCase() ==  "AABE8729-5FD5-4A88-8D29-7DCB2F18E567"){
        this.permissionAthen.list = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "D2EC9A7F-3B38-406D-8C76-9B2FFA661119"){
        this.permissionAthen.edit = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "39B2CF71-7879-442D-B027-A202C4126D77"){
        this.permissionAthen.del = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "B22B8690-BD30-484C-94B8-7BFC4903900A"){
        this.permissionAthen.add = true;
        continue;
      }
    }
    this.loadData();
  }
  public loadData(){
    this.customerService.getListCustomer(this.tenantId).subscribe((data) => {
      this.data = data.items;
      this.total = this.data.length;
      //console.log(data);
    })
  }

  addCustomer(){
    this.router.navigate(['danhmuc/khachhang/customer-form', 0]);
  }

  removeCustomer(index:any){
    this.customerService.deleteCustomer(index).subscribe((data) => {
      this.loadData();
    });
    //console.log("test");
  }

  editCustomer(index:any){
    this.router.navigate(['danhmuc/khachhang/customer-form', index]);
  }
  
  onKey(keyword:any){
    // let params = {
    //   keyword: keyword.target.value
    // }
    this.customerService.getListCustomer(this.tenantId,keyword.target.value).subscribe((data) =>{
      //Gán lại data để hiển thị tìm kiếm.
      this.data = data.items;
      this.total = this.data.length;
    })
  }

}
