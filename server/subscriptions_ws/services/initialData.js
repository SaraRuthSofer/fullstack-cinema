const Member = require('../models/memberModel');
const axios = require('axios');
const Movie = require('../models/movieModel');


const populateDataIfFirstRun = async () => {
    try {
        const memberCount = await Member.countDocuments();
        const moviesCount = await Movie.countDocuments();
        if (memberCount == 0) {
            const members = await axios.get("https://jsonplaceholder.typicode.com/users")
            await Member.insertMany(members.data.map(member =>
                new Member({ ...member, city: member.address.city })
            ));
        }
        if (moviesCount == 0) {
            const movies = await axios.get("https://api.tvmaze.com/shows")

            await Movie.insertMany(movies.data.map(movie =>
                new Movie({
                    name: movie.name,
                    genres: movie.genres,
                    image: movie.image ? movie.image.medium : '',
                    premiered: movie.premiered ? new Date(movie.premiered) : new Date()
                })
            ));
        }
        console.log('Data populated successfully');
    }
    catch (err) {
        console.error('Error populating data:', err);
    }
}


module.exports = populateDataIfFirstRun
