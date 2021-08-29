import { ShowBusiness } from "../src/business/ShowBusiness";
import { AuthenticatorMock } from "./mocks/services/AuthenticatorMock";
import { IdGeneratorMock } from "./mocks/services/IdGeneratorMock";
import { ShowDatabaseMock } from "./mocks/show/ShowDatabaseMock";
import { ShowDatabase } from "../src/data/ShowDatabase";
import { token_admin_mock, token_normal_mock } from "./mocks/services/TokenMock";

const showBusinessMock = new ShowBusiness(
    new AuthenticatorMock(),
    new IdGeneratorMock(),
    new ShowDatabaseMock() as ShowDatabase
)

describe("Testing create show", () => {

    test("Must return error when weekDay is empty", async () => {
        expect.assertions(2);
        try {

            await showBusinessMock.create(
                {
                    weekDay: "",
                    startTime: 8,
                    endTime: 12,
                    bandId: "band_id_mock"
                },
                token_admin_mock
            );

        } catch (error: any) {

            expect(error.message).toEqual("'weekDay', 'startTime', 'endTime' and 'bandId' must be provided");
            expect(error.code).toBe(422);

        }
    });

    test("Must return error if hour at day already taken", async () => {
        expect.assertions(2);
        try {

            await showBusinessMock.create(
                {
                    weekDay: "friday",
                    startTime: 8,
                    endTime: 12,
                    bandId: "band_id_mock"
                },
                token_admin_mock
            );

        } catch (error: any) {

            expect(error.message).toEqual("'startTime' and/or 'endTime' already taken");
            expect(error.code).toBe(409);

        }
    });

})