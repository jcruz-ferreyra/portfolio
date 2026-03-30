$(document).ready(function () {

	var images = [], captions = [], current = 0;

	function showImage(i) {
		$('#lx-img').attr('src', images[i]);
		$('#lx-caption').text(captions[i] || '');
		$('#lx-counter').text((i + 1) + ' / ' + images.length);
		$('#lx-img').css('cursor', 'zoom-in');
		$('#lx-img').off('click').on('click', function () {
			window.open(images[i], '_blank');
		});
	}

	// Open lightbox on image click
	$('.work-item').on('click', '.project-gallery .image', function (e) {
		e.preventDefault();

		var $gallery = $(this).closest('.project-gallery');
		var $article = $(this).closest('.work-item');

		// Build image and caption lists from this gallery
		images = []; captions = [];
		$gallery.find('a.image').each(function () {
			images.push($(this).attr('href'));
			captions.push($(this).data('caption') || '');
		});

		// Find which image was clicked
		current = $gallery.find('a.image').index($(this));

		// Populate info panel from article
		$('#lx-title').text($article.find('h3').text());

		// Build description as separate paragraphs
		var descHtml = '';
		$article.find('.lx-long-desc').each(function () {
			descHtml += '<p>' + $(this).html() + '</p>';
		});
		$('#lx-desc').html(descHtml);

		// Tags
		var tagsHtml = '';
		$article.find('.lx-tag').each(function () {
			tagsHtml += '<span>' + $(this).text() + '</span>';
		});
		$('#lx-tags').html(tagsHtml);

		// Links
		var linksHtml = '';
		$article.find('.icons a').each(function () {
			linksHtml += '<a href="' + $(this).attr('href') + '" title="' + $(this).attr('title') + '" class="' + $(this).attr('class') + '" target="_blank"><span class="label">' + $(this).find('.label').text() + '</span></a>';
		});
		$('#lx-links').html(linksHtml);

		// Show image and open
		showImage(current);
		$('#lx-overlay').addClass('active');
	});

	// Navigation
	$('#lx-next').on('click', function () {
		current = (current + 1) % images.length;
		showImage(current);
	});

	$('#lx-prev').on('click', function () {
		current = (current - 1 + images.length) % images.length;
		showImage(current);
	});

	// Close: X button
	$('#lx-close').on('click', function () {
		$('#lx-overlay').removeClass('active');
	});

	// Close: click outside panel
	$('#lx-overlay').on('click', function (e) {
		if ($(e.target).is('#lx-overlay')) {
			$('#lx-overlay').removeClass('active');
		}
	});

	// Close: Escape key
	$(document).on('keydown', function (e) {
		if (e.key === 'Escape') $('#lx-overlay').removeClass('active');
	});

	// Swipe to navigate on mobile
	var touchStartX = 0;

	$('#lx-image-side').on('touchstart', function (e) {
		touchStartX = e.originalEvent.touches[0].clientX;
	});

	$('#lx-image-side').on('touchend', function (e) {
		var diff = touchStartX - e.originalEvent.changedTouches[0].clientX;
		if (Math.abs(diff) > 40) {  // 40px threshold to avoid accidental swipes
			if (diff > 0) {
				current = (current + 1) % images.length;  // swipe left = next
			} else {
				current = (current - 1 + images.length) % images.length;  // swipe right = prev
			}
			showImage(current);
		}
	});

	// Fix mobile viewport height on browser chrome hide/show
	function setMobileHeight() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');
	}
	setMobileHeight();
	$(window).on('resize', setMobileHeight);


	// Education popup
	$('.edu-item').on('click', function (e) {
		if ($(e.target).closest('.entry-logo-link').length) {
			e.stopPropagation();
			return;
		}
		var id = $(this).data('id');
		var content = $('#' + id + '-data').html();
		$('#edu-popup-panel').html(content + '<button id="edu-popup-close">&#10005;</button>');
		$('#edu-popup').addClass('active');

		$(document).on('click', '#edu-popup-close', function () {
			$('#edu-popup').removeClass('active');
		});
	});

	// Close: click outside panel
	$('#edu-popup').on('click', function (e) {
		if ($(e.target).is('#edu-popup')) {
			$('#edu-popup').removeClass('active');
		}
	});

	// Close: Escape key (add to existing keydown handler or add new one)
	$(document).on('keydown', function (e) {
		if (e.key === 'Escape') $('#edu-popup').removeClass('active');
	});

	// Toggle extra projects
	$('#toggle-projects').on('click', function (e) {
		e.preventDefault();
		var $extra = $('#extra-projects');
		if ($extra.is(':visible')) {
			$extra.slideUp(300);
			$(this).text('Show More');
		} else {
			$extra.slideDown(300);
			$(this).text('Show Less');
		}
	});
});