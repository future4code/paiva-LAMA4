import { Show, SimplifiedShow } from "../../../src/model/Show";
import { showMockFriday, showMockSaturday, showMockSunday, simplifiedShowMock } from "./ShowMock";

export class ShowDatabaseMock {
    public async create(newShow: Show): Promise<void> {

    }

    public async findByDay(weekDay: string): Promise<Show[] | undefined> {

        switch (weekDay) {
            case "friday":
                return [showMockFriday]
            case "saturday":
                return [showMockSaturday]
            case "sunday":
                return [showMockSunday]
            default:
                return undefined
        }
    }

    public async findByDayOrdered(weekDay: string): Promise<SimplifiedShow[] | undefined> {
        switch (weekDay) {
            case "friday":
                return [simplifiedShowMock]
            case "saturday":
                return [simplifiedShowMock]
            case "sunday":
                return [simplifiedShowMock]
            default:
                return undefined
        }
    }

}