// src/app/pages/user/register.example.ts
import { Signup, SignupModel } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import { updateContent } from "../../routes/renderRoute.service";
export class register extends StatefulWidget{


    after_render(): void {
        let email = this.getElementById("email") as HTMLInputElement;
        let password = this.getElementById("password") as HTMLInputElement;
        let submitButton = this.getElementById("submit");
        console.log("this is the submit button eventeer", submitButton);
        if(submitButton){
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();
                let signupData: SignupModel = {
                    email: email.value,
                    password: password.value
                }
                console.log("this is the login clicked");
                Signup(signupData).then((output: any)=>{
                    console.log("This is signup complete", output);
                    updateContent('/login');
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
            html = `
                <div class="container">
                    <form>
                        <div>
                            <div class="formbody">
                                <label>Email: </label>
                                <input type=text id="email" placeholder="email">
                            </div>
                            <div class="formbody">
                                <label>Password: </label>
                                <input type=password id="password" placeholder="password">
                            </div>
                            <div class="formbody">
                                <label>Repeat Password: </label>
                                <input type=password id="verify-password" placeholder="password">
                            </div>
                            <button class="btn btn-primary" id="submit">Submit</button>
                            <div style="color: red" id="error"></div>
                        </div>
                    </form>
                </div>
            `
            return html;
        }
}