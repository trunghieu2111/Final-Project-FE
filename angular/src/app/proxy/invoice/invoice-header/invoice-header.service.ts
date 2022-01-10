import type { InvoiceHeaderDto, InvoiceHeaderPageDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvoiceHeaderService {
  apiName = 'Default';

  create = (input: InvoiceHeaderDto) =>
    this.restService.request<any, InvoiceHeaderDto>({
      method: 'POST',
      url: '/api/app/invoice-header',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, InvoiceHeaderDto>({
      method: 'DELETE',
      url: `/api/app/invoice-header/${id}`,
    },
    { apiName: this.apiName });

  get = (id: number) =>
    this.restService.request<any, InvoiceHeaderDto>({
      method: 'GET',
      url: `/api/app/invoice-header/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: InvoiceHeaderPageDto) =>
    this.restService.request<any, PagedResultDto<InvoiceHeaderDto>>({
      method: 'GET',
      url: '/api/app/invoice-header',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: number, input: InvoiceHeaderDto) =>
    this.restService.request<any, InvoiceHeaderDto>({
      method: 'PUT',
      url: `/api/app/invoice-header/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
