import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Language, LANGUAGES } from './languages';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
  languages: Language[] = LANGUAGES;
}
