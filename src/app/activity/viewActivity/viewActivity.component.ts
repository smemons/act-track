import { UtilityService } from './../../services/utility.service';
import { SelectItem } from 'primeng/primeng';
import { Task } from './../../models/task';
import { AlertService } from './../../services/alert.service';
import { TaskService } from './../../services/task.service';
import { ActivityService } from './../../services/activity.service';
import { Activity } from './../../models/activity';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-viewActivity',
  templateUrl: './viewActivity.component.html',
  styleUrls: ['./viewActivity.component.css']
})
export class ViewActivityComponent implements OnInit {
  displayDialog:Boolean=false;
  activity:Activity;
  childrenActivities:Activity[];
  parentActivity:Activity;
  model: any = {};
  tasks:Task[];
  loading = false;
  category:string;
  categories:SelectItem[];
  status:string;
  statuses:SelectItem[];

  focus:string;
  focuses:SelectItem[];

  dept:string[];
  depts:SelectItem[];

  phase:string;
  phases:SelectItem[];

  visibility:string[];
  visibilities:SelectItem[];

  constructor(private route: ActivatedRoute,private router: Router,
              private taskService:TaskService,
              private alertService:AlertService,
              private activityService:ActivityService,
              private utilityService:UtilityService,
              private cd:ChangeDetectorRef) { }

  ngOnInit() {


      this.tasks=[];
      this.categories=[];
      this.focuses=[];
      this.statuses=[];
      this.depts=[];
      this.visibilities=[];
      this.phases=[];
      this.childrenActivities=[];
      this.activity=new Activity();
      let id:string;
     this.route.params.subscribe(params => {

       id = params['id'];


       this.parentActivity=null;

      //let id=this.route.snapshot.params['id'];
        this.activityService.getActivity(id).subscribe(act=>{
        this.activity=act;
        //get category detail
          this.utilityService.getAllCategories().subscribe(cats=>{
          this.categories=this.utilityService.getSelectItemPublished(cats,"Category");
          this.category=this.utilityService.getTitleById(act.catId,cats);
         });
       //get status
          this.utilityService.getAllStatus().subscribe(sts=>{
          this.statuses=this.utilityService.getSelectItemPublished(sts,null);
          this.status=this.utilityService.getTitleById(act.statusId,sts);
       });

       //get focus
       this.utilityService.getAllFocuses().subscribe(focus=>{
          this.focuses=this.utilityService.getSelectItemPublished(focus,"Focus Area");
          this.focus=this.utilityService.getTitleById(act.focusId,focus);
       });

      //get all depts
      this.dept=[];
         this.utilityService.getAllDepts().subscribe(dept=>{
         this.depts=this.utilityService.getSelectItemPublished(dept,null);
         //there may more then one dept
         if(act.deptId!=null)
         {
            let dptId=act.deptId;
            dptId.forEach(dpt => {
              this.dept.push(this.utilityService.getTitleById(dpt,dept));
         });
         }
       });


    //get all visibilities
      this.visibility=[];
       this.utilityService.getAllVisibilities().subscribe(vis=>{
         this.visibilities=this.utilityService.getSelectItemPublished(vis,null);

         //there may more then one dept
         if(act.visId!=null)
         {
            let visIds=act.visId;
            visIds.forEach(avis => {
              this.visibility.push(this.utilityService.getTitleById(avis,vis));
         });
         }
       });

     //get phase
       this.utilityService.getAllPhases().subscribe(phase=>{

          this.phases=this.utilityService.getSelectItemPublished(phase,"Phase");
          this.phase=this.utilityService.getTitleById(act.phaseId,phase);
       });

          //get all tasks associated with this activity
        this.taskService.getAllByActivityId(id).subscribe(tasks=>this.tasks=tasks);

        //get all children activities associated with this activity
        this.activityService.getAllChildrenById(id).subscribe(act=>{
          debugger;
          this.childrenActivities=act
        });

        //if parentid exist
        if(this.activity.parentId!=null)
        {

          this.activityService.getActivity(this.activity.parentId).subscribe(el=>this.parentActivity=el);
        }

      });
    });



  }

  goback()
  {
    this.utilityService.back();
  }

  showTaskDialog()
  {

    this.displayDialog=true;
  }
  close()
  {
    this.displayDialog=false;
  }
  saveTask(id:string)
  {
     this.loading=true;
     this.model.activityId=id;
      event.preventDefault();
      this.taskService.create(this.model).subscribe(
                data => {
                   console.log('Task created - Service!');
                    this.alertService.success("Task saved!");
                    //this.taskService.getAllByActivityId(id).subscribe(tasks=>this.tasks=tasks);
                    this.tasks.push(data);
                    this.cd.detectChanges();

                },
                error => {

                    console.log(error);
                    this.alertService.error(error._body);
                    this.loading = false;
                });

      this.displayDialog = false;
      this.loading=false;
  }
  //create subactivity
  createSubActivity(act:Activity)
  {
    this.utilityService.setPassedActivity(act);
    this.utilityService.addChildActivity();

  }
 //viewActivity(act)
  viewActivity(id){
     this.router.navigate(['/viewActivity', id],{ skipLocationChange: true });
  }
}
