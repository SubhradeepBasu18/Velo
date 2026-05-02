import {Types, Document} from "mongoose";

export interface AnalyticsType extends Omit<Document, 'errors'>{
    successCount: number;
    failureCount: number;
    errors: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
