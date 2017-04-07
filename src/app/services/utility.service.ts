import { SelectItem } from 'primeng/primeng';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

constructor(private http:Http) { }

//get all Category
 getAllCategories() {
    return this
      .http
      .get('/api/category/all')
      .map((response: Response) => response.json());
  }

//////////////////////////////////////////////
//get all dept
getAllDepts() {
    return this
      .http
      .get('/api/dept/all')
      .map((response : Response) => response.json());
  }
  //////////////////////////////////////////////
  //get all focuses
  getAllFocuses() {
    return this
      .http
      .get('/api/focus/all')
      .map((response : Response) => response.json());
  }
  ///////////////////////////////////////////////
  //get all phases
   getAllPhases() {
    return this
      .http
      .get('/api/phase/all')
      .map((response : Response) => response.json());
  }
  ////////////////////////////////////////////////
   //get all Visibility
  getAllVisibilities() {
    return this
      .http
      .get('/api/vis/all')
      .map((response : Response) => response.json());
  }

 ///////////////////////////////////////////////// get all Status
  getAllStatus() {
    return this
      .http
      .get('/api/status/all')
      .map((response : Response) => response.json());
  }
//return the typeahead portion of users for string completion
  getUsersTypeAhead(q:string)
  {

    return this
      .http
      .get('/api/user/search/'+q)
      .map((response: Response) => response.json());
  }
/**
 * get selected item from given array by given id
 */
  getTitleById(id:string,list:Array<any>):string
  {
    let ret="";
    list.forEach(elm => {
      if(id===elm._id)
      {
        ret=elm.title;
      }
    });
    return ret;
  }
/**
 * getSelectItemPublished
 * get seletItem publised with given data in format of primeng
 */
  getSelectItemPublished(itmArry:any[]):SelectItem[]
  {
   let si:SelectItem[]=[];
   itmArry.forEach(element => {
      si.push({label:element.title, value:element._id});
   });
   return si;
  }

}
