import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../Account.service';
import { Location } from '@angular/common'
import { PermissionService } from '../../quyen/permission.service';
import { AccountRolesData, PermissionData } from '../data.model';
import { ServiceCommon } from 'src/app/share/common.service';


@Component({
  selector: 'app-form-acc',
  templateUrl: './form-acc.component.html',
  styleUrls: ['./form-acc.component.css']
})
export class FormAccComponent implements OnInit {
  isShowCreateOrUpdate: boolean = false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');
  data: PermissionData[] = [];
  accountRoles: AccountRolesData[] = [];
  accountRolesGetId: AccountRolesData[] = [];
  idAccountRole: number[] = [];
  flagEditPass = '';

  submitForm: FormGroup;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    public accountService: AccountService,
    public permissionService: PermissionService,
    public serviceCommon: ServiceCommon,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.minLength(10)]],
      acc: [null, [Validators.required]],
      pass: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.flagEditPass = localStorage.getItem('checkEditAccount');
    if (localStorage.getItem('checkEditAccount') == "1") {
      this.submitForm.get('acc')?.disable();
    }

    this.permissionService.getListPermission().subscribe((data) => {
      this.data = data.items;
      //console.log(this.data);
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].checkPermission = false;
      }
      //lấy data tránh bị chạy bất đồng bộ thì sẽ không có dữ liệu để xử lý.
      if (String(this.ids) !== '0') {
        this.isShowCreateOrUpdate = true;
        this.loadData(this.ids);
        //this.flag = false; để làm cờ ẩn hiện input khi sửa. Không làm theo cách lưu vào local biến.
      }
    })

  }

  public checkPermission() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.idAccountRole.includes(this.data[i].id)) {
        this.data[i].checkPermission = true;
      }
    }
  }
  public loadData(id: any) {
    this.accountService.getInfoAccountByID(id).subscribe((data) => {
      this.accountRolesGetId = data.accountRoles;
      for (let i of this.accountRolesGetId) {
        this.idAccountRole.push(i.roleID);
      }

      this.checkPermission();

      this.submitForm.patchValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
        acc: data.acc,
        pass: data.pass,
      })
    });
  }

  Onchange() {
    this.accountRoles = [];
    for (let i of this.data) {
      if (i.checkPermission == true) {
        const params = {
          roleID: i.id
        }
        this.accountRoles.push(params);
      }
    }
    // console.log("data:", this.data);
    // console.log("acc:", this.accountRoles);
  }

  onSubmit() {
    const valid = this.submitForm.valid;
    if (valid) {
      localStorage.removeItem('checkEditAccount');
      if (this.isShowCreateOrUpdate) { // Update
        //thêm mới id = 0
        for (let i = 0; i < this.accountRoles.length; i++) {
          if (this.idAccountRole.includes(this.accountRoles[i].roleID) == false) {
            this.accountRoles[i].id = 0;
          }
          //Có quyền giống so với lúc chưa sửa
          else {
            for (let j = 0; j < this.accountRolesGetId.length; j++) {
              if (this.accountRolesGetId[j].roleID == this.accountRoles[i].roleID) {
                this.accountRoles[i].id = this.accountRolesGetId[j].id;
                break;
              }
            }
          }
        }

        const params = {
          id: this.ids,
          name: this.submitForm.get('name')?.value,
          email: this.submitForm.get('email')?.value,
          phone: "0" + this.submitForm.get('phone')?.value,
          acc: this.submitForm.get('acc')?.value,
          pass: this.submitForm.get('pass')?.value,
          tenantId: this.serviceCommon.tokenTenant.id,

          accountRoles: this.accountRoles
        }
        //console.log("dataUpdate:", params);
        this.accountService.updateAccount(params).subscribe((data) => {
          this._location.back();
        })
      } else { // CREATE
        const params = {
          name: this.submitForm.get('name')?.value,
          email: this.submitForm.get('email')?.value,
          phone: "0" + this.submitForm.get('phone')?.value,
          acc: this.submitForm.get('acc')?.value,
          pass: this.submitForm.get('pass')?.value,
          tenantId: this.serviceCommon.tokenTenant.id,

          accountRoles: this.accountRoles
        }
        //console.log("data:", params);
        this.accountService.createAccount(params).subscribe((data) => {
          this._location.back();
        })

      }

    } else {
      for (const i in this.submitForm.controls) {
        if (this.submitForm.controls.hasOwnProperty(i)) {
          this.submitForm.controls[i].markAsDirty();
          this.submitForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }

  back() {
    localStorage.removeItem('checkEditAccount');
    this._location.back();
  }
}
