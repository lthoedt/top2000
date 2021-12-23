module.exports = {
	api: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:3001/api/v1' : `https://top2000api.herokuapp.com/api/v1`
}
// https://top2000api.herokuapp.com/api/v1/songs