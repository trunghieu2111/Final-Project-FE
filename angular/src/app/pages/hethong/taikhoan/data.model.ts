export interface PermissionData {
    id?: number;
    roleName?: string;
    checkPermission?: boolean;
}

export interface AccountRolesData {
    id?: number;
    accountID?: number;
    roleID?: number;
}