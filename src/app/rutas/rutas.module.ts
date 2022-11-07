import { Routes } from '@angular/router';
import { PostImageComponent } from '../componentes/post-image/post-image.component';
import { GetImageComponent } from '../componentes/get-image/get-image.component';
import { VistaInicioComponent } from '../componentes/vista-inicio/vista-inicio.component';

export const rutas: Routes = [
  { path: '', component: VistaInicioComponent},
  { path: 'postimage', component: PostImageComponent },
  { path: 'getimage', component: GetImageComponent }
  
];
