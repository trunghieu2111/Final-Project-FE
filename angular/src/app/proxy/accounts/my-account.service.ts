import type { AccountDto, AccountPageDto, CreateUpdateAccountDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyAccountService {
  apiName = 'Default';

  create = (input: CreateUpdateAccountDto) =>
    this.restService.request<any, AccountDto>({
      method: 'POST',
      url: '/api/app/my-account',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/my-account/${id}`,
    },
    { apiName: this.apiName });

  get = (id: number) =>
    this.restService.request<any, AccountDto>({
      method: 'GET',
      url: `/api/app/my-account/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: AccountPageDto) =>
    this.restService.request<any, PagedResultDto<AccountDto>>({
      method: 'GET',
      url: '/api/app/my-account',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: number, input: CreateUpdateAccountDto) =>
    this.restService.request<any, AccountDto>({
      method: 'PUT',
      url: `/api/app/my-account/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
