import { Schema } from "mongoose";

export interface IService {
    name             :   string;
    description      :   string;
    service_id       :   Schema.Types.ObjectId;
    price            :   number;
    status           :   boolean;
    createdAt       ?:   NativeDate;
    updatedAt       ?:   NativeDate;
}
export interface TypeCarEntity {
    _id              :   string;
    name             :   string;
    services         :   IService[];
    status           :   boolean;
    createdAt        :   NativeDate;
    updatedAt        :   NativeDate;
}