import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ServiceCommon{
    tokenTenant:any = JSON.parse(localStorage.getItem('Token')?(localStorage.getItem('Token')):"");
    tokenUser:any = JSON.parse(localStorage.getItem('TokenUser')?(localStorage.getItem('TokenUser')):"");
    permission:any = JSON.parse(localStorage.getItem('Permission')?(localStorage.getItem('Permission')):"");
}