import { UserRepository } from "../data/UserRepository";
import { CustomError } from "../error/CustomError";
import { LoginInputDTO, User, UserInputDTO, USER_ROLES } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

const hashManager = new HashManager()
const authenticator = new Authenticator()

export class UserBusiness {
    static regExValidateEmail: RegExp = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
    constructor(
        private userDatabase: UserRepository
    ) { }

    async signup(input: UserInputDTO) {
        const { name, email, password, role } = input
        let userRole: USER_ROLES = USER_ROLES.ADMIN;

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
            userRole = USER_ROLES.NORMAL
        }

        const idGenerator = new IdGenerator()
        const id: string = idGenerator.generate()


        const cypherPassword = await hashManager.hash(password);

        const newUser = new User(id, name, email, cypherPassword, userRole)


        await this.userDatabase.create(newUser)


        const token: string = authenticator.generate({ id, role: userRole })

        return token
    }

    async login(input: LoginInputDTO) {
        const { email, password } = input

        if (!email || !password) {
            throw new CustomError(422, "'email' and 'password' must be provided")
        }

        if (!UserBusiness.regExValidateEmail.test(email)) {
            throw new CustomError(422, "Insert a valid e-mail, such as: 'xxxx@yyyyy.zzz.www");
        };

        const user: User | undefined = await this.userDatabase.findUserByEmail(email)

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