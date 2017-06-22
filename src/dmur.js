((root, factory) => {

	let util = null;
	let mt = null;
	if(typeof(JSFUtil) != 'undefined'){
		util = JSFUtil;
	}
	if(typeof(MethodTeam) != 'undefined'){
		mt = MethodTeam;
	}

	if(typeof(require) == 'function'){
		util = require('./util').JSFUtil;
		mt = require('./MethodTeam').MethodTeam;
	}

	typeof exports === 'object' && typeof module !== 'undefined'
		? factory(exports, util, mt)
		: factory(root, util, mt)
		;
})(this, (exports, U, MethodTeam) => {

	let INITED = false;
	let mt = new MethodTeam();
	const R = {};

	function dmur(){
		
		if(INITED) return R;

		INITED = true;

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

		R.regist = (name, cb, context) => {
			return mt.add(name, cb, context);
		};

		R.remove = (key) => {
			mt.remove(key);
		};

		return R;

	}

	exports.dmur = dmur;

});