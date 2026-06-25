import { BackLink } from "../shared/ui/BackLink";

interface Stat {
	value: string;
	label: string;
}

interface Milestone {
	year: string;
	title: string;
	description: string;
}

interface Value {
	icon: string;
	title: string;
	description: string;
}

const STATS: Stat[] = [
	{ value: "13+", label: "лет на рынке" },
	{ value: "5 000+", label: "постоянных клиентов" },
	{ value: "20 000 м²", label: "складских площадей" },
	{ value: "80+", label: "сотрудников" },
];

const MILESTONES: Milestone[] = [
	{
		year: "2010",
		title: "Основание компании",
		description:
			"Открыли первый склад в Горелово площадью 1 500 м². Начали с поставок профнастила и арматуры.",
	},
	{
		year: "2014",
		title: "Расширение ассортимента",
		description:
			"Добавили в каталог металлочерепицу, фальцевую кровлю и доборные элементы. Склад вырос до 8 000 м².",
	},
	{
		year: "2017",
		title: "Собственный автопарк",
		description:
			"Запустили службу доставки: 50 машин грузоподъёмностью от 1,5 до 20 тонн. Сроки доставки сократились до 1–2 дней.",
	},
	{
		year: "2020",
		title: "Прямые контракты с заводами",
		description:
			"Перешли на работу напрямую с производителями, снизив цены для клиентов на 8–15%.",
	},
	{
		year: "2024",
		title: "Цифровая платформа",
		description:
			"Запустили онлайн-каталог с калькулятором стоимости и автоматизацию обработки заявок — менее 30 минут от заявки до счёта.",
	},
];

const VALUES: Value[] = [
	{
		icon: "/icons/check-square.svg",
		title: "Качество без компромиссов",
		description:
			"Принимаем металл только у производителей с сертификацией. Каждая партия проходит входной контроль на складе.",
	},
	{
		icon: "/icons/calculatings.svg",
		title: "Прозрачные цены",
		description:
			"Цены в каталоге — финальные. Никаких «уточним при заказе»: вы видите стоимость до копейки ещё на этапе расчёта.",
	},
	{
		icon: "/icons/people.svg",
		title: "Внимание к клиенту",
		description:
			"Менеджер ведёт заказ от заявки до подписания акта приёмки. Любые вопросы — по одному номеру, без переключений.",
	},
	{
		icon: "/icons/time.svg",
		title: "Скорость поставки",
		description:
			"Большая часть заказов отгружается в день обращения. Срочные — в течение 2 часов с момента оплаты.",
	},
];

const renderStat = (stat: Stat, idx: number): string => `
  <div class="bg-surface rounded-[14px] card-shadow p-2 sm:p-6 lg:p-7 text-center flex flex-col gap-2 transition-colors duration-300">
    <span class="font-sans font-normal text-[28px] sm:text-[32px] lg:text-[40px] xl:text-[48px] leading-none gradient-text">
      ${stat.value}
    </span>
    <span data-i18n="company-stat-${idx}-label"
          class="font-sans text-[13px] sm:text-[14px] leading-[1.4] text-text-third">
      ${stat.label}
    </span>
  </div>
`;

const renderMilestone = (m: Milestone, idx: number): string => `
  <article class="relative pl-8 sm:pl-10 lg:pl-12 pb-6 lg:pb-8 last:pb-0
                  before:absolute before:left-[14px] sm:before:left-[18px] lg:before:left-[22px]
                  before:top-2 before:bottom-0
                  before:w-px before:bg-border-light dark:before:bg-border-dark
                  last:before:hidden">
    <span class="absolute left-0 top-0 grid size-[30px] sm:size-9 lg:size-11 place-items-center
                 rounded-full gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                 font-sans text-[11px] sm:text-[12px] lg:text-[13px] text-primary">
      <span class="sr-only">${m.year}</span>
    </span>
    <div class="flex flex-col gap-1.5 sm:gap-2">
      <span class="font-sans text-[13px] sm:text-[14px] uppercase tracking-[0.08em] text-button-first">
        ${m.year}
      </span>
      <h3 data-i18n="company-milestone-${idx}-title"
          class="font-sans font-normal text-[18px] sm:text-[20px] lg:text-[24px] leading-[1.2] text-primary">
        ${m.title}
      </h3>
      <p data-i18n="company-milestone-${idx}-desc"
         class="font-sans text-[14px] sm:text-[15px] leading-[1.55] text-text-secondary">
        ${m.description}
      </p>
    </div>
  </article>
`;

const renderValue = (v: Value, idx: number): string => `
  <article class="bg-surface rounded-[14px] card-shadow p-5 sm:p-6 lg:p-7 flex flex-col gap-4 transition-colors duration-300">
    <div class="size-12 lg:size-14 rounded-[12px] gradient-icon grid place-items-center
                shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                border border-[rgba(255,196,0,0.3)]">
      <img src="${v.icon}" alt="" class="size-6 object-contain" aria-hidden="true">
    </div>
    <h3 data-i18n="company-value-${idx}-title"
        class="font-sans font-normal text-[18px] sm:text-[20px] leading-[1.2] gradient-text">
      ${v.title}
    </h3>
    <p data-i18n="company-value-${idx}-desc"
       class="font-sans text-[14px] sm:text-[15px] leading-[1.55] text-text-secondary">
      ${v.description}
    </p>
  </article>
`;

export const AboutCompanyPage = (): string => `
  <section id="company-page"
           class="hidden bg-bg-first py-10 lg:py-16 min-h-[60vh] transition-colors duration-300"
           aria-labelledby="company-heading">
    <div class="container-main">

      ${BackLink("#", "company-home", "На главную", "text-text-secondary")}

      <header class="bg-surface rounded-[14px] card-shadow p-6 sm:p-8 lg:p-10 xl:p-14 transition-colors duration-300">
        <span data-i18n="company-label"
              class="font-sans text-[13px] lg:text-[14px] uppercase tracking-[0.08em] text-button-first">
          О компании
        </span>
        <h1 id="company-heading"
            data-i18n="company-heading"
            class="mt-3 font-sans font-normal text-[28px] leading-[1.1] sm:text-[36px] lg:text-[48px] xl:text-[56px] xl:leading-[1.15] gradient-text">
          МЕТАЛЛОБАЗА ВОЛХОНКА
        </h1>
        <p data-i18n="company-desc"
           class="mt-4 lg:mt-6 max-w-[760px] font-sans text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.6] text-text-secondary">
          С 2010 года поставляем кровельные и фасадные материалы для частных домов,
          коммерческих объектов и промышленных предприятий по всей Северо-Западу.
          Работаем напрямую с заводами-изготовителями — это значит честные цены,
          контроль качества и поставки в срок.
        </p>

        <div class="mt-6 lg:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          ${STATS.map((s, i) => renderStat(s, i)).join("")}
        </div>
      </header>

      <section class="mt-10 lg:mt-14 bg-surface rounded-[14px] card-shadow p-6 sm:p-8 lg:p-10 xl:p-14 transition-colors duration-300"
               aria-labelledby="mission-heading">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-12 items-start">
          <div>
            <span data-i18n="company-mission-label"
                  class="font-sans text-[13px] lg:text-[14px] uppercase tracking-[0.08em] text-button-first">
              Наша миссия
            </span>
            <h2 id="mission-heading"
                data-i18n="company-mission-title"
                class="mt-3 font-sans font-normal text-[24px] leading-[1.15] sm:text-[28px] lg:text-[36px] xl:text-[40px] gradient-text">
              Сделать качественный металл доступным
            </h2>
          </div>
          <p data-i18n="company-mission-desc"
             class="font-sans text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.65] text-text-secondary">
            Мы верим, что надёжная кровля и фасад не должны стоить как премиальная иномарка.
            Поэтому мы убираем посредников, держим собственный склад и автопарк,
            автоматизируем расчёты — и передаём экономию клиенту. Чтобы у каждого
            был выбор: купить дешевле без потери качества или получить премиальный
            материал по справедливой цене.
          </p>
        </div>
      </section>

      <section class="mt-10 lg:mt-14" aria-labelledby="values-heading">
        <h2 id="values-heading"
            data-i18n="company-values-heading"
            class="font-sans font-normal text-[24px] leading-[1.2] sm:text-[28px] lg:text-[36px] xl:text-[44px] gradient-text">
          Наши принципы
        </h2>
        <div class="mt-6 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          ${VALUES.map((v, i) => renderValue(v, i)).join("")}
        </div>
      </section>

      <section class="mt-10 lg:mt-14 bg-surface rounded-[14px] card-shadow p-6 sm:p-8 lg:p-10 xl:p-14 transition-colors duration-300"
               aria-labelledby="timeline-heading">
        <h2 id="timeline-heading"
            data-i18n="company-timeline-heading"
            class="font-sans font-normal text-[24px] leading-[1.2] sm:text-[28px] lg:text-[36px] xl:text-[44px] gradient-text">
          История компании
        </h2>
        <div class="mt-6 lg:mt-10">
          ${MILESTONES.map((m, i) => renderMilestone(m, i)).join("")}
        </div>
      </section>

      <section class="mt-10 lg:mt-14" aria-labelledby="location-heading">
        <h2 id="location-heading"
            data-i18n="company-location-heading"
            class="font-sans font-normal text-[24px] leading-[1.2] sm:text-[28px] lg:text-[36px] xl:text-[44px] gradient-text">
          Где нас найти
        </h2>
        <div class="mt-6 lg:mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-5 lg:gap-6 items-stretch">
          <div class="bg-surface rounded-[14px] card-shadow p-6 lg:p-8 flex flex-col gap-5 transition-colors duration-300">
            <div>
              <span data-i18n="company-address-label"
                    class="font-sans text-[13px] uppercase tracking-[0.08em] text-button-first">
                Адрес склада
              </span>
              <address class="not-italic mt-2 font-sans text-[16px] lg:text-[18px] leading-[1.4] text-primary">
                Санкт-Петербург, Горелово,<br>
                Волхонское шоссе, 6
              </address>
            </div>
            <div>
              <span data-i18n="company-phone-label"
                    class="font-sans text-[13px] uppercase tracking-[0.08em] text-button-first">
                Телефон
              </span>
              <a href="tel:+78123255055"
                 class="block mt-2 font-sans text-[20px] lg:text-[24px] leading-none gradient-text hover:opacity-80 transition-opacity">
                +7 (812) 325-50-55
              </a>
            </div>
            <div>
              <span data-i18n="company-hours-label"
                    class="font-sans text-[13px] uppercase tracking-[0.08em] text-button-first">
                Часы работы
              </span>
              <ul class="mt-2 flex flex-col gap-1 font-sans text-[14px] lg:text-[15px] leading-[1.4] text-text-secondary">
                <li class="flex justify-between gap-4"><span data-i18n="company-hours-weekdays">Пн – Пт</span><span>09:00 – 19:00</span></li>
                <li class="flex justify-between gap-4"><span data-i18n="company-hours-sat">Сб</span><span>10:00 – 17:00</span></li>
                <li class="flex justify-between gap-4 text-text-third"><span data-i18n="company-hours-sun">Вс</span><span data-i18n="company-hours-sun-closed">выходной</span></li>
              </ul>
            </div>
            <a href="https://yandex.ru/maps/?text=%D0%92%D0%BE%D0%BB%D1%85%D0%BE%D0%BD%D1%81%D0%BA%D0%BE%D0%B5+%D1%88%D0%BE%D1%81%D1%81%D0%B5%2C+6"
               target="_blank" rel="noopener noreferrer"
               class="mt-auto inline-flex items-center justify-center gap-2 rounded-full
                      bg-surface-hover border border-button-first
                      px-5 py-3 font-sans text-[14px] lg:text-[15px] text-text-secondary
                      hover:bg-surface transition-colors no-underline">
              <span data-i18n="company-route-btn">Построить маршрут</span>
              <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M6 3l5 5-5 5"/>
              </svg>
            </a>
          </div>

          <div class="rounded-[14px] overflow-hidden card-shadow min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] bg-surface">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=30.153500%2C59.789700&mode=search&sll=30.153500%2C59.789700&sspn=0.01%2C0.005&text=%D0%92%D0%BE%D0%BB%D1%85%D0%BE%D0%BD%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88%D0%BE%D1%81%D1%81%D0%B5%2C%206&z=15"
              title="Карта: Волхонское шоссе, 6"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="size-full block border-0"
              allowfullscreen></iframe>
          </div>
        </div>
      </section>

      <section class="mt-10 lg:mt-14 bg-surface rounded-[14px] card-shadow p-6 sm:p-8 lg:p-10 xl:p-14
                      flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10 transition-colors duration-300">
        <div class="max-w-[560px]">
          <h2 data-i18n="company-cta-title"
              class="font-sans font-normal text-[24px] leading-[1.2] sm:text-[28px] lg:text-[32px] gradient-text">
            Готовы обсудить ваш проект?
          </h2>
          <p data-i18n="company-cta-desc"
             class="mt-3 font-sans text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] text-text-secondary">
            Менеджер подберёт материал под ваш бюджет и сроки. Расскажет о текущих
            ценах, складских остатках и условиях доставки.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full lg:w-auto">
          <a href="#consultation"
             class="inline-flex items-center justify-center rounded-full
                    bg-gradient-to-r from-button-first to-button-second
                    px-6 lg:px-8 py-[15px] font-sans text-[15px] lg:text-[17px] leading-[1.4] text-primary
                    transition-all duration-300 hover:scale-[1.02] cursor-pointer
                    shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)] no-underline text-center">
            <span data-i18n="company-cta-contact">Связаться с нами</span>
          </a>
          <a href="#catalog"
             class="inline-flex items-center justify-center rounded-full
                    bg-surface-hover border border-button-first
                    px-6 lg:px-8 py-[15px] font-sans text-[15px] lg:text-[17px] leading-[1.4] text-text-secondary
                    transition-colors duration-200 hover:bg-surface cursor-pointer no-underline text-center">
            <span data-i18n="company-cta-catalog">В каталог</span>
          </a>
        </div>
      </section>

    </div>
  </section>
`;

const showPage = (show: boolean): void => {
	const page = document.getElementById("company-page");
	if (!page) return;
	page.classList.toggle("hidden", !show);
	if (show) window.scrollTo({ top: 0, behavior: "smooth" });
};


const handleRoute = (): void => {
	showPage(window.location.hash === "#company");
};


export const initAboutCompanyPage = (): void => {
	handleRoute();
	window.addEventListener("hashchange", handleRoute);
};
