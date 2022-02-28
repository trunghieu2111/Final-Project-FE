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
    
  constructor(public customerService: CustomerService,
    private router: Router,
    public serviceCommon: ServiceCommon,
    ) { }

  ngOnInit(): void {
    this.tenantId = this.serviceCommon.tokenTenant.id;
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
