import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonList,
  IonListHeader,
  IonToggle,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonItem,
    IonList,
    IonListHeader,
    IonToggle,
    ToolbarComponent,
  ]
})
export class ConfiguracaoPage implements OnInit {
  paletteToggle = false;
  highContrastPaletteToggle = false;

  constructor() {
    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline });
  }

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

  highContrastPaletteToggleChange(event: CustomEvent) {
    this.toggleHighContrastPalette(event.detail.checked);
    localStorage.setItem('highContrast', event.detail.checked.toString());
  }

  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
    localStorage.setItem('dark', event.detail.checked.toString());
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  toggleHighContrastPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-high-contrast', shouldAdd);
  }
}
