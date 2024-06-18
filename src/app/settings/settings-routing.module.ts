import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'changepassword',
    pathMatch: 'full',
  },
  {
    path: 'changepassword',
    component: ResetpasswordComponent,
    title: 'reset Password',
  },
  {
    path: 'editprofile',
    component: EditprofileComponent,
    title: 'edit profile',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
