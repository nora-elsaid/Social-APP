import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { Comment } from './models/comment.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-post',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-post.component.html',
  styleUrl: './comment-post.component.css',
})
export class CommentPostComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  content: FormControl = new FormControl("");
  saveFile!:File ;
  imgUrlComment:string | ArrayBuffer | null | undefined;
  userId:string = "" ;
  @Input() postId:string = "";
  @Input() postUserId:string = "";
  commentsList:Comment[] =[];
  ngOnInit(): void {
    this.getPostComment();
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
  }

  getPostComment():void{
    this.commentsService.getPostComment(this.postId).subscribe({
      next:(res)=>{
        console.log(res);
        this.commentsList= res.data.comments;
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
      console.log("savefile",this.saveFile);
      
      // show file in html 
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.saveFile);
      fileReader.onload = (e:ProgressEvent<FileReader>)=>{
        this.imgUrlComment= e.target?.result;
        
        
      }
    }
  }

  submitForm(e:Event, form:HTMLFormElement):void{
    e.preventDefault();
    console.log(this.content.value);   
    console.log(this.saveFile);

    const formData = new FormData()
    if(this.content.value){formData.append('content' , this.content.value);}
    

    if(this.saveFile){
      formData.append('image' , this.saveFile);
    }

    this.commentsService.createComment(this.postId,formData).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.success){
          form.reset();
          this.imgUrlComment = "";
          this.getPostComment();
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

  deleteCommentItem(commentId:string):void{
    this.commentsService.deleteComment(this.postId,commentId).subscribe({
      next:(res)=>{
        console.log((res));
        if(res.success){
          this.getPostComment();
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
