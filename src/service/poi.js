const pinyin = require('pinyin');

module.exports = class extends think.Service {
  async update(data) {
    const letter = pinyin(data.city, {
      style: pinyin.STYLE_FIRST_LETTER
    });
    const pinyin1 = pinyin(data.city, {
      style: pinyin.STYLE_NORMAL
    });
    const params = {
      letter: letter.join(''),
      pinyin: pinyin1.join(''),
      status: 1
    //   create_time: think.datetime(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }
    const res = await this.model('poi').thenUpdate(params, {id: data.id});
    return {id: res};
  }
};
