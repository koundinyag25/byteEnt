function MovieController ($scope,$stateParams,$http,$sce,$location,$timeout){
  // $scope.goBackToBrowseButton = '/trailers/ic_arrow_back_white_18dp_2x.png';
      $scope.hide = true;
     $scope.mediaLoaded = false;
     var infoHash = $stateParams.magnetUri.split('btih:')[1].split('&')[0];
     $http.get('/api/add/'+infoHash).then(function(data){
       console.log(data);
       if(data.status === 200){
         $scope.mediaLoaded = true;
        //  $scope.src = $sce.trustAsResourceUrl('/stream/'+infoHash + '.mp4');
      $scope.config = {
    				sources: [
    					{src: $sce.trustAsResourceUrl('/stream/'+infoHash + '.mp4'), type: "video/mp4"}
            ],
            autoPlay : true,
            plugins: {
                    controls: {
                        autoHide: true,
                        autoHideTime: 5000
                    }
    			},
          responsive: true
        }
    }

     }).then(function(error){
     return error
    });
    //
    $scope.goBackToBrowse = function(){

      $http.get('/api/delete/'+ infoHash).success((data)=>{
         console.log('delete is successful',data);
         if(data.status === 200){
            $location.path('/');
         }
        return;
      }).catch((error)=>{
       console.error('the error',error);
      });
    }


    $scope.showBackButton = ()=>{
      $scope.hide = false;
    }

    $scope.hideBackButton = ()=>{
      $timeout(()=>{
        $scope.hide = true;
      },5000);
    }

}


export default MovieController;
