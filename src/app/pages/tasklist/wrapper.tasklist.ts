// src/app/pages/example/wrapper.example.ts

import { StatefulWidget } from "mftsccs-browser";
import { CreateTask } from "./create.tasklist";
import { ListTask } from "./list.tasklist";
import { royaltask, taskListTest } from "./tasklistservice";

export class tasklist extends StatefulWidget
{

    mount_child(){
        

        let widget1 = this.getElementById("widget1");
        let widget2 = this.getElementById("widget2");
        let creating =new CreateTask();
        let listing = new ListTask();
        //taskListTest();

        royaltask();
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
                </div>`
        return html;
    }
}
