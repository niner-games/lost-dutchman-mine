import english from "../language/en";
import polish from "../language/pl";
import german from "../language/de";
import spanish from "../language/es";
import french from "../language/fr";
import italian from "../language/it";
import silesian from "../language/sx";
import hindi from "../language/hi";
import ukrainian from "../language/uk";
import hebrew from "../language/he";

const languageContext: any = {
  en: english,
  pl: polish,
  de: german,
  es: spanish,
  fr: french,
  it: italian,
  sx: silesian,
  hi: hindi,
  uk: ukrainian,
  he: hebrew,
};

export const setText = (directory: string, text: string) => {
  const lang = window.localStorage.getItem("language") || "en";

  if (!languageContext[lang] || !languageContext[lang][directory]) {
    return { text: languageContext.en[directory][text], additionalClass: "" };
  }

  if (languageContext[lang][directory][text]) {
    return {
      text: languageContext[lang][directory][text],
      additionalClass: lang === "he" ? "hebrew" : "",
    };
  }

  return {
    text: languageContext.en[directory][text],
    additionalClass: "",
  };
};
