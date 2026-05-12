import { Container } from "../shared/Container";

const items = [
  "Прямые поставки",
  "Работаем с заводами",
  "Широкий каталог",
  "Собственное КП",
  "Быстрая доставка",
  "Точные замеры",
];

export const About = (): string => {
  return `
    <section class="section-spacing bg-light">
      ${Container(`
        
        <div class="max-w-[500px]">
          <h2 class="title-lg">
            О нас
            <br />
            и нашем бизнесе
          </h2>
        </div>

        <div class="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          
          ${items
            .map(
              (item) => `
                <article class="card p-10">
                  <div class="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold">
                    +
                  </div>

                  <h3 class="text-[24px] font-medium">
                    ${item}
                  </h3>

                  <p class="mt-5 text-zinc-500 leading-7">
                    Краткое описание преимущества компании.
                  </p>
                </article>
              `,
            )
            .join("")}

        </div>

      `)}
    </section>
  `;
};
