$(document).ready(function () {

	var images = [], captions = [], current = 0;

	function showImage(i) {
		$('#lx-img').attr('src', images[i]);
		$('#lx-caption').text(captions[i] || '');
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
		$('#lx-desc').text($article.find('.lx-long-desc').text());

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

});