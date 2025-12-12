// telegram.js
import { isMobile } from 'react-device-detect';

// Обязательно добавить в index.html
// <script src="https://telegram.org/js/telegram-web-app.js"></script>

let tg = null;

const addSettings = () => {
  // Проверяем, что функция существует, прежде чем её вызывать
  if (tg.setHeaderColor) {
    tg.setHeaderColor('#070A0E');
  }
  if (tg.setBackgroundColor) {
    tg.setBackgroundColor('#070A0E');
  }
  if (tg.setBottomBarColor) {
    tg.setBottomBarColor('#232529');
  }
  if (tg.lockOrientation) {
    tg.lockOrientation();
  }
  if (tg.expand) {
    tg.expand();
  }
  if (tg.disableVerticalSwipes) {
    tg.disableVerticalSwipes();
  }

  if (tg.enableClosingConfirmation) {
    tg.enableClosingConfirmation();
  }
  
  // Проверка для requestFullscreen с учетом версии
  if (tg.requestFullscreen) {
    const version = parseFloat(tg.version);
    if (!isNaN(version) && version > 6.0 && isMobile) {
      tg.requestFullscreen();
    } else {
      console.warn(`Method requestFullscreen is not supported in version ${tg.version}`);
    }
  } else {
    console.warn('tg.requestFullscreen is not available');
  }
};


if (
  typeof window !== 'undefined' &&
  window.Telegram &&
  window.Telegram.WebApp
) {
  tg = window.Telegram.WebApp;
  tg.ready();

  addSettings();
  tg.onEvent('viewportChanged', () => {
    tg.expand();
  });
} else {
  console.warn(
    'Telegram WebApp не найден. Убедитесь, что скрипт <script src="https://telegram.org/js/telegram-web-app.js"></script> подключен.'
  );
}

export default tg;
