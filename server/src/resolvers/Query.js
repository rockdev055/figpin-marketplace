const { forwardTo } = require('prisma-binding');

const Queries = {
  async getPins(parent, args, context, info) {
    const pins = await context.db.query.pins(args);
    return pins;
  },
  pin: forwardTo('db'),
  pinsConnection: forwardTo('db'),
};

module.exports = Queries;
