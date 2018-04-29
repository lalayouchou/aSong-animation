'use strict'
		// �����������ݵģ�������һ��
const  sty = {
	'_color':['background-color','color'],
	/* transformϵ�� */
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
 * ����ڵ�
 * @param   ele DOM����
 */
	constructor(ele){
		this.ele = ele;
	}

/**
 * ��ʼ�������������
 * @param  {[type]} args ����Ĳ���ֵ
 */
	initial(args){
		//ȡ�����ֵ�ֵ��������Դ���������
		let index =0,
		me = this;
		args = [...args].slice(0, 4);

		//Ĭ��ֵ
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
			// ��ʹ���ַ������͵�ʱ��ת������5s,5000ms;
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
			//�����һ��ֵ���Ƕ���ֱ�ӷ���Ĭ��ֵ���Ƕ�����Ϊinitial.attr����
		if(!args.length||typeof args[0] !== 'object'){
			return initial;
		}else{
			initial.attr = args[0];
		}

		// ȥ�������һ��ֵ
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




	// ����ɫת����ת��rbga()
	_color(attr,value){
		let config = {},
		css = window.getComputedStyle(this.ele);
		config.JsName = this._JsName(attr);
		config.unit = '';

		config.begin = toRgba(css[config.JsName]);

		try {
			let JsName = config.JsName;
			// ���������ɫת��Ϊrgb��ragb�ַ���
			let div = document.createElement('div');
			div.style[JsName] = value;
			document.body.appendChild(div);
			let color = window.getComputedStyle(div)[JsName] ;
			config.end = toRgba(color);
			document.body.removeChild(div);
		} catch(e) {
			console.error('��ɫ�����ʽ����');
		}



		//ͳһװ����rgba();
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
//��õ�λ
	_unit(value,Float){
		let unit = value.replace(Float, "");
		return unit;
	}

//ת���շ�ʽд��
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
		let change  = [],//��Ϊ��ɫ���ĸ����֣�����Ҫ��һ����������һ��
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
 * ʹ�ò���ģʽ��
 * @param  attrs [�û���������Զ���]
 */
style.prototype.attributes = (function(){

			let styleFn = {};
			//������
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
			// �û�ִ�к���
			return function(attr,value){
				if(styleFn[attr]){
				return 	styleFn[attr].call(this,attr,value);
				}else{
				return 	styleFn['default'].call(this,attr,value);
				}
			};
}());

/**
 * ȷ��css���Ե�ֵ
 * @param  timeFn  �㷨����
 * @param  time    ��������ʱ��
 * @param  key     �ı�����ֵ������ֵ
 * @param  obj     �����Ե����ݶ���
 * 
 */
style.prototype.getChangeStyle = (function(){

			let changeStyleFn = {};
//������
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
// �û�ִ�к���
			return function(timeFn,time,key,obj){
				if(changeStyleFn[key]){
				return 	changeStyleFn[key].call(this,timeFn,time,obj);
				}else{
				return 	changeStyleFn['default'].call(this,timeFn,time,obj);
				}
			};

})();

module.exports  = style;