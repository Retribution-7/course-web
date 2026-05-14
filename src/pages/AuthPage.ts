import {
  PASSWORD_LIMITS,
  NICKNAME_REGEN_LIMIT,
  generateNickname,
  generatePassword,
  getUser,
  saveUser,
  restoreUser,
  setAuthenticated,
  validateBirthDate,
  validateEmail,
  validateNicknameCustom,
  validatePassword,
  validatePasswordConfirm,
  validatePhone,
  validateRequired,
} from "../services/auth";
import { fetchUsers } from "../services/api";
import { t } from "../services/i18n";

type Tab = "login" | "register";

const FIELD_INPUT =
  "h-11 w-full rounded-[8px] border border-[#ddd] bg-white px-3 font-sans text-[15px] text-primary " +
  "focus:outline-none focus:border-[#FFC400] transition-colors";

const FIELD_LABEL =
  "block font-sans text-[13px] leading-[1.3] text-[#44444E] mb-1.5";

const FIELD_ERROR =
  "field-error hidden mt-1 font-sans text-[13px] leading-[1.3] text-red-500";

const Field = (opts: {
  id: string;
  label: string;
  labelI18nKey?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  hintI18nKey?: string;
  attrs?: string;
}): string => `
  <div class="field" data-field="${opts.id}">
    <label for="${opts.id}" class="${FIELD_LABEL}">
      <span${opts.labelI18nKey ? ` data-i18n="${opts.labelI18nKey}"` : ""}>${opts.label}</span>${opts.required ? ' <span class="text-red-500" aria-hidden="true">*</span>' : ""}
    </label>
    <input id="${opts.id}"
           type="${opts.type ?? "text"}"
           class="${FIELD_INPUT}"
           ${opts.placeholder ? `placeholder="${opts.placeholder}"` : ""}
           ${opts.attrs ?? ""} />
    ${opts.hint ? `<p class="mt-1 font-sans text-[12px] leading-[1.3] text-[#758499]"${opts.hintI18nKey ? ` data-i18n="${opts.hintI18nKey}"` : ""}>${opts.hint}</p>` : ""}
    <p class="${FIELD_ERROR}" data-error-for="${opts.id}"></p>
  </div>
`;

export const AuthPage = (): string => `
  <section id="auth-page"
           class="hidden bg-[#F3F5F9] py-14 lg:py-20 min-h-[80vh]"
           aria-labelledby="auth-heading">
    <div class="container-main">
      <div class="max-w-[560px] mx-auto bg-white rounded-[14px] card-shadow p-6 lg:p-10">

        <h2 id="auth-heading"
            data-i18n="auth-heading"
            class="font-sans font-normal text-[28px] sm:text-[36px] xl:text-[44px] leading-[1.1] gradient-text text-center">
          Личный кабинет
        </h2>

        <div id="auth-toggle"
             class="auth-toggle relative grid grid-cols-2 bg-[#F3F5F9] rounded-full p-1 mt-6 lg:mt-8"
             role="tablist">
          <div id="auth-toggle-indicator"
               class="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full
                      bg-gradient-to-r from-button-first to-button-second
                      shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                      transition-transform duration-300"></div>
          <button type="button"
                  data-auth-tab="login"
                  data-i18n="auth-tab-login"
                  role="tab"
                  aria-selected="true"
                  class="auth-tab relative z-10 py-2.5 lg:py-3 font-sans text-[15px] lg:text-[17px] text-primary cursor-pointer">
            Вход
          </button>
          <button type="button"
                  data-auth-tab="register"
                  data-i18n="auth-tab-register"
                  role="tab"
                  aria-selected="false"
                  class="auth-tab relative z-10 py-2.5 lg:py-3 font-sans text-[15px] lg:text-[17px] text-primary cursor-pointer">
            Регистрация
          </button>
        </div>

        <form id="auth-login-form" class="mt-8 flex flex-col gap-4" novalidate>
          ${Field({
            id: "login-phone",
            label: "Телефон",
            labelI18nKey: "auth-phone",
            type: "tel",
            required: true,
            placeholder: "+375 (29) 123-45-67",
          })}
          ${Field({
            id: "login-password",
            label: "Пароль",
            labelI18nKey: "auth-password",
            type: "password",
            required: true,
          })}
          <button type="submit"
                  id="login-submit"
                  data-i18n="auth-login-btn"
                  class="mt-2 inline-flex items-center justify-center rounded-full
                         bg-gradient-to-r from-button-first to-button-second
                         px-6 py-[15px] font-sans text-[17px] leading-[1.4] text-[#44444E]
                         transition-all duration-300 hover:scale-[1.02] cursor-pointer
                         shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled>
            Войти
          </button>
        </form>

        <form id="auth-register-form" class="hidden mt-8 flex flex-col gap-4" novalidate>

          <p data-i18n="auth-required-fields"
             class="font-sans text-[12px] leading-[1.3] text-[#758499]">
            Поля, помеченные <span class="text-red-500">*</span>, обязательны
          </p>

          ${Field({
            id: "reg-phone",
            label: "Телефон",
            labelI18nKey: "auth-phone",
            type: "tel",
            required: true,
            placeholder: "+375 (29) 123-45-67",
            hint: "Только номера РБ (25, 29, 33, 44)",
            hintI18nKey: "auth-phone-hint",
          })}
          ${Field({
            id: "reg-email",
            label: "E-mail",
            labelI18nKey: "auth-email",
            type: "email",
            required: true,
            placeholder: "you@example.com",
          })}
          ${Field({
            id: "reg-birth",
            label: "Дата рождения",
            labelI18nKey: "auth-birth",
            type: "date",
            required: true,
            hint: "Регистрация доступна с 16 лет",
            hintI18nKey: "auth-birth-hint",
          })}

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${Field({ id: "reg-lastname", label: "Фамилия", labelI18nKey: "auth-lastname", required: true })}
            ${Field({ id: "reg-firstname", label: "Имя", labelI18nKey: "auth-firstname", required: true })}
          </div>
          ${Field({ id: "reg-middlename", label: "Отчество", labelI18nKey: "auth-middlename" })}

          <fieldset class="mt-2">
            <legend class="font-sans text-[13px] leading-[1.3] text-[#44444E] mb-2">
              <span data-i18n="auth-pwd-label">Пароль</span> <span class="text-red-500" aria-hidden="true">*</span>
            </legend>
            <div class="flex flex-col sm:flex-row gap-3 mb-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="pwd-mode" value="manual" checked
                       class="size-4 accent-[#FFC400]" />
                <span data-i18n="auth-pwd-manual" class="font-sans text-[14px] text-[#44444E]">Задать самостоятельно</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="pwd-mode" value="auto"
                       class="size-4 accent-[#FFC400]" />
                <span data-i18n="auth-pwd-auto" class="font-sans text-[14px] text-[#44444E]">Сгенерировать</span>
              </label>
            </div>

            <div id="pwd-manual">
              <div class="field" data-field="reg-password">
                <input id="reg-password"
                       type="password"
                       class="${FIELD_INPUT}"
                       placeholder="${t("auth-pwd-placeholder")}"
                       data-i18n-placeholder="auth-pwd-placeholder" />
                <p data-i18n="auth-pwd-hint" class="mt-1 font-sans text-[12px] leading-[1.3] text-[#758499]">
                  Заглавная и строчная буквы, цифра и спецсимвол
                </p>
                <p class="${FIELD_ERROR}" data-error-for="reg-password"></p>
              </div>
              <div class="field mt-3" data-field="reg-password-confirm">
                <input id="reg-password-confirm"
                       type="password"
                       class="${FIELD_INPUT}"
                       placeholder="${t("auth-pwd-confirm-placeholder")}"
                       data-i18n-placeholder="auth-pwd-confirm-placeholder" />
                <p class="${FIELD_ERROR}" data-error-for="reg-password-confirm"></p>
              </div>
            </div>

            <div id="pwd-auto" class="hidden">
              <div class="flex gap-2">
                <input id="reg-password-auto"
                       type="text"
                       readonly
                       class="${FIELD_INPUT} font-mono tracking-wide bg-[#FAFAFA]" />
                <button type="button"
                        id="pwd-regen"
                        data-i18n="auth-pwd-refresh"
                        class="shrink-0 px-4 rounded-[8px] border border-[#FFC400]
                               bg-white font-sans text-[14px] text-[#44444E]
                               hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                        aria-label="Сгенерировать заново">
                  Обновить
                </button>
              </div>
            </div>
          </fieldset>

          <div class="field" data-field="reg-nickname">
            <label for="reg-nickname" class="${FIELD_LABEL}">
              <span data-i18n="auth-nickname">Никнейм</span> <span class="text-red-500" aria-hidden="true">*</span>
            </label>
            <div class="flex gap-2">
              <input id="reg-nickname"
                     type="text"
                     readonly
                     class="${FIELD_INPUT} bg-[#FAFAFA]" />
              <button type="button"
                      id="nick-regen"
                      data-i18n="auth-nickname-another"
                      class="shrink-0 px-4 rounded-[8px] border border-[#FFC400]
                             bg-white font-sans text-[14px] text-[#44444E]
                             hover:bg-[#FAFAFA] transition-colors cursor-pointer">
                Другой
              </button>
            </div>
            <p id="nick-hint" data-i18n="auth-nickname-hint"
               class="mt-1 font-sans text-[12px] leading-[1.3] text-[#758499]">
              Сгенерирован автоматически. Не нравится — нажмите «Другой».
            </p>
            <p class="${FIELD_ERROR}" data-error-for="reg-nickname"></p>
          </div>

          <label class="flex items-start gap-2 mt-2 cursor-pointer">
            <input id="reg-agree" type="checkbox" class="size-4 mt-0.5 accent-[#FFC400]" />
            <span class="font-sans text-[13px] leading-[1.4] text-[#44444E]">
              <span data-i18n="auth-agree-text">Я прочитал(а) и согласен(а) с</span>
              <a href="#" id="agreement-link"
                 class="text-[#FFC400] underline underline-offset-2 hover:opacity-80">
                <span data-i18n="auth-agreement-link">Соглашением пользователя</span></a>
              <span class="text-red-500" aria-hidden="true">*</span>
            </span>
          </label>

          <button type="submit"
                  id="register-submit"
                  data-i18n="auth-register-btn"
                  class="mt-4 inline-flex items-center justify-center rounded-full
                         bg-gradient-to-r from-button-first to-button-second
                         px-6 py-[15px] font-sans text-[17px] leading-[1.4] text-[#44444E]
                         transition-all duration-300 hover:scale-[1.02] cursor-pointer
                         shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled>
            Зарегистрироваться
          </button>
        </form>

      </div>
    </div>
  </section>
`;

const setError = (fieldId: string, message: string | null): void => {
  const el = document.querySelector<HTMLElement>(`[data-error-for="${fieldId}"]`);
  if (!el) return;
  if (message) {
    el.textContent = message;
    el.classList.remove("hidden");
  } else {
    el.textContent = "";
    el.classList.add("hidden");
  }
};

const setActiveTab = (tab: Tab): void => {
  const indicator = document.getElementById("auth-toggle-indicator");
  const buttons = document.querySelectorAll<HTMLElement>("[data-auth-tab]");
  buttons.forEach((b) => {
    const active = b.dataset.authTab === tab;
    b.setAttribute("aria-selected", String(active));
    b.classList.toggle("text-primary", true);
  });
  if (indicator) {
    indicator.style.transform = tab === "register" ? "translateX(100%)" : "translateX(0)";
  }
  document.getElementById("auth-login-form")?.classList.toggle("hidden", tab !== "login");
  document.getElementById("auth-register-form")?.classList.toggle("hidden", tab !== "register");
};

interface RegState {
  pwdMode: "manual" | "auto";
  autoPassword: string;
  nicknameAttempts: number;
  nicknameEditable: boolean;
}

const regState: RegState = {
  pwdMode: "manual",
  autoPassword: "",
  nicknameAttempts: 0,
  nicknameEditable: false,
};

const getInput = (id: string): HTMLInputElement | null =>
  document.getElementById(id) as HTMLInputElement | null;

const validateLoginForm = (): boolean => {
  const phone = getInput("login-phone")?.value ?? "";
  const password = getInput("login-password")?.value ?? "";
  return phone.trim().length > 0 && password.length > 0;
};

const validateRegisterForm = (silent: boolean): boolean => {
  const phoneErr = validatePhone(getInput("reg-phone")?.value ?? "");
  const emailErr = validateEmail(getInput("reg-email")?.value ?? "");
  const birthErr = validateBirthDate(getInput("reg-birth")?.value ?? "");
  const lastErr = validateRequired(getInput("reg-lastname")?.value ?? "", "фамилию");
  const firstErr = validateRequired(getInput("reg-firstname")?.value ?? "", "имя");

  let pwdErr: string | null = null;
  let pwdConfirmErr: string | null = null;
  if (regState.pwdMode === "manual") {
    const pwd = getInput("reg-password")?.value ?? "";
    const confirm = getInput("reg-password-confirm")?.value ?? "";
    pwdErr = validatePassword(pwd);
    pwdConfirmErr = pwdErr ? null : validatePasswordConfirm(pwd, confirm);
  }

  let nickErr: string | null = null;
  const nick = getInput("reg-nickname")?.value ?? "";
  if (regState.nicknameEditable) {
    nickErr = validateNicknameCustom(nick);
  } else if (!nick.trim()) {
    nickErr = "Никнейм не сгенерирован";
  }

  const agree = (getInput("reg-agree") as HTMLInputElement | null)?.checked ?? false;

  if (!silent) {
    setError("reg-phone", phoneErr);
    setError("reg-email", emailErr);
    setError("reg-birth", birthErr);
    setError("reg-lastname", lastErr);
    setError("reg-firstname", firstErr);
    setError("reg-password", pwdErr);
    setError("reg-password-confirm", pwdConfirmErr);
    setError("reg-nickname", nickErr);
  }

  return (
    !phoneErr &&
    !emailErr &&
    !birthErr &&
    !lastErr &&
    !firstErr &&
    !pwdErr &&
    !pwdConfirmErr &&
    !nickErr &&
    agree
  );
};

const refreshSubmit = (): void => {
  const loginBtn = document.getElementById("login-submit") as HTMLButtonElement | null;
  const regBtn = document.getElementById("register-submit") as HTMLButtonElement | null;
  if (loginBtn) loginBtn.disabled = !validateLoginForm();
  if (regBtn) regBtn.disabled = !validateRegisterForm(true);
};

const wireFieldClear = (fieldId: string, eventType: "input" | "change" = "input"): void => {
  const input = getInput(fieldId);
  input?.addEventListener(eventType, () => {
    setError(fieldId, null);
    refreshSubmit();
  });
  input?.addEventListener("blur", () => {
    if (fieldId === "reg-phone") setError(fieldId, validatePhone(input.value));
    else if (fieldId === "reg-email") setError(fieldId, validateEmail(input.value));
    else if (fieldId === "reg-birth") setError(fieldId, validateBirthDate(input.value));
    else if (fieldId === "reg-lastname")
      setError(fieldId, validateRequired(input.value, "фамилию"));
    else if (fieldId === "reg-firstname")
      setError(fieldId, validateRequired(input.value, "имя"));
    else if (fieldId === "reg-password" && regState.pwdMode === "manual")
      setError(fieldId, validatePassword(input.value));
    else if (fieldId === "reg-password-confirm" && regState.pwdMode === "manual")
      setError(
        fieldId,
        validatePasswordConfirm(getInput("reg-password")?.value ?? "", input.value),
      );
    else if (fieldId === "reg-nickname" && regState.nicknameEditable)
      setError(fieldId, validateNicknameCustom(input.value));
  });
};

const regenerateNickname = (): void => {
  const input = getInput("reg-nickname");
  const hint = document.getElementById("nick-hint");
  const btn = document.getElementById("nick-regen");
  if (!input) return;

  if (regState.nicknameEditable) return;

  input.value = generateNickname();
  regState.nicknameAttempts += 1;

  if (regState.nicknameAttempts >= NICKNAME_REGEN_LIMIT) {
    regState.nicknameEditable = true;
    input.readOnly = false;
    input.classList.remove("bg-[#FAFAFA]");
    input.value = "";
    input.placeholder = t("auth-nickname-input-placeholder");
    if (hint) hint.textContent = t("auth-nickname-limit");
    btn?.setAttribute("hidden", "");
  }

  refreshSubmit();
};

const switchPasswordMode = (mode: "manual" | "auto"): void => {
  regState.pwdMode = mode;
  const manual = document.getElementById("pwd-manual");
  const auto = document.getElementById("pwd-auto");
  manual?.classList.toggle("hidden", mode !== "manual");
  auto?.classList.toggle("hidden", mode !== "auto");

  if (mode === "auto") {
    regState.autoPassword = generatePassword(12);
    const input = getInput("reg-password-auto");
    if (input) input.value = regState.autoPassword;
    setError("reg-password", null);
    setError("reg-password-confirm", null);
  }
  refreshSubmit();
};

const handleRegisterSubmit = (event: Event): void => {
  event.preventDefault();
  if (!validateRegisterForm(false)) {
    refreshSubmit();
    return;
  }
  const middle = getInput("reg-middlename")?.value.trim() ?? "";
  const password =
    regState.pwdMode === "auto"
      ? regState.autoPassword
      : (getInput("reg-password")?.value ?? "");
  saveUser({
    phone: (getInput("reg-phone")?.value ?? "").trim(),
    email: (getInput("reg-email")?.value ?? "").trim(),
    birthDate: getInput("reg-birth")?.value ?? "",
    lastName: (getInput("reg-lastname")?.value ?? "").trim(),
    firstName: (getInput("reg-firstname")?.value ?? "").trim(),
    middleName: middle || undefined,
    nickname: (getInput("reg-nickname")?.value ?? "").trim(),
    password,
    createdAt: new Date().toISOString(),
    role: "customer",
  });
  alert(t("auth-success-register"));
  window.location.hash = "";
};

const handleLoginSubmit = (event: Event): void => {
  event.preventDefault();
  if (!validateLoginForm()) return;

  const phone = (getInput("login-phone")?.value ?? "").trim();
  const password = getInput("login-password")?.value ?? "";

  const localUser = getUser();
  // Fast path: same user already cached locally
  if (localUser && localUser.phone === phone) {
    if (localUser.password !== password) {
      alert(t("auth-error-wrong-pwd"));
      return;
    }
    setAuthenticated(true);
    alert(t("auth-success-login"));
    window.location.hash = "";
    return;
  }

  // Different phone or no local user — check server
  const loginBtn = document.getElementById("login-submit") as HTMLButtonElement | null;
  if (loginBtn) loginBtn.disabled = true;

  fetchUsers()
    .then((users) => {
      const found = users.find((u) => u.phone === phone && u.password === password);
      if (!found) {
        alert(t("auth-error-not-found"));
        return;
      }
      restoreUser({
        phone: found.phone,
        email: found.email,
        firstName: found.firstName,
        lastName: found.lastName,
        birthDate: found.birthDate ?? "",
        nickname: found.nickname ?? "",
        password,
        createdAt: found.createdAt,
        role: (found.role as "customer" | "admin") ?? "customer",
      }, found.id);
      alert(t("auth-success-login"));
      window.location.hash = "";
    })
    .catch(() => {
      alert(t("auth-error-server"));
    })
    .finally(() => {
      if (loginBtn) loginBtn.disabled = !validateLoginForm();
    });
};

const showPage = (show: boolean): void => {
  const page = document.getElementById("auth-page");
  if (!page) return;
  page.classList.toggle("hidden", !show);
  if (show) window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleRoute = (): void => {
  showPage(window.location.hash === "#auth");
};

export const initAuthPage = (): void => {
  handleRoute();
  window.addEventListener("hashchange", handleRoute);

  setActiveTab("login");
  document.querySelectorAll<HTMLElement>("[data-auth-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveTab(btn.dataset.authTab as Tab);
      refreshSubmit();
    });
  });

  [
    "login-phone",
    "login-password",
    "reg-phone",
    "reg-email",
    "reg-birth",
    "reg-lastname",
    "reg-firstname",
    "reg-middlename",
    "reg-password",
    "reg-password-confirm",
    "reg-nickname",
  ].forEach((id) => wireFieldClear(id));

  getInput("reg-agree")?.addEventListener("change", refreshSubmit);

  document.querySelectorAll<HTMLInputElement>('input[name="pwd-mode"]').forEach((r) => {
    r.addEventListener("change", () => {
      if (r.checked) switchPasswordMode(r.value as "manual" | "auto");
    });
  });

  document.getElementById("pwd-regen")?.addEventListener("click", () => {
    regState.autoPassword = generatePassword(12);
    const input = getInput("reg-password-auto");
    if (input) input.value = regState.autoPassword;
  });

  const confirmInput = getInput("reg-password-confirm");
  confirmInput?.addEventListener("paste", (e) => {
    e.preventDefault();
    setError("reg-password-confirm", t("auth-paste-error"));
  });

  const nickInput = getInput("reg-nickname");
  if (nickInput) nickInput.value = generateNickname();
  document.getElementById("nick-regen")?.addEventListener("click", regenerateNickname);

  document
    .getElementById("agreement-link")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      alert(t("auth-agreement-text"));
    });

  document.getElementById("auth-login-form")?.addEventListener("submit", handleLoginSubmit);
  document
    .getElementById("auth-register-form")
    ?.addEventListener("submit", handleRegisterSubmit);

  refreshSubmit();
};
