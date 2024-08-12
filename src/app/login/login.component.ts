import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  signIn() {
    this.authService.signInWithGoogle().then(() => {
      // The redirection is handled within the AuthService after a successful login.
      console.log('User signed in successfully');
    }).catch(error => {
      console.error('Sign-in error:', error);
    });
  }
}
