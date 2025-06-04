import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonLabel,
  IonLoading,
  IonModal,
  IonNote,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonTab,
  IonTabBar,
  IonTabButton, IonTabs, IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../services/data/data.service";
import {addIcons} from "ionicons";
import {checkmark, chevronBack, chevronForward} from "ionicons/icons";

@Component({
  selector: 'app-checklist-item',
  templateUrl: './checklist-item.page.html',
  styleUrls: ['./checklist-item.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ToolbarComponent, IonButton, IonButtons, IonIcon, IonItemDivider, IonLabel, IonLoading, IonModal, IonNote, IonProgressBar, IonRadio, IonRadioGroup, IonTab, IonTabBar, IonTabButton, IonTabs, IonTextarea]
})
export class ChecklistItemPage implements OnInit {
  isLoading: boolean = false;
  currentStep = 0;
  checklist: any = {};
  checklistId: number = 0;
  constructor(private activeRoute: ActivatedRoute, private dataService: DataService, private router: Router) {
    addIcons({chevronBack, chevronForward})
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.checklistId = parseInt(params['id']) ?? 0;
    })

    this.dataService.getPending().then(results => {
      results.filter((result: any) => {
        if (result.model === 'checklist') {
          if (result.key === this.checklistId) {
            this.checklist = result;
          }
        }
      });
    })
  }

  proximo() {
    if (this.currentStep < this.checklist.respostas.length - 1) {
      this.currentStep++;
    }
  }

  anterior() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
}
