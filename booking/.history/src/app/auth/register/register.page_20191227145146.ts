import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  authError: any;
  isRoleSelected: boolean;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.isRoleSelected = false;
  }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe( user => {
        if (user) {
          this.router.navigateByUrl('/t/services/discover');
        }
    });
  }

  onRoleSelect(value) {
    this.isRoleSelected = true;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.auth.createUser(form.value);
    form.reset();
  }
}
