import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { User, USER_ROLES } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

const userDatabase = new UserDatabase()
const hashManager = new HashManager()
const authenticator = new Authenticator()

export class UserBusiness {
    static regExValidateEmail: RegExp = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;

    async signup(name: string, email: string, password: string, role?: USER_ROLES) {
        if (!name || !email || !password) {
            throw new CustomError(422, "'name', 'email' and 'password' must be provided")
        }

        if (!UserBusiness.regExValidateEmail.test(email)) {
            throw new CustomError(422, "Insert a valid e-mail, such as: 'xxxx@yyyyy.zzz.www");
        };

        if (password.length < 6) {
            throw new CustomError(422, "'password' must be at least 6 characters long");
        }

        if (!role || role.toLocaleUpperCase() !== USER_ROLES.ADMIN) {
            role = USER_ROLES.NORMAL
        }

        const idGenerator = new IdGenerator()
        const id: string = idGenerator.generate()


        const cypherPassword = await hashManager.hash(password);

        const newUser = new User(id, name, email, cypherPassword, role)


        await userDatabase.create(newUser)


        const token: string = authenticator.generate({ id, role })

        return token
    }

    async login(email: string, password: string) {

        if (!email || !password) {
            throw new CustomError(422, "'email' and 'password' must be provided")
        }

        if (!UserBusiness.regExValidateEmail.test(email)) {
            throw new CustomError(422, "Insert a valid e-mail, such as: 'xxxx@yyyyy.zzz.www");
        };

        const user: User | undefined = await userDatabase.findUserByEmail(email)

        if (!user) {
            throw new CustomError(422, "Invalid credentials")
        }

        const passwordIsCorrect: boolean = await hashManager.compare(password, user.getPassword())

        if (!passwordIsCorrect) {
            throw new CustomError(422, "Invalid credentials")
        }

        const token: string = authenticator.generate({ id: user.getId(), role: user.getRole() })

        return token
    }
}