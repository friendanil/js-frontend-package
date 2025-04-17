import { Concept, Connection } from "mftsccs-browser";

export function drawTriangle(ctx:any,x:number,y:number,radius:number,color:string) {

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x, y + (radius/3));
    ctx.lineTo(x-((2/3)*radius), y+(radius/3));
    ctx.lineTo(x, y - (radius *(2/3)));
    ctx.lineTo(x+((2/3)*radius), y + (radius / 3));
    ctx.lineTo(x, y + radius/3);
    ctx.fill();
    // // path.moveTo((sWidth/2)+50,sHeight/2);
    // // path.lineTo((sWidth/2),(sHeight/2)-50);
    // // path.lineTo((sWidth/2)-50,sHeight/2);
    // // ctx.fill(path);
    // // ctx.beginPath();
    // // ctx.arc(x, y, radius, 0 , 2 * Math.PI);
    // // ctx.fillStyle = color;
    //  const grd = ctx.createRadialGradient(x, y, x+5, x + 10 , y+10 , x+ 20);
    // grd.addColorStop(0, color);
    // grd.addColorStop(1, "white");
    //  ctx.fillStyle = grd;
    ctx.fill();
  }


  export function getMouseCoords(canvas:HTMLCanvasElement, event:any) {
    let canvasCoords = canvas.getBoundingClientRect();
    let left = canvasCoords.left;
    let top = canvasCoords.top;
  
    if (canvasCoords.top > 0) {
        top = canvasCoords.top;
    } else {
        top = Math.abs(canvasCoords.top) - canvas.offsetTop;
    }
  
    return {
        x: event.pageX - left,
        y: event.pageY - canvas.offsetTop
    };
  }

  export function cursorInCircle(mouseX:number, mouseY:number, circleX:number, circleY:number, radius:number) {
    const distance = Math.sqrt((mouseX - circleX) ** 2 + (mouseY - circleY) ** 2);
    return distance <= radius;
  }

  // Returns the offset coordinates of the mouse relative to a concept circle
export function getOffsetCoords(mouse:any, concept:Concept) {
    return {
        x: mouse.x - concept.x,
        y: mouse.y - concept.y
    };
  }

  export function drawRightAngledTriangle(ctx:any,x:number,y:number,radius:number,color:string) {

    y = y + 10;
    x = x + 10;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - radius, y);
    ctx.lineTo(x, y - radius);
    ctx.closePath();  // Close the triangle
    ctx.fillStyle = color;
    ctx.fill();  
    // // path.moveTo((sWidth/2)+50,sHeight/2);
    // // path.lineTo((sWidth/2),(sHeight/2)-50);
    // // path.lineTo((sWidth/2)-50,sHeight/2);
    // // ctx.fill(path);
    // // ctx.beginPath();
    // // ctx.arc(x, y, radius, 0 , 2 * Math.PI);
    // // ctx.fillStyle = color;
    //  const grd = ctx.createRadialGradient(x, y, x+5, x + 10 , y+10 , x+ 20);
    // grd.addColorStop(0, color);
    // grd.addColorStop(1, "white");
    //  ctx.fillStyle = grd;
    ctx.fill();
  }

  export function drawConnectionName(ctx:any, sourceX:number, targetX:number, targetY:number, connection:Connection) {
    let xmid = (sourceX + targetX) / 2;
    let ymid = targetY + 10;

    // Check if connection object and name exist
    let connectionName:any = connection.type?.characterValue;
    if(connectionName == "" || connectionName == 0){
        connectionName = connection.typeCharacter;
    }
    // console.log("this is the connecction name", connectionName)
    ctx.fillStyle = 'red';
    ctx.font = 15 * 0.5 + "px arial";

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(connectionName, xmid, ymid);
}

export function drawConceptName(ctx:any, concept:Concept){
    let xtop = concept.x + 10;
    let ytop = concept.y - 20;
    ctx.fillStyle = 'black';
    ctx.font = 15 * 0.5 + "px arial";
    let conceptName = concept.characterValue;
    ctx.textBaseline = "left";
    ctx.textAlign = "right";
    ctx.fillText(conceptName, xtop, ytop);

}




  export function drawArrow(ctx:any, fromx:number, fromy:number, tox:number, toy:number, arrowWidth:number, color:string){
    const headlen = 10;  // Length of the arrow head
    const angle = Math.atan2(toy - fromy, tox - fromx);
  
    ctx.save();
    ctx.strokeStyle = color;
  
    // Draw the main arrow line
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();
  
    // Draw the arrow head
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
  
    ctx.stroke();
    ctx.restore();
}


export function randomIntFromInterval(min:number, max:number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


//   export function drawRightAngleTriangle(ctx:any, userId:any, base:number, height:number, color:string) {
//     let x = userId.x;
//     let y = userId.y;
  
//     ctx.beginPath();
//     ctx.moveTo(x, y);
//     ctx.lineTo(x - height, y);
//     ctx.lineTo(x, y - base);
//     ctx.closePath();  // Close the triangle
//     ctx.fillStyle = color;
//     ctx.fill();  // Fill the triangle with the specified color
//   }

  export function calculateLastTriangleX(typeName:string, verticalX:number, sourceBottomY:number, targetX:number, targetY:number, toConcept:Concept) {
    const typeParts = typeName.split('_');
    const numParts = typeParts.length;
    const numTriangles = numParts - 1;

    const base = 45;
    const height = 45;

    //const purpleSideLength = toConcept.radius * 2;
    const purpleSideLength = 10;
    const purpleHeight = (Math.sqrt(3) / 2) * purpleSideLength;
    const purpleTopX = toConcept.x;
    const purpleTopY = toConcept.y - (purpleHeight / 2);

    let currentX = purpleTopX;
    let currentY = purpleTopY;

    // Calculate positions of all triangles (right to left)
    for (let i = 0; i < numTriangles; i++) {
        const centerX = currentX - base / 6;
        const centerY = currentY - height / 6;

        const bottomLeftX = centerX - base / 2;
        currentX = bottomLeftX + base / 6;
        currentY = centerY - height / 6;
    }

    // Return the X position of the leftmost triangle (last one drawn)
    return currentX;
}


    // // Method to draw the blue triangles or the characterValue text
    //  drawTypeTrianglesOnly(ctx, showTriangles, toConcept) {
    //     console.log('toConcept:', toConcept);
    //     console.log('this.toConcept:', this.toConcept);
    //     if (!this.ofConcept || !this.toConcept) return;
    
    //     const verticalExtension = 20;
    //     const sourceX = this.ofConcept.x;
    //     const sourceBottomY = this.ofConcept.y + this.ofConcept.radius / 2;
    //     const horizontalOffset = 15 * (this.connection.orderId % 5);
    //     const verticalX = sourceX + horizontalOffset;
    //     const targetX = this.toConcept.x;
    //     const targetY = this.toConcept.y;
    
    //     let typeName = 'N/A';
        
    //     if (this.toConcept?.concept?.type?.characterValue) {
    //         try {
    //             const fetchedConcept = await GetTheConcept(this.toConcept.concept.type.characterValue);
    //             console.log("Fetched concept for typeValue:", fetchedConcept);
    //             typeName = fetchedConcept || 'N/A';
    //         } catch (error) {
    //             console.error("Error fetching typeValue:", error);
    //             typeName = 'N/A';
    //         }
    //     }
    //     let name = this.toConcept?.concept?.type?.characterValue || 'N/A';

    //     let typeValue = 'N/A';
    //     if (this.toConcept?.concept?.characterValue) {
    //         try {
    //             const fetchedConcept = await GetTheConcept(this.toConcept.concept.characterValue);
    //             console.log("Fetched concept for typeValue:", fetchedConcept);
    //             typeValue = fetchedConcept || 'N/A';
    //         } catch (error) {
    //             console.error("Error fetching typeValue:", error);
    //             typeValue = 'N/A';
    //         }
    //     }
    
    //     let value = this.toConcept?.concept?.characterValue || 'N/A';
    
    //     if (showTriangles) {
    //         // Draw the blue triangles with their individual labels ("the", "entity", "lastname") at the top
    //         const { purpleTriangle } = this.drawConnectionTypeTriangles(ctx, verticalX, sourceBottomY, targetX, targetY);
    
    //         // Draw the purple triangle last to ensure it appears in front
    //         if (purpleTriangle) {
    //             const { topX, topY, sideLength, height } = purpleTriangle;
    //             const bottomLeftX = topX - sideLength / 2;
    //             const bottomRightX = topX + sideLength / 2;
    //             const bottomY = topY + height;
    
    //             ctx.beginPath();
    //             ctx.moveTo(topX, topY);
    //             ctx.lineTo(bottomLeftX, bottomY);
    //             ctx.lineTo(bottomRightX, bottomY);
    //             ctx.closePath();
    //             ctx.fillStyle = "purple";
    //             ctx.fill();
    //             ctx.strokeStyle = "black";
    //             ctx.lineWidth = 2;
    //             ctx.stroke();

    //             // Add a black dot at the centroid of the purple triangle
    //             const centroidX = (topX + bottomLeftX + bottomRightX) / 3;
    //             const centroidY = (topY + bottomY + bottomY) / 3;
    //             ctx.beginPath();
    //             ctx.arc(centroidX, centroidY, 3, 0, 2 * Math.PI);
    //             ctx.fillStyle = "black";
    //             ctx.fill();
    //         }
    //     } else {
    //         // When triangles are hidden, draw the typeName (characterValue) both above and to the right of the purple triangle
    //         const purpleSideLength = this.toConcept.radius * 2;
    //         const purpleHeight = (Math.sqrt(3) / 2) * purpleSideLength;
    //         const purpleTopX = this.toConcept.x;
    //         const purpleTopY = this.toConcept.y - (purpleHeight / 2); // Top vertex of the purple triangle
    //         const purpleRightX = this.toConcept.x + (purpleSideLength / 2); // Right vertex of the purple triangle
    //         const purpleY = this.toConcept.y; // Center Y of the purple triangle
    
    //         // Draw the purple triangle
    //         const bottomLeftX = purpleTopX - purpleSideLength / 2;
    //         const bottomRightX = purpleTopX + purpleSideLength / 2;
    //         const bottomY = purpleTopY + purpleHeight;
    
    //         ctx.beginPath();
    //         ctx.moveTo(purpleTopX, purpleTopY);
    //         ctx.lineTo(bottomLeftX, bottomY);
    //         ctx.lineTo(bottomRightX, bottomY);
    //         ctx.closePath();
    //         ctx.fillStyle = "purple";
    //         ctx.fill();
    //         ctx.strokeStyle = "black";
    //         ctx.lineWidth = 2;
    //         ctx.stroke();

    //         // Add a black dot at the centroid of the purple triangle
    //         const centroidX = (purpleTopX + bottomLeftX + bottomRightX) / 3;
    //         const centroidY = (purpleTopY + bottomY + bottomY) / 3;
    //         ctx.beginPath();
    //         ctx.arc(centroidX, centroidY, 3, 0, 2 * Math.PI);
    //         ctx.fillStyle = "black";
    //         ctx.fill();
    
    //         // Draw the typeName closer to the purple triangle
    //         ctx.fillStyle = 'black';
    //         ctx.font = "12px 'Roboto', Arial, sans-serif";
    //         ctx.textAlign = "right"; // Align text so the right edge is at the specified x-coordinate
    //         ctx.textBaseline = "bottom";
    //         ctx.fillText(name, purpleTopX, purpleTopY - 5); // Moved 5 pixels closer
    
    //         // Draw the value closer to the bottom right of the purple triangle
    //         ctx.fillStyle = 'black';
    //         ctx.font = "12px 'Roboto', Arial, sans-serif";
    //         ctx.textAlign = "left"; // Align text to the left so it starts at the specified x-coordinate
    //         ctx.textBaseline = "middle"; // Center the text vertically at the bottom Y
    //         ctx.fillText(value, bottomRightX + 2, bottomY - 2); // Moved closer
    //     }
    // }
  