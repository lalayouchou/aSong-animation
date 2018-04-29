'use strict'
//��������˼�룺��ָ����ʱ���ڣ���һ��״̬���仯Ϊ��һ��״̬

let tween = require('./Tween.js');
let timeline = require('./timeline.js');
let style = require('./style.js');

import '../aSong.css';

//�����ʼ״̬
const START_INITIAL = 0;
// ����ʼ״̬
const START_START = 1;
// ����ֹͣ״̬
const START_STOP = 2;
//�������ͣ�ͬ������
const TASK_SNYC = 0;
//�������ͣ��첽����
const TASK_ASNYC = 1;

let command = ['fadeIn','fadeOut'];

//������������
class aSong{
/**
 * ���캯��
 * @param  ele DOM����
 */
	constructor(ele){
		// ����ڵ�
		this.ele=ele;
		// �������
		this.taskQuere=[];
		// ����ִ������
		this.index = 0;
		// ����ִ��״̬
		this.status = START_INITIAL;
		//Ĭ������������
/*		this.easing = tween.Linear;*/
		//���붯��ʱ�������ģ��
		this.timeline = new timeline();
		//��������ģ�飬������������Բ���
		this.cssStyle = new style(ele);
		//�Ƿ����ظ�����
		this.isRepeat = false;
	}

/**
 * 	���Ӷ�������add animation
 * @param  {object} attr  �仯��css����,����ֵ��{'width':'100px','background-color':'#fff'},��ɫֻ֧�ֱ�����ɫ������ʹ�ø�����ɫд��
 * ֧�ֵ�transform����(2d):['rotateZ','translateX','translateY','scaleX','scaleY','skewX','skewY']
 * @param 	duration      ��������ʱ�䣬Ĭ��1s����������1000,1000ms,1s���ָ�ʽ
 * @param 	easing        ���������ߣ�Ĭ��Ϊ'Linear',�ַ���д���������ִ�Сд,�м�ʹ��(-)����
 * @param 	delay         �ӳ�ʱ��,Ĭ��Ϊ0����������1000,1000ms,1s���ָ�ʽ
 */
	add(attr,duration,easing,delay){
		let taskFn,
			type,
			me=this,
			args = arguments;

		//�õ�������Ķ���
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

		// ����еȴ�ʱ�䣬���һ��ͬ�����񣬵ȴ�һ��ʱ�䣬ִ���л�����
		if(waitTime !== 0){
			taskFn = function(){
				setTimeout(function(){me._next();},waitTime);
			};
			/*	taskFn = function(next){
				setTimeout(function(){next();},waitTime);
				����д���ǻ�ȡ����ִ�л����ģ������ƺ��ǵ�����ͨ����
			}*/
			type = TASK_SNYC;
			this._add(taskFn,type);
		}


		// ����㷨��������ʵ��ȡ�ó�ʼֵ�󣬾Ϳ��Լ򻯣���Ϊ�Ѿ�֪������һ�������ֵ��ʹ�ñհ����������ﻯ
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

		//��������û������ֵ������һ��ֱ���л���һ�������ͬ������
		if(obj.attr===null){
			taskFn=(next) =>{next.call(this);};
			type = TASK_SNYC;
		}else{
			// ����������Ҫ�ĺ���������ִ�о�����������ڲ�
			taskFn=function(next,time){
				const END = 1;
				const START = 0;
				const transform=['rotateX','rotateY','rotateZ','translateX','translateY','translateZ','scaleX','scaleY','scaleZ','skewX','skewY','skewZ'];
				// �������ʱ����ڵ����趨ֵ��ֱ���趨���ԣ�����Ҫ�㷨����
				if(time>=obj.duration){
					changeBefore(obj.attr,END);
					next();
					return;
				}
				//�����һ��ִ�иú�������ִ�к���,������˵�����ظ�����
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
							// ��ֹ��������˵����ֵ�������
							//��ñ仯֮�������ֵ���󣬱����仯��������
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
 * ִ�к���,��������ڶ���֮ǰ֮��
 * @param  {Function} callback Ҫִ�еĺ���
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
	 * �ظ�������û�в�����ʾ�����ظ�
	 * @param  	 num �ظ�����
	 * @param  	 step ���˲��������������ʱ����Ҫ����������Ĭ���ظ���һ������
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

	//��ʼ����,����Ķ��������ָ����ÿ֡�������ʱû��ʵ��
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

	// ��ͣ����
	pause(){
		if(!this.status === START_START){
			return;
		}
		console.log('laiguo ')
		this.status = START_STOP;
		this.timeline.stop();
	}

	// ���¿�ʼ����
	restart(){
		if(!this.status === START_STOP){
			return;
		}
		console.log('restart')
		this.status === START_START;
		this.timeline.restart();
	}

	// ֱ�ӽ�������
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

	//�����˶�����
	reverse(){

	}

	//������������

	// ����������	
	_add(taskFn,type){
		this.taskQuere.push({
			taskFn:taskFn,
			type :type
		});
	}

	// ����ִ��������������
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

	//ִ��ͬ������
	_tasksnyc(taskFn){
		let that = this;

		let next =that._next;
		
		//ʹ�ûص�����  
		taskFn(next);

	}
	// �л�����������
	_next(){
		console.log(this);
		this.index++;
		this._runtask();

	}
	//ִ���첽����
	_taskasnyc(taskFn){
		let me = this;
		//�����ʱ��Ӧ���ǵ�ǰʱ��-��ʼʱ��
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
