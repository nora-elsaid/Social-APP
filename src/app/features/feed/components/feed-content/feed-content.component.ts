import { PostsService } from './../../../../core/services/posts.service';
import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../../../core/models/post.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentPostComponent } from './components/comment-post/comment-post.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-feed-content',
  imports: [ReactiveFormsModule, CommentPostComponent, RouterLink,FormsModule],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit{
  private readonly postsService = inject(PostsService);
  content: FormControl = new FormControl("");
  privacy: FormControl = new FormControl("public");

  postList:Post[] = [];
  userId:string = "" ;
  userName:string = "";
  userImage:string | ArrayBuffer | null | undefined;
  saveFile!:File ;
  imgUrl:string | ArrayBuffer | null | undefined;
  editingPostId: string | null = null;
  editingText = '';
  liked!:boolean;

  ngOnInit(): void {
    this.getAllPostsData();
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    this.userName = JSON.parse(localStorage.getItem('socialUser')!)?.name;
    this.userImage = JSON.parse(localStorage.getItem('socialUser')!)?.photo;
  }

  getAllPostsData():void{
    this.postsService.getAllPosts().subscribe({
      next:(res)=>{
        // console.log(res.data.posts);
        this.postList = res.data.posts;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  changeImage(e:Event):void{
    const input = e.target as HTMLInputElement;
    if(input.files && input.files.length>0){
      console.log(input.files[0]);
      this.saveFile = input.files[0];

      // show file in html 
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.saveFile);
      fileReader.onload = (e:ProgressEvent<FileReader>)=>{
        this.imgUrl= e.target?.result;
      }
    }
  }

 

  submitForm(e:Event, form:HTMLFormElement):void{
    e.preventDefault();
    console.log(this.content.value);
    console.log(this.privacy.value);
    console.log(this.saveFile);

    const formData = new FormData()
    if(this.content.value){formData.append('body' , this.content.value);}
    if(this.privacy.value){
      formData.append('privacy' , this.privacy.value);
    }

    if(this.saveFile){
      formData.append('image' , this.saveFile);
    }

    this.postsService.createPost(formData).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.success){
          form.reset();
          this.imgUrl = "";
          this.getAllPostsData();
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

  updatePostItem(post: Post): void {
    const formData = new FormData();
    if(post.body) formData.append('body', post.body);
    if(post.privacy) formData.append('privacy', post.privacy);
    if(post.image) formData.append('image', post.image); // لو بتحملي صورة جديدة للبوست
  
    this.postsService.updatePost(formData,post._id).subscribe({
      next: (res) => {
        post.body = this.editingText
      this.editingPostId = null
        // if(res.success){
        //   console.log('Post updated', res.data);
        //   this.getAllPostsData(); // تحديث البوستات
        // }
      },
      error: (err) => console.log(err)
    });
  }

  deletePostItem(postId:string):void{
    this.postsService.deletePost(postId).subscribe({
      next:(res)=>{
        console.log((res));
        if(res.success){
          this.getAllPostsData();
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  editPost(post: Post) {
    this.editingPostId = post._id
  this.editingText = post.body
    // this.editingPostId = post._id;
    // this.content.setValue(post.body);
    // this.privacy.setValue(post.privacy);
    // this.imgUrl = post.image || "";
    // console.log(post);
    // this.editing=true;
  }

  cancelEdit() {
    // this.editing = false;
    // this.getAllPostsData(); // استرجاع البيانات الأصلية
  }

  likePost(postId:string):void{
    this.postsService.likePost(postId).subscribe({
      next:(res)=>{
        console.log(res);
        this.liked=res.data.liked;
        console.log(this.liked);
        this.getAllPostsData();
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  isLiked(post:Post){
    return post.likes.includes(this.userId)
    }
    
}
