const { forwardTo } = require('prisma-binding');

const Queries = {
  async getPins(parent, args, context, info) {
    const pins = await context.db.query.pins();
    return pins;
  },
  pin: forwardTo('db'),
};

module.exports = Queries;
