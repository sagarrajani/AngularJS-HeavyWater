import { Component, OnInit, Input } from '@angular/core';
import { Application } from '../../../app/shared/data/application.model';
import { CommonModule } from "@angular/common"

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() private item: Application = new Application;

  constructor() { }

  ngOnInit() {
  }

}
