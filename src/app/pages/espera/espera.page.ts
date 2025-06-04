import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem, IonLabel, IonList, IonListHeader, IonText,
} from '@ionic/angular/standalone';
import {customLocale} from "../../utils/timer";
import {addIcons} from "ionicons";
import {checkmark, closeOutline, cloudUpload, pause, play, refresh, trash} from "ionicons/icons";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {InfoHeaderComponent} from "../../components/info-header/info-header.component";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-espera',
  templateUrl: './espera.page.html',
  styleUrls: ['./espera.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonText, IonItem, IonLabel, IonIcon, IonList, IonListHeader, ToolbarComponent, InfoHeaderComponent]
})
export class EsperaPage implements OnInit {
  isLoading: boolean = false;
  startDateTime: string = this.toLocalISOString(new Date());
  timer: any;
  isRunning = false;
  elapsedTime: string | null = null;
  elapsedSeconds = 0;
  timerInterval: any;
  startTime: Date | null = null;
  endTime: Date | null = null;
  registros: { inicio: string; fim: string }[] = [];
  private startTimeInMs = 0;

  constructor(private dataService: DataService) {
    addIcons({play, pause, refresh, closeOutline, checkmark, trash, cloudUpload})
  }

  ngOnInit() {
    const registros = JSON.parse(localStorage.getItem('registros') || 'null');
    if (registros) {
      this.registros = registros;
    }
  }

  get formattedTime(): string {
    const hours = Math.floor(this.elapsedSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((this.elapsedSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (this.elapsedSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  startTimer() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = new Date();
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
    }, 1000);
  }

  pauseTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
  }

  resetTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.elapsedSeconds = 0;
    this.startTime = null;
    this.endTime = null;
  }

  async salvarRegistro() {
    if (!this.startTime) return;
    this.isLoading = true;
    this.endTime = new Date();
    const inicio = this.startTime.toLocaleTimeString();
    const fim = this.endTime.toLocaleTimeString();

    this.registros.push({ inicio, fim });
    const data = {
      espera: this.registros
    }
    localStorage.setItem('registros', JSON.stringify(this.registros));

    let registrosExistents = await this.dataService.getPending();

    await this.dataService.saveLocal({
      ...data,
      criado_em: new Date().toISOString()
    });

    this.resetTimer();
    this.isLoading = false;
  }

  excluirRegistro(index: number) {
    this.registros.splice(index, 1);
    localStorage.setItem('registros', JSON.stringify(this.registros));
  }

  private formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  private toLocalISOString(date: Date): string {
    const offsetMs = date.getTimezoneOffset() * 60000; // fuso local em ms
    const localTime = new Date(date.getTime() - offsetMs);
    return localTime.toISOString().slice(0, 16); // remove os segundos
  }

  protected readonly customLocale = customLocale;
}
