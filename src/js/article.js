var arrTag = [
  '',
  '',
  'tutorial',
  'showdev',
  'docker',
  'devops',
  'webdev',
  'javascript',
  'node',
  'express',
  'lambda',
  'opensource',
  'serverless',
  'webperf',
  'productivity',
  'machinelearning',
  'explainlikeimfive',
  'frontend',
  'ux',
  'css',
  'harpjs'
];

function htmlGetIndex() {
  htmlGetArticle('#idArticle' + '0', 'fresh', '?state=fresh');
  htmlGetArticle('#idArticle' + '1', 'rising', '?state=rising');

  for (a = 2; a < arrTag.length; a++) {
    htmlGetArticle('#idArticle' + a, arrTag[a], '?tag=' + arrTag[a]);
  }
}

function htmlGetPage2() {
  htmlGetArticle('#idPage2' + '0', 'fresh', '?state=fresh&page=2');
  htmlGetArticle('#idPage2' + '1', 'rising', '?state=rising&page=2');

  for (a = 2; a < arrTag.length; a++) {
    htmlGetArticle('#idPage2' + a, arrTag[a], '?tag=' + arrTag[a] + '&page=2');
  }
}

function htmlGetArticle(strDiv, strTag, strParam) {
  var strUrl = 'https://dev.to/api/articles';
  var strHtml = '';
  var dteToday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  var dteOneWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);

  //--- Assert call ajax GET API
  $.ajax({
    type: 'GET',
    url: strUrl + strParam,
    dataType: 'json',
    success: function(data) {
      var x, y;
      //--- Assert render html table
      console.log(data);
      var objArticle; // temporarily hold user
      for (x = 0; x < data.length; x++) {
        objArticle = data[x];
        var dtePublished = new Date(objArticle.published_at);

        if (
          dtePublished >= dteToday ||
          (dtePublished >= dteOneWeekAgo &&
            objArticle.positive_reactions_count > 20)
        ) {
          strHtml +=
            '<div class="row m-t-3"><div class="col-md-9"><div class="card "><div class="card-block">';
          strHtml += '<a href="' + objArticle.url + '" target="_blank">';
          strHtml +=
            '<h4 class="card-title">#' +
            strTag +
            ' ' +
            objArticle.title +
            '</h4></a>';
          strHtml +=
            '<p>' +
            ' Author:' +
            objArticle.user.name +
            ' Date:' +
            objArticle.readable_publish_date +
            ' Reaction:' +
            objArticle.positive_reactions_count +
            '</p>';
          strHtml += '</div></div></div></div>';
        }
      }

      //--- Assert display result
      $(strDiv).html(strHtml);
    },
    error: function(err) {
      alert(err.responseText);
    }
  });
}
