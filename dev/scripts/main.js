/**
 * Created by micheleprandina on 28/05/16.
 */

(function($) {
    "use strict";

    // Cache DOM
    var theDocument = $("html, body");
    var navTabItemAnchor = $(".nav-tab-item-anchor");

    // Add click event
    navTabItemAnchor.on("click", function(evnt) {

        // Prevent default scroll
        evnt.preventDefault();

        // Cache this
        var that = $(this);
        var elemAttr = $(that.attr("href"));

        theDocument.animate({
            scrollTop: elemAttr.offset().top
        }, 320);
    });

})(jQuery);
