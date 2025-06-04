import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCard,
  IonContent,
  IonIcon,
  IonInput, IonLabel, IonLoading,
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {
  checkmarkOutline
} from "ionicons/icons";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {InfoHeaderComponent} from "../../components/info-header/info-header.component";
import {DataService} from "../../services/data/data.service";
import {NgxMaskDirective} from "ngx-mask";

@Component({
  selector: 'app-abastecimento',
  templateUrl: './abastecimento.page.html',
  styleUrls: ['./abastecimento.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonInput, IonButton, IonIcon, ToolbarComponent, InfoHeaderComponent, IonLoading, NgxMaskDirective, IonLabel, IonCard]
})
export class AbastecimentoPage implements OnInit {
  isLoading: boolean = false;
  tanqueUm: string = '';
  tanqueDois: string = '';
  tanqueArla: string = '';
  total: number = 0;
  totalArla: number = 0;
  preco: string = '';
  precoArla: string = '';
  valorTotal: number = 0;
  valorTotalArla: number = 0;
  totalAbastecido: number = 0;

  constructor(private dataService: DataService) {
    addIcons({
      checkmarkOutline
    });
  }

  ngOnInit() {
  }

  setTanqueUm(event: any) {
    this.tanqueUm = event.target.value ?? 0;
    this.total = Number(this.tanqueUm) + Number(this.tanqueDois);
    this.preco = this.preco.replace(',', '.');
    this.valorTotal = (this.total * Number(this.preco));
    this.totalAbastecido = this.valorTotal;
  }

  setTanqueDois(event: any) {
    this.tanqueDois = event.target.value ?? 0;
    this.total = Number(this.tanqueDois) + Number(this.tanqueUm);
    this.valorTotal = (this.total * Number(this.preco));
    this.totalAbastecido = this.valorTotal;
  }

  setTanqueArla(event: any) {
    if (event.target.value == '') {
      this.totalArla = 0;
      this.tanqueArla = '';
      return
    }

    this.tanqueArla = event.target.value;
    this.totalArla = event.target.value;
    this.valorTotalArla = (this.totalArla * Number(this.precoArla));
    this.totalAbastecido = this.valorTotal + this.valorTotalArla;
  }

  async salvarAbastecimento() {
    this.isLoading = true;
    const data = {
      abastecimento: {
        tanqueUm: this.tanqueUm,
        tanqueDois: this.tanqueDois,
        tanqueArla: this.tanqueArla,
        precoCombustivel: this.preco,
        precoArla: this.precoArla,
        valorTotal: this.totalAbastecido,
        valorTotalArla: this.valorTotalArla,
        valorTotalCombustivel: this.valorTotal
      }
    };

    await this.dataService.saveLocal({
      ...data,
      criado_em: new Date().toISOString()
    });
    this.limpar();
    this.isLoading = false;
  }

  limpar() {
    this.tanqueUm = '';
    this.tanqueDois = '';
    this.tanqueArla = '';
    this.total = 0;
    this.totalArla = 0;
  }
}
