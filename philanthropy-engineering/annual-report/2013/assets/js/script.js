jQuery(function($) {

	var $links = $('.navigation').find('li').add(".navigation-li"),
	$moreLinks = $('.read-more'),
	$slide = $('.slide'),
	$mywindow = $(window),
	$htmlbody = $('html,body');

	//Setup waypoints plugin so active nav is styled when that slide is shown
	$slide.waypoint(function (direction) {

		dataslide = $(this).attr('id');

		//If the user scrolls up change the navigation link that has the same data-slide attribute as the slide to active and
		//remove the active class from the previous navigation link
		if (direction === 'down') {
			$('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
		}
		// else If the user scrolls down change the navigation link that has the same data-slide attribute as the slide to active and
		//remove the active class from the next navigation link
		else {
			$('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
		}
	});

	//waypoints doesnt detect the first slide when user scrolls back up to the top.
	//Home slide doesn't have nav so we remove all active classes from the nav elements.
	$mywindow.scroll(function () {
		if ($mywindow.scrollTop() == 0) {
			$links.removeClass('active');
		}
	});

	//Using jquery ScrollTo to scroll down when nav is clicked
	$links.on('click', function(event) {
		dataslide = $(this).attr('data-slide');
		$htmlbody.scrollTo($('#' + dataslide), 1000);
		return false;
	});

	$moreLinks.on('click', function(event) {
		dataslide = $(this).attr('data-slide');
		$htmlbody.scrollTo($('#' + dataslide), 1000);
	});

	//Scroll up when logo is clicked
	// tokamoto: turn this off for Mercury
	// $('#js-backtotop').on('click', function(event) {
	// 	$htmlbody.scrollTo(0, 1000);
	// });

	//Open/Close Menu Functionality
	$('#js-menu-close-trigger').on('click', function() {
		$('#js-navigation').removeClass('open');
		$(this).removeClass('open');
		$('#js-menu-open-trigger').removeClass('closed');
	});

	$('#js-menu-open-trigger').on('click', function() {
		$('#js-navigation').addClass('open');
		$(this).addClass('closed');
		$('#js-menu-close-trigger').addClass('open');
	});

	//Open Menu on Scroll (only large non-touch devices)
	if (!Modernizr.touch && $('#js-large-check').is(':visible')) {
		$('#intro').waypoint(function() {
			$('#js-navigation').addClass('open');
			$('#js-menu-open-trigger').addClass('closed');
			$('#js-menu-close-trigger').addClass('open');
		},
		{ offset: -100 });
	}

	//Open the Footer when the last slide is in place (only large non-touch devices)
	if (!Modernizr.touch && $('#js-medium-check').is(':visible')) {
		$('.last-slide').waypoint(function() {
			$('#js-footer-wrapper').toggleClass('open');
			$('.last-slide').toggleClass('footer-open');
		});
	}

	//Initiate Skrollr for parallax and animation effects
	if (!Modernizr.touch) {
		skrollr.init({
			forceHeight: false
		});
	}

	//FitText for large headlines on desktop
	//Not using on touch because maxes need to be much smaller (using media queries instead)
	$(".text-super-alpha").fitText(1.1, { minFontSize: '40px', maxFontSize: '99px' });
	$(".text-super-beta").fitText(1.1, { minFontSize: '30px', maxFontSize: '80px' });
	$(".text-super-cappa").fitText(1.1, { minFontSize: '20px', maxFontSize: '75px' });
	$(".text-super-delta").fitText(1.1, { minFontSize: '20px', maxFontSize: '60px' });

	//lightbox
	$('.video-link').magnificPopup({type:'iframe'});

	//picture reveals
	$('.js-pict-trigger').on('click', function() {
		$(this).next('.story-picts').toggleClass('open');
		$(this).parents('.slide').toggleClass('open');
	});


	// functions to complete when page is resized
	function resizePage() {
		if ($('#js-medium-check').is(':visible')) {
			$('#intro').waypoint('disable');

			if ($('#js-navigation').hasClass('open')) {
				$('#js-navigation').removeClass('open');
				$('#js-menu-open-trigger').removeClass('closed');
				$('#js-menu-close-trigger').removeClass('open');
			}
		}
	}

	// set timer for page resize
	$(window).resize(function() {
		clearTimeout(window.fgResizeTimeout);
		window.fgResizeTimeout = setTimeout(resizePage, 100);
	});
});
