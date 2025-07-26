import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

dayjs.extend(relativeTime);
dayjs.locale("id");

export function shortFromNow(date: Date | string) {
    const now = dayjs();
    const target = dayjs(date);

    const diffInMinutes = now.diff(target, "minute");
    const diffInHours = now.diff(target, "hour");
    const diffInDays = now.diff(target, "day");

    if (diffInMinutes < 1) return "baru";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInHours < 24) return `${diffInHours}j`;
    return `${diffInDays}d`;
}

export function formatTimeAndDate(date: Date | string) {
    const target = dayjs(date);
    const time = target.format("hh.mmA");       // contoh: 11.32PM
    const dateFormatted = target.format("MMM D, YYYY"); // contoh: Jul 26, 2025

    return { time, date: dateFormatted };
}

export default dayjs;
