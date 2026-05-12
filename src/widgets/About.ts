interface FeatureCard {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
}

const cards: FeatureCard[] = [
  {
    icon: "/icons/check-square.svg",
    iconAlt: "Галочка",
    title: "Постоянное наличие",
    description:
      "Прямая работа с производителем обеспечивает постоянное наличие всех видов металлопроката",
  },
  {
    icon: "/icons/box.svg",
    iconAlt: "Коробка",
    title: "Собственный автопарк",
    description:
      "Автомобили грузоподъёмностью от 1.5 до 20 тонн. Всегда быстрая доставка.",
  },
  {
    icon: "/icons/car.svg",
    iconAlt: "Автомобиль",
    title: "Объёмы поставок",
    description:
      "Собственная служба доставки гарантирует вам поставку материалов на объект в кратчайшие сроки.",
  },
  {
    icon: "/icons/cart.svg",
    iconAlt: "Корзина",
    title: "Справедливая цена",
    description:
      "Собственные ресурсы и транспорт позволяют снижать стоимость.",
  },
  {
    icon: "/icons/time.svg",
    iconAlt: "Часы",
    title: "Обработка заявки < 30 минут",
    description:
      "Отдел продаж, насчитывающий более 80 сотрудников, не оставит вашу заявку без внимания.",
  },
  {
    icon: "/icons/people.svg",
    iconAlt: "Люди",
    title: "Погрузка без очередей",
    description:
      "Развитая складская логистика позволяет отгружать продукцию всегда без очередей.",
  },
];

const renderCard = (card: FeatureCard): string => `
  <article class="flex flex-col gap-5 lg:gap-[30px] w-full sm:w-[calc(50%-32px)] xl:w-[calc(33.333%-94px)]">
    <div class="size-[60px] rounded-[14px] gradient-icon flex items-center justify-center shrink-0
                border border-[rgba(255,196,0,0.3)]">
      <img src="${card.icon}" alt="${card.iconAlt}" class="size-6 object-contain" aria-hidden="true">
    </div>
    <div class="flex flex-col gap-3 lg:gap-5">
      <h3 class="font-sans font-normal text-[18px] leading-[1.4] lg:text-[22px] lg:leading-[30px] gradient-text">${card.title}</h3>
      <p class="font-sans font-normal text-[16px] leading-[1.4] lg:text-[22px] lg:leading-[30px] text-[#69686F] opacity-80">${card.description}</p>
    </div>
  </article>
`;

export const About = (): string => {
  return `
    <section class="bg-white py-14 lg:py-20" id="about" aria-labelledby="about-heading">
      <div class="container-main flex flex-col gap-14 lg:gap-[110px]">

        <!-- Заголовок + описание -->
        <div class="flex flex-col xl:flex-row items-start xl:items-center gap-8 xl:gap-[268px]">
          <div class="shrink-0">
            <h2 id="about-heading"
                class="font-sans font-normal text-[32px] leading-[1.2] sm:text-[40px] xl:text-[56px] xl:leading-[68px] gradient-text">
              О НАС<br>и НАШЕМ БИЗНЕСЕ
            </h2>
          </div>
          <p class="font-sans font-normal text-[16px] leading-[1.5] lg:text-[18px] xl:text-[22px] xl:leading-[30px] text-primary xl:w-[497px]">
            Каждому клиенту мы гарантируем взаимовыгодные условия сотрудничества.
            Мы дорожим своими заказчиками, поэтому брак и низкокачественный металл
            никогда не поступают на склады предприятия.
            С нами — надёжно, выгодно и безопасно!
          </p>
        </div>

        <!-- Карточки преимуществ -->
        <div class="flex flex-wrap gap-x-16 gap-y-12 xl:gap-x-[140px] xl:gap-y-[90px]">
          ${cards.map(renderCard).join("")}
        </div>

      </div>
    </section>
  `;
};
