export type Screen = "login" | "register" | "forgot" | "forgot-success" | "google" | "terms";

export type RegField = "first" | "last" | "email" | "pw" | "confirm";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;