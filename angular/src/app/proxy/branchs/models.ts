import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface BranchDto extends AuditedEntityDto<string> {
  mst?: string;
  url?: string;
  nameBranch?: string;
  address?: string;
  status?: string;
}

export interface BranchPageDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface CreateUpdateBranchDto {
  id?: string;
  mst: string;
  url: string;
  nameBranch: string;
  address: string;
  status: string;
}
