/**
 * main.js
 *
 * Copyright 2008- Samuli Järvelä
 * Released under GPL License.
 *
 * License: http://www.mollify.org/license.php
 */

! function($, mollify) {
    mollify.registerModule({
        views: {
            main: {
                templateFile: 'main',
                template: 'main',
                path: "/",

                routeActions: {
                    showHeadertools: function(name) {
                        return this.render(name, {
                            into: 'main',
                            outlet: 'header-tools'
                        });
                    }
                },

                index: {
                    before: function(_m, transition) {
                        this.transitionTo('files');
                    }
                },

                model: function() {
                    var that = this;

                    // get main views and create nav items
                    var mainViews = this.ui.views.get("main");
                    var navItems = [];
                    mainViews.forEach(function(view) {
                        var navItem = {
                            view: view
                        };

                        if (view.ui) {
                            navItem.titleKey = view.ui.titleKey;
                            if (view.ui.fa) navItem.fa = view.ui.fa;
                        } else {
                            navItem.titleKey = 'main.view.' + view.id;
                        }
                        navItems.push(navItem);
                    });
                    return {
                        views: mainViews,
                        navItems: navItems,
                        sessionActions: []
                    }
                },

                controller: function() {
                    return Ember.ObjectController.extend({
                        needs: ['application'],
                        actions: {
                            selectMainView: function(mv) {
                                this.transitionToRoute(mv.view.id);
                            }
                        },
                        currentView: function() {
                            // first is "main", second is the current view
                            var id = this.get('controllers.application').getCurrentPath(2);
                            var found = false;
                            var items = this.get('navItems');
                            $.each(items, function(i, item) {
                                if (item.view.id == id) {
                                    found = item;
                                    return false;
                                }
                            });
                            return found;
                        }.property('controllers.application.currentPath')
                    });
                },

                setupController: function(controller, model) {
                    this.actions.getApplicableByType('session').done(function(a) {
                        controller.set('sessionActions', a);
                    });
                }
            }
        },

        // module setup
        setup: function(App) {
            App.HeaderNavMenuComponent = Ember.Component.extend({
                tagName: 'li',
                classNames: ['dropdown'],
                titleProperty: false,
                actions: {
                    select: function(item) {
                        this.sendAction("select", item);
                    }
                }
            });

            App.CorePopupComponent = Ember.Component.extend({
                layoutName: 'components/core-popup-element'
            });
        }
    });
}(window.jQuery, window.mollify);