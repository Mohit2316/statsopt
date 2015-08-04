(function(window, document) {
  'use strict';

  var $window = $(window),
      $document = $(document);

  var getHashName = function() {
    return location.hash.substring(1);
  };

  var getCurrentSection = function() {
    var offset = $window.scrollTop(),
        $currentSection = null;

    $('.section').each(function(index) {
      var $this = $(this),
          offsetTop = $this.offset().top;
      if (offset >= offsetTop && offset < offsetTop + $this.outerHeight(true)) {
        $currentSection = $this;
        return false;
      }
    });

    return $currentSection;
  };

  $(function() {
    // set up snap

    var setupSVG = function() {

      // svgs
      var cloudsAnimation = function(cloudsLeft, cloudsRight) {
        if (cloudsLeft) {
          cloudsLeft.animate({ transform: 'translate(10, 0)' }, 3000, mina.easeinout, function() {
            cloudsLeft.animate({ transform: 'translate(0, 0)' }, 4000, mina.easeinout);
          });
        }
        if (cloudsRight) {
          cloudsRight.animate({ transform: 'translate(-5, 0)' }, 4000, mina.easeinout, function() {
            cloudsRight.animate({ transform: 'translate(0, 0)' }, 3000, mina.easeinout);
          });
        }
      };

      Snap.load("assets/images/svg-full.svg", function(f) {

        // -----------------------------------------------------------------------
        // Star Field
        (function() {
          var snap = Snap("#svg-star-field");
          var g = f.select("g#star-field");
          snap.append(g);

          // Clouds
          window.setInterval(function() {
            cloudsAnimation(g.select("#earth-cloud-left"), g.select("#earth-cloud-right"));
          }, 7000);
          cloudsAnimation(g.select("#earth-cloud-left"), g.select("#earth-cloud-right"));

          // shooting star
          var star = g.select("#shooting-star");
          var starShoot = function() {
            star.attr('opacity', 1);
            star.animate({ transform: 'translate(-100, 50)', opacity: 0 }, 400, function() {
              star.transform('translate(0, 0)');
            });
          }
          window.setInterval(starShoot, 5000);
          starShoot();

        })();
        // End Starfield
        // ---


        // -----------------------------------------------------------------------
        // Syria
        (function() {
          var snap = Snap("#svg-syria");
          var g = f.select("g#syria");
          snap.append(g);

          // Clouds
          window.setInterval(function() {
            cloudsAnimation(g.select("#syria-cloud-left"), g.select("#syria-cloud-right"));
          }, 7000);
          cloudsAnimation(g.select("#syria-cloud-left"), g.select("#syria-cloud-right"));

          // get box
          var box = g.select("g#moving-box");
          var moveBox = function() {
            box.animate({ transform: 'translate(-200, 0)' }, 2000, mina.linear, function() {
              box.transform('translate(0, 0)');
            });
          };
          window.setInterval(moveBox, 5000);
          moveBox();

        })();
        // End Syria
        // ---

        // -----------------------------------------------------------------------
        // CGI
        (function() {
          var snap = Snap("#svg-cgi");
          var g = f.select("g#cgi");
          snap.append(g);

          // get clock hands
          var clockDot = g.select("#clock-center"),
          clockCenter = { x: clockDot.getBBox().cx, y: clockDot.getBBox().cy },
          hours = g.select("#hour-hand"),
          minutes = g.select("#minute-hand");

          var setHours = function(time) {
            var hour = time.getHours() % 12;
            hour += Math.floor(time.getMinutes() / 10) / 6;
            var angle = hour * 360 / 12;
            hours.animate({ transform: "rotate(" + angle + " " + clockCenter.x + " " + clockCenter.y + ")" }, 100, mina.linear, function() {
              if (angle === 360) {
                hours.attr({ transform: "rotate(0 " + clockCenter.x + " " + clockCenter.y + ")" });
              }
            });
          };

          var setMinutes = function(time) {
            var minute = time.getMinutes() % 60;
            minute += Math.floor(time.getSeconds() / 10) / 6;
            var angle = minute * 360 / 60;
            minutes.animate({ transform: "rotate(" + angle + " " + clockCenter.x + " " + clockCenter.y + ")"}, 100, mina.linear, function() {
              if (angle == 360) {
                minutes.attr({ transform: "rotate(0 " + clockCenter.x + " " + clockCenter.y + ")" });
              }
            });
          };

          var updateClock = function() {
            var currTime = new Date();
            setHours(currTime);
            setMinutes(currTime);
          };

          window.setInterval(updateClock, 100);
        })();
        // End CGI
        // ---

      });

      Snap.load("assets/images/svg-sidebar.svg", function(f) {

        // -----------------------------------------------------------------------
        // Veterans
        (function() {
          var snap = Snap("#svg-veterans");
          var g = f.select("g#veterans");
          snap.append(g);

          // get clock
          var clockFace = g.select("g#clock-blink");
          var toggleClock = function() {
            clockFace.animate({ opacity: 0 }, 100, function() {
              window.setTimeout(function() {
                clockFace.animate({ opacity: 1 }, 100);
              }, 800);
            });
          };
          window.setInterval(toggleClock, 1600);
          toggleClock();

        })();
        // End Veterans
        // ---

        // -----------------------------------------------------------------------
        // Agriculture
        (function() {
          var snap = Snap("#svg-agriculture");
          var g = f.select("g#agriculture");
          snap.append(g);

          var waterDrop = g.select("#water-drop");
          var animateDrop = function() {
            waterDrop.transform('translate(0, 0)');
            waterDrop.attr('display', 'block');
            waterDrop.animate({ transform: "translate(0, 70)" }, 800, mina.easeout, function() {
              waterDrop.attr('display', 'none');
            });
          };

          window.setInterval(animateDrop, 2000);
          animateDrop();
        })();
        // End Agriculture
        // ---

        // -----------------------------------------------------------------------
        // Ivory
        (function() {
          var snap = Snap("#svg-ivory");
          var g = f.select("g#ivory");
          snap.append(g);

          // animate drops
          var dropLeft = g.select('#drop-left'),
              dropLeftPath = g.select("#drop-left-path"),
              dropLeftPathLen = dropLeftPath.getTotalLength();

          var dropRight = g.select('#drop-right'),
              dropRightPath = g.select("#drop-right-path"),
              dropRightPathLen = dropLeftPath.getTotalLength();

          var dropBottom = g.select('#drop-bottom'),
              dropBottomPath = g.select("#drop-bottom-path"),
              dropBottomPathLen = dropBottomPath.getTotalLength();

          var dropsAnimation = function() {
            // left drop
            Snap.animate(0, dropLeftPathLen, function(value) {
              var movePoint = dropLeftPath.getPointAtLength(value);
              dropLeft.transform("t" + movePoint.x + "," + movePoint.y);
              if (dropLeft.attr('display') == 'none') {
                dropLeft.attr('display', 'inline');
              }
            }, 800, mina.easein, function() {
              dropLeft.attr('display', 'none');
            });

            // right drop
            Snap.animate(0, dropRightPathLen, function(value) {
              var movePoint = dropRightPath.getPointAtLength(value);
              dropRight.transform("t" + movePoint.x + "," + movePoint.y);
              if (dropRight.attr('display') == 'none') {
                dropRight.attr('display', 'inline');
              }
            }, 900, mina.easein, function() {
              dropRight.attr('display', 'none');
            });

            // bottom drop
            Snap.animate(0, dropBottomPathLen, function(value) {
              var movePoint = dropBottomPath.getPointAtLength(value);
              dropBottom.transform("t" + movePoint.x + "," + movePoint.y);
              if (dropBottom.attr('display') == 'none') {
                dropBottom.attr('display', 'inline');
              }
            }, 800, mina.easein, function() {
              dropBottom.attr('display', 'none');
            });
          };

          window.setInterval(dropsAnimation, 4000);
          dropsAnimation();
          // finished drops

          // Clouds
          window.setInterval(function() {
            cloudsAnimation(g.select("#clouds-left"), g.select("#clouds-right"));
          }, 7000);
          cloudsAnimation(g.select("#clouds-left"), g.select("#clouds-right"));

          window.setInterval(cloudsAnimation, 7000);
          cloudsAnimation();
          // finished clouds

        })();
        // End Ivory
        // ---
      });
    };

    if (Modernizr.svg) {
      setupSVG();
    }

    // setup scroll depth
    jQuery.scrollDepth();

    // menu button
    $('#menu-button').popover({
      placement: 'bottom',
      html: true,
      trigger: 'focus',
      content:   '<nav id="popover-nav">' +
                   '<ul>' +
                     '<li><a id="link-grameen-foundation" href="#grameen-foundation">Food Security</a></li>' +
                     '<li><a id="link-carter-center" href="#carter-center">Humanitarian Assistance</a></li>' +
                     '<li><a id="link-homelink" href="#homelink">Veteran Housing</a></li>' +
                     '<li><a id="link-clinton-global-initiative" href="#clinton-global-initiative">Impact Measurement</a></li>' +
                     '<li><a id="link-c4ads" href="#c4ads">Poaching</a></li>' +
                   '</ul>' +
                 '</nav>'
    }).on('shown.bs.popover', function() {
      var hash = getHashName(),
          $hashLink = $('#link-' + hash);

      if ($hashLink.length) {
        $hashLink.addClass('active');
      }
    });

    // menu animation
    var __animating = false;
    $document.on("click", '#popover-nav a', function(event) {
      if (__animating == false) {

        var hashName = $(this).attr('href').substring(1);
        var $hash = $('#mark-' + hashName);

        if ($hash.length) {
          __animating = true;
          $(document.body).animate({
            'scrollTop': $hash.offset().top - 100
          }, 800, function() {
            __animating = false;
          });
        }
      }

      $('#menu-button').popover('hide');
    });

    // hashupdater
    window.setInterval(function() {
      var hash = getHashName();
      var $section = getCurrentSection();
      if ($section && $section.length) {
        var section = $section.data('section');
        $('#popover-nav a').removeClass('active');
        if (section && section.length) {
          $('#link-' + section).addClass('active');
          if (hash != section) {
            location.hash = section;
          }
        }
      }
    }, 300);

    // animate if hash
    var hashName = getHashName();
    if (hashName) {
      var $hash = $('#mark-' + hashName);
      $(document.body).animate({
        'scrollTop': $hash.offset().top - 100
      }, 800);
    }
  });

})(window, document);
