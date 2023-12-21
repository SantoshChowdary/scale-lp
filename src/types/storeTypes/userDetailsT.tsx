export interface IUserDetails {
    name: string;
    lastName : string;
    email: string;
    dob? : string;
    profilePicUrl? : string;
    userRole? : string;
    phoneNumber : string;
    userId : string;
    invitationCode? : string;
    activeGrowthCycleId? : string;
    termsAndConditionsStatus? : boolean;
    activeProductEnrollPlan : string;
    userLanguage? : string;
    token : string | null;
    isAuthenticated : boolean;
}