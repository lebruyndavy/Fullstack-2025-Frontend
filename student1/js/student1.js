/*  Name: Davy Le Bruyn
    Class: 1 ITF WT
    R-number: r1034516  */

// Jquery
var $ = jQuery.noConflict();

function initFilter() {
    $('.js-filter-trigger').click(function () {
        $('.js-filter-trigger').removeClass('active');
        $(this).addClass('active');

        var filterdata = $(this).attr('filterdata');

        if (filterdata == 'all') {
            $('.js-filter-object').addClass('hide');
            setTimeout(function () {
                $('.js-filter-object').removeClass('remove');
            }, 300);
            setTimeout(function () {
                $('.js-filter-object').removeClass('hide');
            }, 600);
            return;
        }

        // lock wrapper height
        var wrapperHeight = $('.js-filter-wrapper').height();
        $('.js-filter-wrapper').height(wrapperHeight);

        // hide all
        $('.js-filter-object').addClass('hide');
        setTimeout(function () {
            $('.js-filter-object').addClass('remove');

            // show filtered results
            $('.js-filter-object').each(function () {
                var attrFilterArr = $(this).attr('filterdata').split(' ');
                if (attrFilterArr.indexOf(filterdata) !== -1) {
                    $(this).removeClass('remove');
                }
            });
        }, 300);

        // show filtered results
        setTimeout(function () {
            $('.js-filter-object').each(function () {
                var attrFilterArr = $(this).attr('filterdata').split(' ');
                if (attrFilterArr.indexOf(filterdata) !== -1) {
                    $(this).removeClass('hide');
                }
            });

            // reset wrapper height to match content
            $('.js-filter-wrapper').css('height', '');
        }, 600);
    });

    console.log('ready');
}

jQuery(document).ready(function($){
    initFilter();
});

// Initiate Venobox
new VenoBox({
    selector: '.venobox',
    numeration: true,
    infinigall: true,
    share: true,
    spinner: 'rotating-plane'
});