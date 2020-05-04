# I'm feeling...
**A mood based recommendation web application.**

!["demo"](./images/demo.png)
*Example of a movie recommendation*

## Usage

#### Requirements
1. [TMDB API Key](https://www.themoviedb.org/documentation/api) (used in `movies.js`)
2. [Spotify OAUTH Token](https://developer.spotify.com/) (used in `music.js`)

#### How to run
```
>> git clone https://github.com/jmrocco/im_feeling.git

>> cd im_feeling

>> npm install

>> node server.js
```
## About

### Inspiration
In my free time I am always looking for new ideas for books to read, movies to watch, and music to listen to. Although, these ideas are usually based upon my current mood. I decided that I was in need for an application that could give me recommendations based upon my feelings. Thus I created this web application as a fun project to practice my JavaScript skills and of course to get some new book recommendations.

### How it works
By entering one of the following moods: happy, sad, romantic, mad, excited, or dreamy, as well as choosing an activity: movies, music, or books, your mood is matched to a genre. The genre is sent to the corresponding API and a response is received with the recommendation.

### APIs
There are three different categories of recommendations: movies, music, and books.

##### Movies
I used the [TMBD](https://www.themoviedb.org/documentation/api) API. It is free to use and provides the title, release date, description, and poster. An API key is required in the `movies.js` file to make requests.

##### Music
I used the [Spotify](https://developer.spotify.com/) API. It is free to use and provides the title, artists, release date, and album cover. An OAUTH token is required in the `music.js` file to make requests. *For the purpose of this application as well as time constraints, I decided to opt out of having an automatically generating OAUTH token.* While your API keys never change, **your OAUTH token expires after a few hours and you must generate a new one.** In my experiences I found that I needed to generate a new one per day.

##### Books
I used the [Open Library](https://openlibrary.org/developers/api) and [Google Books](https://developers.google.com/books) APIs. Both are free to use and neither require an API key. I found this project to be the most challenging because there are not many APIs for books! While the Open Library API is awesome, there are some instances when information is missing, thus I used the Google Books API to generate the description, and Open Library for title, author, and book cover.

### Future Updates
- Spotify OAUTH upgrade integration.
- Recommendations for events happening in your area, restaurants, and leisure entertainment.
- Further error handling. 
- Support for other moods.