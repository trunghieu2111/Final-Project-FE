import { Component, OnInit } from '@angular/core';
import { BranchService } from '../branch.service';
import { Router } from '@angular/router';
import { ServiceCommon } from 'src/app/share/common.service';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.css']
})
export class ListBranchComponent implements OnInit {
  data: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  total:number = 0;
  tenantId:any;

  // pageIndexChange:number = 1;
    
  constructor(public branchService: BranchService,
    public serviceCommon: ServiceCommon,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.tenantId = this.serviceCommon.tokenTenant.id;
    this.loadData();
  }
  public loadData(){
    //console.log("test:", this.tenantId);
    this.branchService.getListBranch(this.tenantId).subscribe((data) => {
      this.data = data.items;
      //this.data = data;
      this.total = this.data.length;
    })
  }

  addBranch(){
    this.router.navigate(['hethong/chinhanh/branch-form', 0]);
  }

  removeBranch(index:any){
    this.branchService.deleteBranch(index).subscribe((data) => {
      this.loadData();
    });
  }

  editBranch(index:any){
    this.router.navigate(['hethong/chinhanh/branch-form', index]);
  }
  
  onKey(keyword:any){
    this.branchService.getListBranch(this.tenantId,keyword.target.value).subscribe((data) =>{
      this.data = data.items;
      this.total = this.data.length;
    })
  }
}
