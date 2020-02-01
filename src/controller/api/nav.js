const Base = require('../base.js');

const cate = [{
        cateId: 10,
        cateName: '常用推荐'
    }, {
        cateId: 11,
        cateName: '防疫指南'
    }, {
        cateId: 12,
        cateName: '在线义诊'
    }, {
        cateId: 13,
        cateName: '谣言鉴定'
    }, {
        cateId: 14,
        cateName: '举报通道'
    }, {
        cateId: 15,
        cateName: '物资救援'
    }, {
        cateId: 16,
        cateName: '发热门诊'
    }, {
        cateId: 17,
        cateName: '实时疫情'
    }
]

module.exports = class extends Base {
    async indexAction() {
        const res = await this.model('nav').select();
        const cateMap = new Map();
        let reuselt = [];
        cate.map( (item, index) => {
            reuselt.push({
                title: item.cateName,
                item: []
            })
            cateMap.set(item.cateId, {
                cateName:item.cateName,
                index: index
            })
        })
        res.map(item => {
            const cateId = item.cate_id;
            const cate = cateMap.get(cateId);
            reuselt[cate.index].item.push(item)
        })
        this.success(reuselt);
    }
    async addAction() {
        // data.map(res => {
        //     res.item.map(item => {
        //         const id = this.model('nav').thenAdd({
        //             title: item.title,
        //             desc: item.desc,
        //             image: item.image,
        //             url: item.url,
        //             open_type: item.openType,
        //             qrcode: item.qrcode,
        //             status: 1,
        //             cate_id: cate[res.title],
        //             create_time: think.datetime(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        //             update_time: think.datetime(new Date(), 'YYYY-MM-DD HH:mm:ss')
        //         }); 
        //     })
            
        // })
        const data = {
            title: this.post('title'),
            desc: this.post('desc'),
            image: this.post('image'),
            url: this.post('url'),
            open_type: this.post('openType'),
            qrcode: this.post('qrcode'),
            status: 1,
            cate_id: this.post('cateId'),
            create_time: think.datetime(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            update_time: think.datetime(new Date(), 'YYYY-MM-DD HH:mm:ss')
        }
        if(data.title) {
            const id = await this.model('nav').add(data); 
        } 
        this.success('id');
        
    }
    async cateAction() {
        const res = {
            cate: cate,
            openType: [{
                id: 1,
                name: '正常模式'
            }, {
                id: 2,
                name: 'Iframe模式'
            }, {
                id: 3,
                name: '二维码模式'
            }]
        } 
        this.success(res);
    }
};  