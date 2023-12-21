import { observable, action } from "mobx";
import {v4 as uuidv4} from 'uuid';
import { RootStore } from './RootStore';

export interface IUserStore {
    id : string;
    name? : string;
    pic? : string;
}

export class UserStore implements IUserStore{

    @observable id = uuidv4();
    @observable name? = "";
    @observable pic? = "";

    private rootStore : any;

    constructor(rootStore? : RootStore){
        this.rootStore = rootStore;
    }

    @action getName = (name : string): void => {
        this.name = name;
    }

    
}