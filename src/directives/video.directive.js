function videoDirective() {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'views/video-controls.html',
      controller: function($scope, $element){
        var video = $element[0].previousElementSibling;
        var playPauseButton = $element.find('button')[0];
        var seekBar = $element.find('input')[0];
        var mute = $element.find('button')[1];
        var volumeBar = $element.find('input')[1];

        seekBar.addEventListener("change", function() {
          var time = video.duration * (seekBar.value / 100);
          video.currentTime = time;
        });

        video.addEventListener("timeupdate", function() {
          var value = (100 / video.duration) * video.currentTime;
          seekBar.value = value;
        });

        seekBar.addEventListener("mousedown", function() {
          video.pause();
        });

        seekBar.addEventListener("mouseup", function() {
          video.play();
        });

        volumeBar.addEventListener("change", function() {
          video.volume = volumeBar.value;
        });

        video.addEventListener('ended', function (){
          video.currentTime = 0.1;
        });

        $scope.playPause = function(){
          if (video.paused == true) {
            video.play();
            playPauseButton.innerHTML = "Pause";
          } else {
            video.pause();
            playPauseButton.innerHTML = "Play";
          }
        }

        $scope.fullScreen = function(){
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
          } else if (video.webkitSupportsFullscreen) {
            video.webkitEnterFullscreen();
          }
        }

        $scope.mute = function(){
          if (video.muted == false) {
            video.muted = true;
            mute.innerHTML = "Unmute";
          } else {
            video.muted = false;
            mute.innerHTML = "Mute";
          }
        }

      }
}


export default videoDirective;
