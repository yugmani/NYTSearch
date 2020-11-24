let startYear = $("#start-year").val().trim() + "0101";
let endYear = $("#end-year").val().trim() + "0101";

const makeURL = () => {
  // https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

  var queryParams = { "api-key": NYT_API_KEY };

  queryParams.q = $("#search-term").val().trim();

  if (parseInt(startYear)) {
    queryParams.begin_date = startYear + "0101";
  }
  if (parseInt(endYear)) {
    queryParams.begin_date = endYear + "0101";
  }
  // console.log(queryURL + $.param(queryParams));
  return (queryURL = queryURL + $.param(queryParams));
};

$("#search-button").on("click", function (event) {
  event.preventDefault();
  let queryURL = makeURL();

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    // console.log(data.response.docs[0].multimedia[0].legacy.xlarge);
    displayResult(data);
  });
});

const displayResult = (data) => {
  $("#result").empty();
  let searchRecords = $("#search-record").val();
  for (let i = 0; i < searchRecords; i++) {
    let divNew = $("<div>").addClass("article");
    let divSub = $("<div>").addClass("text-of-article");
    let headline = $("<h2>")
      .addClass("article-title")
      .text(data.response.docs[i].headline.main);
    let textSnippet = $("<p>")
      .addClass("article-snippent")
      .text(data.response.docs[i].snippet);
    let datePublished = $("<p>")
      .addClass("date-published")
      .text("Date published: " + data.response.docs[i].pub_date);
    let imgSrc =
      "https://static01.nyt.com/" + data.response.docs[i].multimedia[0].url;
    // console.log(imgSrc);
    let image = $("<img>").attr("src", imgSrc).addClass("image-of-article");
    console.log(image);

    let webUrl = $("<a>")
      .attr("href", data.response.docs[i].web_url)
      .text("Click here to get more...");
    // let image = $("<img>").attr("src", data.response.docs[0].multimedia[0].url);
    divSub.append(headline, textSnippet, datePublished, webUrl);
    divNew.append(image, divSub);
    $("#result").append(divNew);
  }
};

$("#search-clear").on("click", function () {
  searchKey = null;
  $("#result").empty();
});
