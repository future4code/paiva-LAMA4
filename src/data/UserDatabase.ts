import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "Lama_Users"

    async create(newUser: User) {
        await BaseDatabase.connection(UserDatabase.TABLE_NAME)
            .insert({
                id: newUser.getId(),
                name: newUser.getName(),
                email: newUser.getEmail(),
                password: newUser.getPassword(),
                role: newUser.getRole()
            })
    }

    public async findUserByEmail(email: string): Promise<User> {

        const user = await BaseDatabase.connection(UserDatabase.TABLE_NAME)
            .select('*')
            .where({ email: email })
        return user[0] && User.toUserModel(user[0]);
    }
}