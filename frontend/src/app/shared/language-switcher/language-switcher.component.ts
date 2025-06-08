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
    const currentPath = this.location.path() || '/';

    // 1. Ako postoji localStorage — koristi to
    const saved = window.localStorage.getItem('selectedLanguage');
    if (saved) {
      this.form.controls['language'].setValue(
        saved as 'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' | null
      );
      if (currentPath !== `/index-${saved}.html`) {
        this.setLanguage(saved);
      }
      return;
    }

    // 2. Ako nema localStorage — probaj izvući jezik iz URL-a
    const match =
      currentPath.match(/^\/([a-z-]+)$/) || // npr. /fr
      currentPath.match(/index-([a-z-]+)\.html/); // npr. index-fr.html

    const urlLang = match?.[1];

    this.form.controls['language'].setValue(urlLang as any);
    if (currentPath !== `/index-${urlLang}.html`) {
      this.setLanguage(urlLang);
    }
  }

  switchLanguage(event: Event): void {
    const code = event.target
      ? (event.target as HTMLSelectElement).value
      : null;
    this.setLanguage(code);
  }
  setLanguage(code: any): void {
    if (!code) {
      return;
    }

    const normalizedCode = code.trim();
    const currentPath = this.location.path() || '/';

    // Ako si već na index-<code>.html, ne radi ništa
    if (currentPath === `/index-${normalizedCode}.html`) {
      return;
    }

    window.localStorage.setItem('selectedLanguage', normalizedCode);

    let newPath: string;

    if (
      currentPath === '/' ||
      currentPath === '/index.html' ||
      /^\/[a-z-]+$/.test(currentPath)
    ) {
      newPath = `/index-${normalizedCode}.html`;
    } else if (/index-[a-z-]+\.html/.test(currentPath)) {
      newPath = currentPath.replace(
        /index-[a-z-]+\.html/,
        `index-${normalizedCode}.html`
      );
    } else {
      newPath = `/index-${normalizedCode}.html`;
    }

    // Samo ako nismo već na toj stranici
    if (window.location.pathname !== newPath) {
      window.location.href = newPath;
    }
  }
}
