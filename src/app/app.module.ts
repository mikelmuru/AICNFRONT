import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GetImageComponent } from './get-image/get-image.component';
import { PostImageComponent } from './post-image/post-image.component';
import { MaterialModule } from './material/material.module';
import { rutas } from './rutas/rutas.module';
import { VistaInicioComponent } from './vista-inicio/vista-inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    GetImageComponent,
    PostImageComponent,
    VistaInicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
