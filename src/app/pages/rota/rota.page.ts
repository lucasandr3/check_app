import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {InfoHeaderComponent} from "../../components/info-header/info-header.component";

@Component({
  selector: 'app-rota',
  templateUrl: './rota.page.html',
  styleUrls: ['./rota.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ToolbarComponent, InfoHeaderComponent]
})
export class RotaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
