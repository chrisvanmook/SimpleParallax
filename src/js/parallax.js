/*
 * SimpleParallax
 * http://github.com/chrisvanmook
 *
 * Author: Chris van Mook and other contributors
 * @license: MIT - http://www.opensource.org/licenses/MIT
 * @copyright Chris van Mook 2015
 *
 * Simply include this file in your html file, together with jQuery.
 *
 * @example
 * $('*[data-type="parallax"]').SimpleParallax();
 */

(function ($, window) {
	'use strict';

	var defaultOptions = {
		speed: 5,
		device: false
	};

	/**
	 * @param selector
	 * @param options
	 * @constructor
	 */
	function SimpleParallax(selector, options) {
		this.el = selector;
		this.options = $.extend({}, defaultOptions, options);

		//unfortunately device detection
		if (!this.options.device && checkDevice()) {
			return;
		}

		this.speed = $(this.el).data('speed') || this.options.speed;

		// Validate speed
		if(typeof this.speed !== 'number'){
			console.warn('Please enter a valid number for speed');
			return;
		}else{
			if(this.speed < 0 || this.speed > 10){
				console.warn('Please enter a speed number between 0 and 10');
				return;
			}
		}

		//Continue parallax scrolling
		this.startParallax(); //start parallax
	}

	SimpleParallax.prototype.startParallax = function () {
		var self = this;

		// Calculate background position
		$(window).scroll(function () {
			var yPos = -($(window).scrollTop() / self.speed),
				coords = '50% ' + yPos + 'px';

			$(self.el).css({
				backgroundPosition: coords
			});
		});
	};

	/**
	 * Check if the script is running on a device
	 * @returns {boolean} true if one of the devices matches with the useragent, false otherwise
	 */
	function checkDevice() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	$.fn.simpleParallax = function (options) {
		return this.each(function () {
			return new SimpleParallax(this, options);
		});
	};

})(jQuery, window);