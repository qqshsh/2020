const Base = require('../base.js');

module.exports = class extends Base {
  async indexAction() {
    const res = await this.model('news').where({'status': 1}).select();
    this.success(res);
  }
};
