import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'password123';
  
    console.log('Entered Username:', this.username);
    console.log('Entered Password:', this.password);
  
    if (this.username === hardcodedUsername && this.password === hardcodedPassword) {
      console.log('Login successful!');
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Invalid credentials');
      alert('Invalid username or password');
    }
  }
  
}
