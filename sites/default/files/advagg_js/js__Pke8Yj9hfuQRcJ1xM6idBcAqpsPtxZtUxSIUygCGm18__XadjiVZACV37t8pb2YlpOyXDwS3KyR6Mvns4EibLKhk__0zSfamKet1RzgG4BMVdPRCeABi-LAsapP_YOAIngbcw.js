/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.accordion.js. */
(function($, window, document, undefined) {
    'use strict';
    Foundation.libs.accordion = {
        name: 'accordion',
        version: '5.5.3',
        settings: {
            content_class: 'content',
            active_class: 'active',
            multi_expand: false,
            toggleable: true,
            callback: function() {}
        },
        init: function(scope, method, options) {
            this.bindings(method, options)
        },
        events: function(instance) {
            var self = this,
                S = this.S;
            self.create(this.S(instance));
            S(this.scope).off('.fndtn.accordion').on('click.fndtn.accordion', '[' + this.attr_name() + '] > dd > a, [' + this.attr_name() + '] > li > a', function(e) {
                var accordion = S(this).closest('[' + self.attr_name() + ']'),
                    groupSelector = self.attr_name() + '=' + accordion.attr(self.attr_name()),
                    settings = accordion.data(self.attr_name(true) + '-init') || self.settings,
                    target = S('#' + this.href.split('#')[1]),
                    aunts = $('> dd, > li', accordion),
                    siblings = aunts.children('.' + settings.content_class),
                    active_content = siblings.filter('.' + settings.active_class);
                e.preventDefault();
                if (accordion.attr(self.attr_name())) {
                    siblings = siblings.add('[' + groupSelector + '] dd > .' + settings.content_class + ', [' + groupSelector + '] li > .' + settings.content_class);
                    aunts = aunts.add('[' + groupSelector + '] dd, [' + groupSelector + '] li')
                };
                if (settings.toggleable && target.is(active_content)) {
                    target.parent('dd, li').toggleClass(settings.active_class, false);
                    target.toggleClass(settings.active_class, false);
                    S(this).attr('aria-expanded', function(i, attr) {
                        return attr === 'true' ? 'false' : 'true'
                    });
                    settings.callback(target);
                    target.triggerHandler('toggled', [accordion]);
                    accordion.triggerHandler('toggled', [target]);
                    return
                };
                if (!settings.multi_expand) {
                    siblings.removeClass(settings.active_class);
                    aunts.removeClass(settings.active_class);
                    aunts.children('a').attr('aria-expanded', 'false')
                };
                target.addClass(settings.active_class).parent().addClass(settings.active_class);
                settings.callback(target);
                target.triggerHandler('toggled', [accordion]);
                accordion.triggerHandler('toggled', [target]);
                S(this).attr('aria-expanded', 'true')
            })
        },
        create: function($instance) {
            var self = this,
                accordion = $instance,
                aunts = $('> .accordion-navigation', accordion),
                settings = accordion.data(self.attr_name(true) + '-init') || self.settings;
            aunts.children('a').attr('aria-expanded', 'false');
            aunts.has('.' + settings.content_class + '.' + settings.active_class).addClass(settings.active_class).children('a').attr('aria-expanded', 'true');
            if (settings.multi_expand) $instance.attr('aria-multiselectable', 'true')
        },
        toggle: function(options) {
            var options = typeof options !== 'undefined' ? options : {},
                selector = typeof options.selector !== 'undefined' ? options.selector : '',
                toggle_state = typeof options.toggle_state !== 'undefined' ? options.toggle_state : '',
                $accordion = typeof options.$accordion !== 'undefined' ? options.$accordion : this.S(this.scope).closest('[' + this.attr_name() + ']'),
                $items = $accordion.find('> dd' + selector + ', > li' + selector);
            if ($items.length < 1) {
                if (window.console) console.error('Selection not found.', selector);
                return false
            };
            var S = this.S,
                active_class = this.settings.active_class;
            $items.each(function() {
                var $item = S(this),
                    is_active = $item.hasClass(active_class);
                if ((is_active && toggle_state === 'close') || (!is_active && toggle_state === 'open') || toggle_state === '') $item.find('> a').trigger('click.fndtn.accordion')
            })
        },
        open: function(options) {
            var options = typeof options !== 'undefined' ? options : {};
            options.toggle_state = 'open';
            this.toggle(options)
        },
        close: function(options) {
            var options = typeof options !== 'undefined' ? options : {};
            options.toggle_state = 'close';
            this.toggle(options)
        },
        off: function() {},
        reflow: function() {}
    }
}(jQuery, window, window.document));;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.accordion.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.clearing.js. */
(function($, window, document, undefined) {
    'use strict';
    Foundation.libs.clearing = {
        name: 'clearing',
        version: '5.5.3',
        settings: {
            templates: {
                viewing: '<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div><img class="clearing-preload-next" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><img class="clearing-preload-prev" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />'
            },
            close_selectors: '.clearing-close, div.clearing-blackout',
            open_selectors: '',
            skip_selector: '',
            touch_label: '',
            init: false,
            locked: false
        },
        init: function(scope, method, options) {
            var self = this;
            Foundation.inherit(this, 'throttle image_loaded');
            this.bindings(method, options);
            if (self.S(this.scope).is('[' + this.attr_name() + ']')) {
                this.assemble(self.S('li', this.scope))
            } else self.S('[' + this.attr_name() + ']', this.scope).each(function() {
                self.assemble(self.S('li', this))
            })
        },
        events: function(scope) {
            var self = this,
                S = self.S,
                $scroll_container = $('.scroll-container');
            if ($scroll_container.length > 0) this.scope = $scroll_container;
            S(this.scope).off('.clearing').on('click.fndtn.clearing', 'ul[' + this.attr_name() + '] li ' + this.settings.open_selectors, function(e, current, target) {
                var current = current || S(this),
                    target = target || current,
                    next = current.next('li'),
                    settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init'),
                    image = S(e.target);
                e.preventDefault();
                if (!settings) {
                    self.init();
                    settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init')
                };
                if (target.hasClass('visible') && current[0] === target[0] && next.length > 0 && self.is_open(current)) {
                    target = next;
                    image = S('img', target)
                };
                self.open(image, current, target);
                self.update_paddles(target)
            }).on('click.fndtn.clearing', '.clearing-main-next', function(e) {
                self.nav(e, 'next')
            }).on('click.fndtn.clearing', '.clearing-main-prev', function(e) {
                self.nav(e, 'prev')
            }).on('click.fndtn.clearing', this.settings.close_selectors, function(e) {
                Foundation.libs.clearing.close(e, this)
            });
            $(document).on('keydown.fndtn.clearing', function(e) {
                self.keydown(e)
            });
            S(window).off('.clearing').on('resize.fndtn.clearing', function() {
                self.resize()
            });
            this.swipe_events(scope)
        },
        swipe_events: function(scope) {
            var self = this,
                S = self.S;
            S(this.scope).on('touchstart.fndtn.clearing', '.visible-img', function(e) {
                if (!e.touches) e = e.originalEvent;
                var data = {
                    start_page_x: e.touches[0].pageX,
                    start_page_y: e.touches[0].pageY,
                    start_time: (new Date()).getTime(),
                    delta_x: 0,
                    is_scrolling: undefined
                };
                S(this).data('swipe-transition', data);
                e.stopPropagation()
            }).on('touchmove.fndtn.clearing', '.visible-img', function(e) {
                if (!e.touches) e = e.originalEvent;
                if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
                var data = S(this).data('swipe-transition');
                if (typeof data === 'undefined') data = {};
                data.delta_x = e.touches[0].pageX - data.start_page_x;
                if (Foundation.rtl) data.delta_x = -data.delta_x;
                if (typeof data.is_scrolling === 'undefined') data.is_scrolling = !!(data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y));
                if (!data.is_scrolling && !data.active) {
                    e.preventDefault();
                    var direction = (data.delta_x < 0) ? 'next' : 'prev';
                    data.active = true;
                    self.nav(e, direction)
                }
            }).on('touchend.fndtn.clearing', '.visible-img', function(e) {
                S(this).data('swipe-transition', {});
                e.stopPropagation()
            })
        },
        assemble: function($li) {
            var $el = $li.parent();
            if ($el.parent().hasClass('carousel')) return;
            $el.after('<div id="foundationClearingHolder"></div>');
            var grid = $el.detach(),
                grid_outerHTML = '';
            if (grid[0] == null) {
                return
            } else grid_outerHTML = grid[0].outerHTML;
            var holder = this.S('#foundationClearingHolder'),
                settings = $el.data(this.attr_name(true) + '-init'),
                data = {
                    grid: '<div class="carousel">' + grid_outerHTML + '</div>',
                    viewing: settings.templates.viewing
                },
                wrapper = '<div class="clearing-assembled"><div>' + data.viewing + data.grid + '</div></div>',
                touch_label = this.settings.touch_label;
            if (Modernizr.touch) wrapper = $(wrapper).find('.clearing-touch-label').html(touch_label).end();
            holder.after(wrapper).remove()
        },
        open: function($image, current, target) {
            var self = this,
                body = $(document.body),
                root = target.closest('.clearing-assembled'),
                container = self.S('div', root).first(),
                visible_image = self.S('.visible-img', container),
                image = self.S('img', visible_image).not($image),
                label = self.S('.clearing-touch-label', container),
                error = false,
                loaded = {};
            $('body').on('touchmove', function(e) {
                e.preventDefault()
            });
            image.error(function() {
                error = true
            })

            function startLoad() {
                setTimeout(function() {
                    this.image_loaded(image, function() {
                        if (image.outerWidth() === 1 && !error) {
                            startLoad.call(this)
                        } else cb.call(this, image)
                    }.bind(this))
                }.bind(this), 100)
            }

            function cb(image) {
                var $image = $(image);
                $image.css('visibility', 'visible');
                $image.trigger('imageVisible');
                body.css('overflow', 'hidden');
                root.addClass('clearing-blackout');
                container.addClass('clearing-container');
                visible_image.show();
                this.fix_height(target).caption(self.S('.clearing-caption', visible_image), self.S('img', target)).center_and_label(image, label).shift(current, target, function() {
                    target.closest('li').siblings().removeClass('visible');
                    target.closest('li').addClass('visible')
                });
                visible_image.trigger('opened.fndtn.clearing')
            };
            if (!this.locked()) {
                visible_image.trigger('open.fndtn.clearing');
                loaded = this.load($image);
                if (loaded.interchange) {
                    image.attr('data-interchange', loaded.interchange).foundation('interchange', 'reflow')
                } else image.attr('src', loaded.src).attr('data-interchange', '');
                image.css('visibility', 'hidden');
                startLoad.call(this)
            }
        },
        close: function(e, el) {
            e.preventDefault();
            var root = (function(target) {
                    if (/blackout/.test(target.selector)) {
                        return target
                    } else return target.closest('.clearing-blackout')
                }($(el))),
                body = $(document.body),
                container, visible_image;
            if (el === e.target && root) {
                body.css('overflow', '');
                container = $('div', root).first();
                visible_image = $('.visible-img', container);
                visible_image.trigger('close.fndtn.clearing');
                this.settings.prev_index = 0;
                $('ul[' + this.attr_name() + ']', root).attr('style', '').closest('.clearing-blackout').removeClass('clearing-blackout');
                container.removeClass('clearing-container');
                visible_image.hide();
                visible_image.trigger('closed.fndtn.clearing')
            };
            $('body').off('touchmove');
            return false
        },
        is_open: function(current) {
            return current.parent().prop('style').length > 0
        },
        keydown: function(e) {
            var clearing = $('.clearing-blackout ul[' + this.attr_name() + ']'),
                NEXT_KEY = this.rtl ? 37 : 39,
                PREV_KEY = this.rtl ? 39 : 37,
                ESC_KEY = 27;
            if (e.which === NEXT_KEY) this.go(clearing, 'next');
            if (e.which === PREV_KEY) this.go(clearing, 'prev');
            if (e.which === ESC_KEY) this.S('a.clearing-close').trigger('click.fndtn.clearing')
        },
        nav: function(e, direction) {
            var clearing = $('ul[' + this.attr_name() + ']', '.clearing-blackout');
            e.preventDefault();
            this.go(clearing, direction)
        },
        resize: function() {
            var image = $('img', '.clearing-blackout .visible-img'),
                label = $('.clearing-touch-label', '.clearing-blackout');
            if (image.length) {
                this.center_and_label(image, label);
                image.trigger('resized.fndtn.clearing')
            }
        },
        fix_height: function(target) {
            var lis = target.parent().children(),
                self = this;
            lis.each(function() {
                var li = self.S(this),
                    image = li.find('img');
                if (li.height() > image.outerHeight()) li.addClass('fix-height')
            }).closest('ul').width(lis.length * 100 + '%');
            return this
        },
        update_paddles: function(target) {
            target = target.closest('li');
            var visible_image = target.closest('.carousel').siblings('.visible-img');
            if (target.next().length > 0) {
                this.S('.clearing-main-next', visible_image).removeClass('disabled')
            } else this.S('.clearing-main-next', visible_image).addClass('disabled');
            if (target.prev().length > 0) {
                this.S('.clearing-main-prev', visible_image).removeClass('disabled')
            } else this.S('.clearing-main-prev', visible_image).addClass('disabled')
        },
        center_and_label: function(target, label) {
            if (!this.rtl && label.length > 0) {
                label.css({
                    marginLeft: -(label.outerWidth() / 2),
                    marginTop: -(target.outerHeight() / 2) - label.outerHeight() - 10
                })
            } else label.css({
                marginRight: -(label.outerWidth() / 2),
                marginTop: -(target.outerHeight() / 2) - label.outerHeight() - 10,
                left: 'auto',
                right: '50%'
            });
            return this
        },
        load: function($image) {
            var href, interchange, closest_a;
            if ($image[0].nodeName === 'A') {
                href = $image.attr('href');
                interchange = $image.data('clearing-interchange')
            } else {
                closest_a = $image.closest('a');
                href = closest_a.attr('href');
                interchange = closest_a.data('clearing-interchange')
            };
            this.preload($image);
            return {
                src: href ? href : $image.attr('src'),
                interchange: href ? interchange : $image.data('clearing-interchange')
            }
        },
        preload: function($image) {
            this.img($image.closest('li').next(), 'next').img($image.closest('li').prev(), 'prev')
        },
        img: function(img, sibling_type) {
            if (img.length) {
                var preload_img = $('.clearing-preload-' + sibling_type),
                    new_a = this.S('a', img),
                    src, interchange, image;
                if (new_a.length) {
                    src = new_a.attr('href');
                    interchange = new_a.data('clearing-interchange')
                } else {
                    image = this.S('img', img);
                    src = image.attr('src');
                    interchange = image.data('clearing-interchange')
                };
                if (interchange) {
                    preload_img.attr('data-interchange', interchange)
                } else {
                    preload_img.attr('src', src);
                    preload_img.attr('data-interchange', '')
                }
            };
            return this
        },
        caption: function(container, $image) {
            var caption = $image.attr('data-caption');
            if (caption) {
                var containerPlain = container.get(0);
                containerPlain.innerHTML = caption;
                container.show()
            } else container.text('').hide();
            return this
        },
        go: function($ul, direction) {
            var current = this.S('.visible', $ul),
                target = current[direction]();
            if (this.settings.skip_selector && target.find(this.settings.skip_selector).length != 0) target = target[direction]();
            if (target.length) this.S('img', target).trigger('click.fndtn.clearing', [current, target]).trigger('change.fndtn.clearing')
        },
        shift: function(current, target, callback) {
            var clearing = target.parent(),
                old_index = this.settings.prev_index || target.index(),
                direction = this.direction(clearing, current, target),
                dir = this.rtl ? 'right' : 'left',
                left = parseInt(clearing.css('left'), 10),
                width = target.outerWidth(),
                skip_shift, dir_obj = {};
            if (target.index() !== old_index && !/skip/.test(direction)) {
                if (/left/.test(direction)) {
                    this.lock();
                    dir_obj[dir] = left + width;
                    clearing.animate(dir_obj, 300, this.unlock())
                } else if (/right/.test(direction)) {
                    this.lock();
                    dir_obj[dir] = left - width;
                    clearing.animate(dir_obj, 300, this.unlock())
                }
            } else if (/skip/.test(direction)) {
                skip_shift = target.index() - this.settings.up_count;
                this.lock();
                if (skip_shift > 0) {
                    dir_obj[dir] = -(skip_shift * width);
                    clearing.animate(dir_obj, 300, this.unlock())
                } else {
                    dir_obj[dir] = 0;
                    clearing.animate(dir_obj, 300, this.unlock())
                }
            };
            callback()
        },
        direction: function($el, current, target) {
            var lis = this.S('li', $el),
                li_width = lis.outerWidth() + (lis.outerWidth() / 4),
                up_count = Math.floor(this.S('.clearing-container').outerWidth() / li_width) - 1,
                target_index = lis.index(target),
                response;
            this.settings.up_count = up_count;
            if (this.adjacent(this.settings.prev_index, target_index)) {
                if ((target_index > up_count) && target_index > this.settings.prev_index) {
                    response = 'right'
                } else if ((target_index > up_count - 1) && target_index <= this.settings.prev_index) {
                    response = 'left'
                } else response = false
            } else response = 'skip';
            this.settings.prev_index = target_index;
            return response
        },
        adjacent: function(current_index, target_index) {
            for (var i = target_index + 1; i >= target_index - 1; i--)
                if (i === current_index) return true;
            return false
        },
        lock: function() {
            this.settings.locked = true
        },
        unlock: function() {
            this.settings.locked = false
        },
        locked: function() {
            return this.settings.locked
        },
        off: function() {
            this.S(this.scope).off('.fndtn.clearing');
            this.S(window).off('.fndtn.clearing')
        },
        reflow: function() {
            this.init()
        }
    }
}(jQuery, window, window.document));;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.clearing.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.dropdown.js. */
(function($, window, document, undefined) {
    'use strict';
    Foundation.libs.dropdown = {
        name: 'dropdown',
        version: '5.5.3',
        settings: {
            active_class: 'open',
            disabled_class: 'disabled',
            mega_class: 'mega',
            align: 'bottom',
            is_hover: false,
            hover_timeout: 150,
            opened: function() {},
            closed: function() {}
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, 'throttle');
            $.extend(true, this.settings, method, options);
            this.bindings(method, options)
        },
        events: function(scope) {
            var self = this,
                S = self.S;
            S(this.scope).off('.dropdown').on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function(e) {
                var settings = S(this).data(self.attr_name(true) + '-init') || self.settings;
                if (!settings.is_hover || Modernizr.touch) {
                    e.preventDefault();
                    if (S(this).parent('[data-reveal-id]').length) e.stopPropagation();
                    self.toggle($(this))
                }
            }).on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function(e) {
                var $this = S(this),
                    dropdown, target;
                clearTimeout(self.timeout);
                if ($this.data(self.data_attr())) {
                    dropdown = S('#' + $this.data(self.data_attr()));
                    target = $this
                } else {
                    dropdown = $this;
                    target = S('[' + self.attr_name() + '="' + dropdown.attr('id') + '"]')
                };
                var settings = target.data(self.attr_name(true) + '-init') || self.settings;
                if (S(e.currentTarget).data(self.data_attr()) && settings.is_hover) self.closeall.call(self);
                if (settings.is_hover) self.open.apply(self, [dropdown, target])
            }).on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function(e) {
                var $this = S(this),
                    settings;
                if ($this.data(self.data_attr())) {
                    settings = $this.data(self.data_attr(true) + '-init') || self.settings
                } else var target = S('[' + self.attr_name() + '="' + S(this).attr('id') + '"]'),
                    settings = target.data(self.attr_name(true) + '-init') || self.settings;
                self.timeout = setTimeout(function() {
                    if ($this.data(self.data_attr())) {
                        if (settings.is_hover) self.close.call(self, S('#' + $this.data(self.data_attr())))
                    } else if (settings.is_hover) self.close.call(self, $this)
                }.bind(this), settings.hover_timeout)
            }).on('click.fndtn.dropdown', function(e) {
                var parent = S(e.target).closest('[' + self.attr_name() + '-content]'),
                    links = parent.find('a');
                if (links.length > 0 && parent.attr('aria-autoclose') !== 'false') self.close.call(self, S('[' + self.attr_name() + '-content]'));
                if (e.target !== document && !$.contains(document.documentElement, e.target)) return;
                if (S(e.target).closest('[' + self.attr_name() + ']').length > 0) return;
                if (!(S(e.target).data('revealId')) && (parent.length > 0 && (S(e.target).is('[' + self.attr_name() + '-content]') || $.contains(parent.first()[0], e.target)))) {
                    e.stopPropagation();
                    return
                };
                self.close.call(self, S('[' + self.attr_name() + '-content]'))
            }).on('opened.fndtn.dropdown', '[' + self.attr_name() + '-content]', function() {
                self.settings.opened.call(this)
            }).on('closed.fndtn.dropdown', '[' + self.attr_name() + '-content]', function() {
                self.settings.closed.call(this)
            });
            S(window).off('.dropdown').on('resize.fndtn.dropdown', self.throttle(function() {
                self.resize.call(self)
            }, 50));
            this.resize()
        },
        close: function(dropdown) {
            var self = this;
            dropdown.each(function(idx) {
                var original_target = $('[' + self.attr_name() + '=' + dropdown[idx].id + ']') || $('aria-controls=' + dropdown[idx].id + ']');
                original_target.attr('aria-expanded', 'false');
                if (self.S(this).hasClass(self.settings.active_class)) {
                    self.S(this).css(Foundation.rtl ? 'right' : 'left', '-99999px').attr('aria-hidden', 'true').removeClass(self.settings.active_class).prev('[' + self.attr_name() + ']').removeClass(self.settings.active_class).removeData('target');
                    self.S(this).trigger('closed.fndtn.dropdown', [dropdown])
                }
            });
            dropdown.removeClass('f-open-' + this.attr_name(true))
        },
        closeall: function() {
            var self = this;
            $.each(self.S('.f-open-' + this.attr_name(true)), function() {
                self.close.call(self, self.S(this))
            })
        },
        open: function(dropdown, target) {
            this.css(dropdown.addClass(this.settings.active_class), target);
            dropdown.prev('[' + this.attr_name() + ']').addClass(this.settings.active_class);
            dropdown.data('target', target.get(0)).trigger('opened.fndtn.dropdown', [dropdown, target]);
            dropdown.attr('aria-hidden', 'false');
            target.attr('aria-expanded', 'true');
            dropdown.focus();
            dropdown.addClass('f-open-' + this.attr_name(true))
        },
        data_attr: function() {
            if (this.namespace.length > 0) return this.namespace + '-' + this.name;
            return this.name
        },
        toggle: function(target) {
            if (target.hasClass(this.settings.disabled_class)) return;
            var dropdown = this.S('#' + target.data(this.data_attr()));
            if (dropdown.length === 0) return;
            this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(dropdown));
            if (dropdown.hasClass(this.settings.active_class)) {
                this.close.call(this, dropdown);
                if (dropdown.data('target') !== target.get(0)) this.open.call(this, dropdown, target)
            } else this.open.call(this, dropdown, target)
        },
        resize: function() {
            var dropdown = this.S('[' + this.attr_name() + '-content].open'),
                target = $(dropdown.data("target"));
            if (dropdown.length && target.length) this.css(dropdown, target)
        },
        css: function(dropdown, target) {
            var left_offset = Math.max((target.width() - dropdown.width()) / 2, 8),
                settings = target.data(this.attr_name(true) + '-init') || this.settings,
                parentOverflow = dropdown.parent().css('overflow-y') || dropdown.parent().css('overflow');
            this.clear_idx();
            if (this.small()) {
                var p = this.dirs.bottom.call(dropdown, target, settings);
                dropdown.attr('style', '').removeClass('drop-left drop-right drop-top').css({
                    position: 'absolute',
                    width: '95%',
                    'max-width': 'none',
                    top: p.top
                });
                dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset)
            } else if (parentOverflow !== 'visible') {
                var offset = target[0].offsetTop + target[0].offsetHeight;
                dropdown.attr('style', '').css({
                    position: 'absolute',
                    top: offset
                });
                dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset)
            } else this.style(dropdown, target, settings);
            return dropdown
        },
        style: function(dropdown, target, settings) {
            var css = $.extend({
                position: 'absolute'
            }, this.dirs[settings.align].call(dropdown, target, settings));
            dropdown.attr('style', '').css(css)
        },
        dirs: {
            _base: function(t, s) {
                var o_p = this.offsetParent(),
                    o = o_p.offset(),
                    p = t.offset();
                p.top -= o.top;
                p.left -= o.left;
                p.missRight = false;
                p.missTop = false;
                p.missLeft = false;
                p.leftRightFlag = false;
                var actualBodyWidth, windowWidth = window.innerWidth;
                if (document.getElementsByClassName('row')[0]) {
                    actualBodyWidth = document.getElementsByClassName('row')[0].clientWidth
                } else actualBodyWidth = windowWidth;
                var actualMarginWidth = (windowWidth - actualBodyWidth) / 2,
                    actualBoundary = actualBodyWidth;
                if (!this.hasClass('mega') && !s.ignore_repositioning) {
                    var outerWidth = this.outerWidth(),
                        o_left = t.offset().left;
                    if (t.offset().top <= this.outerHeight()) {
                        p.missTop = true;
                        actualBoundary = windowWidth - actualMarginWidth;
                        p.leftRightFlag = true
                    };
                    if (o_left + outerWidth > o_left + actualMarginWidth && o_left - actualMarginWidth > outerWidth) {
                        p.missRight = true;
                        p.missLeft = false
                    };
                    if (o_left - outerWidth <= 0) {
                        p.missLeft = true;
                        p.missRight = false
                    }
                };
                return p
            },
            top: function(t, s) {
                var self = Foundation.libs.dropdown,
                    p = self.dirs._base.call(this, t, s);
                this.addClass('drop-top');
                if (p.missTop == true) {
                    p.top = p.top + t.outerHeight() + this.outerHeight();
                    this.removeClass('drop-top')
                };
                if (p.missRight == true) p.left = p.left - this.outerWidth() + t.outerWidth();
                if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) self.adjust_pip(this, t, s, p);
                if (Foundation.rtl) return {
                    left: p.left - this.outerWidth() + t.outerWidth(),
                    top: p.top - this.outerHeight()
                };
                return {
                    left: p.left,
                    top: p.top - this.outerHeight()
                }
            },
            bottom: function(t, s) {
                var self = Foundation.libs.dropdown,
                    p = self.dirs._base.call(this, t, s);
                if (p.missRight == true) p.left = p.left - this.outerWidth() + t.outerWidth();
                if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) self.adjust_pip(this, t, s, p);
                if (self.rtl) return {
                    left: p.left - this.outerWidth() + t.outerWidth(),
                    top: p.top + t.outerHeight()
                };
                return {
                    left: p.left,
                    top: p.top + t.outerHeight()
                }
            },
            left: function(t, s) {
                var p = Foundation.libs.dropdown.dirs._base.call(this, t, s);
                this.addClass('drop-left');
                if (p.missLeft == true) {
                    p.left = p.left + this.outerWidth();
                    p.top = p.top + t.outerHeight();
                    this.removeClass('drop-left')
                };
                return {
                    left: p.left - this.outerWidth(),
                    top: p.top
                }
            },
            right: function(t, s) {
                var p = Foundation.libs.dropdown.dirs._base.call(this, t, s);
                this.addClass('drop-right');
                if (p.missRight == true) {
                    p.left = p.left - this.outerWidth();
                    p.top = p.top + t.outerHeight();
                    this.removeClass('drop-right')
                } else p.triggeredRight = true;
                var self = Foundation.libs.dropdown;
                if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) self.adjust_pip(this, t, s, p);
                return {
                    left: p.left + t.outerWidth(),
                    top: p.top
                }
            }
        },
        adjust_pip: function(dropdown, target, settings, position) {
            var sheet = Foundation.stylesheet,
                pip_offset_base = 8;
            if (dropdown.hasClass(settings.mega_class)) {
                pip_offset_base = position.left + (target.outerWidth() / 2) - 8
            } else if (this.small()) pip_offset_base += position.left - 8;
            this.rule_idx = sheet.cssRules.length;
            var sel_before = '.f-dropdown.open:before',
                sel_after = '.f-dropdown.open:after',
                css_before = 'left: ' + pip_offset_base + 'px;',
                css_after = 'left: ' + (pip_offset_base - 1) + 'px;';
            if (position.missRight == true) {
                pip_offset_base = dropdown.outerWidth() - 23;
                sel_before = '.f-dropdown.open:before', sel_after = '.f-dropdown.open:after', css_before = 'left: ' + pip_offset_base + 'px;', css_after = 'left: ' + (pip_offset_base - 1) + 'px;'
            };
            if (position.triggeredRight == true) sel_before = '.f-dropdown.open:before', sel_after = '.f-dropdown.open:after', css_before = 'left:-12px;', css_after = 'left:-14px;';
            if (sheet.insertRule) {
                sheet.insertRule([sel_before, '{', css_before, '}'].join(' '), this.rule_idx);
                sheet.insertRule([sel_after, '{', css_after, '}'].join(' '), this.rule_idx + 1)
            } else {
                sheet.addRule(sel_before, css_before, this.rule_idx);
                sheet.addRule(sel_after, css_after, this.rule_idx + 1)
            }
        },
        clear_idx: function() {
            var sheet = Foundation.stylesheet;
            if (typeof this.rule_idx !== 'undefined') {
                sheet.deleteRule(this.rule_idx);
                sheet.deleteRule(this.rule_idx);
                delete this.rule_idx
            }
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches
        },
        off: function() {
            this.S(this.scope).off('.fndtn.dropdown');
            this.S('html, body').off('.fndtn.dropdown');
            this.S(window).off('.fndtn.dropdown');
            this.S('[data-dropdown-content]').off('.fndtn.dropdown')
        },
        reflow: function() {}
    }
}(jQuery, window, window.document));;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.dropdown.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.equalizer.js. */
(function($, window, document, undefined) {
    'use strict';
    Foundation.libs.equalizer = {
        name: 'equalizer',
        version: '5.5.3',
        settings: {
            use_tallest: true,
            before_height_change: $.noop,
            after_height_change: $.noop,
            equalize_on_stack: false,
            act_on_hidden_el: false
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, 'image_loaded');
            this.bindings(method, options);
            this.reflow()
        },
        events: function() {
            this.S(window).off('.equalizer').on('resize.fndtn.equalizer', function(e) {
                this.reflow()
            }.bind(this))
        },
        equalize: function(equalizer) {
            var isStacked = false,
                group = equalizer.data('equalizer'),
                settings = equalizer.data(this.attr_name(true) + '-init') || this.settings,
                vals, firstTopOffset;
            if (settings.act_on_hidden_el) {
                vals = group ? equalizer.find('[' + this.attr_name() + '-watch="' + group + '"]') : equalizer.find('[' + this.attr_name() + '-watch]')
            } else vals = group ? equalizer.find('[' + this.attr_name() + '-watch="' + group + '"]:visible') : equalizer.find('[' + this.attr_name() + '-watch]:visible');
            if (vals.length === 0) return;
            settings.before_height_change();
            equalizer.trigger('before-height-change.fndth.equalizer');
            vals.height('inherit');
            if (settings.equalize_on_stack === false) {
                firstTopOffset = vals.first().offset().top;
                vals.each(function() {
                    if ($(this).offset().top !== firstTopOffset) {
                        isStacked = true;
                        return false
                    }
                });
                if (isStacked) return
            };
            var heights = vals.map(function() {
                return $(this).outerHeight(false)
            }).get();
            if (settings.use_tallest) {
                var max = Math.max.apply(null, heights);
                vals.css('height', max)
            } else {
                var min = Math.min.apply(null, heights);
                vals.css('height', min)
            };
            settings.after_height_change();
            equalizer.trigger('after-height-change.fndtn.equalizer')
        },
        reflow: function() {
            var self = this;
            this.S('[' + this.attr_name() + ']', this.scope).each(function() {
                var $eq_target = $(this),
                    media_query = $eq_target.data('equalizer-mq'),
                    ignore_media_query = true;
                if (media_query) {
                    media_query = 'is_' + media_query.replace(/-/g, '_');
                    if (Foundation.utils.hasOwnProperty(media_query)) ignore_media_query = false
                };
                self.image_loaded(self.S('img', this), function() {
                    if (ignore_media_query || Foundation.utils[media_query]()) {
                        self.equalize($eq_target)
                    } else {
                        var vals = $eq_target.find('[' + self.attr_name() + '-watch]:visible');
                        vals.css('height', 'auto')
                    }
                })
            })
        }
    }
})(jQuery, window, window.document);;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.equalizer.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.joyride.js. */
(function($, window, document, undefined) {
    'use strict';
    var Modernizr = Modernizr || false;
    Foundation.libs.joyride = {
        name: 'joyride',
        version: '5.5.3',
        defaults: {
            expose: false,
            modal: true,
            keyboard: true,
            tip_location: 'bottom',
            nub_position: 'auto',
            scroll_speed: 1500,
            scroll_animation: 'linear',
            timer: 0,
            start_timer_on_click: true,
            start_offset: 0,
            next_button: true,
            prev_button: true,
            tip_animation: 'fade',
            pause_after: [],
            exposed: [],
            tip_animation_fade_speed: 300,
            cookie_monster: false,
            cookie_name: 'joyride',
            cookie_domain: false,
            cookie_expires: 365,
            tip_container: 'body',
            abort_on_close: true,
            tip_location_patterns: {
                top: ['bottom'],
                bottom: [],
                left: ['right', 'top', 'bottom'],
                right: ['left', 'top', 'bottom']
            },
            post_ride_callback: function() {},
            post_step_callback: function() {},
            pre_step_callback: function() {},
            pre_ride_callback: function() {},
            post_expose_callback: function() {},
            template: {
                link: '<a href="#close" class="joyride-close-tip">&times;</a>',
                timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
                tip: '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
                wrapper: '<div class="joyride-content-wrapper"></div>',
                button: '<a href="#" class="small button joyride-next-tip"></a>',
                prev_button: '<a href="#" class="small button joyride-prev-tip"></a>',
                modal: '<div class="joyride-modal-bg"></div>',
                expose: '<div class="joyride-expose-wrapper"></div>',
                expose_cover: '<div class="joyride-expose-cover"></div>'
            },
            expose_add_class: ''
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, 'throttle random_str');
            this.settings = this.settings || $.extend({}, this.defaults, (options || method));
            this.bindings(method, options)
        },
        go_next: function() {
            if (this.settings.$li.next().length < 1) {
                this.end()
            } else if (this.settings.timer > 0) {
                clearTimeout(this.settings.automate);
                this.hide();
                this.show();
                this.startTimer()
            } else {
                this.hide();
                this.show()
            }
        },
        go_prev: function() {
            if (this.settings.$li.prev().length < 1);
            else if (this.settings.timer > 0) {
                clearTimeout(this.settings.automate);
                this.hide();
                this.show(null, true);
                this.startTimer()
            } else {
                this.hide();
                this.show(null, true)
            }
        },
        events: function() {
            var self = this;
            $(this.scope).off('.joyride').on('click.fndtn.joyride', '.joyride-next-tip, .joyride-modal-bg', function(e) {
                e.preventDefault();
                this.go_next()
            }.bind(this)).on('click.fndtn.joyride', '.joyride-prev-tip', function(e) {
                e.preventDefault();
                this.go_prev()
            }.bind(this)).on('click.fndtn.joyride', '.joyride-close-tip', function(e) {
                e.preventDefault();
                this.end(this.settings.abort_on_close)
            }.bind(this)).on('keyup.fndtn.joyride', function(e) {
                if (!this.settings.keyboard || !this.settings.riding) return;
                switch (e.which) {
                    case 39:
                        e.preventDefault();
                        this.go_next();
                        break;
                    case 37:
                        e.preventDefault();
                        this.go_prev();
                        break;
                    case 27:
                        e.preventDefault();
                        this.end(this.settings.abort_on_close)
                }
            }.bind(this));
            $(window).off('.joyride').on('resize.fndtn.joyride', self.throttle(function() {
                if ($('[' + self.attr_name() + ']').length > 0 && self.settings.$next_tip && self.settings.riding) {
                    if (self.settings.exposed.length > 0) {
                        var $els = $(self.settings.exposed);
                        $els.each(function() {
                            var $this = $(this);
                            self.un_expose($this);
                            self.expose($this)
                        })
                    };
                    if (self.is_phone()) {
                        self.pos_phone()
                    } else self.pos_default(false)
                }
            }, 100))
        },
        start: function() {
            var self = this,
                $this = $('[' + this.attr_name() + ']', this.scope),
                integer_settings = ['timer', 'scrollSpeed', 'startOffset', 'tipAnimationFadeSpeed', 'cookieExpires'],
                int_settings_count = integer_settings.length;
            if (!$this.length > 0) return;
            if (!this.settings.init) this.events();
            this.settings = $this.data(this.attr_name(true) + '-init');
            this.settings.$content_el = $this;
            this.settings.$body = $(this.settings.tip_container);
            this.settings.body_offset = $(this.settings.tip_container).position();
            this.settings.$tip_content = this.settings.$content_el.find('> li');
            this.settings.paused = false;
            this.settings.attempts = 0;
            this.settings.riding = true;
            if (typeof $.cookie !== 'function') this.settings.cookie_monster = false;
            if (!this.settings.cookie_monster || this.settings.cookie_monster && !$.cookie(this.settings.cookie_name)) {
                this.settings.$tip_content.each(function(index) {
                    var $this = $(this);
                    this.settings = $.extend({}, self.defaults, self.data_options($this));
                    var i = int_settings_count;
                    while (i--) self.settings[integer_settings[i]] = parseInt(self.settings[integer_settings[i]], 10);
                    self.create({
                        $li: $this,
                        index: index
                    })
                });
                if (!this.settings.start_timer_on_click && this.settings.timer > 0) {
                    this.show('init');
                    this.startTimer()
                } else this.show('init')
            }
        },
        resume: function() {
            this.set_li();
            this.show()
        },
        tip_template: function(opts) {
            var $blank, content;
            opts.tip_class = opts.tip_class || '';
            $blank = $(this.settings.template.tip).addClass(opts.tip_class);
            content = $.trim($(opts.li).html()) + this.prev_button_text(opts.prev_button_text, opts.index) + this.button_text(opts.button_text) + this.settings.template.link + this.timer_instance(opts.index);
            $blank.append($(this.settings.template.wrapper));
            $blank.first().attr(this.add_namespace('data-index'), opts.index);
            $('.joyride-content-wrapper', $blank).append(content);
            return $blank[0]
        },
        timer_instance: function(index) {
            var txt;
            if ((index === 0 && this.settings.start_timer_on_click && this.settings.timer > 0) || this.settings.timer === 0) {
                txt = ''
            } else txt = $(this.settings.template.timer)[0].outerHTML;
            return txt
        },
        button_text: function(txt) {
            if (this.settings.tip_settings.next_button) {
                txt = $.trim(txt) || 'Next';
                txt = $(this.settings.template.button).append(txt)[0].outerHTML
            } else txt = '';
            return txt
        },
        prev_button_text: function(txt, idx) {
            if (this.settings.tip_settings.prev_button) {
                txt = $.trim(txt) || 'Previous';
                if (idx == 0) {
                    txt = $(this.settings.template.prev_button).append(txt).addClass('disabled')[0].outerHTML
                } else txt = $(this.settings.template.prev_button).append(txt)[0].outerHTML
            } else txt = '';
            return txt
        },
        create: function(opts) {
            this.settings.tip_settings = $.extend({}, this.settings, this.data_options(opts.$li));
            var buttonText = opts.$li.attr(this.add_namespace('data-button')) || opts.$li.attr(this.add_namespace('data-text')),
                prevButtonText = opts.$li.attr(this.add_namespace('data-button-prev')) || opts.$li.attr(this.add_namespace('data-prev-text')),
                tipClass = opts.$li.attr('class'),
                $tip_content = $(this.tip_template({
                    tip_class: tipClass,
                    index: opts.index,
                    button_text: buttonText,
                    prev_button_text: prevButtonText,
                    li: opts.$li
                }));
            $(this.settings.tip_container).append($tip_content)
        },
        show: function(init, is_prev) {
            var $timer = null;
            if (this.settings.$li === undefined || ($.inArray(this.settings.$li.index(), this.settings.pause_after) === -1)) {
                if (this.settings.paused) {
                    this.settings.paused = false
                } else this.set_li(init, is_prev);
                this.settings.attempts = 0;
                if (this.settings.$li.length && this.settings.$target.length > 0) {
                    if (init) {
                        this.settings.pre_ride_callback(this.settings.$li.index(), this.settings.$next_tip);
                        if (this.settings.modal) this.show_modal()
                    };
                    this.settings.pre_step_callback(this.settings.$li.index(), this.settings.$next_tip);
                    if (this.settings.modal && this.settings.expose) this.expose();
                    this.settings.tip_settings = $.extend({}, this.settings, this.data_options(this.settings.$li));
                    this.settings.timer = parseInt(this.settings.timer, 10);
                    this.settings.tip_settings.tip_location_pattern = this.settings.tip_location_patterns[this.settings.tip_settings.tip_location];
                    if (!/body/i.test(this.settings.$target.selector) && !this.settings.expose) {
                        var joyridemodalbg = $('.joyride-modal-bg');
                        if (/pop/i.test(this.settings.tipAnimation)) {
                            joyridemodalbg.hide()
                        } else joyridemodalbg.fadeOut(this.settings.tipAnimationFadeSpeed);
                        this.scroll_to()
                    };
                    if (this.is_phone()) {
                        this.pos_phone(true)
                    } else this.pos_default(true);
                    $timer = this.settings.$next_tip.find('.joyride-timer-indicator');
                    if (/pop/i.test(this.settings.tip_animation)) {
                        $timer.width(0);
                        if (this.settings.timer > 0) {
                            this.settings.$next_tip.show();
                            setTimeout(function() {
                                $timer.animate({
                                    width: $timer.parent().width()
                                }, this.settings.timer, 'linear')
                            }.bind(this), this.settings.tip_animation_fade_speed)
                        } else this.settings.$next_tip.show()
                    } else if (/fade/i.test(this.settings.tip_animation)) {
                        $timer.width(0);
                        if (this.settings.timer > 0) {
                            this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show();
                            setTimeout(function() {
                                $timer.animate({
                                    width: $timer.parent().width()
                                }, this.settings.timer, 'linear')
                            }.bind(this), this.settings.tip_animation_fade_speed)
                        } else this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)
                    };
                    this.settings.$current_tip = this.settings.$next_tip
                } else if (this.settings.$li && this.settings.$target.length < 1) {
                    this.show(init, is_prev)
                } else this.end()
            } else this.settings.paused = true
        },
        is_phone: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches
        },
        hide: function() {
            if (this.settings.modal && this.settings.expose) this.un_expose();
            if (!this.settings.modal) $('.joyride-modal-bg').hide();
            this.settings.$current_tip.css('visibility', 'hidden');
            setTimeout($.proxy(function() {
                this.hide();
                this.css('visibility', 'visible')
            }, this.settings.$current_tip), 0);
            this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip)
        },
        set_li: function(init, is_prev) {
            if (init) {
                this.settings.$li = this.settings.$tip_content.eq(this.settings.start_offset);
                this.set_next_tip();
                this.settings.$current_tip = this.settings.$next_tip
            } else {
                if (is_prev) {
                    this.settings.$li = this.settings.$li.prev()
                } else this.settings.$li = this.settings.$li.next();
                this.set_next_tip()
            };
            this.set_target()
        },
        set_next_tip: function() {
            this.settings.$next_tip = $('.joyride-tip-guide').eq(this.settings.$li.index());
            this.settings.$next_tip.data('closed', '')
        },
        set_target: function() {
            var cl = this.settings.$li.attr(this.add_namespace('data-class')),
                id = this.settings.$li.attr(this.add_namespace('data-id')),
                $sel = function() {
                    if (id) {
                        return $(document.getElementById(id))
                    } else if (cl) {
                        return $('.' + cl).first()
                    } else return $('body')
                };
            this.settings.$target = $sel()
        },
        scroll_to: function() {
            var window_half, tipOffset;
            window_half = $(window).height() / 2;
            tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight());
            if (tipOffset != 0) $('html, body').stop().animate({
                scrollTop: tipOffset
            }, this.settings.scroll_speed, 'swing')
        },
        paused: function() {
            return ($.inArray((this.settings.$li.index() + 1), this.settings.pause_after) === -1)
        },
        restart: function() {
            this.hide();
            this.settings.$li = undefined;
            this.show('init')
        },
        pos_default: function(init) {
            var $nub = this.settings.$next_tip.find('.joyride-nub'),
                nub_width = Math.ceil($nub.outerWidth() / 2),
                nub_height = Math.ceil($nub.outerHeight() / 2),
                toggle = init || false;
            if (toggle) {
                this.settings.$next_tip.css('visibility', 'hidden');
                this.settings.$next_tip.show()
            };
            if (!/body/i.test(this.settings.$target.selector)) {
                var topAdjustment = this.settings.tip_settings.tipAdjustmentY ? parseInt(this.settings.tip_settings.tipAdjustmentY) : 0,
                    leftAdjustment = this.settings.tip_settings.tipAdjustmentX ? parseInt(this.settings.tip_settings.tipAdjustmentX) : 0;
                if (this.bottom()) {
                    if (this.rtl) {
                        this.settings.$next_tip.css({
                            top: (this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment),
                            left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth() + leftAdjustment
                        })
                    } else this.settings.$next_tip.css({
                        top: (this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment),
                        left: this.settings.$target.offset().left + leftAdjustment
                    });
                    this.nub_position($nub, this.settings.tip_settings.nub_position, 'top')
                } else if (this.top()) {
                    if (this.rtl) {
                        this.settings.$next_tip.css({
                            top: (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment),
                            left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()
                        })
                    } else this.settings.$next_tip.css({
                        top: (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment),
                        left: this.settings.$target.offset().left + leftAdjustment
                    });
                    this.nub_position($nub, this.settings.tip_settings.nub_position, 'bottom')
                } else if (this.right()) {
                    this.settings.$next_tip.css({
                        top: this.settings.$target.offset().top + topAdjustment,
                        left: (this.settings.$target.outerWidth() + this.settings.$target.offset().left + nub_width + leftAdjustment)
                    });
                    this.nub_position($nub, this.settings.tip_settings.nub_position, 'left')
                } else if (this.left()) {
                    this.settings.$next_tip.css({
                        top: this.settings.$target.offset().top + topAdjustment,
                        left: (this.settings.$target.offset().left - this.settings.$next_tip.outerWidth() - nub_width + leftAdjustment)
                    });
                    this.nub_position($nub, this.settings.tip_settings.nub_position, 'right')
                };
                if (!this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tip_settings.tip_location_pattern.length) {
                    $nub.removeClass('bottom').removeClass('top').removeClass('right').removeClass('left');
                    this.settings.tip_settings.tip_location = this.settings.tip_settings.tip_location_pattern[this.settings.attempts];
                    this.settings.attempts++;
                    this.pos_default()
                }
            } else if (this.settings.$li.length) this.pos_modal($nub);
            if (toggle) {
                this.settings.$next_tip.hide();
                this.settings.$next_tip.css('visibility', 'visible')
            }
        },
        pos_phone: function(init) {
            var tip_height = this.settings.$next_tip.outerHeight(),
                tip_offset = this.settings.$next_tip.offset(),
                target_height = this.settings.$target.outerHeight(),
                $nub = $('.joyride-nub', this.settings.$next_tip),
                nub_height = Math.ceil($nub.outerHeight() / 2),
                toggle = init || false;
            $nub.removeClass('bottom').removeClass('top').removeClass('right').removeClass('left');
            if (toggle) {
                this.settings.$next_tip.css('visibility', 'hidden');
                this.settings.$next_tip.show()
            };
            if (!/body/i.test(this.settings.$target.selector)) {
                if (this.top()) {
                    this.settings.$next_tip.offset({
                        top: this.settings.$target.offset().top - tip_height - nub_height
                    });
                    $nub.addClass('bottom')
                } else {
                    this.settings.$next_tip.offset({
                        top: this.settings.$target.offset().top + target_height + nub_height
                    });
                    $nub.addClass('top')
                }
            } else if (this.settings.$li.length) this.pos_modal($nub);
            if (toggle) {
                this.settings.$next_tip.hide();
                this.settings.$next_tip.css('visibility', 'visible')
            }
        },
        pos_modal: function($nub) {
            this.center();
            $nub.hide();
            this.show_modal()
        },
        show_modal: function() {
            if (!this.settings.$next_tip.data('closed')) {
                var joyridemodalbg = $('.joyride-modal-bg');
                if (joyridemodalbg.length < 1) {
                    var joyridemodalbg = $(this.settings.template.modal);
                    joyridemodalbg.appendTo('body')
                };
                if (/pop/i.test(this.settings.tip_animation)) {
                    joyridemodalbg.show()
                } else joyridemodalbg.fadeIn(this.settings.tip_animation_fade_speed)
            }
        },
        expose: function() {
            var expose, exposeCover, el, origCSS, origClasses, randId = 'expose-' + this.random_str(6);
            if (arguments.length > 0 && arguments[0] instanceof $) {
                el = arguments[0]
            } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
                el = this.settings.$target
            } else return false;
            if (el.length < 1) {
                if (window.console) console.error('element not valid', el);
                return false
            };
            expose = $(this.settings.template.expose);
            this.settings.$body.append(expose);
            expose.css({
                top: el.offset().top,
                left: el.offset().left,
                width: el.outerWidth(true),
                height: el.outerHeight(true)
            });
            exposeCover = $(this.settings.template.expose_cover);
            origCSS = {
                zIndex: el.css('z-index'),
                position: el.css('position')
            };
            origClasses = el.attr('class') == null ? '' : el.attr('class');
            el.css('z-index', parseInt(expose.css('z-index')) + 1);
            if (origCSS.position == 'static') el.css('position', 'relative');
            el.data('expose-css', origCSS);
            el.data('orig-class', origClasses);
            el.attr('class', origClasses + ' ' + this.settings.expose_add_class);
            exposeCover.css({
                top: el.offset().top,
                left: el.offset().left,
                width: el.outerWidth(true),
                height: el.outerHeight(true)
            });
            if (this.settings.modal) this.show_modal();
            this.settings.$body.append(exposeCover);
            expose.addClass(randId);
            exposeCover.addClass(randId);
            el.data('expose', randId);
            this.settings.post_expose_callback(this.settings.$li.index(), this.settings.$next_tip, el);
            this.add_exposed(el)
        },
        un_expose: function() {
            var exposeId, el, expose, origCSS, origClasses, clearAll = false;
            if (arguments.length > 0 && arguments[0] instanceof $) {
                el = arguments[0]
            } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
                el = this.settings.$target
            } else return false;
            if (el.length < 1) {
                if (window.console) console.error('element not valid', el);
                return false
            };
            exposeId = el.data('expose');
            expose = $('.' + exposeId);
            if (arguments.length > 1) clearAll = arguments[1];
            if (clearAll === true) {
                $('.joyride-expose-wrapper,.joyride-expose-cover').remove()
            } else expose.remove();
            origCSS = el.data('expose-css');
            if (origCSS.zIndex == 'auto') {
                el.css('z-index', '')
            } else el.css('z-index', origCSS.zIndex);
            if (origCSS.position != el.css('position'))
                if (origCSS.position == 'static') {
                    el.css('position', '')
                } else el.css('position', origCSS.position);
            origClasses = el.data('orig-class');
            el.attr('class', origClasses);
            el.removeData('orig-classes');
            el.removeData('expose');
            el.removeData('expose-z-index');
            this.remove_exposed(el)
        },
        add_exposed: function(el) {
            this.settings.exposed = this.settings.exposed || [];
            if (el instanceof $ || typeof el === 'object') {
                this.settings.exposed.push(el[0])
            } else if (typeof el == 'string') this.settings.exposed.push(el)
        },
        remove_exposed: function(el) {
            var search, i;
            if (el instanceof $) {
                search = el[0]
            } else if (typeof el == 'string') search = el;
            this.settings.exposed = this.settings.exposed || [];
            i = this.settings.exposed.length;
            while (i--)
                if (this.settings.exposed[i] == search) {
                    this.settings.exposed.splice(i, 1);
                    return
                }
        },
        center: function() {
            var $w = $(window);
            this.settings.$next_tip.css({
                top: ((($w.height() - this.settings.$next_tip.outerHeight()) / 2) + $w.scrollTop()),
                left: ((($w.width() - this.settings.$next_tip.outerWidth()) / 2) + $w.scrollLeft())
            });
            return true
        },
        bottom: function() {
            return /bottom/i.test(this.settings.tip_settings.tip_location)
        },
        top: function() {
            return /top/i.test(this.settings.tip_settings.tip_location)
        },
        right: function() {
            return /right/i.test(this.settings.tip_settings.tip_location)
        },
        left: function() {
            return /left/i.test(this.settings.tip_settings.tip_location)
        },
        corners: function(el) {
            if (el.length === 0) return [false, false, false, false];
            var w = $(window),
                window_half = w.height() / 2,
                tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight()),
                right = w.width() + w.scrollLeft(),
                offsetBottom = w.height() + tipOffset,
                bottom = w.height() + w.scrollTop(),
                top = w.scrollTop();
            if (tipOffset < top)
                if (tipOffset < 0) {
                    top = 0
                } else top = tipOffset;
            if (offsetBottom > bottom) bottom = offsetBottom;
            return [el.offset().top < top, right < el.offset().left + el.outerWidth(), bottom < el.offset().top + el.outerHeight(), w.scrollLeft() > el.offset().left]
        },
        visible: function(hidden_corners) {
            var i = hidden_corners.length;
            while (i--)
                if (hidden_corners[i]) return false;
            return true
        },
        nub_position: function(nub, pos, def) {
            if (pos === 'auto') {
                nub.addClass(def)
            } else nub.addClass(pos)
        },
        startTimer: function() {
            if (this.settings.$li.length) {
                this.settings.automate = setTimeout(function() {
                    this.hide();
                    this.show();
                    this.startTimer()
                }.bind(this), this.settings.timer)
            } else clearTimeout(this.settings.automate)
        },
        end: function(abort) {
            if (this.settings.cookie_monster) $.cookie(this.settings.cookie_name, 'ridden', {
                expires: this.settings.cookie_expires,
                domain: this.settings.cookie_domain
            });
            if (this.settings.timer > 0) clearTimeout(this.settings.automate);
            if (this.settings.modal && this.settings.expose) this.un_expose();
            $(this.scope).off('keyup.joyride');
            this.settings.$next_tip.data('closed', true);
            this.settings.riding = false;
            $('.joyride-modal-bg').hide();
            this.settings.$current_tip.hide();
            if (typeof abort === 'undefined' || abort === false) {
                this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
                this.settings.post_ride_callback(this.settings.$li.index(), this.settings.$current_tip)
            };
            $('.joyride-tip-guide').remove()
        },
        off: function() {
            $(this.scope).off('.joyride');
            $(window).off('.joyride');
            $('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg').off('.joyride');
            $('.joyride-tip-guide, .joyride-modal-bg').remove();
            clearTimeout(this.settings.automate)
        },
        reflow: function() {}
    }
}(jQuery, window, window.document));;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.joyride.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.offcanvas.js. */
(function($, window, document, undefined) {
    'use strict';
    Foundation.libs.offcanvas = {
        name: 'offcanvas',
        version: '5.5.3',
        settings: {
            open_method: 'move',
            close_on_click: false
        },
        init: function(scope, method, options) {
            this.bindings(method, options)
        },
        events: function() {
            var self = this,
                S = self.S,
                move_class = '',
                right_postfix = '',
                left_postfix = '',
                top_postfix = '',
                bottom_postfix = '';
            if (this.settings.open_method === 'move') {
                move_class = 'move-';
                right_postfix = 'right';
                left_postfix = 'left';
                top_postfix = 'top';
                bottom_postfix = 'bottom'
            } else if (this.settings.open_method === 'overlap_single') {
                move_class = 'offcanvas-overlap-';
                right_postfix = 'right';
                left_postfix = 'left';
                top_postfix = 'top';
                bottom_postfix = 'bottom'
            } else if (this.settings.open_method === 'overlap') move_class = 'offcanvas-overlap';
            S(this.scope).off('.offcanvas').on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function(e) {
                self.click_toggle_class(e, move_class + right_postfix);
                if (self.settings.open_method !== 'overlap') S('.left-submenu').removeClass(move_class + right_postfix);
                $('.left-off-canvas-toggle').attr('aria-expanded', 'true')
            }).on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function(e) {
                var settings = self.get_settings(e),
                    parent = S(this).parent();
                if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
                    self.hide.call(self, move_class + right_postfix, self.get_wrapper(e));
                    parent.parent().removeClass(move_class + right_postfix)
                } else if (S(this).parent().hasClass('has-submenu')) {
                    e.preventDefault();
                    S(this).siblings('.left-submenu').toggleClass(move_class + right_postfix)
                } else if (parent.hasClass('back')) {
                    e.preventDefault();
                    parent.parent().removeClass(move_class + right_postfix)
                };
                $('.left-off-canvas-toggle').attr('aria-expanded', 'true')
            }).on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function(e) {
                self.click_toggle_class(e, move_class + left_postfix);
                if (self.settings.open_method !== 'overlap') S('.right-submenu').removeClass(move_class + left_postfix);
                $('.right-off-canvas-toggle').attr('aria-expanded', 'true')
            }).on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function(e) {
                var settings = self.get_settings(e),
                    parent = S(this).parent();
                if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
                    self.hide.call(self, move_class + left_postfix, self.get_wrapper(e));
                    parent.parent().removeClass(move_class + left_postfix)
                } else if (S(this).parent().hasClass('has-submenu')) {
                    e.preventDefault();
                    S(this).siblings('.right-submenu').toggleClass(move_class + left_postfix)
                } else if (parent.hasClass('back')) {
                    e.preventDefault();
                    parent.parent().removeClass(move_class + left_postfix)
                };
                $('.right-off-canvas-toggle').attr('aria-expanded', 'true')
            }).on('click.fndtn.offcanvas', '.top-off-canvas-toggle', function(e) {
                self.click_toggle_class(e, move_class + bottom_postfix);
                if (self.settings.open_method !== 'overlap') S('.top-submenu').removeClass(move_class + bottom_postfix);
                $('.top-off-canvas-toggle').attr('aria-expanded', 'true')
            }).on('click.fndtn.offcanvas', '.top-off-canvas-menu a', function(e) {
                var settings = self.get_settings(e),
                    parent = S(this).parent();
                if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
                    self.hide.call(self, move_class + bottom_postfix, self.get_wrapper(e));
                    parent.parent().removeClass(move_class + bottom_postfix)
                } else if (S(this).parent().hasClass('has-submenu')) {
                    e.preventDefault();
                    S(this).siblings('.top-submenu').toggleClass(move_class + bottom_postfix)
                } else if (parent.hasClass('back')) {
                    e.preventDefault();
                    parent.parent().removeClass(move_class + bottom_postfix)
                };
                $('.top-off-canvas-toggle').attr('aria-expanded', 'true')
            }).on('click.fndtn.offcanvas', '.bottom-off-canvas-toggle', function(e) {
                self.click_toggle_class(e, move_class + top_postfix);
                if (self.settings.open_method !== 'overlap') S('.bottom-submenu').removeClass(move_class + top_postfix);
                $('.bottom-off-canvas-toggle').attr('aria-expanded', 'true')
            }).on('click.fndtn.offcanvas', '.bottom-off-canvas-menu a', function(e) {
                var settings = self.get_settings(e),
                    parent = S(this).parent();
                if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
                    self.hide.call(self, move_class + top_postfix, self.get_wrapper(e));
                    parent.parent().removeClass(move_class + top_postfix)
                } else if (S(this).parent().hasClass('has-submenu')) {
                    e.preventDefault();
                    S(this).siblings('.bottom-submenu').toggleClass(move_class + top_postfix)
                } else if (parent.hasClass('back')) {
                    e.preventDefault();
                    parent.parent().removeClass(move_class + top_postfix)
                };
                $('.bottom-off-canvas-toggle').attr('aria-expanded', 'true')
            }).on('click.fndtn.offcanvas', '.exit-off-canvas', function(e) {
                self.click_remove_class(e, move_class + left_postfix);
                S('.right-submenu').removeClass(move_class + left_postfix);
                if (right_postfix) {
                    self.click_remove_class(e, move_class + right_postfix);
                    S('.left-submenu').removeClass(move_class + left_postfix)
                };
                $('.right-off-canvas-toggle').attr('aria-expanded', 'true')
            }).on('click.fndtn.offcanvas', '.exit-off-canvas', function(e) {
                self.click_remove_class(e, move_class + left_postfix);
                $('.left-off-canvas-toggle').attr('aria-expanded', 'false');
                if (right_postfix) {
                    self.click_remove_class(e, move_class + right_postfix);
                    $('.right-off-canvas-toggle').attr('aria-expanded', 'false')
                }
            }).on('click.fndtn.offcanvas', '.exit-off-canvas', function(e) {
                self.click_remove_class(e, move_class + top_postfix);
                S('.bottom-submenu').removeClass(move_class + top_postfix);
                if (bottom_postfix) {
                    self.click_remove_class(e, move_class + bottom_postfix);
                    S('.top-submenu').removeClass(move_class + top_postfix)
                };
                $('.bottom-off-canvas-toggle').attr('aria-expanded', 'true')
            }).on('click.fndtn.offcanvas', '.exit-off-canvas', function(e) {
                self.click_remove_class(e, move_class + top_postfix);
                $('.top-off-canvas-toggle').attr('aria-expanded', 'false');
                if (bottom_postfix) {
                    self.click_remove_class(e, move_class + bottom_postfix);
                    $('.bottom-off-canvas-toggle').attr('aria-expanded', 'false')
                }
            })
        },
        toggle: function(class_name, $off_canvas) {
            $off_canvas = $off_canvas || this.get_wrapper();
            if ($off_canvas.is('.' + class_name)) {
                this.hide(class_name, $off_canvas)
            } else this.show(class_name, $off_canvas)
        },
        show: function(class_name, $off_canvas) {
            $off_canvas = $off_canvas || this.get_wrapper();
            $off_canvas.trigger('open.fndtn.offcanvas');
            $off_canvas.addClass(class_name)
        },
        hide: function(class_name, $off_canvas) {
            $off_canvas = $off_canvas || this.get_wrapper();
            $off_canvas.trigger('close.fndtn.offcanvas');
            $off_canvas.removeClass(class_name)
        },
        click_toggle_class: function(e, class_name) {
            e.preventDefault();
            var $off_canvas = this.get_wrapper(e);
            this.toggle(class_name, $off_canvas)
        },
        click_remove_class: function(e, class_name) {
            e.preventDefault();
            var $off_canvas = this.get_wrapper(e);
            this.hide(class_name, $off_canvas)
        },
        get_settings: function(e) {
            var offcanvas = this.S(e.target).closest('[' + this.attr_name() + ']');
            return offcanvas.data(this.attr_name(true) + '-init') || this.settings
        },
        get_wrapper: function(e) {
            var $off_canvas = this.S(e ? e.target : this.scope).closest('.off-canvas-wrap');
            if ($off_canvas.length === 0) $off_canvas = this.S('.off-canvas-wrap');
            return $off_canvas
        },
        reflow: function() {}
    }
}(jQuery, window, window.document));;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.offcanvas.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.reveal.js. */
(function($, window, document, undefined) {
    'use strict';
    var openModals = [];
    Foundation.libs.reveal = {
        name: 'reveal',
        version: '5.5.3',
        locked: false,
        settings: {
            animation: 'fadeAndPop',
            animation_speed: 250,
            close_on_background_click: true,
            close_on_esc: true,
            dismiss_modal_class: 'close-reveal-modal',
            multiple_opened: false,
            bg_class: 'reveal-modal-bg',
            root_element: 'body',
            open: function() {},
            opened: function() {},
            close: function() {},
            closed: function() {},
            on_ajax_error: $.noop,
            bg: $('.reveal-modal-bg'),
            css: {
                open: {
                    opacity: 0,
                    visibility: 'visible',
                    display: 'block'
                },
                close: {
                    opacity: 1,
                    visibility: 'hidden',
                    display: 'none'
                }
            }
        },
        init: function(scope, method, options) {
            $.extend(true, this.settings, method, options);
            this.bindings(method, options)
        },
        events: function(scope) {
            var self = this,
                S = self.S;
            S(this.scope).off('.reveal').on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']:not([disabled])', function(e) {
                e.preventDefault();
                if (!self.locked) {
                    var element = S(this),
                        ajax = element.data(self.data_attr('reveal-ajax')),
                        replaceContentSel = element.data(self.data_attr('reveal-replace-content'));
                    self.locked = true;
                    if (typeof ajax === 'undefined') {
                        self.open.call(self, element)
                    } else {
                        var url = ajax === true ? element.attr('href') : ajax;
                        self.open.call(self, element, {
                            url: url
                        }, {
                            replaceContentSel: replaceContentSel
                        })
                    }
                }
            });
            S(document).on('click.fndtn.reveal', this.close_targets(), function(e) {
                e.preventDefault();
                if (!self.locked) {
                    var settings = S('[' + self.attr_name() + '].open').data(self.attr_name(true) + '-init') || self.settings,
                        bg_clicked = S(e.target)[0] === S('.' + settings.bg_class)[0];
                    if (bg_clicked)
                        if (settings.close_on_background_click) {
                            e.stopPropagation()
                        } else return;
                    self.locked = true;
                    self.close.call(self, bg_clicked ? S('[' + self.attr_name() + '].open:not(.toback)') : S(this).closest('[' + self.attr_name() + ']'))
                }
            });
            if (S('[' + self.attr_name() + ']', this.scope).length > 0) {
                S(this.scope).on('open.fndtn.reveal', this.settings.open).on('opened.fndtn.reveal', this.settings.opened).on('opened.fndtn.reveal', this.open_video).on('close.fndtn.reveal', this.settings.close).on('closed.fndtn.reveal', this.settings.closed).on('closed.fndtn.reveal', this.close_video)
            } else S(this.scope).on('open.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.open).on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.opened).on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.open_video).on('close.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.close).on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.closed).on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.close_video);
            return true
        },
        key_up_on: function(scope) {
            var self = this;
            self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function(event) {
                var open_modal = self.S('[' + self.attr_name() + '].open'),
                    settings = open_modal.data(self.attr_name(true) + '-init') || self.settings;
                if (settings && event.which === 27 && settings.close_on_esc && !self.locked) self.close.call(self, open_modal)
            });
            return true
        },
        key_up_off: function(scope) {
            this.S('body').off('keyup.fndtn.reveal');
            return true
        },
        open: function(target, ajax_settings) {
            var self = this,
                modal;
            if (target) {
                if (typeof target.selector !== 'undefined') {
                    modal = self.S('#' + target.data(self.data_attr('reveal-id'))).first()
                } else {
                    modal = self.S(this.scope);
                    ajax_settings = target
                }
            } else modal = self.S(this.scope);
            var settings = modal.data(self.attr_name(true) + '-init');
            settings = settings || this.settings;
            if (modal.hasClass('open') && target !== undefined && target.attr('data-reveal-id') == modal.attr('id')) return self.close(modal);
            if (!modal.hasClass('open')) {
                var open_modal = self.S('[' + self.attr_name() + '].open');
                if (typeof modal.data('css-top') === 'undefined') modal.data('css-top', parseInt(modal.css('top'), 10)).data('offset', this.cache_offset(modal));
                modal.attr('tabindex', '0').attr('aria-hidden', 'false');
                this.key_up_on(modal);
                modal.on('open.fndtn.reveal', function(e) {
                    if (e.namespace !== 'fndtn.reveal') return
                });
                modal.on('open.fndtn.reveal').trigger('open.fndtn.reveal');
                if (open_modal.length < 1) this.toggle_bg(modal, true);
                if (typeof ajax_settings === 'string') ajax_settings = {
                    url: ajax_settings
                };
                var openModal = function() {
                    if (open_modal.length > 0)
                        if (settings.multiple_opened) {
                            self.to_back(open_modal)
                        } else self.hide(open_modal, settings.css.close);
                    if (settings.multiple_opened) openModals.push(modal);
                    self.show(modal, settings.css.open)
                };
                if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
                    openModal()
                } else {
                    var old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;
                    $.extend(ajax_settings, {
                        success: function(data, textStatus, jqXHR) {
                            if ($.isFunction(old_success)) {
                                var result = old_success(data, textStatus, jqXHR);
                                if (typeof result == 'string') data = result
                            };
                            if (typeof options !== 'undefined' && typeof options.replaceContentSel !== 'undefined') {
                                modal.find(options.replaceContentSel).html(data)
                            } else modal.html(data);
                            self.S(modal).foundation('section', 'reflow');
                            self.S(modal).children().foundation();
                            openModal()
                        }
                    });
                    if (settings.on_ajax_error !== $.noop) $.extend(ajax_settings, {
                        error: settings.on_ajax_error
                    });
                    $.ajax(ajax_settings)
                }
            };
            self.S(window).trigger('resize')
        },
        close: function(modal) {
            var modal = modal && modal.length ? modal : this.S(this.scope),
                open_modals = this.S('[' + this.attr_name() + '].open'),
                settings = modal.data(this.attr_name(true) + '-init') || this.settings,
                self = this;
            if (open_modals.length > 0) {
                modal.removeAttr('tabindex', '0').attr('aria-hidden', 'true');
                this.locked = true;
                this.key_up_off(modal);
                modal.trigger('close.fndtn.reveal');
                if ((settings.multiple_opened && open_modals.length === 1) || !settings.multiple_opened || modal.length > 1) {
                    self.toggle_bg(modal, false);
                    self.to_front(modal)
                };
                if (settings.multiple_opened) {
                    var isCurrent = modal.is(':not(.toback)');
                    self.hide(modal, settings.css.close, settings);
                    if (isCurrent) {
                        openModals.pop()
                    } else openModals = $.grep(openModals, function(elt) {
                        var isThis = elt[0] === modal[0];
                        if (isThis) self.to_front(modal);
                        return !isThis
                    });
                    if (openModals.length > 0) self.to_front(openModals[openModals.length - 1])
                } else self.hide(open_modals, settings.css.close, settings)
            }
        },
        close_targets: function() {
            var base = '.' + this.settings.dismiss_modal_class;
            if (this.settings.close_on_background_click) return base + ', .' + this.settings.bg_class;
            return base
        },
        toggle_bg: function(modal, state) {
            if (this.S('.' + this.settings.bg_class).length === 0) this.settings.bg = $('<div />', {
                'class': this.settings.bg_class
            }).appendTo('body').hide();
            var visible = this.settings.bg.filter(':visible').length > 0;
            if (state != visible)
                if (state == undefined ? visible : !state) {
                    this.hide(this.settings.bg)
                } else this.show(this.settings.bg)
        },
        show: function(el, css) {
            if (css) {
                var settings = el.data(this.attr_name(true) + '-init') || this.settings,
                    root_element = settings.root_element,
                    context = this;
                if (el.parent(root_element).length === 0) {
                    var placeholder = el.wrap('<div style="display: none;" />').parent();
                    el.on('closed.fndtn.reveal.wrapped', function() {
                        el.detach().appendTo(placeholder);
                        el.unwrap().unbind('closed.fndtn.reveal.wrapped')
                    });
                    el.detach().appendTo(root_element)
                };
                var animData = getAnimationData(settings.animation);
                if (!animData.animate) this.locked = false;
                if (animData.pop) {
                    css.top = $(window).scrollTop() - el.data('offset') + 'px';
                    var end_css = {
                        top: $(window).scrollTop() + el.data('css-top') + 'px',
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return el.css(css).animate(end_css, settings.animation_speed, 'linear', function() {
                            context.locked = false;
                            el.trigger('opened.fndtn.reveal')
                        }).addClass('open')
                    }, settings.animation_speed / 2)
                };
                css.top = $(window).scrollTop() + el.data('css-top') + 'px';
                if (animData.fade) {
                    var end_css = {
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return el.css(css).animate(end_css, settings.animation_speed, 'linear', function() {
                            context.locked = false;
                            el.trigger('opened.fndtn.reveal')
                        }).addClass('open')
                    }, settings.animation_speed / 2)
                };
                return el.css(css).show().css({
                    opacity: 1
                }).addClass('open').trigger('opened.fndtn.reveal')
            };
            var settings = this.settings;
            if (getAnimationData(settings.animation).fade) return el.fadeIn(settings.animation_speed / 2);
            this.locked = false;
            return el.show()
        },
        to_back: function(el) {
            el.addClass('toback')
        },
        to_front: function(el) {
            el.removeClass('toback')
        },
        hide: function(el, css) {
            if (css) {
                var settings = el.data(this.attr_name(true) + '-init'),
                    context = this;
                settings = settings || this.settings;
                var animData = getAnimationData(settings.animation);
                if (!animData.animate) this.locked = false;
                if (animData.pop) {
                    var end_css = {
                        top: -$(window).scrollTop() - el.data('offset') + 'px',
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return el.animate(end_css, settings.animation_speed, 'linear', function() {
                            context.locked = false;
                            el.css(css).trigger('closed.fndtn.reveal')
                        }).removeClass('open')
                    }, settings.animation_speed / 2)
                };
                if (animData.fade) {
                    var end_css = {
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return el.animate(end_css, settings.animation_speed, 'linear', function() {
                            context.locked = false;
                            el.css(css).trigger('closed.fndtn.reveal')
                        }).removeClass('open')
                    }, settings.animation_speed / 2)
                };
                return el.hide().css(css).removeClass('open').trigger('closed.fndtn.reveal')
            };
            var settings = this.settings;
            if (getAnimationData(settings.animation).fade) return el.fadeOut(settings.animation_speed / 2);
            return el.hide()
        },
        close_video: function(e) {
            var video = $('.flex-video', e.target),
                iframe = $('iframe', video);
            if (iframe.length > 0) {
                iframe.attr('data-src', iframe[0].src);
                iframe.attr('src', iframe.attr('src'));
                video.hide()
            }
        },
        open_video: function(e) {
            var video = $('.flex-video', e.target),
                iframe = video.find('iframe');
            if (iframe.length > 0) {
                var data_src = iframe.attr('data-src');
                if (typeof data_src === 'string') {
                    iframe[0].src = iframe.attr('data-src')
                } else {
                    var src = iframe[0].src;
                    iframe[0].src = undefined;
                    iframe[0].src = src
                };
                video.show()
            }
        },
        data_attr: function(str) {
            if (this.namespace.length > 0) return this.namespace + '-' + str;
            return str
        },
        cache_offset: function(modal) {
            var offset = modal.show().height() + parseInt(modal.css('top'), 10) + modal.scrollY;
            modal.hide();
            return offset
        },
        off: function() {
            $(this.scope).off('.fndtn.reveal')
        },
        reflow: function() {}
    }

    function getAnimationData(str) {
        var fade = /fade/i.test(str),
            pop = /pop/i.test(str);
        return {
            animate: fade || pop,
            pop: pop,
            fade: fade
        }
    }
}(jQuery, window, window.document));;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.reveal.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.tab.js. */
(function($, window, document, undefined) {
    'use strict';
    Foundation.libs.tab = {
        name: 'tab',
        version: '5.5.3',
        settings: {
            active_class: 'active',
            callback: function() {},
            deep_linking: false,
            scroll_to_content: true,
            is_hover: false
        },
        default_tab_hashes: [],
        init: function(scope, method, options) {
            var self = this,
                S = this.S;
            S('[' + this.attr_name() + '] > .active > a', this.scope).each(function() {
                self.default_tab_hashes.push(this.hash)
            });
            this.bindings(method, options);
            this.handle_location_hash_change()
        },
        events: function() {
            var self = this,
                S = this.S,
                usual_tab_behavior = function(e, target) {
                    var settings = S(target).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
                    if (!settings.is_hover || Modernizr.touch) {
                        var keyCode = e.keyCode || e.which;
                        if (keyCode !== 9) {
                            e.preventDefault();
                            e.stopPropagation()
                        };
                        self.toggle_active_tab(S(target).parent())
                    }
                };
            S(this.scope).off('.tab').on('keydown.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === 13 || keyCode === 32) {
                    var el = this;
                    usual_tab_behavior(e, el)
                }
            }).on('click.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(e) {
                var el = this;
                usual_tab_behavior(e, el)
            }).on('mouseenter.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(e) {
                var settings = S(this).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
                if (settings.is_hover) self.toggle_active_tab(S(this).parent())
            });
            S(window).on('hashchange.fndtn.tab', function(e) {
                e.preventDefault();
                self.handle_location_hash_change()
            })
        },
        handle_location_hash_change: function() {
            var self = this,
                S = this.S;
            S('[' + this.attr_name() + ']', this.scope).each(function() {
                var settings = S(this).data(self.attr_name(true) + '-init');
                if (settings.deep_linking) {
                    var hash;
                    if (settings.scroll_to_content) {
                        hash = self.scope.location.hash
                    } else hash = self.scope.location.hash.replace('fndtn-', '');
                    if (hash != '') {
                        var hash_element = S(hash);
                        if (hash_element.hasClass('content') && hash_element.parent().hasClass('tabs-content')) {
                            self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=' + hash + ']').parent())
                        } else {
                            var hash_tab_container_id = hash_element.closest('.content').attr('id');
                            if (hash_tab_container_id != undefined) self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=#' + hash_tab_container_id + ']').parent(), hash)
                        }
                    } else
                        for (var ind = 0; ind < self.default_tab_hashes.length; ind++) self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=' + self.default_tab_hashes[ind] + ']').parent())
                }
            })
        },
        toggle_active_tab: function(tab, location_hash) {
            var self = this,
                S = self.S,
                tabs = tab.closest('[' + this.attr_name() + ']'),
                tab_link = tab.find('a'),
                anchor = tab.children('a').first(),
                target_hash = '#' + anchor.attr('href').split('#')[1],
                target = S(target_hash),
                siblings = tab.siblings(),
                settings = tabs.data(this.attr_name(true) + '-init'),
                interpret_keyup_action = function(e) {
                    var $original = $(this),
                        $prev = $(this).parents('li').prev().children('[role="tab"]'),
                        $next = $(this).parents('li').next().children('[role="tab"]'),
                        $target;
                    switch (e.keyCode) {
                        case 37:
                            $target = $prev;
                            break;
                        case 39:
                            $target = $next;
                            break;
                        default:
                            $target = false;
                            break
                    };
                    if ($target.length) {
                        $original.attr({
                            tabindex: '-1',
                            'aria-selected': null
                        });
                        $target.attr({
                            tabindex: '0',
                            'aria-selected': true
                        }).focus()
                    };
                    $('[role="tabpanel"]').attr('aria-hidden', 'true');
                    $('#' + $(document.activeElement).attr('href').substring(1)).attr('aria-hidden', null)
                },
                go_to_hash = function(hash) {
                    var default_hash = settings.scroll_to_content ? self.default_tab_hashes[0] : 'fndtn-' + self.default_tab_hashes[0].replace('#', '');
                    if (hash !== default_hash || window.location.hash) window.location.hash = hash
                };
            if (anchor.data('tab-content')) {
                target_hash = '#' + anchor.data('tab-content').split('#')[1];
                target = S(target_hash)
            };
            if (settings.deep_linking)
                if (settings.scroll_to_content) {
                    go_to_hash(location_hash || target_hash);
                    if (location_hash == undefined || location_hash == target_hash) {
                        tab.parent()[0].scrollIntoView()
                    } else S(target_hash)[0].scrollIntoView()
                } else if (location_hash != undefined) {
                go_to_hash('fndtn-' + location_hash.replace('#', ''))
            } else go_to_hash('fndtn-' + target_hash.replace('#', ''));
            tab.addClass(settings.active_class).triggerHandler('opened');
            tab_link.attr({
                'aria-selected': 'true',
                tabindex: 0
            });
            siblings.removeClass(settings.active_class);
            siblings.find('a').attr({
                'aria-selected': 'false'
            });
            target.siblings().removeClass(settings.active_class).attr({
                'aria-hidden': 'true'
            });
            target.addClass(settings.active_class).attr('aria-hidden', 'false').removeAttr('tabindex');
            settings.callback(tab);
            target.triggerHandler('toggled', [target]);
            tabs.triggerHandler('toggled', [tab]);
            tab_link.off('keydown').on('keydown', interpret_keyup_action)
        },
        data_attr: function(str) {
            if (this.namespace.length > 0) return this.namespace + '-' + str;
            return str
        },
        off: function() {},
        reflow: function() {}
    }
}(jQuery, window, window.document));;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.tab.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.topbar.js. */
(function($, window, document, undefined) {
    'use strict';
    Foundation.libs.topbar = {
        name: 'topbar',
        version: '5.5.3',
        settings: {
            index: 0,
            start_offset: 0,
            sticky_class: 'sticky',
            custom_back_text: true,
            back_text: 'Back',
            mobile_show_parent_link: true,
            is_hover: true,
            scrolltop: true,
            sticky_on: 'all',
            dropdown_autoclose: true
        },
        init: function(section, method, options) {
            Foundation.inherit(this, 'add_custom_rule register_media throttle');
            var self = this;
            self.register_media('topbar', 'foundation-mq-topbar');
            this.bindings(method, options);
            self.S('[' + this.attr_name() + ']', this.scope).each(function() {
                var topbar = $(this),
                    settings = topbar.data(self.attr_name(true) + '-init'),
                    section = self.S('section, .top-bar-section', this);
                topbar.data('index', 0);
                var topbarContainer = topbar.parent();
                if (topbarContainer.hasClass('fixed') || self.is_sticky(topbar, topbarContainer, settings)) {
                    self.settings.sticky_class = settings.sticky_class;
                    self.settings.sticky_topbar = topbar;
                    topbar.data('height', topbarContainer.outerHeight());
                    topbar.data('stickyoffset', topbarContainer.offset().top)
                } else topbar.data('height', topbar.outerHeight());
                if (!settings.assembled) self.assemble(topbar);
                if (settings.is_hover) {
                    self.S('.has-dropdown', topbar).addClass('not-click')
                } else self.S('.has-dropdown', topbar).removeClass('not-click');
                self.add_custom_rule('.f-topbar-fixed { padding-top: ' + topbar.data('height') + 'px }');
                if (topbarContainer.hasClass('fixed')) self.S('body').addClass('f-topbar-fixed')
            })
        },
        is_sticky: function(topbar, topbarContainer, settings) {
            var sticky = topbarContainer.hasClass(settings.sticky_class),
                smallMatch = matchMedia(Foundation.media_queries.small).matches,
                medMatch = matchMedia(Foundation.media_queries.medium).matches,
                lrgMatch = matchMedia(Foundation.media_queries.large).matches;
            if (sticky && settings.sticky_on === 'all') return true;
            if (sticky && this.small() && settings.sticky_on.indexOf('small') !== -1)
                if (smallMatch && !medMatch && !lrgMatch) return true;
            if (sticky && this.medium() && settings.sticky_on.indexOf('medium') !== -1)
                if (smallMatch && medMatch && !lrgMatch) return true;
            if (sticky && this.large() && settings.sticky_on.indexOf('large') !== -1)
                if (smallMatch && medMatch && lrgMatch) return true;
            return false
        },
        toggle: function(toggleEl) {
            var self = this,
                topbar;
            if (toggleEl) {
                topbar = self.S(toggleEl).closest('[' + this.attr_name() + ']')
            } else topbar = self.S('[' + this.attr_name() + ']');
            var settings = topbar.data(this.attr_name(true) + '-init'),
                section = self.S('section, .top-bar-section', topbar);
            if (self.breakpoint()) {
                if (!self.rtl) {
                    section.css({
                        left: '0%'
                    });
                    $('>.name', section).css({
                        left: '100%'
                    })
                } else {
                    section.css({
                        right: '0%'
                    });
                    $('>.name', section).css({
                        right: '100%'
                    })
                };
                self.S('li.moved', section).removeClass('moved');
                topbar.data('index', 0);
                topbar.toggleClass('expanded').css('height', '')
            };
            if (settings.scrolltop) {
                if (!topbar.hasClass('expanded')) {
                    if (topbar.hasClass('fixed')) {
                        topbar.parent().addClass('fixed');
                        topbar.removeClass('fixed');
                        self.S('body').addClass('f-topbar-fixed')
                    }
                } else if (topbar.parent().hasClass('fixed'))
                    if (settings.scrolltop) {
                        topbar.parent().removeClass('fixed');
                        topbar.addClass('fixed');
                        self.S('body').removeClass('f-topbar-fixed');
                        window.scrollTo(0, 0)
                    } else topbar.parent().removeClass('expanded')
            } else {
                if (self.is_sticky(topbar, topbar.parent(), settings)) topbar.parent().addClass('fixed');
                if (topbar.parent().hasClass('fixed'))
                    if (!topbar.hasClass('expanded')) {
                        topbar.removeClass('fixed');
                        topbar.parent().removeClass('expanded');
                        self.update_sticky_positioning()
                    } else {
                        topbar.addClass('fixed');
                        topbar.parent().addClass('expanded');
                        self.S('body').addClass('f-topbar-fixed')
                    }
            }
        },
        timer: null,
        events: function(bar) {
            var self = this,
                S = this.S;
            S(this.scope).off('.topbar').on('click.fndtn.topbar', '[' + this.attr_name() + '] .toggle-topbar', function(e) {
                e.preventDefault();
                self.toggle(this)
            }).on('click.fndtn.topbar contextmenu.fndtn.topbar', '.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]', function(e) {
                var li = $(this).closest('li'),
                    topbar = li.closest('[' + self.attr_name() + ']'),
                    settings = topbar.data(self.attr_name(true) + '-init');
                if (settings.dropdown_autoclose && settings.is_hover) {
                    var hoverLi = $(this).closest('.hover');
                    hoverLi.removeClass('hover')
                };
                if (self.breakpoint() && !li.hasClass('back') && !li.hasClass('has-dropdown')) self.toggle()
            }).on('click.fndtn.topbar', '[' + this.attr_name() + '] li.has-dropdown', function(e) {
                var li = S(this),
                    target = S(e.target),
                    topbar = li.closest('[' + self.attr_name() + ']'),
                    settings = topbar.data(self.attr_name(true) + '-init');
                if (target.data('revealId')) {
                    self.toggle();
                    return
                };
                if (self.breakpoint()) return;
                if (settings.is_hover && !Modernizr.touch) return;
                e.stopImmediatePropagation();
                if (li.hasClass('hover')) {
                    li.removeClass('hover').find('li').removeClass('hover');
                    li.parents('li.hover').removeClass('hover')
                } else {
                    li.addClass('hover');
                    $(li).siblings().removeClass('hover');
                    if (target[0].nodeName === 'A' && target.parent().hasClass('has-dropdown')) e.preventDefault()
                }
            }).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown>a', function(e) {
                if (self.breakpoint()) {
                    e.preventDefault();
                    var $this = S(this),
                        topbar = $this.closest('[' + self.attr_name() + ']'),
                        section = topbar.find('section, .top-bar-section'),
                        dropdownHeight = $this.next('.dropdown').outerHeight(),
                        $selectedLi = $this.closest('li');
                    topbar.data('index', topbar.data('index') + 1);
                    $selectedLi.addClass('moved');
                    if (!self.rtl) {
                        section.css({
                            left: -(100 * topbar.data('index')) + '%'
                        });
                        section.find('>.name').css({
                            left: 100 * topbar.data('index') + '%'
                        })
                    } else {
                        section.css({
                            right: -(100 * topbar.data('index')) + '%'
                        });
                        section.find('>.name').css({
                            right: 100 * topbar.data('index') + '%'
                        })
                    };
                    topbar.css('height', $this.siblings('ul').outerHeight(true) + topbar.data('height'))
                }
            });
            S(window).off('.topbar').on('resize.fndtn.topbar', self.throttle(function() {
                self.resize.call(self)
            }, 50)).trigger('resize.fndtn.topbar').load(function() {
                S(this).trigger('resize.fndtn.topbar')
            });
            S('body').off('.topbar').on('click.fndtn.topbar', function(e) {
                var parent = S(e.target).closest('li').closest('li.hover');
                if (parent.length > 0) return;
                S('[' + self.attr_name() + '] li.hover').removeClass('hover')
            });
            S(this.scope).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown .back', function(e) {
                e.preventDefault();
                var $this = S(this),
                    topbar = $this.closest('[' + self.attr_name() + ']'),
                    section = topbar.find('section, .top-bar-section'),
                    settings = topbar.data(self.attr_name(true) + '-init'),
                    $movedLi = $this.closest('li.moved'),
                    $previousLevelUl = $movedLi.parent();
                topbar.data('index', topbar.data('index') - 1);
                if (!self.rtl) {
                    section.css({
                        left: -(100 * topbar.data('index')) + '%'
                    });
                    section.find('>.name').css({
                        left: 100 * topbar.data('index') + '%'
                    })
                } else {
                    section.css({
                        right: -(100 * topbar.data('index')) + '%'
                    });
                    section.find('>.name').css({
                        right: 100 * topbar.data('index') + '%'
                    })
                };
                if (topbar.data('index') === 0) {
                    topbar.css('height', '')
                } else topbar.css('height', $previousLevelUl.outerHeight(true) + topbar.data('height'));
                setTimeout(function() {
                    $movedLi.removeClass('moved')
                }, 300)
            });
            S(this.scope).find('.dropdown a').focus(function() {
                $(this).parents('.has-dropdown').addClass('hover')
            }).blur(function() {
                $(this).parents('.has-dropdown').removeClass('hover')
            })
        },
        resize: function() {
            var self = this;
            self.S('[' + this.attr_name() + ']').each(function() {
                var topbar = self.S(this),
                    settings = topbar.data(self.attr_name(true) + '-init'),
                    stickyContainer = topbar.parent('.' + self.settings.sticky_class),
                    stickyOffset;
                if (!self.breakpoint()) {
                    var doToggle = topbar.hasClass('expanded');
                    topbar.css('height', '').removeClass('expanded').find('li').removeClass('hover');
                    if (doToggle) self.toggle(topbar)
                };
                if (self.is_sticky(topbar, stickyContainer, settings))
                    if (stickyContainer.hasClass('fixed')) {
                        stickyContainer.removeClass('fixed');
                        stickyOffset = stickyContainer.offset().top;
                        if (self.S(document.body).hasClass('f-topbar-fixed')) stickyOffset -= topbar.data('height');
                        topbar.data('stickyoffset', stickyOffset);
                        stickyContainer.addClass('fixed')
                    } else {
                        stickyOffset = stickyContainer.offset().top;
                        topbar.data('stickyoffset', stickyOffset)
                    }
            })
        },
        breakpoint: function() {
            return !matchMedia(Foundation.media_queries['topbar']).matches
        },
        small: function() {
            return matchMedia(Foundation.media_queries['small']).matches
        },
        medium: function() {
            return matchMedia(Foundation.media_queries['medium']).matches
        },
        large: function() {
            return matchMedia(Foundation.media_queries['large']).matches
        },
        assemble: function(topbar) {
            var self = this,
                settings = topbar.data(this.attr_name(true) + '-init'),
                section = self.S('section, .top-bar-section', topbar);
            section.detach();
            self.S('.has-dropdown>a', section).each(function() {
                var $link = self.S(this),
                    $dropdown = $link.siblings('.dropdown'),
                    url = $link.attr('href'),
                    $titleLi;
                if (!$dropdown.find('.title.back').length) {
                    if (settings.mobile_show_parent_link == true && url) {
                        $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link hide-for-medium-up"><a class="parent-link js-generated" href="' + url + '">' + $link.html() + '</a></li>')
                    } else $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>');
                    if (settings.custom_back_text == true) {
                        $('h5>a', $titleLi).html(settings.back_text)
                    } else $('h5>a', $titleLi).html('&laquo; ' + $link.html());
                    $dropdown.prepend($titleLi)
                }
            });
            section.appendTo(topbar);
            this.sticky();
            this.assembled(topbar)
        },
        assembled: function(topbar) {
            topbar.data(this.attr_name(true), $.extend({}, topbar.data(this.attr_name(true)), {
                assembled: true
            }))
        },
        height: function(ul) {
            var total = 0,
                self = this;
            $('> li', ul).each(function() {
                total += self.S(this).outerHeight(true)
            });
            return total
        },
        sticky: function() {
            var self = this;
            this.S(window).on('scroll', function() {
                self.update_sticky_positioning()
            })
        },
        update_sticky_positioning: function() {
            var klass = '.' + this.settings.sticky_class,
                $window = this.S(window),
                self = this;
            if (self.settings.sticky_topbar && self.is_sticky(this.settings.sticky_topbar, this.settings.sticky_topbar.parent(), this.settings)) {
                var distance = this.settings.sticky_topbar.data('stickyoffset') + this.settings.start_offset;
                if (!self.S(klass).hasClass('expanded'))
                    if ($window.scrollTop() > distance) {
                        if (!self.S(klass).hasClass('fixed')) {
                            self.S(klass).addClass('fixed');
                            self.S('body').addClass('f-topbar-fixed')
                        }
                    } else if ($window.scrollTop() <= distance)
                    if (self.S(klass).hasClass('fixed')) {
                        self.S(klass).removeClass('fixed');
                        self.S('body').removeClass('f-topbar-fixed')
                    }
            }
        },
        off: function() {
            this.S(this.scope).off('.fndtn.topbar');
            this.S(window).off('.fndtn.topbar')
        },
        reflow: function() {}
    }
}(jQuery, window, window.document));;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/themes/sloth/vendor/foundation/js/foundation/foundation.topbar.js. */
; /*})'"*/