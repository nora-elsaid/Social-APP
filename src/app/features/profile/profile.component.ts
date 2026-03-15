import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { Post } from '../../core/models/post.interface';
import { PUser } from '../../core/models/user.interface';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit{
  userId:string = "" ;
  userName:string = "";
  userImage:string | ArrayBuffer | null | undefined;
  posts:Post[]=[];
  savedposts:Post[]=[];
  userprofile!:PUser;
  activeTab:'posts'|'saved'='posts'

  private readonly profileService = inject(ProfileService);
  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('socialUser')!)?.name;
    this.userImage = JSON.parse(localStorage.getItem('socialUser')!)?.photo;
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    this.getUserPofile();
    this.getUserPosts();
  }

  getUserPosts():void{
    this.profileService.getUserPosts(this.userId).subscribe({
      next:(res)=>{
        console.log(res.data.posts);
        this.posts=res.data.posts;
      },
      error:(err)=>{console.log(err);
      }
    })
  }

  getSavedPosts():void{
    this.profileService.getBookmarksPosts(this.userId).subscribe({
      next:(res)=>{
        console.log(res.data.posts);
        this.savedposts=res.data.posts;
      },
      error:(err)=>{console.log(err);
      }
    })
  }

  getUserPofile():void{
    this.profileService.getUserProfile(this.userId).subscribe({
      next:(res)=>{
        console.log(res.data.user);
        this.userprofile=res.data.user;
        console.log(this.userprofile);
        
      },
      error:(err)=>{console.log(err);
      }
    })
  }

  changeTab(tab:'posts'|'saved'){
    this.activeTab=tab;
    if(tab==='posts'){
      this.getUserPosts();
    }
    if(tab==='saved'){
      this.getSavedPosts();
    }
  }

}
