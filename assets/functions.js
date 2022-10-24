Amplitude.init({
    bindings: {
      37: 'prev',
      39: 'next',
      32: 'play_pause'
    },
    debug: true,
    visualization: 'michaelbromley_visualization',
    songs: [
      {
        "name": "Pul topish kere",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/pul_topish_kere.mp3",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
        "visualization": "michaelbromley_visualization"
      },
      {
        "name": "Мотив",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/Мотив.mp3",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
        "visualization": "michaelbromley_visualization"
      },
      {
        "name": "Qora Hayot",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/Qora_Hayot.mp3",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "Bizi Era",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/Bizi_Era.mp3",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "Azoblama",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/Azoblama.mp3",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "Sinfdosh Qiz ",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/Sinfdosh_Qiz.m4a",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "Yuragim",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/Yuragim.mp3",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "25-may",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/25-may.m4a",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "[DEMO] QALBAKI SEN",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/[DEMO] QALBAKI SEN.mp3",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "[HAYOT] TARIFSIZ TARIX",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/[HAYOT] TARIFSIZ TARIX Mr.Adams.m4a",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "MAVHUM MARXUMLAR",
        "artist": "Mr.Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/[MAVHUM MARXUMLAR]•••Mr.Adams.mp3",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "KAYFIYAT NICE",
        "artist": "Mr.Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/KAYFIYAT NICE  Mr.Adams.m4a",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "Goodbye",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/Goodbye .m4a",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "O'zimni Chiroyligim",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/O_zimni Chiroyligim.mp3",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "O'liklar",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/O_LIKLA.m4a",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      },
      {
        "name": "Yolg'izlik bu...",
        "artist": "Mr Adams",
        "album": "ADAMS SINGER",
        "url": "/audio/Yolg_izlik bu....mp3",
        "visualization": "michaelbromley_visualization",
        "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
      }
    ],
  
    waveforms: {
        sample_rate: 50
    },
  
    visualizations: [
      {
        object: MichaelBromleyVisualization,
        params: {
  
        }
      }
    ]
});
  

$(function() {
  var rangePercent = $('[type="range"].amplitude-volume-slider').val();
  rangePercent = $('[type="range"].amplitude-volume-slider').val();
    $('h4').html(rangePercent+'<span class="valume"></span>');
    $('[type="range"].amplitude-volume-slider, h4>span.valume').css('filter', 'hue-rotate(-' + rangePercent + 'deg)');
    $('h4').css({'transform': 'translateX(-50%) '/*scale(' + (1+(rangePercent/100)) + ')'*/, 'left': rangePercent+'%'});
  $('[type="range"].amplitude-volume-slider').on('change input', function() {
      rangePercent = $('[type="range"].amplitude-volume-slider').val();
      $('h4').html(rangePercent+'<span class="valume"></span>');
      $('[type="range"].amplitude-volume-slider, h4>span.valume').css('filter', 'hue-rotate(-' + rangePercent + 'deg)');
      $('h4').css({'transform': 'translateX(-50%) '/*scale(' + (1+(rangePercent/100)) + ')'*/, 'left': rangePercent+'%'});
  });
});

function playlist_open() {
  var elem = document.getElementById("white-player-playlist-container"),
      elem2 = document.getElementById("white-player");

  elem2.classList.toggle("close");
  elem.classList.toggle("open");
}

function playlist_close() {
  var elem = document.getElementById("white-player-playlist-container"),
      elem2 = document.getElementById("white-player");

  elem2.classList.remove("close");
  elem.classList.remove("open");
}