import { UtilityService } from './../services/utility.service';
import { Status } from './../models/status';
import { element } from 'protractor';
import { forEach } from '@angular/router/src/utils/collection';
import { SelectItem } from 'primeng/primeng';
import { Category } from './../models/category';
import { Activity } from './../models/activity';
import { Router } from '@angular/router';
import { AlertService } from './../services/alert.service';
import { ActivityService } from './../services/activity.service';
import { CategoryService } from './../services/category.service';
import { Userservice } from './../services/userservice.service';
import { AuthService } from './../services/auth.service';
import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
declare var moment: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  events: any[];
  dialogVisible: boolean = false;
  activity:Activity;
  allActivities:Activity[];
  assigned:Activity[];
  created:Activity[];
  assignees: SelectItem[];
  categories:Category[];
  headerConfig: any;
  statuses:Status[];
  listStatuses:SelectItem[];

  isWriter:Boolean;

  selectedCategory:string;
  status:string='Open';

  constructor(private authService:AuthService,
              private userService:Userservice,
              private categoryService:CategoryService,
              private activityService:ActivityService,
              private utilityService:UtilityService,
              private alertService:AlertService,
              private router:Router,
              private cd: ChangeDetectorRef

              ) { }


  ngOnInit() {

    this.events=[];
    this.allActivities=[];
    //get all the users List
    this.userService.getAll().subscribe(usrs=>{
      this.assignees = [];
      //get all the users and create
       usrs.forEach(user=> {

            this.assignees.push({label:user.username+'-('+ user.firstName+')' , value:user.username});
       });
    });
    this.categoryService.getAll().subscribe(cat=>this.categories=cat);

    //get all statuses for color
    this.statuses=[];
    this.listStatuses=[];
    this.utilityService.getAllStatus().subscribe(status=>{
      this.statuses=status;
      status.forEach(element => {
         this.listStatuses.push({label:element.title, value:element._id});
      });
    this.statuses=status;

    })

    this.getAllActivitiesRelated();

  this.headerConfig = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
		};

   }

handleEventClick(event){


  let id=event.calEvent.id;
  this.dialogVisible=true;
  this.isWriter=event.calEvent.className[0]==='creator' ? true : false;
  this.activityService.getActivity(id).subscribe(act=>
              {

                this.activity=act;
                this.activity.startDate = moment(act.startDate).toDate();
                this.activity.endDate = moment(act.endDate).toDate();
                this.selectedCategory=this.utilityService.getTitleById(act.catId,this.categories);
              });
}

//  handleDayClick(event) {
//         this.dialogVisible = true;

//         this.isWriter=true;
//         this.activity = new Activity();
//         this.activity.startDate = moment(event.date).toDate();
//          this.activity.endDate = moment(event.date).toDate();



//         //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
//         this.cd.detectChanges();
//     }
    close()
    {
      this.dialogVisible=false;
      this.activity=new Activity();
    }

//update the Activity
  updateActivity(act:Activity)
  {
  this.activityService.update(act)
            .subscribe(
                data => {
                   console.log('Category updated - Service!');
                   this.alertService.success('Activty updated!');
                   this.dialogVisible=false;
                   this.updateSchedulerOnUpdate(act);
                   this.cd.detectChanges();
                },
                error => {

                    console.log(error);
                    this.alertService.error(error);

                });
  }
    saveActivity(act:Activity){

         this.activityService.create(act)
            .subscribe(
                data => {
                   console.log('Activity created - Service!');
                   this.alertService.success('Activty created!');
                   this.events.push(this.formCalanderItem(this.activity));
                   this.dialogVisible=false;
                   this.activity=new Activity();
                   this.cd.detectChanges();

                },
                error => {
                    //this.alertService.error(error);
                    console.log(error);
                    this.alertService.error(error);

                });

  }

    //in case of update. change the output on scheduler
    private updateSchedulerOnUpdate(act)
    {

      let index:number=0;
      this.events.forEach(item=>{
        if(item.id===act._id)
        {
          let obj=this.formCalanderItem(act);
          this.events[index]=obj;
        }
        index++;
      });
    }

      //get all activities related to logged in user
      private getAllActivitiesRelated()
      {

        let uid=this.authService.getCurrentUser();
     this.activityService.getAllByUserId(uid).subscribe(acts=>{
          acts.forEach(element=>{

          let obj=this.formCalanderItem(element);
          this.events.push(obj);
          })

          //console.log('getAllActivitiesRelated :'+JSON.stringify(this.events));
        });
      }

  private formCalanderItem(element):Object
  {
      let uid=this.authService.getCurrentUser();
      let col=new Object();

        col["id"]=element._id;
        col["title"] = element.title;
        col['start']=moment(element.startDate).toDate();
        col['end']=moment(element.endDate).toDate();
        col["allDay"] = true;
        if(element.createdBy===uid)
        {
          //  col['color']=element.status==this.status?'#6FF5B2':'#D9534F';
            col['className']='creator';
        }
        else
        {
         //  col['color']=element.status==this.status?'#8A9AFB':'#D9534F';
           col['className']='assignee';
        }
        col['color']=this.getColorFromStatus(element.statusId);
        col['textColor']='black';
        return col;
  }
  //
  private getColorFromStatus(statusId:string):string
  {
    let cc:string="";
    this.statuses.forEach(element => {
      if(element._id===statusId)
      {
        cc= element.colorCode;
      }
    });
    return cc;
  }
  showDetail(id:string)
  {
    this.utilityService.viewActivity(id);
  }
}
