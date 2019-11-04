import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ClassificationData } from './classification-data.model';

const BACKEND_URL = environment.apiUrl + '/classification';

@Injectable({providedIn: 'root'})
export class ClassificationService {
  private classifications: ClassificationData[] = [];
  private classificationsUpdated = new Subject<{ classifications: ClassificationData[], counts: number }>();

  constructor(
    private http: HttpClient
  ) {}

  getAll(perPage: number, currentPage: number) {
    const queryParams = `?pagesize=${perPage}&page=${currentPage}`;
    this.http.get<{message: string, classifications: any, counts: number }>(
      BACKEND_URL + queryParams
    )
    .pipe(
      map(classificationData => {
        return { classifications: classificationData.classifications.map(classification => {
          return {
            id: classification._id,
            name: classification.name,
            slug: classification.slug,
            description: classification.description,
            image: classification.image
          };
        }), max: classificationData.counts};
      })
    )
    .subscribe((transformData) => {
      this.classifications = transformData.classifications;
      this.classificationsUpdated.next({
        classifications: [...this.classifications],
        counts: transformData.max
      });
    });
  }

  getUpdateListener() {
    return this.classificationsUpdated.asObservable();
  }

  getOne(classificationId: string) {
    return this.http.get<ClassificationData>(BACKEND_URL + '/' + classificationId);
  }

  insert(nClassification: any) {
    return this.http.post<{ message: string }>(BACKEND_URL, nClassification);
  }

  update(uClassification: any) {
    return this.http.put<{ message: string, classification: ClassificationData }>(BACKEND_URL + '/' + uClassification.id, uClassification);
  }

  delete(classificationId: []) {
    return this.http.delete<{ message: string, classification: ClassificationData }>(BACKEND_URL + '/' + classificationId);
  }

}
