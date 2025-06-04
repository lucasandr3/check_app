import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";

@Component({
  selector: 'app-sincronizar',
  templateUrl: './sincronizar.page.html',
  styleUrls: ['./sincronizar.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ToolbarComponent]
})
export class SincronizarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
