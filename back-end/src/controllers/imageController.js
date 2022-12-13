const path = require('path');

const getImages = (req, res) => {
  const { name } = req.params;
  const pathName = path.join(__dirname, `/../images/${name}`);
  return res.status(200).sendFile(pathName);
};

module.exports = { getImages };
