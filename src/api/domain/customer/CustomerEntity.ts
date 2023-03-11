export interface IPhone {
    code             :   number;
    prefix           :   string;
    phone_number     :   number;
    expiration_date  :   NativeDate;
    verified         :   boolean;
    createdAt       ?:   NativeDate;
    updatedAt       ?:   NativeDate;
}
export interface CustomerEntity {
    _id              :   string;
    fullname         :   string;
    privacity        :   boolean;
    email            :   string;
    password        ?:   string;
    stripe_customer ?:   string;
    profile_image   ?:   string;
    google          ?:   Boolean;
    phone            :   IPhone;
    status          ?:   Boolean;
    facturapi_id    ?:   string;
    ine             ?:   string;
    curp            ?:   string;
    prook_address   ?:   string;
    criminal_record ?:   string;
    createdAt        :   NativeDate;
    updatedAt        :   NativeDate;
}