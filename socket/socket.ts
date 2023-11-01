"use client"
import { io } from "socket.io-client"

const URL: string = "52.2.149.85:5000";

export const socket = io(URL);