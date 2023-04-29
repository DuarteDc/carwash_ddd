export interface IAuthPopulateConfig {
    path    : string;
    select  : string;
}


export const authPopulateConfing: IAuthPopulateConfig = {
    path: 'type_customer',
    select: 'name',
}