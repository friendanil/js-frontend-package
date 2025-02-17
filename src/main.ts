import "./style.css";

import { bootup } from "./app/routes/renderRoute.service.ts";
import { init, updateAccessToken } from "mftsccs-browser";
import { environment } from "./app/environments/environment.dev.ts";
import { getLocalStorageData } from "./app/pages/user/login.service.ts";


await init(environment?.boomURL, environment?.aiURL, "", environment?.baseNodeUrl, false, undefined, { activate: true}, { logApplication: true, logPackage: true},{logserver: "http://localhost:3000"});
const profileStorageData: any = await getLocalStorageData();
updateAccessToken(profileStorageData?.token);
bootup();

// window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
//     alert("Error occured: " + errorMsg);//or any message
//     return false;
// }

// window.addEventListener('unhandledrejection', function (e) {
//     alert("Error occurred: " + e.reason.message);
//   })