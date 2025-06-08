export interface Language {
  code: 'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs';
  name:
    | 'HRVATSKI'
    | 'ENGLISH'
    | 'DEUTSCH'
    | 'ITALIANO'
    | 'FRANÇAIS'
    | 'ESPAÑOL'
    | 'ČEŠTINA';
  flag:
    | '/assets/img/flags/flag-hr.svg'
    | '/assets/img/flags/flag-en.svg'
    | '/assets/img/flags/flag-de.svg'
    | '/assets/img/flags/flag-it.svg'
    | '/assets/img/flags/flag-fr.svg'
    | '/assets/img/flags/flag-es.svg'
    | '/assets/img/flags/flag-cz.svg';
}

export const LANGUAGES: Language[] = [
  { code: 'hr', name: 'HRVATSKI', flag: '/assets/img/flags/flag-hr.svg' },
  { code: 'en-US', name: 'ENGLISH', flag: '/assets/img/flags/flag-en.svg' },
  { code: 'de', name: 'DEUTSCH', flag: '/assets/img/flags/flag-de.svg' },
  { code: 'it', name: 'ITALIANO', flag: '/assets/img/flags/flag-it.svg' },
  { code: 'fr', name: 'FRANÇAIS', flag: '/assets/img/flags/flag-fr.svg' },
  { code: 'es', name: 'ESPAÑOL', flag: '/assets/img/flags/flag-es.svg' },
  { code: 'cs', name: 'ČEŠTINA', flag: '/assets/img/flags/flag-cz.svg' },
];
