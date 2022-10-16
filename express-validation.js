const { check, validationResult } = require('express-validator');

const express = require('express')
const app = express()
const port = 3000

const i18n = require('i18n');
app.use(i18n.init);
i18n.configure({
    locales:['ja'],
    directory: __dirname + '/locales',
    objectNotation: true
});


//https://blog.capilano-fw.com/?p=5619#i-9

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/user/', [
    check('value1').not().isEmpty().isEmail(),
    check('value2').isNumeric().withMessage((value, { req }) => {
        return req.__('validation.message.required');
      }) 
  ], (req, res) => {
  
    const errors = validationResult(req);
    let a = req.__('validation.message.required'); 
    console.log(a);

  
    if(!errors.isEmpty()) { // バリデーション失敗
  
      return res.status(422).json({ errors: errors.array() });
  
    }
  
    // バリデーション成功
    res.json({ result: true });
  
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})