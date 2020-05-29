/**
 * Run with `node aoe2-elo-stats.js`
 * @author github.com/torvnen
 */
const https = require("https");
const fs = require("fs");

// **leaderboard_id** Unranked=0, 1v1 Deathmatch=1, Team Deathmatch=2, 1v1 Random Map=3, Team Random Map=4
// **start** it's the offset
// **count** 10k per page seems legit
const request = async (leaderboard_id = 3, start = 1, count = 10 * 1000) => {
  const url = `https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=${leaderboard_id}&start=${start}&count=${count}`;

  return new Promise((resolve) => {
    let data = "";
    const ratings = [];
    https.get(url, (response) => {
      response.on("data", (chunk) => (data += chunk));
      response.on("end", () => {
        const ratings_raw = JSON.parse(data).leaderboard;
        for (let ranking of ratings_raw) {
          ratings.push(ranking.rating);
        }
        resolve(ratings);
      });
    });
  });
};
const loop = async () => {
  let start = 0;
  let stop = false;
  const ratings = [];
  while (!stop) {
    await request(3, start).then((r) => {
      if (!Array.isArray(r) || r.length === 0) stop = true;
      ratings.push(r);
    });
    start += 10 * 1000;
  }
  return Promise.resolve(ratings);
};
loop().then((ratings) => {
  fs.writeFile("./ratings.json", JSON.stringify(ratings), {}, () => {});
  const allRatings = [].concat.apply([], ratings); // flatten the arrays into one
  const numRatings = allRatings.length; // for calculating avg
  const avgRating = allRatings.reduce((prev, curr) => prev + curr, 0) / numRatings; // reduce magic to get total
  const highestRating = Math.max(...allRatings); // i wish i did not have to use spread operator for this - it is kinda slow.
  const lowestRating = Math.min(...allRatings); // same here with the spread operator.
  const output = { avgRating, numRatings, highestRating, lowestRating };
  console.log(output);
  fs.writeFile( "./rating-stats.json", JSON.stringify(output), {}, () => console.log('Done.'));
});
