import { NgModule } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//PRIMENG
import { AccordionModule } from 'primeng/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EquipListComponent } from './Equip/equip-list/equip-list.component';
import { RouterModule } from '@angular/router';
import { TorneigListComponent } from './Torneig/torneig-list/torneig-list.component';
import { JocListComponent } from './Joc/joc-list/joc-list.component';
import { ModeJocListComponent } from './ModeJoc/mode-joc-list/mode-joc-list.component'; 
import { PartidaListComponent } from './Partida/partida-list/partida-list.component';
import { PremiListComponent } from './Premi/premi-list/premi-list.component';
import { TipusUserListComponent } from './TipusUser/tipus-user-list/tipus-user-list.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { EquipCreateComponent } from './Equip/equip-create/equip-create.component';
import { JocCreateComponent } from './Joc/joc-create/joc-create.component';
import { ModeJocCreateComponent } from './ModeJoc/mode-joc-create/mode-joc-create.component';
import { PartidaCreateComponent } from './Partida/partida-create/partida-create.component';
import { PremiCreateComponent } from './Premi/premi-create/premi-create.component';
import { TipusUserCreateComponent } from './TipusUser/tipus-user-create/tipus-user-create.component';
import { TorneigCreateComponent } from './Torneig/torneig-create/torneig-create.component';
import { UserCreateComponent } from './User/user-create/user-create.component';
import { EquipEditComponent } from './Equip/equip-edit/equip-edit.component';
import { JocEditComponent } from './Joc/joc-edit/joc-edit.component';
import { ModeJocEditComponent } from './ModeJoc/mode-joc-edit/mode-joc-edit.component';
import { PartidaEditComponent } from './Partida/partida-edit/partida-edit.component';
import { PremiEditComponent } from './Premi/premi-edit/premi-edit.component';
import { TipusUserEditComponent } from './TipusUser/tipus-user-edit/tipus-user-edit.component';
import { TorneigEditComponent } from './Torneig/torneig-edit/torneig-edit.component';
import { UserEditComponent } from './User/user-edit/user-edit.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomeComponent,
    EquipListComponent,
    TorneigListComponent,
    JocListComponent,
    ModeJocListComponent,
    PartidaListComponent,
    PremiListComponent,
    TipusUserListComponent,
    UserListComponent,
    EquipCreateComponent,
    JocCreateComponent,
    ModeJocCreateComponent,
    PartidaCreateComponent,
    PremiCreateComponent,
    TipusUserCreateComponent,
    TorneigCreateComponent,
    UserCreateComponent,
    EquipEditComponent,
    JocEditComponent,
    ModeJocEditComponent,
    PartidaEditComponent,
    PremiEditComponent,
    TipusUserEditComponent,
    TorneigEditComponent,
    UserEditComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccordionModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
