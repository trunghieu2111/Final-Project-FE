import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  // },
  // {
  //   path: 'account',
  //   loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  // },
  // {
  //   path: 'identity',
  //   loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  // },
  // {
  //   path: 'tenant-management',
  //   loadChildren: () =>
  //     import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  // },
  // {
  //   path: 'setting-management',
  //   loadChildren: () =>
  //     import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  // },
  
  { path: '', pathMatch: 'full', redirectTo: 'hethong' },
  {path: '', component: LayoutComponent, 
    children: [
    { path: 'hethong', loadChildren: () => import('./pages/hethong/hethong.module').then(m => m.HethongModule) },
    { path: 'danhmuc', loadChildren: () => import('./pages/danhmuc/danhmuc.module').then(m => m.DanhmucModule) },
    { path: 'invoice', loadChildren: () => import('./pages/invoice01/invoice01.module').then(m => m.Invoice01Module) },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
