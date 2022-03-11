import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ServiceCommon } from '../share/common.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  permissionAthen = {InforTenant: false};
  constructor(
    public serviceCommon: ServiceCommon,
    private modal: NzModalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    for(let i of this.serviceCommon.permission){
      if(i.id.toUpperCase() ==  "C5385A8F-B8C6-4C02-BF3F-22AF32C8F01A"){
        this.permissionAthen.InforTenant = true;
        break;
      }
    }
  }

  notifiPermission(){
    this.modal.error({
      nzTitle: 'Lỗi',
      nzContent: 'Tài khoản của bạn không được phép sử dụng chức năng này!'
    });
  }

}
