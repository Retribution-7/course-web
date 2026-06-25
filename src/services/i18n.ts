export type Lang = "ru" | "en";

const i18Obj: Record<Lang, Record<string, string>> = {
	ru: {
		// Header
		"header-pdf-download": "Скачать прайс-лист",
		"header-catalog-btn": "Посмотреть каталог товаров",
		"header-ask-online": "Задайте вопрос online",
		"header-callback": "Перезвоним Вам",
		"header-admin": "Панель администратора",
		"header-account": "Личный кабинет",
		"header-favorites": "Избранное",
		"header-cart": "Корзина",
		// Hero
		"hero-title":
			'ПРОДАЖА кровельных материалов<br><span class="gradient-text">с доставкой<br>по Санкт-Петербургу<br>и области</span><br>в день заказа',
		"hero-desc":
			'За 1 минуту пройдите тест и <strong class="gradient-text font-normal">рассчитайте стоимость кровли</strong> под ваш объект с точностью 97% и получите подарки',
		"hero-btn": "РАССЧИТАТЬ СТОИМОСТЬ МАТЕРИАЛОВ",
		"hero-calc": "Произвести расчет",
		"hero-price-list": "Скачать прайс-лист",
		"hero-call-back": "Перезвоните<br>мне",
		// About
		"about-heading": "О НАС<br>и НАШЕМ БИЗНЕСЕ",
		"about-desc":
			"Каждому клиенту мы гарантируем взаимовыгодные условия сотрудничества. Мы дорожим своими заказчиками, поэтому брак и низкокачественный металл никогда не поступают на склады предприятия. С нами — надёжно, выгодно и безопасно!",
		"about-card-0-title": "Постоянное наличие",
		"about-card-0-desc":
			"Прямая работа с производителем обеспечивает постоянное наличие всех видов металлопроката",
		"about-card-1-title": "Собственный автопарк",
		"about-card-1-desc":
			"Автомобили грузоподъёмностью от 1.5 до 20 тонн. Всегда быстрая доставка.",
		"about-card-2-title": "Объёмы поставок",
		"about-card-2-desc":
			"Собственная служба доставки гарантирует вам поставку материалов на объект в кратчайшие сроки.",
		"about-card-3-title": "Справедливая цена",
		"about-card-3-desc":
			"Собственные ресурсы и транспорт позволяют снижать стоимость.",
		"about-card-4-title": "Обработка заявки < 30 минут",
		"about-card-4-desc":
			"Отдел продаж, насчитывающий более 80 сотрудников, не оставит вашу заявку без внимания.",
		"about-card-5-title": "Погрузка без очередей",
		"about-card-5-desc":
			"Развитая складская логистика позволяет отгружать продукцию всегда без очередей.",
		// Catalog
		"catalog-heading": "КАТАЛОГ ТОВАРОВ",
		"catalog-search-placeholder": "Поиск по названию...",
		"catalog-tab-all": "Все материалы",
		"catalog-tab-metal-tile": "Металлочерепица",
		"catalog-tab-corrugated": "Профнастил",
		"catalog-tab-seam": "Фальцевая кровля",
		"catalog-sort-default": "По умолчанию",
		"catalog-sort-price-asc": "Цена: по возрастанию",
		"catalog-sort-price-desc": "Цена: по убыванию",
		"catalog-sort-name-asc": "Название: А → Я",
		"catalog-sort-name-desc": "Название: Я → А",
		"catalog-loading": "Загрузка...",
		"catalog-not-found": "Ничего не найдено — попробуйте изменить фильтры",
		"catalog-error":
			"Не удалось загрузить каталог. Убедитесь, что JSON Server запущен (npm run server).",
		// Contact form
		"contact-heading": "ЕСТЬ ВОПРОСЫ?",
		"contact-desc":
			"Если у Вас есть вопросы или требуется помощь в подборе кровельных материалов, то оставьте свои данные, мы свяжемся с Вами и проконсультируем.",
		"contact-btn": "Получить консультацию",
		"contact-messenger": "или напишите нам в мессенджер",
		"contact-thanks": "Спасибо! Мы свяжемся с вами в ближайшее время.",
		// Testimonials
		"testimonials-heading":
			'<span class="gradient-text">ЛУЧШЕ ВСЕГО О НАС</span><br>РАССКАЖУТ НАШИ КЛИЕНТЫ',
		"testimonials-all": "Все отзывы",
		"testimonials-loading": "Загрузка отзывов...",
		"testimonials-error": "Не удалось загрузить отзывы",
		// Auth page
		"auth-heading": "Личный кабинет",
		"auth-tab-login": "Вход",
		"auth-tab-register": "Регистрация",
		"auth-phone": "Телефон",
		"auth-phone-hint": "Только номера РБ (25, 29, 33, 44)",
		"auth-password": "Пароль",
		"auth-login-btn": "Войти",
		"auth-required-fields": "Поля, помеченные *, обязательны",
		"auth-email": "E-mail",
		"auth-birth": "Дата рождения",
		"auth-birth-hint": "Регистрация доступна с 16 лет",
		"auth-lastname": "Фамилия",
		"auth-firstname": "Имя",
		"auth-middlename": "Отчество",
		"auth-pwd-label": "Пароль",
		"auth-pwd-manual": "Задать самостоятельно",
		"auth-pwd-auto": "Сгенерировать",
		"auth-pwd-hint": "Заглавная и строчная буквы, цифра и спецсимвол",
		"auth-pwd-refresh": "Обновить",
		"auth-pwd-confirm-placeholder": "Повторите пароль",
		"auth-nickname": "Никнейм",
		"auth-nickname-another": "Другой",
		"auth-nickname-hint":
			"Сгенерирован автоматически. Не нравится — нажмите «Другой».",
		"auth-nickname-input-placeholder": "Введите свой никнейм",
		"auth-nickname-limit":
			"Лимит автогенераций исчерпан — введите никнейм вручную.",
		"auth-agree-text": "Я прочитал(а) и согласен(а) с",
		"auth-agreement-link": "Соглашением пользователя",
		"auth-register-btn": "Зарегистрироваться",
		"auth-paste-error": "Вставка запрещена — введите пароль вручную",
		"auth-success-register": "Регистрация прошла успешно. Добро пожаловать!",
		"auth-success-login": "Вход выполнен.",
		"auth-error-wrong-pwd": "Неверный телефон или пароль.",
		"auth-error-not-found": "Пользователь не найден или неверный пароль.",
		"auth-error-server": "Ошибка соединения с сервером. Попробуйте позже.",
		"auth-agreement-text":
			"Соглашение пользователя\n\nРегистрируясь, вы соглашаетесь на обработку персональных данных в соответствии с политикой компании.",
		// Cart page
		"cart-heading": "КОРЗИНА",
		"cart-back": "← Продолжить покупки",
		"cart-empty-title": "Корзина пуста",
		"cart-empty-desc":
			"Добавьте материалы из каталога — рассчитайте стоимость и нажмите «В корзину».",
		"cart-to-catalog": "В каталог",
		"cart-total-label": "Итого к оплате",
		"cart-color": "Цвет:",
		"cart-thickness": "Толщина:",
		"cart-surface": "Поверхность:",
		"cart-area": "Площадь:",
		"cart-installation-included": "включён",
		"cart-delivery-included": "включена",
		"cart-installation-label": "Монтаж:",
		"cart-delivery-label": "Доставка:",
		"cart-clear": "Очистить корзину",
		"cart-checkout": "Оформить заказ",
		"cart-clear-confirm": "Очистить корзину?",
		"cart-checkout-thanks":
			"Спасибо! Мы свяжемся с вами для подтверждения заказа.",
		// Account page
		"account-home": "На главную",
		"account-heading": "ЛИЧНЫЙ КАБИНЕТ",
		"account-member-since": "В клиентах с",
		"account-personal-data": "Личные данные",
		"account-phone": "Телефон",
		"account-email": "E-mail",
		"account-birthdate": "Дата рождения",
		"account-nickname": "Никнейм",
		"account-favorites-stat": "Товаров в избранном",
		"account-cart-stat": "Позиций в корзине",
		"account-logout-title": "Завершить сеанс?",
		"account-logout-desc":
			"После выхода защищённые разделы (корзина, избранное, отзывы, страницы товаров) снова станут недоступны. Личные данные останутся сохранены.",
		"account-logout-btn": "Выйти",
		"account-login-first": "Сначала войдите",
		"account-login-link": "Войти",
		"account-logout-confirm": "Выйти из личного кабинета?",
		// Favorites page
		"favorites-to-catalog": "В каталог",
		"favorites-heading": "ИЗБРАННОЕ",
		"favorites-clear-btn": "Очистить",
		"favorites-empty-title": "В избранном пусто",
		"favorites-empty-desc":
			"Нажмите на сердечко в карточке товара — он появится здесь.",
		"favorites-nothing": "Пока ничего не добавлено",
		"favorites-loading": "Загрузка...",
		"favorites-error": "Не удалось загрузить товары",
		"favorites-clear-confirm": "Очистить список избранного?",
		// Reviews page
		"reviews-back": "Назад",
		"reviews-heading": "ВСЕ ОТЗЫВЫ",
		"reviews-avg-label": "средняя оценка",
		"reviews-search-placeholder": "Поиск по имени или тексту",
		"reviews-rating-all": "Все рейтинги",
		"reviews-rating-5": "Только 5 звёзд",
		"reviews-rating-4plus": "4 и выше",
		"reviews-rating-3plus": "3 и выше",
		"reviews-sort-newest": "Сначала новые",
		"reviews-sort-oldest": "Сначала старые",
		"reviews-sort-rating": "По рейтингу",
		"reviews-empty-title": "Ничего не найдено",
		"reviews-empty-desc":
			"Попробуйте изменить параметры фильтрации или поиска.",
		"reviews-reset": "Сбросить фильтры",
		"reviews-loading": "Загрузка отзывов...",
		"reviews-error":
			"Не удалось загрузить отзывы. Проверьте, что JSON Server запущен.",
		"reviews-form-title": "Оставить отзыв",
		"reviews-form-text-label": "Текст отзыва",
		"reviews-form-text-placeholder": "Расскажите о вашем опыте...",
		"reviews-form-rating-label": "Оценка",
		"reviews-form-product-label": "Продукт (необязательно)",
		"reviews-form-product-placeholder": "Например: Профнастил",
		"reviews-form-submit": "Отправить",
		"reviews-form-success": "Отзыв успешно отправлен!",
		"reviews-form-error": "Не удалось отправить отзыв. Попробуйте позже.",
		"reviews-form-error-empty": "Введите текст отзыва",
		// Footer
		"footer-pdf-download": "Скачать прайс-лист",
		"footer-catalog-btn": "Посмотреть каталог товаров",
		"footer-ask-online": "Задайте вопрос online",
		"footer-callback": "Перезвоним Вам",
		"footer-company": "О компании",
		"footer-reviews": "Отзывы",
		"footer-privacy": "Политика конфиденциальности",
		"footer-reset": "Сбросить настройки",
		"footer-reset-confirm":
			"Сбросить все настройки и выйти?\nБудут удалены: корзина, избранное, аккаунт.",
		// About company page
		"company-home": "На главную",
		"company-label": "О компании",
		"company-heading": "МЕТАЛЛОБАЗА ВОЛХОНКА",
		"company-desc":
			"С 2010 года поставляем кровельные и фасадные материалы для частных домов, коммерческих объектов и промышленных предприятий по всей Северо-Западу. Работаем напрямую с заводами-изготовителями — это значит честные цены, контроль качества и поставки в срок.",
		"company-stat-0-label": "лет на рынке",
		"company-stat-1-label": "постоянных клиентов",
		"company-stat-2-label": "складских площадей",
		"company-stat-3-label": "сотрудников",
		"company-mission-label": "Наша миссия",
		"company-mission-title": "Сделать качественный металл доступным",
		"company-mission-desc":
			"Мы верим, что надёжная кровля и фасад не должны стоить как премиальная иномарка. Поэтому мы убираем посредников, держим собственный склад и автопарк, автоматизируем расчёты — и передаём экономию клиенту. Чтобы у каждого был выбор: купить дешевле без потери качества или получить премиальный материал по справедливой цене.",
		"company-values-heading": "Наши принципы",
		"company-value-0-title": "Качество без компромиссов",
		"company-value-0-desc":
			"Принимаем металл только у производителей с сертификацией. Каждая партия проходит входной контроль на складе.",
		"company-value-1-title": "Прозрачные цены",
		"company-value-1-desc":
			"Цены в каталоге — финальные. Никаких «уточним при заказе»: вы видите стоимость до копейки ещё на этапе расчёта.",
		"company-value-2-title": "Внимание к клиенту",
		"company-value-2-desc":
			"Менеджер ведёт заказ от заявки до подписания акта приёмки. Любые вопросы — по одному номеру, без переключений.",
		"company-value-3-title": "Скорость поставки",
		"company-value-3-desc":
			"Большая часть заказов отгружается в день обращения. Срочные — в течение 2 часов с момента оплаты.",
		"company-timeline-heading": "История компании",
		"company-milestone-0-title": "Основание компании",
		"company-milestone-0-desc":
			"Открыли первый склад в Горелово площадью 1 500 м². Начали с поставок профнастила и арматуры.",
		"company-milestone-1-title": "Расширение ассортимента",
		"company-milestone-1-desc":
			"Добавили в каталог металлочерепицу, фальцевую кровлю и доборные элементы. Склад вырос до 8 000 м².",
		"company-milestone-2-title": "Собственный автопарк",
		"company-milestone-2-desc":
			"Запустили службу доставки: 50 машин грузоподъёмностью от 1,5 до 20 тонн. Сроки доставки сократились до 1–2 дней.",
		"company-milestone-3-title": "Прямые контракты с заводами",
		"company-milestone-3-desc":
			"Перешли на работу напрямую с производителями, снизив цены для клиентов на 8–15%.",
		"company-milestone-4-title": "Цифровая платформа",
		"company-milestone-4-desc":
			"Запустили онлайн-каталог с калькулятором стоимости и автоматизацию обработки заявок — менее 30 минут от заявки до счёта.",
		"company-location-heading": "Где нас найти",
		"company-address-label": "Адрес склада",
		"company-phone-label": "Телефон",
		"company-hours-label": "Часы работы",
		"company-hours-weekdays": "Пн – Пт",
		"company-hours-sat": "Сб",
		"company-hours-sun": "Вс",
		"company-hours-sun-closed": "выходной",
		"company-route-btn": "Построить маршрут",
		"company-cta-title": "Готовы обсудить ваш проект?",
		"company-cta-desc":
			"Менеджер подберёт материал под ваш бюджет и сроки. Расскажет о текущих ценах, складских остатках и условиях доставки.",
		"company-cta-contact": "Связаться с нами",
		"company-cta-catalog": "В каталог",
		// Category labels (shared)
		"cat-label-metal-tile": "Металлочерепица",
		"cat-label-corrugated": "Профнастил",
		"cat-label-seam": "Фальцевая кровля",
		// Product detail page
		"product-to-catalog": "В каталог",
		"product-price-from": "от",
		"product-brand": "Бренд:",
		"product-category": "Категория",
		"product-description": "Описание",
		"product-advantages": "Преимущества",
		"product-related": "Похожие материалы",
		"product-calculate": "Рассчитать стоимость",
		"product-call-order": "Заказать звонок",
		"product-loading": "Загрузка товара...",
		"product-not-found": "Товар не найден",
		"product-not-found-link": "Вернуться в каталог",
		"product-error": "Ошибка загрузки",
		"product-error-desc": "Проверьте, что JSON Server запущен.",
		"cat-desc-metal-tile":
			"Современное кровельное покрытие, имитирующее керамическую черепицу. Сочетает эстетику классической кровли с прочностью стали: малый вес, простой монтаж и срок службы до 50 лет. Подходит для скатных крыш частных домов и коммерческих объектов.",
		"cat-desc-corrugated":
			"Универсальный профилированный лист для кровли, заборов и облицовки фасадов. Высокая жёсткость профиля при малом весе, устойчивость к атмосферным нагрузкам, широкая палитра защитно-декоративных покрытий.",
		"cat-desc-seam":
			"Премиальная фальцевая кровля со скрытым замковым соединением. Полностью герметичная поверхность без пробитий, эстетичный современный вид, срок службы до 70 лет. Применима на крышах любой геометрии — от плоских до сложных.",
		"cat-adv-metal-tile-0": "Гарантия от производителя до 50 лет",
		"cat-adv-metal-tile-1": "Лёгкий вес — без усиления стропил",
		"cat-adv-metal-tile-2": "Готов к монтажу за 1–2 дня",
		"cat-adv-metal-tile-3": "Десятки цветов по каталогу RAL",
		"cat-adv-corrugated-0": "Универсальность: кровля, забор, фасад",
		"cat-adv-corrugated-1": "Минимальные отходы при раскрое",
		"cat-adv-corrugated-2": "Огнестойкость и устойчивость к УФ",
		"cat-adv-corrugated-3": "Доступная цена и быстрая поставка",
		"cat-adv-seam-0": "Скрытый замок — без саморезов в поле кровли",
		"cat-adv-seam-1": "Подходит для уклонов от 3°",
		"cat-adv-seam-2": "Без протечек даже при малых уклонах",
		"cat-adv-seam-3": "Современный архитектурный вид",
		// Calculator
		"calc-title": "Расчёт стоимости",
		"calc-area-label": "Площадь крыши, м²",
		"calc-color-label": "Цвет",
		"calc-thickness-label": "Толщина",
		"calc-surface-label": "Поверхность",
		"calc-installation-label": "Включить монтаж (450 ₽/м²)",
		"calc-delivery-label": "Доставка (3 500 ₽)",
		"calc-base-price": "Базовая цена",
		"calc-mult-thickness": "Коэф. толщины",
		"calc-mult-surface": "Коэф. поверхности",
		"calc-material-label": "Материал",
		"calc-installation-row": "Монтаж",
		"calc-delivery-row": "Доставка",
		"calc-total-label": "Итого",
		"calc-add-to-cart": "В корзину",
		"calc-close-btn": "Закрыть калькулятор",
		"calc-area-decrease": "Уменьшить площадь",
		"calc-area-increase": "Увеличить площадь",
		"calc-toast-cart-added": "добавлен в корзину",
		// Admin page
		"admin-home": "На главную",
		"admin-heading": "ПАНЕЛЬ АДМИНИСТРАТОРА",
		"admin-tab-users": "Пользователи",
		"admin-tab-products": "Товары",
		"admin-tab-reviews": "Отзывы",
		"admin-stat-users": "Пользователей",
		"admin-stat-products": "Товаров в каталоге",
		"admin-stat-reviews": "Отзывов",
		"admin-stat-revenue": "Выручка (корзины)",
		"admin-col-id": "ID",
		"admin-col-user": "Пользователь",
		"admin-col-phone": "Телефон",
		"admin-col-email": "E-mail",
		"admin-col-role": "Роль",
		"admin-col-reg-date": "Дата регистрации",
		"admin-col-actions": "Действия",
		"admin-col-photo": "Фото",
		"admin-col-name": "Название",
		"admin-col-category": "Категория",
		"admin-col-price": "Цена",
		"admin-col-brand": "Бренд",
		"admin-col-color": "Цвет",
		"admin-col-thickness": "Толщина",
		"admin-col-surface": "Покрытие",
		"admin-col-author": "Автор",
		"admin-col-date": "Дата",
		"admin-col-rating": "Оценка",
		"admin-col-product": "Товар",
		"admin-col-text": "Текст",
		"admin-you": "Вы",
		"admin-make-customer": "Сделать покупателем",
		"admin-make-admin": "Сделать админом",
		"admin-save": "Сохранить",
		"admin-cancel": "Отменить",
		"admin-delete": "Удалить",
		"admin-add-product": "Добавить товар",
		"admin-new-product": "Новый товар",
		"admin-no-users": "Нет пользователей",
		"admin-no-products": "Нет товаров",
		"admin-no-reviews": "Нет отзывов",
		"admin-error-role": "Ошибка изменения роли",
		"admin-error-product": "Ошибка при добавлении товара",
		"admin-error-delete-product": "Ошибка при удалении товара",
		"admin-error-delete-review": "Ошибка при удалении отзыва",
		"admin-confirm-delete-product": "Удалить этот товар из каталога?",
		"admin-confirm-delete-review": "Удалить этот отзыв?",
		"admin-all-users": "Все пользователи",
		"admin-all-products": "Все товары",
		"admin-all-reviews": "Все отзывы",
		"admin-form-error":
			"Заполните обязательные поля: Название, Цена и URL изображения",
		"admin-role-customer": "Покупатель",
		"admin-role-admin": "Администратор",
		"admin-role-manager": "Менеджер",
		"admin-form-title": "Название",
		"admin-form-brand": "Бренд",
		"admin-form-category": "Категория",
		"admin-form-price": "Цена, ₽/м²",
		"admin-form-color": "Цвет (RAL)",
		"admin-form-thickness": "Толщина, мм",
		"admin-form-surface": "Покрытие",
		"admin-form-image": "URL изображения",
		"admin-form-spec1-label": "Характеристика 1 — название",
		"admin-form-spec1-value": "Характеристика 1 — значение",
		"admin-form-spec2-label": "Характеристика 2 — название",
		"admin-form-spec2-value": "Характеристика 2 — значение",
		"admin-error-load-users": "Ошибка загрузки пользователей",
		"admin-error-load-products": "Ошибка загрузки товаров",
		"admin-error-load-reviews": "Ошибка загрузки отзывов",
		// Product card
		"card-brand": "Бренд",
		"card-more": "Подробнее о товаре",
		"card-product-name": "Товар",
		"card-add-favorite": "Добавить в избранное",
		"card-remove-favorite": "Убрать из избранного",
		"card-toast-added": "добавлен в избранное",
		"card-toast-removed": "убран из избранного",
		// Surface options
		"surface-polyester": "Полиэстер",
		"surface-matte": "Матовая",
		"surface-glossy": "Глянцевая",
		"surface-structured": "Структурная",
		// Spec labels
		"spec-wave-height": "Высота волны, мм",
		"spec-step-height": "Высота ступеньки, мм",
		"spec-max-length": "Максимальная длина, м",
		"spec-min-length": "Минимальная длина, м",
		"spec-total-width": "Ширина общая, мм",
		"spec-useful-width": "Ширина полезная, мм",
		// Auth placeholders
		"auth-pwd-placeholder": "8–20 символов",
	},
	en: {
		// Header
		"header-pdf-download": "Download price list",
		"header-catalog-btn": "Browse product catalog",
		"header-ask-online": "Ask a question online",
		"header-callback": "We'll call you back",
		"header-admin": "Admin panel",
		"header-account": "My account",
		"header-favorites": "Favorites",
		"header-cart": "Cart",
		// Hero
		"hero-title":
			'SALES of roofing materials<br><span class="gradient-text">with delivery<br>to Saint Petersburg<br>and region</span><br>on the day of order',
		"hero-desc":
			'In 1 minute, take the test and <strong class="gradient-text font-normal">calculate the roofing cost</strong> for your project with 97% accuracy and receive gifts',
		"hero-btn": "CALCULATE MATERIAL COST",
		"hero-calc": "Calculate",
		"hero-price-list": "Download price list",
		"hero-call-back": "Call me<br>back",
		// About
		"about-heading": "ABOUT US<br>and OUR BUSINESS",
		"about-desc":
			"We guarantee every client mutually beneficial terms of cooperation. We value our customers, so defective and low-quality metal never enters our warehouse. With us — reliable, profitable and safe!",
		"about-card-0-title": "Constant availability",
		"about-card-0-desc":
			"Direct work with the manufacturer ensures constant availability of all types of metal products",
		"about-card-1-title": "Own vehicle fleet",
		"about-card-1-desc":
			"Vehicles with load capacity from 1.5 to 20 tons. Always fast delivery.",
		"about-card-2-title": "Supply volumes",
		"about-card-2-desc":
			"Our own delivery service guarantees delivery of materials to your site in the shortest possible time.",
		"about-card-3-title": "Fair price",
		"about-card-3-desc":
			"Own resources and transport allow us to reduce costs.",
		"about-card-4-title": "Request processing < 30 min",
		"about-card-4-desc":
			"Our sales department of over 80 employees will never leave your request unattended.",
		"about-card-5-title": "Loading without queues",
		"about-card-5-desc":
			"Advanced warehouse logistics allows shipping products always without queues.",
		// Catalog
		"catalog-heading": "PRODUCT CATALOG",
		"catalog-search-placeholder": "Search by name...",
		"catalog-tab-all": "All materials",
		"catalog-tab-metal-tile": "Metal tile",
		"catalog-tab-corrugated": "Corrugated sheet",
		"catalog-tab-seam": "Seam roofing",
		"catalog-sort-default": "Default",
		"catalog-sort-price-asc": "Price: low to high",
		"catalog-sort-price-desc": "Price: high to low",
		"catalog-sort-name-asc": "Name: A → Z",
		"catalog-sort-name-desc": "Name: Z → A",
		"catalog-loading": "Loading...",
		"catalog-not-found": "Nothing found — try changing the filters",
		"catalog-error":
			"Failed to load catalog. Make sure JSON Server is running (npm run server).",
		// Contact form
		"contact-heading": "HAVE QUESTIONS?",
		"contact-desc":
			"If you have questions or need help selecting roofing materials, leave your details and we will contact you for a consultation.",
		"contact-btn": "Get a consultation",
		"contact-messenger": "or message us",
		"contact-thanks": "Thank you! We will contact you shortly.",
		// Testimonials
		"testimonials-heading":
			'<span class="gradient-text">THE BEST PROOF</span><br>ARE OUR CUSTOMERS',
		"testimonials-all": "All reviews",
		"testimonials-loading": "Loading reviews...",
		"testimonials-error": "Failed to load reviews",
		// Auth page
		"auth-heading": "My Account",
		"auth-tab-login": "Sign In",
		"auth-tab-register": "Register",
		"auth-phone": "Phone",
		"auth-phone-hint": "Only BY numbers (25, 29, 33, 44)",
		"auth-password": "Password",
		"auth-login-btn": "Sign In",
		"auth-required-fields": "Fields marked with * are required",
		"auth-email": "E-mail",
		"auth-birth": "Date of birth",
		"auth-birth-hint": "Registration available from age 16",
		"auth-lastname": "Last name",
		"auth-firstname": "First name",
		"auth-middlename": "Middle name",
		"auth-pwd-label": "Password",
		"auth-pwd-manual": "Set manually",
		"auth-pwd-auto": "Generate",
		"auth-pwd-hint": "Upper and lowercase letters, digit and special character",
		"auth-pwd-refresh": "Refresh",
		"auth-pwd-confirm-placeholder": "Repeat password",
		"auth-nickname": "Nickname",
		"auth-nickname-another": "Another",
		"auth-nickname-hint":
			"Generated automatically. Don't like it — click «Another».",
		"auth-nickname-input-placeholder": "Enter your nickname",
		"auth-nickname-limit":
			"Generation limit reached — enter a nickname manually.",
		"auth-agree-text": "I have read and agree to the",
		"auth-agreement-link": "User Agreement",
		"auth-register-btn": "Register",
		"auth-paste-error": "Paste is disabled — type the password manually",
		"auth-success-register": "Registration successful. Welcome!",
		"auth-success-login": "Signed in successfully.",
		"auth-error-wrong-pwd": "Incorrect phone number or password.",
		"auth-error-not-found": "User not found or incorrect password.",
		"auth-error-server": "Server connection error. Please try again later.",
		"auth-agreement-text":
			"User Agreement\n\nBy registering, you agree to the processing of personal data in accordance with the company's privacy policy.",
		// Cart page
		"cart-heading": "CART",
		"cart-back": "← Continue shopping",
		"cart-empty-title": "Cart is empty",
		"cart-empty-desc":
			"Add materials from the catalog — calculate the cost and click «Add to cart».",
		"cart-to-catalog": "Go to catalog",
		"cart-total-label": "Total to pay",
		"cart-color": "Color:",
		"cart-thickness": "Thickness:",
		"cart-surface": "Surface:",
		"cart-area": "Area:",
		"cart-installation-included": "included",
		"cart-delivery-included": "included",
		"cart-installation-label": "Installation:",
		"cart-delivery-label": "Delivery:",
		"cart-clear": "Clear cart",
		"cart-checkout": "Place order",
		"cart-clear-confirm": "Clear cart?",
		"cart-checkout-thanks":
			"Thank you! We will contact you to confirm the order.",
		// Account page
		"account-home": "Home",
		"account-heading": "MY ACCOUNT",
		"account-member-since": "Member since",
		"account-personal-data": "Personal data",
		"account-phone": "Phone",
		"account-email": "E-mail",
		"account-birthdate": "Date of birth",
		"account-nickname": "Nickname",
		"account-favorites-stat": "Items in favorites",
		"account-cart-stat": "Items in cart",
		"account-logout-title": "End session?",
		"account-logout-desc":
			"After signing out, protected sections (cart, favorites, reviews, product pages) will become inaccessible again. Your personal data will remain saved.",
		"account-logout-btn": "Sign out",
		"account-login-first": "Please sign in first",
		"account-login-link": "Sign In",
		"account-logout-confirm": "Sign out of your account?",
		// Favorites page
		"favorites-to-catalog": "Go to catalog",
		"favorites-heading": "FAVORITES",
		"favorites-clear-btn": "Clear",
		"favorites-empty-title": "Favorites is empty",
		"favorites-empty-desc":
			"Click the heart on a product card — it will appear here.",
		"favorites-nothing": "Nothing added yet",
		"favorites-loading": "Loading...",
		"favorites-error": "Failed to load products",
		"favorites-clear-confirm": "Clear favorites list?",
		// Reviews page
		"reviews-back": "Back",
		"reviews-heading": "ALL REVIEWS",
		"reviews-avg-label": "average rating",
		"reviews-search-placeholder": "Search by name or text",
		"reviews-rating-all": "All ratings",
		"reviews-rating-5": "5 stars only",
		"reviews-rating-4plus": "4 and above",
		"reviews-rating-3plus": "3 and above",
		"reviews-sort-newest": "Newest first",
		"reviews-sort-oldest": "Oldest first",
		"reviews-sort-rating": "By rating",
		"reviews-empty-title": "Nothing found",
		"reviews-empty-desc": "Try changing the filter or search parameters.",
		"reviews-reset": "Reset filters",
		"reviews-loading": "Loading reviews...",
		"reviews-error":
			"Failed to load reviews. Make sure JSON Server is running.",
		"reviews-form-title": "Leave a review",
		"reviews-form-text-label": "Review text",
		"reviews-form-text-placeholder": "Tell us about your experience...",
		"reviews-form-rating-label": "Rating",
		"reviews-form-product-label": "Product (optional)",
		"reviews-form-product-placeholder": "e.g. Corrugated board",
		"reviews-form-submit": "Submit",
		"reviews-form-success": "Review submitted successfully!",
		"reviews-form-error": "Failed to submit review. Please try again later.",
		"reviews-form-error-empty": "Please enter review text",
		// Footer
		"footer-pdf-download": "Download price list",
		"footer-catalog-btn": "Browse product catalog",
		"footer-ask-online": "Ask a question online",
		"footer-callback": "Call us back",
		"footer-company": "About company",
		"footer-reviews": "Reviews",
		"footer-privacy": "Privacy policy",
		"footer-reset": "Reset settings",
		"footer-reset-confirm":
			"Reset all settings and sign out?\nThis will delete: cart, favorites, account.",
		// About company page
		"company-home": "Home",
		"company-label": "About company",
		"company-heading": "METALLOBASE VOLKHONKA",
		"company-desc":
			"Since 2010 we have been supplying roofing and facade materials for private homes, commercial facilities and industrial enterprises throughout the Northwest. We work directly with manufacturers — meaning fair prices, quality control and on-time deliveries.",
		"company-stat-0-label": "years on market",
		"company-stat-1-label": "regular clients",
		"company-stat-2-label": "warehouse space",
		"company-stat-3-label": "employees",
		"company-mission-label": "Our mission",
		"company-mission-title": "Make quality metal accessible",
		"company-mission-desc":
			"We believe that reliable roofing and facades should not cost as much as a premium car. That's why we cut out middlemen, maintain our own warehouse and fleet, automate calculations — and pass the savings to the client. So everyone has a choice: buy cheaper without losing quality or get premium material at a fair price.",
		"company-values-heading": "Our principles",
		"company-value-0-title": "Uncompromising quality",
		"company-value-0-desc":
			"We only accept metal from certified manufacturers. Each batch undergoes incoming inspection at the warehouse.",
		"company-value-1-title": "Transparent pricing",
		"company-value-1-desc":
			"Prices in the catalog are final. No 'we'll clarify at order': you see the exact cost at the calculation stage.",
		"company-value-2-title": "Customer focus",
		"company-value-2-desc":
			"A manager handles the order from request to acceptance certificate signing. Any question — one number, no transfers.",
		"company-value-3-title": "Fast delivery",
		"company-value-3-desc":
			"Most orders ship on the day of request. Urgent ones — within 2 hours of payment.",
		"company-timeline-heading": "Company history",
		"company-milestone-0-title": "Company founded",
		"company-milestone-0-desc":
			"We opened our first warehouse in Gorelovo, 1,500 m². Started with corrugated sheet and rebar supplies.",
		"company-milestone-1-title": "Assortment expansion",
		"company-milestone-1-desc":
			"Added metal tiles, seam roofing and accessories to the catalog. Warehouse grew to 8,000 m².",
		"company-milestone-2-title": "Own vehicle fleet",
		"company-milestone-2-desc":
			"Launched delivery service: 50 vehicles with capacity from 1.5 to 20 tons. Delivery times reduced to 1–2 days.",
		"company-milestone-3-title": "Direct contracts with factories",
		"company-milestone-3-desc":
			"Switched to working directly with manufacturers, reducing prices for clients by 8–15%.",
		"company-milestone-4-title": "Digital platform",
		"company-milestone-4-desc":
			"Launched an online catalog with a cost calculator and automated request processing — less than 30 minutes from request to invoice.",
		"company-location-heading": "Where to find us",
		"company-address-label": "Warehouse address",
		"company-phone-label": "Phone",
		"company-hours-label": "Working hours",
		"company-hours-weekdays": "Mon – Fri",
		"company-hours-sat": "Sat",
		"company-hours-sun": "Sun",
		"company-hours-sun-closed": "closed",
		"company-route-btn": "Get directions",
		"company-cta-title": "Ready to discuss your project?",
		"company-cta-desc":
			"A manager will select materials for your budget and timeline. They'll tell you about current prices, stock levels and delivery terms.",
		"company-cta-contact": "Contact us",
		"company-cta-catalog": "Go to catalog",
		// Category labels
		"cat-label-metal-tile": "Metal tile",
		"cat-label-corrugated": "Corrugated sheet",
		"cat-label-seam": "Seam roofing",
		// Product detail page
		"product-to-catalog": "Go to catalog",
		"product-price-from": "from",
		"product-brand": "Brand:",
		"product-category": "Category",
		"product-description": "Description",
		"product-advantages": "Advantages",
		"product-related": "Similar materials",
		"product-calculate": "Calculate cost",
		"product-call-order": "Request a call",
		"product-loading": "Loading product...",
		"product-not-found": "Product not found",
		"product-not-found-link": "Back to catalog",
		"product-error": "Loading error",
		"product-error-desc": "Make sure JSON Server is running.",
		"cat-desc-metal-tile":
			"A modern roofing covering that mimics ceramic tiles. Combines the aesthetics of classic roofing with the strength of steel: low weight, easy installation, and a service life of up to 50 years. Suitable for pitched roofs of private homes and commercial facilities.",
		"cat-desc-corrugated":
			"A versatile profiled sheet for roofing, fences and facade cladding. High profile rigidity at low weight, resistance to atmospheric loads, a wide range of protective-decorative coatings.",
		"cat-desc-seam":
			"Premium seam roofing with a hidden lock joint. Completely waterproof surface without penetrations, elegant modern look, service life up to 70 years. Applicable on roofs of any geometry — from flat to complex.",
		"cat-adv-metal-tile-0": "Manufacturer's warranty up to 50 years",
		"cat-adv-metal-tile-1": "Light weight — no truss reinforcement needed",
		"cat-adv-metal-tile-2": "Ready to install in 1–2 days",
		"cat-adv-metal-tile-3": "Dozens of colors by RAL catalog",
		"cat-adv-corrugated-0": "Versatility: roofing, fence, facade",
		"cat-adv-corrugated-1": "Minimal waste when cutting",
		"cat-adv-corrugated-2": "Fire resistance and UV stability",
		"cat-adv-corrugated-3": "Affordable price and fast delivery",
		"cat-adv-seam-0": "Hidden lock — no screws in the roofing field",
		"cat-adv-seam-1": "Suitable for slopes from 3°",
		"cat-adv-seam-2": "No leaks even at low slopes",
		"cat-adv-seam-3": "Modern architectural look",
		// Calculator
		"calc-title": "Cost calculation",
		"calc-area-label": "Roof area, m²",
		"calc-color-label": "Color",
		"calc-thickness-label": "Thickness",
		"calc-surface-label": "Surface",
		"calc-installation-label": "Include installation (450 ₽/m²)",
		"calc-delivery-label": "Delivery (3,500 ₽)",
		"calc-base-price": "Base price",
		"calc-mult-thickness": "Thickness coeff.",
		"calc-mult-surface": "Surface coeff.",
		"calc-material-label": "Material",
		"calc-installation-row": "Installation",
		"calc-delivery-row": "Delivery",
		"calc-total-label": "Total",
		"calc-add-to-cart": "Add to cart",
		"calc-close-btn": "Close calculator",
		"calc-area-decrease": "Decrease area",
		"calc-area-increase": "Increase area",
		"calc-toast-cart-added": "added to cart",
		// Admin page
		"admin-home": "Home",
		"admin-heading": "ADMIN PANEL",
		"admin-tab-users": "Users",
		"admin-tab-products": "Products",
		"admin-tab-reviews": "Reviews",
		"admin-stat-users": "Users",
		"admin-stat-products": "Products in catalog",
		"admin-stat-reviews": "Reviews",
		"admin-stat-revenue": "Revenue (carts)",
		"admin-col-id": "ID",
		"admin-col-user": "User",
		"admin-col-phone": "Phone",
		"admin-col-email": "E-mail",
		"admin-col-role": "Role",
		"admin-col-reg-date": "Registration date",
		"admin-col-actions": "Actions",
		"admin-col-photo": "Photo",
		"admin-col-name": "Name",
		"admin-col-category": "Category",
		"admin-col-price": "Price",
		"admin-col-brand": "Brand",
		"admin-col-color": "Color",
		"admin-col-thickness": "Thickness",
		"admin-col-surface": "Surface",
		"admin-col-author": "Author",
		"admin-col-date": "Date",
		"admin-col-rating": "Rating",
		"admin-col-product": "Product",
		"admin-col-text": "Text",
		"admin-you": "You",
		"admin-make-customer": "Make customer",
		"admin-make-admin": "Make admin",
		"admin-save": "Save",
		"admin-cancel": "Cancel",
		"admin-delete": "Delete",
		"admin-add-product": "Add product",
		"admin-new-product": "New product",
		"admin-no-users": "No users",
		"admin-no-products": "No products",
		"admin-no-reviews": "No reviews",
		"admin-error-role": "Error changing role",
		"admin-error-product": "Error adding product",
		"admin-error-delete-product": "Error deleting product",
		"admin-error-delete-review": "Error deleting review",
		"admin-confirm-delete-product": "Delete this product from the catalog?",
		"admin-confirm-delete-review": "Delete this review?",
		"admin-all-users": "All users",
		"admin-all-products": "All products",
		"admin-all-reviews": "All reviews",
		"admin-form-error": "Fill in required fields: Name, Price and Image URL",
		"admin-role-customer": "Customer",
		"admin-role-admin": "Administrator",
		"admin-role-manager": "Manager",
		"admin-form-title": "Name",
		"admin-form-brand": "Brand",
		"admin-form-category": "Category",
		"admin-form-price": "Price, ₽/m²",
		"admin-form-color": "Color (RAL)",
		"admin-form-thickness": "Thickness, mm",
		"admin-form-surface": "Surface",
		"admin-form-image": "Image URL",
		"admin-form-spec1-label": "Spec 1 — name",
		"admin-form-spec1-value": "Spec 1 — value",
		"admin-form-spec2-label": "Spec 2 — name",
		"admin-form-spec2-value": "Spec 2 — value",
		"admin-error-load-users": "Error loading users",
		"admin-error-load-products": "Error loading products",
		"admin-error-load-reviews": "Error loading reviews",
		// Product card
		"card-brand": "Brand",
		"card-more": "More details",
		"card-product-name": "Product",
		"card-add-favorite": "Add to favorites",
		"card-remove-favorite": "Remove from favorites",
		"card-toast-added": "added to favorites",
		"card-toast-removed": "removed from favorites",
		// Surface options
		"surface-polyester": "Polyester",
		"surface-matte": "Matte",
		"surface-glossy": "Glossy",
		"surface-structured": "Structured",
		// Spec labels
		"spec-wave-height": "Wave height, mm",
		"spec-step-height": "Step height, mm",
		"spec-max-length": "Maximum length, m",
		"spec-min-length": "Minimum length, m",
		"spec-total-width": "Overall width, mm",
		"spec-useful-width": "Useful width, mm",
		// Auth placeholders
		"auth-pwd-placeholder": "8–20 characters",
	},
};

const PRODUCT_TITLE_EN = Object.freeze({
	Монтеррей: "Monterrey",
	Каскад: "Cascade",
	Супермонтеррей: "Super Monterrey",
	Ламонтерра: "La Monterra",
	Джокер: "Joker",
	Андалузия: "Andalusia",
	Трамонтана: "Tramontana",
	"Профнастил C8": "Corrugated C8",
	"Профнастил C10": "Corrugated C10",
	"Профнастил C20": "Corrugated C20",
	"Профнастил C21": "Corrugated C21",
	"Профнастил C44": "Corrugated C44",
	"Профнастил HC35": "Corrugated HC35",
	"Профнастил HC60": "Corrugated HC60",
	"Профнастил H75": "Corrugated H75",
	Кликфальц: "Click Seam",
	"Кликфальц Pro": "Click Seam Pro",
	"Кликфальц Pro Golf": "Click Seam Pro Golf",
	"Кликфальц Mini": "Click Seam Mini",
	"Фальц одинарный": "Single Seam",
	"Фальц двойной": "Double Seam",
	"Фальц стоячий": "Standing Seam",
	"Фальц премиум": "Premium Seam",
} as Record<string, string>);

/** Maps Russian surface names to i18n keys. */
export const SURFACE_I18N_KEY = Object.freeze({
	Полиэстер: "surface-polyester",
	Матовая: "surface-matte",
	Глянцевая: "surface-glossy",
	Структурная: "surface-structured",
} as Record<string, string>);

/** Maps Russian spec labels to i18n keys. */
export const SPEC_LABEL_I18N_KEY = Object.freeze({
	"Высота волны, мм": "spec-wave-height",
	"Высота ступеньки, мм": "spec-step-height",
	"Максимальная длина, м": "spec-max-length",
	"Минимальная длина, м": "spec-min-length",
	"Ширина общая, мм": "spec-total-width",
	"Ширина полезная, мм": "spec-useful-width",
} as Record<string, string>);

let currentLang: Lang = (localStorage.getItem("lang") as Lang | null) ?? "ru";

/** Get the currently active language. */
export const getCurrentLang = (): Lang => currentLang;

/**
 * Translate a key to the current language.
 * @param key - Translation key
 * @returns Translated string or the key itself if not found
 */
export const t = (key: string): string => i18Obj[currentLang][key] ?? key;

/**
 * Translate a surface name (e.g. "Полиэстер" → localized).
 * @param surface - Russian surface name
 */
export const translateSurface = (surface: string): string => {
	const key = SURFACE_I18N_KEY[surface];
	return key ? t(key) : surface;
};

/**
 * Translate a product title to the current language (EN/RU).
 * @param title - Russian product title
 */
export const translateTitle = (title: string): string =>
	currentLang === "en" ? (PRODUCT_TITLE_EN[title] ?? title) : title;

/**
 * Switch the active language and update all translated DOM elements.
 * @param lang - Target language code
 */
export const getTranslate = (lang: Lang): void => {
	currentLang = lang;
	localStorage.setItem("lang", lang);
	document.documentElement.lang = lang;

	document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
		// biome-ignore lint/style/noNonNullAssertion: translations are hardcoded
		const key = el.dataset.i18n!;
		const value = i18Obj[lang][key];
		if (value !== undefined) el.textContent = value;
	});

	// For elements with nested HTML tags (br, span, strong).
	// Safe because translations are hardcoded, never user-provided.
	document.querySelectorAll<HTMLElement>("[data-i18n-html]").forEach((el) => {
		// biome-ignore lint/style/noNonNullAssertion: translations are hardcoded
		const key = el.dataset.i18nHtml!;
		const value = i18Obj[lang][key];
		if (value !== undefined) el.innerHTML = value;
	});

	document
		.querySelectorAll<HTMLInputElement>("[data-i18n-placeholder]")
		.forEach((el) => {
			// biome-ignore lint/style/noNonNullAssertion: translations are hardcoded
			const key = el.dataset.i18nPlaceholder!;
			const value = i18Obj[lang][key];
			if (value !== undefined) el.placeholder = value;
		});

	document
		.querySelectorAll<HTMLElement>("[data-i18n-aria-label]")
		.forEach((el) => {
			// biome-ignore lint/style/noNonNullAssertion: translations are hardcoded
			const key = el.dataset.i18nAriaLabel!;
			const value = i18Obj[lang][key];
			if (value !== undefined) el.setAttribute("aria-label", value);
		});

	document
		.querySelectorAll<HTMLElement>("[data-i18n-surface]")
		.forEach((el) => {
			// biome-ignore lint/style/noNonNullAssertion: translations are hardcoded
			const russianVal = el.dataset.i18nSurface!;
			const key = SURFACE_I18N_KEY[russianVal];
			if (key) {
				const value = i18Obj[lang][key];
				if (value !== undefined) el.textContent = value;
			}
		});

	document.querySelectorAll<HTMLElement>("[data-i18n-title]").forEach((el) => {
		// biome-ignore lint/style/noNonNullAssertion: translations are hardcoded
		const russianTitle = el.dataset.i18nTitle!;
		el.textContent =
			lang === "en"
				? (PRODUCT_TITLE_EN[russianTitle] ?? russianTitle)
				: russianTitle;
	});
};

/** Initialize i18n from localStorage and apply translations. */
export const initI18n = (): void => {
	getTranslate(currentLang);
};
