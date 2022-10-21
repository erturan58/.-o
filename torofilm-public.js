/**
    *   Load More Results v1.0.0
    * Author: Cenk Çalgan
    * 
    * Options:
    * - tag (object):
    *       - name (string)
    *       - class (string)
    * - displayedItems (int)
    *   - showItems (int)
    * - button (object):
    *       - class (string)
    *       - text (string)
*/
(function ($) {
    'use strict';
    $.fn.loadMoreResults = function (options) {
        var defaults = {
            tag: {
                'name': 'tt',
                'class': 'tt-at'
            },
            displayedItems: 5,
            showItems: 5,
            button: {
                'class': 'btn-load-more',
                text: 'Load More'
            }
        };
        var opts = $.extend(true, {}, defaults, options);
        var alphaNumRE = /^[A-Za-z][-_A-Za-z0-9]+$/;
        var numRE = /^[0-9]+$/;
        $.each(opts, function validateOptions(key, val) {
            if (key === 'tag') {
                formatCheck(key, val, 'name', 'string');
                formatCheck(key, val, 'class', 'string');
            }
            if (key === 'displayedItems') {
                formatCheck(key, val, null, 'number');
            }
            if (key === 'showItems') {
                formatCheck(key, val, null, 'number');
            }
            if (key === 'button') {
                formatCheck(key, val, 'class', 'string');
            }
        });
        function formatCheck(key, val, prop, typ) {
            if (prop !== null && typeof prop !== 'object') {
                if (typeof val[prop] !== typ || String(val[prop]).match(typ == 'string' ? alphaNumRE : numRE) === null) {
                    opts[key][prop] = defaults[key][prop];
                }
            } else {
                if (typeof val !== typ || String(val).match(typ == 'string' ? alphaNumRE : numRE) === null) {
                    opts[key] = defaults[key];
                }
            }
        };
        return this.each(function (index, element) {
            var $list = $(element),
                    lc = $list.find(' > ' + opts.tag.name + '.' + opts.tag.class).length,
                    dc = parseInt(opts.displayedItems),
                    sc = parseInt(opts.showItems);
            console.log(lc);
            console.log(opts.tag.name);
            console.log(opts.tag.class);
            console.log($list);
            if(lc > 10){
                $list.find(' > ' + opts.tag.name + '.' + opts.tag.class + ':lt(' + dc + ')');
                $list.find(' > ' + opts.tag.name + '.' + opts.tag.class + ':gt(' + (dc - 1) + ')').css("display", "none");
                $('.loadactor').append('<tt><a href="javascript:void(0)" class="Button normal btn-view ' + opts.button.class + '">' + opts.button.text + '</a></tt>');
                $list.parent().on("click", ".btn-view", function (e) {
                    e.preventDefault();
                    dc = (dc + sc <= lc) ? dc + sc : lc;
                    $list.find(' > ' + opts.tag.name + '.' + opts.tag.class + ':lt(' + dc + ')').fadeIn();
                    if (dc == lc) {
                        $(this).hide();
                    }
                }); 
            }
        });
    };
})(jQuery);
jQuery(document).ready(function($){
    var templateUrl = object_name.templateUrl;

    $(document).on('click', '.rtg', function(event) {
        event.preventDefault();
        var ide = $(this).attr('tab');
        $('.rtg').addClass('inactive').removeClass('active');
        $(this).addClass('active').removeClass('inactive');
        $('.lrt').removeClass('active');
        $('#' + ide).addClass('active');
    });

    
    $('body').click(function(evt){    
        if(evt.target.id == "res-sj")
          return;
        if(evt.target.id  == 'res-sj_h')
            return;
       //For descendants of menu_content being clicked, remove this check if you do not want to put constraint on descendants.
       if($(evt.target).closest('#res-sj').length)
          return;   
        if($(evt.target).closest('#res-sj_h').length)
          return;  
        $('#res-sj').empty().removeClass('on').hide();         
        $('#res-sj_h').empty().removeClass('on').hide();         
      //Do processing of click event here for every element except with id menu_content
    });
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          $('.avatar img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }
    $("#profilepicture").change(function() {
      readURL(this);
    });
    /* TAB VIDEOS */
    $('.aa-tbs-video a').on('click', function(event) {
        event.preventDefault();
        $('.video-player iframe').removeAttr('src');
        var ide = $(this).attr('href');
        var datas = $(ide).find('iframe').data('src');
        $(ide).find('iframe').attr('src', datas);
    });
    /*ADD TO FAVORITE*/
    $('body').on('click', '#add-to-favorito', function(event) {
        event.preventDefault();
        var $this = $(this);
        var post_id = $(this).data('id'),
            status  = $(this).attr('data-status');
        $('#mdl-favorites .anm-b').empty();
        $.ajax({
            url         : torofilm_Public.url,
            method      : 'POST',
            data        : {
                action      : 'action_add_favorito',
                post_id     : post_id,
                status      : status
            }, 
            success: function( data ) {
                console.log(data);
                if(status == 'favorito') {
                    $this.find('i').addClass('far');
                    $this.attr('data-status', 'nofavorito');
                    $('#mdl-favorites .anm-b').append('<p class="msg-w"><i class="fa-exclamation-circle"></i>'+torofilm_Public.remove_favorite+'</p>');
                } else if(status == 'nofavorito') {
                    $this.find('i').removeClass('far');
                    $this.attr('data-status', 'favorito');
                    $('#mdl-favorites .anm-b').append('<p class="msg-s"><i class="fa-check-circle"></i>'+torofilm_Public.add_favorite+'</p>');
                }
                setTimeout(()=>{
                    $('.msg-s').remove();
                    $('.msg-w').remove();
                    $('body').removeClass('mdl-on');
                    $('#mdl-favorites').removeClass('on');
                }, 1000);
            }
        });
    });
    $('body').on('click', '#add-to-favorito-s', function(event) {
        event.preventDefault();
        var $this = $(this);
        var post_id = $(this).data('id'),
            status  = $(this).attr('data-status');
        $('#mdl-favorites .anm-b').empty();
        $.ajax({
            url         : torofilm_Public.url,
            method      : 'POST',
            data        : {
                action      : 'action_add_favorito_s',
                post_id     : post_id,
                status      : status
            }, 
            success: function( data ) {
                console.log(data);
                if(status == 'favorito') {
                    $this.find('i').addClass('far');
                    $this.attr('data-status', 'nofavorito');
                    $('#mdl-favorites .anm-b').append('<p class="msg-w"><i class="fa-exclamation-circle"></i>'+torofilm_Public.remove_favorite+'</p>');
                } else if(status == 'nofavorito') {
                    $this.find('i').removeClass('far');
                    $this.attr('data-status', 'favorito');
                    $('#mdl-favorites .anm-b').append('<p class="msg-s"><i class="fa-check-circle"></i>'+torofilm_Public.add_favorite+'</p>');
                }
                setTimeout(()=>{
                    $('.msg-s').remove();
                    $('.msg-w').remove();
                    $('body').removeClass('mdl-on');
                    $('#mdl-favorites').removeClass('on');
                }, 1000);
            }
        });
    });
    /* TABS AJAX */
    $('.ax-tbs a').on('click', function(e) {
        var $this = $(this),
            limit = $(this).data('limit'),
            post  = $(this).data('post'),
            cate  = $(this).data('category'),
            mode  = $(this).data('mode'),
            ide   = $(this).attr('href');
        if($(ide).find('ul').length != 0 ) {
            return;
        }
        $.ajax({
            url     : torofilm_Public.url,
            method     : 'POST',
            data     : {
                action: 'action_tr_movie_category',
                limit : limit,
                post  : post,
                cate  : cate,
                mode  : mode 
            }, 
            beforeSend: function(){
                if($(ide).find('ul').length == 0 || $(ide).find('p').length==0) {
                    var html = '<div style="width:100%; display:flex; justify-content:center"><i id="sl-home" class="fas fa-spinner"></i></div>';
                    $(ide).append(html);
                }
            },
            success: function( data ) {
                $(ide).html(data);
            }
        });
    });
   /*Responsive*/
    //$('.user-bx').clone().prependTo('#menu').addClass('shw hddc');
    /*Dropdown*/
    $('.aa-drp').each(function() {
        var $AADrpdwn = $(this);
        $('.aa-lnk', $AADrpdwn).click(function(e){
          e.preventDefault();
          $AADrpdDv = $('.aa-cnt', $AADrpdwn);
          $AADrpdDv.parent('.aa-drp').toggleClass('on');
          $('.aa-cnt').not($AADrpdDv).parent('.aa-drp').removeClass('on');
          return false;
        });
    });
    $(document).on('click', function(e){
        if ($(e.target).closest('.aa-cnt').length === 0) {
            $('.aa-cnt').parent('.aa-drp').removeClass('on');
        }
    });
    /*Toggle*/
    $('.aa-tgl').on('click', function(){
        var shwhdd = $(this).attr('data-tgl');
        $('#'+shwhdd).toggleClass('on');
        $(this).toggleClass('on');
    });
    /*Modal*/


    /* Trailer */
    $('.aa-mdl').on('click', function(){
        var shwhddb = $(this).attr('data-mdl');
        $('#'+shwhddb).toggleClass('on');
        $('body').toggleClass('mdl-on');
        $(this).toggleClass('on');

        if( $('#mdl-trailer').hasClass('on') ){
            $('.video-trailer').html(torofilm_Public.trailer);
        } else {
            $('.video-trailer').empty();
        }

    });


    $(document).keyup(function(e){
        if (e.keyCode === 27) {
            $('body').removeClass('mdl-on');
            $('.mdl').removeClass('on');
        }
    });
    /*Accordion*/
    $('.aa-crd').find('.aa-crd-lnk').click(function(){
        $(this).toggleClass('on');
        $('.aa-crd-lnk').not($(this)).removeClass('on');
    });
    /*Tabs*/
    $('.aa-tbs a').click(function(e){
        if($(this).parent().parent().hasClass('cat-t')) {
            return;
        }
      e.preventDefault();
        var $this = $(this),
            tabgroup = '#'+$this.parents('.aa-tbs').data('tbs'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('on');
        $this.addClass('on');
        $(tabgroup).children().removeClass('on');
        $(target).addClass('on');
    });
    /*Slider*/
    $('.slider').owlCarousel({
        loop:false,
        margin:32,
        items:1
    });
    /*Carousel*/
    $('.carousel').owlCarousel({
        loop:false,
        margin:8,
        nav:false,
        dots:true,
        navText: ["<i class='fa-chevron-left'></i>","<i class='fa-chevron-right'></i>"],
        responsive:{
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            1200:{
                items:6,
                dots:false,
                nav:true
            },
            1600:{
                items:8,
                dots:false,
                nav:true
            }
        }
    });
    /*Input*/
    $('input, textarea').each(function() {
        $(this).on('focus', function() {
            $(this).parent().addClass('on');
        });
        $(this).on('blur', function() {
            if ($(this).val().length == 0) {
                $(this).parent().removeClass('on');
            }
        });
        if ($(this).val() != '') $(this).parent().addClass('on');
    });
    /*Buscador Sugerido*/
    $('#tr_live_search').on('keyup', function(event) {
        var $this = $(this);
        jQuery(this).attr('autocomplete','off');
        var searchTerm = $(this).val();
        if (searchTerm.length > 2){
            $.ajax({
                url     : torofilm_Public.url,
                type    : 'POST',
                data: {
                    action  : 'action_tr_search_suggest',
                    nonce   : torofilm_Public.nonce,
                    term    : searchTerm
                },
                beforeSend: function(){
                    $('#sl-home').removeClass('fa-search').addClass('fas').addClass('fa-spinner').addClass('fa-pulse');
                    $('#res-sj').empty();
                    $this.next().next().removeClass('on');
                },
                success:function(data){
                    $('#sl-home').addClass('fa-search').removeClass('fas').removeClass('fa-spinner').removeClass('fa-pulse');
                    console.log(data);
                    $this.next().next().fadeIn().html(data);
                    $this.next().next().addClass('on');
                },
                error: function(){
                    $('#sl-home').addClass('fa-search').removeClass('fas').removeClass('fa-spinner').removeClass('fa-pulse');
                    $this.next().next().removeClass('on');
                    $this.next().next().hide();
                }
            });
        } else {
            $('#res-sj').empty();
            $this.next().next().removeClass('on');
            $this.next().next().hide();
        }
    }).keyup();
    /*BUSCCDOR SUGERIDO MORE LOAD*/
    $('body').on('click', '#more-shm', function(event) {
        event.preventDefault();
        $('#form-shs').submit();
    });
    /*Buscador Sugerido*/
    $('#tr_live_search_h').on('keyup', function(event) {
        var $this = $(this);
        jQuery(this).attr('autocomplete','off');
        var searchTerm = $(this).val();
        if (searchTerm.length > 2){
            $.ajax({
                url     : torofilm_Public.url,
                type    : 'POST',
                data: {
                    action  : 'action_tr_search_suggest_h',
                    nonce   : torofilm_Public.nonce,
                    term    : searchTerm
                },
                beforeSend: function(){
                    $('#sl-home_h').removeClass('fa-search').addClass('fas').addClass('fa-spinner').addClass('fa-pulse');
                    $('#res-sj_h').empty();
                    $this.next().next().removeClass('on');
                },
                success:function(data){
                    $('#sl-home_h').addClass('fa-search').removeClass('fas').removeClass('fa-spinner').removeClass('fa-pulse');
                    console.log(data);
                    $this.next().next().fadeIn().html(data);
                    $this.next().next().addClass('on');
                },
                error: function(){
                    $('#sl-home_h').addClass('fa-search').removeClass('fas').removeClass('fa-spinner').removeClass('fa-pulse');
                    $this.next().next().removeClass('on');
                    $this.next().next().hide();
                }
            });
        } else {
            $('#res-sj_h').empty();
            $this.next().next().removeClass('on');
            $this.next().next().hide();
        }
    }).keyup();
    /*BUSCCDOR SUGERIDO MORE LOAD*/
    $('body').on('click', '#more-shm-h', function(event) {
        event.preventDefault();
        $('#search').submit();
    });
    /**
     * Formulario Login Header
     * @since 1.0.0
     */
    $('#form-login-user').on('submit', function(event) {
        event.preventDefault();
        var name = $('#form-login-name').val(),
            pass = $('#form-login-pass').val();
        $('.error-login').remove();
        $.ajax({
            url         : torofilm_Public.url,
            method      : 'POST',
            dataType    : 'json',
            data        : {
                action      : 'action_peli_login_header',
                name        : name,
                pass        : pass
            }, 
            success: function( data ) {
                console.log(data);
                if(data.error == 'false') {
                    location.reload();
                } else {
                    console.log('error en login');
                    $('#form-login-user .mdl-bd').append('<p class="error-login">Access error</p>');
                }
            },
            error: function(data){
               //Ocurrió un error
               console.log('error 500');
                $('#form-login-user .mdl-bd').append('<p class="error-login">'+ torofilm_Public.access_error +'</p>');
            },
        });
    });
    /**
     * Formulario Register Header
     * @since 1.0.0
     */
    $('#form-register-user').on('submit', function(event) {
        event.preventDefault();
        var name = $('#form-register-names').val(),
            pass = $('#form-register-passs').val(),
            email = $('#form-register-emails').val();
        $.ajax({
            url         : torofilm_Public.url,
            method      : 'POST',
            dataType    : 'json',
            data        : {
                action      : 'action_peli_register_header',
                name        : name,
                pass        : pass,
                email       : email
            }, 
            success: function( data ) {
                if(data.error == 'false') {
                    setTimeout(function(){ 
                        $.ajax({
                            url     : torofilm_Public.url,
                            method     : 'POST',
                            dataType    : 'json',
                            data     : {
                                action      : 'action_peli_login_header',
                                name        : name,
                                pass        : pass
                            }, 
                            success: function( data ) {
                                if(data.error == 'false') {
                                    location.reload();
                                } else {
                                    console.log('error en login');
                                }
                            }
                        });
                    }, 500);
                } else {
                    console.log('error en login');
                }
            },
            error: function(data){
               console.log('error 500');
            },
        });
    });
    if($("#edit-user-perfil-pais").length > 0) {
        $("#edit-user-perfil-pais").countrySelect({
            // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
            // responsiveDropdown: true,
            preferredCountries: ['pe', 'mx', 'ar', 'co', 'cl', 'ec', 'es', 'bo', 'uy', 'py'],
        });
    }
    /*EDITOR DE PERIL DE USER*/
    $('#editor-user-perfil').on('submit', function(e) {
        e.preventDefault();
        var formData = new FormData($('#editor-user-perfil')[0]);
        $.ajax
        ({
            type       : 'POST',
            url        : templateUrl + '/helpers/edit-author.php',
            dataType   : 'json',
            data       : formData,
            cache      : false,
            contentType: false,
            processData: false
        })
        .done(function(data){
            var html = '';
            if(data.mensaje == 'error_image'){
                html += '<p id="msg-alert-confirmation" style="margin-top: 10px;" class="msg-w"><i class="fa-check-circle"></i>'+torofilm_Public.warning+'</p>';
            } else {
                html += '<p id="msg-alert-confirmation" style="margin-top: 10px;" class="msg-s"><i class="fa-check-circle"></i>'+torofilm_Public.saved+'</p>';
            }
            $('#editor-user-perfil').append(html);
            setTimeout(function(){ 
                $('#msg-alert-confirmation').fadeOut(500);
            }, 2000);
            setTimeout(function(){ 
                $('#msg-alert-confirmation').remove();
            }, 2600);
        })
        .fail(function(data){
             var html = '';
            html += '<p id="msg-alert-confirmation" style="margin-top: 10px;" class="msg-w"><i class="fa-check-circle"></i>'+torofilm_Public.error_upload+'</p>';
            $('#editor-user-perfil').append(html);
            setTimeout(function(){ 
                $('#msg-alert-confirmation').fadeOut(500);
            }, 2000);
            setTimeout(function(){ 
                $('#msg-alert-confirmation').remove();
            }, 2600);
        })
    });
    $('#editor-user-pass').on('submit', function(event) {
        event.preventDefault();
        var pass        = $('#editor-user-pass-password').val(),
            passRepeat  = $('#editor-user-pass-repeat').val();
        if( pass == '' && passRepeat == '') {
            return;
        }
        if( pass !== passRepeat ) {
            var html = '';
            html += '<p id="error-tpt" style="margin-top: 10px;" class="msg-d"><i class="fa-exclamation-triangle"></i> Las contraseñas no coinciden</p>';
            $('#editor-user-pass').append(html);
            setTimeout(function(){ 
                $('#error-tpt').fadeOut(500);
            }, 2000);
            setTimeout(function(){ 
                $('#error-tpt').remove();
            }, 2600);
            return;
        }
        $.ajax({
            url     : torofilm_Public.url,
            method     : 'POST',
            data     : {
                action    : 'action_editor_user_perfil',
                pass      : pass,
                passRepeat: passRepeat
            }, 
            success: function( data ) {
                var html = '';
                html += '<p id="msg-alert-confirmation" style="margin-top: 10px;" class="msg-s"><i class="fa-exclamation-circle"></i>Datos guardados correctamente</p>';
                $('#editor-user-pass').append(html);
                setTimeout(function(){ 
                    $('#msg-alert-confirmation').fadeOut(500);
                }, 2000);
                setTimeout(function(){ 
                    $('#msg-alert-confirmation').remove();
                }, 2600);
            }
        });
    });
    $('.sel-temp a').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        var text_season = $(this).attr('data-season');
        var post = $(this).attr('data-post');
        $('.n_s').text(text_season);
        $('#episode_by_temp').empty();
        $this.parent().parent().parent().removeClass('on');
        $.ajax({
            url     : torofilm_Public.url,
            method     : 'POST',
            data     : {
                action    : 'action_select_season',
                season    : text_season,
                post      : post
            }, 
            beforeSend: function(){
                var html = '<li style="flex:100%; max-width: 100%;"><div style="width:100%; display:flex; justify-content:center"><i id="sl-home" class="fas fa-spinner"></i></div></li>';
                $('#episode_by_temp').append(html);
            },
            success: function( data ) {
                $('#episode_by_temp').html(data);
            }
        });
    });
    $('.loadactor').loadMoreResults({
        displayedItems: 10,
        showItems: 10,
        button: {
          'text': 'View more',
          'class': 'abt'
        },
        tag: {
            'name': 'tt',
            'class': 'tt-at'
        }
    });
    /*changue link modal register login*/
    $('#to-register').on('click', function(event) {
        event.preventDefault();
        $('.mdl').removeClass('on');
        $('#mdl-signup').addClass('on');
    });
    $('#to-login').on('click', function(event) {
        event.preventDefault();
        $('.mdl').removeClass('on');
        $('#mdl-login').addClass('on');
    });
    $('#playback').on('click', function(event) {
        event.preventDefault();
        if (this.dataset.href !== undefined) {
            if (this.dataset.target !== undefined) {
                window.open(this.dataset.href, 'blank');
            } else {
                window.location = this.dataset.href;
            }
        }
        var count = 0;
        var interval = setInterval(function() {
            count++;
            if (count == 5) {
                $('#playback-time').html('Loading...');
                var $tgt = $(event.target.parentNode);
                $tgt.show().delay(0).fadeOut();
                clearInterval(interval);
            } else {
                $('#playback-time').html(5 - count + ' Loading player...');
            }
        }, 1000);
    });
});
/*!
 * headroom.js v0.5.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
!function(a,b){"use strict";function c(a){this.callback=a,this.ticking=!1}function d(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var b,c,e=a||{};for(c=1;c<arguments.length;c++){var f=arguments[c]||{};for(b in f)e[b]="object"==typeof e[b]?d(e[b],f[b]):e[b]||f[b]}return e}function e(a,b){b=d(b,e.options),this.lastKnownScrollY=0,this.elem=a,this.debouncer=new c(this.update.bind(this)),this.tolerance=b.tolerance,this.classes=b.classes,this.offset=b.offset,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop}var f={bind:!!function(){}.bind,classList:"classList"in b.documentElement,rAF:!!(a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame)};a.requestAnimationFrame=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame,c.prototype={constructor:c,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},e.prototype={constructor:e,init:function(){return e.cutsTheMustard?(this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var b=this.classes;this.initialised=!1,a.removeEventListener("scroll",this.debouncer,!1),this.elem.classList.remove(b.unpinned,b.pinned,b.top,b.initial)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,a.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;(a.contains(b.pinned)||!a.contains(b.unpinned))&&(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},getScrollY:function(){return void 0!==a.pageYOffset?a.pageYOffset:(b.documentElement||b.body.parentNode||b.body).scrollTop},getViewportHeight:function(){return a.innerHeight||b.documentElement.clientHeight||b.body.clientHeight},getDocumentHeight:function(){var a=b.body,c=b.documentElement;return Math.max(a.scrollHeight,c.scrollHeight,a.offsetHeight,c.offsetHeight,a.clientHeight,c.clientHeight)},isOutOfBounds:function(a){var b=0>a,c=a+this.getViewportHeight()>this.getDocumentHeight();return b||c},toleranceExceeded:function(a){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=this.toleranceExceeded(a);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),this.shouldUnpin(a,b)?this.unpin():this.shouldPin(a,b)&&this.pin(),this.lastKnownScrollY=a)}},e.options={tolerance:0,offset:0,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",initial:"headroom"}},e.cutsTheMustard="undefined"!=typeof f&&f.rAF&&f.bind&&f.classList,a.Headroom=e}(window,document);
(function() {
    new Headroom(document.querySelector(".hd"), {
        tolerance: 10,
        offset : 205,
        classes: {
          initial: "pfx",
          pinned: "pfxa",
          unpinned: "pfxb"
        }
    }).init();
}());