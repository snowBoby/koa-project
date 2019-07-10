const puppeteer = require('puppeteer');
const url = `https://movie.douban.com/tag/#/?sort=R&range=0,10&tags=`;
const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
});
(async () => {
  console.log('start visit the target page');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  });
  const page = await browser.newPage();//开启新页面
  await page.goto(url, {
    waitUntil: 'networkidle2' //等待页面空闲时，为了让页面加载完毕
  });
  await sleep(3000);
  await page.waitForSelector('.more');  //等页面点击加载更多开始爬取
  for (let i = 0; i < 1; i++) {//只爬取俩页的数据
    await sleep(3000);
    await page.click('.more');
  }
  const result = await page.evaluate(() => {
    var $ = window.$;
    var items = $('.list-wp a');
    var links = [];
    if (items.length > 0) {
      items.each((index, item) => {
        let it = $(item);
        let doubanId = it.find('div').data('id');
        let title = it.find('.title').text();
        let rate = it.find('.rate').text();
        let poster = it.find('img').attr('src').replace('s_ratio','l_ratio');
        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }
    return links;
  });

  await browser.close();
  process.send({result});
  process.exit(0);
})()