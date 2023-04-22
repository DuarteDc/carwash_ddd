export interface UserEntity {
    fullname    :   string;
    email       :   string;
    password    :   string;
    status      :   boolean;
    createdAt   :   NativeDate;
    updatedAt   :   NativeDate;
}