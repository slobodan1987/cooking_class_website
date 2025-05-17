export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'ENGLISH', flag: 'assets/img/flags/flag-en.svg' },
  { code: 'hr', name: 'CROATIAN', flag: 'assets/img/flags/flag-hr.svg' },
  { code: 'de', name: 'GERMAN', flag: 'assets/img/flags/flag-de.svg' },
  { code: 'cz', name: 'CZECH', flag: 'assets/img/flags/flag-cz.svg' },
  { code: 'es', name: 'SPANISH', flag: 'assets/img/flags/flag-es.svg' },
  { code: 'it', name: 'ITALIAN', flag: 'assets/img/flags/flag-it.svg' }
];