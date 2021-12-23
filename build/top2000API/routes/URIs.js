module.exports = {
	songs: ( year = new Date().getFullYear() ) => {
		return `https://www.nporadio2.nl/api/chart/positions?editionSlug=top-2000-van-${year}-12-25`;
	},
	playing: "https://www.nporadio2.nl/?option=com_ajax&plugin=nowplaying&format=json&channel=nporadio2"
}