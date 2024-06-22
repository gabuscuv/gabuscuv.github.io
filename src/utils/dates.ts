export function getYearLapse(startDate: number, endDate: number): string {
  return ((endDate - startDate) / 1000 / 31536000).toFixed(2);
}

export function getYearsMonth(locale: string, date: number): string {
  const _startDateType = new Date(date);
  return `${_startDateType.toLocaleString(locale, {
    month: 'long',
  })} ${_startDateType.getFullYear()}`;
}

export function getYearsMonthRange(
  locale: string,
  startDate: number,
  endDate: number
): string {
  return `( ${getYearsMonth(locale, startDate)} - ${getYearsMonth(
    locale,
    endDate
  )} )`;
}
