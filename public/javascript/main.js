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
	      	successCallback(data);
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
			var rss2jsonEndpoint = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnikiastro.wordpress.com%2Ffeed%2F'
			parseRSS(rss2jsonEndpoint, function(feed) {
				var lastEntry = feed.items[0];
				var $entryContent = $(lastEntry.content.replace(/http:/g, 'https:'));
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
