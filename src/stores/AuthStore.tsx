import { observable, action, computed } from "mobx";
import { IRootStore } from './RootStore';
import { IUserDetails } from "../types/storeTypes/userDetailsT";
import { loginEnums } from "../services/loginEnums";


export class AuthStore {

    rootStore : IRootStore | undefined;
    constructor(rootStore? : IRootStore){
        this.rootStore = rootStore;
    }

    @observable userDetails : IUserDetails = {
        name: '',
        lastName : '',
        email: '',
        dob : '',
        profilePicUrl : '',
        userRole : '',
        phoneNumber : '',
        userId : '',
        invitationCode : '',
        activeGrowthCycleId : '',
        termsAndConditionsStatus : false,
        activeProductEnrollPlan : '',
        userLanguage : '',
        token : '',
        isAuthenticated : false 
    }

    @action async checkUserCredentials(phoneNumber : string, password : string) {
        const userDataFetch: string = `https://wxoheozbksyrezqvgeoc.supabase.co/rest/v1/user_authentication?select=*&mobile_number=eq.${phoneNumber}&password=eq.${password}`
        const method: string = "GET";

        // checking whether user was in database or not
        const userIDfetch: string =  `https://wxoheozbksyrezqvgeoc.supabase.co/rest/v1/user_authentication?select=user_id&mobile_number=eq.${phoneNumber}`;
        const getUserIDFetch = await this.rootStore?.dataFetchingStore.getResourceData(userIDfetch, method);
        
        if(getUserIDFetch.length === 0) {
            return loginEnums.invalidUser
        } else {
            // check if user password is correct
            const checkUserPasswordFetch = await this.rootStore?.dataFetchingStore.getResourceData(userDataFetch, method)
            if (checkUserPasswordFetch.length === 0) {
                return loginEnums.invalidPassword
            } else {
                this.userDetails = {
                    name: checkUserPasswordFetch[0].name,
                    lastName : checkUserPasswordFetch[0]?.last_name,
                    email: checkUserPasswordFetch[0].email,
                    dob : checkUserPasswordFetch[0]?.dob,
                    profilePicUrl : checkUserPasswordFetch[0]?.profile_pic_url,
                    userRole : checkUserPasswordFetch[0]?.user_role,
                    phoneNumber : checkUserPasswordFetch[0].mobile_number,
                    userId : checkUserPasswordFetch[0].user_id,
                    invitationCode : checkUserPasswordFetch[0]?.invitation_code,
                    activeGrowthCycleId : checkUserPasswordFetch[0]?.active_growth_cycle_id,
                    termsAndConditionsStatus : checkUserPasswordFetch[0]?.terms_and_conditions_status,
                    activeProductEnrollPlan : checkUserPasswordFetch[0]?.active_product_enroll_plan,
                    userLanguage : checkUserPasswordFetch[0]?.user_language,
                    token : checkUserPasswordFetch[0].token,
                    isAuthenticated : true
                };

                localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
                return loginEnums.loginSuccessFull
            }
        }
    }

    @action checkUsersLocalStorage() {
        const userDetails: any = localStorage.getItem('userDetails');
        if(userDetails?.token !== null) {
            this.userDetails = JSON.parse(userDetails);
            return loginEnums.loginSuccessFull
        }
    }

    @action performLogoutUser(){
        localStorage.removeItem('userDetails');
        this.userDetails = {
            name: '',
            lastName : '',
            email: '',
            dob : '',
            profilePicUrl : '',
            userRole : '',
            phoneNumber : '',
            userId : '',
            invitationCode : '',
            activeGrowthCycleId : '',
            termsAndConditionsStatus : false,
            activeProductEnrollPlan : '',
            userLanguage : '',
            token : '',
            isAuthenticated : false
        };

        return loginEnums.logoutSuccessFull
    }

    @action async registerNewUser(userDate: any) {
        const newUserRegUrl = "https://wxoheozbksyrezqvgeoc.supabase.co/rest/v1/user_authentication";
        const method = "POST";

        const newUser = await this.rootStore?.dataFetchingStore.postResourceData(newUserRegUrl, userDate, method);
        if (newUser) {
            return loginEnums.registrationSuccessful
        } else {
            return loginEnums.registrationFailed
        }
    }
}