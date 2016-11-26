function HomeController ($scope,$sce,$timeout,$http,$location,$stateParams) {




$scope.titles=[];
   $scope.action = [];
   $scope.romantic= [];
   $scope.comedy =[];
   $scope.drama =[];
   $scope.fantasy =[];
   $scope.horror =[];
   $scope.sciFi = [];
   $scope.boop = "/previewVid/boop.mp4";
   $scope.previewImg = "/previewVid/preview.jpg";
   $scope.trailerBtnIcon = '/trailers/ic_tv_white_18dp_2x.png';
   $scope.playButtonIcon = '/trailers/play-button.png';

$http.get('/trailers/trailer.json').then((thumbnailData)=>{
     angular.forEach(thumbnailData.data,(data)=>{
        if(data.genre === "romantic"){
          $scope.romantic.push(data);
          let elementArray = document.getElementsByTagName('iframe');
          angular.forEach(elementArray,(element)=>{
               if(element.getAttribute('value') == 'romantic'){
                 console.log('lol romantic',$scope.romantic[0].trailer);
                 var trailerUrl = "https://www.youtube.com/embed/" + $scope.romantic[0].trailer ;
                 element.setAttribute('src',trailerUrl)
               }
              });

        }else if(data.genre === "action"){
          $scope.action.push(data);
          let elementArray = document.getElementsByTagName('iframe');
          angular.forEach(elementArray,(element)=>{
               if(element.getAttribute('value') == 'action'){
                 var trailerUrl = "https://www.youtube.com/embed/" + $scope.action[0].trailer ;
                 element.setAttribute('src',trailerUrl)
               }
              });
        }else if(data.genre === "comedy"){
          $scope.comedy.push(data);
          let elementArray = document.getElementsByTagName('iframe');
          angular.forEach(elementArray,(element)=>{
               if(element.getAttribute('value') == 'comedy'){
                 console.log('lol',$scope.action[0]);
                 var trailerUrl = "https://www.youtube.com/embed/" + $scope.comedy[0].trailer ;
                 element.setAttribute('src',trailerUrl)
               }
              });
        }else if(data.genre === "drama"){
          $scope.drama.push(data);
          let elementArray = document.getElementsByTagName('iframe');
          angular.forEach(elementArray,(element)=>{
               if(element.getAttribute('value') == 'drama'){
                 console.log('lol',$scope.action[0]);
                 var trailerUrl = "https://www.youtube.com/embed/" + $scope.drama[0].trailer ;
                 element.setAttribute('src',trailerUrl)
               }
              });
        }else if(data.genre === "fantasy"){
          $scope.fantasy.push(data);
          let elementArray = document.getElementsByTagName('iframe');
          angular.forEach(elementArray,(element)=>{
               if(element.getAttribute('value') == 'fantasy'){
                 console.log('lol',$scope.action[0]);
                 var trailerUrl = "https://www.youtube.com/embed/" + $scope.fantasy[0].trailer ;
                 element.setAttribute('src',trailerUrl)
               }
              });
        }else if(data.genre === "horror"){
          $scope.horror.push(data);
          let elementArray = document.getElementsByTagName('iframe');
          angular.forEach(elementArray,(element)=>{
               if(element.getAttribute('value') == 'horror'){
                 console.log('lol',$scope.action[0]);
                 var trailerUrl = "https://www.youtube.com/embed/" + $scope.horror[0].trailer ;
                 element.setAttribute('src',trailerUrl)
               }
              });
        }else if(data.genre === "sci-fi"){
          $scope.sciFi.push(data);
          let elementArray = document.getElementsByTagName('iframe');
          angular.forEach(elementArray,(element)=>{
               if(element.getAttribute('value') == 'sci-fi'){
                 console.log('lol',$scope.action[0]);
                 var trailerUrl = "https://www.youtube.com/embed/" + $scope.sciFi[0].trailer;
                 element.setAttribute('src',trailerUrl)
               }
              });
        }
     });

}).then((error)=> error);


if($stateParams.magnetUri != 'null'){
  console.log('hey this is stateParams',$stateParams.magnetUri);
  var infoHash = torrentName.split('btih:')[1].split('&')[0];
  console.log(infoHash);
  // $http.post('/api/delete/'+ infoHash).success(()=>{
  //   console.log('backTobrowse is sucessgul');
  // }).catch((error)=>{
  //  console.error('the error',error);
  // });
}



$scope.watchTrailer = function(trailer,genre){
     let elementArray = document.getElementsByTagName('iframe');
     angular.forEach(elementArray,(element)=>{
          if(genre === element.getAttribute('value')){
            var trailerUrl = "https://www.youtube.com/embed/" + trailer+ "?autoplay=1" ;
            element.setAttribute('src',trailerUrl);
          }
        });
     }





$scope.play = (torrentName)=>{
  console.log(torrentName);
  $stateParams = {
    magnetUri: torrentName
  }

  console.log($stateParams);
 $location.path('/movie/'+$stateParams.magnetUri);
 // var infoHash = torrentName.split('btih:')[1].split('&')[0];
 // $http.get('/api/add/'+infoHash).then(function(data){
 //    $scope.video = $sce.trustAsResourceUrl('/stream/'+infoHash + '.mp4');
 //    console.log($scope.video);
 //    }).then(function(error){
 //    console.log(error);
 //  });
 }

 function muteIframe (){
    let elementArray = document.getElementsByTagName('iframe');
    angular.forEach(elementArray,(element)=>{
         let volume = 0;
         element.setAttribute('volume',volume );
        });
  }
  muteIframe();


}




export default HomeController;
