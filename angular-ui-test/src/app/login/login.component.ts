import { Component,Input  } from '@angular/core';
import { Auth } from './auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLoginPage = true;
  isValidInput = true;
  currentURL='';
  img = "";
  constructor(private sanitizer: DomSanitizer,private auth: Auth, private router: Router) {
    this.currentURL=window.location.hostname.split(".")[0];
    console.log(this.currentURL); 
    this.img = '/assets/'+this.currentURL+'.png';
    document.body.style.backgroundImage = "url("+this.img+")";  
    document.body.style.backgroundSize = "100% auto"; 
    auth.isLoginFailed = false;
    if(auth.authenticated()) {
      this.router.navigate(['/']);
    }
  }
  
  login(username, password, rememberme) {
    this.isLoginPage = true;
    this.isValidInput = true;

    if(username.trim().length <= 0 || password.trim().length <= 0) {
      this.isValidInput = false;
    } else {
      this.auth.login(username.trim(), password.trim(), rememberme);
    }
  }
  forgotPassword() {
    this.router.navigate(['forgot']);
  }
}
