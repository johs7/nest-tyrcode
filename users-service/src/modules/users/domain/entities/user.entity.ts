import { Role} from "../enum/role.enum";

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public password: string,
    public role: Role = Role.USER,
    public readonly createdAt: Date,
  ) {}
}
