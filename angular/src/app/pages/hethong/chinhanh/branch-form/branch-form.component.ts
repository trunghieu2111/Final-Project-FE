import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from '../branch.service';
import { Location } from '@angular/common';
import { ServiceCommon } from 'src/app/share/common.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.css']
})
export class BranchFormComponent implements OnInit {
  // @Output() newItemEvent = new EventEmitter();
  // @Input() item: IData = { MST: '', tenmien: '', tenchinhanh: '', diachi: '', trangthai: 'false' };
  // @Output() backEvent = new EventEmitter();

  // backList:boolean = false;
  isShowCreateOrUpdate: boolean = false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');

  flag = true;

  submitForm: FormGroup;

  constructor(
    private modal: NzModalService,
    private _location: Location,
    private route: ActivatedRoute,
    public branchService: BranchService,
    public serviceCommon: ServiceCommon,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      MST: [null, [Validators.required]],
      tenmien: [null, Validators.required],
      tenchinhanh: [null, [Validators.required]],
      diachi: [null, Validators.required],
      acc: [null, [Validators.required, Validators.minLength(6)]],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required, Validators.minLength(6)]],
      confirmpass: [null, [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
    //console.log(ids);
    //this.isShowCreateOrUpdate = false;
    if (String(this.ids) !== '0') {
      this.isShowCreateOrUpdate = true;
      this.loadData(this.ids);
      this.flag = false;
    }
  }

  public loadData(id: any) {
    this.branchService.getInfoBranchByID(id).subscribe((data) => {
      // for (const controlName in this.SVForm.controls) {
      //   if (controlName) {
      //     this.SVForm.controls[controlName].setValue(data[controlName]);
      //   }
      // }

      this.submitForm.patchValue({
        tenmien: data.url,
        MST: data.mst,
        tenchinhanh: data.nameBranch,
        diachi: data.address,
        //tránh lỗi validate khi sửa
        acc: "abc123",
        name: "abc123",
        email: "abc@gmail.com",
        pass: "abc123",
        confirmpass: "abc123",
      })
      //console.log("data", data);
    });
  }

  // handleOk(): void {
  //   this.errorConfirmPass = false;
  // }

  // handleCancel(): void {
  //   this.errorConfirmPass = false;
  // }

  onSubmit() {
    const valid = this.submitForm.valid;
    if (valid) {
      if (this.isShowCreateOrUpdate) { // Update
        const params = {
          id: this.ids,
          mst: this.submitForm.get('MST')?.value,
          url: this.submitForm.get('tenmien')?.value,
          nameBranch: this.submitForm.get('tenchinhanh')?.value,
          address: this.submitForm.get('diachi')?.value
        }
        this.branchService.updateBranch(params).subscribe((data) => {
          this._location.back();
        })
      } else { // CREATE
        if (this.submitForm.get('pass')?.value !== this.submitForm.get('confirmpass')?.value) {
          
            this.modal.error({
              nzTitle: 'Lỗi',
              nzContent: 'Mật khẩu không khớp. Vui lòng nhập lại!'
            });
          
        }
        else {
          const accountBranch = {
            name: this.submitForm.get('name')?.value,
            email: this.submitForm.get('email')?.value,
            acc: this.submitForm.get('acc')?.value,
            pass: this.submitForm.get('pass')?.value,
          }
          const params = {
            mst: this.submitForm.get('MST')?.value,
            url: this.submitForm.get('tenmien')?.value,
            nameBranch: this.submitForm.get('tenchinhanh')?.value,
            address: this.submitForm.get('diachi')?.value,
            parentId: this.serviceCommon.tokenTenant.id,

            accountBranch: accountBranch
          }
          //console.log("data:", params);
          this.branchService.createBranch(params).subscribe((data) => {
            this._location.back();
          })
        }
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
    this._location.back();
  }
}
