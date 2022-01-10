import type { CreateUpdatePermissionDto, PermissionDto, PermissionPageDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  apiName = 'Default';

  create = (input: CreateUpdatePermissionDto) =>
    this.restService.request<any, PermissionDto>({
      method: 'POST',
      url: '/api/app/permission',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/permission/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, PermissionDto>({
      method: 'GET',
      url: `/api/app/permission/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PermissionPageDto) =>
    this.restService.request<any, PermissionDto[]>({
      method: 'GET',
      url: '/api/app/permission',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdatePermissionDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/permission/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
