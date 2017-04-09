import { ActivityLookup } from './../models/actLookUp';
import { AuthService } from './auth.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ActLookupService {

constructor(private http : Http, private authService : AuthService) {}

  //create ActLookup
  create(actLookup : ActivityLookup) {

    actLookup.createdBy = this
      .authService
      .getCurrentUser();
    console.log('posting ActLookup from service: ' + actLookup);
    //return this.http.post('/api/user', JSON.stringify(user), this.options);
    return this
      .http
      .post('/api/actLookup', actLookup)
      .map((response : Response) => response.json());
  }
  ///////////////////////////////////////////////// get all ActLookup
  getAll() {
    return this
      .http
      .get('/api/actLookup/all')
      .map((response : Response) => response.json());
  }
  ///////////////////////////////////////////////// update ActLookup
  update(actLookup : ActivityLookup) {
    actLookup.createdBy = this
      .authService
      .getCurrentUser();
    console.log('putting/updating ActLookup from service: ' + actLookup);

    return this
      .http
      .put('/api/actLookup', actLookup)
      .map((response : Response) => response);
  }
  /////////////////////////////////////////////////////////// delete actLookup
  delete(id : String) {
    return this
      .http
      .delete('/api/actLookup/' + id)
      .map((response : Response) => response);
  }
}
