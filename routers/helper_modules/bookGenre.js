//this function when given a mood, returns the corresponding book genre
function bookGenre(mood){
  //mood object with default genre
  let moodMatch = {
      happy: "happy",
      sad: "sad",
      romantic: "romance",
      mad: "anger",
      excited: "adventure",
      dreamy: "fantasy",
    };
    
  //arrays matching the moods to genres
  const happy = ["happy","history","friendship","family_life","historical_fiction","life","comedy"];
  const sad =["sad","tragic","poetry","dramatic","dark","hope"];
  const romantic =["romance","love","erotic_Literature"];
  const mad = ["mad","war","suspense","mystery"];
  const excited =["adventure","exciting","horror","motion_pictures"];
  const dreamy = ["fantasy","magic","science_fiction","plays"];

   //random index to choose which genre to return
  let happyRandom = Math.floor(Math.random() * happy.length);
  let sadRandom = Math.floor(Math.random() * sad.length);
  let romanticRandom = Math.floor(Math.random() * romantic.length);
  let madRandom = Math.floor(Math.random() * mad.length);
  let excitedRandom = Math.floor(Math.random() * excited.length);
  let dreamyRandom = Math.floor(Math.random() * dreamy.length);

  //sets the genre to the mood
  moodMatch.happy = happy[happyRandom];
  moodMatch.sad = sad[sadRandom];
  moodMatch.romantic = romantic[romanticRandom];
  moodMatch.mad = mad[madRandom];
  moodMatch.excited = excited[excitedRandom];
  moodMatch.dreamy = dreamy[dreamyRandom];


  return moodMatch[mood];
}
  module.exports = {
   bookGenre
  };
