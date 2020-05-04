//this function when given a mood, returns the corresponding music genre

function musicGenre(mood){
  //mood object with default genre
  let moodMatch = {
      happy: "happy",
      sad: "sad",
      romantic: "romance",
      mad: "hardcore",
      excited: "dance",
      dreamy: "trance",
    };
    
  

  //arrays matching the moods to genres
  const happy = ["acoustic","classical","comedy", "country","disco","disney","folk","groove","happy","hip-hop","indie","latino","movies","party",
  "pop","rock","summer"];
  const sad =["blues","chill","emo","grunge","guitar","rainy-day","sad","sleep"];
  const romantic =["blues","classical","road-trip", "romance","show-tunes"];
  const mad = ["alt-rock","alternative","black-metal","death-metal","hard-rock","hardcore","rock","metal"];
  const excited =[ "club","dance","dancehall","disco","electronic", "dubstep","groove","hip-hop"];
  const dreamy = ["acoustic", "ambient","chill","classical","disney","jazz","road-trip","trance"];

  //random index to choose which genre to return
  let happyRandom = Math.floor(Math.random() * happy.length);
  let sadRandom = Math.floor(Math.random() * sad.length);
  let romanticRandom = Math.floor(Math.random() * romantic.length);
  let madRandom = Math.floor(Math.random() * mad.length);
  let excitedRandom = Math.floor(Math.random() * excited.length);
  let dreamyRandom = Math.floor(Math.random() * dreamy.length);

  //sets the genre to the mood
  musicGenre.happy = happy[happyRandom];
  musicGenre.sad = sad[sadRandom];
  musicGenre.romantic = romantic[romanticRandom];
  musicGenre.mad = mad[madRandom];
  musicGenre.excited = excited[excitedRandom];
  musicGenre.dreamy = dreamy[dreamyRandom];
 
  return moodMatch[mood];
}
  module.exports = {
   musicGenre
  };
