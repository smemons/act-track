export class Activity{
    actId:String;
    title: String;
    desc: String;
     startDate:Date;
     endDate:Date;
     opened:Boolean;
     assignee:[String];
     category:String;
     catId:String;
     createdBy: String;
    constructor( title:String, desc:String,  createdBy:String,startDate:Date,endDate:Date,
    opened:Boolean,assignee:[String],catId:String)
    {
        this.title=title;
        this.createdBy=createdBy;
        this.desc=desc;

    }

}
