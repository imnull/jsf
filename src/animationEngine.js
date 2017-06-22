((root, factory) => {
	typeof exports === 'object' && typeof module !== 'undefined'
		? factory(exports)
		: factory(root)
		;
})(this, (exports) => {

	function animationEngine(cb){

		let startTS = null;
		let previTS = null;
		let handle = null;
		let state = 0;
		let counter = 0;

		let _one = null;

		if(typeof(cb) == 'function'){
			_one = cb;
		} else if(cb instanceof Object){
			_one = cb.one;
		}

		if(typeof(_one) != 'function'){
			_one = () => {};
			console.warn('Empty Engine');
		}

		function resetParams(){
			startTS = null;
			previTS = null;
			handle = null;
			state = 0;
			counter = 0;
		}

		function req(){

			if(!state){
				return;
			};

			return handle = requestAnimationFrame((ts) => {

				cancelAnimationFrame(handle);

				if(!startTS) startTS = ts;
				if(!previTS) previTS = ts;
				// if(ts - startTS > 0){
					_one(ts - startTS, counter, ts - previTS);
				// }
				
				previTS = ts;
				counter += 1;

				switch(state){
					case 0:
						if(counter > 0 && typeof(cb.stop) == 'function'){
							cb.stop(counter);
						}
						break;
					case 2:
						startTS = null
						previTS = null;
						counter = 0;
						state = 1;
						if(typeof(cb.reset) == 'function'){
							cb.reset(counter);
						}
						req();
						break;
					default:
						req();
						break;
				}

			});
		}

		return {
			reset(){
				if(state === 1){
					state = 2;
				} else {
					this.start();
				}
				return this;
			},
			start(){

				if(state === 1) return;

				resetParams();
				state = 1;
				handle = req();

				if(typeof(cb.start) == 'function'){
					cb.start();
				}

				return this;
			},
			stop(){
				state = 0;
				return this;
			}
		}
	}

	exports.animationEngine = animationEngine;

});