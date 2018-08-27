$(function () {
    $('#consultation__modal').on('shown.bs.modal', function () {
        $('.form__name', '#consultation__modal').trigger('focus')
    });

    const $body = $("html, body");

    $('#first-display-arrow').click( function () {
        $body.animate({scrollTop: $('#advantages').offset().top+'px'}, 500);
        return false;
    })
});