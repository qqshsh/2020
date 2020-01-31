const Base = require('../base.js');

module.exports = class extends Base {
  async indexAction() {
    const res = await this.model('news').select();
    this.success(res);
  }
};
