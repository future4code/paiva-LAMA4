import { Show, SimplifiedShow } from "../model/Show";

export interface ShowRepository {
    create(newShow: Show): Promise<void>,
    findByDay(weekDay: string): Promise<Show[]>,
    findByDayOrdered(weekDay: string): Promise<SimplifiedShow[]>
}