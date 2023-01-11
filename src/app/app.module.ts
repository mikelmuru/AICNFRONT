import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GetImageComponent } from './componentes/get-image/get-image.component';
import { PostImageComponent } from './componentes/post-image/post-image.component';
import { MaterialModule } from './material/material.module';
import { rutas } from './rutas/rutas.module';
import { VistaInicioComponent } from './componentes/vista-inicio/vista-inicio.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TryAppComponent } from './componentes/try-app/try-app.component';

@NgModule({
  declarations: [
    AppComponent,
    GetImageComponent,
    PostImageComponent,
    VistaInicioComponent,
    NavbarComponent,
    TryAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(rutas),
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
