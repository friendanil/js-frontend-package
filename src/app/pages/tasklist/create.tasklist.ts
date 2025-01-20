import { Concept, CreateDefaultConcept, CreateTheConnectionLocal, DeleteConnectionById, DeleteConnectionByType, GetConnectionBetweenTwoConceptsLinker, GetTheConcept, LocalSyncData, MakeTheInstanceConceptLocal, MakeTheTypeConceptLocal, PatcherStructure, PRIVATE, StatefulWidget, UpdateComposition } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";
import { selector } from "./selector.tasklist";

export class CreateTask extends StatefulWidget
{
    selectedPhonebook: Concept= CreateDefaultConcept();
    mount_child(){
        let widget1 = this.getElementById("widget1");
        let selecting =new selector();

         if(widget1){
           this.childWidgets.push(selecting);
           selecting.dataChange((value:number)=>{
              GetTheConcept(value).then((conceptData)=>{
                this.selectedPhonebook = conceptData;
              })
           });
           selecting.mount(widget1);
         }

         
    }
    /**
     * These are the events that user adds. These could be any thing like populating the data to creating the data
     * 
     */
    after_render(): void {
        let userId:number = getLocalUserId();
        let order:number =  1;
        let name = this.getElementById("name") as HTMLInputElement;
        let phone = this.getElementById("description") as HTMLInputElement;
        let id = this.getElementById("id") as HTMLInputElement;
        if(this.data){
            name.value = this.data.name;
            phone.value = this.data.phone;
            id.value = this.data.id;
        }
        let submitButton = this.getElementById("submit");
        if(submitButton){
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();
    
                if(id.value){
                    let patcherStructure: PatcherStructure = new PatcherStructure();
                    patcherStructure.compositionId = Number(id.value);
                    patcherStructure.patchObject = {
                        "name": name.value,
                        "description": phone.value
                    }
                    let mainId = Number(id.value);
                    UpdateComposition(patcherStructure);
                    DeleteConnectionByType(mainId, "the_task_contact");
                    MakeTheTypeConceptLocal("the_task_contact", 999, 999, userId). then((typeConcept)=>{
                        console.log("this is the task constant");
                        CreateTheConnectionLocal(mainId, this.selectedPhonebook.id, typeConcept.id, 1000, typeConcept.characterValue, userId).then(()=>{
                            LocalSyncData.SyncDataOnline();

                        });
                    });

                }
                else{
                    MakeTheInstanceConceptLocal("the_task", "", true,userId,PRIVATE).then((mainconcept)=> {
                        MakeTheInstanceConceptLocal("name", name.value,false, userId, PRIVATE).then((concept)=>{
                            MakeTheInstanceConceptLocal("description", phone.value, false, userId,PRIVATE).then((concept2) => {
                                CreateTheConnectionLocal(mainconcept.id, concept.id, mainconcept.id, order, "", userId).then(()=>{
                                    CreateTheConnectionLocal(mainconcept.id, concept2.id, mainconcept.id, order, "", userId).then(()=>{
                                        if(this.selectedPhonebook.id != 0){
                                            MakeTheTypeConceptLocal("the_task_contact", 999, 999, userId). then((typeConcept)=>{
                                                CreateTheConnectionLocal(mainconcept.id, this.selectedPhonebook.id, typeConcept.id, 1000, typeConcept.characterValue, userId).then(()=>{
                                                    LocalSyncData.SyncDataOnline();

                                                });
                                            })
                                        }
                                        else{
                                            LocalSyncData.SyncDataOnline();

                                        }
                                    })
                                })
                            });
                        });
                    });
                }
    
    
            }
        }

    }



        /**
     * This is the main html component of our creating widget.
     * @returns returns a form that takes in name and number for the phone book.
     */
        getHtml(): string {
            let html = "";
            html = `<div class="container">
            <form>
                <div>
                    <input type= number id=id hidden>
                    <div class="formbody">
                        <label> Task </label>
                        <input  type = text id="name" placeholder="name">
                    </div>
                    <div class="formbody">
                        <label> Description </label>
                        <input   type = text id="description" placeholder="description">
                    </div>
                    <div class="formbody">
                        <label> Phonebook </label>
                        <div id="widget1" class="myselector"></div>

                    </div>
                    <button class=" btn btn-primary" id="submit" type=submit>Submit</button>

                </div>
            </form>
    
            </div>`
        return html;
        }
}