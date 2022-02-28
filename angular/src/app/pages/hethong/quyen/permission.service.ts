import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends ServiceBaseService{

  getListPermission(tenantId:any, keyword: any = null){
    if(keyword == null){
      return this.get(`api/app/permission?TenantID=${tenantId}`);
    }else{
      return this.get(`api/app/permission?Keyword=${keyword}&TenantID=${tenantId}`);
    }
  }
  // ${keyword?('?Keyword='+keyword):''} nếu tồn tại keyword thì thêm đoạn url sau nếu không thì rỗng;
  updatePermission(params: any){
    return this.put(`api/app/permission/${params.id}`, params);
  }

  getInfoPermissionByID(id: any){
    return this.get(`api/app/permission/${id}`);
  }

  deletePermission(id: any){
    return this.delete(`api/app/permission/${id}`);
  }

  createPermission(params: any){
    return this.post(`api/app/permission`, params);
  }
}
