function Timer(interval, step, delay = 0){
	this.interval = interval || 1000;
	this.step = step || 30;
	this.delay = typeof(delay) == 'number' && delay >= 0 ? delay : 500;
}
Timer.prototype = {
	run: function(cb){

		if(typeof(this.onbegin) == 'function'){
			this.onbegin();
		}

		this.delayHandle = setTimeout(function(){

			clearTimeout(this.delayHandle);
			this.startTime = Date.now();
			if(typeof(this.onstart) == 'function'){
				this.onstart();
			}
			this.intervalHandle = setInterval(function(){

				let dur = Math.max(0, Date.now() - this.startTime);

				if(dur >= this.interval){
					cb(1);
					clearInterval(this.intervalHandle);
					delete this.intervalHandle;
					if(typeof(this.onend) == 'function'){
						this.onend();
					}
				} else {
					cb(dur / this.interval);
				}


			}.bind(this));

		}.bind(this), this.delay);
	},
	abort: function(){
		if(!this.intervalHandle) return;
		clearTimeout(this.delayHandle);
		clearInterval(this.intervalHandle);
		if(typeof(this.onabort) == 'function'){
			this.onabort();
		}
	}
};

Timer.promise = function(cb, conf){
	if(!conf || !(conf instanceof Object)){
		conf = {};
	}
	let timer = new Timer(conf.interval, conf.step, conf.delay);
	timer.onbegin = conf.onbegin.bind(timer);
	timer.onstart = conf.onstart.bind(timer);
	timer.onabort = conf.onabort.bind(timer);
	let promise = new Promise((resolve, reject) => {

		timer.onend = resolve;
		timer.run(cb);

	});

	promise.abort = timer.abort.bind(timer);

	return promise;
}