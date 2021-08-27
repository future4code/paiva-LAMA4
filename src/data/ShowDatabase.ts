import { Show, SimplifiedShow } from "../model/Show";
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

    public async findByDay(weekDay: string): Promise<Show[]> {

        const shows = await BaseDatabase.connection(ShowDatabase.TABLE_NAME)
            .select('*')
            .where({ week_day: weekDay })

        return shows.map((show) => Show.toShowModel(show));
    }

    public async findByDayOrdered(weekDay: string): Promise<SimplifiedShow[]> {

        const shows = await BaseDatabase.connection.raw(`
            SELECT name, music_genre, start_time FROM Lama_Shows
            INNER JOIN Lama_Bands ON band_id = Lama_Bands.id
            WHERE week_day = "${weekDay}" ORDER BY start_time;
        `)

        return shows[0].map((show: SimplifiedShow) => SimplifiedShow.toSimplifiedModel(show));
    }
}