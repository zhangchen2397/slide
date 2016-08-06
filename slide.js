/**
 * 移动webapp开发滑动组件
 * 可应用于图片轮播、查看大图翻页、tab切换等使用场景
 * @author zhangchen2397@126.com
 * ----------------------------------------------
 *
 * 对外调用接口及自定义事件
 *
 */

( function( root, factory ) {
    if ( typeof define === 'function' ) {
        define( 'slide', [ 'jqmobi', 'zepto', 'event' ], function( $, Zepto, Event ) {
            return factory( root, $ );
        } );
    } else {
        root.slide = factory( root, root.$ );
    }
} )( window, function( root, $ ) {

    var slide = function( config ) {
        this.defaultConfig = {
            el: 'slide',
            speed: 3000,
            autoPlay: true,
            continuous: true,
            navClass: 'nav-list'
        };
        console.log(Zepto);

        this.config = $.extend( this.defaultConfig, config || {} );

        this.init.call( this );
    };

    $.extend( slide.prototype, {
        init: function() {
            this._cache();
            this._createNav();
            this._actContinue();
            this._initEvent();
        },

        _cache: function() {
            var me = this,
                config = this.config;

            this.el = ( typeof config.el === 'string' ) ? $( '#' + config.el ) : config.el;
            this.imgUl = $( this.el.children()[ 0 ] );
            this.imgList = this.imgUl.find( 'li' );
            this.imgLen = this.imgList.length;

            this.baseWidth = this.el.width();
            this.endX = 0;
            this.curIdx = 1;
        },

        _createNav: function() {
            var me = this,
                config = this.config,
                tempHtml = '<ul class="' + config.navClass + '">';

            this.imgList.each( function( idx, el ) {
                idx = idx + 1;
                tempHtml += '<li>' + idx + '</li>';
            } );

            tempHtml += '</ul>';

            this.el.append( tempHtml );

            this.navUl = this.el.find( 'ul.' + config.navClass );
            this.navList = this.navUl.find( 'li' );
        },

        _actContinue: function() {
            var me = this,
                config = this.config;

            if ( config.continuous ) {
                this.imgUl.append( $( this.imgList[ 0 ] ).clone() );
                this.imgUl.append( $( this.imgList[ this.imgLen - 1 ] ).clone() );
            }
        },

        _initEvent: function() {
            var me = this,
                imgUl = this.imgUl;

            imgUl.delegate( 'li', 'touchstart', $.proxy( this._startHandler, this ) );
            imgUl.delegate( 'li', 'touchmove', $.proxy( this._moveHandler, this ) );
            imgUl.delegate( 'li', 'touchend', $.proxy( this._endHandler, this ) );
        },

        _startHandler: function( event ) {
            var me = this,
                config = this.config,
                target = event.target;

            me.startTime = +new Date();
            me.startX = event.touches[ 0 ].pageX;
        },

        _moveHandler: function( event ) {
            var me = this,
                config = this.config;

            event.preventDefault();

            this.differX = event.targetTouches[ 0 ].pageX - me.startX;
            this.offsetX = this.differX + this.endX;

            this.imgUl.css( {
                webkitTransition: '-webkit-transform 0s',
                webkitTransform: 'translate3d(' + this.offsetX + 'px, 0, 0 )'
            } );
        },

        _endHandler: function() {
            var me = this,
                config = this.config;

            if ( this.differX > 0 ) {
                this.curIdx--;
            } else {
                this.curIdx++;
            }

            this.endX = -this.baseWidth * ( this.curIdx - 1 );

            this.imgUl.css( {
                webkitTransition: '-webkit-transform 0.3s',
                webkitTransform: 'translate3d(' + this.endX + 'px, 0, 0 )'
            } );
        },

        _testMerge: function() {
            console.log('haha');
            console.log('testMerge');
            console.log('test merge');
            console.log('modify by testMerge');
        },

        modifyByMaster: function() {
            console.log('master');
        },

        testMergeCustom: function() {
            console.log('testMerge');
        }
    } );

    return slide;
} );
