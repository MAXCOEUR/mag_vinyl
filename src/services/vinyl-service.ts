import { Vinyl, type iVinyl } from "@/models/vinyls";
import { queryBuilder } from "@/lib/mongo-query-builder";

export const vinylService = {
  // GET ALL
  fetchAll: async (req): Promise<any> => {
    const { filter, projection, options } = queryBuilder.buildFind({ query: req.query() });
    const xCount = await Vinyl.countDocuments(filter);
    const data = await Vinyl.find(filter, projection, options).populate("groupId");
    return { data, xCount };
  },

  // GET BY ID
  fetchById: async (req): Promise<iVinyl | null> => {
    const { id } = req.param();
    return await Vinyl.findById(id).populate("groupId");
  },

  // POST
  createOne: async (req): Promise<iVinyl> => {
    const body = await req.json();
    return await Vinyl.create(body);
  },

  // PUT
  updateOne: async (req): Promise<iVinyl | null> => {
    const { id } = req.param();
    const body = await req.json();
    // { new: true } renvoie le document après modification
    return await Vinyl.findByIdAndUpdate(id, body, { 
      returnDocument: 'after',
      runValidators: true 
    });
  },

  // DELETE
  deleteOne: async (req): Promise<iVinyl | null> => {
    const { id } = req.param();
    return await Vinyl.findByIdAndDelete(id);
  },
  fetchByGroup: async (req): Promise<iVinyl[]> => {
    const { filter, projection, options } = queryBuilder.buildFind({ query: req.query() });

    return await Vinyl.find(filter, projection, options).populate("groupId");
  },
  patchVinyl: async (req): Promise<iVinyl | null> => {
    const { id } = req.param();
    const body = await req.json(); // On ne récupère que les champs envoyés (ex: { price: 20 })
    return await Vinyl.findByIdAndUpdate(id, { $set: body }, { 
      returnDocument: 'after',
      runValidators: true
    });
  },
};