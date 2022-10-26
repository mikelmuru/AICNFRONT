import { Routes } from '@angular/router';
import { PostImageComponent } from '../post-image/post-image.component';
import { GetImageComponent } from '../get-image/get-image.component';
import { VistaInicioComponent } from '../vista-inicio/vista-inicio.component';

export const rutas: Routes = [
  { path: '', component: VistaInicioComponent},
  { path: 'postimage', component: PostImageComponent },
  { path: 'getimage', component: GetImageComponent }
  
];
