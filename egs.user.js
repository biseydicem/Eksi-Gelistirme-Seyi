// ==UserScript==
// @name           Ekşi Geliştirme Şeyi
// @description    sanatsal dokunuşlarla ekşi sözlük'ü güzelleştirir
// @version        2
// @author         biseydicem
// @copyright      2016, bi sey dicem
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @homepageURL    https://github.com/biseydicem/eksi-gelistirme-seyi
// @updateURL      https://openuserjs.org/meta/biseydicem/egs.meta.js
// @include        https://eksisozluk.com/*
// @run-at         document-start
// @grant          GM_addStyle
// ==/UserScript==

/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var _html_ = document.html || document.getElementsByTagName('html')[0];
_html_.setAttribute("mutation", 0);
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (document.querySelector("#site-footer") !== null || document.querySelector("#aside") !== null) {
            if (_html_.getAttribute("mutation") != 1) {
                observer.disconnect();
                _html_.setAttribute("mutation", 1);

                (new EksiGS).start();
            }
        }
    });
});
observer.observe(document, {attributes: true, subtree: true, childList: true, characterData: true});

String.prototype.toNum = function(){
    return parseInt(this, 10);
};

function EksiGS(){
    var constants = {
        loadingGif : "https://i.hizliresim.com/1VMn91.gif",
        titlePerPage : 50,
        entryPerPage : 25
    };

    this.start = function(){
        this.allPages();
        this.entryPages();
        this.authorPages();
        this.otherPages();
    }

    this.allPages = function(){
        addMinorStyles();
        determineTheme();
        updateBuddyList();
        showSearchformLengthLimit();
        modifyNavigationBar();
        inlineEntry("a[href^='/entry/'].b, #profile-cards a[href^='/entry/']");
        extendAside();
    }

    this.entryPages = function(){
        highlightSolFrame();
        searchInGoogle();
        extendBasliktaAra();
        hideSpoiler();
        showGbkz();
        goToEntryDate();
        inlineTwitter();
        inlineYoutube();
        inlineImage();
        quickMessageHistory();
    }

    this.authorPages = function(){
        getRandomEntry();
        openProfileCards();
        autoSaveNotes();
    }

    this.otherPages = function(){
        makeRelationPageWide();
    }

    function addMinorStyles(){
        GM_addStyle('.ui-autocomplete { cursor: pointer; }');
    }

    function determineTheme(){
        //Checks only light theme, because light theme has 3 options and dark theme has its own class

        var theme = "",
            testColor = document.defaultView.getComputedStyle(document.body, null).getPropertyValue("background-color");

        if(testColor == "rgb(255, 255, 255)"){
            theme = "light_white";
        }
        else if(testColor == "rgb(238, 238, 238)"){
            theme = "light_gray";
        }
        else if(testColor == "rgb(244, 241, 234)"){
            theme = "light_sepia";
        }

        $("body").addClass(theme);
    }

    function updateBuddyList(){
        if(!localStorage.getItem("last_buddy_check")){
            handleBuddyList();
        }
        else{
            var check_time_obj = new Date(localStorage.getItem("last_buddy_check"));
            var current_time_obj = new Date();

            if(check_time_obj.getDate() < current_time_obj.getDate()){
                handleBuddyList();
            }
        }

        function handleBuddyList(){
            $.ajax({
                url: "/badi-engellenmis",
                type: 'GET',
                beforeSend: function(xhr){ xhr.setRequestHeader('X-Requested-With', 'test'); },
                success: function(data) {
                    var buddyList = [];
                    $(data).find('.relation-list').eq(0).find('a[data-nick]').each(function(){
                        buddyList.push($(this).attr('data-nick'));
                    });

                    localStorage.setItem("last_buddy_check", Date.now());
                    localStorage.setItem("buddy_list", JSON.stringify(buddyList));
                }
            });
        }
    }

    function highlightSolFrame(){
        if($('#entry-list').length == 0)
            return;

        var color_code;

        if($('body').hasClass('light-theme') == false){
            color_code = '#353535';
        }
        else{
            color_code = '#e0e0e0';
        }

        $('.topic-list.partial a').filter(function(){
            return 'https://eksisozluk.com' + $(this).attr('href') == window.location.href;
        }).css('background-color', color_code);
    }

    function searchInGoogle(){
        if($('#title').length == 0)
            return;

        var title = $('#title').attr('data-title');
        var itemStyle = "background: url('https://www.google.com.tr/favicon.ico') no-repeat; background-size: 1.2em 1.2em; padding-left: 1.2em; height: 1.2em; vertical-align: text-top;";

        if($('#topic-share-menu').length == 0){
            $('.sub-title-menu').prepend('<a id="arastir-google" href="https://www.google.com.tr/search?q=' + encodeURIComponent(title) + '" target="_blank" style="' + itemStyle + '"></a>');
        }
        else{
            $('#topic-share-menu').after('<a id="arastir-google" href="https://www.google.com.tr/search?q=' + encodeURIComponent(title) + '" target="_blank" style="' + itemStyle + '"></a>');
        }
    }

    function extendBasliktaAra(){
        if($('#in-topic-search-options').length == 0)
            return;

        //get variables
        var title = $('#title').data('title')
        var link = '/' + $("#title").data("slug") + "--" + $("#title").data("id");
        var nick = $('#top-navigation a:contains("ben")').attr('title');

        //add static links
        var html =   '<li><a title="bu başlıktaki en beğenilenleri gör" href="' + link + '?a=search&searchform.niceonly=true">güzelinden</a>';
            html +=  '<li><a title="bu başlıktaki kendi yazdığın güzelindenleri gör" href="' + link + '?searchform.author=' + nick + '&searchform.niceonly=true&a=search">benim güzeller</a>';
        $('#in-topic-search-options form').parent().before(html);

        //replace buddy link
        var buddyText = $('#in-topic-search-options a[data-caption="badi entry\'leri"]').text().replace('entry\'leri', '');
            buddyText = (buddyText == "") ? 'badi (0)' : buddyText;
        $('#in-topic-search-options a[data-caption*="badi entry\'leri"]').remove();
        $('#in-topic-search-toggle').text('başlıkta ara');
        $('#in-topic-search-menu').before('<a href="' + link + '?a=buddy">' + buddyText + '</a>');

        //add additional search links
        var sites = [
                {name: 'google görseller', url: 'https://www.google.com.tr/search?tbm=isch&q=', icon: 'https://www.google.com.tr/favicon.ico'},
                {name: 'vikipedi', url: 'http://tr.wikipedia.org/w/index.php?title=%C3%96zel:Ara&fulltext=Ara&search=', icon: 'https://tr.wikipedia.org/favicon.ico'},
                {name: 'youtube', url: 'https://www.youtube.com/results?search_query=', icon: 'https://www.youtube.com/favicon.ico'},
                {name: 'imdb', url: 'http://www.imdb.com/find?ref_=nv_sr_fn&s=all&q=', icon: 'http://www.imdb.com/favicon.ico'},
                {name: 'ekşi duyuru', url: 'http://www.eksiduyuru.com/index.php?m=ara&qu=&qc=-1&qs=b&q=', icon: 'https://www.eksiduyuru.com/favicon.ico'}
        ];

        GM_addStyle("#searchLinks { border-bottom:1px solid #a6a6a7; padding-top: 3px; padding-bottom: 3px; }" +
                    "#searchLinks a { display: inline-block; text-align: center; width: 20%; vertical-align: top; text-decoration: none; height: 90px; padding: 5px;  }" +
                    "#searchLinks a:hover {background-color: #e0e0e0; }" +
                    "#searchLinks img { width: 30px; }" +
                    "#searchLinks span { display:block; }");

        var searchLinks =  "<div id='searchLinks'>";

        for(i=0; i<sites.length; i++){
            searchLinks += "<a target='_blank' href='" + sites[i].url + encodeURIComponent(title) + "'>" +
                               "<img src='" + sites[i].icon + "'>" +
                               "<span>" + sites[i].name + "</span>" +
                           "</a>";
        }

        searchLinks += "</div>";
        $("#in-topic-search-options").prepend(searchLinks);
    }

    function hideSpoiler(){
        if($('#title').length == 0)
            return;

        GM_addStyle(".spoilerContainer { border: 1px solid #a6a6a7; display: none; box-shadow: 0 2px 3px 2px rgba(0,0,0,.03); padding: 0 5px 5px 5px; }" +

                    ".spoilerButton { padding: 2px; }" +
                    ".light_white .spoilerButton { background-color: #f7f7f7; }" +
                    ".light_gray .spoilerButton { background-color: #e6e6e6; }" +
                    ".light_sepia .spoilerButton { background-color: #efeae0; }" +
                    ".dark-theme .spoilerButton { background-color: #353535; }" +

                    ".spoilerButton .expandSpoilerIcon { margin-left: 5px; }");

        $('.content:contains("spoiler")').each(function() {
            var open = false;
            var result = $();
            $(this).contents().each(function() {
                if ($(this).is('a:contains("spoiler").b')) {
                    if (open) {
                        $(this).hide();
                        result.wrapAll('<div class="spoilerContainer" data-spoilertext="' + $(this).text() + '"></div>');
                        open = false;
                    }
                    else {
                        $(this).hide();
                        result = $();
                        open = true;
                        $(this).parents(".content").css("max-height", "none");
                    }
                }
                else {
                    if ($(this).text().indexOf('---') != -1 && open)
                        $(this).remove();
                    else
                        result = result.add($(this));
                }
            });
        });

        $('.spoilerContainer').each(function(){
            $(this).before('<a class="spoilerButton" type="button"><span>' + $(this).data('spoilertext') + '</span><span class="expandSpoilerIcon">[+]</span></a>');
        });

        $('.spoilerButton').click(function(){
            $(this).find(".expandSpoilerIcon").text(function(i, text){
                return text === "[+]" ? "[-]" : "[+]";
            });

            $(this).next('.spoilerContainer').toggle();
        });
    }

    function showGbkz(){
        if($('#title').length == 0)
            return;

        $('sup.ab a').html(function(){
            return '(*:' + $(this).attr('data-query') + ')';
        });
    }

    function modifyNavigationBar(){
        //move visible channel links
        $('#quick-index-nav .nav-channel-item').each(function(){
            $("#quick-index-nav .dropdown-menu").prepend("<li>" + $(this).html() + "</li>");
            $(this).remove();
        });

        var today = new Date(), months = ["ocak", "şubat", "mart", "nisan", "mayıs", "haziran", "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık"];
        var bugunOlanlarKeywords = today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();
        var bugunOlanlarUrl = "/basliklar/ara?SearchForm.Keywords=" + bugunOlanlarKeywords + "&SearchForm.Author=&SearchForm.When.From=&SearchForm.When.To=&SearchForm.NiceOnly=false&SearchForm.FavoritedOnly=false&SearchForm.SortOrder=Date";
        $('#quick-index-nav li a:contains("tarihte bugün")').parent().after('<li><a href="' + bugunOlanlarUrl + '">bugün olanlar</a></li>');

        //style for outsider subetha items
        GM_addStyle(".dropdown-menu .subetha-item-outside { padding: 0 5px; }" +
                    ".subetha-item-outside form { display: inline-block; }" +
                    ".subetha-item-outside form input[type='submit'] { background:none !important; border:none; padding:0 !important; font:inherit; cursor: pointer; color: inherit !important; font-weight:inherit; width: 100%; text-align: left; }");

        //shortcut for ekşi duyuru
        var token = $("input[name='__RequestVerificationToken']").val();
        $('#quick-index-nav').append('<li class="subetha-item-outside">' +
                                         '<a class="url">' +
                                             '<form action="/sub-etha/yardir" id="subetha-redirect-form" method="post" target="_blank">' +
                                                 '<input id="subetha-site-id" name="id" type="hidden" value="5">' +
                                                 '<input name="__RequestVerificationToken" type="hidden" value="' + token + '">' +
                                                 '<input type="submit" value="ekşi duyuru">'+
                                             '</form>'+
                                         '</a>' +
                                      '</li>');
        $(document).ready(function(){
            $(".subetha-item-outside a").off("click");
            $(".subetha-item-outside a").on("click", function(e){
                $(this).find("form").submit();
            });
        });

        //popup for other sub-etha sites
        $("#quick-index-nav").append("<li class='dropdown'>" +
                                         "<a class='dropdown-toggle' id='subetha-toplink'>sub-etha</a>" +
                                         "<ul class='dropdown-menu tall-dropdown toggles-menu' id='subetha-menu'>" +
                                         "</ul>" +
                                     "</li>");

        $("#subetha-toplink").click(function(){
            var toplink = $(this);

            if(!toplink.hasClass("subetha-loaded")){
                $("#subetha-menu").html('<img style="margin-top: 10px;" src="' + constants.loadingGif + '"></img>');

                $.ajax({
                    url: "/sub-etha",
                    type: 'GET',
                    beforeSend: function(xhr){ xhr.setRequestHeader('X-Requested-With', 'test'); },
                    success: function(data) {
                        $("#subetha-menu").html("");

                        var sites = [];
                        $(data).find("#sub-etha-sites h2 a").each(function(){
                            sites.push({id: $(this).data("subetha"),
                                        name: $(this).text()});
                        });

                        for(i=0;i<sites.length;i++){
                            $("#subetha-menu").append('<li class="subetha-item-outside">' +
                                                          '<form style="width: 100%;" action="/sub-etha/yardir" id="subetha-redirect-form" method="post" target="_blank">' +
                                                              '<input id="subetha-site-id" name="id" type="hidden" value="' + sites[i].id + '">' +
                                                              '<input name="__RequestVerificationToken" type="hidden" value="' + token + '">' +
                                                              '<input type="submit" value="' + sites[i].name + '" style="font-weight: 400;">'+
                                                          '</form>'+
                                                      '</li>');
                        }

                        toplink.addClass("subetha-loaded");
                    }
                });
            }
        });
    }

    function goToEntryDate(){
        if($("#entry-list").length === 0)
            return;

        var url = '/' + $('#title').attr('data-slug') + '--' + $('#title').attr('data-id'); // /pena--31782
        $('#entry-list .entry-date').each(function(){
            var entryDate = $(this).text().replace(/#[0-9]+/gi, '').replace(/~.*/gi, '').trim();
            var dateParts = entryDate.split(' ')[0].split('.');

            var date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
            var date2 = dateParts[2] + '-' + dateParts[1] + '-' + (parseInt(dateParts[0])+1);
            $(this).after('<a href="' + url + '?searchform.when.from=' + date + '&searchform.when.to=' + date2 + '&a=search" style="font-size: 75%; margin-right: 1px; color: initial;" title="tarihe git"><></a>');
        });
    }

    function getRandomEntry(){
        if($('#user-profile-title').length == 0)
            return;

        $("#profile-intro-header").css("position", "relative");
        $('#quote-entry').before('<span id="get-random-entry" style="position: absolute; top: 0; left: 0; width: 40px; height: 100%; z-index: 9; cursor:pointer;"></span>');

        $('#get-random-entry').click(function(){
            $('#quote-entry').html('<img style="margin-top:10px;" src="' + constants.loadingGif + '"></img>')

            var nick = $('#user-profile-title').attr('data-nick').replace(/ /g, '-');
            var url = '/basliklar/istatistik/' + nick + '/en-begenilenleri?p=';

            var maxPage = $('#profile-cards a[href*="en-begenilenleri"]').parent().find('small').text().toNum();
                maxPage = Math.ceil(maxPage/constants.titlePerPage);

            var page = getWeightedRandom(maxPage);

            $.ajax({
                url: url + page,
                type: 'GET',
                beforeSend: function(xhr){ xhr.setRequestHeader('X-Requested-With', 'test'); },
                success: function(data) {
                    var link = $(data).find('#content-body .topic-list a').eq( Math.floor(Math.random() * constants.titlePerPage) + 1 ).attr('href');

                    $.get(link, function(data){
                        var stuff = '<h2><a href="' + link + '">' + $(data).find('#title').text() + '</a></h2>';
                            stuff += '<div class="content">' + $(data).find('.content').html() + '</div>';
                            stuff += '<footer><span class="entry-date">' + $(data).find('.entry-date').html() + '</span></footer>';
                        $('#quote-entry').html(stuff);
                    });
                }
            });
        });

        function getWeightedRandom(limit){
            var a = Math.floor(Math.random() * 100);

            if(a<70){ //chance of 70 percent
                return Math.floor(Math.random() * Math.sqrt(limit)) + 1; //e.g. limit is 25, get random page from first sqrt(25)=5 pages
            }
            else{ //chance of 30 percent
                return Math.floor(Math.random() * (limit-Math.sqrt(limit))) + 1; //e.g. limit is 25, get random page from last 25-sqrt(25)=20 pages
            }
        }
    }

    function openProfileCards(){
        if($('#user-profile-title').length == 0)
            return;

        //add button style
        GM_addStyle(".openCardDetail:after { content: '[+]'; cursor: pointer; margin-left: 5px; }" +
                    ".openCardDetail:hover { text-decoration: underline; }");

        //add buttons
        $('#profile-cards h3').each(function(){
            $(this).append('<span class="openCardDetail" data-url="' + $(this).find("a").attr('href') + '" data-text="' + $(this).find("a").text() + '" data-count="' + $(this).find("small").text() + '"></span>');
        });

        //globals for this method
        var loaded = 0;
        var titleText = "";
        var links = [], pages = [];

        //click event for button
        $('.openCardDetail').click(function(){
            //save element
            var openButton = $(this);

            //get title of card
            titleText = $(this).data('text');

            //get page limit from card content count
            var pageLimit = Math.ceil($(this).data("count") / constants.titlePerPage);

            //initialize arrays
            for(var page=1; page<=pageLimit; page++){
                pages.push($(this).data('url') + '?p=' + page); //get page urls of card to array due to loading order
                links.push([]); //every page has its own container, because ajax calls are async and if they were added to same container, the page order would be wrong
            }

            //how many pages have been processed
            var tryCount = 0;

            //append count status text
            $(this).after('<small class="card-status">0 / ' + pageLimit + '</small>');

            //move through pages
            $.each(pages, function(index, value){
                $.ajax({
                    url: value,
                    type: 'GET',
                    beforeSend: function(xhr){ xhr.setRequestHeader('X-Requested-With', 'test'); },
                    success: function(data) {
                        tryCount++;
                        openButton.next('.card-status').text(tryCount + ' / ' + pageLimit);

                        $(data).find('#content-body .topic-list li').each(function(){
                            links[index].push($(this));
                        });
                        loaded = 1;
                    }
                });
            });
        });

        $(document).ajaxStop(function() {
            if(loaded == 1){
                //include style
                GM_addStyle('#buyukcard-div { margin-bottom: 10px; }' +
                            '#buyukcard-div .detail { display: inline; font-size: 0.9em; color: gray; }' +
                            '#buyukcard-div .detail:after { content: ")"; }' +
                            '#buyukcard-div .detail:before { content: "("; }');

                //initialize container
                var html = '<div id="buyukcard-div"><h2 id="buyukcard-topluyukle" title="hepsini aç">' + titleText + '</h2>';

                //fill the container
                for(i=0; i<links.length; i++){ //page
                    for(j=0; j<links[i].length; j++){ //item
                        html += "<div>" + (i*constants.titlePerPage + j + 1) + ") " + links[i][j].html() + "</div>";
                    }
                }

                //close the container
                html += '</div>';

                //scroll to new content place
                $('html, body').animate({
                    scrollTop: $("#profile-cards").offset().top + $("#profile-cards").height() - $("header").height() - 10
                }, 2000);

                //show the new content
                $('#profile-cards').after(html);

                //make entrys inlineable
                inlineEntry('#buyukcard-div a');

                //container title hidden event
                $('#buyukcard-topluyukle').click(function(){ $('#buyukcard-div a').click(); });

                loaded = 2;
                links = [], pages = [];
            }
        });
    }

    function autoSaveNotes(){
        if($('#user-profile-title').length == 0)
            return;

        var typingTimer;

        $('#user-note').keyup(function(){
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, 1000);
        });

        $('#user-note').keydown(function(){
            clearTimeout(typingTimer);
        });

        function doneTyping(){
            $('#user-note-form button[class="primary"]').click();
        }
    }

    function extendAside(){
        GM_addStyle(".custom-aside-item { margin-top: 25px; padding-top: 10px; padding-bottom: 10px; padding-left: 8px; padding-right: 8px; }" +
                    ".custom-aside-item li>a { display: block; padding: 4px 0; }" +
                    ".custom-aside-item li>a:hover { text-decoration: none; }" +

                    ".light_white .custom-aside-item { background-color: #f7f7f7; }" +
                    ".light_gray .custom-aside-item { background-color: #e6e6e6; }" +
                    ".light_sepia .custom-aside-item { background-color: #efeae0; }" +
                    ".dark-theme .custom-aside-item { background-color: #353535; }" +

                    ".light_white .custom-aside-item li>a:hover { background-color: #DDDDDD; }" +
                    ".light_gray .custom-aside-item li>a:hover { background-color: #CCCCCC; }" +
                    ".light_sepia .custom-aside-item li>a:hover { background-color: #D5D1C8; }");

        entrysByDate();
        operations(); //maybe have a better name
        newTrackedTitles();
        newMessages();
        similarTopics();
        showEntryList();
        kimdirNedir();

        function entrysByDate(){
            if($('#entry-list').length === 0)
                return;

            if(window.location.pathname == "/")
                return;

            GM_addStyle("#pop-div .preset { margin-bottom: 10px; }" +
                        "#pop-div .preset a { display: inline-block; margin-right: 5px; }" +
                        "#pop-div .preset a:after { content: '∙'; margin-left: 5px; }" +
                        "#pop-div .preset a:last-child { margin-right: 0; }" +
                        "#pop-div .preset a:last-child:after { content: ''; margin-left: 0; }" +
                        "#pop-div .interval input[type='date'] { width: 130px; display: inline-block;} " +
                        "#pop-div .interval input[type='date']:first-child { margin-right: 5px; } " +
                        "#pop-div .interval .seperator { margin-right: 5px; } " +
                        "#pop-div .interval input[type='button'] { display: inline-bblock; margin-top: 5px; } " +
                        "#pop-div .interval #pop-status { margin-left: 5px; }");

            //date variables
            var currentTime = new Date();
            var currentTimestamp = currentTime.getTime();

            //add the panel
            $('#aside').append('<section class="custom-aside-item" id="pop-div">' +
                                   '<h2>tarihe göre</h2>' +
                                   '<div class="preset">' +
                                       '<a data-timestamp="' + (currentTimestamp - 1000*60*60*24) + '">geçen 1 gün</a>' +
                                       '<a data-timestamp="' + (currentTimestamp - 1000*60*60*24*7) + '">geçen 1 hafta</a>' +
                                       '<a data-timestamp="' + (currentTimestamp - 1000*60*60*24*30) + '">geçen ay</a>' +
                                       '<a data-timestamp="' + (currentTimestamp - 1000*60*60*24*30*12) + '">geçen yıl</a>' +
                                   '</div>' +
                                   '<div class="interval">' +
                                       '<input type="date" id="pop-date">' +
                                       '<span class="seperator">~</span>' +
                                       '<input type="date" id="pop-date2">' +
                                       '<input type="button" value="göster" class="primary" id="pop-button">' +
                                       '<span id="pop-status"></span>' +
                                   '</div>' +
                                '</section>');

            //set default values (one year interval)
            $("#pop-date").val((currentTime.getFullYear()-1) + "-" + (currentTime.getMonth()+1) + "-" + (currentTime.getUTCDate() < 10 ? "0" : "") + currentTime.getUTCDate());
            $("#pop-date2").val(currentTime.getFullYear() + "-" + (currentTime.getMonth()+1) + "-" + (currentTime.getUTCDate() < 10 ? "0" : "") + currentTime.getUTCDate());

            //preset values click event
            $("#pop-div .preset a").click(function(){
                var presetTime = new Date($(this).data("timestamp"));
                $("#pop-date").val(presetTime.getFullYear() + "-" + (presetTime.getMonth()+1) + "-" + (presetTime.getUTCDate() < 10 ? "0" : "") + presetTime.getUTCDate());
            });

            //button click event
            $('#pop-button').click(function(){
                var timestampStart = new Date($('#pop-date').val());
                var timestampEnd = new Date($('#pop-date').val());
                var link = "/" + ek$i.topic.slugPair() + '?a=nice&p=';
                var pageLimit = parseInt($('.pager').attr('data-pagecount'));
                    pageLimit = isNaN(pageLimit) ? 1 : pageLimit;
                    pageLimit = pageLimit > 400 ? Math.ceil(Math.sqrt(pageLimit)) : 20;
                var pageArray = [];
                    for(var i=0; i<pageLimit; i++) pageArray[i] = i+1;
                var result = [];
                    for(i=0; i<pageLimit; i++) result[i] = [];

                var currentPage = 0;
                $.each(pageArray, function(i, page){
                    $.get(link + page, function(data){
                        currentPage++;
                        $('#pop-status').text(currentPage + ' / ' + pageLimit);

                        $lis = $(data).find('#entry-list>li');
                        $.each($lis, function(j, li){
                            var entryDate = $(li).find('.entry-date').text();
                                entryDate = entryDate.substring(0, entryDate.indexOf(" "));

                            var dateParts = entryDate.split('.');
                            var entryTimestamp = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0]);

                            if(entryTimestamp > timestampStart && entryTimestamp > timestampEnd){
                                result[i].push(li);
                            }
                        });

                        if(currentPage == pageLimit){
                            var found = 0;
                            $('#entry-list').empty();
                            for(i=0; i<result.length; i++){
                                for(j=0; j<result[i].length; j++){
                                    if(result[i][j] != null){
                                        $('#entry-list').append( result[i][j] );
                                        found = 1;
                                    }
                                }
                            }

                            if(found == 0){
                                $('#entry-list').append('<p style="text-align: center;">belirtilen tarih aralığında hiç sonuç bulunamadı</p>');
                            }

                            showEntryList();
                            ek$i.entryMenu.attach($("#entry-list > li:not([data-menu-attached])"), ek$i.topic.title);
                            hideSpoiler();
                        }
                    });
                });
            });
        }

        function operations(){
            $('#aside').append('<section class="custom-aside-item" id="operations-container">' +
                                   '<h2>işlemler</h2>' +
                                   '<ul class="operations"></ul>' +
                               '</section>');

            showImages();
            loadDebe();
            loadBuddyEntries();
            loadFavsOfBuddys();

            //if there is no option do not show the panel
            if($("#operations-container .operations *").length == 0){
                $("#operations-container").remove();
            }

            function showImages(){
                if($('#entry-list').length === 0)
                    return;

                var images = $("#entry-list a.url").filter(function(){
                    return this.getAttribute("href").match(/\.(jpe?g|gif|png)/);
                });

                if(images.length != 0){
                    $("#operations-container .operations").append('<a id="show-all-images"><span id="show-all-images-label">tüm resimleri göster</span> (<span id="show-all-images-count"></span>)</a>');

                    $("#show-all-images-count").text(images.length);
                    $("#show-all-images").click(function(){
                        //toggle all images
                        images.click();

                        //toggle operation text
                        if($(this).hasClass("images-loaded")){
                            $("#show-all-images-label").text("tüm resimleri göster");
                            $(this).removeClass("images-loaded");
                        }
                        else{
                            $("#show-all-images-label").text("tüm resimleri gizle");
                            $(this).addClass("images-loaded")
                        }

                        //nothing more
                        return false;
                    });
                }
            }

            function loadDebe(){
                if($('#user-profile-title').length === 0)
                    return;
                if($('#top-navigation a:contains("ben")').attr('title') != $('#user-profile-title').attr('data-nick'))
                    return;

                $('#operations-container .operations').append('<li><a class="primary" id="debe-label">debe getir</a></li>');
                $('#debe-label').click(function(){
                    $.ajax({
                        url: '/debe',
                        type: 'GET',
                        beforeSend: function(xhr){ xhr.setRequestHeader('X-Requested-With', 'test'); },
                        success: function(data) {
                            //include style
                            GM_addStyle('#debe-container .detail { display: inline; font-size: 0.9em; color: gray; }' +
                                        '#debe-container .detail:after { content: ")"; }' +
                                        '#debe-container .detail:before { content: "("; }');

                            //initialize container
                            var html = '<div id="debe-container"><h2 id="debe-topluyukle">dünün en beğenilen entry\'leri</h2>';

                            //fill the container
                            $(data).find('#content-body .stats a').each(function(i, e){
                                html += "<div>" + (i+1) + ") " + $(this).parent().html() + "</div>";
                            });

                            //close the container
                            html += '</div>';

                            //add the container
                            $('#profile-cards').after(html);

                            //scroll to container
                            $('html, body').animate({
                                scrollTop: $("#debe-container").offset().top - $("header").height() - 15
                            }, 2000);

                            //make entrys inlineable
                            inlineEntry('#debe-container a');

                            //container title hidden event
                            $('#debe-topluyukle').click(function(){ $('#debe-container>div>a').click(); });
                        }
                    });
                });
            }

            function loadBuddyEntries(){
                if($('#user-profile-title').length == 0)
                    return;
                if($('#top-navigation a:contains("ben")').attr('title') != $('#user-profile-title').attr('data-nick'))
                    return;

                var loadVariables = {
                    name : "badi",
                    title : "badilerden gelenler",
                    url : "/basliklar/badientry?p="
                };

                loadEntryList(loadVariables);
            }

            function loadFavsOfBuddys(){
                if($('#user-profile-title').length == 0)
                    return;
                if($('#top-navigation a:contains("ben")').attr('title') != $('#user-profile-title').attr('data-nick'))
                    return;

                var loadVariables = {
                    name : "badifav",
                    title : "badilerin favladıkları",
                    url : "/basliklar/badifav?p="
                };

                loadEntryList(loadVariables);
            }

            function loadEntryList(obj){
                var entrys = []; //variable for fetched entrys
                var pageLimit = 0; //information for user, not effective
                var oldList = []; //list from local storage
                var limit = 0; //do we reached the last checked entry

                //get old list
                if(localStorage.getItem(obj.name + "entry_list")){
                    oldList = JSON.parse(localStorage.getItem(obj.name + "entry_list"));
                }

                //add the label
                $('#operations-container .operations').append('<li><a class="primary" id="' + obj.name + '-button">' + obj.name + ' yükle</a><small id="' + obj.name + '-status"></small></li>');

                //click event for label
                $('#' + obj.name + '-button').click(function(){
                    loadList();
                });

                function loadList(pageNumber){
                    if (typeof pageNumber === 'undefined') {
                        pageNumber = 1;
                    }

                    $.ajax({
                        url: obj.url + pageNumber,
                        type: 'GET',
                        beforeSend: function(xhr){ xhr.setRequestHeader('X-Requested-With', 'test'); },
                        success: function(data) {
                            //update status
                            updateStatus(obj.name, pageNumber, pageLimit);

                            //append entry elements
                            $(data).find('#content-body .topic-list li').each(function(){
                                if(oldList.indexOf($(this)[0].innerHTML) == -1){
                                    entrys.push($(this));
                                }
                                else{
                                    limit = 1;
                                    updateStatus(obj.name, pageNumber, pageNumber);
                                    return false;
                                }
                            });

                            if(limit == 0){
                                //check if it is done
                                if($(data).find(".full-index-continue-link-container").length != 0){ //if it is the first page
                                    loadList(2);
                                }
                                else{
                                    //check if it is the last page
                                    var pager = $(data).find("#content .pager");
                                    if(pager.data("currentpage") != pager.data("pagecount")){
                                        pageLimit = pager.data("pagecount");
                                        loadList(pageNumber+1);
                                    }
                                    else{
                                        //it is last page so show entrys
                                        showEntryList();
                                    }
                                }
                            }
                            else{
                                showEntryList();
                            }
                        }
                    });
                }

                function showEntryList(){
                    //save the list to local storage
                    var i, list = [];
                    for(i=0; i<entrys.length; i++){
                        list.push(entrys[i][0].innerHTML);
                    }
                    if(list.length == 0){
                        ek$i.addResponse("hiç yeni " + obj.name + " yokmuş", "info")
                        return;
                    }
                    else if(list != oldList){
                        localStorage.setItem(obj.name + "entry_list", JSON.stringify(list));
                    }

                    //insert style
                    GM_addStyle('#' + obj.name + '-container { margin-bottom: 10px; }' +
                                '#' + obj.name + '-container .detail {display: inline; font-size: 0.9em; color: gray;}' +
                                '#' + obj.name + '-container .detail:after {content: \')\';}' +
                                '#' + obj.name + '-container .detail:before {content: \'(\';}');

                    //initialize container
                    var html = '<div id="' + obj.name + '-container"><h2 id="' + obj.name + '-topluyukle" title="hepsini aç">' + obj.title + '</h2>';

                    //fill the container
                    for(i=0; i<entrys.length; i++){
                        html += (i + 1) + ') ' + entrys[i][0].innerHTML + '<br>';
                    }

                    //close the container
                    html += '</div>';

                    //add the container
                    $('#profile-cards').after(html);

                    //scroll to container
                    $('html, body').animate({
                        scrollTop: $("#" + obj.name + "-container").offset().top - $("header").height() - 15
                    }, 2000);

                    //make entrys inlineable
                    inlineEntry('#' + obj.name + '-container a');

                    //container title hidden event
                    $('#' + obj.name + '-topluyukle').click(function(){ $('#' + obj.name + '-container>a').click(); });
                }

                function updateStatus(name, current, max){
                    $('#' + name + '-status').text(' ' + current + ' / ' + max);
                }
            }
        }

        function newTrackedTitles(){
            if($('.tracked .new-update').length !== 0){
                $('#aside').append('<section class="custom-aside-item" id="olayBildirim">' +
                                        '<h2>olay</h2>' +
                                        '<ul class="topic-list partial">' +
                                            '<img src="' + constants.loadingGif + '"></img>' +
                                        '</ul>' +
                                   '</section>');
                $.ajax({
                    url: '/basliklar/olay',
                    type: 'GET',
                    beforeSend: function(xhr){ xhr.setRequestHeader('X-Requested-With', 'test'); },
                    success: function(data) {
                        var titles = $(data).find('#content .topic-list').find('a').not('.empty-index-item').parent();
                        if(titles.children().length === 0){
                            $('#olayBildirim').remove();
                            $('.tracked .new-update').removeClass('new-update');
                        }
                        else{
                            $('#olayBildirim ul').html(titles);
                            inlineEntry('#olayBildirim a');
                        }
                    }
                });
            }
        }

        function newMessages(){
            if($('.messages .new-update').length !== 0){
                $('#aside').append('<section class="custom-aside-item" id="mesajBildirim">' +
                                        '<h2>mesaj</h2>' +
                                        '<ul id="threads">' +
                                            '<img src="' + constants.loadingGif + '"></img>' +
                                        '</ul>' +
                                   '</section>');
                GM_addStyle('#mesajBildirim > ul h2{ font-size: 1.4em; }');

                $.ajax({
                    url: '/mesaj',
                    type: 'GET',
                    beforeSend: function(xhr){ xhr.setRequestHeader('X-Requested-With', 'test'); },
                    success: function(data) {
                        var messages = $(data).find('.unread').parent();
                        messages.find('input').remove();
                        messages.find('div').html('<a class="bildirim-mesaj-oku">okundu olarak işaretle</a>');
                        $('#mesajBildirim ul').html(messages);

                        $('.bildirim-mesaj-oku').click(function(){
                            $elem = $(this).closest('li');
                            $.ajax({
                                url: $elem.find('a').first().attr('href'),
                                type: 'GET',
                                beforeSend: function(xhr){ xhr.setRequestHeader('X-Requested-With', 'test'); },
                                success: function() {
                                    $elem.slideUp('fast', function(){
                                        $elem.remove();

                                        if($('#mesajBildirim li').length === 0){
                                            $('.messages .new-update').removeClass('new-update');
                                            $('#mesajBildirim').remove();
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            }
        }

        function similarTopics(){
            if($('#topic').length == 0)
                return;

            if(window.location.pathname == "/")
                return;

            $('#aside').append('<section class="custom-aside-item" id="benzer-basliklar"><h2>benzer</h2><ul id="benzer-div"></ul></section>');
            $('#benzer-basliklar').hide();

            $.get('/autocomplete/query?q=' + $('#title').attr('data-title'), function(data){
                if(data.Titles.length > 1 && $('#topic').length > 0){
                    for(i=1; i<data.Titles.length; i++){
                        $('#benzer-div').append('<li><a href="/?q=' + data.Titles[i] + '">' + data.Titles[i] + '</a></li>');
                    }
                    $('#benzer-basliklar').show();
                }
                else{
                    $('#benzer-basliklar').remove();
                }

                if(data.Nicks.length > 0 && $('#topic').length > 0){
                    $('#title').append('<a href ="/biri/' + data.Nicks[0].replace(/ /g, '-') + '" target="_blank"><svg class="eksico" style=" font-size: 0.6em; "><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#eksico-me" title="yazara git"></use></svg></a>');
                }
            });
        }

        function showEntryList(){
            if($('#topic').length == 0)
                return;

            if($('#entry-list>li').length == 0)
                return;

            if($('#side-entry-list').length == 0){
                $('#aside').append('<section class="custom-aside-item" id="side-entry-list"><h2>entry\'ler</h2><ul id="entry-div"></ul></section>');
            }
            else{
                $('#entry-div').empty();
            }

            GM_addStyle(".light_white #side-entry-list .entrylist-item.yesBuddy { background-color: #DDDDDD; }" +
                        ".light_gray #side-entry-list .entrylist-item.yesBuddy { background-color: #CCCCCC; }" +
                        ".light_sepia #side-entry-list .entrylist-item.yesBuddy { background-color: #D5D1C8; }" +
                        ".dark-theme #side-entry-list .entrylist-item.yesBuddy { background-color: #1f1f1f; }" +
                        "#side-entry-list li { overflow: hidden; }");

            var buddyList = JSON.parse(localStorage.getItem("buddy_list"));

            var ins = "";
            $('#topic #entry-list>li').each(function(){
                var isBuddy = ($.inArray($(this).data('author'), buddyList) != -1) ? "yesBuddy" : "";
                ins += '<li><a data-id="' + $(this).data('id') + '" class="entrylist-item ' + isBuddy + '" onclick="return false;">#' + $(this).data('id') + '/@' + $(this).data('author') + '</a></li>';
            });

            $('#entry-div').append(ins);
            $('.entrylist-item').click(function(){
                if(window.location.pathname == "/"){
                    topPos = $('li[data-id="' + $(this).data('id') + '"]').offset().top - $('header').height() - $("#title").height()*(2.5);
                }
                else{
                    topPos = $('li[data-id="' + $(this).data('id') + '"]').offset().top - $('header').height() - 3;
                }
                $("html, body").animate({ scrollTop: topPos }, 500);
            });
        }

        function kimdirNedir(){
            if ($('#user-profile-title').length === 0)
                return;

            var pageList = ["https://eksisozluk.com/sozlukculerin-facebook-sayfalari--1730049?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-twitter-sayfalari--2020198?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-instagram-sayfalari--3607318?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-tumblr-sayfalari--2142966?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-last-fm-sayfalari--1474861?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-google-sayfalari--2899905?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-deviantart-sayfalari--1121218?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-bloglari--727379?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-web-sayfalari--1502030?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-connected2-me-sayfalari--3001823?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-soundcloud-sayfalari--2497463?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-about-me-sayfalari--2519123?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-flickr-sayfalari--1478098?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-youtube-sayfalari--1582211?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-8tracks-sayfalari--2449462?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-github-sayfalari--2742991?a=search&author=",
                            "https://eksisozluk.com/sozlukculerin-ask-fm-sayfalari--3496951?a=search&author="];

            var regexList = ["facebook.com",
                             "twitter.com",
                             "instagram.com",
                             "tumblr.com",
                             "last.fm",
                             "plus.google.com",
                             "deviantart.com",
                             "http",
                             "http",
                             "connected2.me",
                             "soundcloud.com",
                             "about.me",
                             "flickr.com",
                             "youtube.com",
                             "8tracks.com",
                             "github.com",
                             "ask.fm"];

            var imageList = ["https://i.hizliresim.com/Yqr5oE.png",
                             "https://i.hizliresim.com/AngR1v.png",
                             "https://i.hizliresim.com/ErpaDz.png",
                             "https://i.hizliresim.com/OV7dmz.png",
                             "https://i.hizliresim.com/DB4kpZ.png",
                             "https://i.hizliresim.com/bkJ43G.png",
                             "https://i.hizliresim.com/2n8QAL.png",
                             "https://i.hizliresim.com/41bRBJ.png",
                             "https://i.hizliresim.com/Wg1rMN.png",
                             "https://i.hizliresim.com/ZM71Gk.jpg",
                             "https://i.hizliresim.com/r6ZdP1.png",
                             "https://i.hizliresim.com/0lm2Oo.png",
                             "https://i.hizliresim.com/yNLnb7.png",
                             "https://i.hizliresim.com/o0rzbq.png",
                             "https://i.hizliresim.com/PnPEyb.png",
                             "https://i.hizliresim.com/r6ZdWz.png",
                             "https://i.hizliresim.com/X9LYVO.png"];

            //add page elements
            $('#aside').append('<section class="custom-aside-item">' +
                                   '<h2>kimdir nedir <small id="kimdirnedir-status"></small></h2>' +
                                   '<div id="kimdirnedir-container">' +
                                       '<input type="button" value="getir" class="primary" id="kimdirnedir-button">' +
                                   '</div>' +
                               '</section>');

            //click event for getir button
            $('#kimdirnedir-button').click(function() {
                //remove the button
                $(this).remove();

                //show loading container
                $('#kimdirnedir-container').append('<img style="display: block; margin-bottom: 8px;" src="' + constants.loadingGif + '"></img>');

                //get author name
                var nick = $('#user-profile-title').attr('data-nick').replace(/ /g, '-');
                var tryCount = 0;

                $.each(pageList, function(index, page) {
                    $.ajax({
                        url: page + nick,
                        type: 'GET',
                        beforeSend: function(xhr){ xhr.setRequestHeader('X-Requested-With', 'test'); },
                        complete: function(data){
                            //increment the page count
                            tryCount++;

                            //update the information
                            $('#kimdirnedir-status').text('(' + tryCount + ' / ' + pageList.length + ')');

                            //if all pages have been fetched
                            if(tryCount == pageList.length){
                                //remove the loading image
                                $("#kimdirnedir-container>img").remove();

                                //if there is no result
                                if($("#kimdirnedir-container a").length == 0){
                                    $("#kimdirnedir-container").text("hiç yokmuş");
                                }
                            }
                        },
                        success: function(data) {
                            //look for actual link
                            var matches = $(data).find(".content a[href*='" + regexList[index] + "']");

                            //check if any link exists
                            if(matches.length !== 0) {
                                //append the link
                                var url = matches.first().attr('href');
                                $('#kimdirnedir-container').append('<a style="margin-right: 5px;" href="' + url + '" target="_blank"><img src="' + imageList[index] + '" style="width: 50px;"></a>');
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown){
                            //
                        }
                    });
                });
            });
        }
    }

    function inlineTwitter(){
        if($('#entry-list').length === 0)
            return;

        GM_addStyle(".content a[href*='twitter.com/'][href*='/status/'] { text-decoration: underline; }" +
                    ".content.tw_open { max-height: none !important; }" +
                    ".tw-error { border: solid 1px gray; padding: 3px; display: block; }");

        $(".content a[href*='twitter.com/']").click(function(){
            if(!$(this).attr("href").match(/status/)){
                return;
            }

            var tweet_id = $(this).attr('href').replace("#!\/", "").split("/")[5];

            if($(this).hasClass('tw_open')){
                $('#tw-' + tweet_id).toggle();

                $(this).removeClass('tw_open');
                $(this).addClass('tw_close');
                $(this).parents(".content").removeClass('tw_open');
            }
            else if($(this).hasClass('tw_close')){
                $('#tw-' + tweet_id).toggle();

                $(this).removeClass('tw_close');
                $(this).addClass('tw_open');
                $(this).parents(".content").addClass('tw_open');
            }
            else{
                var html = '<div id="tw-' + tweet_id + '"><img style="margin-top: 5px;" src="' + constants.loadingGif + '"></img></div>';
                $(this).addClass('tw_open');
                $(this).parents(".content").addClass('tw_open');
                $(this).after(html);

                $.getJSON("https://api.twitter.com/1/statuses/oembed.json?id=" + tweet_id + "&callback=?", function(data) {
                    $('#tw-' + tweet_id).html(data['html']);
                }).fail(function(XMLHttpRequest, textStatus, errorThrown){
                    $('#tw-' + tweet_id).html("<span class='tw-error'>olmadı. açıklama: " + XMLHttpRequest.status + " " + errorThrown + "</span>");
                });
            }

            return false;
        });
    }

    function inlineYoutube(){
        if($('#entry-list').length === 0)
            return;

        GM_addStyle(".content a[href*='youtube.com/watch?v='], .content a[href*='youtu.be/'] { text-decoration: underline; }" +
                    ".content.yt_open { max-height: none !important; }" +
                    ".yt_container { position: relative; width: 100%; height: 0; padding-bottom: 56.25%; }" +
                    ".yt_container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }");

        $(".content a[href*='youtube.com/watch?v='] , .content a[href*='youtu.be/']").click(function(){
            var linkParts = $(this).attr('href').split(/^.*?(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*)(?:(\?t|&start)=(\d+))?.*/)
            var yt_id = linkParts[2];
            var yt_time = linkParts[4];

            if( $(this).hasClass('yt_open') ){
                $('#yt-' + yt_id).toggle();
                $('#yt-' + yt_id + " iframe")[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

                $(this).removeClass('yt_open');
                $(this).addClass('yt_close');
                $(this).parents(".content").removeClass('yt_open');
            }
            else if( $(this).hasClass('yt_close') ){
                $('#yt-' + yt_id).toggle();

                $(this).removeClass('yt_close');
                $(this).addClass('yt_open');
                $(this).parents(".content").addClass('yt_open');
            }
            else{
                $(this).addClass('yt_open');
                $(this).parents(".content").addClass('yt_open');

                var html = '<div class="yt_container" id="yt-' + yt_id + '">';
                    html +=    '<iframe src="https://www.youtube.com/embed/' + yt_id + '?start=' +  yt_time + '&enablejsapi=1" frameborder="0" allowfullscreen></iframe>';
                    html += '</div>';

                $(this).after(html);
            }
            return false;
        });
    }

    function inlineEntry(selector){
        //include style
        GM_addStyle('.entrygom-div { display:block; border:solid 1px #888888; box-shadow: 5px 5px 5px #888888; margin-bottom: 7px; padding-left: 7px; padding-top: 7px; padding-bottom: 10px; padding-right: 7px; }' +
                    '.entrygom-div #title { padding-left: 0px; padding-right: 0px; text-indent: 0; }' +
                    '.entrygom-div #entry-list { text-indent: 0; padding-left: 0px; padding-right: 0px; margin-top: 10px; margin-bottom: 0px; }' +
                    '.entrygom-div #entry-list footer .rate-options { display: inline-block !important; }' +
                    '.entrygom-div span:before { content: "" !important; }' +
                    '.entrygom-div span:after { content: "" !important; }' +
                    '.entrygom-div span { color: inherit !important; }' +
                    '.entrygom-div a { font-weight: inherit !important; }' +
                    '.entrygom-div li:before { content: "" !important; }');

        var messageFormInjected = 0;

        //look for each link
        $(selector).each(function(){
            //make it underlined
            $(this).css('text-decoration', 'underline');

            //click event for link
            $(this).click(function(){
                if($(this).hasClass('entrygom-open') === false && $(this).hasClass('entrygom-close') === false){ //if the link have been never touched
                    //show the loading gif
                    $(this).after('<div class="entrygom-div">' +
                                      '<img style="margin-top: 5px;" src="' + constants.loadingGif + '"></img>' +
                                  '</div>');
                    var entrygomDiv = $(this).next('.entrygom-div');

                    //load the text
                    $.ajax({
                        url: $(this).attr('href'),
                        type: 'GET',
                        beforeSend: function(xhr){ xhr.setRequestHeader('X-Requested-With', 'test'); },
                        success: function(data) {
                            //get content
                            entrygomDiv.html(""); //flush container
                            entrygomDiv.append($(data).find("#title")[0].outerHTML); //get title with attributes
                            entrygomDiv.append($(data).find("#entry-list")[0].outerHTML); //get entry with attributes
                            entrygomDiv.append($(data).find("#favorite-link-template")[0].outerHTML); //get entry menu helper elements
                            entrygomDiv.append($(data).find("#delete-self-form")[0].outerHTML); //get entry menu helper elements

                            if(messageFormInjected == 0){
                                entrygomDiv.append($(data).find("#message-send-form")[0].outerHTML); //get entry menu helper elements
                                messageFormInjected = 1;
                            }

                            //make content realistic
                            ek$i.entryMenu.attach(entrygomDiv.find("#entry-list > li:not([data-menu-attached])"), entrygomDiv.find("#title").data("title"));

                            //read more link
                            var entrylist = entrygomDiv.find("#entry-list > li");
                            entrylist.each(function(){
                                var entryContent = $(this).find(".content"),
                                    entryHeight = entryContent.innerHeight(),
                                    scrollHeight = entryContent[0].scrollHeight,
                                    clickEvent;

                                if (entryHeight <= scrollHeight) {
                                    if (entryHeight / scrollHeight >= .666) {
                                        entryContent.addClass("content-expanded");
                                    }
                                    else{
                                        var readmoreWrapper = document.createElement("span"),
                                            readmoreLink = document.createElement("a"),
                                            readmoreText = document.createTextNode("devamını okuyayım...");

                                        readmoreWrapper.className = "read-more-link-wrapper";
                                        readmoreLink.appendChild(readmoreText);

                                        clickEvent = $(readmoreLink).on("click", function() {
                                            entryContent.addClass("content-expanded").removeClass("content-faded");
                                            $(this).remove()
                                        });

                                        $(readmoreWrapper).append(clickEvent);
                                        entryContent.after($(readmoreWrapper));
                                    }
                                }
                            });

                            //make title target=_blank
                            $(entrygomDiv).find("#title a").attr("target", "_blank");
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown){
                            entrygomDiv.html("olmadı. açıklama: " + XMLHttpRequest.status + " " + errorThrown);
                        }
                    });

                    $(this).addClass('entrygom-open');
                    $(this).parents(".content").css("max-height", "none");
                }
                else if($(this).hasClass('entrygom-open')){
                    $(this).next('.entrygom-div').toggle();

                    $(this).removeClass('entrygom-open');
                    $(this).addClass('entrygom-close');
                }
                else if($(this).hasClass('entrygom-close')){
                    $(this).next('.entrygom-div').toggle();

                    $(this).removeClass('entrygom-close');
                    $(this).addClass('entrygom-open');
                }

                return false;
            });
        });
    }

    function quickMessageHistory(){
        if($('#entry-list').length === 0)
            return;

        GM_addStyle('#mesaj-tarihcesi li { list-style-type: none; }' +
                    '#mesaj-tarihcesi li article { margin: 0; padding-bottom: 5px; }' +
                    '#mesaj-tarihcesi li article > a { padding: 5px 5px 0 5px; display: block; text-decoration: none; color: #000; margin-right: 25px; }' +
                    '#mesaj-tarihcesi li article footer { padding: 0px 0px 0px 5px; }' +
                    '#mesaj-tarihcesi li article h2 small{ color: #666; font-size: .7em; }' +
                    '#mesaj-tarihcesi li article h2 small:before { content: \'(\'; }' +
                    '#mesaj-tarihcesi li article h2 small:after { content: \')\'; }' +
                    '#mesaj-tarihcesi li article:hover { background-color: #d8d8d8; }');

        $(document).ready(function(){
            $('#entry-list .info a[title="mesaj at"]').click(function(){
                $('#mesaj-tarihcesi').remove();
                $('#message-send-form').append('<div id="mesaj-tarihcesi"><img style="margin-top: 10px;" src="' + constants.loadingGif + '"></img></div>');
                var nick = $(this).parents(".info").find('.entry-author').attr("href").replace("/biri/", '');

                $.get('/mesaj/ara?keywords=' + nick, function(data){
                    if($(data).find('#threads').length == 0){
                        $('#mesaj-tarihcesi').html('hiç eski mesaj yokmuş');
                    }
                    else{
                        $('#mesaj-tarihcesi').html($(data).find('#threads').html());
                        $('#mesaj-tarihcesi').find('input').remove();
                        $('#mesaj-tarihcesi').find('footer div').remove();
                    }
                });
            });
        });
    }

    function showSearchformLengthLimit() {
        $('#search-textbox').on('keyup keydown', function() {
            if ($(this).val().length > 50){
                $(this).css('background-color', '#fcc');
            }
            else{
                $(this).css('background-color', '#fff');
            }
        });
    }

    function makeRelationPageWide(){
        if($('.relation-list').length == 0)
            return;

        GM_addStyle('.relation-list li { display: inline-block !important; }');
    }

    function inlineImage(){
        if($('#entry-list').length === 0)
            return;

        GM_addStyle(".inline-image-container { max-width: 99%; display: block; margin: 3px 3px 20px; background: padding-box padding-box #f8f8ff; border: 3px solid rgba(243, 243, 243, 0.6); border-radius: 2px; box-shadow: #666666 0px 0px 2px; }");

        $("#entry-list a.url")
            .filter(function(){
               return this.getAttribute("href").match(/\.(jpe?g|gif|png)/);
            })
            .css('text-decoration', 'underline')
            .click(function(){
                $(this).parents(".content").css("max-height", "none");

                if(!$(this).hasClass('image_loaded')){
                    $(this).after("<img class='inline-image-container' src='" + $(this).attr("href") + "'></img>");

                    $(this).addClass('image_open');
                    $(this).addClass('image_loaded');
                }
                else{
                    $(this).next('.inline-image-container').toggle();

                    if($(this).hasClass('image_open')){
                        $(this).removeClass('image_open');
                    }
                    else{
                        $(this).addClass('image_open');
                    }
                }
                return false;
            });
    }
}