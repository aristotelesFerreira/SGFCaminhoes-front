import { language } from "../../settings";

import englishLang from "../../image/flag/uk.svg";
import chineseLang from "../../image/flag/china.svg";

const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: "english",
      locale: "en",
      text: "English",
      icon: englishLang
    },
    {
      languageId: "portuguese",
      locale: "br",
      text: "Portugues",
      icon: chineseLang
    }
  ]
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach(language => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
export default config;
