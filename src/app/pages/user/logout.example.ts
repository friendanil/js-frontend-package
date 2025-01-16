import { StatefulWidget } from "mftsccs-browser";
import { updateContent } from "../../routes/renderRoute.service";

export class logout extends StatefulWidget{

    after_render(): void {
        localStorage.removeItem("profile");
        updateContent("/");
        location.reload();
    }


    getHtml(): string {
        return "You are logged out";
    }

}