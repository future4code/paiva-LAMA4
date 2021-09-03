import { User } from "../model/User";

export interface UserRepository {
    create(newUser: User): Promise<void>,
    findUserByEmail(email: string): Promise<User | undefined>
}