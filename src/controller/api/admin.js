const Base = require('../base.js');

module.exports = class extends Base {
  async indexAction() {
    const res = await this.model('news').select();
    this.success(res);
  }

  async cityToPinyinAction() {
    const res = await this.model('poi').select();
    res.map((item, index) => {
        if(item.id > 6) {
            think.service('poi').update(item)
        }
    })
  }
};
