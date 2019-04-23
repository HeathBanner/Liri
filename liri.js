
var dotenv = require("dotenv").config();
var moment = require('moment')
var axios = require('axios')
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var fs = require('fs')

var lock = keys.spotify;
var query = process.argv.slice(3).join(' ')
var dwis;
var line = '-'


function getBand(query) {

    axios({
        method: 'GET',
        url: 'https://rest.bandsintown.com/artists/' + query + '/events?app_id=codingbootcamp',
    }).then(function(res) {
        var location = res.data[0].venue.city + ', ' + res.data[0].venue.region
        var date = res.data[0].datetime
        var venue = res.data[0].venue.name
        
        logTxt(
            '\n\n' + moment().format('MMMM Do YYYY, h:mm:ss a') +
            '\n' + line.repeat(40) +
            '\n' + 'Name of Venue: ' + venue + 
            '\n' + 'Location: ' + location +
            "\nDate: " + moment(date).format('MMMM Do YYYY') + 
            '\n' + line.repeat(40) + '\n\n' 
            )
        console.log(
            '\n\n' + line.repeat(40) +
            "\nName of Venue: " + venue +
            "\nLocation: " + location +
            "\nDate: " + moment(date).format('MMMM Do YYYY') + 
            '\n' + line.repeat(40) + '\n\n'
            )        
    })
}

function getMovie(query) {
    axios({
        url: 'https://www.omdbapi.com/?t=' + query + '&apikey=trilogy',
        method: 'GET',
    }).then(function(res){
        var title = res.data.Title
        var release = res.data.Year
        var ratingIMDB = res.data.Ratings[0].Value
        var ratingRT = res.data.Ratings[1].Value
        var country = res.data.Country
        var plot = res.data.Plot
        var lang = res.data.Language
        var actors = res.data.Actors

        console.log(
            '\n\n' + line.repeat(40) + 
            "\nTitle: " + title +
            "\nRelease Date: " + release +
            "\nIMDB Rating: " + ratingIMDB +
            "\nRotten Tomatoes Rating: " + ratingRT +
            "\nCountry: " + country +
            "\nPlot: " + plot +
            "\nLanguage: " + lang +
            "\nActors: " + actors +
            '\n' + line.repeat(40) + '\n\n'
            )
        logTxt(
            '\n\n' + moment().format('MMMM Do YYYY, h:mm:ss a') +
            '\n' + line.repeat(40) +
            '\nTitle: ' + title + 
            '\nRelease Date: ' + release +
            '\nPlot: ' + plot +
            '\nActors: ' + actors +
            '\nRotten Tomatoes Rating: ' + ratingRT +
            '\nIMDB Rating: ' + ratingIMDB +
            '\nCountry: ' + country +
            '\nLanguage: ' + lang +
            '\n' + line.repeat(40) + '\n\n'
            )
    })
}

function logTxt(data) {
    fs.appendFile('log.txt', data, function(err) {
        if (err) {
            return console.log(err)
        }
        console.log("\nLogged in to log.txt: " + data)
    })
}

var spotify = new Spotify({
    id: lock.id,
    secret: lock.secret
  });

if (process.argv[2] == 'do') {
    fs.readFile('random.txt', 'utf8', function(err, res){
        if (err) {
            return console.log(err)
        }
        var data = res.split(',')
        dwis = data[0].trim()
        query = data[1].split('"')
        query = query[1]

        if (dwis === 'band') {
    
            if (dwis) {
                getBand(query)
            }
        } else if (dwis == 'song') {
            if (dwis) {
                spotify.search({
                    type: 'track',
                    query: query,
                    limit: '3',
                }).then(function(response) {
        
                    var artistsObj = response.tracks.items[0].artists
                    var artists = []
                    var songName = response.tracks.items[0].name
                    var pUrl = response.tracks.items[0].preview_url
                    var album = response.tracks.items[0].album.name
            
                    for (var i = 0; i < artistsObj.length; i++) {
                        artists.push(artistsObj[i].name)
                    }
                    logTxt(
                        '\n\n' + moment().format('MMMM Do YYYY, h:mm:ss a') +
                        '\n' + line.repeat(40) +
                        '\nSong Name: ' + songName +
                        '\nArtist(s): ' + artists +
                        '\nAlbum: ' + album +
                        '\nPreview Url: ' + pUrl +
                        '\n' + line.repeat(40) + '\n\n'
                        )
                    console.log(
                        '\n\n' + line.repeat(40) +
                        "\nSong Name: " + songName +
                        "\nArtist(s): " + artists +
                        "\nAlbum: " + album +
                        "\nPreview Url: " + pUrl +
                        '\n' + line.repeat(40) + '\n\n'
                        )  
                })
            }
        } else if (dwis == 'movie') {
            if (query) {
                getMovie(query)
            }
        }
    })
}

if (process.argv[2] == 'band') {
    if (query) {
        getBand(query)
    }

} else if (process.argv[2] == 'song') {
    if (query) {
        spotify.search({
            
            type: 'track',
            query: query,
            limit: '3',

        }).then(function(response) {

            var artistsObj = response.tracks.items[0].artists
            var artists = []
            var songName = response.tracks.items[0].name
            var pUrl = response.tracks.items[0].preview_url
            var album = response.tracks.items[0].album.name

            for (var i = 0; i < artistsObj.length; i++) {
                artists.push(' ' + artistsObj[i].name)
            }
            logTxt(
                '\n\n' + moment().format('MMMM Do YYYY, h:mm:ss a') +
                '\n' + line.repeat(40) +
                '\nSong Name: ' + songName +
                '\nArtist(s): ' + artists +
                '\nAlbum: ' + album +
                '\nPreview Url: ' + pUrl +
                '\n' + line.repeat(40) + '\n\n'
                )
            console.log(
                '\n\n' + line.repeat(40) +
                "\nSong Name: " + songName +
                "\nArtist(s): " + artists +
                "\nAlbum: " + album +
                "\nPreview Url: " + pUrl +
                '\n' + line.repeat(40) + '\n\n'
                )  
        })
    } else {
        spotify.search({
            
            type: 'track',
            query: 'The+Sign',
            limit: '3',

        }).then(function(response) {

            var artistsObj = response.tracks.items[0].artists
            var artists = []
            var songName = response.tracks.items[0].name
            var pUrl = response.tracks.items[0].preview_url
            var album = response.tracks.items[0].album.name

            for (var i = 0; i < artistsObj.length; i++) {
                artists.push(artistsObj[i].name)
            }
            
            logTxt(
                '\n\n' + moment().format('MMMM Do YYYY, h:mm:ss a') +
                '\n' + line.repeat(40) +
                '\nSong Name: ' + songName +
                '\nArtist(s): ' + artists +
                '\nAlbum: ' + album +
                '\nPreview Url: ' + pUrl +
                '\n' + line.repeat(40) + '\n\n'
                )
            console.log(
                '\n\n' + line.repeat(40) +
                "\nSong Name: " + songName +
                "\nArtist(s): " + artists +
                "\nAlbum: " + album +
                "\nPreview Url: " + pUrl +
                '\n' + line.repeat(40) + '\n\n'
                )   
        })
    }
} else if (process.argv[2] == 'movie') {
    
    if (query) {
        getMovie(query)
    }
}


