/* 内容管理对象 */
var H5 = function(){
	this.id = ('h5_'+Math.random()).replace('.', '_');
	this.el = $('<div class = "h5" id = "'+this.id+'">').hide();
	this.page = [];
	$('body').append(this.el);



	/*
	* 新增一个页
	* @param {string} name 组建的名称，会加入到ClassName中
	* @param {string} text 页内的默认文本
	* @return {H5} H5对象，可以重复使用H5对象支持的方法
	*/

	this.addPage = function(name, text){
		var page = $('<div class = "h5_page section">');

		if( name !== undefined ){
			page.addClass('h5_page_'+name);
		}
		if( text !== undefined ){
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page);//在数组最后面插入page对象
		if (typeof this.whenAddPage === 'function'){
			this.whenAddPage();
		}
		return this;//在主逻辑上链式调用必须return H5对象***
	}

	/*新增一个组件*/
	this.addComponent = function(name, cfg){
		var cfg = cfg || {};
		cfg = $.extend( {type:'base'} , cfg);//为没有type的cfg参数加入base的type(合并对象)
		var component;//定义一个变量存储组件元素
		var page = this.page.slice(-1)[0];//在数组中最后一个页面插入***
		switch( cfg.type ){
            case 'base' :
                component = new H5ComponentBase(name,cfg);
                break;

            case 'polyline' :
                component = new H5ComponentPolyline(name,cfg);
                break;

            case 'pie' :
                component = new H5ComponentPie(name,cfg);
                break;
            case 'bar' :
                component = new H5ComponentBar(name,cfg);
                break;
            case 'bar_v' :
                component = new H5ComponentBar_v(name,cfg);
                break;

            case 'radar' :
                component = new H5ComponentRadar(name,cfg);
                break;

            case 'pie' :
                component = new H5ComponentPie(name,cfg);
                break;
            case 'ring' :
                component = new H5ComponentRing(name,cfg);
                break;
           case 'point' :
                component = new H5ComponentPoint(name,cfg);
                break;
            default:
        }
        page.append(component);
        return this;
	}
	/*H5对象初始化呈现*/
    this.loader = function( firstPage ){
        this.el.fullpage({
            onLeave:function( index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function( anchorLink, index ) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });//使插件中向上向下两个事件指定触发onLeave和onLoad事件配合组件的自定义动画和其他效果
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
        if(firstPage){
            $.fn.fullpage.moveTo( firstPage );
        }
    }
    return this;

}
