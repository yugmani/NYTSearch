
 
  
  let startYear = $("#start-year").val().trim() + "0101"; 
  let endYear = $("#end-year").val().trim()+"0101";



const makeURL = ()=>{
 
  // https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  
  var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };

  queryParams.q = $("#search-term")
    .val()
    .trim();

  if (parseInt(startYear)) {
    queryParams.begin_date = startYear + "0101";
  }
  if (parseInt(endYear)) {
    queryParams.begin_date = endYear + "0101";
  }
  console.log(queryURL + $.param(queryParams));
  return queryURL = queryURL + $.param(queryParams);
}



$("#search-button").on("click", function(event){
  event.preventDefault();
  let queryURL = makeURL();

  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(data) {
      console.log(data);
      // console.log(data.response.docs[0].multimedia[0].legacy.xlarge);
      displayResult(data);
    });
})


  const displayResult = (data)=>{
    $("#result").empty();
    let searchRecords = $("#search-record").val();
    for (let i=0; i<searchRecords; i++){
    let headline = $("<h4>").text(data.response.docs[i].headline.main);

    let webUrl = $("<a>").attr("href", data.response.docs[i].web_url).text("Click here to get more...");
    // let image = $("<img>").attr("src", data.response.docs[0].multimedia[0].url);
    $("#result").append(headline, webUrl);
  }
};

  $("#search-clear").on("click", function(){
    searchKey = null;
    $("#result").empty();
  });
