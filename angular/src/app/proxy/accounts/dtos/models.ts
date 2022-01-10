import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface AccountDto extends AuditedEntityDto<number> {
  name?: string;
  email?: string;
  phone?: string;
  acc?: string;
  pass?: string;
  permissionId?: string;
}

export interface AccountPageDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface CreateUpdateAccountDto {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  acc?: string;
  pass?: string;
  permissionId?: string;
}
