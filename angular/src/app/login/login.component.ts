import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ServiceLogin } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Username = '';
  Password = '';
  Tenant = '';
  TenantId : any;
  data:any;
  dataUser:any;

  constructor(
    private router: Router,
    private modal: NzModalService,
    private loginService: ServiceLogin
  ) { }

  submitTenant(){
    //console.log(this.NotifiTenant);
    if(this.Tenant == ''){
      // this.NotifiTenant = "Chưa chọn chi nhánh!";
      this.modal.error({
        nzTitle: 'Lỗi',
        nzContent: 'Chưa chọn chi nhánh. Nhập mã số thuế chi nhánh!'
      });
    }
    else{
      this.loginService.loginTenantInvoice(this.Tenant).subscribe((data) => {
        //console.log(data);
        if(data.mst == 0){
          this.modal.error({
            nzTitle: 'Lỗi',
            nzContent: 'Chi nhánh không hợp lệ!'
          });
        }
        else{
          this.modal.success({
            nzTitle: 'Thành công!'
          });
          this.TenantId = data.id;
          this.data = data;
        }
      })
    }
  }

  submitLogin(){
    //this.router.navigate(['/dashboard'], { replaceUrl: true });

    //console.log("taxxx:", this.TenantId);
    const params = {
      acc: this.Username,
      pass: this.Password,
      tenantId: this.TenantId
    }
    //console.log("pa:", params);
    if(this.Username == '' || this.Password == '' || this.Tenant == ''){
      this.modal.error({
        nzTitle: 'Lỗi',
        nzContent: 'Chưa nhập đầy đủ các thông tin!'
      });
    }
    else{
      this.loginService.loginAccountInvoice(params).subscribe((data) => {
        //console.log("data:", data);
        if(data.id == 0){
          this.modal.error({
            nzTitle: 'Lỗi',
            nzContent: 'Sai tài khoản hoặc mật khẩu!'
          });
        }
        else{
          //console.log("data:", this.data);
          localStorage.setItem('Token', JSON.stringify(this.data));
          localStorage.setItem('TokenUser', JSON.stringify(data));
          this.router.navigate(['/hethong'], { replaceUrl: true });
          // replaceUrl: true xóa lịch sử đường dẫn trước đó
        }
      })
    }
    
  }

  ngOnInit(): void {
    localStorage.clear(); 
  }

  // ! tồn tại

}
