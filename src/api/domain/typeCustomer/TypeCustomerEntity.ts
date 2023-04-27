import { Schema } from 'mongoose';

export interface TypeCustomerEntity {
    _id              :   string;
    name             :   string;
    status           :   boolean;
    createdAt        :   NativeDate;
    updatedAt        :   NativeDate;
}