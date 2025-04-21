import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientInformationComponent } from './patient-information/patient-information.component';
import { ImplantVariantComponent } from './implant-variant/implant-variant.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
      if (localStorage.getItem('isLoggedIn') === 'true') {
          return true;
      } else {
          this.router.navigate(['/login']);
          return false;
      }
  }
}

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patient-information', component: PatientInformationComponent },
  { path: 'implant-variant', component: ImplantVariantComponent},
  { path: '**', redirectTo: '/dashboard' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
