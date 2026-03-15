import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly httpClient=inject(HttpClient);

  getNotifications():Observable<any>{
    return this.httpClient.get(environment.basUrl+'/notifications?unread=false&page=1&limit=10');
  }

  markNotificationAsRead(id:string):Observable<any>{
    return this.httpClient.patch(environment.basUrl+`/notifications/${id}/read`,null);
  }
}
