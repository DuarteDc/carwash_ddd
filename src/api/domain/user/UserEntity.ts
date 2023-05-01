export interface UserEntity {
    _id             :   string;
    fullname        :   string;
    email           :   string;
    password        :   string;
    profile_image   : string;
    status          :   boolean;
    createdAt       :   NativeDate;
    updatedAt       :   NativeDate;
}