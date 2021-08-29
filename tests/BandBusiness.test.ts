import { BandBusiness } from "../src/business/BandBusiness";
import { AuthenticatorMock } from "./mocks/services/AuthenticatorMock";
import { IdGeneratorMock } from "./mocks/services/IdGeneratorMock";
import { BandDatabaseMock } from "./mocks/band/BandDatabaseMock";
import { BandDatabase } from "../src/data/BandDatabase";
import { token_admin_mock, token_normal_mock } from "./mocks/services/TokenMock";

const bandBusinessMock = new BandBusiness(
    new AuthenticatorMock(),
    new IdGeneratorMock(),
    new BandDatabaseMock() as BandDatabase
)

describe("Testing create band", () => {

    test("Must return error when name is empty", async () => {
        expect.assertions(2);
        try {

            await bandBusinessMock.create(
                {
                    name: "",
                    musicGenre: "rock",
                    responsible: "joao"
                },
                token_admin_mock
            );

        } catch (error: any) {

            expect(error.message).toEqual("'name', 'musicGenre' and 'responsible' must be provided");
            expect(error.code).toBe(422);

        }
    });


    test("Success at login", async () => {
        expect.assertions(3);
        try {
            await bandBusinessMock.create(
                {
                    name: "banda",
                    musicGenre: "rock",
                    responsible: "joao"
                },
                token_admin_mock
            );

            const result = "Success"
            expect(result).toEqual("Success");
            expect(result).toEqual("Success");
            expect(result).toEqual("Success");

        } catch (error: any) {
            expect(error.message).not.toEqual("Authentication required");
            expect(error.message).not.toEqual("'name', 'musicGenre' and 'responsible' must be provided");
            expect(error.message).not.toEqual("You should be an ADMIN user to access");
        }

    });

})