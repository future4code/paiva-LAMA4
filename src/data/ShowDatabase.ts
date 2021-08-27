import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
    private static TABLE_NAME = "Lama_Shows"

    async create(newShow: Show) {
        await BaseDatabase.connection(ShowDatabase.TABLE_NAME)
            .insert({
                id: newShow.getId(),
                week_day: newShow.getWeekDay(),
                start_time: newShow.getStartTime(),
                end_time: newShow.getEndTime(),
                band_id: newShow.getBandId()
            })
    }

    public async findShowsByDay(weekDay: string): Promise<Show[] | undefined> {

        const shows = await BaseDatabase.connection(ShowDatabase.TABLE_NAME)
            .select('*')
            .where({ week_day: weekDay })
            
        return shows[0] && shows.map((show) => Show.toShowModel(show));
    }
}