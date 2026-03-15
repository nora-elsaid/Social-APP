import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgetPasswordComponent } from './features/forget-password/forget-password.component';
import { FeedComponent } from './features/feed/feed.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/auth/guards/auth-guard';
import { guestGuard } from './core/auth/guards/guest-guard';
import { DetailsComponent } from './features/details/details.component';

export const routes: Routes = [
    {path:'', redirectTo:'login' ,pathMatch:"full"},
    {path:"" , component:AuthLayoutComponent, canActivate:[guestGuard] , children: [
        {path:"login" , component:LoginComponent , title:'Login Page'},
        {path:"register" , component:RegisterComponent , title:'Register Page'},
        {path:"forget" , component:ForgetPasswordComponent , title:'Forget Password Page'}
    ]},
    {path:"", component:MainLayoutComponent , canActivate:[authGuard], children:[
        {path:"feed" , component:FeedComponent , title:'Timeline Page' },
        {path:"profile" , component:ProfileComponent , title:'Profile Page'},
        {path:"notifications" , component:NotificationsComponent , title:'Notification Page'},
        {path:"change" , component:ChangePasswordComponent , title:'Chane Password Page'},
        {path:"details/:id" , component:DetailsComponent , title:'Details Page'}

    ]},
    {path:'**', component:NotfoundComponent , title:'Notfound Page'}
];
