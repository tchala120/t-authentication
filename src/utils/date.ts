import dayjs from 'dayjs'

export type DateType = Date | number

export function isBefore(date: DateType): boolean {
  return dayjs(date).isBefore(dayjs())
}
