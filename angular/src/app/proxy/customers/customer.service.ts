import type { CreateUpdateCustomerDto, CustomerDto, CustomerPageDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiName = 'Default';

  create = (input: CreateUpdateCustomerDto) =>
    this.restService.request<any, CustomerDto>({
      method: 'POST',
      url: '/api/app/customer',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/customer/${id}`,
    },
    { apiName: this.apiName });

  get = (id: number) =>
    this.restService.request<any, CustomerDto>({
      method: 'GET',
      url: `/api/app/customer/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: CustomerPageDto) =>
    this.restService.request<any, PagedResultDto<CustomerDto>>({
      method: 'GET',
      url: '/api/app/customer',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: number, input: CreateUpdateCustomerDto) =>
    this.restService.request<any, CustomerDto>({
      method: 'PUT',
      url: `/api/app/customer/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
