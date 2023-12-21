import { AuthStore } from "./AuthStore";
import { UserStore } from "./UserStore";
import {CounterStore} from './counterStore'
import { DataFetchingStore } from "./dataFetchingStore";
import { ScheduleStore } from "./scheduleStore";

export interface IRootStore {
    authStore : AuthStore;
    userStore : UserStore;
    counterStore : CounterStore;
    dataFetchingStore : DataFetchingStore;
    scheduleStore : ScheduleStore;
}

export class RootStore implements IRootStore {
    authStore : AuthStore;
    userStore : UserStore;
    counterStore : CounterStore;
    dataFetchingStore : DataFetchingStore;
    scheduleStore: ScheduleStore;

    constructor(){
        this.authStore = new AuthStore(this);
        this.userStore = new UserStore(this);
        this.counterStore = new CounterStore(this);
        this.dataFetchingStore = new DataFetchingStore(this);
        this.scheduleStore = new ScheduleStore(this);
    }
}

