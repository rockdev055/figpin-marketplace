const Mutations = {
  async createPin(parent, args, context, info) {
    const pin = await context.db.mutation.createPin(
      { data: { ...args } },
      info
    );
    return pin;
  },
};

module.exports = Mutations;
