const isDateBeforeToday = (date: Date) => {
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
};

export const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
export const months = [
  'January',
  'Febrauary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Novemver',
  'December',
];
export const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export enum DateFormats {
  DDD_DD_YYYY = 'DDD_DD_YYYY',
  DD_MMM = 'DD_MMM',
}

export function isYesterday(date: Date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (yesterday.toDateString() === date.toDateString()) {
    return true;
  }

  return false;
}

const getFormattedDate = (date: Date, format: DateFormats) => {
  const dateToFormat = new Date(date);
  const weekday = dateToFormat.getDay();
  const month = dateToFormat.getMonth();
  if (format === DateFormats.DDD_DD_YYYY) {
    return `${weekdaysShort[weekday]} ${dateToFormat.getDate()} ${dateToFormat.getFullYear()}`;
  } else if (format === DateFormats.DD_MMM) {
    if (isYesterday(dateToFormat)) {
      return 'Yesterday';
    }
    return `${dateToFormat.getDate()} ${monthsShort[month]}`;
  }
  return '';
};

export { isDateBeforeToday, getFormattedDate };
