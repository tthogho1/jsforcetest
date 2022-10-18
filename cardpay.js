
const payjp = require('payjp')('sk_test_c62fade9d045b54cd76d7036');//
// const payjp = require('payjp')('sk_...', {timeout: 20 * 1000});

var metas = {
    "案件番号":'111111',
    "請求番号":'INV-000416',
    "お客様名":'田中　タロウ',
    "利用日":"2022年9月9日(金)"
};

main();

async function main() {
    const pay = await payjp.charges.create({
        amount: 1000,
        currency: 'jpy',
        card: 'tok_c0e4b0357aeb9922dd3b518c7fd1', // カードトークン
        metadata : metas
      });

    console.log(pay);

    for (let key in pay) {
        console.log('key:' + key + ' value:' + pay[key]);
    }

    const refund = await payjp.charges.refund(
        pay.id,
        {
            amount: 1000 ,   // 1000円返金
            refund_reason: '返金エラー'
    });

    console.log(refund);
    for (let key in refund) {
        console.log('key:' + key + ' value:' + refund[key]);
    }

}