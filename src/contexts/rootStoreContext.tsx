import { createContext } from "react";
import {RootStore} from '../stores/RootStore';

export const rootStoreContext = createContext({
    rootStore : new RootStore(),
})