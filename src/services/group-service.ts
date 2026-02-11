import { Group, type iGroup } from "@/models/groups";
import { queryBuilder } from "@/lib/mongo-query-builder";

export const groupService = {
  // GET ALL
  fetchAll: async (req): Promise<any> => {
    const { filter, projection, options } = queryBuilder.buildFind({ query: req.query() });
    const xCount = await Group.countDocuments(filter);
    const data = await Group.find(filter, projection, options);
    return { data, xCount };
  },

  // GET BY ID
  fetchById: async (req): Promise<iGroup | null> => {
    const { id } = req.param();
    return await Group.findById(id);
  },

  // POST
  createOne: async (req): Promise<iGroup> => {
    const body = await req.json();
    return await Group.create(body);
  },

  // PUT
  updateOne: async (req): Promise<iGroup | null> => {
    const { id } = req.param();
    const body = await req.json();
    return await Group.findByIdAndUpdate(id, body, { 
      returnDocument: 'after',
      runValidators: true
     });
  },

  // DELETE
  deleteOne: async (req): Promise<iGroup | null> => {
    const { id } = req.param();
    return await Group.findByIdAndDelete(id);
  },
};