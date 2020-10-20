const fetch = require('node-fetch');

export default async function(req, res) {
  // Hacky cors solution
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  
	const user = req.query.user;
	// Fetch info from lastfm
	let resp = await fetch(
		`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${process.env
			.API_KEY}&format=json&limit=1`
	);
	resp = await resp.json();

	// Parse out song
	const song = resp.recenttracks.track[0];

	// send formatted response
	res.json({
		song: song.name,
		artist: song.artist['#text'],
		url: song.url
	});
}
