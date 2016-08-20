var crypto=require('crypto');
module.exports=(function() {
	return {
		md5:function(text) {
			var hasher=crypto.createHash('md5');
			hasher.update(text)
			return hasher.digest('hex');
		}
	};
})();