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
        define( 'slide', [ 'jqmobi' ], function( $ ) {
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

        }
    } );

    return slide;
} );
