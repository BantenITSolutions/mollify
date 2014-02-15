/**
 * main.js
 *
 * Copyright 2008- Samuli Järvelä
 * Released under GPL License.
 *
 * License: http://www.mollify.org/license.php
 */

! function($, mollify) {
    window.mollify.registerModule({
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
                    return {};
                },
                controller: function(details) {
                    return Ember.ObjectController.extend({});
                },
                requiresAuthentication: true
            }
        }
    });
    /*window.mollify.registerModule({
		name: 'main',
		template: 'main',
		composite: true,
		model: function() {
			return {
			};
		},
		controller: function() {
			return Ember.ObjectController.extend({});
		},
		defaultChild: 'files'
	});*/
}(window.jQuery, window.mollify);