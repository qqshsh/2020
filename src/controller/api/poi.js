const Base = require('../base.js');
const pinyin = require('pinyin');

module.exports = class extends Base {
  async indexAction() {
    const res = await this.model('poi').where({'status': 1}).order('letter ASC').select();
    const result = [];
    const temp = {};
    let city = '';
    res.forEach(data => {
      const letter = data.letter;
      let key = letter.substr(0, 1).toLocaleUpperCase()
      if (key < 'A' || key > 'z') {
        key = '1';
      }
      if (!temp[key]) {
        temp[key] = {
          title: temp[key],
          data: []
        };
      }
      if (city !== data.city) {
        data.name = data.city;
        temp[key].data.push(data);
      } 
      city = data.city;
    });
    for (const key in temp) {
      result.push({
        title: key,
        key: key,
        items: temp[key].data
      });
    }
    this.success(result);
  }

  async cityInfoAction() {
    const city = this.get('city');
    console.log(city);
    const res = await this.model('poi').where({'status': 1, city: decodeURIComponent(city)}).order('type ASC').select();
    this.success(res);
  }
};
