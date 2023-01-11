import { Routes } from '@angular/router';
import { PostImageComponent } from '../componentes/post-image/post-image.component';
import { GetImageComponent } from '../componentes/get-image/get-image.component';
import { VistaInicioComponent } from '../componentes/vista-inicio/vista-inicio.component';
import { TryAppComponent } from '../componentes/try-app/try-app.component';

export const rutas: Routes = [
  { path: "", component: VistaInicioComponent },
  { path: "evaluar", component: PostImageComponent },
  { path: "buscar", component: GetImageComponent },
  { path: "probar", component: TryAppComponent }
];
