/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-hidden";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English" },
  { id: "es", name: "Español" }
];

export const firebaseConfig = {
  apiKey: "AIzaSyADRPXBQJXBVFAOAQEQdm0D8I0wYiQgCLQ",
  authDomain: "emergency-f1f7a.firebaseapp.com",
  databaseURL: "https://emergency-f1f7a.firebaseio.com",
  projectId: "emergency-f1f7a",
  storageBucket: "emergency-f1f7a.appspot.com",
  messagingSenderId: "679995520268"
};

export const searchPath = "/app/pages/search";
export const servicePath = "http://localhost:5001"; //"https://api.coloredstrategies.com";
export const emergencyApi = "http://localhost:5001";
export const appSocketHost = "ws://localhost:5001";

/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const isMultiColorActive = true;
export const defaultColor = "light.purple";
