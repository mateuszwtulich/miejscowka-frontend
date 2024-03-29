import { AccountEto } from './AccountEto';
import { RoleEto } from './RoleEto';

export class UserEto {
    id!: number;
    name!: string;
    surname!: string;
    accountEto!: AccountEto;
    roleEto!: RoleEto;
}