const express = require('express')

		const app = express()
		const port = 3000

		app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

		const favoriteMovieList = [{
			title: "Star Wars",
			starRating: 5,
			isRecommended: true,
			createdAt: new Date(),
			lastModified: new Date()
		}, {
			title: "The Avengers",
			starRating: 4,
			isRecommended: true,
			createdAt: new Date(),
			lastModified: new Date()
		}];

		app.get('/', (req, res) => {
			res.send('Hello World!')
		})

        app.get('/all-movies', (req, res)=>{
            res.json({
                success: true,
                movies: favoriteMovieList
            })
        })

        app.get('/single-movie/:movie', (req, res)=>{
            let movie = favoriteMovieList.find((movie)=>{
                return movie.title === req.params.movie
            })
            res.json({
                success: true,
                movie: movie
            })
        })

        app.post('/new-movie', (req, res)=>{
            if (req.body.title === undefined || typeof req.body.title !== "string"){
                res.json({
                    success: false,
                    message: "Movie must have title and be a a string"
                })
                return
            }
            if (req.body.starRating === undefined || typeof req.body.starRating !== "number"){
                res.json({
                    success: false,
                    message: "Movie must have starRating and be a a number"
                })
                return
            }
            if (req.body.isRecommended === undefined || typeof req.body.isRecommended !== "boolean"){
                res.json({
                    success: false,
                    message: "Movie must have isRecommended and be a a boolean"
                })
                return
            }
            const newMovie = {}
            newMovie.title = req.body.title
            newMovie.starRating = req.body.starRating
            newMovie.isRecommended = req.body.isRecommended
            newMovie.createdAt = new Date()
            newMovie.lastModified = new Date()
            favoriteMovieList.push(newMovie)
            res.json({
                success: true
            })
        })

        app.put("/update-movie/:title", (req, res)=>{
            let movie = favoriteMovieList.findIndex((movie)=>{
                return movie.title === req.params.title
            })
            if(req.body.title !== undefined){
                favoriteMovieList[movie].title = req.body.title
            }
            if(req.body.starRating !== undefined){
                favoriteMovieList[movie].starRating = req.body.starRating
            }
            if(req.body.isRecommended !== undefined){
                favoriteMovieList[movie].isRecommended = req.body.isRecommended
            }
            favoriteMovieList[movie].lastModified = new Date()
            res.json({
                success: true
            })
        })

        app.delete('/:title', (req, res)=>{
            movie = favoriteMovieList.findIndex((movie)=>{
                return movie.title === req.params.title
            })
            favoriteMovieList.splice(movie, 1)
            res.json({
                success: true
            })
        })

		app.listen(port, () => {
			console.log(`Example app listening on port ${port}`)
		})