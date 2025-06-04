import {Component, Input, OnInit} from '@angular/core';
import {IonCard} from "@ionic/angular/standalone";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-info-header',
  templateUrl: './info-header.component.html',
  styleUrls: ['./info-header.component.scss'],
  imports: [
    IonCard,
    NgIf
  ]
})
export class InfoHeaderComponent  implements OnInit {
  @Input() label1l!: string;
  @Input() value1l!: string;
  @Input() label2l!: string;
  @Input() value2l!: string;
  @Input() label1r!: string;
  @Input() value1r!: string;
  @Input() label2r!: string;
  @Input() value2r!: string;
  @Input() label1c!: string;
  @Input() value1c!: string;
  @Input() label2c!: string;
  @Input() value2c!: string;
  constructor() { }

  ngOnInit() {}

}
