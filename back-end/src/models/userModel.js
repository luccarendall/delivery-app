const { User } = require('../database/models');

const find = async (filters) => {
  const user = await User.findOne({
    where: filters,
    attributes: { exclude: ['password'] },
  });
  return user;
};

const create = async (body) => {
  const user = await User.create(body);
  return user;
};

module.exports = { find, create };
