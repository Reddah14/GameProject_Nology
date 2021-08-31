/* tenor api request for random gif */
// reference -> https://tenor.com/gifapi/documentation#endpoints-random

// url Async requesting function
function httpGetAsync(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the random search
function tenorCallback_randomsearch(responsetext)
{
    // parse the json response
    var response_objects = JSON.parse(responsetext);

    top_10_gifs = response_objects["results"];

    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)

    document.getElementById("cpuRandomGiff").src = top_10_gifs[Math.floor(Math.random() * 10)]["media"][0]["nanogif"]["url"];

    return;
}

// function to request random gifs for a given search term
function grab_dataForCPUgiff(search_term)
{
    // set the apikey and limit
    var apikey = "LIVDSRZULELA";
    var lmt = 20;

    // test search term
    //var search_term = "dog dancing";

    // using default locale of en_US
    var search_url = "https://g.tenor.com/v1/random?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

    httpGetAsync(search_url,tenorCallback_randomsearch);

    // data will be loaded by each call's callback
    return;
}


// SUPPORT FUNCTIONS ABOVE
// MAIN BELOW

// start the flow
//grab_data();

