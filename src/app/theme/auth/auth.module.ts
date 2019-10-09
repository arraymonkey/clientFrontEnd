import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ForgotComponent} from './forgot/forgot.component';
import {LockScreenComponent} from './lock-screen/lock-screen.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authentication',
      status: false
    },
    children: [
      {
        path: 'login',
        loadChildren: ()=> import('./login/login.module').then(m=>m.LoginModule)
      },
      {
        path: 'forgot',
        loadChildren: ()=> import('./forgot/forgot.module').then(m=>m.ForgotModule)
      },
      {
        path: 'lock-screen',
        loadChildren: ()=> import('./lock-screen/lock-screen.module').then(m=>m.LockScreenModule)
      }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class AuthModule {
}
