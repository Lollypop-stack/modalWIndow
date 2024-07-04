function handleClick(event, config) {
  const targetToggle = event.target.closest(`[${config.toggle}]`);
  const targetModalClose = event.target.closest('.modal-close');

  if (targetToggle) {
    event.preventDefault();
    ((element, config) => {
      const toggleSelector = element.getAttribute(config.toggle);
      document.querySelectorAll(`[${config.toggle}]`).forEach(item => {
        if (!item.hasAttribute(config.parallel) && item !== element) {
          document.querySelector(item.getAttribute(config.toggle)).classList.remove(item.getAttribute(config.class));
          const selfClass = element.getAttribute(config.self);
          if (selfClass) element.classList.remove(selfClass);
        }
      });
      document.querySelector(toggleSelector)?.classList.toggle(element.getAttribute(config.class));
      const selfClass = element.getAttribute(config.self);
      if (selfClass) element.classList.toggle(selfClass);
      config.onToggle(element);
    })(targetToggle, config);
  }

  if (targetModalClose) {
    event.preventDefault();
    const modalWin = document.getElementById('modalWin');
    modalWin.classList.remove('active');
    config.onRemove(modalWin);
  }

  if (!targetToggle && !targetModalClose) {
    ((event, config) => {
      const elements = document.querySelectorAll(`[${config.rcoe}]`);
      Array.from(elements).forEach(item => {
        let toggleAttr = item.getAttribute(config.toggle);
        let classAttr = item.getAttribute(config.class);
        if (!event.target.closest(toggleAttr)) {
          document.querySelector(toggleAttr)?.classList.remove(classAttr);
          const selfClass = item.getAttribute(config.self);
          if (selfClass) item.classList.remove(selfClass);
          config.onRcoe(item);
        }
      });
    })(event, config);
  }
}

const config = {
  toggle: 'easy-toggle',
  add: 'easy-add',
  remove: 'easy-remove',
  class: 'active', // исправлено на 'active', чтобы соответствовать классу модального окна
  rcoe: 'easy-rcoe',
  parallel: 'easy-parallel',
  self: 'easy-self',
  selfRcoe: 'easy-self-rcoe',
  onToggle(element) {},
  onAdd(element) {},
  onRemove(element) {},
  onRcoe(element) {}
};

document.addEventListener("click", event => {
  handleClick(event, config);
});
