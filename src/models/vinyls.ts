import { model, Schema, Types } from "mongoose";

export interface iVinyl {
  title: string;
  releaseDate: Date;
  status: "bon" | "neuf" | "usé";
  price: number;
  groupId: Types.ObjectId;
  stock: number;
}

const vinylSchema = new Schema<iVinyl>({
  title: {
    type: String,
    required: true,
  },
  releaseDate: { 
    type: Date,
    max: [new Date(), "La date ne peut pas être dans le futur"] 
  },
  status: {
    type: String,
    enum: {
      values: ["bon", "neuf", "usé"],
      message: "{VALUE} n'est pas un état valide" // Bloque les états inconnus
    },
    default: "bon"
  },
  price: { 
    type: Number, 
    min: [0, "Le prix ne peut pas être négatif"] // Bloque les prix négatifs
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "groups",
    required: true,
  },
  stock: { type: Number, min: 0, default: 1 }
});

const Vinyl = model<iVinyl>("vinyls", vinylSchema);

export { Vinyl };