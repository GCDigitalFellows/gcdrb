module.exports = function (request, baby, yaml, fs, escape) {
  var docurl = 'https://docs.google.com/spreadsheets/d/16RfbdrnDHhRgP2iZwNw6AVSyWy5VoKn0nB0CpyMa658/pub?';
  return {
    workshops: function (done) {
      var sheet = '585110058',
          outfile = 'workshops.yml';
      request(docurl + 'gid=' + sheet + '&single=true&output=csv',
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            var rows = baby.parse(body, {header: true}).data;
            fs.writeFile('src/_data/' + outfile,
              yaml.dump(rows),
              function (err) {
                if (err) {
                  return console.log(err);
                }
                console.log('Wrote src/_data/' + outfile);
              });
          } else {
            console.log('Failed to download the ' + outfile + ' data from Google Docs.');
            console.log('Error: ' + error);
            console.log('Response: ' + response);
          }
        });
      done();
    },

    people: function (done) {
      var rows,
          sheet = '1411565774',
          outfile = 'people.yml';
      request(docurl + 'gid=' + sheet + '&single=true&output=csv',
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            rows = baby.parse(body, {header: true, skipEmptyLines: true, comments: '//'}).data;
            for (var c = 0; c < rows.length; c++) {
              rows[c].bio = '<p>' + escape(rows[c].bio) + '</p>';
              rows[c].bio = rows[c].bio.replace(/(\n)/g, '</p><p>');
            };
            fs.writeFile('src/_data/' + outfile,
              yaml.dump(rows),
              function (err) {
                if (err) {
                  return console.log(err);
                }
                console.log('Wrote src/_data/' + outfile);
              });
          } else {
            console.log('Failed to download the ' + outfile + ' data from Google Docs.');
            console.log('Error: ' + error);
            console.log('Response: ' + response);
          }
        });
      done();
    },

    partners: function (done) {
      var rows,
          sheet = '2001419383',
          outfile = 'partners.yml';
      request(docurl + 'gid=' + sheet + '&single=true&output=csv',
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            rows = baby.parse(body, {header: true, skipEmptyLines: true, comments: '//'}).data;
            fs.writeFile('src/_data/' + outfile,
              yaml.dump(rows),
              function (err) {
                if (err) {
                  return console.log(err);
                }
                console.log('Wrote src/_data/' + outfile);
              });
          } else {
            console.log('Failed to download the ' + outfile + ' data from Google Docs.');
            console.log('Error: ' + error);
            console.log('Response: ' + response);
          }
        });
      done();
    },

    schedule: function (done) {
      var sheet = '0',
          outfile = 'schedule.yml';
      request(docurl + 'gid=' + sheet + '&single=true&output=csv',
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            var rows = baby.parse(body, {header: true, skipEmptyLines: true}).data;
            var outData = [];
            for (var i = 0; i < rows.length; i++) {
              var row = rows[i];
              if (row.Time.indexOf('Day') > -1) {
                outData.push({day: row.Time, date: row.Session, timeslots: []});
              } else {
                if (row.Track1 && row.Session) {
                  outData[outData.length - 1].timeslots.push({
                    time: row.Time,
                    session: row.Session,
                    title: row.Track1,
                    room: row.Room,
                    instructor: row.InstructorsTrack1,
                    link: row.link1,
                    track: 1
                  });
                }
                if (row.Track2 && row.Session) {
                  outData[outData.length - 1].timeslots.push({
                    time: row.Time,
                    session: row.Session,
                    title: row.Track2,
                    room: row.Room2,
                    instructor: row.InstructorsTrack2,
                    link: row.link2,
                    track: 2
                  });
                }
                if (!row.Session && row.Time) {
                  outData[outData.length - 1].timeslots.push({
                    time: row.Time,
                    title: row.Track1,
                    room: row.Room,
                    track: 0
                  });
                }
              }
            }

            fs.writeFile('src/_data/' + outfile,
              yaml.dump(outData),
              function (err) {
                if (err) {
                  return console.log(err);
                }
                console.log('Wrote src/_data/' + outfile);
              });
          } else {
            console.log('Failed to download the ' + outfile + ' data from Google Docs.');
            console.log('Error: ' + error);
            console.log('Response: ' + response);
          }
        });
      done();
    }
  };
};
