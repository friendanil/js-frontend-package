import { createPrototypeLocal, MakeTheTypeConceptLocal, Prototype, renderLatestWidget, StatefulWidget } from "mftsccs-browser";
import { builder } from "./builder.index";

export class CreatePrototype extends StatefulWidget{

    builder:any;
    after_render(): void {
        let prototype = new Prototype();
        prototype.prototype = "the_wedding";
        prototype.required = ["the_attire", "the_dress"];
        prototype.optional = ["the_tuxedo", "the_beauty", "the_makeup_artist"];

        let secondPrototype = new Prototype();
        secondPrototype.prototype = "the_beauty";
        secondPrototype.required = ["the_hair_stylist"];
        prototype.childPrototypes = [secondPrototype];
        let AddFlag = true;
        let isUpdating = false;
        let that = this;
        let mainWrapper = this.getElementById("prototype-builder") as HTMLElement;
        let addConcept = this.getElementById("add-concept") as HTMLInputElement;

        addConcept.onchange = function(){
            if(AddFlag){
                MakeTheTypeConceptLocal(addConcept.value, 999, 999, 999).then((output:any)=>{
                    //prototype.addedConcepts.push(output);
                    console.log("this is adding the concept", prototype, output);
                    that.builder.addedConcepts.push(output);
                    //that.createPrototype(prototype, mainWrapper);

                })
            }
        }

        this.createPrototype(prototype, mainWrapper);

    }

    createPrototype(prototype:Prototype, mainWrapper:HTMLElement){
        createPrototypeLocal(prototype).then((output:any)=>{
            console.log("This is the prototype system", prototype);
            let canvasBuilder  = new builder();
            let prototypeCount = prototype.optional.length + prototype.required.length;
            output.contentsLength = prototypeCount;
            canvasBuilder.data = prototype;
            canvasBuilder.canvasSize = prototypeCount;
            if(mainWrapper){
                while (mainWrapper.firstChild) {
                    mainWrapper.firstChild.remove(); 
                  }
            }

            canvasBuilder.mount(mainWrapper);
            this.builder =canvasBuilder;
          })
    }


    getHtml():string{
        let html = "";

        html = `<div id="prototype-builder"></div>
        <label>Add Concept</label>
        <input id="add-concept">

        `
        return html;
    }
}