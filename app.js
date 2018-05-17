var koa         = require('koa');
var controller  = require('koa-route');
var app         = koa();
var views       = require('co-views');
var render      = views('./view',{
    map : {html : 'ejs'}
});
var koa_static  = require('koa-static-server');
var service     = require('./service/webAppService.js');
var querystring = require('querystring');
app.use(koa_static({
    rootDir : './static/',
    rootPath: '/static/',
    maxage : 0
}))
app.use(controller.get('/route_test',function *() {
    this.set('Cache-Control','no-cache');
    this.body = 'hello world';
}));


app.use(controller.get('/ejs_test',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('test',{title : 'title_test'});
}));

app.use(controller.get('/',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('index',{title : '书城首页'});
}));
app.use(controller.get('/search',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('search',{title : '搜索界面'});
}));
app.use(controller.get('/female',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('female',{title : '女生频道'});
}));
app.use(controller.get('/male',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('male',{title : '男生频道'});
}));
app.use(controller.get('/category',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('category',{title : '分类'});
}));
app.use(controller.get('/free',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('free',{title : '限时免费'});
}));
app.use(controller.get('/rank',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('rank',{title : '排行'});
}));
app.use(controller.get('/book',function *() {
    this.set('Cache-Control','no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var boolId = params.id;
    this.body = yield render('book',{bookId:bookId});
}));
//获取模拟数据得方法
app.use(controller.get('/api_test',function *() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_test_data();
}));

app.use(controller.get('/ajax/index',function *() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_index_data();
}));
//真实请求线上数据
app.use(controller.get('/ajax/search',function *() {
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params      = querystring.parse(this.req._parsedUrl.query);
    var start       = params.start;
    var end       = params.endt;
    var keyword       = params.keyword;
    this.body = yield service.get_search_data(start,end,keyword);
}));
app.use(controller.get('/ajax/rank',function *() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_rank_data();
}));
app.use(controller.get('/ajax/book',function *() {
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params      = querystring.parse(this.req._parsedUrl.query);
    var id       = params.id;
    if(!id){
        id = "";
    }
    this.body = service.get_book_data(id);
}));


app.listen(3002);
console.log('Koa server is started!');