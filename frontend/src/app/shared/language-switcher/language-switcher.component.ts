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
    const codeDirectlyFromPath = currentPath.split('/')?.[1];
    const saved = window.localStorage.getItem('selectedLanguage');

    let finalCode = codeDirectlyFromPath ?? saved;
    finalCode = finalCode?.trim();

    if (
      !finalCode ||
      finalCode === '' ||
      finalCode === 'index.html' ||
      finalCode === 'index-hr.html' ||
      finalCode === 'index-Hr.html' ||
      finalCode === 'index-HR.html' ||
      finalCode === 'HR' ||
      finalCode === 'Hr' ||
      finalCode === 'hr'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      finalCode = 'hr';
    }

    if (
      finalCode === 'index-de.html' ||
      finalCode === 'index-De.html' ||
      finalCode === 'index-DE.html' ||
      finalCode === 'DE' ||
      finalCode === 'De' ||
      finalCode === 'de'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      finalCode = 'de';
    }

    if (
      finalCode === 'index-en.html' ||
      finalCode === 'index-En.html' ||
      finalCode === 'index-EN.html' ||
      finalCode === 'EN' ||
      finalCode === 'En' ||
      finalCode === 'en' ||
      finalCode === 'index-en-us.html' ||
      finalCode === 'index-En-Us.html' ||
      finalCode === 'index-EN-US.html' ||
      finalCode === 'index-en-US.html' ||
      finalCode === 'EN-US' ||
      finalCode === 'En-Us' ||
      finalCode === 'en-US' ||
      finalCode === 'en-us'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      finalCode = 'en-US';
    }

    if (
      finalCode === 'index-cs.html' ||
      finalCode === 'index-Cs.html' ||
      finalCode === 'index-CS.html' ||
      finalCode === 'CS' ||
      finalCode === 'Cs' ||
      finalCode === 'cs'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      finalCode = 'cs';
    }

    if (
      finalCode === 'index-it.html' ||
      finalCode === 'index-It.html' ||
      finalCode === 'index-IT.html' ||
      finalCode === 'IT' ||
      finalCode === 'It' ||
      finalCode === 'it'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      finalCode = 'it';
    }

    if (
      finalCode === 'index-es.html' ||
      finalCode === 'index-Es.html' ||
      finalCode === 'index-ES.html' ||
      finalCode === 'ES' ||
      finalCode === 'Es' ||
      finalCode === 'es'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      finalCode = 'es';
    }

    if (
      finalCode === 'index-fr.html' ||
      finalCode === 'index-Fr.html' ||
      finalCode === 'index-FR.html' ||
      finalCode === 'FR' ||
      finalCode === 'Fr' ||
      finalCode === 'fr'
    ) {
      // 2. Ako nema localStorage, koristi defaultni jezik
      finalCode = 'fr';
    }
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
      window.localStorage.setItem('selectedLanguage', code);
      window.location.href = newPath;
    }
  }
}
