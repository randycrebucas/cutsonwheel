import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ImagePicker } from 'src/app/shared/pickers/image-picker/image-picker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private authSub: Subscription;
  user: firebase.User;
  imagePicker: ImagePicker;
  
  firstname: string;
  lastname: string;
  displayName: string;
  isReadonly: boolean;
  photoURL: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.isReadonly = true;
   }

  ngOnInit() {
    this.authSub = this.authService.getUserState()
      .subscribe( user => {
        if (user) {
          console.log(user);
          this.user = user;
          this.displayName = user.displayName;
          this.photoURL = user.photoURL;
        }
    });
  }

  onNext() {
    if (!this.firstname || !this.lastname ) {
      return;
    }
    const profile = {
      firstname: this.firstname,
      lastname: this.lastname
    };
    console.log(profile);
    this.usersService.setProfile(profile, this.user.uid).then(() => {
      if (this.isReadonly) {
        this.user.updateProfile( {
          displayName: this.displayName,
          photoURL: this.photoURL
        });
      }
      console.log('next steps');
    });
  }

  onReplaceDisplayName(event: CustomEvent) {
    this.isReadonly = !this.isReadonly;
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = this.imagePicker.base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.photoURL = imageFile;
  }
}
