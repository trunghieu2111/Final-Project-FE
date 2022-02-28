import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceGTKTService extends ServiceBaseService{

  getListInvoiceGTKT(tenantId:any, keyword: any = null){
    if(keyword == null){
      return this.get(`api/app/invoice-header?TenantID=${tenantId}`);
    }else{
      return this.get(`api/app/invoice-header?Keyword=${keyword}&TenantID=${tenantId}`);
    }
  }
  // ${keyword?('?Keyword='+keyword):''} nếu tồn tại keyword thì thêm đoạn url sau nếu không thì rỗng;
  
  updateInvoiceGTKT(params: any){
    return this.put(`api/app/invoice-header/${params.id}`, params);
  }

  getInfoInvoiceGTKTByID(id: any){
    return this.get(`api/app/invoice-header/${id}`);
  }

  deleteInvoiceGTKT(id: any){
    return this.delete(`api/app/invoice-header/${id}`);
  }

  createInvoiceGTKT(params: any){
    return this.post(`api/app/invoice-header`, params);
  }
}
