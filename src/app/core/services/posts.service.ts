import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);
  header:object = {
    headers:{
      'AUTHORIZATION': `Bearer ${localStorage.getItem('socialToken')}`
    }
  }

  getAllPosts():Observable<any>{
    return this.httpClient.get(environment.basUrl + `/posts` , this.header)
  }

  createPost(data:object):Observable<any>{
    return this.httpClient.post(environment.basUrl + `/posts` , data , this.header)
  }

  updatePost(data:object,id:string):Observable<any>{
    return this.httpClient.put(environment.basUrl + `/posts/${id}` , data , this.header)
  }

  getSinglePost(postId:string):Observable<any>{
    return this.httpClient.get(environment.basUrl + `/posts/${postId}` , this.header)
  }

  deletePost(postId:string):Observable<any>{
    return this.httpClient.delete(environment.basUrl + `/posts/${postId}` , this.header)
  }
  
}
