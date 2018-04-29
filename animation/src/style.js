'use strict'
		// 对于特殊数据的，先描述一下
const  sty = {
	'_color':['background-color','color'],
	/* transform系列 */
	'_transform':['rotateZ','translateX','translateY','scaleX','scaleY','skewX','skewY'],
	'_transform3D':['rotateZ']
};
const easing = function(){
		let a = ['Linear'],
		b=['Quad','Cubic','Quart','Quint','Sine','Expo','Circ','Elastic','Back','Bounce'],
		c=['easeIn','easeOut','easeInOut'];

		for (let b_key of b) {
			for (let c_key of c) {
				a.push(b_key+'-'+c_key);
			}
		}
		return a;
}();


let style = class{
/**
 * 传入节点
 * @param   ele DOM对象
 */
	constructor(ele){
		this.ele = ele;
	}

/**
 * 初始化动画输入参数
 * @param  {[type]} args 输入的参数值
 */
	initial(args){
		//取得数字的值，这里可以传入多个数字
		let index =0,
		me = this;
		args = [...args].slice(0, 4);

		//默认值
		let initial = {
			attr:null,
			duration:1000,
			easing:['Linear'],
			delay :0,
			first:true
		};

		function num(key) {
			if(index === 0){
				initial.duration=key;
				return index++;
			}else if (index===1) {
				initial.delay = key;
				return index++;
			}
		}


		function str(key) {
			// 将使用字符串类型的时间转换，如5s,5000ms;
			if(/^\d+\.?\d*m?s$/.test(key)){
				if(/ms/.test(key)){
					key= parseInt(key);
					return num(key);
				}
				key = (1000*parseFloat(key) | 0);
				return num(key);
			}
			for(let name of easing){
				if(name.toLowerCase()===key.toLowerCase()){
					if(/\-/.test(name)){
						return initial.easing = name.split('-');
					}
				}
			}
		}
			//如果第一个值不是对象，直接返回默认值，是对象设为initial.attr属性
		if(!args.length||typeof args[0] !== 'object'){
			return initial;
		}else{
			initial.attr = args[0];
		}

		// 去除数组第一个值
		args.shift();

		for(let keys of args){
			if(typeof keys === 'number'){
				num(keys);
			}else if(typeof keys === 'string'){
				str(keys);
			}
		}

		return initial;
	}




	// 对颜色转换，转成rbga()
	_color(attr,value){
		let config = {},
		css = window.getComputedStyle(this.ele);
		config.JsName = this._JsName(attr);
		config.unit = '';

		config.begin = toRgba(css[config.JsName]);

		try {
			let JsName = config.JsName;
			// 将输入的颜色转换为rgb或ragb字符串
			let div = document.createElement('div');
			div.style[JsName] = value;
			document.body.appendChild(div);
			let color = window.getComputedStyle(div)[JsName] ;
			config.end = toRgba(color);
			document.body.removeChild(div);
		} catch(e) {
			console.error('颜色输入格式有误');
		}



		//统一装换成rgba();
		function toRgba(value){
			if(!/rgba/.test(value)){
				return value.replace(/^rgb\((.+)\)/,'rgba($1,1)')
			}
			return value;
		}

		return config;

	}

	_transform(){

	}

	_default(attr,value){

		let config = {},
		css = window.getComputedStyle(this.ele);

		config.JsName = this._JsName(attr);
		config.end = parseFloat(value);
		config.begin = parseFloat(css[config.JsName]);
		config.unit = value!=='0' ? this._unit(value,config.end):'px';

		return config;

	}
//获得单位
	_unit(value,Float){
		let unit = value.replace(Float, "");
		return unit;
	}

//转换驼峰式写法
	_JsName(attr){
		if(/\-/.test(attr)){
			attr = attr.replace(/\-[a-zA-Z]{1}/g,(match)=>{
				return match.replace(/\-/,'').toUpperCase();
			});
		}
		return attr;
	}





	_changeDefault(timeFn,time,obj){
		let b,c;
		b= obj.begin;
		c = obj.end - b;
		return timeFn(time,b,c) + obj['unit'];
	}

	_changeColor(timeFn,time,obj){
		let change  = [],//因为颜色有四个数字，所以要用一个容器保存一下
			 begin = obj.begin.match(/\d+\.?\d{0,2}/g),
			end = obj.end.match(/\d+\.?\d{0,2}/g);
		for(let i =0,b,c ; i<4;i++){
			b = begin[i]*1;
			c = end[i] - b;
			if(i===3){
				change[i] = timeFn(time,b,c);
			}else{
				change[i] = (timeFn(time,b,c)|0);
			}
		}
		return 'rgba('+ change.join(',') +')';
	}

};


/**
 * 使用策略模式，
 * @param  attrs [用户输入的属性对象]
 */
style.prototype.attributes = (function(){

			let styleFn = {};
			//策略类
			styleFn['default'] = function(attr,value){
			return 	this._default(attr,value);
			};

			for(let color of sty['_color']) {
				styleFn[color] = function(color,value){
				return 	this._color(color,value);
				}
			}

			for(let transform of sty['_transform']) {
				styleFn[transform] = function(transform,value){
				return 	this._transform(transform,value);
				}
			}
			// 用户执行函数
			return function(attr,value){
				if(styleFn[attr]){
				return 	styleFn[attr].call(this,attr,value);
				}else{
				return 	styleFn['default'].call(this,attr,value);
				}
			};
}());

/**
 * 确定css属性的值
 * @param  timeFn  算法函数
 * @param  time    动画播放时间
 * @param  key     改变属性值的属性值
 * @param  obj     该属性的数据对象
 * 
 */
style.prototype.getChangeStyle = (function(){

			let changeStyleFn = {};
//策略类
			changeStyleFn['default'] = function(timeFn,time,obj){
				return this._changeDefault(timeFn,time,obj);
			}

			for(let color of sty['_color']) {
				changeStyleFn[color] = function(timeFn,time,obj){
				return this._changeColor(timeFn,time,obj);
				}
			}

			for(let transform of sty['_transform']) {
				changeStyleFn[transform] = function(timeFn,time,obj){
				return this._changeTransform(timeFn,time,obj);
				}
			}
// 用户执行函数
			return function(timeFn,time,key,obj){
				if(changeStyleFn[key]){
				return 	changeStyleFn[key].call(this,timeFn,time,obj);
				}else{
				return 	changeStyleFn['default'].call(this,timeFn,time,obj);
				}
			};

})();

module.exports  = style;