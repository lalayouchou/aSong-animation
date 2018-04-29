'use strict'
//动画中心思想：在指定的时间内，从一个状态，变化为另一个状态

let tween = require('./Tween.js');
let timeline = require('./timeline.js');
let style = require('./style.js');

import '../aSong.css';

//任务初始状态
const START_INITIAL = 0;
// 任务开始状态
const START_START = 1;
// 任务停止状态
const START_STOP = 2;
//任务类型，同步任务
const TASK_SNYC = 0;
//任务类型，异步任务
const TASK_ASNYC = 1;

let command = ['fadeIn','fadeOut'];

//创建动画库类
class aSong{
/**
 * 构造函数
 * @param  ele DOM对象
 */
	constructor(ele){
		// 保存节点
		this.ele=ele;
		// 任务队列
		this.taskQuere=[];
		// 任务执行索引
		this.index = 0;
		// 任务执行状态
		this.status = START_INITIAL;
		//默认赛贝尔曲线
/*		this.easing = tween.Linear;*/
		//引入动画时间轴控制模块
		this.timeline = new timeline();
		//引入属性模块，处理输入的属性参数
		this.cssStyle = new style(ele);
		//是否是重复任务
		this.isRepeat = false;
	}

/**
 * 	增加动画任务，add animation
 * @param  {object} attr  变化的css属性,必须值，{'width':'100px','background-color':'#fff'},颜色只支持背景颜色，可以使用各种颜色写法
 * 支持的transform属性(2d):['rotateZ','translateX','translateY','scaleX','scaleY','skewX','skewY']
 * @param 	duration      动画持续时间，默认1s，可以输入1000,1000ms,1s三种格式
 * @param 	easing        赛贝尔曲线，默认为'Linear',字符串写法，不区分大小写,中间使用(-)连接
 * @param 	delay         延迟时间,默认为0，可以输入1000,1000ms,1s三种格式
 */
	add(attr,duration,easing,delay){
		let taskFn,
			type,
			me=this,
			args = arguments;

		//得到处理过的对象：
/*		initial = {
			attr:{
				'width':{
					begin:0,
					end:20,
					JsName:'width',
					unit:'px'
				}
			}
			duration:1000,
			easing:['linear'],
			delay :0
			}
		};*/
		let obj=this.cssStyle.initial(args),
			waitTime = obj.delay;

		// 如果有等待时间，添加一个同步任务，等待一段时间，执行切换任务
		if(waitTime !== 0){
			taskFn = function(){
				setTimeout(function(){me._next();},waitTime);
			};
			/*	taskFn = function(next){
				setTimeout(function(){next();},waitTime);
				这种写法是获取不到执行环境的，这样似乎是当做普通函数
			}*/
			type = TASK_SNYC;
			this._add(taskFn,type);
		}


		// 获得算法函数，其实当取得初始值后，就可以简化，因为已经知道其中一个不变的值，使用闭包，函数柯里化
		let timingFn,initEasing = obj.easing;
		const key1 =initEasing[0],key2 = initEasing[1];
		if(key2){
			timingFn = tween[key1][key2];
		}else{
			timingFn = tween['Linear'];
		}

		let timeFn = function () {
				let d = obj.duration;
				return function(t,b,c){
					return timingFn(t,b,c,d);
				};
			}();

		//如果处理后没有属性值，加入一个直接切换下一个任务的同步任务
		if(obj.attr===null){
			taskFn=(next) =>{next.call(this);};
			type = TASK_SNYC;
		}else{
			// 这里是最重要的函数，动画执行就在这个函数内部
			taskFn=function(next,time){
				const END = 1;
				const START = 0;
				const transform=['rotateX','rotateY','rotateZ','translateX','translateY','translateZ','scaleX','scaleY','scaleZ','skewX','skewY','skewZ'];
				// 如果运行时间大于等于设定值，直接设定属性，不需要算法计算
				if(time>=obj.duration){
					changeBefore(obj.attr,END);
					next();
					return;
				}
				//如果第一次执行该函数，则执行函数,不是则说明是重复任务
				if(obj.first){
					getFristStyle(obj.attr);
				}/*else{
					for(let key in obj.attr){
						let JsName=obj.attr.key.JsName;
						let value = obj.attr.key.begin + obj.attr.key.unit;
						console.log(key.begin);
						changeStyle(JsName,value);
					}
				}*/

				function getFristStyle(attrs) {
					for(let key in attrs){
							obj.attr[key] = me.cssStyle.attributes(key,attrs[key]);
						
					}
					obj.first = false;
				}

				function getChangeStyle(key,obj) {
					return me.cssStyle.getChangeStyle(timeFn,time,key,obj);
				}

				function changeBefore(attrs,type) {
					let transformValue;
					for(let key in attrs){
						if (transform.indexOf(key)===-1) {
							let unit = attr[key]['unit'],value;
							if (type === END){
								value = attr[key]['end'] + unit;
							}
							if(type === START){
								value = getChangeStyle(key,attrs[key]);
							}

							changeStyle(attrs[key]['JsName'],value);
							continue;
						}

						if (type === END){
							value = attr[key]['end'] + attr[key]['unit'] ;
						}
						if(type === START){
							value = getChangeStyle(key,attrs[key]);
						}

						transformValue += transformValue + ' '+ key +'('+ value + ')';
					}

					if (transformValue) {
						changeSytle('transform',transformValue);
					}	
				}

				function  changeStyle(JsName,value){
							// 防止出错，比如说属性值输入错误
							//获得变化之后的属性值对象，遍历变化加载属性
							try {
								let style = `${value}`;
								me.ele.style[JsName] = style;
							} catch(e) {
								console.log(e.massage);
							}
				}

				changeBefore(obj.attr,START);
			};
			type = TASK_ASNYC;
		}

		this._add(taskFn,type);
		return this;
	}

/**
 * 执行函数,可以添加在动画之前之后
 * @param  {Function} callback 要执行的函数
 */
	fn(callback){
		let me = this;
		let taskFn= () => {
			callback();
			me._next();
		};

		let type = TASK_SNYC;

		this._add(taskFn,type);

		return this;
	}

	/**
	 * 重复次数，没有参数表示无限重复
	 * @param  	 num 重复次数
	 * @param  	 step 回退步数，如果有有延时，需要回退两步，默认重复上一个动作
	 */
	repeat(num,step){
		let me = this;
		 step = step||1;
	let	taskFn=function(){
		if(me.status!==START_START||me.taskQuere.length===1
			){
			return;
		}
		if(num==='undefined'){
 			me.index = me.index-step || 0;
 			me._runtask();
		}else if(num){
			num--;
			me.index=me.index-step || 0;
			me._runtask();
		}else{
			me._next();
		}

	}
	let type = TASK_SNYC;

	this._add(taskFn,type);
	return this ;
	}

	//开始动画,这里的动画间隔是指动画每帧间隔，暂时没有实现
	start(){
		if(this.status===START_START){
			return;
		}
		if (!this.taskQuere.length) {
			return;
		}

		this.status = START_START;

		this._runtask();
		return this;
	}

	// 暂停动画
	pause(){
		if(!this.status === START_START){
			return;
		}
		console.log('laiguo ')
		this.status = START_STOP;
		this.timeline.stop();
	}

	// 重新开始动画
	restart(){
		if(!this.status === START_STOP){
			return;
		}
		console.log('restart')
		this.status === START_START;
		this.timeline.restart();
	}

	// 直接结束动画
	finish(){

		this.pause();

		let me=this,taskQuere= me.taskQuere,index = me.index;

		let next = function(){
			me.timeline.doSomeThing = null;
			function Innernext(){
				if(++me.index===me.taskQuere.length){
					return;
				}
				if(me.taskQuere[me.index].type===TASK_SNYC){
					return Innernext();
				}

				me._runtask();
			}
			Innernext();
		};

		this.status = START_START;
		taskQuere[index].taskFn(next,Number.MAX_SAFE_INTEGER);

		return this;
	}

	//反向运动动画
	reverse(){

	}

	//后续增加内容

	// 增加任务链	
	_add(taskFn,type){
		this.taskQuere.push({
			taskFn:taskFn,
			type :type
		});
	}

	// 真正执行任务链任务函数
	_runtask(){
		if(!this.taskQuere || this.status !== START_START){
			return;
		}

		if(this.index ===this.taskQuere.length){
			this.status = START_STOP;
			this.timeline.stop();
			this.timeline.doSomeThing = null;
			this._dispose();
			return ;
		}

		let task = this.taskQuere[this.index];

		if(task.type === TASK_SNYC){
			this._tasksnyc(task.taskFn);
		}else {
			this._taskasnyc(task.taskFn);
		}

	}

	//执行同步任务
	_tasksnyc(taskFn){
		let that = this;

		let next =that._next;
		
		//使用回调函数  
		taskFn(next);

	}
	// 切换任务链任务
	_next(){
		console.log(this);
		this.index++;
		this._runtask();

	}
	//执行异步任务
	_taskasnyc(taskFn){
		let me = this;
		//这里的时间应该是当前时间-开始时间
		let doSomeThing = function (time) {
			let next = function(){
				me.timeline.stop();
				me.timeline.doSomeThing = null;
				me._next();
			};
			taskFn(next,time);
		};
		this.timeline.doSomeThing = doSomeThing;
		this.timeline.start();
	}

	_dispose(){
		if(!this.status === START_STOP){
			return ;
		}
		this.taskQuere=null;
		this.index = 0;
		this.status = START_INITIAL;
		this.timeline = null;
		this.cssStyle = null;
	}

}

function ASong(ele){
	return new aSong(ele);
}

module.exports = ASong;
