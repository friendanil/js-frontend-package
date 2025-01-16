// src/app/pages/example/wrapper.example.ts

import { StatefulWidget } from 'mftsccs-browser'
import { create } from "./create.example";
import { list } from "./list.example";
import './phonebook.style.css';

export class phonebook extends StatefulWidget
{

    mount_child(){
        let widget1 = this.getElementById("widget1");
        let widget2 = this.getElementById("widget2");
        let creating =new create();
        let listing = new list();

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
