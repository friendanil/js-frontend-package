import { builder } from "../pages/builder/builder.index.ts";
import { CreatePrototype } from "../pages/builder/createprototype.index.ts";
import { classlist } from "../pages/classroom/classroom.index.ts";
import { classlistAll } from "../pages/classroom/classroomall.index.ts";
import { classlistCreate } from "../pages/classroom/classroomcreate.index.ts";
import { create } from "../pages/example/create.example.ts";
import { list } from "../pages/example/list.example.ts";
import { phonebook } from "../pages/example/wrapper.example.ts";
import homeIndex from "../pages/home/home.index.ts";
import noPageFoundIndex from "../pages/noPageFound/noPageFound.index.ts";
import { selector } from "../pages/tasklist/selector.tasklist.ts";
import { tasklist } from "../pages/tasklist/wrapper.tasklist.ts";
import { login } from "../pages/user/login.example.ts";
import { logout } from "../pages/user/logout.example.ts";
import { register } from "../pages/user/register.example.ts";

type RouteParams = {
  /**
   * This is a path for route url
   */
  path: any;
  /**
   * This is a label for the route as a name
   */
  linkLabel?: string;
  /**
   * This is the content that route renders
   */
  content: any;
  /**
   * If path needs to be authenticated. ie. true, false
   */
  isAuthenticated?: boolean;
};

const routes: RouteParams[] = [
  {
    path: "/",
    linkLabel: "Home",
    content: homeIndex,
  },
  {
    path: "/login",
    linkLabel: "Login",
    content: login,
  },
  {
    path: "/register",
    linkLabel: "Signup",
    content: register,
  },
  {
    path: "/logout",
    linkLabel: "Signup",
    content: logout,
  },
  {
    path: "/example",
    linkLabel: "Example",
    content: create,
    isAuthenticated: true
  },
  {
    path: "/phonebook",
    linkLabel: "Phonebook",
    content: phonebook,
    isAuthenticated: true
  },
  {
    path: "/tasklist",
    linkLabel: "Task List",
    content: tasklist,
    isAuthenticated: true
  },
  {
    path: "/selector",
    linkLabel: "Task List",
    content: selector,
    isAuthenticated: true
  },
  {
    path: "/classlist",
    linkLabel: "My Class List",
    content: classlist,
    isAuthenticated: true
  },
  {
    path: "/classlist-create",
    linkLabel: "My Class List create",
    content: classlistCreate,
    isAuthenticated: true
  },
  {
    path: "/classlist-all",
    linkLabel: "My Class List create",
    content: classlistAll,
    isAuthenticated: true
  },
  {
    path: "/example-list",
    linkLabel: "Example",
    content: list,
    isAuthenticated: true
  },
  {
    path: "/builder",
    linkLabel: "Builder",
    content: builder,
    isAuthenticated: true
  },
  {
    path: "/prototype",
    linkLabel: "Prototype",
    content: CreatePrototype,
    isAuthenticated: true
  },
  {
    path: "/404",
    linkLabel: "404",
    content: noPageFoundIndex,
  }
];

export default routes;
