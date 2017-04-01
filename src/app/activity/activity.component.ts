import { forEach } from '@angular/router/src/utils/collection';
import { Category } from './../models/category';
import { User } from './../models/user';
import { ActivityService } from './../services/activity.service';
import { AlertService } from './../services/alert.service';
import { Router } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { Userservice } from '../services/userservice.service';
import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
    model: any = {};
    loading = false;
    users :User[];
   assignees: SelectItem[];
    categories:Category[];

  constructor(private userService:Userservice,
              private categoryService:CategoryService,
              private alertService:AlertService,
              private activityService:ActivityService,
              private router:Router ) { }

  ngOnInit() {
    //get all the users List
    this.userService.getAll().subscribe(usrs=>{
      this.assignees = [];
      //get all the users and create
       usrs.forEach(user=> {

            this.assignees.push({label:user.username+'-('+ user.firstName+')' , value:user.username});
       });
    });



    this.categoryService.getAll().subscribe(cat=>this.categories=cat);
  }
  createActivity(){

        this.loading = true;

         this.activityService.create(this.model)
            .subscribe(
                data => {
                   console.log('Category created - Service!');
                   this.alertService.success('Activty created!');
                    this.router.navigate(['/home']);
                },
                error => {
                    //this.alertService.error(error);
                    console.log(error._body);
                    this.alertService.error(error._body);
                    this.loading = false;
                });

  }

}
