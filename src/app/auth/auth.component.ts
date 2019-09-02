import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (!this.isLoginMode) {
      authObs = this.authService.onSignUp(form.value);
    } else {
      authObs = this.authService.onLogin(form.value);
    }

    authObs.subscribe(
      resData => {
        // console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        // console.log(errorMessage);
        this.errorMessage = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
