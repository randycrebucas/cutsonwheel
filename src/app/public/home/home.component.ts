import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { fade } from 'src/app/animations';
import { ClassificationService } from 'src/app/private/classification/classification.service';
import { Subscription } from 'rxjs';
import { ClassificationData } from 'src/app/private/classification/classification-data.model';


@Component({
  selector: 'cowls-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'cutsonwheel';
  total = 0;
  perPage = 10;
  currentPage = 1;
  classifications: any;
  isLoading = false;
  public userIsAuthenticated = false;
  private classificationSub: Subscription;

  constructor(
    private router: Router,
    public authService: AuthService,
    public classificationService: ClassificationService
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    if (this.userIsAuthenticated) {
      this.router.navigate(['/dashboard']);
    }

    this.classificationService.getAll(this.perPage, this.currentPage);
    this.classificationSub = this.classificationService.getUpdateListener()
    .subscribe((classificationData: {classifications: ClassificationData[], counts: number}) => {
      this.isLoading = false;
      this.total = classificationData.counts;
      this.classifications = classificationData.classifications;
    });
  }

  ngOnDestroy() {
    this.classificationSub.unsubscribe();
  }
}
