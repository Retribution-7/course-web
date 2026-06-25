const LINK_CLASS =
  "flex items-center justify-center w-[50px] h-[41px] rounded-[8px] shrink-0 transition-opacity hover:opacity-80";

export const MessengerLinks = (compact = false): string => {
  const cls = compact
    ? "flex items-center justify-center w-[50px] h-[41px] rounded-[8px]"
    : LINK_CLASS;
  return `
    <a href="https://wa.me/78123255055" target="_blank" rel="noopener noreferrer"
       class="${cls}"
       style="background: linear-gradient(145deg, rgba(0,215,41,0.3) 0%, rgb(0,215,41) 100%)"
       aria-label="WhatsApp">
      <img src="/icons/whats-app-logo.svg" alt="WhatsApp" class="size-[19px]">
    </a>
    <a href="https://t.me/metallobaza" target="_blank" rel="noopener noreferrer"
       class="${cls}"
       style="background: linear-gradient(145deg, rgba(40,169,234,0.3) 0%, rgb(40,169,234) 100%)"
       aria-label="Telegram">
      <img src="/icons/telegram-logo.svg" alt="Telegram" class="size-[19px]">
    </a>
    <a href="https://vk.com/metallobaza" target="_blank" rel="noopener noreferrer"
       class="${cls} bg-[#0077FF]"
       aria-label="ВКонтакте">
      <img src="/icons/vk-logo.svg" alt="ВКонтакте" class="size-[19px]">
    </a>
  `;
};
