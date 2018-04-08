import { Component } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { NewAppDialogComponent } from '../../../../app/shared/dialogs/new-app/new-app.component';
import { DataService } from '../../../../app/shared/data/data.service';
import {ListingComponent} from '../../../../app/listing/listing.component';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private list: ListingComponent, private dialog: MdDialog, private data: DataService) {}

  addNewApp() {
    let dialogRef = this.dialog.open(NewAppDialogComponent);
    dialogRef.afterClosed().subscribe(ev => ev && this.data.saveNewApplication(ev).subscribe((res)=>{this.data.addtoTop(res)}));
     }
}
