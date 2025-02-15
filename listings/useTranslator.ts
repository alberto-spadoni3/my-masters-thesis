type Translator = (key: string, params?: TranslationValues) => string;

const useTranslator = (translationsPrefixPath = ""): Translator => {
  const t = useTranslations(translationsPrefixPath);
  return (key: string, values?: TranslationValues): string => t(key, values);
};