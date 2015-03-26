/*!
 * Endless Scroll plugin for jQuery
 * 
 * v2.0.0 2015-3-26
 * 
 * Copyright (c) 2008-2012 Fred Wu
 * rewritten by Sun https://github.com/ufologist
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

/**
 * Usage:
 * 
 * // using default options
 * $(window).endlessScroll();
 * 
 * // using some custom options
 * $(window).endlessScroll({
 *   loader: '<div class="loading"><div>'
 * });
 * 
 * Configuration options:
 * 
 * bottomPixels      integer         the number of pixels from the bottom of the page that triggers the event
 * loader            string          the HTML to be displayed during loading
 * 
 * Usage tips:
 * 
 * The plugin is more useful when used with the callback function, which can then make AJAX calls to retrieve content.
 * The fire sequence argument (for the callback function) is useful for 'pagination'-like features.
 */
(function($) {
    var pluginName = 'endlessScroll';

    var defaults = {
        bottomPixels: 200,
        loaderClass: pluginName + '-loader',
        loader: '<div>loading...</div>'
    };

    var events = {
        REACH_SCROLLBAR_END: 'REACH_SCROLLBAR_END.' + pluginName,
        LOADING_MORE_FINISH: 'LOADING_MORE_FINISH.' + pluginName,
        ALL_DONE: 'ALL_DONE.' + pluginName,
        RESET: 'RESET.' + pluginName
    };

    function EndlessScroll($el, options) {
        this.$el = $el;
        this.el = $el[0];
        this.options = $.extend({}, defaults, typeof options == 'object' && options);

        this.init();

        this.bindScroll().on(events.LOADING_MORE_FINISH, $.proxy(this.onLoadingMoreFinish, this))
                         .on(events.ALL_DONE, $.proxy(this.onAllDone, this))
                         .on(events.RESET, $.proxy(this.init, this));
    }
    EndlessScroll.events = events;
    EndlessScroll.defaults = defaults;

    EndlessScroll.prototype.init = function() {
        this.reachedScrollbarEnd = false;
        this.loading = false;
        this.page = 1;
        this.allDone = false;

        if (this.$loader) {
            this.$loader.remove();
        }
        this.$loader = this.getLoader();
        if (this.hasScrollbar()) {
            this.appendLoader();
        }

        this.bindScroll();
    };

    EndlessScroll.prototype.bindScroll = function() {
        return this.$el.on('scroll.' + pluginName, $.proxy(this.onScroll, this));
    };

    EndlessScroll.prototype.onScroll = function() {
        if (this.loading) {
            return this;
        }
        if (this.allDone) {
            return this;
        }

        if (this.isReachScrollbarEnd()) {
            this.onReachScrollbarEnd();
            return this;
        }
    };

    // TODO 处理初始化数据不足, 没有出现滚动条的情况下如何处理加载数据的逻辑
    EndlessScroll.prototype.hasScrollbar = function() {
        return this.el.scrollHeight > this.el.clientHeight;
    };

    EndlessScroll.prototype.getLoader = function() {
        return $(this.options.loader).addClass(this.options.loaderClass);
    };
    EndlessScroll.prototype.appendLoader = function() {
        this.$el.append(this.$loader);
    };

    EndlessScroll.prototype.isReachScrollbarEnd = function() {
        if (this.el.scrollTop + this.el.clientHeight + this.options.bottomPixels >= this.el.scrollHeight) {
            this.reachedScrollbarEnd = true;
        } else {
            this.reachedScrollbarEnd = false;
        }

        return this.reachedScrollbarEnd;
    };
    EndlessScroll.prototype.onReachScrollbarEnd = function() {
        this.loading = true;
        this.$el.trigger(events.REACH_SCROLLBAR_END, {
            page: this.page
        });
        return true;
    };
    EndlessScroll.prototype.onLoadingMoreFinish = function() {
        this.page += 1;
        this.loading = false;
    };
    EndlessScroll.prototype.onAllDone = function() {
        this.$el.off('scroll.' + pluginName);
        this.$loader.remove();
        this.allDone = true;
    };

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(pluginName);

            if (!data) {
               $this.data(pluginName, (data = new EndlessScroll($this, option)));   
            }
            if (typeof option == 'string') {
                data[option]();
            }
        });
    }

    $.fn[pluginName] = Plugin;
    $.fn[pluginName].Constructor = EndlessScroll;
})(jQuery);
