import { UserDatabase } from "../data/UserDatabase";
import { User, USER_ROLES } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";


export class UserBusiness {
    static regExValidateEmail: RegExp = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;

    async signup(name: string, email: string, password: string, role?: USER_ROLES) {
        if (!name || !email || !password) {
            throw new Error("'name', 'email' and 'password' must be provided")
        }

        if (!UserBusiness.regExValidateEmail.test(email)) {
            throw new Error("Insert a valid e-mail, such as: 'xxxx@yyyyy.zzz.www");
        };

        if (password.length < 6) {
            throw new Error("'password' must be at least 6 characters long");
        }

        if (!role || role.toLocaleUpperCase() !== USER_ROLES.ADMIN) {
            role = USER_ROLES.NORMAL
        }

        const idGenerator = new IdGenerator()
        const id: string = idGenerator.generate()

        const hashManager = new HashManager()
        const cypherPassword = await hashManager.hash(password);

        const newUser = new User(id, name, email, cypherPassword, role)

        const userDatabase = new UserDatabase()
        await userDatabase.create(newUser)

        const authenticator = new Authenticator()
        const token: string = authenticator.generate({ id, role })

        return token
    }
}