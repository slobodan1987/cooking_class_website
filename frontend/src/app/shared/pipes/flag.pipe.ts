import { Pipe, PipeTransform } from '@angular/core';
import { LANGUAGES } from '../language-switcher/languages';

@Pipe({
  name: 'flag',
})
export class FlagPipe implements PipeTransform {
  transform(language: string | null): string {
    return LANGUAGES.find((lang) => lang.code === language)?.flag as string;
  }
}
