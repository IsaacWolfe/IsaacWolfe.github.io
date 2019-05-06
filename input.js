var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);

  const CMDS_ = [
    'clear', 'education', 'experience', 'help', 'involvement', 'ls', 'objective', 'skills'
  ];
    // const SECTION_ = [
    //     'objective', 'experience', 'technical skills', 'education', 'involvement'
    // ];
  
  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  //
  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode == 13) { // enter
      // Save shell history.
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      // Duplicate current input and append to output section.
      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      switch (cmd) {
        case 'objective':
              output("<p><i><b>Objective</b> Experienced in customer support over the phone as well as in person using a multitude of software tools with 4 years of schooling for Information Technology and an attitude to always learn and pursue new challenges.</i></p>");
              break;
        case 'experience':
              output("<p><b>Brandt Call Center</b>&nbsp &nbsp &nbsp &nbsp May 2017-Febuary 2018<br/><ul><li>Assisted on projects from developers that consisted of creating Windows 10 and Linux kiosk systems (eventually to be sent out to Florida Walmarts), debugging XML code and creating boot scripts.</li><li>Dealt with trouble shooting and fixing Windows 10 Thin Clients as well as TSP100 Cutter printers over phone using Teamviewer and created tickets with an in-house ticketing system.</li></ul><b>Jimmy Johns, Driver/In-Shop</b>&nbsp &nbsp &nbsp &nbsp Febuary-May 2016<br/><ul><li>Organized and directed driver’s route.</li><li>Sampled to local businesses to build customer relations and Jimmy Johns presence at local events.</li></ul></p>");
              break;
        case 'skills':
              output("<p><b>Languages:</b> HTML, CSS, SQL, Python2, Python3, C++, BASH, WSH, Java, XML, Markdown, Latex, R<br/><br/><b>Software:</b> MySQL Workbench, R Studio, GoDot, Android Studios, Virtual Box, Teamviewer, Redo Backup<br/><br/><b>Operating Systems:</b> Windows 8, Windows 10, Ubuntu 16, Fedora 27, Kali 2017<br/><br/><b>Certification:</b> Word 2012, Excel 2012, PowerPoint 2012, Microsoft Technology Associate Security, Microsoft Technology Associate Networking</p>");
              break;
        case 'education':
              output("<p>Florida State University, Tallahassee FL | Graduation Date: Fall 2018<br/>Pursuing Bachelors of Science in Information Technology with specialization in Networking and Security</p>");
              break;
        case 'involvement':
              output("<p><ul><li>Head of Website Committee to maintain Sigma Pi of Florida State’s Website</li><li>Member of Sigma Pi Fraternity of Florida State University, Eta Epsilon Chapter</li><li>Experience in lobbying in Washington D.C.</li><li>Volunteered at Juvenile Diabetes Research Foundation Tampa Chapter:<ul><li>100+ hours of volunteering</li><li>Setup spreadsheets on Excel and organized mailing lists</li><li>Helped organize and run major yearly events</li></li></ul></p>");
              break;
        // case 'cat':
              // switch (section) {
              //   var [cmd, section] = str.split(" ");
              //     case 'objective':
              //         output("<p><i><b>Objective</b> Experienced in customer support over the phone as well as in person using a multitude of software tools with 4 years of schooling for Information Technology and an attitude to always learn and pursue new challenges.</i></p>");
              //     default:
              //         output("<p>Please enter a valid option.</p>");
              // };
          // var url = args.join(' ');
          // if (!url) {
          //   output('Usage: ' + cmd + ' https://s.codepen.io/...');
          //   output('Example: ' + cmd + ' https://s.codepen.io/AndrewBarfield/pen/LEbPJx.js');
          //   break;
          // }
          // $.get( url, function(data) {
          //   var encodedStr = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
          //      return '&#'+i.charCodeAt(0)+';';
          //   });
          //   output('<pre>' + encodedStr + '</pre>');
          // });          
          // break;
        case 'clear':
          output_.innerHTML = '';
          this.value = '';
          return;
        // case 'clock':
        //   var appendDiv = jQuery($('.clock-container')[0].outerHTML);
        //   appendDiv.attr('style', 'display:inline-block');
        //   output_.appendChild(appendDiv[0]);
        //   break;
        // case 'date':
        //   output( new Date() );
        //   break;
        // case 'echo':
          // output( args.join(' ') );
          // break;
        case 'help':
          output('<p>Type each command you would like to use. The \'ls\' command will list each part of the resume that\'s viewable, to view the section just type the section name.</p><div class="ls-files">' + CMDS_.join('<br>') + '</div>');
          break;
        // case 'uname':
        //   output(navigator.appVersion);
        //   break;
        // case 'whoami':
        //   var result = "<img src=\"" + codehelper_ip["Flag"]+ "\"><br><br>";
        //   for (var prop in codehelper_ip)
        //     result += prop + ": " + codehelper_ip[prop] + "<br>";
        //   output(result);
        //   break;
        case 'ls':
          output('<p>Objective &nbsp Experience &nbsp Skills &nbsp Education &nbsp Involvement &nbsp Website</p>');
          break;
        case 'website':
              window.location.href="http://isaacwolfe.net";
              break;
        default:
          if (cmd) {
            output(cmd + ': command not found');
          }
      };

      window.scrollTo(0, getDocHeight_());
      this.value = ''; // Clear/setup line for next input.
    }
  }

  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function(entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });

    var height = entries.length <= 3 ?
        'height: ' + (entries.length * 15) + 'px;' : '';

    // 12px monospace font yields ~7px screen width.
    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
  }

  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  // Cross-browser impl to get document's height.
  function getDocHeight_() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  //
  return {
    init: function() {
      // output('<img align="left" src="http://www.w3.org/html/logo/downloads/HTML5_Badge_128.png" width="100" height="100" style="padding: 0px 10px 20px 0px"><h2 style="letter-spacing: 4px">HTML5 Web Terminal</h2><p>' + new Date() + '</p><p>Enter "help" for more information.</p>');
    },
    output: output
  }
};
