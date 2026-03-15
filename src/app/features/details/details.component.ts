import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { Post } from '../../core/models/post.interface';
import { CommentPostComponent } from "../feed/components/feed-content/components/comment-post/comment-post.component";

@Component({
  selector: 'app-details',
  imports: [CommentPostComponent, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);
  postId:string = "";
  userId:string = "" ;
  post:Post = {} as Post;

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    this.getId();
    this.getPostDetail();
    
  }

  getId():void{
    this.activatedRoute.paramMap.subscribe((param)=>{
      console.log(param.get('id'));
      this.postId =param.get('id')!;
      
    })

  }

  getPostDetail():void{
    this.postsService.getSinglePost(this.postId).subscribe({
      next:(res)=>{
        console.log(res);
        this.post=res.data.post;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  deletePostItem(postId:string):void{
    this.postsService.deletePost(postId).subscribe({
      next:(res)=>{
        console.log((res));       
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
