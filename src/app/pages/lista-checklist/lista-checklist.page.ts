import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList, IonNote,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {addIcons} from "ionicons";
import {chevronForward, star} from "ionicons/icons";
import {DataService} from "../../services/data/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-checklist',
  templateUrl: './lista-checklist.page.html',
  styleUrls: ['./lista-checklist.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ToolbarComponent, IonList, IonItem, IonLabel, IonIcon, IonNote]
})
export class ListaChecklistPage implements OnInit {
  checklists: any[] = [];

  constructor(private dataService: DataService, private router: Router) {
    addIcons({chevronForward})
  }

  ngOnInit() {
    this.buscaChecklists();
  }

  buscaChecklists() {
    this.dataService.getPending().then(results => {
      results.filter((result: any) => {
        if (result.model === 'checklist') {
          this.checklists.push(result);
        }
      })
    });

    console.log(this.checklists);
  }


  navigateTo(checklist: any) {
    this.router.navigate(['/checklist-item/', checklist.key]);
  }
}
