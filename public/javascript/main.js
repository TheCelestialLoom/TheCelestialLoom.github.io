---
---

// RSS Module
var rssFeedCreator = function() {
	var numberOfParagraphs = {{ site.blog_paragraphs }};
	
	var parseRSS = function(url, successCallback, errorCallback) {
	  $.ajax({
	    url: url,
	    dataType: 'json',
	    success: function(data) {
	      	successCallback(data.query.results);
	    },
	    error: function(er) {
	    	errorCallback();
	    }
	  });
	}
	
	var renderContent = function(entry, content) {
		$('#blog-content').html(content);
		$('#blog-title').html("<div class='blog-title'><h3>" + entry.title +
									"</h3><small>" + entry.pubDate.split(" ").slice(0,4).join(" ") +
									"</small></div>"
									);
		$('#blog-footer').html("<div class='blog-footer'><a href='" + 
									entry.link +
									"'>...continue reading on <em>AstroSynergistics</em>, the astrology blog of Nikki Davenport</a></div>"
									);
	}
	
	var renderError = function() {
		$('.blog-content').html(
			"<p>Can't load blog content. View more posts here: " +
			"<a href='https://nikiastro.wordpress.com/'>Astrosynergistics</a></p>"
			);
	}
	
	return {
		render: function() {
			var yahooYQLendpoint = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%20in%20(\'https%3A%2F%2Fnikiastro.wordpress.com%2Ffeed%2F\')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
			parseRSS(yahooYQLendpoint, function(feed) {
				var lastEntry = feed.item[0];
				var $entryContent = $(lastEntry.encoded.replace(/http:/g, 'https:'));
				var $blogContent= $entryContent.filter("p, ul").slice(0,numberOfParagraphs);
				renderContent(lastEntry, $blogContent);
			}, function() {
				renderError();
			});
		}
	}
};

$(function() {
	rssFeedCreator().render();
});
