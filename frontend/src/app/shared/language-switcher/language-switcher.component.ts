import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FlagPipe } from '../pipes/flag.pipe';
import { Language, LANGUAGES } from './languages';

interface LanguageForm {
  language: FormControl<
    'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' | null
  >;
}

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule, ReactiveFormsModule, FlagPipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent implements OnInit {
  constructor(private location: Location) {}
  languages: Language[] = LANGUAGES;
  form: FormGroup<LanguageForm> = new FormGroup<LanguageForm>({
    language: new FormControl<
      'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' | null
    >({
      value: 'hr',
      disabled: false,
    }),
  });

  ngOnInit(): void {
    const savedLanguage = window.localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      this.form.controls['language'].setValue(
        savedLanguage as 'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs'
      );
    } else {
      // Ako nema sačuvanog jezika, postavi podrazumevani jezik
      this.form.controls['language'].setValue('hr');
    }
  }

  switchLanguage(event: Event): void {
    const code = event.target
      ? (event.target as HTMLSelectElement).value
      : null;
    if (!code) {
      return;
    }
    window.localStorage.setItem('selectedLanguage', code); // Sačuvaj jezik
    // const path = this.location.path();
    // const newPath = `/${code}${path}`;
    // window.location.href = newPath;
    window.location.href = '/' + code + '.html';
  }
}
