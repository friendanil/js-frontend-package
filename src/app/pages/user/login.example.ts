// src/app/pages/user/login.example.ts

import { LoginToBackend } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import { saveTolocalStorage } from "./login.service";
import { updateContent } from "../../routes/renderRoute.service";

export class login extends StatefulWidget{

    /**
     * These are the events that user adds. These could be any thing like populating the data to creating the data
     * 
     */
        after_render(): void {
            let email = this.getElementById("email") as HTMLInputElement;
            let password = this.getElementById("password") as HTMLInputElement;
            let submitButton = this.getElementById("submit");
            console.log("this is the submit button eventeer", submitButton);
            if(submitButton){
                submitButton.onclick = (ev: Event) => {
                    ev.preventDefault();
        
                    console.log("this is the login clicked");
                    LoginToBackend(email.value, password.value).then((output: any)=>{
                        saveTolocalStorage(output);
                        updateContent('/');
                    }).catch((err)=>{
                        let error = this.getElementById("error");
                        if(error){
                            error.innerHTML = err.message;
                        }
                    });
                    
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
                <div class="formbody">
                    <label>Email: </label>
                    <input type = text id="email" placeholder="email">
                </div>
                <div class="formbody">
                    <label>Password: </label>
                    <input type = password id="password" placeholder="password">
                </div>
                    <button class="btn btn-primary" id="submit">Submit</button>
                    <div style="color: red" id="error"></div>
                </div>
            </form>
    
            </div>`
            return html;
        }
}