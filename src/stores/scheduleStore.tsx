import {action, observable, computed} from "mobx";
import { IRootStore } from "./RootStore";

export class ScheduleStore{
    rootStore : IRootStore;

    constructor(rootStore : IRootStore){
        this.rootStore = rootStore;
    }

    @observable selectedDate: any = new Date();
    @observable datesArray: any = [];

    @action generateDates = () => {
        const currentDate: Date = new Date("08-10-2023");
        for (let i = 0; i < 500; i++) {
          this.datesArray.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
    };

    @computed get getDatesArray () {
        return this.datesArray
    }

    @action setSelectedDate = (date : Date) => {
        this.selectedDate = date
    }

    @computed get getSelectedDate () {
        // console.log("getDate", this.selectedDate)
        return this.selectedDate
    }

    @action getDateFormat = (date : Date) => {
        const day = date.getDate()+1;
        const month = date.getMonth();
        const year = date.getFullYear();
        return day + "-" + month + "-" + year
    }

    @action checkTwoDates = (date1 : Date, date2: Date) => {
        console.log(this.getDateFormat(date1) === this.getDateFormat(date2))
        return this.getDateFormat(date1) === this.getDateFormat(date2);
    }

    @action setDatesArray = (arr : any) => {
        this.datesArray = arr
    }

}