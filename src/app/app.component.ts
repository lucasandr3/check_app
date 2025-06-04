import {Component, OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{
  paletteToggle = false;
  highContrastPaletteToggle = false;

  constructor() {}

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersHighContrast = window.matchMedia('(prefers-contrast: more)');

    const dark = JSON.parse(localStorage.getItem('dark') || 'null');
    const highContrast = JSON.parse(localStorage.getItem('highContrast') || 'null');

    if (dark === null) {
      this.initializeDarkPalette(prefersDark.matches);
    }

    if (highContrast === null) {
      this.initializeHighContrastPalette(prefersHighContrast.matches);
    }

    if (dark) {
      this.toggleDarkPalette(dark);
      this.paletteToggle = dark;
    }

    if (highContrast) {
      this.toggleHighContrastPalette(highContrast);
      this.highContrastPaletteToggle = highContrast;
    }

    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
    prefersHighContrast.addEventListener('change', (mediaQuery) =>
      this.initializeHighContrastPalette(mediaQuery.matches)
    );
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  initializeHighContrastPalette(isHighContrast: boolean) {
    this.highContrastPaletteToggle = isHighContrast;
    this.toggleHighContrastPalette(isHighContrast);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  toggleHighContrastPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-high-contrast', shouldAdd);
  }
}
