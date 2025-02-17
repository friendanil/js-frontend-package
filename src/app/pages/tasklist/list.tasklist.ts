import { BinaryTree, DATAID, DeleteConceptById, GetCompositionListListener, GetLinkListListener, NORMAL, SearchQuery, SearchStructure, StatefulWidget } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";
import { taskListTest } from "./tasklistservice";
import { Tracer } from "../../default/tracer";

export class ListTask extends StatefulWidget{
    tasklist: any = [];
    inpage: number= 10;
    page: number = 1;
    linker: string = "console_folder_s";

    @Tracer
    before_render(): void {

        let searchStructure: SearchStructure = new SearchStructure();
        searchStructure.composition = "the_task";
        searchStructure.inpage = this.inpage;
        searchStructure.page = this.page;


        let searchQuery: SearchQuery = new SearchQuery();
        searchQuery.fullLinkers = ["the_task_contact"];

        // GetLinkListListener(searchStructure, [searchQuery], "", NORMAL).subscribe((output: any)=>{
        //     this.tasklist = output;
        //     console.log("this is the output of the list listener", output);
        //     this.render();
        // });
    }

    



    after_render() {
     // taskListTest();
      let tableElement = this.getElementById("mainbody");
      if(tableElement){
        console.log("this is the element", tableElement);
        if(this.tasklist.length > 0){
          for(let i= 0; i< this.tasklist.length; i++){
            let id = this.tasklist[i].the_task.id;


            // if the id is present and valid
            if(id){
                let row = document.createElement("tr");
                let col1 = document.createElement("td");
                let col2 = document.createElement("td");
                let col3 = document.createElement("td");
                let col4 = document.createElement("td");
                let col5 = document.createElement("td");
                let name = document.createElement("span");
                let nameValue = this.tasklist[i].the_task.name
                let phoneValue = this.tasklist[i].the_task.description
                name.innerHTML = nameValue;
                let phone = document.createElement("span");
                let contactperson = document.createElement("span");
                let contactpersonDatas = this.tasklist[i].the_task.the_task_contact;
                let contactpersonData = "";
                if(contactpersonDatas){
                    for(let i=0 ; i< contactpersonDatas.length; i++){
                        contactpersonData = contactpersonDatas[i].the_phonebook.name + "/" + contactpersonDatas[i].the_phonebook.phone;
                    }
                }

                contactperson.innerHTML = contactpersonData;

                phone.innerHTML = phoneValue;
                let edit = document.createElement("button");
      
                edit.setAttribute('class', 'btn btn-primary');
                edit.setAttribute('padding', "10px");
                edit.id = this.tasklist[i].the_task.id;
                edit.innerHTML = "edit";
      
                let del = document.createElement("button");
                del.setAttribute('class', 'btn btn-primary');
                del.setAttribute('padding', "10px");
                del.id = this.tasklist[i].the_task.id;
                del.innerHTML = "Delete";
                del.onclick = () =>{
                    if(id){
                        DeleteConceptById(id).then(()=>{
                            console.log("this is the delete notify");
                          });
                    }
    
      
                }
                let that = this;
                edit.onclick = () =>{
                  that.data = {
                    "id": edit.id,
                    "name": nameValue,
                    "phone": phoneValue
                  }
                  console.log("this is the update click", that.data, that.subscribers);
                  
                  that.notify();
                }

                col1.append(name);
                col2.append(phone);
                col3.append(del);
                col4.append(edit);
                col5.append(contactperson);
                row.appendChild(col1);
                row.appendChild(col2);
                row.appendChild(col5);
                row.appendChild(col3);
                row.appendChild(col4);
                tableElement.append(row);
            }
            
          }
      }



      }

      }



     getHtml(): string {

        let html = "";

        html = `<div>
        <table>
        <thead>
          <tr>
              <th>name</th>
              <th>Description</th>
              <th>Contact Person</th>
              <th>Delete</th>
              <th>Edit</th>
          </tr>
        </thead>
        <tbody id= mainbody>

        </tbody>
        </table>
        
        </div>`
        return html;
    }
}