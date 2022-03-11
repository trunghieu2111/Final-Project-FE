import { Component, OnInit } from '@angular/core';
import { BranchService } from '../branch.service';
import { Router } from '@angular/router';
import { ServiceCommon } from 'src/app/share/common.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.css']
})
export class ListBranchComponent implements OnInit {
  data: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  total:number = 0;
  tenantId:any;
  permissionAthen = {add: false, list: false, edit: false, del: false};

  // pageIndexChange:number = 1;
    
  constructor(public branchService: BranchService,
    private modal: NzModalService,
    public serviceCommon: ServiceCommon,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.tenantId = this.serviceCommon.tokenTenant.id;
    for(let i of this.serviceCommon.permission){
      if(i.id.toUpperCase() ==  "5FDA7B60-2569-4188-88B1-E81433F1AAA6"){
        this.permissionAthen.list = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "5FDA7B60-2569-4188-88B2-E81433F1AAA6"){
        this.permissionAthen.edit = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "5FDA7B60-2569-4188-88B4-E81433F1AAA6"){
        this.permissionAthen.del = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "5FDA7B60-2569-4188-88B3-E81433F1AAA6"){
        this.permissionAthen.add = true;
        continue;
      }
    }
    this.loadData();
  }
  public loadData(){
    //console.log("test:", this.tenantId);
    this.branchService.getListBranch(this.tenantId).subscribe((data) => {
      this.data = data.items;
      //this.data = data;
      this.total = this.data.length;
    })
  }

  notifiPermission(){
    this.modal.error({
      nzTitle: 'Lỗi',
      nzContent: 'Tài khoản của bạn không được phép sử dụng chức năng này!'
    });
  }

  addBranch(){
    this.router.navigate(['hethong/chinhanh/branch-form', 0]);
  }

  removeBranch(index:any){
    this.branchService.deleteBranch(index).subscribe((data) => {
      this.loadData();
    });
  }

  editBranch(index:any){
    this.router.navigate(['hethong/chinhanh/branch-form', index]);
  }
  
  onKey(keyword:any){
    this.branchService.getListBranch(this.tenantId,keyword.target.value).subscribe((data) =>{
      this.data = data.items;
      this.total = this.data.length;
    })
  }
}
