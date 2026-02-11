import { model, Schema, Document } from "mongoose";

export interface iGroup {
  name: string;
  genre?: string;
  formationYear?: number;
}

const groupSchema = new Schema<iGroup>({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  formationYear: {
    type: Number,
  },
});

const Group = model<iGroup>("groups", groupSchema);

export { Group };