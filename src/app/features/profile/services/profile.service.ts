import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient = inject(HttpClient);

  getUserPosts(userId:string):Observable<any>{
    return this.httpClient.get(environment.basUrl+`/users/${userId}/posts`);
  }

  getUserProfile(userId:string):Observable<any>{
    return this.httpClient.get(environment.basUrl+`/users/${userId}/profile`);
  }

  getBookmarksPosts(userId:string):Observable<any>{
    return this.httpClient.get(environment.basUrl+`/users/bookmarks`);
  }
  
}
