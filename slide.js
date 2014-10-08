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

        };

        this.config = $.extend( this.defaultConfig, config || {} );

        this.init.call( this );
    };

    $.extend( slide.prototype, {
        init: function() {
            
        }
    } );

    return slide;
} );
