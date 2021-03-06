import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService extends ServiceBaseService{

  getListBranch(tenantId:any, keyword: any = null){
    // return this.get(`api/app/branch${keyword?('?Keyword='+keyword):''}`);
    if(keyword == null){
      return this.get(`api/app/branch?TenantID=${tenantId}`);
    }else{
      return this.get(`api/app/branch?Keyword=${keyword}&TenantID=${tenantId}`);
    }
  }
  // ${keyword?('?Keyword='+keyword):''} nếu tồn tại keyword thì thêm đoạn url sau nếu không thì rỗng;
  updateBranch(params: any){
    return this.put(`api/app/branch/${params.id}`, params);
  }

  updateInforBranch(params: any){
    return this.put(`api/app/branch/updateInforTenant/${params.id}`, params);
  }

  getInfoBranchByID(id: any){
    return this.get(`api/app/branch/${id}`);
  }

  deleteBranch(id: any){
    return this.delete(`api/app/branch/${id}`);

    //return this.delete(`room/delete/${id}`);
  }

  createBranch(params: any){
    return this.post(`api/app/branch`, params);
  }
}
