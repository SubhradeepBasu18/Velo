import mongoose from "mongoose"
import type { MessageType } from "../types/Message.type.ts";

const messageSchema = new mongoose.Schema<MessageType>({
  title: { 
    type: String, 
    required: true 
  }, 
  body: { 
    type: String, 
    required: true 
  }, 
  subject: { 
    type: String, 
    required: true 
  }, 
  customizationOptions: { 
    type: Object, 
    default: {} 
  }, 
  
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);