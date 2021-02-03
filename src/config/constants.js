export { version as APP_VERSION } from "../../package.json"
export { name as APP_NAME } from "../../package.json"

process.env.APP_ENV = process.env.NODE_ENV

export const APP_ENV = process.env.APP_ENV
export const NODE_ENV = process.env.NODE_ENV
