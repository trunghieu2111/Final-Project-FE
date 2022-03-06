import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCommon } from 'src/app/share/common.service';
import { AccountService } from '../Account.service';

@Component({
  selector: 'app-list-acc',
  templateUrl: './list-acc.component.html',
  styleUrls: ['./list-acc.component.css']
})
export class ListAccComponent implements OnInit {
  data: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  total:number = 0;
  tenantId:any;
  permissionAthen = {add: false, list: false, edit: false, del: false};

  constructor(
    public accountService: AccountService,
    private router: Router,
    public serviceCommon: ServiceCommon,
    ) { }

  ngOnInit(): void {
    this.tenantId = this.serviceCommon.tokenTenant.id;
    for(let i of this.serviceCommon.permission){
      if(i.id.toUpperCase() ==  "1ABE8729-5FD5-4A88-8D29-7DCB2F18E567"){
        this.permissionAthen.list = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "3ABE8729-5FD5-4A88-8D29-7DCB2F18E567"){
        this.permissionAthen.edit = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "4ABE8729-5FD5-4A88-8D29-7DCB2F18E567"){
        this.permissionAthen.del = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "2ABE8729-5FD5-4A88-8D29-7DCB2F18E567"){
        this.permissionAthen.add = true;
        continue;
      }
    }
    this.loadData();
  }

  public loadData(){
    this.accountService.getListAccount(this.tenantId).subscribe((data) => {
      this.data = data.items;
      this.total = this.data.length;
      //console.log(data);
    })
  }

  addAccount() {
    this.router.navigate(['hethong/taikhoan/account-form', 0]);
  }

  removeAccount(index:any){
    this.accountService.deleteAccount(index).subscribe((data) => {
      this.loadData();
    });
  }

  editAccount(index:any){
    localStorage.setItem('checkEditAccount', '1');
    this.router.navigate(['hethong/taikhoan/account-form', index]);
  }

  onKey(keyword:any){
    this.accountService.getListAccount(this.tenantId, keyword.target.value).subscribe((data) =>{
      //Gán lại data để hiển thị tìm kiếm.
      this.data = data.items;
      this.total = this.data.length;
    })
  }
}
