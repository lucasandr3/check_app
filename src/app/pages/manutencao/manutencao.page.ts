import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonTextarea,
  IonToggle,
} from '@ionic/angular/standalone';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {InfoHeaderComponent} from "../../components/info-header/info-header.component";
import {addIcons} from "ionicons";
import {checkmark} from "ionicons/icons";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.page.html',
  styleUrls: ['./manutencao.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ToolbarComponent, InfoHeaderComponent, IonItem, IonList, IonListHeader, IonCheckbox, IonTextarea, IonButton, IonIcon]
})
export class ManutencaoPage implements OnInit {
  isLoading: boolean = false;
  cavaloToggle = false;
  carretaToggle = false;
  cavalo: boolean = false;
  carreta: boolean = false;
  descricao: string = '';

  constructor(private dataService: DataService) {
    addIcons({checkmark})
  }

  ngOnInit() {
  }

  cavaloChange(event: CustomEvent) {
    this.cavalo = event.detail.checked;
  }

  carretaChange(event: CustomEvent) {
    this.carreta = event.detail.checked;
  }

  descricaoChange(event: CustomEvent) {
    this.descricao = event.detail.value;
  }

  async salvarManutencao() {
    this.isLoading = true;
    const data = {
      manutencao: {
        cavalo: this.cavalo,
        carreta: this.carreta,
        descricao: this.descricao
      }
    }

    await this.dataService.saveLocal({
      ...data,
      criado_em: new Date().toISOString()
    });
    this.limpar();
    this.isLoading = false;
  }

  limpar () {
    this.cavalo = false;
    this.carreta = false;
    this.descricao = '';
  }
}
