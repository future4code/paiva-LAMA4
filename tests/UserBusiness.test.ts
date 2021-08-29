import { UserBusiness } from "../src/business/UserBusiness";
import { UserDatabase } from "../src/data/UserDatabase";
import { AuthenticatorMock } from "./mocks/services/AuthenticatorMock";
import { IdGeneratorMock } from "./mocks/services/IdGeneratorMock";
import { UserDatabaseMock } from "./mocks/user/UserDatabaseMock";
import { HashGeneratorMock } from "./mocks/services/HashGeneratorMock";

const userBusinessMock = new UserBusiness(

    new HashGeneratorMock(),
    new AuthenticatorMock(),
    new IdGeneratorMock(),
    new UserDatabaseMock() as UserDatabase
)

describe("Testing signup", () => {

    test("Must return error when name is empty", async () => {
        expect.assertions(2);
        try {

            await userBusinessMock.signup(
                {
                    name: "",
                    email: "joao@email.com",
                    password: "blius123",
                    role: "normal"
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("'name', 'email' and 'password' must be provided");
            expect(error.code).toBe(422);

        }
    });

    test("Must return error when email is empty", async () => {
        expect.assertions(2);
        try {

            await userBusinessMock.signup(
                {
                    name: "João",
                    email: "",
                    password: "blius123",
                    role: "normal"
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("'name', 'email' and 'password' must be provided");
            expect(error.code).toBe(422);

        }
    });

    test("Must return error when password is empty", async () => {
        expect.assertions(2);
        try {

            await userBusinessMock.signup(
                {
                    name: "João",
                    email: "joao@email.com",
                    password: "",
                    role: "normal"
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("'name', 'email' and 'password' must be provided");
            expect(error.code).toBe(422);

        }
    });

    test("Must return error when email is invalid", async () => {
        expect.assertions(2);
        try {

            await userBusinessMock.signup(
                {
                    name: "João",
                    email: "joaoemail",
                    password: "blius123",
                    role: "normal"
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("Insert a valid e-mail, such as: 'xxxx@yyyyy.zzz.www");
            expect(error.code).toBe(422);

        }
    });

    test("Must return error when password is invalid", async () => {
        expect.assertions(2);
        try {

            await userBusinessMock.signup(
                {
                    name: "João",
                    email: "joao@email.com",
                    password: "blius",
                    role: "normal"
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("'password' must be at least 6 characters long");
            expect(error.code).toBe(422);

        }
    });

    test("Success at signup", async () => {
        expect.assertions(1);

        const token = await userBusinessMock.signup(
            {
                name: "João",
                email: "joao@email.com",
                password: "blius123",
                role: "normal"
            }
        );

        expect(token).toEqual("token_mock");


    });

})

describe("Testing login", () => {

    test("Must return error when email is empty", async () => {
        expect.assertions(2);
        try {

            await userBusinessMock.login(
                {
                    email: "",
                    password: "astrodev123"
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("'email' and 'password' must be provided");
            expect(error.code).toBe(422);

        }
    });

    test("Must return error when password is empty", async () => {
        expect.assertions(2);
        try {

            await userBusinessMock.login(
                {
                    email: "astrodev@gmail.com",
                    password: "",
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("'email' and 'password' must be provided");
            expect(error.code).toBe(422);

        }
    });

    test("Must return error when email is invalid", async () => {
        expect.assertions(2);
        try {

            await userBusinessMock.login(
                {
                    email: "astrodevgmail",
                    password: "astrodev123",
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("Insert a valid e-mail, such as: 'xxxx@yyyyy.zzz.www");
            expect(error.code).toBe(422);

        }
    });

    test("Must return error when user is invalid", async () => {
        expect.assertions(2);
        try {

            await userBusinessMock.login(
                {
                    email: "joao@email.com",
                    password: "astrodev123",
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("Invalid credentials");
            expect(error.code).toBe(422);

        }
    });

    test("Must return error when password is invalid", async () => {
        expect.assertions(2);
        try {

            await userBusinessMock.login(
                {
                    email: "astrodev@gmail.com",
                    password: "astrodev",
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("Invalid credentials");
            expect(error.code).toBe(422);

        }
    });

    test("Success at login", async () => {
        expect.assertions(1);

        const token = await userBusinessMock.login(
            {
                email: "astrodev@gmail.com",
                password: "astrodev123",
            }
        );

        expect(token).toEqual("token_mock");


    });

})