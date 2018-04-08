import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'app/login/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isValidInput = true;
  
  constructor(private auth: Auth, private router:Router) {
    auth.isResetSuccess = null;
  }

  ngOnInit() {
  }

  backToLogin() {
    this.router.navigate(['login']);
  }

  changePassword(email) {
    this.isValidInput = true;
    if(email.trim().length <=0) {
      this.isValidInput = false;
    } else {
      this.auth.changePassword(email);
    }
  }
}
