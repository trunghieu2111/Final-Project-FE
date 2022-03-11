import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ServiceCommon } from 'src/app/share/common.service';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-list-permission',
  templateUrl: './list-permission.component.html',
  styleUrls: ['./list-permission.component.css']
})
export class ListPermissionComponent implements OnInit {

  // subIndex:number = -1;
  // flag: boolean = false;
  // flagTT:number = 1;
  // itemBranch: IData ={}
  // data: IData[] = [
  //   { tenquyen: 'abc', quyenqltaikhoan: true, quyenqlquyen: true, quyenqlchinhanh: true, quyenqlkhachhang: false },
  //   { tenquyen: 'ayz', quyenqltaikhoan: true, quyenqlquyen: true, quyenqlchinhanh: true, quyenqlkhachhang: true },
  //   { tenquyen: '123', quyenqltaikhoan: true, quyenqlquyen: true, quyenqlchinhanh: true, quyenqlkhachhang: false }];
  
  // dataBetween:IData[]= this.data;
  // dataBetween để làm data trung gian cho lúc tìm kiếm nên mỗi lần thêm sửa xóa phải gán lại data = dataBetween.
  data: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  total:number = 0;
  tenantId:any;
  permissionAthen = {add: false, list: false, edit: false, del: false};

  constructor(public permissionService: PermissionService,
    public serviceCommon: ServiceCommon,
    private modal: NzModalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.tenantId = this.serviceCommon.tokenTenant.id;
    for(let i of this.serviceCommon.permission){
      if(i.id.toUpperCase() ==  "B22B8690-BD30-484C-94B8-7BFC4903901A"){
        this.permissionAthen.list = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "B22B8690-BD30-484C-94B8-7BFC4903903A"){
        this.permissionAthen.edit = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "B22B8690-BD30-484C-94B8-7BFC4903904A"){
        this.permissionAthen.del = true;
        continue;
      }
      else if(i.id.toUpperCase() ==  "B22B8690-BD30-484C-94B8-7BFC4903902A"){
        this.permissionAthen.add = true;
        continue;
      }
    }
    this.loadData();
  }

  public loadData(){
    this.permissionService.getListPermission(this.tenantId).subscribe((data) => {
      this.data = data.items;
      this.total = this.data.length;
      //console.log(data);
    })
  }

  notifiPermission(){
    this.modal.error({
      nzTitle: 'Lỗi',
      nzContent: 'Tài khoản của bạn không được phép sử dụng chức năng này!'
    });
  }

  addPermission() {
    this.router.navigate(['hethong/quyen/form-permission', 0]);
  }

  removePermission(index:any){
    this.permissionService.deletePermission(index).subscribe((data) => {
      this.loadData();
    });
  }

  editPermission(index:any){
    this.router.navigate(['hethong/quyen/form-permission', index]);
  }

  onKey(keyword:any){
    this.permissionService.getListPermission(this.tenantId, keyword.target.value).subscribe((data) =>{
      //Gán lại data để hiển thị tìm kiếm.
      this.data = data.items;
      this.total = this.data.length;
    })
  }

}
