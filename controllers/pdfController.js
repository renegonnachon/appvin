const { savePdf } = require('../utils/pdfUtils');
var path = require('path');
var appDir = path.dirname(require.main.filename);
const template = require('../pdf/index');

const save = async (req, res) => {
  const fileName = req.body.itemId;
  res.send(savePdf(template(req.body), fileName));
};

const get = async (req, res) => {
  console.log('here');
  const { customerId, itemId } = req.params;
  const dir = `${appDir}/pdf/files/${itemId}.pdf`;
  console.log(dir);
  res.sendFile(dir);
};

module.exports = {
  save,
  get,
};
