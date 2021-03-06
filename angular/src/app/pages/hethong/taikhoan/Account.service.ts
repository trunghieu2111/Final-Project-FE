import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ServiceBaseService{

  getListAccount(tenantId:any, keyword: any = null){
    if(keyword == null){
      return this.get(`api/app/account-role?TenantID=${tenantId}`);
    }else{
      return this.get(`api/app/account-role?Keyword=${keyword}&TenantID=${tenantId}`);
    }
  }
  // ${keyword?('?Keyword='+keyword):''} nếu tồn tại keyword thì thêm đoạn url sau nếu không thì rỗng;
  updateAccount(params: any){
    return this.put(`api/app/account-role/${params.id}`, params);
  }

  getInfoAccountByID(id: any){
    return this.get(`api/app/account-role/${id}`);
  }

  deleteAccount(id: any){
    return this.delete(`api/app/account-role/${id}`);
  }

  createAccount(params: any){
    return this.post(`api/app/account-role`, params);
  }

  lockAccount(id: any){
    return this.get(`api/app/account/lock-account?id=${id}`);
  }

  unlockAccount(id: any){
    return this.get(`api/app/account/unlock-account?id=${id}`);
  }
}
