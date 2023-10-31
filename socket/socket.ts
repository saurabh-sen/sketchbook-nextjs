import { io } from "socket.io-client"

const URL: string =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SERVER_URL_PROD || ""
    : process.env.NEXT_PUBLIC_SERVER_URL_DEV || "";
export const socket = io(URL);