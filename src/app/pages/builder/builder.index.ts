import { Concept, Connection, CreateTheConnectionLocal, MakeTheTypeConceptLocal, Prototype, StatefulWidget } from "mftsccs-browser";
import { cursorInCircle, drawArrow, drawConceptName, drawConnectionName, drawRightAngledTriangle, getMouseCoords, getOffsetCoords, randomIntFromInterval } from "./builder.service";

export class builder extends StatefulWidget{

    canvasSize = 5;
    canvasWidth = 2;
    compositionLevelX = 50;
    compositionLevelY = 50;
    concepts:Concept[] = [];
    connections:Connection[] = [];
    addedConcepts:Concept[] = [];
    addedConnections:Connection[] =[];
    levelX = 50;
    levelY = 50;
    radius = 30;
    color = "orange";
    ctx:any;
    canvas:any;
    selectedConcept:any;
    connectionStart:any;
    connectionEnd:any;
    required:boolean = true;


    after_render(){

        let canvastest = this.getElementById("canvas") as HTMLCanvasElement;
        this.canvas = canvastest;
        const ctx = this.canvas.getContext("2d");
        this.ctx = ctx;
        let that = this;
        let canvasSize = this.canvasSize;
        this.canvas.height = canvasSize * 100;
        this.canvas.width = this.canvasWidth * 500;
        let concepts:Concept[] = [];
        let connections:Connection[] = [];

        this.combineConceptsAndConnections(this.data, concepts, connections);
        this.concepts = concepts;
        this.connections = connections;
        this.addedConcepts = this.data.addedConcepts;
        this.addedConnections = this.data.addedConnections;

        this.applyRandomPositions(this.concepts, this.connections,this.addedConcepts, this.addedConnections);

        this.canvas.addEventListener('contextmenu', function(e:any) {
            e.preventDefault(); // This stops the right-click menu
          });
          this.canvas.addEventListener("mousedown", (e:any) => {

            let mouse = getMouseCoords(that.canvas, e);
            if (e.button === 2) {
                that.concepts.forEach((e:any) => {
                    if (cursorInCircle(mouse.x, mouse.y, e.x, e.y, that.radius)) {
                        if(that.connectionStart){
                            that.connectionEnd = e;
                            that.CreateNewConnection();
                        }
                        else{
                            that.connectionStart = e;

                        }
                    }
                  });
                  that.addedConcepts.forEach((e:any) => {
                      if (cursorInCircle(mouse.x, mouse.y, e.x, e.y, that.radius)) {
                        if(that.connectionStart){
                            that.connectionEnd = e;
                            that.CreateNewConnection();
                        }
                        else{
                            that.connectionEnd = e;
                        }
                      } 
                    });
            }
            else{
                that.concepts.forEach((e:any) => {
                    if (cursorInCircle(mouse.x, mouse.y, e.x, e.y, that.radius)) {
                      that.selectedConcept = e;
                      e.offset = getOffsetCoords(mouse, e);
                    } 
                  });
                  that.addedConcepts.forEach((e:any) => {
                      if (cursorInCircle(mouse.x, mouse.y, e.x, e.y, that.radius)) {
                        that.selectedConcept = e;
                        e.offset = getOffsetCoords(mouse, e);
                      } 
                    });
            }

          });
          this.canvas.addEventListener("mouseup", (e:any) => {
            that.selectedConcept = null;
          });

          this.canvas.addEventListener("mousemove", (e:any) => {
            let mouse = getMouseCoords(that.canvas, e);
          
            if(that.selectedConcept){
                if(that.selectedConcept.id != 0){
                    that.setInPlace(mouse.x, mouse.y);
                }
            }
          });


        this.animate();

    }

    CreateNewConnection(){
        let connectionType = this.connectionStart.type?.characterValue + "_prototype";
        if(this.required){
            connectionType = connectionType + "_requires";
    
        }
        else{
            connectionType = connectionType + "_optional";
        }
        MakeTheTypeConceptLocal(connectionType, 999, 999, 999).then((output:any)=>{
            CreateTheConnectionLocal(this.connectionStart.id, this.connectionEnd.id, output.id,1000,connectionType).then((connectionNew:Connection)=>{
                this.addedConnections.push(connectionNew);
                this.connectionStart = null;
            })
        })
    }


    setInPlace(newX:number, newY:number){
        this.selectedConcept.x = newX;
        this.selectedConcept.y = newY;
    }

    // this is used to animate the package
    animate() {
        if(this){
            this.levelX = 50;
            this.levelY = 50;
            this.compositionLevelX = 50;
            this.compositionLevelY = 50;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawData(this.concepts, this.connections,this.data.addedConcepts, this.data.addedConnections, this.radius, this.color, this.ctx);
            let that = this;
            setInterval(()=>{
                that.animate();
            }, 1000);
        }

      }

      // this is used to convert the multiple levels of prototype and then convert them to a single level
    combineConceptsAndConnections(prototype:Prototype, concepts:Concept[] , connections:Connection[]){
        if(prototype){
            for(let i=0; i<prototype.concepts.length; i++){
                if(prototype.concepts){
                    concepts.push(prototype.concepts[i]);
    
                }
            }
            for(let i=0; i<prototype.connections.length; i++){
                connections.push(prototype.connections[i]);
            }
            if(prototype.childPrototypes.length > 0){
                for(let i=0; i<prototype.childPrototypes.length; i++){
                    this.canvasWidth = this.canvasWidth + 1;
                    this.combineConceptsAndConnections(prototype.childPrototypes[i], concepts, connections);
                }
            }
        }

    }

    applyRandomPositions(concepts:Concept[], connections:Connection[], addedConcepts:Concept[], addedConnections:Connection[]){
        
        for(let i=0;i<concepts.length; i++){
            let isInvisible = true;
            for(let j=0; j<connections.length; j++){
                if(concepts[i].id == connections[j].ofTheConceptId || concepts[i].id == connections[j].toTheConceptId){
                    isInvisible = false;
                }
            }
            if(!isInvisible){
                if(concepts[i].isComposition){
                    concepts[i].x = this.compositionLevelX;
                    concepts[i].y = this.compositionLevelY;
                    this.compositionLevelX = this.compositionLevelX + 300;
                }
                else{
                    // concepts[i].x = randomIntFromInterval(50, canvas.width - radius);
                    // concepts[i].y = randomIntFromInterval(50, canvas.height - radius);
                    concepts[i].x = this.levelX + this.compositionLevelX + 200;
                    concepts[i].y = this.levelY;
                    this.levelY = this.levelY + 50;
                }
    
            }
        }

        for(let i=0;i<addedConcepts.length; i++){
            if(addedConcepts[i].isComposition){
                addedConcepts[i].x = this.compositionLevelX;
                addedConcepts[i].y = this.compositionLevelY;
                this.compositionLevelX = this.compositionLevelX + 300;
            }
            else{
                // concepts[i].x = randomIntFromInterval(50, canvas.width - radius);
                // concepts[i].y = randomIntFromInterval(50, canvas.height - radius);
                addedConcepts[i].x = 300 + 200;
                addedConcepts[i].y = 500;
                this.levelY = this.levelY + 50;
            }
        }
    }

    // this function is the draw data function so that data is  drawn.
    drawData(concepts:Concept[], connections:Connection[], addedConcepts:Concept[], addedConnections:Connection[], radius:number, color:string, ctx:any ){
    

        for(let i=0;i<concepts.length; i++){
                drawRightAngledTriangle(ctx, concepts[i].x, concepts[i].y, radius, color )
                drawConceptName(ctx, concepts[i]);

        }
        for(let i=0;i<addedConcepts.length; i++){
                drawRightAngledTriangle(ctx, addedConcepts[i].x, addedConcepts[i].y, radius, color )
                drawConceptName(ctx, addedConcepts[i]);

        }
        for(let i=0; i<connections.length; i++){

            let ofTheConceptId = connections[i].ofTheConceptId;
            let toTheConceptId = connections[i].toTheConceptId;
            
            for(let j=0; j<concepts.length; j++){
                if(concepts[j].id == ofTheConceptId){
                    connections[i].ofConcept = concepts[j];
                }
                if(concepts[j].id == toTheConceptId){
                    connections[i].toConcept = concepts[j];
                }
            }
            let ofTheConceptX = connections[i].ofConcept?.x;
            let ofTheConceptY = connections[i].ofConcept?.y;

            let toTheConceptX = connections[i].toConcept?.x;
            let toTheConceptY = connections[i].toConcept?.y;


            //const triangleSize = connections[i].ofConcept.radius;
            const triangleSize = 10;
            const sourceX = ofTheConceptX;
            const sourceBottomY = ofTheConceptY + triangleSize / 2;
            const horizontalOffset = 15 * (connections[i].orderId % 5);
            const verticalX = sourceX + horizontalOffset;
            const verticalExtension = 20;

            if(ctx){
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.moveTo(sourceX, sourceBottomY);
                ctx.lineTo(sourceX, sourceBottomY + verticalExtension);
                ctx.lineTo(verticalX, sourceBottomY + verticalExtension);
                const targetX = toTheConceptX;
                const targetY = toTheConceptY;
                ctx.lineTo(verticalX, targetY);
                ctx.lineTo(targetX, targetY);
                ctx.stroke();
                drawArrow(ctx, targetX - 2, targetY, targetX, targetY, 1, "black");
                drawConnectionName(ctx, verticalX,targetX,targetY, connections[i] );
            }
            // Draw the line with right angles

        }
        for(let i=0; i<addedConnections.length; i++){

            let ofTheConceptId = addedConnections[i].ofTheConceptId;
            let toTheConceptId = addedConnections[i].toTheConceptId;
            
            for(let j=0; j<concepts.length; j++){
                if(concepts[j].id == ofTheConceptId){
                    addedConnections[i].ofConcept = concepts[j];
                }
                if(concepts[j].id == toTheConceptId){
                    addedConnections[i].toConcept = concepts[j];
                }
            }
            for(let j=0; j<addedConcepts.length; j++){
                if(addedConcepts[j].id == ofTheConceptId){
                    addedConnections[i].ofConcept = addedConcepts[j];
                }
                if(addedConcepts[j].id == toTheConceptId){
                    addedConnections[i].toConcept = addedConcepts[j];
                }
            }
            let ofTheConceptX = addedConnections[i].ofConcept?.x;
            let ofTheConceptY = addedConnections[i].ofConcept?.y;

            let toTheConceptX = addedConnections[i].toConcept?.x;
            let toTheConceptY = addedConnections[i].toConcept?.y;


            //const triangleSize = connections[i].ofConcept.radius;
            const triangleSize = 10;
            const sourceX = ofTheConceptX;
            const sourceBottomY = ofTheConceptY + triangleSize / 2;
            const horizontalOffset = 15 * (addedConnections[i].orderId % 5);
            const verticalX = sourceX + horizontalOffset;
            const verticalExtension = 20;

            if(ctx){
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.moveTo(sourceX, sourceBottomY);
                ctx.lineTo(sourceX, sourceBottomY + verticalExtension);
                ctx.lineTo(verticalX, sourceBottomY + verticalExtension);
                const targetX = toTheConceptX;
                const targetY = toTheConceptY;
                ctx.lineTo(verticalX, targetY);
                ctx.lineTo(targetX, targetY);
                ctx.stroke();
                drawArrow(ctx, targetX - 2, targetY, targetX, targetY, 1, "black");
                drawConnectionName(ctx, verticalX,targetX,targetY, addedConnections[i] );
            }
            // Draw the line with right angles

        }
    }




    getHtml(): string {
        let html = "";
        
        html = `
        <br/>
        <br/>
        <br/>
        <br/>
        #canvas{
            margin-left: 300px;
            margin-right: 200px;
        }
        
        <canvas  id="canvas"/>`
        return html;
    }
}