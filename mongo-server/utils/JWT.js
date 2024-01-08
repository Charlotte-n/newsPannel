const jsonwebtoken = require('jsonwebtoken')
const secret = 'yin'

const JWT = {
    //生成token
    generate(value, exprires) {
        return jsonwebtoken.sign(value,secret,{expiresIn:exprires});
    },
    //解密token
    verify(token) {
        try{
            return jsonwebtoken.verify(token,secret)
        }catch (e){
            return false
        }
    }
}
module.exports = JWT