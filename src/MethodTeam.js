((root, factory) => {
	typeof exports === 'object' && typeof module !== 'undefined'
		? factory(exports)
		: factory(root)
		;
})(this, (exports) => {

	function MethodTeam(){
		this.methods = [];
		this.__id = 0;
	}
	MethodTeam.prototype = {
		has(name){ return this.methods.some((m) => m.name === name); },
		get(name){ return this.methods.filter((m) => m.name === name); },
		findIndex(key){ return this.methods.findIndex((m) => m.key === key); },
		hasNil(){ return this.methods.some((m) => !m); },
		add(name, callback, context){
			let key = ++this.__id;
			let op = {
				counter: 0,
				distroy: function(){
					let idx = this.findIndex(key);
					if(idx > -1) this.methods[idx] = null;
				}.bind(this)
			};
			this.methods.push({
				key,
				name,
				op,
				method: callback.bind(context)
			});
			return key;
		},
		remove: function(key){
			let idx = this.findIndex(key);
			idx > -1 && this.methods.splice(idx, 1);
		},
		fire(name){

			if(!this.has(name)) return;

			let args = [...arguments];

			this.get(name).forEach((m, i) => {
				m.op.counter += 1;
				args[0] = m.op;
				m.method(...args);
			});
			this.hasNil() && this.clean();
		},
		clean(){
			let i = 0;
			while(i < this.methods.length){
				if(this.methods[i]){
					i++;
				} else {
					this.methods.splice(i, 1);
				}
			}
		}
	};
	exports.MethodTeam = MethodTeam;
});

