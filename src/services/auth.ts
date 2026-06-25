import { postUser } from "./api";
import { TOP_100_PASSWORDS_2023 } from "./passwords-top";

const MIN_AGE = 16;
const MIN_PASSWORD = 8;
const MAX_PASSWORD = 20;
const MAX_NICKNAME_REGEN = 5;

const PHONE_RE = /^\+375\s?\(?(25|29|33|44)\)?\s?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UPPER_RE = /[A-Z]/;
const LOWER_RE = /[a-z]/;
const DIGIT_RE = /\d/;
const SPECIAL_RE = /[!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|`~]/;
const NICKNAME_RE = /^[A-Za-z0-9_-]{3,20}$/;

export const PASSWORD_LIMITS = {
  MIN: MIN_PASSWORD,
  MAX: MAX_PASSWORD,
};

export const NICKNAME_REGEN_LIMIT = MAX_NICKNAME_REGEN;

export const validatePhone = (value: string): string | null => {
  if (!value.trim()) return "Укажите номер телефона";
  if (!PHONE_RE.test(value.trim()))
    return "Только номера РБ: +375 (25|29|33|44) XXX-XX-XX";
  return null;
};

export const validateEmail = (value: string): string | null => {
  if (!value.trim()) return "Укажите e-mail";
  if (!EMAIL_RE.test(value.trim())) return "Некорректный формат e-mail";
  return null;
};

const calcAge = (dateStr: string): number => {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return -1;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
};

export const validateBirthDate = (value: string): string | null => {
  if (!value) return "Укажите дату рождения";
  const age = calcAge(value);
  if (age < 0) return "Некорректная дата";
  if (age < MIN_AGE) return `Регистрация доступна с ${MIN_AGE} лет`;
  if (age > 120) return "Проверьте дату рождения";
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (!value) return "Укажите пароль";
  if (value.length < MIN_PASSWORD) return `Минимум ${MIN_PASSWORD} символов`;
  if (value.length > MAX_PASSWORD) return `Максимум ${MAX_PASSWORD} символов`;
  if (!UPPER_RE.test(value)) return "Нужна хотя бы одна заглавная буква";
  if (!LOWER_RE.test(value)) return "Нужна хотя бы одна строчная буква";
  if (!DIGIT_RE.test(value)) return "Нужна хотя бы одна цифра";
  if (!SPECIAL_RE.test(value)) return "Нужен хотя бы один спецсимвол";
  if (TOP_100_PASSWORDS_2023.has(value.toLowerCase()))
    return "Пароль слишком распространён — выберите надёжнее";
  return null;
};

export const validatePasswordConfirm = (
  password: string,
  confirm: string,
): string | null => {
  if (!confirm) return "Повторите пароль";
  if (password !== confirm) return "Пароли не совпадают";
  return null;
};

export const validateRequired = (
  value: string,
  label: string,
): string | null => {
  if (!value.trim()) return `Укажите ${label}`;
  return null;
};

export const validateNicknameCustom = (value: string): string | null => {
  if (!value.trim()) return "Укажите никнейм";
  if (!NICKNAME_RE.test(value.trim()))
    return "3–20 символов: латиница, цифры, _ или -";
  return null;
};

const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWER = "abcdefghijkmnpqrstuvwxyz";
const DIGITS = "23456789";
const SPECIALS = "!@#$%^&*-_=+?";

const pick = (s: string): string => s[Math.floor(Math.random() * s.length)];

export const generatePassword = (length = 12): string => {
  const len = Math.max(MIN_PASSWORD, Math.min(MAX_PASSWORD, length));
  const chars = [pick(UPPER), pick(LOWER), pick(DIGITS), pick(SPECIALS)];
  const pool = UPPER + LOWER + DIGITS + SPECIALS;
  while (chars.length < len) chars.push(pick(pool));
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
};

const ADJECTIVES = [
  "Brave",
  "Swift",
  "Silent",
  "Mighty",
  "Lucky",
  "Wild",
  "Calm",
  "Bold",
  "Crimson",
  "Golden",
  "Silver",
  "Iron",
  "Shadow",
  "Royal",
  "Cosmic",
  "Lunar",
  "Solar",
  "Nimble",
  "Fierce",
  "Loyal",
  "Quiet",
  "Rapid",
  "Steel",
  "Storm",
];

const NOUNS = [
  "Tiger",
  "Wolf",
  "Eagle",
  "Falcon",
  "Lion",
  "Bear",
  "Panda",
  "Fox",
  "Hawk",
  "Otter",
  "Lynx",
  "Raven",
  "Cobra",
  "Shark",
  "Phoenix",
  "Dragon",
  "Knight",
  "Ranger",
  "Hunter",
  "Pilot",
  "Captain",
  "Rider",
  "Voyager",
  "Nomad",
];

export const generateNickname = (): string => {
  const a = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const n = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 1000);
  return `${a}${n}${num}`;
};

export interface RegisteredUser {
  phone: string;
  email: string;
  birthDate: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  nickname: string;
  password: string;
  createdAt: string;
  role?: "customer" | "admin";
}

const USER_KEY = "metallobaza-user";
const AUTH_KEY = "metallobaza-authenticated";
const SERVER_ID_KEY = "metallobaza-server-uid";
const AUTH_CHANGE_EVENT = "auth:change";

const emitAuthChange = (): void => {
  window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT));
};

export const getServerId = (): string | null =>
  localStorage.getItem(SERVER_ID_KEY);
export const setServerId = (id: string): void =>
  localStorage.setItem(SERVER_ID_KEY, id);

export const saveUser = (user: RegisteredUser): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_KEY, "1");
  emitAuthChange();

  // Persist to JSON Server in the background
  void postUser(user)
    .then((saved) => setServerId(String(saved.id)))
    .catch(() => {});
};

// Restores user from server data without creating a duplicate server record
export const restoreUser = (user: RegisteredUser, serverId: number): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_KEY, "1");
  setServerId(String(serverId));
  emitAuthChange();
};

export const getUser = (): RegisteredUser | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as RegisteredUser) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean =>
  localStorage.getItem(AUTH_KEY) === "1" && getUser() !== null;

export const getRole = (): "customer" | "admin" => {
  const user = getUser();
  return user?.role === "admin" ? "admin" : "customer";
};

export const isAdmin = (): boolean =>
  isAuthenticated() && getRole() === "admin";

export const setAuthenticated = (authenticated: boolean): void => {
  if (authenticated) localStorage.setItem(AUTH_KEY, "1");
  else localStorage.removeItem(AUTH_KEY);
  emitAuthChange();
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
  emitAuthChange();
};

export const onAuthChange = (handler: () => void): (() => void) => {
  const listener = (): void => handler();
  window.addEventListener(AUTH_CHANGE_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
};
