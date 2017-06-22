((root, factory) => {
	typeof exports === 'object' && typeof module !== 'undefined'
		? factory(exports)
		: factory(root)
		;
})(this, (exports) => {

	function Point(x, y){
		this.read(x, y);
	}
	Point.prototype = {
		clone: function(){ return new Point(this.x, this.y); },
		output: function(xName, yName){
			if(!arguments.length){
				return [this.x, this.y];
			} else if(arguments.length == 2){
				let o = {};
				o[xName] = this.x;
				o[yName] = this.y;
				return o;
			} else {
				return { x: this.x, y: this.y };
			}
		},
		read: function(x, y){
			this.x = x,
			this.y = y
		},
		add: function(x, y){ this.x += x; this.y += y; },
		Add: function(p){ return this.add(p.x, p.y); },
		ADD: function(a){ return this.add(a[0], a[1]); },
		sub: function(x, y){ return this.add(-x, -y); },
		Sub: function(p){ return this.sub(p.x, p.y); },
		SUB: function(a){ return this.sub(a[0], a[1]); }
	};
	Point.create = function(x, y){ return new Point(x, y); };
	Point.Create = function(obj){
		return new Point(
			obj[0] || obj.left || obj.x || 0,
			obj[1] || obj.top  || obj.y || 0
			);
	};
	Point.distance = function(x1, y1, x2, y2){
		let x = x2 - x1, y = y2 - y1;
		return Math.sqrt(x * x + y * y);
	};

	exports.Point = Point;

})

