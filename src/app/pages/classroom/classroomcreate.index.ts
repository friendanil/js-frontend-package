import { Concept,  CreateTheConnectionLocal, DeleteConnectionByType, FreeschemaQuery, GetTheConcept, LocalSyncData, MakeTheInstanceConceptLocal, MakeTheTypeConceptLocal, PRIVATE, SchemaQueryListener, StatefulWidget } from "mftsccs-browser"
import { getLocalUserId } from "../user/login.service";

export class classlistCreate extends StatefulWidget{
    myphonebooks: any;
        before_render(): void {
            this.render();
        }

        after_render(){
             let userId:number = getLocalUserId();
                    let name = this.getElementById("name") as HTMLInputElement;
                    let location = this.getElementById("location") as HTMLInputElement;
                    let id = this.getElementById("id") as HTMLInputElement;
                    if(this.data){
                        name.value = this.data.name;
                        location.value = this.data.location;
                        id.value = this.data.id;
                    }
                    let entityId = 100821886;
                    let submitButton = this.getElementById("submit");
                    if(submitButton){
                        submitButton.onclick = (ev: Event) => {
                            ev.preventDefault();
                                if(id.value){
                                    let updateId = Number(id.value);
                                    DeleteConnectionByType(updateId, "the_classroom_name").then(()=>{
                                        DeleteConnectionByType(updateId, "the_classroom_location").then(()=>{
                                            GetTheConcept(updateId).then((updateConcept:Concept)=>{
                                                this.createClassRoom(updateConcept, name.value, location.value );

                                            })

                                        })

                                    })
                
                                }
                                else{
                                    //MakeTheInstanceConceptLocal("the_classroom", "", true,userId,PRIVATE)
                                    MakeTheInstanceConceptLocal("the_nischal_classroom", "", true, userId, PRIVATE).then((mainconcept)=> {
                                        console.log("This is the classromo ", mainconcept);
                                        GetTheConcept(entityId).then((entityConcept:Concept)=>{
                                            MakeTheTypeConceptLocal("the_entity_classroom", 999, 999, 999).then((typeConcept:Concept)=>{
                                                // CreateTheConnectionLocal(entityConcept.id, mainconcept, typeConcept.id, 1000, 999).then((out:any)=>{
                                                //     this.createClassRoom(mainconcept, name.value, location.value );

                                                // })
                                            });

                                        })

    
                                    });
                                }


                            
                
                
                            console.log("submit button clicked");
                        }
                    }
        }

        createClassRoom(mainConcept:Concept, name:string, location:string ){
            let userId:number = getLocalUserId();
            let order:number = 1000;
            MakeTheTypeConceptLocal("the_nischal_classroom_name", 999,999,userId).then((classroom)=>{
                MakeTheTypeConceptLocal("the_nischal_classroom_location", 999,999,userId).then((locationType)=>{
                MakeTheInstanceConceptLocal("name", name,false, userId, PRIVATE).then((concept)=>{
                    MakeTheInstanceConceptLocal("location", location, false, userId,PRIVATE).then((concept2) => {
                        console.log("this is the main concept", mainConcept);
                        // CreateConnection(mainConcept, concept, classroom, order, userId).then(()=>{
                        //     CreateConnection(mainConcept, concept2, locationType, order, userId).then(()=>{
                        //         LocalSyncData.SyncDataOnline();
                        //     })
                        // })
                    });
                });
                });

            });
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
                    <label> name </label>
                    <input  type = text id="name" placeholder="name">
                </div>
                <div class="formbody">
                    <label> Location </label>
                    <input   type = text id="location" placeholder="location">
                </div>
                <button class=" btn btn-primary" id="submit" type=submit>Submit</button>
            </div>
        </form>

        </div>`
        return html;
    }
}