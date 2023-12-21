import { observable, action, computed } from "mobx";
import { IRootStore } from './RootStore';

export class DataFetchingStore {

    rootStore : IRootStore | undefined;

    constructor(rootStore? : IRootStore){
        this.rootStore = rootStore;
    }

    @observable isLoading: boolean = false;
    @observable error: string = '';
    anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    @action setLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    }

    @action setError = (error: string) => {
        this.error = error;
    }

    @computed get getError() {
        return this.error
    }

    @computed get getIsLoading() {
        return this.isLoading
    }

    // GET DATA
    async getResourceData( url : string, method : string, authKey: string = "" ) {
        this.setLoading(true)
        const response = await fetch(url.concat(`&apikey=${this.anonKey}`), {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authKey}`
            }
        });
        const data = await response.json();
        this.setLoading(false)
        return data
    }

    // POST DATA
    async postResourceData( url : string, data : any, method : string, authKey: string = "" ) {
        this.setLoading(true)
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authKey}`
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        this.setLoading(false)
        return res
    }

    // DELETE DATA
    async deleteResourceData( url : string, method : string, authKey: string = "" ) {
        this.setLoading(true)
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authKey}`
            }
        });
        const data = await response.json() || null;
        this.setLoading(false)
        return data
    }

    // PUT DATA
    async updateResourceData( url : string, data : any, method : string, authKey: string = "" ) {
        this.setLoading(true)
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authKey}`
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        this.setLoading(false)
        return res
    }
    

}