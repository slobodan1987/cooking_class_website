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
    const currentPath = this.location.path();

    console.log(currentPath);

    const codeDirectlyFromPath = currentPath.split('/')?.[1];

    let codeDirectlyFromPathTrimmed = codeDirectlyFromPath?.trim();
    const saved = window.localStorage.getItem('selectedLanguage');

    if (
      !codeDirectlyFromPathTrimmed ||
      codeDirectlyFromPathTrimmed === '' ||
      codeDirectlyFromPathTrimmed === 'index.html' ||
      codeDirectlyFromPathTrimmed === 'index-hr.html' ||
      codeDirectlyFromPathTrimmed === 'index-Hr.html' ||
      codeDirectlyFromPathTrimmed === 'index-HR.html' ||
      codeDirectlyFromPathTrimmed === 'HR' ||
      codeDirectlyFromPathTrimmed === 'Hr' ||
      codeDirectlyFromPathTrimmed === 'hr'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      codeDirectlyFromPathTrimmed = 'hr';
    }

    if (
      codeDirectlyFromPathTrimmed === 'index-de.html' ||
      codeDirectlyFromPathTrimmed === 'index-De.html' ||
      codeDirectlyFromPathTrimmed === 'index-DE.html' ||
      codeDirectlyFromPathTrimmed === 'DE' ||
      codeDirectlyFromPathTrimmed === 'De' ||
      codeDirectlyFromPathTrimmed === 'de'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      codeDirectlyFromPathTrimmed = 'de';
    }

    if (
      codeDirectlyFromPathTrimmed === 'index-en.html' ||
      codeDirectlyFromPathTrimmed === 'index-En.html' ||
      codeDirectlyFromPathTrimmed === 'index-EN.html' ||
      codeDirectlyFromPathTrimmed === 'EN' ||
      codeDirectlyFromPathTrimmed === 'En' ||
      codeDirectlyFromPathTrimmed === 'en' ||
      codeDirectlyFromPathTrimmed === 'index-en-us.html' ||
      codeDirectlyFromPathTrimmed === 'index-En-Us.html' ||
      codeDirectlyFromPathTrimmed === 'index-EN-US.html' ||
      codeDirectlyFromPathTrimmed === 'index-en-US.html' ||
      codeDirectlyFromPathTrimmed === 'EN-US' ||
      codeDirectlyFromPathTrimmed === 'En-Us' ||
      codeDirectlyFromPathTrimmed === 'en-US' ||
      codeDirectlyFromPathTrimmed === 'en-us'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      codeDirectlyFromPathTrimmed = 'en-US';
    }

    if (
      codeDirectlyFromPathTrimmed === 'index-cs.html' ||
      codeDirectlyFromPathTrimmed === 'index-Cs.html' ||
      codeDirectlyFromPathTrimmed === 'index-CS.html' ||
      codeDirectlyFromPathTrimmed === 'CS' ||
      codeDirectlyFromPathTrimmed === 'Cs' ||
      codeDirectlyFromPathTrimmed === 'cs'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      codeDirectlyFromPathTrimmed = 'cs';
    }

    if (
      codeDirectlyFromPathTrimmed === 'index-it.html' ||
      codeDirectlyFromPathTrimmed === 'index-It.html' ||
      codeDirectlyFromPathTrimmed === 'index-IT.html' ||
      codeDirectlyFromPathTrimmed === 'IT' ||
      codeDirectlyFromPathTrimmed === 'It' ||
      codeDirectlyFromPathTrimmed === 'it'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      codeDirectlyFromPathTrimmed = 'it';
    }

    if (
      codeDirectlyFromPathTrimmed === 'index-es.html' ||
      codeDirectlyFromPathTrimmed === 'index-Es.html' ||
      codeDirectlyFromPathTrimmed === 'index-ES.html' ||
      codeDirectlyFromPathTrimmed === 'ES' ||
      codeDirectlyFromPathTrimmed === 'Es' ||
      codeDirectlyFromPathTrimmed === 'es'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      codeDirectlyFromPathTrimmed = 'es';
    }

    if (
      codeDirectlyFromPathTrimmed === 'index-fr.html' ||
      codeDirectlyFromPathTrimmed === 'index-Fr.html' ||
      codeDirectlyFromPathTrimmed === 'index-FR.html' ||
      codeDirectlyFromPathTrimmed === 'FR' ||
      codeDirectlyFromPathTrimmed === 'Fr' ||
      codeDirectlyFromPathTrimmed === 'fr'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      codeDirectlyFromPathTrimmed = 'fr';
    }

    codeDirectlyFromPathTrimmed = saved ?? 'hr';
    this.setLanguage(codeDirectlyFromPathTrimmed);
  }

  switchLanguage(event: Event): void {
    const code = event.target
      ? (event.target as HTMLSelectElement).value
      : null;
    const codeNormalized = code?.trim();
    this.setLanguage(codeNormalized);
  }
  setLanguage(code: any): void {
    let newPath: string = '/index-hr.html';
    if (code === 'hr') {
      newPath = '/index-hr.html';
    }
    if (code === 'de') {
      newPath = '/index-de.html';
    }
    if (code === 'es') {
      newPath = '/index-es.html';
    }
    if (code === 'fr') {
      newPath = '/index-fr.html';
    }
    if (code === 'it') {
      newPath = '/index-it.html';
    }
    if (code === 'cs') {
      newPath = '/index-cs.html';
    }
    if (code === 'en-US') {
      newPath = '/index-en-US.html';
    }

    // Samo ako nismo već na toj stranici
    if (window.location.pathname !== newPath) {
      this.form.setValue(code);
      window.localStorage.setItem('selectedLanguage', code);
      window.location.href = newPath;
    }
  }
}
