import { Container } from "../shared/Container";

export const Footer = (): string => {
  return `
    <footer class="border-t border-zinc-100 py-20">
      ${Container(`
        
        <div class="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          
          <div>
            <div class="text-3xl font-bold uppercase">
              SuperMet
            </div>

            <div class="mt-4 text-zinc-500">
              Copyright © 2010 - 2024
            </div>
          </div>

          <div class="text-zinc-500">
            Политика конфиденциальности
          </div>

          <div class="text-right">
            <div class="text-3xl font-medium">
              +7 (812) 325-50-55
            </div>

            <div class="mt-3 text-zinc-500">
              info@supermet.ru
            </div>
          </div>

        </div>

      `)}
    </footer>
  `;
};
