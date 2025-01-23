import routes from "./routes";

const app = <HTMLElement>document.getElementById("app");

/**
 * Check authentication for route
 * @returns 
 */
const checkAuthentication = () => {
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || "";
  if (dataFromLocalStorage) {
    const profileData: any = JSON.parse(dataFromLocalStorage);
    return profileData?.token ? true : false;
  } else {
    return false;
  }
};

/**
 * 
 * @param path 
 * @returns 
 */
const pathToRegex = (path: any) =>
  new RegExp("^" + path.replace(/:\w+/g, "(.+)") + "$");

const getParams = (match: any) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result: any) => result[1]
  );
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

/**
 * Check routing, history and load html in app
 */
export async function checkRouting() {
  const potentialMatches = routes.map((route: any) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch: any) => potentialMatch.result !== null
  );

  // NOT FOUND PAGE
  if (!match) {
    const notFoundURL = routes.find((route: any) => route.path === "/404");
    match = {
      route: notFoundURL,
      result: [location.pathname],
    };
  } else {
    // check route authentication
    const routeInfo = match?.route;
    if (routeInfo?.isAuthenticated) {
      const isAuthenticationValid = checkAuthentication();
      if (!isAuthenticationValid) {
        const loginURL = routes.find((route: any) => route.path === "/login");
        match = {
          route: loginURL,
          result: loginURL?.path,
        };
        history.pushState(null, "", loginURL?.path);
      }
    }
  }


  const view = new match.route.content(await getParams(match));

  /**
   * if the route is of type StatefulWidget then mount the application to the dom.
   */
  // if(Object.getPrototypeOf(view.constructor).name  == "StatefulWidget"){
  //   app.innerHTML = "";
    app.innerHTML = "";
    await view?.mount(app);
  // }
  // else{
  //   const htmlContentDetails = await view?.getHtml();
  //   app.innerHTML = htmlContentDetails;

  // }
}

/**
 * Render route for history
 * @param route 
 */
export const renderContent = async (route: any) => {
  history.pushState(null, "", route);
  checkRouting();
};

/**
 * Navigate to the route
 * @param route 
 */
export const updateContent = async (route: any) => {
  window.history.pushState({ route }, "", route);
  checkRouting();
};

/**
 * Render routes in bootup
 */
const renderInitialPage = () => {
  const route = window.location.pathname;
  renderContent(route);
};

/**
 * This is a link for route visit as in SPA
 * Use <router-link> </router-link>
 */
const initRouterLinks = () => {
  customElements.define(
    "router-link",
    class extends HTMLElement {
      constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
      }

      connectedCallback() {
        this.addEventListener("click", this.handleClick);
      }

      disconnectedCallback() {
        this.removeEventListener("click", this.handleClick);
      }

      handleClick(event: any) {
        event.preventDefault(); // Prevent default anchor tag behavior
        const href = this.getAttribute("href");
        if (href) renderContent(href);
      }

      // Optional: Set attributes through properties
      set href(val: any) {
        this.setAttribute("href", val);
      }

      get href() {
        return this.getAttribute("href");
      }
    }
  );
};

/**
 * Bootup on initial load
 */
export const bootup = () => {
  renderInitialPage();
  initRouterLinks();
  window.addEventListener("popstate", checkRouting);
};
