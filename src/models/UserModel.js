export class UserModel {
  constructor({ name = "", lastLogin = "" }) {
    this.name = name;
    this.lastLogin = lastLogin;
  }
}
