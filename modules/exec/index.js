var exec = require('child_process').exec,
	mv = require('mv'),
	genThumbnails = require('../genThumbnails'),
    q = require('q');

module.exports = function(command, newPhoto, io, callback) {
    var deferred = q.defer();

    exec(command, function(err, result) {
        if (!err) {
			io.emit('data', {
				wait: true
			});
            deferred.resolve(result);
			mv( newPhoto, './public/photos/' + newPhoto, function(err) {
				if (err) {
					console.log(err)
				}
			});
			genThumbnails(newPhoto , io);
        } else {
            deferred.reject(err);
        }

        deferred.promise.nodeify(callback);
    });

    return deferred.promise;
};
