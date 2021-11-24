export enum ApplicationPermission {
    A_CRUD_SUPER = "A_CRUD_SUPER",
    ADD_PLACE = "ADD_PLACE",
    GET_FAVOURITE = "GET_FAVOURITE",
    AUTH_USER = "AUTH_USER",
    DELETE_PLACE = "DELETE_PLACE",
    EDIT_PLACE = "EDIT_PLACE"
}

export class BasicRole {
    static getClientRoleId(): number{
        return 102;
    }
}

export class PermissionRules {
 static rules = [
    {
      permission: ApplicationPermission.A_CRUD_SUPER,
      relatedPermissions: [
        ApplicationPermission.GET_FAVOURITE]
    }]

    static getRelatedPermission(permission: string) {

        const rule = PermissionRules.rules.find(r => r.permission === permission);
        return rule !=null ? rule.relatedPermissions : [];
    }
}