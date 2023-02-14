import {
  AboutSection,
  FilterByOption,
  NoteOption,
  ProfileOption,
  Setting,
} from "./types";

export const searchResultsFilterBy: FilterByOption[] = [
  { id: 1, value: "categories", label: "Category" },
  { id: 2, value: "createdAt", label: "Date" },
  { id: 3, value: "content", label: "Content" },
  { id: 4, value: "title", label: "Title" },
];

const colorOptions = [
  "black",
  "yellow",
  "red",
  "blue",
  "green",
  "white",
  "orange",
  "magenta",
  "purple",
  "#e0c9a6",
];

export const noteOptions: NoteOption[] = [
  {
    id: 1,
    label: "Font Family:",
    options: ["Poppins", "Sans"],
    usedRule: "fontFamily",
  },
  {
    id: 2,
    label: "Font Size:",
    options: ["16px", "32px"],
    usedRule: "fontSize",
  },
  {
    id: 3,
    label: "Title Font Size:",
    options: ["16px", "32px"],
    usedRule: "titleFontSize",
  },
  {
    id: 4,
    label: "Text Color:",
    options: colorOptions,
    usedRule: "textColor",
  },
  {
    id: 5,
    label: "Title Color:",
    options: colorOptions,
    usedRule: "titleColor",
  },
  {
    id: 6,
    label: "Note Color:",
    options: colorOptions,
    usedRule: "backgroundColor",
  },
];

export const profileOptions: ProfileOption[] = [
  {
    id: 1,
    name: "Settings",
    label: "settings",
  },
  {
    id: 2,
    name: "Your Notes",
    label: "notes",
  },
  {
    id: 3,
    name: "Your Favorite Notes",
    label: "favoriteNotes",
  },
  {
    id: 4,
    name: "Sign Out",
    label: "signout",
    overlayModalMessage: "Are you sure you want to sign out?",
  },
  {
    id: 5,
    name: "Delete Account",
    label: "deleteAccount",
    overlayModalMessage: "Are you sure you want to delete your account?",
  },
];

export const authorProfileOptions: ProfileOption[] = [
  {
    id: 1,
    name: "Notes",
    label: "notes",
  },
  {
    id: 2,
    name: "Favorite Notes",
    label: "favoriteNotes",
  },
];

export const profileSettings: Setting[] = [
  {
    id: 1,
    name: "Setting 1",
  },
  {
    id: 2,
    name: "Setting 2",
  },
  {
    id: 3,
    name: "Setting 3",
  },
  {
    id: 4,
    name: "Setting 4",
  },
  {
    id: 5,
    name: "Setting 5",
  },
  {
    id: 5,
    name: "Setting 6",
  },
];

export const aboutSections: AboutSection[] = [
  {
    id: 1,
    textContent:
      "This project was made using React with Typescript,Redux,Sass on the frontend...",
    images: [
      {
        id: 1,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1668764549/Icons%20and%20Stuff/react_js_logo_icon512_b7nzgm.webp",
        destinationUrl: "https://reactjs.org",
      },
      {
        id: 2,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1674063331/Icons%20and%20Stuff/typescript_logo_png_kl85ny.webp",
        destinationUrl: "https://www.typescriptlang.org/",
      },
      {
        id: 3,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1668764511/Icons%20and%20Stuff/redux-logo_ejnmb7.webp",
        destinationUrl: "https://redux.js.org/",
      },
      {
        id: 4,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1674063415/Icons%20and%20Stuff/sass-logo-2_xkltmh.webp",
        destinationUrl: "https://sass-lang.com/",
      },
    ],
  },
  {
    id: 2,
    textContent: "Node,Express,Postgresql,Prisma,Redis on the backend...",
    images: [
      {
        id: 1,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1668764542/Icons%20and%20Stuff/nodejs-logo-png--435_xz77cw.webp",
        destinationUrl: "https://nodejs.org/en/",
      },
      {
        id: 2,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1668764524/Icons%20and%20Stuff/express-js-icon-20_onazqf.webp",
        destinationUrl: "https://expressjs.com/",
      },
      {
        id: 3,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1674063477/Icons%20and%20Stuff/postgresql-logo-png-transparent_zxfyrt.webp",
        destinationUrl: "https://www.postgresql.org/",
      },
      {
        id: 4,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1674063501/Icons%20and%20Stuff/prisma-logo-3805665B69-seeklogo.com_cj8pk8.webp",
        destinationUrl: "https://www.prisma.io/",
      },
      {
        id: 5,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1674063521/Icons%20and%20Stuff/redis-logo_i8mudb.webp",
        destinationUrl: "https://redis.io/",
      },
    ],
  },
  {
    id: 3,
    textContent: "Render(for server hosting and redis db hosting)...",
    images: [
      {
        id: 1,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1674063547/Icons%20and%20Stuff/render_logo_fu2pxk.webp",
        destinationUrl: "https://render.com/",
      },
    ],
  },
  {
    id: 4,
    textContent: "ElephantSQL(for postgresql db hosting)...",
    images: [
      {
        id: 1,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1674063563/Icons%20and%20Stuff/elephantsql_logo_zlzsk0.png",
        destinationUrl: "https://customer.elephantsql.com/login",
      },
    ],
  },
  {
    id: 5,
    textContent: "and Netlify(for frontend hosting).",
    images: [
      {
        id: 1,
        imageUrl:
          "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_100/v1668764538/Icons%20and%20Stuff/netlify-logo-png-transparent_f4eya5.webp",
        destinationUrl: "https://www.netlify.com/",
      },
    ],
  },
];
