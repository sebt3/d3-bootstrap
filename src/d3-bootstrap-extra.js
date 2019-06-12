(function(global, factory) {
	if (typeof global.d3 !== 'object' || typeof global.d3.version !== 'string')
		throw new Error('Bootstrap\'s JavaScript requires d3v4 or d3v5');
	var v = global.d3.version.split('.');
	if (v[0] != '4' && v[0] != '5')
		throw new Error('Bootstrap\'s JavaScript requires d3v4 or d3v5');
	if (typeof global.bs !== 'object' || typeof global.bs.version !== 'string')
		throw new Error('Bootstrap-extra require d3-Bootstrap');
	
	factory(global.bs, global);
})(this, (function(bs, global) {
var boxCnt = 0, fileCnt = 0, tabCnt = 0, carouselCnt=0;

bs.element	= function(e, ptext) {
	var text=ptext, el=e;
	function chart(s) { s.each(chart.init); return chart; }
	chart.init	= function() { 
		var root= d3.select(this).append(el).html(text);
		return chart;
	};
	return chart;
}
bs.label	= function(ptext) {
	var text=ptext, cl='label-default', ul='';
	function chart(s) { s.each(chart.init); return chart; }
	chart.class	= function(t) {if (arguments.length) {cl = t;return chart;} return cl;};
	chart.url	= function(t) {if (arguments.length) {ul = t;return chart;} return ul;};
	chart.init	= function() { 
		var root= d3.select(this);
		if(ul!='')
			root = root.append('a').attr('href',ul);
		root.append('span').attr('class', 'label '+cl).html(text);
		return chart;
	};
	return chart;
}
bs.p	= function(ptext) {
	return bs.element('p',ptext);
}
bs.h3	= function(ptext) {
	return bs.element('h3',ptext);
}
bs.box	= function() {
	var title, body, footer, cl="box-default", tools = [], id = "bsBox-"+(++boxCnt), root, icon;
	function draw() {
		var ttl;
		if (typeof title != 'undefined' || typeof icon != 'undefined' || tools.length>0)
			ttl = root.append('div').attr('class', 'box-header with-border');
		if (typeof icon == 'function')
			ttl.append('span').attr('class', 'box-icon').call(icon);
		else if (typeof icon != 'undefined')
			ttl.append('span').attr('class', 'box-icon').append('img').attr('src',icon);
		if (typeof title != 'undefined')
			ttl.append('h3').attr('class', 'box-title').html(title);
		if (tools.length>0 && typeof title != 'undefined') {
			ttl.append('div').attr('class', 'box-tools pull-right').selectAll('button').data(tools).enter().each(function(d,i) {
				if(typeof d == 'function') {
					d3.select(this).call(d);
					return;
				}
				var btn = d3.select(this).append('button').attr('type', 'button').attr('class','btn btn-box-tool');
				if (typeof d.action != 'undefined' && d.action == 'collapse')
					btn.attr('data-widget', d.action).attr('data-target','#'+id).on('click.bs.collapse.data-api',	bs.api.collapse.click);
				else if (typeof d.action != 'undefined')
					btn.attr('data-widget', d.action)
				if (typeof d.icon != 'undefined')
					btn.append('i').attr('class', d.icon)
			});
		}
		var tmp	= root.append('div').attr('class', 'collapse in').attr('id',id);
		var bod = tmp.append('div').attr('class', 'box-body');
		if (typeof body != 'undefined')
			bod.call(body)
		if (typeof footer != 'undefined')
			tmp.append('div').attr('class', 'box-footer').call(footer)
	}
	function chart(s) { s.each(chart.init); return chart; }
	chart.title	= function(t) {if (arguments.length) {title = t;return chart;} return title;};
	chart.icon	= function(t) {if (arguments.length) {icon = t;return chart;} return icon;};
	chart.tool	= function(t) {tools.push(t);return chart;};
	chart.class	= function(t) {if (arguments.length) {cl = t;return chart;} return cl;};
	chart.body	= function(t) {if (arguments.length) {body = t;return chart;} return body;};
	chart.footer	= function(t) {if (arguments.length) {footer = t;return chart;} return footer;};
	chart.update	= function() {root.html('');draw();return chart;};
	chart.init	= function() { 
		root = d3.select(this).append('div').attr('class', 'box '+cl);
		draw();
		return chart;
	};
	return chart;
}
bs.panel = function() {
	var title, body, cl = "panel-default";
	function chart(s) { s.each(chart.init); return chart; }
	chart.title	= function(t) {title = t;return chart;};
	chart.class	= function(t) {cl = t;return chart;};
	chart.body	= function(t) {body = t;return chart;};
	chart.init	= function() { 
		var root= d3.select(this).append('div').attr('class', 'panel '+cl),
		    ttl	= root.append('div').attr('class', 'panel-heading').html(title),
		    bod = root.append('div').attr('class', 'panel-body');
		if (typeof body != 'undefined')
			bod.call(body)
		return chart;
	};
	return chart;
}
bs.modal = function() {
	var id, title, body, footer, cl = "modal-default";
	function chart(s) { s.each(chart.init); return chart; }
	chart.title	= function(t) {title = t;return chart;};
	chart.id	= function(t) {id = t;return chart;};
	chart.class	= function(t) {cl = t;return chart;};
	chart.body	= function(t) {body = t;return chart;};
	chart.footer	= function(t) {footer = t;return chart;};
	chart.init	= function() { 
		var root= d3.select(this).append('div').attr('class', 'modal fade '+cl).attr('id', id).attr('tabindex','-1').attr('role','dialog').append('div').attr('class','modal-dialog').attr('role','document').append('div').attr('class','modal-content')
		    ttl	= root.append('div').attr('class', 'modal-header'),
		    bod = root.append('div').attr('class', 'modal-body');
		ttl.append('button').attr('type', 'button').attr('class', 'close').attr('data-dismiss','modal').attr('aria-label','Close').append('span').attr('aria-hidden','true').html('&times;').on('click.bs.modal.data-api',		bs.api.modal.click);
		if (typeof title != 'undefined')
			ttl.append('h4').attr('class','modal-title').html(title)
		if (typeof body != 'undefined')
			bod.call(body)
		if (typeof footer != 'undefined')
			root.append('div').attr('class','modal-footer').call(footer)
		return chart;
	};
	return chart;
}
bs.row	= function() {
	var cells = [], root;
	function draw() {
		root.selectAll('div').data(cells).enter().append('div').each(function(d,i) {
			var c = d3.select(this);
			if(typeof d.class != 'undefined')
				c.attr('class', d.class)
			if(typeof d.obj != 'undefined')
				c.call(d.obj)
		});
	}
	function chart(s) { s.each(chart.init); return chart; }
	chart.cell	= function(l,c) {cells.push({ 'obj': c, 'class':l});return chart;}
	chart.init	= function() { 
		root = d3.select(this).append('div').attr('class', 'row');
		draw();
		return chart;
	};
	chart.update	= function() {root.html('');draw();return chart;};
	return chart;
}
bs.union= function() {
	var cells = [], root;
	function chart(s) { s.each(chart.init); return chart; }
	function draw() {
		root.selectAll('span').data(cells).enter().append('span').each(function(d,i) {
			d3.select(this).call(d);
		});
	}
	chart.item	= function(c) {cells.push(c);return chart;}
	chart.init	= function() { 
		root = d3.select(this);
		draw();
		return chart;
	};
	chart.update	= function() {root.html('');draw();return chart;};
	return chart;
}
bs.pills= function() {
	var pills = [];
	function chart(s) { s.each(chart.init); return chart; }
	chart.data	= function(t) {pills = t;return chart;}
	chart.add	= function(t) {pills.push(t);return chart;}
	chart.init	= function() {
		d3.select(this).append('ul').attr('class', 'nav nav-pills nav-stacked').selectAll('li').data(pills).enter().append('li').each(function(d,i) {
			var p = d3.select(this);
			if (typeof d.url != 'undefined')
				p = p.append('a').attr('href',d.url)
			if (typeof d.left != 'undefined')
				p.append('span').html(d.left)
			if (typeof d.right != 'undefined')
				p.append('span').attr('class','pull-right').html(d.right)
			if (typeof d.color != 'undefined')
				p.attr('class', d.color)
		});
		return chart;
	};
	return chart;
}
bs.tabs= function() {
	var tabs = [], head, content;
	function chart(s) { s.each(chart.init); return chart; }
	chart.data	= function(t) {tabs = t;return chart;}
	chart.tab	= function(n,t) {tabs.push({name: n, pane: t});return chart;}
	chart.init	= function() {
		var root = d3.select(this), first=true;
		head = root.append('ul').attr('class','nav nav-tabs');
		content = root.append('div').attr('class','tab-content');
		
		tabs.forEach(function(d) {
			var id  = "bsTab-"+(++tabCnt);
			var li  = head.append('li').attr('role','presentation');
			var div = content.append('div').attr('id',id).attr('class','tab-pane fade');
			li.append('a').attr('data-toggle', 'tab').attr('href','#'+id).html(d.name).on('click.bs.tab.data-api',bs.api.tab.click);
			div.call(d.pane);
			if(first) {
				li.attr('class','active');
				div.classed('in',true).classed('active',true);
			}
			first = false;
		});
		return chart;
	};
	return chart;
}
bs.carousel= function() {
	var items = [], head, content, def='/pics/noscreen.png';
	function chart(s) { s.each(chart.init); return chart; }
	chart.data	= function(t) {if(t!=null)items = t;return chart;}
	chart.default	= function(t) {def = t;return chart;}
	chart.pic	= function(u,t) {items.push({url: u, alt: t});return chart;}
	chart.init	= function() {
		var cnt=0, id= "bsCarousel-"+(++carouselCnt),first = true, root = d3.select(this).append('div').attr('id',id).attr('class','carousel slide').attr('data-ride', 'carousel');
		head = root.append('ol').attr('class','carousel-indicators');
		content = root.append('div').attr('class','carousel-inner').attr('role','listbox');
		var l = root.append('a').attr('class','left carousel-control').attr('href','#'+id).attr('role','button').attr('data-slide','prev'),
		    r = root.append('a').attr('class','right carousel-control').attr('href','#'+id).attr('role','button').attr('data-slide','next');
		l.on('click.bs.carousel.data-api', function() {
			bs.api.carousel.moveTo.call(root.node(), 'prev')
		});
		r.on('click.bs.carousel.data-api', function() {
			bs.api.carousel.moveTo.call(root.node(), 'next')
		});
		l.append('span').attr('class','glyphicon glyphicon-chevron-left').attr('aria-hidden','true');
		l.append('span').attr('class','sr-only').html('Previous');
		r.append('span').attr('class','glyphicon glyphicon-chevron-right').attr('aria-hidden','true');
		r.append('span').attr('class','sr-only').html('Next');
		if (items.length==0 )
			chart.pic(def,'NoImage');
		items.forEach(function(d) {
			var n   = cnt++;
			var li  = head.append('li').attr('data-target','#'+id).attr('data-slide-to',n);
			li.on('click.bs.carousel.data-api', function() {
				bs.api.carousel.moveTo.call(root.node(), n)
			});
			var div = content.append('div').attr('class','item');
			div.append('img').attr('alt',d.alt).attr('src',d.url);
			if (typeof d.desc != 'undefined') {
				div.append('div').attr('class', 'carousel-caption').html(d.desc)
			}
			if(first) {
				li.attr('class','active');
				div.classed('active',true);
			}
			first = false;
		});
		root.each(bs.api.carousel.init);
		return chart;
	};
	return chart;
}
bs.list = function() {
	var items = [];
	function chart(s) { s.each(chart.init); return chart; }
	chart.data	= function(t) {items = t;;return chart;}
	chart.add	= function(t) {items.push(t);return chart;}
	chart.init	= function() {
		d3.select(this).append('ul').attr('class', 'list-unstyled').selectAll('li').data(items).enter().append('li').each(function(d,i) {
			if(typeof d == 'function') {
				d3.select(this).call(d);return
			}
			var p = d3.select(this);
			if (typeof d.url != 'undefined')
				p = p.append('a').attr('href',d.url)
			if (typeof d.color != 'undefined')
				p.attr('class', d.color)
			p.html(d.text)
		});
		return chart;
	};
	return chart;
}
bs.desc = function() {
	var items = [];
	function chart(s) { s.each(chart.init); return chart; }
	chart.item	= function(t,d) { items.push({ 'left': t, 'right':d});return chart;}
	chart.init	= function() {
		var root = d3.select(this).append('dl').attr('class', 'dl-horizontal').selectAll().data(items).enter().each(function(d,i) {
			var t = d3.select(this)
			t.append('dt').html(d.left)
			t.append('dd').html(d.right)
		});
	}
	return chart;
}
bs.descTable = function () {
	var items = [];
	function chart(s) { s.each(chart.init); return chart; }
	chart.data	= function(t) { items = t;return chart;}
	chart.item	= function(t,d,u) { items.push({ left: t, right:d, url: u});return chart;}
	chart.init	= function() {
		var root = d3.select(this).append('table').attr('class', 'table table-condensed table-striped table-hover').append('tbody').selectAll().data(items).enter().each(function(d,i) {
			var t = d3.select(this).append('tr')
			t.append('th').html(d.left)
			var x = t.append('td').attr('class','text-right')
			if (typeof d.url != 'undefined' && d.url != null)
				x = x.append('a').attr('href', d.url)
			if (typeof d.right == 'number')
				x.html(bs.api.format.number(d.right))
			else if (typeof d.right == 'function')
				x.call(d.right)
			else
				x.html(d.right)
		});
	}
	return chart;
}
bs.progress = function() {
	var items = [], title, url;
	function chart(s) { s.each(chart.init); return chart; }
	chart.title	= function(t) { title = t;return chart;}
	chart.url	= function(t) {   url = t;return chart;}
	chart.data	= function(t) { items = t;return chart;}
	chart.item	= function(p,c) { if (typeof c == 'undefined') c='progress-bar-success';items.push({ 'pct': p, 'class':c});return chart;}
	chart.init	= function() {
		var root = d3.select(this)
		if (typeof url != 'undefined')
			root  = root.append('a').attr('href', url)
		if (typeof title != 'undefined') {
			var t = root.append('div').attr('class', 'clearfix'), total=0
			items.forEach(function(i){total+=i.pct})
			t.append('span').attr('class','pull-left').html(title)
			t.append('small').attr('class','pull-right').text(Math.round(total)+'%')
		}
		root.append('div').attr('class', 'progress xs').selectAll().data(items).enter().each(function(d,i) {
			var t = d3.select(this).append('div').attr('style', 'width: '+d.pct+'%').attr('class', 'progress-bar '+d.class)
		});
	}
	return chart;
}
bs.form = function() {
	var body, url = "#", enc;
	function chart(s) { s.each(chart.init); return chart; }
	chart.body	= function(t) { body = t;return chart;}
	chart.url	= function(t) {  url = t;return chart;}
	chart.enctype	= function(t) {  enc = t;return chart;}
	chart.init	= function() {
		var f = d3.select(this).append('form').attr('class', 'form-horizontal').attr('action',url).attr('method','post')
		if (typeof enc != 'undefined')
			f.attr('enctype',enc)
		if (typeof body != 'undefined')
			f.call(body)
	}
	return chart;
}
bs.select = function(p_id) {
	var id = p_id, opts = [], val, i = 0;
	function chart(s) { s.each(chart.init); return chart; }
	chart.value	= function(t) { val = t;return chart;}
	chart.add	= function(t,n) { if (typeof n == 'undefined') n=i++;opts.push({ 'text': t, 'val':n});return chart;}
	chart.init	= function() {
		var s = d3.select(this).append('select').attr('class', 'form-control').attr('name', id)
		s.selectAll().data(opts).enter().each(function(d) {
			var o = d3.select(this).append('option').attr('value',d.val).html(d.text)
			if (val == d.val)
				o.attr('selected','selected')
		});
	}
	return chart;
}
bs.file = function(p_name) {
	var name = p_name, opts = [], val, id="bsFile-"+(++fileCnt);
	function chart(s) { s.each(chart.init); return chart; }
	chart.init	= function() {
		var i = d3.select(this).append('div').attr('class', 'input-group');
		var l = i.append('div').attr('class','form-control').attr('id', id).html('&hellip;');
		var s = i.append('label').attr('class', 'input-group-btn').append('span').attr('class', 'btn btn-primary');
		s.append('span').html('Browse&hellip;');
		s.append('input').attr('type', 'file').attr('style','display: none;').attr('name', name).on('change', function() {l.html(this.value);});
	}
	return chart;
}
bs.formGroup = function(p_id) {
	var label = "", addons = [], id = p_id, val, place, obj, type='text',cl='';
	function chart(s) { s.each(chart.init); return chart; }
	chart.label	= function(t) {   label = t;return chart;}
	chart.obj	= function(t) {   obj   = t;return chart;}
	chart.class	= function(t) {   cl    = t;return chart;}
	chart.type	= function(t) {   type  = t;return chart;}
	chart.value	= function(t,h) { val   = t; if (typeof h != 'undefined') place=h;return chart;}
	chart.add	= function(t,c) { if (typeof c == 'undefined') c=false;addons.push({ 'text': t, 'before':c});return chart;}
	chart.init	= function() {
		var g	= d3.select(this).append('div').attr('class', 'form-group')
		g.append('label').attr('for',id).attr('class','col-sm-4 control-label').html(label)
		var d	= g.append('div').attr('class', 'col-sm-8')
		if (addons.length>0)
			d = d.append('div').attr('class', 'input-group')
		addons.forEach(function(i){
			if(i.before)
				d.append('span').attr('class','input-group-addon').html(i.text)
		});
		if(typeof obj != 'undefined')
			d.call(obj)
		else {
			var t = d.append('input').attr('class','form-control '+cl).attr('id',id).attr('name',id).attr('type',type)
			if(typeof place != 'undefined' && type!='hidden')
				t.attr('placeholder', place)
			else if(type=='hidden')
				d.append('div').attr('class','form-control').html(place)
			if(typeof val != 'undefined')
				t.attr('value', val)
		}
		addons.forEach(function(i){
			if(!i.before)
				d.append('span').attr('class','input-group-addon').html(i.text)
		});
	}
	return chart;
}
bs.dropdown = function() {
	var cl = "btn-default", icon = "fa fa-caret-down", text="", items  = [];
	function chart(s) { s.each(chart.init); return chart; }
	chart.class	= function(t) {  cl = t;return chart;};
	chart.item	= function(t,c) { items.push({ 'text': t, 'call':c});return chart;}
	chart.icon	= function(t) {icon = t;return chart;};
	chart.text	= function(t) {text = t;return chart;};
	chart.init	= function() {
		var div = d3.select(this).append('div').attr('class','btn-group dropdown'),
		    b = div.append('button').attr('class', 'btn '+cl+' dropdown-toggle').attr('data-toggle','dropdown').on('click.bs.dropdown.data-api',	bs.api.dropdown.click),
		    u = div.append('ul').attr('class','dropdown-menu');
		b.append('span').html(text+' ')
		b.append('i').attr('aria-hidden','true').attr('class',icon)
		u.selectAll('li').data(items).enter().each(function(d,i) {
			d3.select(this).append('li').append('a').attr('onclick',d.call).html(d.text)
		});
	}
	return chart;
}
bs.button = bs.button || {}
bs.button.group = function() {
	var lefts = [], rights = [];
	function chart(s) { s.each(chart.init); return chart; }
	chart.left	= function(t) { lefts.push(t);  return chart; }
	chart.right	= function(t) { rights.push(t); return chart; }
	chart.init	= function() {
		var l = d3.select(this);
		lefts.forEach(function(d) {l.call(d).append('span').html('&nbsp;'); });
		if (rights.length==0) return;
		r = l.append('div').attr('class', 'pull-right');
		rights.forEach(function(d) {r.call(d).append('span').html('&nbsp;'); });
	}
	return chart;
}
bs.button.a = function() {
	var cl = "btn-default", url = "#", icon, text="";
	function chart(s) { s.each(chart.init); return chart; }
	chart.url	= function(t) { url = t;return chart;}
	chart.class	= function(t) {  cl = t;return chart;};
	chart.icon	= function(t) {icon = t;return chart;};
	chart.text	= function(t) {text = t;return chart;};
	chart.init	= function() {
		var r = d3.select(this).append('a').attr('href',url).attr('class', 'btn '+cl)
		if(typeof icon != 'undefined')
			r.append('i').attr('aria-hidden','true').attr('class',icon)
		r.append('span').text(' '+text)
	}
	return chart;
}
bs.button.toggle = function() {
	var cl = "btn-default", toggle = "modal", icon, text="", target="";
	function chart(s) { s.each(chart.init); return chart; }
	chart.target	= function(t,c) { target = t; if (typeof c != 'undefined') toggle=c;return chart;}
	chart.class	= function(t) {  cl = t;return chart;};
	chart.icon	= function(t) {icon = t;return chart;};
	chart.text	= function(t) {text = t;return chart;};
	chart.init	= function() {
		var r = d3.select(this).append('a').attr('href','#').attr('class', 'btn '+cl).attr('data-toggle', toggle).attr('data-target', target);
		if(typeof icon != 'undefined')
			r.append('i').attr('aria-hidden','true').attr('class',icon)
		r.append('span').text(' '+text)
		switch (toggle) {
		case 'modal':	r.on('click.bs.modal.data-api',		bs.api.modal.click);	break;
		case 'dropdown':r.on('click.bs.dropdown.data-api',	bs.api.dropdown.click);	break;
		case 'tab':	r.on('click.bs.tab.data-api',		bs.api.tab.click);	break;
		case 'collapse':r.on('click.bs.collapse.data-api',	bs.api.collapse.click);	break;
		}
	}
	return chart;
}
bs.button.form = function() {
	var cl = "btn-default", url = "#", icon, text="", type="submit";
	function chart(s) { s.each(chart.init); return chart; }
	chart.url	= function(t) { url = t;return chart;}
	chart.class	= function(t) {  cl = t;return chart;};
	chart.type	= function(t) {type = t;return chart;};
	chart.icon	= function(t) {icon = t;return chart;};
	chart.text	= function(t) {text = t;return chart;};
	chart.init	= function() {
		var r = d3.select(this).append('button').attr('class', 'btn '+cl)
		if(typeof icon != 'undefined')
			r.append('i').attr('aria-hidden','true').attr('class',icon)
		r.append('span').html(' '+text)
	}
	return chart;
}
bs.button.submit = function() {
	var cl = "btn-outline", url = "#", icon, text="";
	function chart(s) { s.each(chart.init); return chart; }
	chart.url	= function(t) { url = t;return chart;}
	chart.class	= function(t) {  cl = t;return chart;};
	chart.icon	= function(t) {icon = t;return chart;};
	chart.text	= function(t) {text = t;return chart;};
	chart.init	= function() {
		var r = d3.select(this).append('form').attr('action',url).attr('method','post') .append('button').attr('class', 'btn '+cl)
		if(typeof icon != 'undefined')
			r.append('i').attr('aria-hidden','true').attr('class',icon)
		r.append('span').html(' '+text)
	}
	return chart;
}
bs.modalDelete = function() {
	var cl = "btn-outline", url = "#", icon, text="", type="submit";
	function chart(s) { s.each(chart.init); return chart; }
	chart.url	= function(t) { url = t;return chart;}
	chart.title	= function(t) {title = t;return chart;};
	chart.id	= function(t) {id = t;return chart;};
	chart.text	= function(t) {text = t;return chart;};
	chart.body	= function(t) {body = t;return chart;};
	chart.init	= function() {
		var r = d3.select(this).call(bs.modal().class('modal-warning').id(id) .title(title).body(body).footer(bs.button.submit().url(url).text(text)))
	}
	return chart;
}

bs.mdViewer = function() {
	var src = "", root, inited=false;
	function draw() {
		root.html('');
		
		var ar = src.split('\n');
		ar.forEach(function(l) {
			type = 'p';
			ret = l;
			// inline remplacement
			ret = ret.replace(/!\[([^\]]*)\]\(([^\)]*)\)/g,'<img src="$2" alt="$1"></img>');
			ret = ret.replace(/\[([^\]]*)\]\(([^\)]*)\)/g,'<a href="$2">$1</a>');
			ret = ret.replace(/\*\*([^\*]*)\*\*/g,'<b>$1</b>');
			ret = ret.replace(/\_\_([^\_]*)\_\_/g,'<b>$1</b>');
			ret = ret.replace(/\*([^\*]*)\*/g,'<i>$1</i>');
			ret = ret.replace(/\_([^\_]*)\_/g,'<i>$1</i>');
			// TODO: Improve list management by a lot
			if (/^\+ /.test(ret))		{type='ul';ret = ret.replace(/\+ (.*)/,'<li>$1</li>')}
			if (/^\* /.test(ret))		{type='ul';ret = ret.replace(/\* (.*)/,'<li>$1</li>')}
			if (/^\- /.test(ret))		{type='ul';ret = ret.replace(/- (.*)/,'<li>$1</li>')}
			// final remplacement
			if (/^###### /.test(ret))	{type='h6';ret = ret.replace(/^###### /,'')}
			if (/^##### /.test(ret))	{type='h5';ret = ret.replace(/^##### /,'')}
			if (/^#### /.test(ret))		{type='h4';ret = ret.replace(/^#### /,'')}
			if (/^### /.test(ret))		{type='h3';ret = ret.replace(/^### /,'')}
			if (/^## /.test(ret))		{type='h2';ret = ret.replace(/^## /,'')}
			if (/^# /.test(ret))		{type='h1';ret = ret.replace(/^# /,'')}
			root.append(type).html(ret);
		});
	}
	function chart(s) { s.each(chart.init); inited=true;return chart; }
	chart.src	= function(t) {if (arguments.length) {if(t!=null)src = t;if(inited)draw();return chart;} return src;};
	chart.init	= function() { 
		root = d3.select(this).append('div').attr('class', 'mdViewer');
		draw();
		return chart;
	};
	chart.update	= function() {root.html('');draw();return chart;};
	return chart;
}
bs.textarea = function(p_id) {
	var src = "", txt, inited=false, id=p_id, lineCnt=10;
	function draw() {
		txt.node().value = src;
	}
	function chart(s) { s.each(chart.init); inited=true;return chart; }
	chart.value	= function(t) {if (arguments.length) {if(t!=null)src = t;if(inited)draw();return chart;} return src;};
	chart.lineCount	= function(t) {if (arguments.length) {if(t!=null)lineCnt=t;return chart;} return lineCnt;};
	chart.init	= function() { 
		txt = d3.select(this).append('div').attr('class', 'textEditor').append('textarea').attr('name', id).attr('rows', lineCnt);
		draw();
		return chart;
	};
	chart.update	= function() {draw();return chart;};
	return chart;
}

}));
