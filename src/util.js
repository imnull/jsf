((root, factory) => {
	typeof exports === 'object' && typeof module !== 'undefined'
		? factory(exports)
		: factory(root)
		;
})(this, function JSFUtil(exports){

	function isBrowser(){
		return (function(){return this.constructor.name==='Window'}).call(null);
	}

	/* Event handles */

	function useTouch(){
		return typeof(document) == 'object' && 'ontouchstart' in document;
	}

	let EVENT_NAMES = {};

	if(useTouch()){
		EVENT_NAMES['mousedown'] = 'touchstart';
		EVENT_NAMES['mouseup'] = 'touchend';
		EVENT_NAMES['mousemove'] = 'touchmove';
	}

	function addEvent(dom, eventName, callback, useCapture){
		if(eventName in EVENT_NAMES){
			eventName = EVENT_NAMES[eventName];
		}
		dom.addEventListener(eventName, callback, !!useCapture);
		return callback;
	}
	function removeEvent(dom, eventName, callback){
		if(eventName in EVENT_NAMES){
			eventName = EVENT_NAMES[eventName];
		}
		return dom.removeEventListener(eventName, callback);
	}

	function getEvent(e){
		if('changedTouches' in e){
			return e.changedTouches[0];
		}
		return e;
	}

	function getEventClientPosition(e){
		e = getEvent(e);
		return [e.clientX >> 0, e.clientY >> 0];
	}

	/* Type handles */

	let o_tos = Object.prototype.toString;
	function _t(v){ return typeof(v); }
	function _T(v){ return o_tos.call(v); }

	function isString(v){ return _t(v) == 'string'; }
	function isNumber(v){ return _t(v) == 'number'; }
	function isNumber2(v){ return isNumber(v) && !isNaN(v); }
	function isFunction(v){ return _t(v) == 'function'; }
	function isBoolean(v){ return _t(v) == 'boolean'; }
	function isObject(v){ return _T(v) == '[object Object]'; }
	function isArray(v){ return _T(v) == '[object Array]'; }
	
	function isInt(v){ return isNumber2(v) && (v >> 0) === v; }
	function isUInt(v){ return v >= 0 && isInt(v); }
	function isFloat(v){ return isNumber(v) && (v + '').indexOf('.') > -1; }

	return exports.JSFUtil = {
		isBrowser,
		addEvent,
		removeEvent,
		getEvent,
		getEventClientPosition,

		isString,
		isNumber,
		isNumber2,
		isFunction,
		isBoolean,
		isObject,
		isArray,
		isInt,
		isUInt,
		isFloat
	};

});