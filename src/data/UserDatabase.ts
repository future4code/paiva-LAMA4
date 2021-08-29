import { CustomError } from "../error/CustomError";
import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "Lama_Users"

    async create(newUser: User): Promise<void> {
        try {
            await BaseDatabase.connection(UserDatabase.TABLE_NAME)
                .insert({
                    id: newUser.getId(),
                    name: newUser.getName(),
                    email: newUser.getEmail(),
                    password: newUser.getPassword(),
                    role: newUser.getRole()
                })
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }

    }

    public async findUserByEmail(email: string): Promise<User | undefined> {

        const user = await BaseDatabase.connection(UserDatabase.TABLE_NAME)
            .select('*')
            .where({ email: email })
        return user[0] && User.toUserModel(user[0]);
    }
}
