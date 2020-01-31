const Base = require("../base.js");

module.exports = class extends Base {
  async indexAction() {
    let res = await this.model("hot").find();
    const article = await this.model('news').where({id: res.top_id}).find();
    this.success({
        ...res,
        article
    });
  }
  
};
