import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLogin } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  NotifiLogin = '';
  NotifiTenant = '';
  Username = '';
  Password = '';
  Tenant = '';
  TenantId : any;
  data:any;
  dataUser:any;

  constructor(
    private router: Router,
    private loginService: ServiceLogin
  ) { }

  submitTenant(){
    //console.log(this.NotifiTenant);
    if(this.Tenant == ''){
      this.NotifiTenant = "Chưa chọn chi nhánh!";
    }
    else{
      this.loginService.loginTenantInvoice(this.Tenant).subscribe((data) => {
        //console.log(data);
        if(data.mst == 0){
          this.NotifiTenant = "Chi nhánh không hợp lệ!";
        }
        else{
          this.NotifiTenant = "Thành công!";
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
    this.loginService.loginAccountInvoice(params).subscribe((data) => {
      //console.log("data:", data);
      if(data.id == 0){
        this.NotifiLogin = "Vui lòng nhập đầy đủ các thông tin! Sai tài khoản hoặc mật khẩu!";
      }
      else{
        //console.log("data:", this.data);
        localStorage.setItem('Token', JSON.stringify(this.data));
        localStorage.setItem('TokenUser', JSON.stringify(data));
        this.router.navigate(['/hethong'], { replaceUrl: true });
        // replaceUrl: true xóa lịch sử đường dẫn trước đó
      }
      // if(data.status == "success"){
      //   //lần đầu vào thì nó chưa có local nên phải gán.
      //   this.loginService.flagPermission = data.user.role;
      //   localStorage.setItem('flagPermission', data.user.role);

      //   if(data.user.role == "student"){
      //     this.loginService.flagSinhvienId = data.user.id_student;
      //     localStorage.setItem('flagSinhvienId', data.user.id_student);
      //   }
      //   //console.log("role:", data.user.role);
      //   this.router.navigate(['/dashboard'], { replaceUrl: true });
      // }
      // else{
      //   this.Notifi = "Sai tài khoản hoặc mật khẩu!";
      // }
    })
  }

  ngOnInit(): void {
    localStorage.clear(); 
  }

  // ! tồn tại

}
