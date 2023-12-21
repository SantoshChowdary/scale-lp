import { useContext } from "react";
import { rootStoreContext } from "../contexts/rootStoreContext";
import { enableLogging } from "mobx-logger";

// for logging mobx actions
// enableLogging()


// custom hook to access store
export const useStore = () => useContext(rootStoreContext);