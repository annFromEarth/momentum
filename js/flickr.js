// momentUMs

// flickr

// Key:
// 3119e9b655c079e1d987c8984edf920d

// Secret:
// dfe5b83157b119e4 




// https://unsplash.com/oauth/applications/411910

// Access Key
// pTHkMom4S0FG6gq99WjCH4akB6LnTnZBOYWhIjAzsoo

// Secret key
// wJtuOaWDqG002v1m73Uz3nK5jGcgyYqtpyDmumioEDQ



// api. unsplash. com/ ....  ?query=${timeOfDay}&
//flickr. com/ ...  &tags=${timeOfDay}

// background-size: cover;

//88888888888888888888888888888888888888888888888888888888888

// async function getBackgroundObjectFlickr() {
//     try {
//       const urlFlickr = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3119e9b655c079e1d987c8984edf920d&tags=morning,nature,wild&tag_mode=all&sort=relevance&per_page=20&extras=url_h&format=json&nojsoncallback=1`;
//       const resFlickr = await fetch(urlFlickr);
//       const dataFlickr = await resFlickr.json(); 

//       console.log(dataFlickr)

//       const backgroundURL = dataFlickr.photos.photo[0].url_h;
//       console.log (backgroundURL)

//     }

//     catch {
//         console.log ("smth went wrong with Flickr")
//     }
// }

// // getBackgroundObjectFlickr()

// async function getBackgroundUnsplash() { 
//     try {

//         const urlUnsplash = `https://api.unsplash.com/photos/random?query=morning+nature&client_id=pTHkMom4S0FG6gq99WjCH4akB6LnTnZBOYWhIjAzsoo`;
//         const resUnsplash = await fetch(urlUnsplash);
//         const dataUnsplash = await resUnsplash.json(); 

//         console.log(dataUnsplash);
//         console.log(dataUnsplash.links.download)
//     }

//     catch {
//         console.log ("smth went wrong with Unsplash");
//     }
// }

// getBackgroundUnsplash()







