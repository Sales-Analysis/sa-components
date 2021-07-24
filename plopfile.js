const plopfileLocation = require.resolve('@sales-analysis/sa-frontend-configs/plopfile.js')

module.exports = function (plop) {
  plop.load(plopfileLocation)
  plop.setPlopfilePath(plopfileLocation);
}
