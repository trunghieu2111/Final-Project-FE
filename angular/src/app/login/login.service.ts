import { Injectable } from '@angular/core';
import { ServiceBaseService } from '../services/service-base.service';

@Injectable({
    providedIn: 'root'
})
export class ServiceLogin extends ServiceBaseService {
    loginTenantInvoice(taxcode: any) {
        return this.get(`api/app/login/branch/${taxcode}`);
    }
    loginAccountInvoice(params: any){
        return this.post(`api/app/login/account`, params);
    }

    permissionAccount(id: any){
        return this.get(`api/app/authen-permission/${id}`);
    }
}