import { t } from "../services/i18n";
import { showToast } from "../shared/ui/toast";

export const ContactForm = (): string => {
	return `
    <section class="bg-surface overflow-hidden transition-colors duration-300" id="consultation" aria-labelledby="consultation-heading">
      <div class="container-main flex flex-col lg:flex-row items-center justify-between gap-10 py-12 lg:py-14">

        <!-- Фото консультанта -->
        <div class="shrink-0 hidden lg:block">
          <img
            src="/images/peoples/people-2.png"
            alt="Консультант Металлобазы"
            class="w-[500px] max-h-[639px] object-contain object-bottom"
            loading="lazy"
          >
        </div>

        <!-- Правый блок: текст + форма -->
        <div class="flex flex-col gap-[33px] max-w-[538px] w-full">

          <h2 id="consultation-heading"
              data-i18n="contact-heading"
              class="heading-gradient font-sans font-normal text-[32px] leading-[1.2] sm:text-[40px] xl:text-[56px] xl:leading-[68px]">
            ЕСТЬ ВОПРОСЫ?
          </h2>

          <p data-i18n="contact-desc"
             class="font-sans font-normal text-[16px] lg:text-[18px] xl:text-[20px] leading-[1.5] text-secondary">
            Если у Вас есть вопросы или требуется помощь в подборе кровельных
            материалов, то оставьте свои данные, мы свяжемся с Вами и проконсультируем.
          </p>

          <!-- Форма -->
          <form id="consultation-form" class="flex flex-col gap-4" novalidate>
            <button
              type="submit"
              data-i18n="contact-btn"
              class="btn-primary text-[22px] px-9 py-6 w-fit">
              Получить консультацию
            </button>
          </form>

          <!-- Мессенджеры -->
          <div class="flex items-center gap-[21px]">
            <p data-i18n="contact-messenger"
               class="font-sans font-normal text-[17px] leading-[1.8] text-secondary opacity-60 w-[140px]">
              или напишите нам в мессенджер
            </p>
            <div class="flex gap-[13px]" aria-label="Мессенджеры">
              <a href="https://wa.me/78123255055"
                 target="_blank" rel="noopener noreferrer"
                 class="flex items-center justify-center size-[49px] rounded-full border border-button-first
                        transition-opacity hover:opacity-70"
                 aria-label="Написать в WhatsApp">
                <img src="/icons/whats-app-logo-2.svg" alt="WhatsApp" class="size-[21px] object-contain">
              </a>
              <a href="https://t.me/metallobaza"
                 target="_blank" rel="noopener noreferrer"
                 class="flex items-center justify-center size-[49px] rounded-full border border-button-first
                        transition-opacity hover:opacity-70"
                 aria-label="Написать в Telegram">
                <img src="/icons/telegram-logo.svg" alt="Telegram" class="size-[21px] object-contain">
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  `;
};

export const initContactForm = (): void => {
	const form = document.getElementById(
		"consultation-form",
	) as HTMLFormElement | null;
	if (!form) return;

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		showToast(t("contact-thanks"), { type: "success" });
	});
};
