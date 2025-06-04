import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel, IonLoading,
  IonModal, IonNote,
  IonProgressBar, IonRadio, IonRadioGroup,
  IonTab, IonTabBar, IonTabButton, IonTabs,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {addIcons} from "ionicons";
import {checkmark, chevronBack, chevronForward, key} from "ionicons/icons";
import {SpeechRecognition} from "@capacitor-community/speech-recognition";
import {Capacitor} from "@capacitor/core";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ToolbarComponent, IonItemDivider, IonLabel, IonItem, IonTextarea, IonButton, IonProgressBar, IonTabBar, IonTabButton, IonIcon, IonTab, IonTabs, IonRadio, IonRadioGroup, IonNote, IonModal, IonButtons, IonLoading]
})
export class ChecklistPage implements OnInit {
  isLoading: boolean = false;
  observacoes: string = '';
  currentStep = 0;

  showModal = false;
  modalProblema = '';
  currentItem: any = null;

  transcribedText = '';
  recognizing = false;
  recognitionWeb = null;

  steps = [
    {
      title: 'Documentação',
      items: [
        { label: 'CNH do motorista válida', status: 'sim', problema: '' },
        { label: 'CRLV do veículo', status: 'sim', problema: '' },
        { label: 'Licenciamento atualizado', status: 'sim', problema: '' },
        { label: 'ANTT', status: 'sim', problema: '' },

        { label: 'Licenciamento atualizado', status: 'sim', problema: '' },
        { label: 'ANTT', status: 'sim', problema: '' }
      ]
    },
    {
      title: 'Parte Externa',
      items: [
        { label: 'Pneus calibrados', status: 'sim', problema: '' },
        { label: 'Faróis e lanternas funcionando', status: 'sim', problema: '' },
        { label: 'Retrovisores íntegros', status: 'sim', problema: '' }
      ]
    },
    {
      title: 'Parte Interna',
      items: [
        { label: 'Painel funcionando', status: 'sim', problema: '' },
        { label: 'Extintor de incêndio', status: 'sim', problema: '' }
      ]
    },
    {
      title: 'Mecânica',
      items: [
        { label: 'Nível do óleo', status: 'sim', problema: '' },
        { label: 'Freios em ordem', status: 'sim', problema: '' }
      ]
    },
    {
      title: 'Carga e Segurança',
      items: [
        { label: 'Carga bem amarrada', status: 'sim', problema: '' },
        { label: 'Peso dentro do limite', status: 'sim', problema: '' }
      ]
    }
  ];

  constructor(private dataService: DataService) {
    addIcons({chevronBack, chevronForward, checkmark})
  }

  ngOnInit() {
  }

  async startListening() {

    if (Capacitor.getPlatform() === 'web') {
      this.startWebSpeechRecognition();
      return;
    }

    const available = await SpeechRecognition.available();
    console.log(available)
    if (!available) {
      alert('Reconhecimento de voz não está disponível.');
      return;
    }

    const permission = await SpeechRecognition.requestPermissions();
    if (!permission.speechRecognition) {
      alert('Permissão negada para usar reconhecimento de voz.');
      return;
    }

    this.recognizing = true;

    await SpeechRecognition.start({
      language: 'pt-BR',
      maxResults: 1,
      partialResults: false,
      prompt: 'Fale agora...'
    });

    await SpeechRecognition.addListener('partialResults', (result) => {
      this.transcribedText = result.matches[0] || '';
      this.recognizing = false;
    });

    await SpeechRecognition.addListener('listeningState', (error) => {
      console.error('Erro na transcrição:', error);
      this.recognizing = false;
    });
  }

  async stopListening() {
    if (Capacitor.getPlatform() === 'web') {
      if (this.recognitionWeb) {
        // this.recognitionWeb;
        console.log(this.recognitionWeb)
      }
    }

    if (Capacitor.getPlatform() !== 'web') {
      await SpeechRecognition.stop();
    }

    this.recognizing = false;
  }


  startWebSpeechRecognition() {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert('Reconhecimento de voz não é suportado neste navegador.');
      return;
    }
    this.recognizing = true;
    const recognition = new SpeechRecognition();
    this.recognitionWeb = recognition || null;
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const texto = event.results[0][0].transcript;
      console.log('Transcrição:', texto);
      this.transcribedText = texto;
      this.modalProblema = texto;
      this.recognizing = false;
    };

    recognition.onerror = (event: any) => {
      console.error('Erro no reconhecimento:', event.error);
    };

    recognition.start();
  }



  onStatusChange(item: any) {
    if (item.status === 'nao') {
      this.modalProblema = item.problema || '';
      this.currentItem = item;
      this.showModal = true;
    } else {
      item.problema = '';
    }
  }

  closeModal() {
    this.showModal = false;
    // Se cancelou e não havia descrição antes, limpa o status
    if (!this.modalProblema) {
      this.currentItem.status = 'sim';
    }
  }

  saveProblema() {
    if (this.currentItem) {
      this.currentItem.problema = this.modalProblema;
    }
    this.showModal = false;
  }


  proximo() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  anterior() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  async finalizar() {
    this.isLoading = true;
    let key = null;
    let keyId = localStorage.getItem('keyId');

    if (keyId) {
      key = parseInt(keyId) + 1;
    }

    if (!key) {
      key = 1;
    }

    const checklistFinal = {
      data: new Date(),
      respostas: this.steps,
      frota: 'HUF-5544'
    };


    await this.dataService.saveLocal({
      key: key,
      model: 'checklist',
      ...checklistFinal,
      criado_em: new Date().toISOString()
    });

    localStorage.setItem('keyId', key.toString());

    this.isLoading = false;
  }
}
