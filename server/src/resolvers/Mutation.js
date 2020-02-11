const Mutations = {
  async createPin(parent, args, context, info) {
    const pin = await context.db.mutation.createPin(
      { data: { ...args } },
      info
    );
    return pin;
  },
  async updatePin(parent, args, context, info) {
    const updates = { ...args };
    delete updates.id;
    return context.db.mutation.updatePin(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

module.exports = Mutations;
