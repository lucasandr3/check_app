import {Component, Input, OnInit} from '@angular/core';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {chatbox, chatbubble, chatbubbles, cloudUpload, notifications} from "ionicons/icons";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
  imports: [
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    NgIf,
    IonBackButton
  ]
})
export class ToolbarComponent  implements OnInit {
  @Input() title = 'LogiCheck';
  @Input() showMessage = false;
  @Input() showNotification = false;
  @Input() showBackButton = false;
  @Input() isSyncing = false;
  @Input() step = '';

  constructor() {
    addIcons({
      chatbubbles,
      chatbubble,
      chatbox,
      notifications,
      cloudUpload,
    })
  }

  ngOnInit() {}

}
