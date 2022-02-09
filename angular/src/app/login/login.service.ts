import { Injectable } from '@angular/core';
import { ServiceBaseService } from '../services/service-base.service';

@Injectable({
    providedIn: 'root'
})
export class ServiceLogin extends ServiceBaseService {
    //   flagPermission:any = localStorage.getItem('flagPermission')?(localStorage.getItem('flagPermission')):"";
    //   flagSinhvienId:any =  localStorage.getItem('flagSinhvienId')?(localStorage.getItem('flagSinhvienId')):"";

    //localStorage.getItem('birthday')
    //flagLogin = true;
    loginTenantInvoice(taxcode: any) {
        return this.get(`api/app/login/branch/${taxcode}`);
    }
    loginAccountInvoice(params: any){
        return this.post(`api/app/login/account`, params);
      }
}