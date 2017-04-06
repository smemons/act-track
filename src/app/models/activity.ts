export class Activity {
_id:String;
parentId:String;
title:String;
desc:String;
startDate:Date;
endDate:Date;
sponsor:[String];
assignee:[String];
percentage: Number;//percentage of completion
catId:String; //category Id
deptId:[String]; //dept Id
focusId:String; //focus Id
phaseId:String; //phase Id
visId:[String]; //Visisblity ID
statusId:String;
createdBy:String;
createdAt:Date;
updatedBy: String;
updatedAt: Date;
}
