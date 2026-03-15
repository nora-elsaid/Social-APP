import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Notification } from './models/notification.interface';


@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit{
  private readonly notificationService =inject(NotificationService);
  notifications:Notification[]=[];
  isRead:boolean=false;

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications():void{
    this.notificationService.getNotifications().subscribe({
      next:(res)=>{
        console.log(res.data.notifications);
        this.notifications=res.data.notifications;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  markAsRead(id:string):void{
    this.notificationService.markNotificationAsRead(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.isRead=true;       
      },
      error:(err)=>{
        console.log(err);
        
      },
      complete:()=>{this.isRead=false}
    })
  }

}
