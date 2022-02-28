import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends ServiceBaseService{

  getListCustomer(tenantId:any, keyword: any = null){
    if(keyword == null){
      return this.get(`api/app/customer?TenantID=${tenantId}`);
    }else{
      return this.get(`api/app/customer?Keyword=${keyword}&TenantID=${tenantId}`);
    }
  }
  // ${keyword?('?Keyword='+keyword):''} nếu tồn tại keyword thì thêm đoạn url sau nếu không thì rỗng;
  updateCustomer(params: any){
    return this.put(`api/app/customer/${params.id}`, params);
  }

  getInfoCustomerByID(id: any){
    return this.get(`api/app/customer/${id}`);
  }

  deleteCustomer(id: any){
    return this.delete(`api/app/customer/${id}`);
  }

  createCustomer(params: any){
    return this.post(`api/app/customer`, params);
  }
}
