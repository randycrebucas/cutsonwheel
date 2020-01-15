import { Component, OnInit, OnDestroy } from '@angular/core';
import { Classifications } from 'src/app/classifications/classifications';
import { Observable, Subscription, of } from 'rxjs';
import { ClassificationsService } from 'src/app/classifications/classifications.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.page.html',
  styleUrls: ['./skill.page.scss'],
})
export class SkillPage implements OnInit, OnDestroy {
  private authSub: Subscription;
  user: firebase.User;

  classifications: Observable<Classifications[]>;
  classificationSelected: string;
  experienceLevel: string;

  constructor(
    private authService: AuthService,
    private classificationsService: ClassificationsService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    // load all classifications
    this.classifications = this.classificationsService.getClassifications();

    // check user current state
    this.authSub = this.authService.getUserState().pipe(
      switchMap(user => {
        if (user) {
          this.user = user;
          return this.usersService.getUser(user.uid);
        } else {
          return of(null);
        }
      })
    ).subscribe( profile => {
      // make sure return an object
        if (this.user) {
          this.classificationSelected = (profile.skills) ? profile.skills.name : '';
          this.experienceLevel = (profile.skills) ? profile.skills.level : '';
        }
    });
  }

  onPickedSkill(classification: string) {
    this.classificationSelected = classification;
  }

  levelSelected(event: CustomEvent) {
    this.experienceLevel = event.detail.value;
  }

  onNext() {
    // make sure required field not empty
    if (!this.classificationSelected || !this.experienceLevel) {
      return;
    }
    const data = {
      id: this.user.uid,
      isSetupCompleted: true,
      skills: {
        name: this.classificationSelected,
        level: this.experienceLevel
      }
    };
    // update user profile
    this.usersService.update(data).then(() => {
      this.router.navigateByUrl('/t/services/discover');
    });
  }

  onChangeExpertise() {
    this.classificationSelected = null;
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
