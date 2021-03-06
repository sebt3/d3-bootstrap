(function(global, factory) {
	if (typeof global.d3 !== 'object' || typeof global.d3.version !== 'string')
		throw new Error('Bootstrap\'s JavaScript requires d3v4 or d3v5');
	var v = global.d3.version.split('.');
	if (v[0] != '4' && v[0] != '5')
		throw new Error('Bootstrap\'s JavaScript requires d3v4 or d3v5');
	if (typeof global.bs !== 'object' || typeof global.bs.version !== 'string')
		throw new Error('d3-adminLTE require d3-Bootstrap');
	
	factory(global.adminlte = global.adminlte || {}, global);
})(this, (function(adminlte, global) {
	// private data
	// api definition
	adminlte.api = adminlte.api || {
		bars:{left:{},right:{}},	layout:{},	box:{}
	}
	// layout
	adminlte.api.layout.activate	= function() {
		d3.select('body, html, .wrapper').style('height', 'auto');
		d3.select('.layout-boxed > .wrapper').style('overflow', 'hidden');
		// TODO: improve this "if"
		if (document.body.getBoundingClientRect().height<window.innerHeight) {
			d3.select('.content-wrapper').style('height', (window.innerHeight-parseInt(d3.select('.main-header').style('height'),10)-parseInt(d3.select('.main-footer').style('height'),10))+'px')
		}
		var footer = parseInt(d3.select('.main-footer').style('height'),10)		
		if (d3.select('body').classed('fixed')) {
			d3.select('.content-wrapper, .right-side').style('min-height', window.innerHeight - footer);
		} else {
			var side = parseInt(d3.select('.sidebar').style('height'),10),
			    neg  = parseInt(d3.select('.main-header').style('height'),10) + footer,
			    bar  = d3.select('.control-sidebar'),
			    t;
			if(window.innerHeight>side)
				t = window.innerHeight - neg
			else
				t = side
			d3.select('.content-wrapper, .right-side').style('min-height', t);
			if (bar.size()>0 && parseInt(bar.style('height'),10)>t)
				d3.select('.content-wrapper, .right-side').style('min-height', parseInt(bar.style('height'),10));
		}
	}
	// right bar
	adminlte.api.bars.right.resize	= function() {
		var bg		= d3.select('.control-sidebar-bg')
		if (bg.size()<1) return
		bg.style('height', d3.select('.wrapper').style('height'));
	}
	adminlte.api.bars.right.activate= function() {
		var r		= d3.select('.content-wrapper, .right-side'),
		    target	= d3.select('.control-sidebar'),
		    bg		= d3.select('.control-sidebar-bg')
		if (bg.size()<1) return
		if (d3.select('body').classed('layout-boxed')) {
			bg.style('position', 'absolute');
			adminlte.api.bars.right.resize();
		} else {
			bg.style('position', 'fixed');
			bg.style('height', 'auto');
		}
		if (target.size()<1) return;
		if (d3.select('body').classed('fixed')) {
			target.style('position',	'fixed');
			target.style('max-height',	'100%');
			target.style('overflow',	'auto');
			target.style('padding-bottom',	'50px');
		} else {
			if (r.size()<1) return;
			if (parseInt(r.style('height'),10) < parseInt(target.style('height'),10))
				r.style('min-height', target.style('height'));
		}
	}
	adminlte.api.bars.right.click	= function() {
		if (d3.event) d3.event.preventDefault();
		var target = d3.select('.control-sidebar')
		if(target.size<1) return;
		if(!target.classed('control-sidebar-slide'))
			target.classed('control-sidebar-open',!target.classed('control-sidebar-open'));
		else
			d3.select('body').classed('control-sidebar-open',!d3.select('body').classed('control-sidebar-open'));
	}
	// left bar
	adminlte.api.bars.left.click	= function() {
		if (d3.event) d3.event.preventDefault();
		var body = d3.select('body')
		if(window.innerWidth>767)
			body.classed('sidebar-collapse',!body.classed('sidebar-collapse'))
		else
			body.classed('sidebar-open',!body.classed('sidebar-open'))
	}
	// sidebar tree | TODO: animate
	adminlte.api.bars.left.treeClick= function() {
		var me     = d3.select(this),
		    parent = bs.api.find.parent(this, 'LI')
		if (d3.event) d3.event.preventDefault();
		var o = d3.select(parent).classed('active');
		d3.select('.sidebar ul.sidebar-menu').selectAll('li.active').classed('active',false);
		if (!o)
			d3.select(parent).classed('active', true)
	}
	// bow widget collapse
	adminlte.api.box.collapse	= function() {
		var	me	= d3.select(this),
			target	= bs.api.find.target(this, 'collapse'),
			active	= target.classed('in');
		bs.api.collapse.click.call(this);
		if (active)
			me.select('.fa-minus').classed('fa-minus',false).classed('fa-plus',true)
		else
			me.select('.fa-plus').classed('fa-plus',false).classed('fa-minus',true)
	}
	// enabling data-api on load
	d3.select(window)					.on('load.adminlte.data-api',			function() {
		adminlte.api.layout.activate();
		adminlte.api.bars.right.activate();
		if (d3.select('body').classed('layout-boxed'))
			d3.select(window)			.on('resize.adminlte.bars.right.data-api',	adminlte.api.bars.right.resize);
		d3.select('body').classed('hold-transition', false);
		d3.selectAll('[data-toggle="control-sidebar"]')	.on('click.adminlte.bars.right.data-api',	adminlte.api.bars.right.click);
		d3.selectAll('[data-toggle="offcanvas"]')	.on('click.adminlte.bars.left.data-api',	adminlte.api.bars.left.click);
		d3.selectAll('[data-widget="collapse"]')	.on('click.adminlte.box.collapse.data-api',	adminlte.api.box.collapse);
		d3.selectAll('.sidebar li a').each(function() {
			var me	= d3.select(this),
			    url	= me.attr('href');
			if (url!='' && url.substr(0,1) != '#') return true;
			d3.select(this)				.on('click.adminlte.bars.left.data-api',	adminlte.api.bars.left.treeClick);
		})
	});
}));
