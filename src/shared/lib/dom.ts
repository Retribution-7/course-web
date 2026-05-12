export const createElement = (
  tag: string,
  className?: string,
  content?: string,
): HTMLElement => {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (content) {
    element.innerHTML = content;
  }

  return element;
};
