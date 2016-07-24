/* 散点图表组件对象 */

var H5ComponentPoint =function ( name, cfg ) {
	var component = new H5ComponentBase(name, cfg);
	var base = cfg.data[0][1]; //以第一个数据的比例为大小的100%
	/*遍历cfg.data，生成point并配置大小、位置、背景色、延迟出现动画*/
	$.each(cfg.data, function(idx, item){
		var point = $('<div class = "point point_'+idx+'">');
		var name = $('<div class = "name">'+item[0]+'</div>');
		var rate = $('<div class = "per">'+(item[1]*100)+'%</div>');
		name.append(rate);
		point.append(name);

		var per = (item[1]/base*100)+'%';
		point.width(per).height(per);

		if(item[2]){
			point.css("backgroundColor", item[2]);
		}
		if(item[3] !== undefined && item[4] !== undefined){//要使设置为0的时候也生效所以用undefined
			point.css("left", item[3]).css("top", item[4]);		
		}

		point.css("transition", "all 1s "+idx*0.5+"s");
		component.append(point);

	});
	/*定义click的类，以便在CSS中设置动画特效*/
	component.find('.point').on('click',function(){

        component.find('.point').removeClass('point_focus');
        $(this).addClass('point_focus');

        return false;
   }).eq(0).addClass('point_focus')

   return component;
}