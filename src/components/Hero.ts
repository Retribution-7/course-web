import { Button } from "../shared/Button";
import { Container } from "../shared/Container";

export const Hero = (): string => {
  return `
    <section class="relative overflow-hidden pt-[180px] pb-[120px]">
      
      <div class="absolute inset-0">
        <img
          src="/images/hero-house.png"
          class="h-full w-full object-cover"
          alt=""
        />
      </div>

      <div class="absolute inset-0 bg-white/50"></div>

      ${Container(`
        <div class="relative z-10 grid items-center gap-20 lg:grid-cols-2">

          <div>

            <h1 class="title-xl max-w-[900px]">
              Продажа кровельных материалов
              <span class="text-primary">
                с доставкой по Санкт-Петербургу
                и области
              </span>
              в день заказа
            </h1>

            <p class="mt-10 max-w-[540px] text-[22px] leading-[170%]">
              За 1 минуту пройдите тест и
              <span class="text-primary font-medium">
                рассчитайте стоимость кровли
              </span>
              под ваш объект
            </p>

            <div class="mt-14">
              ${Button("Рассчитать стоимость")}
            </div>

          </div>

          <div></div>

        </div>
      `)}

    </section>
  `;
};
