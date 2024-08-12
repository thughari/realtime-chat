import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Store the URL that the user attempted to access
  redirectUrl: string | null = null;

  constructor(private auth: Auth, private router: Router) {}

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(() => {
      // Redirect to the original route after login
      const redirectUrl = this.redirectUrl || '/chat';  // Default to /chat if no redirectUrl
      this.redirectUrl = null;  // Clear the redirectUrl after using it
      this.router.navigate([redirectUrl]);
    }).catch(error => {
      console.error('Error during sign-in:', error);
    });
  }

  signOut() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
