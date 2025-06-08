import { Pipe, PipeTransform } from '@angular/core';
import { LANGUAGES } from '../language-switcher/languages';

@Pipe({
  name: 'lang',
})
export class LangPipe implements PipeTransform {
  transform(
    language: 'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' | null
  ): 'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' {
    return LANGUAGES.find((lang) => lang.code === language)?.code as
      | 'hr'
      | 'en-US'
      | 'de'
      | 'it'
      | 'fr'
      | 'es'
      | 'cs';
  }
}
