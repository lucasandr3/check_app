import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader, IonCardTitle,
  IonContent,
  IonHeader, IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {addIcons} from "ionicons";
import {documentAttach, fastFood, person, wallet} from "ionicons/icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-checklist',
  templateUrl: './menu-checklist.page.html',
  styleUrls: ['./menu-checklist.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ToolbarComponent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon]
})
export class MenuChecklistPage implements OnInit {

  menus: any[] = [
    {
      titulo: 'Novo CheckList',
      descricao: 'Fazer novo checkList',
      icon: 'wallet',
      route:'/checklist',
      id: 0
    },
    {
      id: 1,
      titulo: 'Meus Checklists',
      descricao: 'CheckLists feitos por mim',
      icon: 'fast-food',
      route: '/lista-checklist'
    },
  ];

  constructor(private router: Router) {
    addIcons({wallet, fastFood, person, documentAttach})
  }

  ngOnInit(): void {
  }

  navigateTo(menu: any) {
    this.router.navigate([menu.route]);
  }

}
