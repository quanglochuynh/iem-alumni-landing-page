import dayjs, { Dayjs as DayjsDateType } from 'dayjs';

import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(CustomParseFormat);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

const tz = 'Asia/Ho_Chi_Minh';
dayjs.tz.setDefault(tz);

export enum DateFormat {
  TIME = 'HH:mm',
  DATE = 'YYYY-MM-DD',
  DAY_MONTH_YEAR = 'DD-MM-YYYY',
  DATETIME = 'HH:mm DD/MM/YYYY',
  DATETIME_WITH_SECONDS = 'HH:mm:ss DD/MM/YYYY',
  ISO8601_WITH_MILLISECONDS = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
}

export const getNowTime = (format: DateFormat = DateFormat.TIME): string => {
  return dayjs().format(format);
};

export const getTodayDate = (format: DateFormat = DateFormat.DATE): string => {
  return dayjs().format(format);
};

export const getDateFormatted = (
  date: string | Date | DayjsDateType = new Date(),
  format: DateFormat = DateFormat.DATE
): string => {
  return dayjs(date).isValid() ? dayjs(date).format(format) : '';
};

export const getLocalDateTime = (
  date: string | Date | DateFormat = new Date(),
  format: DateFormat = DateFormat.DAY_MONTH_YEAR
): string => {
  return dayjs(date).isValid() ? dayjs.utc(date).local().format(format) : '';
};

export { dayjs };

export function prettyDate(time: string | Date) {
  const date = new Date(time),
    diff = (Date.now() - date.getTime()) / 1000,
    day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0) {
    return;
  }

  if (day_diff > 186) {
    return getDateFormatted(date, DateFormat.DAY_MONTH_YEAR);
  }

  const monthDiff = Math.floor(day_diff / 30);

  return (
    (day_diff === 0 &&
      ((diff < 60 && 'vừa xong') ||
        (diff < 120 && '1 phút trước') ||
        (diff < 3600 && Math.floor(diff / 60) + ' phút trước') ||
        (diff < 7200 && '1 tiếng trước') ||
        (diff < 86400 && Math.floor(diff / 3600) + ' tiếng trước'))) ||
    (day_diff === 1 && 'Hôm qua') ||
    (day_diff < 7 && day_diff + ' ngày trước') ||
    (day_diff < 31 && Math.ceil(day_diff / 7) + ' tuần trước') ||
    (monthDiff < 1 && '1 tháng trước') ||
    monthDiff + ' tháng trước'
  );
}

export function daysPassedSince(date: string | Date): number {
  const diff = Date.now() - new Date(date).getTime();
  return Math.floor(diff / 86400000); // 86400000 ms in a day
}

export function prettyRemaining(time: string | Date) {
  const date = new Date(time),
    diff = date.getTime() - Date.now(),
    day_diff = Math.floor(diff / 86400000);

  if (isNaN(day_diff) || day_diff < 0) {
    return;
  }

  return `${day_diff} ngày`;
}
