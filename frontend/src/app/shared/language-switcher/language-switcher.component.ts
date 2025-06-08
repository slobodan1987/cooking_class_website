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
      this.setLanguage(savedLanguage);
    } else {
      // Ako nema sačuvanog jezika, postavi podrazumevani jezik
      this.form.controls['language'].setValue('hr');
      this.setLanguage('hr'); // Postavi podrazumevani jezik
    }
  }

  switchLanguage(event: Event): void {
    const code = event.target
      ? (event.target as HTMLSelectElement).value
      : null;
    this.setLanguage(code);
  }
  setLanguage(code: string | null): void {
    if (!code) {
      return;
    }

    window.localStorage.setItem('selectedLanguage', code);

    const currentPath = this.location.path() || '/';

    let newPath: string;

    // Ako je root, ili index.html, ili /hr, idi direktno na index-{code}.html
    if (
      currentPath === '/' ||
      currentPath === '/index.html' ||
      /^\/[a-z-]+$/.test(currentPath) // npr. /de, /fr
    ) {
      newPath = `/index-${code}.html`;
    }
    // Ako već jeste index-xx.html, zameni samo kod
    else if (/index-[a-z-]+\.html/.test(currentPath)) {
      newPath = currentPath.replace(
        /index-[a-z-]+\.html/,
        `index-${code}.html`
      );
    }
    // Ako je neka čudna ruta (/nepoznato), fallback
    else {
      newPath = `/index-${code}.html`;
    }

    window.location.href = newPath;
  }
}
