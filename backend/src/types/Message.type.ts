import {Types, Document} from "mongoose";

export interface MessageType extends Document{
    title: string;
    body: string;
    subject: string;
    customizationOptions: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
}
