
((root, factory) => {
	typeof exports === 'object' && typeof module !== 'undefined'
		? factory(exports)
		: factory(root)
		;

})(this, (exports) => {

	exports.dmur = ((U) => {

		let mt = new MethodTeam();


		let mouseUpEventKey = U.addEvent(document, 'mouseup', function(e){
			mt.fire('up', e, this);
		});

		let mouseMoveEventKey = U.addEvent(document, 'mousemove', function(e){
			mt.fire('move', e, this);
		});

		let mouseDownEventKey = U.addEvent(document, 'mousedown', function(e){
			mt.fire('down', e, this);
		});

		let resizeEventKey = U.addEvent(window, 'resize', function(e){
			mt.fire('resize', e, this);
		});

		let r = {
			regist(name, cb, context){
				return mt.add(name, cb, context);
			},
			remove(key){
				mt.remove(key);
			}
		};

		return r;

	})(JSFUtil());

});