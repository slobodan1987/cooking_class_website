import { Pipe, PipeTransform } from '@angular/core';
import { LANGUAGES } from '../language-switcher/languages';

@Pipe({
  name: 'flag',
})
export class FlagPipe implements PipeTransform {
  transform(
    language: 'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' | null
  ): string {
    return LANGUAGES.find((lang) => lang.code === language)?.flag as
      | '/assets/img/flags/flag-hr.svg'
      | '/assets/img/flags/flag-en.svg'
      | '/assets/img/flags/flag-de.svg'
      | '/assets/img/flags/flag-it.svg'
      | '/assets/img/flags/flag-fr.svg'
      | '/assets/img/flags/flag-es.svg'
      | '/assets/img/flags/flag-cz.svg';
  }
}
