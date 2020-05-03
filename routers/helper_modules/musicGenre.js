function musicGenre(mood){
let moodMatch = {
    happy: "happy",
    sad: "sad",
    romantic: "romance",
    mad: "hardcore",
    excited: "dance",
    dreamy: "trance",
  };
  
  

  const happy = ["acoustic","classical","comedy", "country","disco","disney","folk","groove","happy","hip-hop","indie","latino","movies","party",
  "pop","rock","summer"];
  const sad =["blues","chill","emo","grunge","guitar","rainy-day","sad","sleep"];
  const romantic =["blues","classical","road-trip", "romance","show-tunes"];
  const mad = ["alt-rock","alternative","black-metal","death-metal","hard-rock","hardcore","rock","metal"];
  const excited =[ "club","dance","dancehall","disco","electronic", "dubstep","groove","hip-hop"];
  const dreamy = ["acoustic", "ambient","chill","classical","disney","jazz","road-trip","trance"];

  let happyRandom = Math.floor(Math.random() * happy.length);
  let sadRandom = Math.floor(Math.random() * sad.length);
  let romanticRandom = Math.floor(Math.random() * romantic.length);
  let madRandom = Math.floor(Math.random() * mad.length);
  let excitedRandom = Math.floor(Math.random() * excited.length);
  let dreamyRandom = Math.floor(Math.random() * dreamy.length);

  //randomizes genres
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
