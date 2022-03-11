import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '../permission.service';
import { Location } from '@angular/common';
import { IPermissionRole } from '../data.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceCommon } from 'src/app/share/common.service';

@Component({
  selector: 'app-form-permission',
  templateUrl: './form-permission.component.html',
  styleUrls: ['./form-permission.component.css']
})
export class FormPermissionComponent implements OnInit {

  // @Output() newItemEvent = new EventEmitter();
  // @Output() backEvent = new EventEmitter();

  // @Input() dataPermission:IData={
  //   tenquyen: '', quyenqltaikhoan: false, quyenqlquyen: false, quyenqlchinhanh: false, quyenqlkhachhang: false
  // }
  // backList:boolean = false;
  isShowCreateOrUpdate: boolean = false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');
  flag = true;
  dataPermission: IPermissionRole[] = [];
  dataPermissionRoles: IPermissionRole[] = [];
  dataPermissionUpdate:string[]=[];
  permission = {
    editInforTenant: false,
    lockAccount: false,
    addCustomer: false,
    listCustomer: false,
    editCustomer: false,
    delCustomer: false,
    addInvoice: false,
    listInvoice: false,
    editInvoice: false,
    delInvoice: false,
    addTenant: false,
    listTenant: false,
    editTenant: false,
    delTenant: false,
    addAccount: false,
    listAccount: false,
    editAccount: false,
    delAccount: false,
    addPermission: false,
    listPermission: false,
    editPermission: false,
    delPermission: false
  }

  submitForm: FormGroup;

  constructor(
    private _location: Location,
    public serviceCommon: ServiceCommon,
    private route: ActivatedRoute,
    public permissionService: PermissionService,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      roleName: [null, [Validators.required]],
      editInforTenant: [],
      lockAccount: [],
      addCustomer: [],
      listCustomer: [],
      editCustomer: [],
      delCustomer: [],
      addInvoice: [],
      listInvoice: [],
      editInvoice: [],
      delInvoice: [],
      addTenant: [],
      listTenant: [],
      editTenant: [],
      delTenant: [],
      addAccount: [],
      listAccount: [],
      editAccount: [],
      delAccount: [],
      addPermission: [],
      listPermission: [],
      editPermission: [],
      delPermission: []
    })
  }

  ngOnInit(): void {
    if (String(this.ids) !== '0') {
      this.isShowCreateOrUpdate = true;
      this.loadData(this.ids);
      this.flag = false;
    }
  }

  public loadData(id: any) {
    this.dataPermission = [];
    this.permissionService.getInfoPermissionByID(id).subscribe((data) => {
      this.dataPermission = data.myPermissionRoles;
      for (let i of this.dataPermission) {
        if (i.permissionID.toUpperCase() == "C5385A8F-B8C6-4C02-BF3F-22AF32C8F00A") {
          this.permission.lockAccount = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "C5385A8F-B8C6-4C02-BF3F-22AF32C8F01A") {
          this.permission.editInforTenant = true;
          continue;
        }
        //
        if (i.permissionID.toUpperCase() == "B22B8690-BD30-484C-94B8-7BFC4903900A") {
          this.permission.addCustomer = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "AABE8729-5FD5-4A88-8D29-7DCB2F18E567") {
          this.permission.listCustomer = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "D2EC9A7F-3B38-406D-8C76-9B2FFA661119") {
          this.permission.editCustomer = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "39B2CF71-7879-442D-B027-A202C4126D77") {
          this.permission.delCustomer = true;
          continue;
        }

        if (i.permissionID.toUpperCase() == "32F38657-BDED-4232-91D1-BA558394FF7F") {
          this.permission.addInvoice = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "F06BE707-4D1D-458A-84CE-C0E5B1BB15B8") {
          this.permission.listInvoice = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "5FDA7B60-2569-4188-88BB-E81433F1AAA6") {
          this.permission.editInvoice = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "C5385A8F-B8C6-4C02-BF3F-22AF32C8F04A") {
          this.permission.delInvoice = true;
          continue;
        }

        if (i.permissionID.toUpperCase() == "5FDA7B60-2569-4188-88B3-E81433F1AAA6") {
          this.permission.addTenant = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "5FDA7B60-2569-4188-88B1-E81433F1AAA6") {
          this.permission.listTenant = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "5FDA7B60-2569-4188-88B2-E81433F1AAA6") {
          this.permission.editTenant = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "5FDA7B60-2569-4188-88B4-E81433F1AAA6") {
          this.permission.delTenant = true;
          continue;
        }

        if (i.permissionID.toUpperCase() == "2ABE8729-5FD5-4A88-8D29-7DCB2F18E567") {
          this.permission.addAccount = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "1ABE8729-5FD5-4A88-8D29-7DCB2F18E567") {
          this.permission.listAccount = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "3ABE8729-5FD5-4A88-8D29-7DCB2F18E567") {
          this.permission.editAccount = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "4ABE8729-5FD5-4A88-8D29-7DCB2F18E567") {
          this.permission.delAccount = true;
          continue;
        }

        if (i.permissionID.toUpperCase() == "B22B8690-BD30-484C-94B8-7BFC4903902A") {
          this.permission.addPermission = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "B22B8690-BD30-484C-94B8-7BFC4903901A") {
          this.permission.listPermission = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "B22B8690-BD30-484C-94B8-7BFC4903903A") {
          this.permission.editPermission = true;
          continue;
        }
        if (i.permissionID.toUpperCase() == "B22B8690-BD30-484C-94B8-7BFC4903904A") {
          this.permission.delPermission = true;
          continue;
        }
      }

      this.submitForm.patchValue({
        roleName: data.roleName,
        lockAccount: this.permission.lockAccount,
        editInforTenant: this.permission.editInforTenant,
        //
        addCustomer: this.permission.addCustomer,
        listCustomer: this.permission.listCustomer,
        editCustomer: this.permission.editCustomer,
        delCustomer: this.permission.delCustomer,
        addInvoice: this.permission.addInvoice,
        listInvoice: this.permission.listInvoice,
        editInvoice: this.permission.editInvoice,
        delInvoice: this.permission.delInvoice,
        addTenant: this.permission.addTenant,
        listTenant: this.permission.listTenant,
        editTenant: this.permission.editTenant,
        delTenant: this.permission.delTenant,
        addAccount: this.permission.addAccount,
        listAccount: this.permission.listAccount,
        editAccount: this.permission.editAccount,
        delAccount: this.permission.delAccount,
        addPermission: this.permission.addPermission,
        listPermission: this.permission.listPermission,
        editPermission: this.permission.editPermission,
        delPermission: this.permission.delPermission
      })
    });
  }

  Save() {
    if (this.isShowCreateOrUpdate) { // Update
      for(let i of this.dataPermission){
        this.dataPermissionUpdate.push(i.permissionID.toUpperCase());
      }

      if (this.submitForm.get('addCustomer')?.value == true) {
        if(this.dataPermissionUpdate.includes("B22B8690-BD30-484C-94B8-7BFC4903900A")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "B22B8690-BD30-484C-94B8-7BFC4903900A"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "B22B8690-BD30-484C-94B8-7BFC4903900A"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('editInforTenant')?.value == true) {
        if(this.dataPermissionUpdate.includes("C5385A8F-B8C6-4C02-BF3F-22AF32C8F01A")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "C5385A8F-B8C6-4C02-BF3F-22AF32C8F01A"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "C5385A8F-B8C6-4C02-BF3F-22AF32C8F01A"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('lockAccount')?.value == true) {
        if(this.dataPermissionUpdate.includes("C5385A8F-B8C6-4C02-BF3F-22AF32C8F00A")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "C5385A8F-B8C6-4C02-BF3F-22AF32C8F00A"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "C5385A8F-B8C6-4C02-BF3F-22AF32C8F00A"
          }
          this.dataPermissionRoles.push(para);
        }

      }
      //
      if (this.submitForm.get('listCustomer')?.value == true) {
        if(this.dataPermissionUpdate.includes("AABE8729-5FD5-4A88-8D29-7DCB2F18E567")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "AABE8729-5FD5-4A88-8D29-7DCB2F18E567"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "AABE8729-5FD5-4A88-8D29-7DCB2F18E567"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('editCustomer')?.value == true) {
        if(this.dataPermissionUpdate.includes("D2EC9A7F-3B38-406D-8C76-9B2FFA661119")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "D2EC9A7F-3B38-406D-8C76-9B2FFA661119"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "D2EC9A7F-3B38-406D-8C76-9B2FFA661119"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('delCustomer')?.value == true) {
        if(this.dataPermissionUpdate.includes("39B2CF71-7879-442D-B027-A202C4126D77")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "39B2CF71-7879-442D-B027-A202C4126D77"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "39B2CF71-7879-442D-B027-A202C4126D77"
          }
          this.dataPermissionRoles.push(para);
        }

      }
      //Invoice
      if (this.submitForm.get('addInvoice')?.value == true) {
        if(this.dataPermissionUpdate.includes("32F38657-BDED-4232-91D1-BA558394FF7F")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "32F38657-BDED-4232-91D1-BA558394FF7F"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "32F38657-BDED-4232-91D1-BA558394FF7F"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('listInvoice')?.value == true) {
        if(this.dataPermissionUpdate.includes("F06BE707-4D1D-458A-84CE-C0E5B1BB15B8")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "F06BE707-4D1D-458A-84CE-C0E5B1BB15B8"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "F06BE707-4D1D-458A-84CE-C0E5B1BB15B8"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('editInvoice')?.value == true) {
        if(this.dataPermissionUpdate.includes("5FDA7B60-2569-4188-88BB-E81433F1AAA6")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "5FDA7B60-2569-4188-88BB-E81433F1AAA6"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "5FDA7B60-2569-4188-88BB-E81433F1AAA6"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('delInvoice')?.value == true) {
        if(this.dataPermissionUpdate.includes("C5385A8F-B8C6-4C02-BF3F-22AF32C8F04A")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "C5385A8F-B8C6-4C02-BF3F-22AF32C8F04A"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "C5385A8F-B8C6-4C02-BF3F-22AF32C8F04A"
          }
          this.dataPermissionRoles.push(para);
        }

      }
      //Tenant
      if (this.submitForm.get('addTenant')?.value == true) {
        if(this.dataPermissionUpdate.includes("5FDA7B60-2569-4188-88B3-E81433F1AAA6")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "5FDA7B60-2569-4188-88B3-E81433F1AAA6"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "5FDA7B60-2569-4188-88B3-E81433F1AAA6"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('listTenant')?.value == true) {
        if(this.dataPermissionUpdate.includes("5FDA7B60-2569-4188-88B1-E81433F1AAA6")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "5FDA7B60-2569-4188-88B1-E81433F1AAA6"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "5FDA7B60-2569-4188-88B1-E81433F1AAA6"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('editTenant')?.value == true) {
        if(this.dataPermissionUpdate.includes("5FDA7B60-2569-4188-88B2-E81433F1AAA6")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "5FDA7B60-2569-4188-88B2-E81433F1AAA6"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "5FDA7B60-2569-4188-88B2-E81433F1AAA6"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('delTenant')?.value == true) {
        if(this.dataPermissionUpdate.includes("5FDA7B60-2569-4188-88B4-E81433F1AAA6")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "5FDA7B60-2569-4188-88B4-E81433F1AAA6"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "5FDA7B60-2569-4188-88B4-E81433F1AAA6"
          }
          this.dataPermissionRoles.push(para);
        }

      }
      //Account
      if (this.submitForm.get('addAccount')?.value == true) {
        if(this.dataPermissionUpdate.includes("2ABE8729-5FD5-4A88-8D29-7DCB2F18E567")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "2ABE8729-5FD5-4A88-8D29-7DCB2F18E567"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "2ABE8729-5FD5-4A88-8D29-7DCB2F18E567"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('listAccount')?.value == true) {
        if(this.dataPermissionUpdate.includes("1ABE8729-5FD5-4A88-8D29-7DCB2F18E567")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "1ABE8729-5FD5-4A88-8D29-7DCB2F18E567"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "1ABE8729-5FD5-4A88-8D29-7DCB2F18E567"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('editAccount')?.value == true) {
        if(this.dataPermissionUpdate.includes("3ABE8729-5FD5-4A88-8D29-7DCB2F18E567")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "3ABE8729-5FD5-4A88-8D29-7DCB2F18E567"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "3ABE8729-5FD5-4A88-8D29-7DCB2F18E567"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('delAccount')?.value == true) {
        if(this.dataPermissionUpdate.includes("4ABE8729-5FD5-4A88-8D29-7DCB2F18E567")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "4ABE8729-5FD5-4A88-8D29-7DCB2F18E567"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "4ABE8729-5FD5-4A88-8D29-7DCB2F18E567"
          }
          this.dataPermissionRoles.push(para);
        }

      }
      //Permission
      if (this.submitForm.get('addPermission')?.value == true) {
        if(this.dataPermissionUpdate.includes("B22B8690-BD30-484C-94B8-7BFC4903902A")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "B22B8690-BD30-484C-94B8-7BFC4903902A"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "B22B8690-BD30-484C-94B8-7BFC4903902A"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('listPermission')?.value == true) {
        if(this.dataPermissionUpdate.includes("B22B8690-BD30-484C-94B8-7BFC4903901A")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "B22B8690-BD30-484C-94B8-7BFC4903901A"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "B22B8690-BD30-484C-94B8-7BFC4903901A"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('editPermission')?.value == true) {
        if(this.dataPermissionUpdate.includes("B22B8690-BD30-484C-94B8-7BFC4903903A")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "B22B8690-BD30-484C-94B8-7BFC4903903A"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "B22B8690-BD30-484C-94B8-7BFC4903903A"
          }
          this.dataPermissionRoles.push(para);
        }

      }

      if (this.submitForm.get('delPermission')?.value == true) {
        if(this.dataPermissionUpdate.includes("B22B8690-BD30-484C-94B8-7BFC4903904A")){
          for(let i of this.dataPermission){
            if(i.permissionID.toUpperCase() == "B22B8690-BD30-484C-94B8-7BFC4903904A"){
              const para = {
                id: i.id,
                permissionID: i.permissionID,
                roleID: i.roleID
              }
              this.dataPermissionRoles.push(para);
              break;
            }
          }
          
        }
        else{
          const para = {
            id: 0,
            permissionID: "B22B8690-BD30-484C-94B8-7BFC4903904A"
          }
          this.dataPermissionRoles.push(para);
        }

      }
      //console.log("data:", this.dataPermissionRoles);

      const params = {
        id: this.ids,
        roleName: this.submitForm.get('roleName')?.value,
        myPermissionRoles: this.dataPermissionRoles
      }
      this.permissionService.updatePermission(params).subscribe((data) => {
        this._location.back();
      })
    } else { // CREATE
      this.dataPermission = [];
      if (this.submitForm.get('addCustomer')?.value == true) {
        const permissionRole = {
          permissionID: "B22B8690-BD30-484C-94B8-7BFC4903900A"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('listCustomer')?.value == true) {
        const permissionRole = {
          permissionID: "AABE8729-5FD5-4A88-8D29-7DCB2F18E567"
        }
        this.dataPermission.push(permissionRole);
      }
      //
      if (this.submitForm.get('lockAccount')?.value == true) {
        const permissionRole = {
          permissionID: "C5385A8F-B8C6-4C02-BF3F-22AF32C8F00A"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('editInforTenant')?.value == true) {
        const permissionRole = {
          permissionID: "C5385A8F-B8C6-4C02-BF3F-22AF32C8F01A"
        }
        this.dataPermission.push(permissionRole);
      }
      //
      if (this.submitForm.get('editCustomer')?.value == true) {
        const permissionRole = {
          permissionID: "D2EC9A7F-3B38-406D-8C76-9B2FFA661119"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('delCustomer')?.value == true) {
        const permissionRole = {
          permissionID: "39B2CF71-7879-442D-B027-A202C4126D77"
        }
        this.dataPermission.push(permissionRole);
      }

      if (this.submitForm.get('addInvoice')?.value == true) {
        const permissionRole = {
          permissionID: "32F38657-BDED-4232-91D1-BA558394FF7F"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('listInvoice')?.value == true) {
        const permissionRole = {
          permissionID: "F06BE707-4D1D-458A-84CE-C0E5B1BB15B8"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('editInvoice')?.value == true) {
        const permissionRole = {
          permissionID: "5FDA7B60-2569-4188-88BB-E81433F1AAA6"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('delInvoice')?.value == true) {
        const permissionRole = {
          permissionID: "C5385A8F-B8C6-4C02-BF3F-22AF32C8F04A"
        }
        this.dataPermission.push(permissionRole);
      }

      if (this.submitForm.get('addTenant')?.value == true) {
        const permissionRole = {
          permissionID: "5FDA7B60-2569-4188-88B3-E81433F1AAA6"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('listTenant')?.value == true) {
        const permissionRole = {
          permissionID: "5FDA7B60-2569-4188-88B1-E81433F1AAA6"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('editTenant')?.value == true) {
        const permissionRole = {
          permissionID: "5FDA7B60-2569-4188-88B2-E81433F1AAA6"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('delTenant')?.value == true) {
        const permissionRole = {
          permissionID: "5FDA7B60-2569-4188-88B4-E81433F1AAA6"
        }
        this.dataPermission.push(permissionRole);
      }

      if (this.submitForm.get('addAccount')?.value == true) {
        const permissionRole = {
          permissionID: "2ABE8729-5FD5-4A88-8D29-7DCB2F18E567"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('listAccount')?.value == true) {
        const permissionRole = {
          permissionID: "1ABE8729-5FD5-4A88-8D29-7DCB2F18E567"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('editAccount')?.value == true) {
        const permissionRole = {
          permissionID: "3ABE8729-5FD5-4A88-8D29-7DCB2F18E567"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('delAccount')?.value == true) {
        const permissionRole = {
          permissionID: "4ABE8729-5FD5-4A88-8D29-7DCB2F18E567"
        }
        this.dataPermission.push(permissionRole);
      }

      if (this.submitForm.get('addPermission')?.value == true) {
        const permissionRole = {
          permissionID: "B22B8690-BD30-484C-94B8-7BFC4903902A"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('listPermission')?.value == true) {
        const permissionRole = {
          permissionID: "B22B8690-BD30-484C-94B8-7BFC4903901A"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('editPermission')?.value == true) {
        const permissionRole = {
          permissionID: "B22B8690-BD30-484C-94B8-7BFC4903903A"
        }
        this.dataPermission.push(permissionRole);
      }
      if (this.submitForm.get('delPermission')?.value == true) {
        const permissionRole = {
          permissionID: "B22B8690-BD30-484C-94B8-7BFC4903904A"
        }
        this.dataPermission.push(permissionRole);
      }

      // console.log("test:", this.dataPermission);
      const params = {
        roleName: this.submitForm.get('roleName')?.value,
        tenantId: this.serviceCommon.tokenTenant.id,
        myPermissionRoles: this.dataPermission
      }
      this.permissionService.createPermission(params).subscribe((data) => {
        this._location.back();
      })
    }
  }

  back() {
    this._location.back();
  }
}
