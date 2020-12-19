module.exports = {
	songs: ( year = new Date().getFullYear() ) => {
		return `https://www.nporadio2.nl/?option=com_ajax&plugin=Top2000&format=json&year=${year}`;
	},
	playing: "https://www.nporadio2.nl/?option=com_ajax&plugin=nowplaying&format=json&channel=nporadio2"
}