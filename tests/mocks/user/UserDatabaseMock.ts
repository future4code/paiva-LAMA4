import { User } from "../../../src/model/User";
import { userMockAdmin, userMockNormal } from "./UserMock";

export class UserDatabaseMock {
   public async create(newUser: User): Promise<void> {

   }

   public async findUserByEmail(email: string): Promise<User | undefined> {

      switch (email) {
         case "astrodev@gmail.com":
            return userMockAdmin
         case "bananinha@gmail.com":
            return userMockNormal
         default:
            return undefined
      }
   }

}