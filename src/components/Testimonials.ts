import { Container } from "../shared/Container";

export const Testimonials = (): string => {
  return `
    <section class="section-spacing bg-light overflow-hidden">
      ${Container(`
        
        <div class="flex items-end justify-between">
          
          <h2 class="title-lg">
            Лучше всего о нас
            <br />
            расскажут наши клиенты
          </h2>

        </div>

        <div class="mt-16 grid gap-8 lg:grid-cols-3">

          ${Array.from({ length: 3 })
            .map(
              () => `
                <article class="card p-10">
                  
                  <div class="flex items-center gap-4">
                    <img
                      src="/images/reviews/user.jpg"
                      class="h-14 w-14 rounded-full object-cover"
                    />

                    <div>
                      <div class="font-medium">
                        Иван Петров
                      </div>

                      <div class="text-sm text-zinc-500">
                        Клиент
                      </div>
                    </div>
                  </div>

                  <p class="mt-8 leading-8 text-zinc-600">
                    Отличная компания, быстро доставили материалы.
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
