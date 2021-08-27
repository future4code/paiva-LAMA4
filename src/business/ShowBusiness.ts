import { ShowDatabase } from "../data/ShowDatabase";
import { Show, SHOW_DAYS } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const authenticator = new Authenticator()
const showDatabase = new ShowDatabase()

export class ShowBusiness {
    private static validHours: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

    async create(weekDay: SHOW_DAYS, startTime: number, endTime: number, bandId: string, token?: string) {
        if (!token) {
            throw new Error("Authentication required")
        }

        const tokenData = authenticator.getTokenData(token)

        if (tokenData.role !== "ADMIN") {
            throw new Error("You should be an ADMIN user to access")
        }

        if (!weekDay || !startTime || !endTime || !bandId) {
            throw new Error("'weekDay', 'startTime', 'endTime' and 'bandId' must be provided")
        }

        if (weekDay.toLocaleUpperCase() !== SHOW_DAYS.FRIDAY && weekDay.toLocaleUpperCase() !== SHOW_DAYS.SATURDAY && weekDay.toLocaleUpperCase() !== SHOW_DAYS.SUNDAY) {
            throw new Error("weekDay should be FRIDAY, SATURDAY or SUNDAY")
        }

        const checkStartTime = ShowBusiness.validHours.findIndex((hour) => hour === startTime)
        const checkEndTime = ShowBusiness.validHours.findIndex((hour) => hour === endTime)

        if (checkEndTime === -1 || checkStartTime === -1) {
            throw new Error("'startTime' and 'endTime' should be an integer between 8 and 23")
        }

        if (endTime < startTime) {
            throw new Error("'startTime' should be earlier than 'endTime'")
        }

        const shows = await showDatabase.findByDay(weekDay)


        for (let show of shows) {
            if (startTime >= show.getStartTime() && startTime < show.getEndTime() || endTime > show.getStartTime() && endTime <= show.getEndTime()) {
                throw new Error("'startTime' and/or 'endTime' already taken")
            }
        }



        const idGenerator = new IdGenerator()
        const id: string = idGenerator.generate()


        const newShow = new Show(id, weekDay, startTime, endTime, bandId)


        await showDatabase.create(newShow)

    }

    async findByDay(weekDay: SHOW_DAYS, token?: string) {
        if (!token) {
            throw new Error("Authentication required")
        }

        authenticator.getTokenData(token)

        if (weekDay.toLocaleUpperCase() !== SHOW_DAYS.FRIDAY && weekDay.toLocaleUpperCase() !== SHOW_DAYS.SATURDAY && weekDay.toLocaleUpperCase() !== SHOW_DAYS.SUNDAY) {
            throw new Error("weekDay should be FRIDAY, SATURDAY or SUNDAY")
        }

        const shows = await showDatabase.findByDayOrdered(weekDay)

        return shows

    }
}