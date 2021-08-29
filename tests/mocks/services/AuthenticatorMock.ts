import { USER_ROLES } from "../../../src/model/User";

export class AuthenticatorMock {
  public generate(input: AuthenticationData): string {
    return "token_mock"
  };

  public getTokenData(token: string): AuthenticationData {
    switch (token) {
      case "token_admin":
        return {
          id: "id_mock",
          role: USER_ROLES.ADMIN
        }
      default:
        return {
          id: "id_mock",
          role: USER_ROLES.NORMAL
        }
    }
  }
}

export interface AuthenticationData {
  id: string;
  role: USER_ROLES;
}