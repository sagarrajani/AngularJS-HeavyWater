import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Auth } from '../../../../app/login/auth.service';
@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.scss']
})
export class NewAppDialogComponent {
  private data;
  selectedValue: string;

  period = [
    {value: '30 days', viewValue: 30},
    {value: '60 days', viewValue: 60},
    {value: '90 days', viewValue: 90}
  ];
  constructor(private auth: Auth,private dialogRef: MdDialogRef<NewAppDialogComponent>) {  }

  setData(data) {
    this.data = data;
  }

  saveApp(form) {
    let data = {
      ...form.value,
      Client_Name: this.auth.userInfo.user_metadata.client_name,
      LoanOfficer_Name : this.auth.userInfo.nickname,
      LoanOfficer_Email : this.auth.userInfo.email,
    };
    this.dialogRef.close(data);
  }
}
