var client = require('beanstalk_client').Client;

var do_test = function do_test(callback){
client.connect('127.0.0.1:11300', function(err, conn) {
	var job_data = {type:'foo', "data": {"name": "node-beanstalk-client"}};
	conn.use('external', function(){
		for(var i = 0; i<10000; i++){
		conn.put(0, 0, 0, JSON.stringify(job_data), function(err, job_id){
			console.log('put job:' + job_id + ' into the test tube');
			conn.end();
			callback(null, 'done with beanstalk');
		});
		}
	});

  /*conn.put(0, 0, 1, JSON.stringify(job_data), function(err, job_id) {
    console.log('put job: ' + job_id);


	/*conn.reserve(function(err, job_id, job_json) {
      console.log('got job: ' + job_id);
      console.log('got job data: ' + job_json);
      console.log('module name is ' + JSON.parse(job_json).data.name);
      conn.destroy(job_id, function(err) {
		  console.log('destroyed job');
		  conn.end();
		  callback(null, "done with beanstalk!");
	  });
	});

  });*/
});

};

do_test(function(err,data){
   console.log(data);
});

