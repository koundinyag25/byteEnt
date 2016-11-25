function MovieController ($scope,$stateParams,$http,$sce){
     $scope.mediaLoaded = false;
     var infoHash = $stateParams.magnetUri.split('btih:')[1].split('&')[0];
     $http.get('/api/add/'+infoHash).then(function(data){
       console.log(data);
       if(data.status === 200){
         $scope.mediaLoaded = true;
      $scope.config = {
    				sources: [
    					{src: $sce.trustAsResourceUrl('/stream/'+infoHash + '.mp4'), type: "video/mp4"}
              ,{src: $sce.trustAsResourceUrl('/stream/'+infoHash + '.webm'), type: "video/webm"},
						{src: $sce.trustAsResourceUrl('/stream/'+infoHash + '.ogg'), type: "video/ogg"}
            ],
            autoPlay : true,
            plugins: {
                    controls: {
                        autoHide: true,
                        autoHideTime: 5000
                    }
    			}
        }
    }

     }).then(function(error){
     console.log(error);
    });
    //
    // $scope.backTobrowse = function(infoHash){
    //   $location.path('/');
      // $http.post('/api/delete/'+ infoHash).success(()=>{
      //   console.log('backTobrowse is sucessgul');
      // }).catch((error)=>{
      //  console.error('the error',error);
      // });
    // }
}


export default MovieController;
