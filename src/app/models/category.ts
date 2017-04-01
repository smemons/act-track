export class Category{
    title: String;
    desc: String;
    createdBy: String;

    constructor( title:String, desc:String,  createdBy:String)
    {
        this.title=title;
        this.createdBy=createdBy;
        this.desc=desc;
    }

}
