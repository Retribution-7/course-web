import { Container } from "../shared/Container";

export const Header = (): string => {
  return `
    <header class="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md">
      ${Container(`
        <div class="flex h-28 items-center justify-between">
          
          <div class="flex items-center gap-14">

            <div class="text-2xl font-bold uppercase tracking-wider">
              SuperMet
            </div>

            <div class="hidden xl:block text-[15px] leading-6 text-zinc-600">
              Санкт-Петербург, Горелово,
              <br />
              Волхонское шоссе, 6
            </div>

          </div>

          <div class="hidden lg:flex items-center gap-8">

            <button class="text-sm uppercase tracking-wide">
              Скачать прайс
            </button>

            <button class="btn-primary px-8! py-4!">
              Каталог
            </button>

          </div>

          <div class="text-right">
            <div class="text-[30px] font-medium">
              +7 (812) 325-50-55
            </div>

            <button class="text-sm underline">
              Перезвоним вам
            </button>
          </div>

        </div>
      `)}
    </header>
  `;
};
