// # src/ContextAPI.js
import { createContext } from "react";
const ContextAPI = createContext({ defaultValue: "checked!" });
export const ContextProvider = ContextAPI.Provider;
export const ContextConsumer = ContextAPI.Consumer;
export default ContextAPI;
