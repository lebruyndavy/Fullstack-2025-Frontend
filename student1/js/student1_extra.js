/*  Name: Davy Le Bruyn
    Class: 1 ITF WT
    R-number: r1034516  */

// This is some extra JS functionality that I wrote for animations.

var $ = jQuery.noConflict();

function initAnimation() {
    animateBlock();
    
    $(window).on("scroll", function() {
        animateBlock();
    });
}

function isInViewport(element, offset = 0, fullCheck = false) {
    const rect = element.getBoundingClientRect();
    const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    if (fullCheck) {
        const elementWidth = element.clientWidth;
        const elementHeight = element.clientHeight;

        return rect.left < windowWidth && rect.top + offset < windowHeight && rect.top + elementHeight - offset > 0 && rect.left + elementWidth > 0;
    }

    return rect.top + offset <= windowHeight;
}

function animateBlock() {
    $(".block").each(function() {
        var $element = $(this);
        
        if (isInViewport(this)) {
            $element.addClass("active");
            var delay = 600;

            $element.find('[class*="col-"], [class*="col-md-"], [class*="col-lg-"], .anim-elem, u').each(function() {
                var $child = $(this);
                
                setTimeout(function() {
                    $child.addClass("active");
                }, delay);
                
                delay += 100;
            });
        } else {
            $element.removeClass("active");
        }
    });
}

jQuery(document).ready(function($){
    initAnimation();
});