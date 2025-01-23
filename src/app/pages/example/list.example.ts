// src/app/pages/example/list.example.ts

import {  DeleteConceptById, GetCompositionListListener,  NORMAL } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";
import  './phonebook.style.css';
export class list extends StatefulWidget{
    myphonebooks: any;
    inpage: number= 10;
    page: number = 1;
    linker: string = "console_folder_s";


    before_render(): void {
        let userId: number = getLocalUserId();
        GetCompositionListListener("the_phonebook", userId, this.inpage, this.page, NORMAL).subscribe((output: any)=>{
            this.myphonebooks = output;
            console.log("this is my phonebook", output);
            this.render();
        })
    }




    after_render() {
      let tableElement = this.getElementById("mainbody");
      if(tableElement){
        console.log("this is the element", tableElement, this.myphonebooks.length);
        if(this.myphonebooks.length > 0){
          for(let i= 0; i< this.myphonebooks.length; i++){
            let id = this.myphonebooks[i].the_phonebook?.id;


            // if the id is present and valid
            if(id){
                let row = document.createElement("tr");
                let col1 = document.createElement("td");
                let col2 = document.createElement("td");
                let col3 = document.createElement("td");
                let col4 = document.createElement("td");
                let name = document.createElement("span");
                let nameValue = this.myphonebooks[i].the_phonebook.name
                let phoneValue = this.myphonebooks[i].the_phonebook.phone
                name.innerHTML = nameValue;
                let phone = document.createElement("span");
                phone.innerHTML = phoneValue;
                let edit = document.createElement("button");
      
                edit.setAttribute('class', 'btn btn-primary');
                edit.setAttribute('padding', "10px");
                edit.id = this.myphonebooks[i].the_phonebook.id;
                edit.innerHTML = "edit";
      
                let del = document.createElement("button");
                del.setAttribute('class', 'btn btn-primary');
                del.setAttribute('padding', "10px");
                del.id = this.myphonebooks[i].the_phonebook.id;
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
      
                row.appendChild(col1);
                row.appendChild(col2);
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
              <th>phone</th>
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