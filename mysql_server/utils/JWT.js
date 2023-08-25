//设置token和解密token
const jsonwebtoken = require('jsonwebtoken');
const secert = 'yinmengjia';

const JWT = {
    //产生token
    generage(value,exprires){
        return jsonwebtoken.sign(value,secert,{expiresIn:exprires});
    },
    //解密
    verify(token){
        try{
            return jsonwebtoken.verify(token,secert);
        }catch (e){
            return false;
        }
    }
}
module.exports = JWT
