;(function($) {
	
	jQuery(function($){
		$(".center").css("height", window.innerHeight+"px");
		getGallery();
	});
	$(document).keypress(function(e) {
		if(e.which == 98) {
			makePhoto();
		};
		if(e.which == 66) {
			makePhoto();
		};
	});
	
	$("#shout").bind("click", function() {
		makePhoto();
	});
	
	var video,
		getGallery = function() {
			$.ajax({
				url: '/getphotos/',
				dataType: 'json',
				method: 'post',
				success: function(response) {
					resetSupersized(response.data);
				}
			})
		},
		takePhoto = function() {
			$.ajax({
				url: '/takephoto/',
				dataType: 'json',
				method: 'post',
				success: function(response) {
				}
			})
		},
		run = false,
		listenToSocket = function() {
			var socket = io.connect();
			socket.on('data', function(data) {
				var reloadGallery = data.reloadGallery,
					takePhoto = data.takePhoto,
					wait = data.wait;
				
				if (reloadGallery){
					getGallery();
					$("#shout").show();
					$("#countdown").hide();
					if (video){
						//video.remove();
					}
					reloadGallery = false;
					run = false;
				}
				if (takePhoto){
					takePhoto = false;
				}
				if (wait){
					$("#counter").text("Wait!");
					wait = false;
				}
			});
		};
	
	listenToSocket();
	
	function makePhoto(){
		if (run == false) {
			run = true;
			navigator.getUserMedia = ( navigator.getUserMedia    || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
			
			if (navigator.getUserMedia) {
				navigator.getUserMedia(
					{ 
						audio: false,
						video: { 
							width: 1280, 
							height: 720
						}
					},
					function(stream) {
						console.log('Stream:', stream);
						video = $('<video>', {
							'src': window.URL.createObjectURL(stream),
							'autoplay': true
						}).css({
							'position': 'absolute',
							'top': 0,
							'left': 0,
							'width': window.innerWidth,
							'height': window.innerHeight
						}).appendTo($('body'));
						
						video.get(0).play();
					},
					function(error) {
						console.log('Error:', error);
					}
				);
			}
			var timeout = 5,
			interval = setInterval(function() {
				timeout--;
				$("#counter").text(timeout);
				
				if (timeout <= 0) {
					$("#counter").text("cheese!");
					takePhoto();
					clearInterval(interval);
				}
			}, 1000);;
			
			$("#counter").text(timeout);
			$("#shout").hide();
			$("#countdown").css("display", "flex")
				.hide()
				.fadeIn();
		}
	};
		
	function resetSupersized(arr)
	{   

		$("#play-button").empty().remove();
		$("#thumb-list").empty().remove();
		$("#thumb-back").empty().remove();
		$("#thumb-forward").empty().remove();


		$("#supersized").fadeOut('fast', function() 
		{

			$('#supersized-loader').empty().remove();
			$('#supersized').empty().remove();
			$('#hzDownscaled').empty().remove();
			$('body').append('<div id="supersized-loader"></div><ul id="supersized"></ul>');


			// Animation complete.

			$.supersized({
			
				// Functionality
				slideshow               :   1,			// Slideshow on/off
				autoplay				:	0,			// Slideshow starts playing automatically
				start_slide             :   1,			// Start slide (0 is random)
				stop_loop				:	0,			// Pauses slideshow on last slide
				random					: 	0,			// Randomize slide order (Ignores start slide)
				slide_interval          :   3000,		// Length between transitions
				transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
				transition_speed		:	1000,		// Speed of transition
				new_window				:	1,			// Image links open in new window/tab
				pause_hover             :   0,			// Pause slideshow on hover
				keyboard_nav            :   1,			// Keyboard navigation on/off
				performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
				image_protect			:	0,			// Disables image dragging and right click with Javascript
														   
				// Size & Position						   
				min_width		        :   0,			// Min width allowed (in pixels)
				min_height		        :   0,			// Min height allowed (in pixels)
				vertical_center         :   1,			// Vertically center background
				horizontal_center       :   1,			// Horizontally center background
				fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
				fit_portrait         	:   1,			// Portrait images will not exceed browser height
				fit_landscape			:   0,			// Landscape images will not exceed browser width
														   
				// Components							
				slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
				thumb_links				:	1,			// Individual thumb links for each slide
				thumbnail_navigation    :   0,			// Thumbnail navigation
				slides 					:  	arr,
											
				// Theme Options			   
				progress_bar			:	0,			// Timer for each slide							
				mouse_scrub				:	0
				
			});
			api.goTo(0);
		});
	};
})(jQuery);


