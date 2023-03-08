export interface CustomerEntity {
    _id             :   string;
    fullname        :   string;
    privacity       :   boolean;
    email           :   string;
    password       ?:   string;
    stripe_customer?:   string;
    profile_image  ?:   string;
    createdAt       :   NativeDate;
    updatedAt       :   NativeDate;
}