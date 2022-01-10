import type { BranchDto, BranchPageDto, CreateUpdateBranchDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  apiName = 'Default';

  create = (input: CreateUpdateBranchDto) =>
    this.restService.request<any, BranchDto>({
      method: 'POST',
      url: '/api/app/branch',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/branch/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, BranchDto>({
      method: 'GET',
      url: `/api/app/branch/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: BranchPageDto) =>
    this.restService.request<any, PagedResultDto<BranchDto>>({
      method: 'GET',
      url: '/api/app/branch',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateBranchDto) =>
    this.restService.request<any, BranchDto>({
      method: 'PUT',
      url: `/api/app/branch/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
