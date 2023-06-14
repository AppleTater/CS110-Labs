//Done by Andre Amante and Jasmine Lau
$(document).ready(function() {

    const url = "http://50.21.190.71/get_tweets"
    var checkbox = document.getElementById('feedRefresh');
    var pause = false;


    function auto_refresh() {
        var is_checked = checkbox.checked;
        if (is_checked == false) {
            pause = false;
            time = setInterval(function() {
                get_request();
            }, 10000);

        } else if (is_checked) {
            clearInterval(time);
            is_checked = true;
            pause = true;
        }
    }

    auto_refresh();
    document.getElementById('feedRefresh').addEventListener('click', auto_refresh);

    get_request();

    var master_list = [];

    function get_request() {
        fetch (url) // fetch from crypto tweet server
        .then(res => res.json()) 
        .then(data => {
            if (!pause) {
                refreshTweets(data);
            }
        })
        .catch(err => (
            console.log(err)
        ))
    }

    let isSearch = false;
    let searchString = ""

    function searchTweets(event) {
        isSearch = true;
        if(event.target.value === '') {
            isSearch = false;
            get_request();
        }
        searchString = event.target.value.trim().toLowerCase();
        var display_search = master_list;
        console.log(searchString, display_search)
        for (var i = 0; i < master_list.length; i++) {
            var search = display_search.filter(tweet => tweet['text'].trim().toLowerCase().includes(searchString))
        }
    
        show_tweets(search);
    }

    document.getElementById("searchBar").addEventListener("input", searchTweets); 

    function no_pic(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return (http.status);
    }

    function refreshTweets(tweets) {
        for(let i = 0; i < 10; i++) {
            if (!master_list.includes(tweets[i])) {

                // default image is remy
                const tweet_pfp= document.createElement("img");
                tweet_pfp.src = tweets[i].avatar;
                if (no_pic(tweet_pfp.src) == 404) {
                    tweets[i].avatar = './images/ratatouille.jpg'
                }

                master_list.push(tweets[i]);
                master_list.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
        }

        if(isSearch) {
            let searchBar = document.getElementById("searchBar");
            searchString = searchBar.value.trim().toLowerCase();
            var display_search = master_list;
            console.log(searchString, display_search)
            for (var i = 0; i < master_list.length; i++) {
                var search = display_search.filter(tweet => tweet['text'].trim().toLowerCase().includes(searchString))
            }
            show_tweets(search);
        }
        else {
            show_tweets(master_list);
        }
    }

    function show_tweets(display) {
        const center_tweets = document.querySelector(".center");
        center_tweets.innerHTML = "";

        for(let i = 0; i < display.length; i++) {
            var htmlTweet = '<div class="tweet">' +
                        '<img src="'+ display[i].avatar + '" class="profile-img"/>' +
                        '<div class="tweet-content">' +
                        '<p><b>' + display[i].user_name + ' </b><span style="color: gray">@' + display[i].user_name +  ' ' + display[i].date + '</span></p>' +
                        '<p>' + display[i].text + '</p></div></div>';
            center_tweets.innerHTML += htmlTweet;
        }
    }
})