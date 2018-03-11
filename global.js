var tweetListData = [];

$(document).ready(function () {
    // getLog();


    actionsSupp();
    $('#actionsSupp table tbody').on('click', 'td a.reloadcloud', reloadCloud);
    $('#actionsSupp table tbody').on('click', 'td a.deleteall', deleteAll);
    $('#actionsSupp table tbody').on('click', 'td a.getnewtweets', getNewTweets);
    $('#actionsSupp table tbody').on('click', 'td a.correctall', correctAll);
    $('#actionsSupp table tbody').on('click', 'td a.showlog', showlog);
    $('#actionsSupp table tbody').on('click', 'td a.supplog', supplog);
    populateTable();
    $('#tweetList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    $('#tweetList table tbody').on('click', 'td a.linkdeletetweet', deleteTweet);
    $('#tweetList table tbody').on('click', 'td a.reloadcloud', reloadCloud);
    $('#btnAddKeyWord').on('click', addKeyWords);
    $('#btnRemoveKeyWords').on('click', removeKeyWords);
    $('#btnFichier').on('click', loadFichier);


});

function showlog(event) {
    event.preventDefault();

    if (document.getElementById("logbox").style.display === "none") {
        // document.getElementsByClassName("infos").style.display = "none";
        document.getElementById("logbox").style.display = "inline";
    }
    else {

        document.getElementById("logbox").style.display = "none";
        // document.getElementsByClassName("infos").style.display = "inline";

    }    
}

function supplog(event) {
    event.preventDefault();

    $.ajax({
        type: 'DELETE',
        url: '/tweets/supplog',
    }).done(function (response) {

        if (response.msg === '') {

            
            getLog();

        }
        else {

            alert('Error: ' + response.msg);
        }
    });

}



function actionsSupp() {
    // var nbc = count();
    // $("div #listKeyWords").append(count());

    var tableContent = '';
    nbl = getLog();
    $.getJSON('/tweets/tweets', function (data) {
        tweetListData = data;

        tableContent += '<tr>';
        tableContent += '<td class="linkcloud" id="linkcloud"><a href="#" class="reloadcloud"><button id="btnbleu">Générer</button></a></td>';
        tableContent += '<td class="deleteall"><a href="#" class="deleteall"><button id="btnrouge">Tout supprimer</button></a></td>';
        tableContent += '<td id="getnewtweets"><a href="#" class="getnewtweets"><button id="btnbleu">Récupérer 15 tweets</button></td>';
        tableContent += '<td id="correctall"><a href="#" class="correctall"><button id="btnvert">Tout corriger</button></a></td>';
        tableContent += '<td id="showlog"><a href="#" class="showlog"><button id="btnvert"><span id="logcount">Log ' + '</span></button></a></td>';
        tableContent += '<td id="supplog"><a href="#" class="supplog"><button id="btnrouge"><span id="logcount">Supp log</span></button></a></td>';
        tableContent += '</tr>';


        $('#actionsSupp table tbody').html(tableContent);

    });


    $.getJSON('/tweets/keywords', function (data) {
        tweetListData = data;
        motcle = "test";
        var tableContent2 = '';
        var txt1 = "<strong>" + motcle + "  </strong>";

        $.each(data, function () {

            tableContent2 = "<strong class='listKeyWords'> " + this.keyword + " </strong>";

            $("div #listKeyWords").append(tableContent2);

        });


        $('#addKeyWords fieldset input').val('');


    });

};
        var nblog = 0;


function getLog() {
    var tableContent = '';
    var nblog = 0;


    $.getJSON('/tweets/getlog', function (data) {

        tweetListData = data;


        $.each(data, function () {
            nblog++;
            if (this.log === "Suppression de tous les tweets")
            {
                tableContent += "<strong><font color='red'>" + this.log + "</font></strong>";

            }
            else if (this.log === "Récupération de tweets...")
            {
                tableContent += "<strong><font color='green'>" + this.log + "</font></strong>";
            }
            else if (this.log === "Nouveau WordCloud" || this.log === "Suppresion des mots-clés")
            {
                tableContent += "<strong><font color=#008CBA>" + this.log + "</font></strong>";
            }
            else
            tableContent += this.log;
            tableContent += "<br>";
        });

        // $('#logbox').replaceWith("<h2 id='listeTweets'>Liste des Tweets (" + nb + ")</h2>");

        $('#logbox').html(tableContent);
        document.getElementById('logbox').scrollTop = 10000;
        $('#logcount').replaceWith("<span id='logcount'>Log (" + nblog + ")</span>");

    });
    return nblog;

};



function populateTable() {
    var tableContent = '';
    var nb = 0;

    $.getJSON('/tweets/tweets', function (data) {

        tweetListData = data;


        $.each(data, function () {

            nb++;
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="reloadcloud">' + nb + '</a></td>';

            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.user.screen_name + '"> <button id="btnbleu">' + this.user.screen_name + '</button></a></td>';
            tableContent += '<td>' + this.tweet_complet + '</td>';
            tableContent += '<td><a href="#" id="' + this.user.screen_name + '" class="linkdeletetweet" rel="' + this._id + '"><button id="btnRemoveKeyWords">Supprimer</button></a></td>';
            tableContent += '</tr>';
            tableContent += '<tr>';
            tableContent += '<td></td>';

            tableContent += '<td class="deuxieme">Correction:</td>';
            tableContent += '<td class="tweet_corrige">' + this.tweet_corrige + '</td>';
            tableContent += '<td class="deuxieme"></td>';
            tableContent += '</tr>';
        });

        $('#listeTweets').replaceWith("<h2 id='listeTweets'>Liste des Tweets (" + nb + ")</h2>");



        $('#tweetList table tbody').html(tableContent);
    });
    getLog();
};


function deleteall() {


    var tableContent = '';
    var nb = 1;



    $.getJSON('/tweets/tweets', function (data) {


        tweetListData = data;



        $.each(data, function () {
            if (nb === 1) {
                tableContent += '<tr>';
                tableContent += '<td>' + nb + '</td>';
                tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.user.screen_name + '"> <button>' + this.user.screen_name + '</button></a></td>';
                tableContent += '<td>' + this.tweet_complet + '</td>';
                tableContent += '<td><a href="#" class="linkdeletetweet" rel="' + this._id + '">Supprimer</a></td>';
                tableContent += '</tr>';
            }
            nb++;
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="reloadcloud">' + nb + '</a></td>';

            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.user.screen_name + '"> <button>' + this.user.screen_name + '</button></a></td>';
            tableContent += '<td>' + this.tweet_complet + '</td>';
            tableContent += '<td><a href="#" class="linkdeletetweet" rel="' + this._id + '">Supprimer</a></td>';
            tableContent += '</tr>';
            tableContent += '<tr>';
            tableContent += '<td></td>';

            tableContent += '<td class="deuxieme">Correction:</td>';
            tableContent += '<td class="tweet_corrige">' + this.tweet_corrige + '</td>';
            tableContent += '<td class="deuxieme"></td>';
            tableContent += '</tr>';
        });


        $('#tweetList table tbody').html(tableContent);
    });
};





function addKeyWords(event) {
    event.preventDefault();


    var errorCount = 0;
    $('#addKeyWords input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });

    if (errorCount === 0) {

        var newKey = {
            'keyword': $('#addKeyWords fieldset input#inputKeyWord').val(),
        }
        $.ajax({
            type: 'POST',
            data: newKey,
            url: '/tweets/addkeywords',
            dataType: 'JSON'
        }).done(function (response) {

            if (response.msg === '') {

                motcle = $('#addKeyWords fieldset input#inputKeyWord').val();
                
                var txt1 = "<strong class='listKeyWords'>" + motcle + "  </strong>";
                addLog("Ajout du mot clé " + motcle);
                $("div #listKeyWords").append(txt1);
                $('#addKeyWords fieldset input').val('');
                getLog();

            }
            else {

                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        alert('A remplir');
        return false;
    }

};






function removeKeyWords(event) {
    event.preventDefault();
    $('.listKeyWords').remove();

    $.ajax({
        type: 'DELETE',
        url: '/tweets/removekeywords',
    }).done(function (response) {

        if (response.msg === '') {
        }
        else {

            alert('Error: ' + response.msg);
        }
    });
    addLog("Suppression des mots-clés");

};

function loadFichier(event) {
    event.preventDefault();
    $('body').load("word.py");
    function load_home() {
        document.getElementById("content").innerHTML = '<object type="text/html" data="home.html" ></object>';
    }

};

function count() {


    $.ajax({
        type: 'GET',
        url: '/tweets/count',
    }).done(function (response) {
        return response.msg;
        if (response.msg === '') {

            // alert("ok")
        }
        else {

            alert('Error: ' + response.msg);
        }
    });
};

function addLog(logtext) {

    var logtext = {
        'log': logtext,
    }
    $.ajax({
        type: 'POST',
        data: logtext,
        url: '/tweets/addlog',
        dataType: 'JSON'
    }).done(function (response) {

        if (response.msg === '') {

            // alert("ok")
        }
        else {

            alert('Error: ' + response.msg);
        }
    });
};



function showUserInfo(event) {
    event.preventDefault();

    // document.getElementById("logbox").style.display = "none";
    // document.getElementsByClassName("infos").style.display = "inline";

    var thisUserName = $(this).attr('rel');

    var arrayPosition = tweetListData.map(function (arrayItem) { return arrayItem.user.screen_name; }).indexOf(thisUserName);

    var thisUserObject = tweetListData[arrayPosition];

    cite = "Non";
    if (thisUserObject.is_quote_status === true) {
        if (thisUserObject.is_quote_status.truncated === true) {
            cite = thisUserObject.quoted_status.extended_tweet.full_text;
        }
        else {
            cite = thisUserObject.quoted_status.text;
        }
    }


    var obj = document.getElementById("imageprofil");
    var src = obj.src;
    var pos = src.indexOf('?');
    if (pos >= 0) {
        src = src.substr(0, pos);
    }
    var date = new Date();
    obj.src = thisUserObject.user.profile_image_url_https;
    // $('#linkcloud').replaceWith('<td class="linkcloud" id="linkcloud"><a href="#" class="reloadcloud"><button id="btnbleu">Générer</button></a></td>');



    $('#userInfoName').text(thisUserObject.user.name);
    $('#userInfoDescription').text(thisUserObject.user.description);
    $('#userInfoCite').text(cite);
    $('#userInfoCree').text(thisUserObject.created_at);
    $('#userInfoVille').text(thisUserObject.user.location);

};




function correctAll(event) {

    event.preventDefault();
    $('#correctall').text("Correction...");
    $.ajax({
        type: 'GET',
        url: '/tweets/correction'
    }).done(function (response) {

        if (response.msg === '') {
        }
        else {
            alert('Error: ' + response.msg);
        }
    });


    setTimeout(function () {
        populateTable();
        $('#correctall').text("Corrigé");
        setTimeout(function () {
            $('#correctall').replaceWith('<td id="correctall"><a href="#" class="correctall"><button id="btnvert">Re-corriger</button></a></td>');
        }
            , 1200);
    }
        , 3200);
};



function getNewTweets(event) {

    event.preventDefault();
    $('#getnewtweets').text("Récupération...");
    $.ajax({
        type: 'GET',
        url: '/tweets/getnewtweets'
    }).done(function (response) {

        alert(message);

        if (response.msg === '') {
        }
        else {
            alert('Error: ' + response.msg);
        }
    });
    addLog("Récupération de tweets...");

    setInterval(function () {
        populateTable();

        // setTimeout(function () {
        //     $('#getnewtweets').replaceWith('<td id="getnewtweets"><a href="#" class="getnewtweets">Récupérer 15 tweets</td>');
        // }
        //     ,1200);
    }
        , 1000);
    setTimeout(function () {
        $('#getnewtweets').replaceWith('<td><button id="btntrans">Récupérés</button></td>');

    }
        , 4000);

};


function deleteAll(event) {

    event.preventDefault();
    var confirmation = confirm('Tout supprimer ?');

    
    if (confirmation === true) {
        $.ajax({
            type: 'DELETE',
            url: '/tweets/deleteall'
        }).done(function (response) {

            if (response.msg === '') {

            }
            else {
                alert('Error: ' + response.msg);
            }
        });

    }
    else {
        return false;
    }
    addLog("Suppression de tous les tweets");

    populateTable();

};


function reloadCloud(event) {

    event.preventDefault();
    $('#linkcloud').text("Génération d'un nouveau wordcloud....");
    if (true === true) {
        $.ajax({
            type: 'GET',
            url: '/tweets/reload'
        }).done(function (response) {

            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
        addLog("Nouveau WordCloud");

    }
    else {
        return false;
    }
    reloadImg('cloud');
    $('#linkcloud').replaceWith('<td class="linkcloud" id="linkcloud"><a href="#" class="reloadcloud"><button id="btntrans">Génération...</button></a></td>');

    setTimeout(function () {
        $('#linkcloud').replaceWith('<td class="linkcloud" id="linkcloud"><a href="#" class="reloadcloud"><button id="btnbleu">Générer</button></a></td>');
    }, 4666);
};





function reloadImg(id) {
    setTimeout(function () {
        var obj = document.getElementById(id);
        var src = obj.src;
        var pos = src.indexOf('?');
        if (pos >= 0) {
            src = src.substr(0, pos);
        }
        var date = new Date();
        obj.src = src + '?v=' + date.getTime();

    }, 3555);
    return false;
}


function deleteTweet(event) {

    event.preventDefault();

    var confirmation = confirm('Supprimer définitivement de la base de données?');



    var thisUserName = $(this).attr('rel');
    var arrayPosition = tweetListData.map(function (arrayItem) { return arrayItem._id; }).indexOf(thisUserName);
    var thisUserObject = tweetListData[arrayPosition];



    if (confirmation === true) {

        $.ajax({
            type: 'DELETE',
            url: '/tweets/deletetweet/' + $(this).attr('rel')
        }).done(function (response) {


            if (response.msg === '') {
                addLog("Suppression du tweet de " + thisUserObject.user.screen_name);
            }
            else {
                alert('Error: ' + response.msg);
            }

            populateTable();

        });
    }
    else {
        return false;

    }

};



