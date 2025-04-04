import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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


  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
