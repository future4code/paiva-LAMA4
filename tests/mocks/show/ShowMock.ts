import { Show, SHOW_DAYS, SimplifiedShow } from "../../../src/model/Show";

export const showMockFriday = new Show(
    "id_mock",
    SHOW_DAYS.FRIDAY,
    8,
    12,
    "band_id_mock"
)

export const showMockSaturday = new Show(
    "id_mock",
    SHOW_DAYS.SATURDAY,
    8,
    12,
    "band_id_mock"
)

export const showMockSunday = new Show(
    "id_mock",
    SHOW_DAYS.SUNDAY,
    8,
    12,
    "band_id_mock"
)

export const simplifiedShowMock = new SimplifiedShow(
    "name_mock",
    "genre_mock",
    8,
    12,
)
