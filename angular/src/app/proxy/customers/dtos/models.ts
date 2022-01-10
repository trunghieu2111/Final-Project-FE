import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateCustomerDto {
  id: number;
  customerId?: string;
  taxCode?: string;
  address?: string;
  name?: string;
  city?: string;
  district?: string;
  daidienphapnhan?: string;
  stk?: string;
  tenNH?: string;
  sdt?: string;
  fax?: string;
  email?: string;
}

export interface CustomerDto extends AuditedEntityDto<number> {
  customerId?: string;
  taxCode?: string;
  address?: string;
  name?: string;
  city?: string;
  district?: string;
  daidienphapnhan?: string;
  stk?: string;
  tenNH?: string;
  sdt?: string;
  fax?: string;
  email?: string;
}

export interface CustomerPageDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}
