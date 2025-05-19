import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TorneigListComponent } from './components/Torneig/torneig-list/torneig-list.component';
import { ClassificacioListComponent } from './components/Classificacio/classificacio-list/classificacio-list.component';
import { EquipListComponent } from './components/Equip/equip-list/equip-list.component';
import { TorneigNewComponent } from './components/Torneig/torneig-new/torneig-new.component';
import LoginComponent from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { isUserAutenticatedGuard } from './guards/auth.guard';
import { EquipNewComponent } from './components/Equip/equip-new/equip-new.component';
import { UserEditComponent } from './components/User/user-edit/user-edit.component';
import { UserListComponent } from './components/User/user-list/user-list.component';
import { JocNewComponent } from './components/Joc/joc-new/joc-new.component';
import { ModeJocNewComponent } from './components/ModeJoc/mode-joc-new/mode-joc-new.component';
import { MapaNewComponent } from './components/Mapa/mapa-new/mapa-new.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },

  { path: 'torneig-list', component: TorneigListComponent, canActivate: [isUserAutenticatedGuard] },
  { path: 'torneig-new', component: TorneigNewComponent, canActivate: [isUserAutenticatedGuard] },

  { path: 'clasificacio-list', component: ClassificacioListComponent, canActivate: [isUserAutenticatedGuard] },

  { path: 'equip-list', component: EquipListComponent, canActivate: [isUserAutenticatedGuard] },
  { path: 'equip-new', component: EquipNewComponent, canActivate: [isUserAutenticatedGuard] },

  { path: 'user-edit', component: UserEditComponent, canActivate: [isUserAutenticatedGuard] },
  { path: 'user-list', component: UserListComponent, canActivate: [isUserAutenticatedGuard] },

  { path: 'joc-new', component: JocNewComponent, canActivate: [isUserAutenticatedGuard] },

  { path: 'mode-joc-new', component: ModeJocNewComponent, canActivate: [isUserAutenticatedGuard] },

  { path: 'mapa-new', component: MapaNewComponent, canActivate: [isUserAutenticatedGuard] },

  //LOGIN
  { path: 'login', component: LoginComponent },

  //SIGN UP
  { path: 'signup', component: SignupComponent},

  // Default redirection to 'welcome'
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },

  // Wildcard route for 404
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' }
];