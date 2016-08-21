var config={
	"mongodbName":"DoddERPDB",
    "mongodbHost": "127.0.0.1",
    // "mongodbUserName": '',//建议使用用户名和密码
    // "mongodbPassWord": '',//建议使用用户名和密码
    "mongodbPort": "27017",
    "sessionSecrets":'MySecrets',
    "cookieName":'DoddERP',
    "cookieMaxAge":1000*60*60*6
}
module.exports = config;