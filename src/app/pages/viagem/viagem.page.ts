import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader, IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {addIcons} from "ionicons";
import {documentAttach, fastFood, person, wallet} from "ionicons/icons";

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.page.html',
  styleUrls: ['./viagem.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ToolbarComponent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon]
})
export class ViagemPage implements OnInit {
  menus: any[] = [
    {
      titulo: 'Reembolso',
      descricao: 'Reembolsados pela empresa',
      icon: 'wallet',
      route:'/viagem',
      id: 0
    },
    {
      id: 1,
      titulo: 'Alimentação',
      descricao: 'Informar gastos com alimentação',
      icon: 'fast-food',
      route: '/abastecimento'
    },
    {
      id: 2,
      titulo: 'Cuidado Pessoal',
      descricao: 'Gastos com cuidado pessoal',
      icon: 'person',
      route:'/manutencao'
    },
    {
      id: 3,
      titulo: 'Acerto de Viagem',
      descricao: 'Acerto da viagem',
      icon: 'document-attach',
      route:'/manutencao'
    },
  ];

  constructor() {
    addIcons({wallet, fastFood, person, documentAttach})
  }

  ngOnInit() {
  }

}
