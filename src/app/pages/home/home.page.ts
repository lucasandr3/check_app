import {Component, OnInit} from '@angular/core';
import {
  IonContent,
  IonList,
  IonItem,
  IonRouterLink,
  IonLabel,
  IonNote,
} from '@ionic/angular/standalone';
import {
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkDoneOutline,
  location,
  construct,
  documentText, logOut,
  people,
  server,
  thermometer,
  time,
  trailSign, settings, map
} from "ionicons/icons";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonIcon, IonList, IonItem, IonRouterLink, IonLabel, IonNote, NgForOf, NgIf, RouterLink, ToolbarComponent],
})
export class HomePage implements OnInit {
  syncing = false;
  menus: any[] = [
    {
      titulo: 'Controle de Viagem',
      descricao: 'Controle das etapas da viagem',
      icon: 'location',
      route:'/viagem',
      id: 0
    },
    {
      id: 1,
      titulo: 'Abastecimento',
      descricao: 'Informar as quantidades abastecidas',
      icon: 'thermometer',
      route: '/abastecimento'
    },
    {
      id: 2,
      titulo: 'Manutenção',
      descricao: 'Informar problema(s), para a manutenção',
      icon: 'construct',
      route:'/manutencao'
    },
    {
      id: 3,
      titulo: 'Espera',
      descricao: 'Informar tempo no pátio de espera',
      icon: 'time',
      route:'/espera'
    },
    {
      id: 4,
      titulo: 'Rota',
      descricao: 'Informar ocorrências',
      icon: 'map',
      route:'/rota'
    },
    {
      id: 5,
      titulo: 'Troca de Motorista',
      descricao: 'Informar a troca de motorista',
      icon: 'people',
      route:'/motorista'
    },
    {
      id: 6,
      titulo: 'Checklist',
      descricao: 'Realizar o checklist do veículo',
      icon: 'document-text',
      route:'/menu-checklist'
    },
    {
      id: 7,
      titulo: 'Dados Pendentes',
      descricao: 'Sincronizar dados pendentes com o servidor',
      icon: 'server',
      route:'/sincronizar'
    },
    {
      id: 8,
      titulo: 'Configuração',
      descricao: 'Configurações do app',
      icon: 'settings',
      route:'/configuracao'
    },
    {
      id: 9,
      titulo: 'Sair do Aplicativo',
      descricao: '',
      icon: 'log-out',
      route:'/dados'
    }
  ];
  constructor(private dataService: DataService) {
    addIcons({
      checkmarkDoneOutline,
      location,
      thermometer,
      construct,
      time,
      trailSign,
      people,
      documentText,
      server,
      logOut,
      settings,
      map
    });
  }

  ngOnInit() {
    this.dataService.syncing$.subscribe(value => {
      console.log("sincyng ", value)
      this.syncing = value;
    });
  }
}
