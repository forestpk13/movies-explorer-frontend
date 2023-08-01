export const headerPages = ['/', '/movies', '/saved-movies', '/profile'];
export const footerPages = ['/', '/movies', '/saved-movies'];

// параметры дозагрузки карточек
export const DESKTOP_SCREEN_BREAKPOINT = 1180;
export const TABLET_SCREEN_BREAKPOINT = 720;
export const DESKTOP_CARDS_QTY = { initial: 12, additional: 3, row: 3 };
export const TABLET_CARDS_QTY = { initial: 8, additional: 2, row: 2 };
export const MOBILE_CARDS_QTY = { initial: 5, additional: 2, row: 1 };

// информационные сообщения для интерфейса
export const SUCCESS_EDIT_PROFILE_TEXT = 'Данные профиля изменены';
export const FIRST_SEARCH_TEXT = 'Введите запрос и добавьте понравившиеся фильмы';
export const FIND_NOTHING_TEXT = 'По запросу ничего не найдено';
export const NO_SAVED_FILMS_TEXT = 'Сейчас у вас нет сохраненных фильмов. Добавьте понравившиеся через форму поиска на странице "фильмы"'
export const EMPTY_SEARCH_TEXT = 'Нужно ввести ключевое слово';
export const TOKEN_MISSMATCH_TEXT = 'Ошибка при выполнении действия: передан невалидный токен. Требуется повторный вход в профиль';

export const UNAUTHORIZED_ERROR_CODE = 401;

export const EMAIL_PATTERN = '[A-z0-9_.-]{1,}@[A-z0-9_.-]{1,}[.][A-z]{2,6}';
