import { FormItemType } from "../types/index"

export function getCol(item: FormItemType) {
  return item.type === "datetimerange" ? 2 : 1
}
/* element ui 的显示以小写为准，此处额外独立出一份 */
export function dateFormat(type: string) {
  switch (type) {
    case "date":
      return "YYYY-MM-DD"
    case "daterange":
      return "YYYY-MM-DD"
    case "datetime":
      return "YYYY-MM-DD HH:mm:ss"
    case "datetimerange":
      return "YYYY-MM-DD HH:mm:ss"
    case "year":
      return "YYYY"
    case "month":
      return "YYYY-MM"
    case "time":
      return "HH:mm:ss"
    default:
      return "YYYY-MM-DD HH:mm:ss"
  }
}

export function renameKey(a: string, b: string) {
  const NOT_NEED_KEY = a + b
  return NOT_NEED_KEY
}
