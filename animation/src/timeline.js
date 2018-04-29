'use strict'

//默认动画持续时间
const TASK_DURATION = 1000;

//默认动画每一帧间隔
const TASK_INTERVAL = 1000/100;

//动画初始状态
const START_INITIAL = 0;
// 动画开始状态
const START_START = 1;
// 动画停止状态
const START_STOP = 2;

let requestAnimationFrame=(function(){
	return window.requestAnimationFrame||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame||
	window.oRequestAnimationFrame ||
	function (callback) {
		return window.setTimeout(callback,interval||TASK_INTERVAL);
	}
}());


let cancelAnimationFrame = (function() {
	return window.cancelAnimationFrame||
	window.webkitCancelAnimationFrame ||
	window.mozCancelAnimationFrame||
	window.oCancelAnimationFrame ||
	function (id) {
		return window.clearTimeout(id);
	}
})();

class timeline{

	constructor(){
		this.state = START_INITIAL;
	}

	start(interval){
		if(this.state === START_START){
			return;
		}
		this.state = START_START;

		this.interval = interval || TASK_INTERVAL;

		this._startTimeline(this,+new Date());

	}

	stop(){
		if(this.state !==START_START){
			return;
		}
		this.state = START_STOP;

		cancelAnimationFrame(this.timer);
		this.timer = null;

		if(this.startTime){
		this.dur = +new Date() - this.startTime;}
		
	}

	restart(){
		if(this.state != START_STOP){
			return;
		}

		this.state = START_START;

		this._startTimeline(this,+new Date()-this.dur);
	}

	//
	/**
	 * 真正在时间线上执行的函数
	 * @param  {number} time 动画从开始到现在的持续时间
	 */
	doSomeThing(time){

	}

	_startTimeline(timeline,startTime){

		timeline.startTime = startTime;

		let lastTime = +new Date();

		_nextTick();


		function _nextTick(){
			let now = +new Date();


			timeline.timer = requestAnimationFrame(_nextTick);

			if((now-lastTime)>=timeline.interval){
				timeline.dur=now - timeline.startTime;
				timeline.doSomeThing(timeline.dur);
				lastTime = now;
			}

		}

	}


}

module.exports = timeline;