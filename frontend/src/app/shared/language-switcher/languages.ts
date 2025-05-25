export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'ENGLISH', flag: '/cooking_class_website/assets/img/flags/flag-en.svg' },
  { code: 'hr', name: 'HRVATSKI', flag: '/cooking_class_website/assets/img/flags/flag-hr.svg' },
  { code: 'de', name: 'DEUTSCH', flag: '/cooking_class_website/assets/img/flags/flag-de.svg' },
  { code: 'cz', name: 'ČEŠTINA', flag: '/cooking_class_website/assets/img/flags/flag-cz.svg' },
  { code: 'es', name: 'ESPAÑOL', flag: '/cooking_class_website/assets/img/flags/flag-es.svg' },
  { code: 'it', name: 'ITALIANO', flag: '/cooking_class_website/assets/img/flags/flag-it.svg' }
];