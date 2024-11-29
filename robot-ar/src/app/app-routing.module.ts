import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {RobotModelComponent} from "./components/robot-model/robot-model.component";

export const routes: Routes = [
    { path: 'robot-model/:robotType', component: RobotModelComponent },
    { path: '', redirectTo: 'robot-model', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
