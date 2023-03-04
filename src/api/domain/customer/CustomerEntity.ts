export interface CustomerEntity {
    _id             :   String;
    fullname        :   String;
    privacity       :   Boolean;
    email           :   String;
    password       ?:   String;
    stripe_customer?:   String;
    profile_image  ?:   String;
    createdAt       :   NativeDate;
    updatedAt       :   NativeDate;
}