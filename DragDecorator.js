((root, factory) => {
	typeof exports === 'object' && typeof module !== 'undefined'
		? factory(exports)
		: factory(root)
		;
})(this, (exports) => {

	const U = JSFUtil();

	function offsetPosition(dom){
		return [dom.offsetLeft, dom.offsetTop];
		// return [dom.offsetLeft + dom.clientLeft, dom.offsetTop + dom.clientTop];
	}

	exports.dragDecorator = () => {

		let state = {
			runtimeState: 0,
			runtimePos: [],
			offsetPos: [],
			domPos: []
		};
		return function dragDecorator(dom, methods){

			methods = U.isObject(methods) ? methods : {}

			if(typeof(dom) == 'string'){
				dom = document.querySelector(dom);
			}
			if(!dom) return;

			state.domPos = offsetPosition(dom);

			state.mouseDownKey = U.addEvent(dom, 'mousedown', function(e){
				state.domPos = offsetPosition(dom);
				state.runtimeState = 1;
				state.runtimePos = U.getEventClientPosition(e);
				state.offsetPos = [state.runtimePos[0] - state.domPos[0], state.runtimePos[1] - state.domPos[1]];

				if(U.isFunction(methods.ondown)){
					methods.ondown(dom, state.domPos, e);
				}
			});

			dmur.regist('move', (op, e) => {

				if(!state.runtimeState) return;
	
				state.runtimePos = U.getEventClientPosition(e);

				let pos = [
					state.runtimePos[0] - state.offsetPos[0],
					state.runtimePos[1] - state.offsetPos[1]
				];

				if(U.isFunction(methods.onmove)){
					pos = methods.onmove(dom, pos, e, op) || pos;
				}

				R.setDomPos(...pos);

				// dom.style.transform = 'translate(' + state.domPos[0] + 'px,' + state.domPos[1] + 'px)';

				dom.style.left = state.domPos[0] + 'px';
				dom.style.top = state.domPos[1] + 'px';

			});

			dmur.regist('up', (op, e) => {
				state.runtimeState = 0;
				if(U.isFunction(methods.onup)){
					methods.onup(dom, state.domPos, e);
				}
			});

			var R = {
				getDom: function(){ return dom },
				getDomPos: function(){
					return state.domPos.slice(0);
				},
				setDomPos: function(x, y){
					state.domPos[0] = x;
					state.domPos[1] = y;
					return R;
				},
				setDomStyle: function(){
					dom.style.left = state.domPos[0] + 'px';
					dom.style.top = state.domPos[1] + 'px';
					// dom.style.transform = 'translate(' + state.domPos[0] + 'px,' + state.domPos[1] + 'px)';
					return R;
				}
			};

			return R;

		}

	};

});