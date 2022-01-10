import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdatePermissionDto {
  id?: string;
  name: string;
  userPermission: boolean;
  branchPermission: boolean;
  customerPermission: boolean;
  perPermission: boolean;
  invoicePermision: boolean;
}

export interface PermissionDto extends AuditedEntityDto<string> {
  name?: string;
  userPermission: boolean;
  branchPermission: boolean;
  customerPermission: boolean;
  perPermission: boolean;
  invoicePermision: boolean;
}

export interface PermissionPageDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}
