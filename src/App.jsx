import { useState } from "react";
import Lottie from "lottie-react";
import "./App.css";
import tg from "./telegram.js";

import arrow from "./assets/arrow.svg";

import smilesLottie from "./assets/smilesLottie.json";
import Lghtning_1 from "./assets/lightning/Lghtning_1";
import Lghtning_2 from "./assets/lightning/Lghtning_2";
import Lghtning_3 from "./assets/lightning/Lghtning_3";
import Lghtning_4 from "./assets/lightning/Lghtning_4";

const dataAnimationGroups = [Lghtning_1, Lghtning_2, Lghtning_3, Lghtning_4];

const translations = {
  ru: {
    h1: <>Затишье <br /> перед бурей</>,
    p: <>Ваши поинты сохранены и будут <br /> доступны после обновления</>,
    button: <>Результаты</>,
  },
  en: {
    h1: <>The calm before <br /> the storm</>,
    p: <>Your points are saved and will be <br /> available after the update</>,
    button: <>Retrodrop season 1</>,
  },
};

const clickButton = () => {
  alert("Нужна ссылка)")
};

function App() {
  const lang = tg?.initDataUnsafe?.user?.language_code === "ru" ? "ru" : "en";
  const [numAnimLghtning, setNumAnimLghtning] = useState(0);

  // Настраиваем safe area insets для Telegram
  const safeTop =
    tg?.safeAreaInset?.top && tg.safeAreaInset.top !== 0
      ? tg.safeAreaInset.top + 40
      : 0;
  const safeBottom =
    tg?.safeAreaInset?.bottom && tg.safeAreaInset.bottom !== 0
      ? tg.safeAreaInset.bottom
      : 0;
  document.documentElement.style.setProperty("--safe-top", `${safeTop}px`);
  document.documentElement.style.setProperty(
    "--safe-bottom",
    `${safeBottom}px`
  );

  return (
    <div className="plug">
      <div className="animation-smile">
        <Lottie animationData={smilesLottie} />
      </div>
      <div className="animation-lightning">
        <Lottie
          animationData={dataAnimationGroups[numAnimLghtning]}
          loop={false}
          onComplete={() =>
            setNumAnimLghtning(
              (prev) => (prev + 1) % dataAnimationGroups.length
            )
          }
        />
      </div>
      <div className="wrap-info">
        <h1>{translations[lang]["h1"]}</h1>
        <p>{translations[lang]["p"]}</p>
        <button onClick={clickButton}>
          <span>{translations[lang]["button"]}</span>
          <img src={arrow} />
        </button>
      </div>
    </div>
  );
}

export default App;
