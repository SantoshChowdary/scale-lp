
import { makeObservable, action, computed, observable, makeAutoObservable} from "mobx";
import { IRootStore } from "./RootStore";
export class CounterStore {
    rootStore : IRootStore | undefined;

    constructor(rootStore? : IRootStore){
        makeAutoObservable(this)
        this.rootStore = rootStore;
    }

    count = 0;
    increment = () => {
        this.count += 1;
    };

    decrement = () => {
        this.count -= 1;
    };

    get countValue() {
        return this.count
    }

}