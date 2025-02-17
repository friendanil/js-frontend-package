import { FreeschemaQuery, SchemaQueryListener, StatefulWidget } from "mftsccs-browser"
import { getLocalUserId } from "../user/login.service";
import { classlist } from "./classroom.index";
import { classlistCreate } from "./classroomcreate.index";

export class classlistAll extends StatefulWidget{
    mount_child(){
        let widget1 = this.getElementById("widget1");
        let widget2 = this.getElementById("widget2");
        let listing =new classlist();
        let creating = new classlistCreate();

         if(widget1){
           this.childWidgets.push(creating);
           creating.mount(widget1);
         }
         if(widget2)
         {
            listing.dataChange((value: any)=>{
                this.UpdateChildData(value, creating);
            });
            this.childWidgets.push(listing);
            listing.mount(widget2);
         }

         
    }



     getHtml(): string {
        let html = "";

        html = `<div class="flex-container">
                    <div id= "widget1"></div>
                </div>
                <div class="flex-container">
                    <div id ="widget2"></div>
                </div>
                `
                
        return html;
    }
}