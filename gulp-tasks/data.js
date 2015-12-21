module.exports = function (request, baby, yaml, fs) {
  return {
    workshops: function (done) {
      request('https://docs.google.com/spreadsheets/d/16RfbdrnDHhRgP2iZwNw6AVSyWy5VoKn0nB0CpyMa658/pub?gid=585110058&single=true&output=csv',
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            var csvData = baby.parse(body, {header: true});
            fs.writeFile('src/_data/workshops.yml',
              yaml.dump(csvData.data),
              function (err) {
                if (err) {
                  return console.log(err);
                }
                console.log('Wrote src/_data/workshops.yml');
              });
          } else {
            console.log('Failed to download the workshop data from Google Docs.');
            console.log('Error: ' + error);
            console.log('Response: ' + response);
          }
        });
      done();
    },

    people: function (done) {
      var rows;
      request('https://docs.google.com/spreadsheets/d/16RfbdrnDHhRgP2iZwNw6AVSyWy5VoKn0nB0CpyMa658/pub?gid=1411565774&single=true&output=csv',
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            rows = baby.parse(body, {header: true, skipEmptyLines: true, comments: '//'}).data;
            fs.writeFile('src/_data/people.yml',
              yaml.dump(rows),
              function (err) {
                if (err) {
                  return console.log(err);
                }
                console.log('Wrote src/_data/people.yml');
              });
          } else {
            console.log('Failed to download the workshop data from Google Docs.');
            console.log('Error: ' + error);
            console.log('Response: ' + response);
          }
        });
      done();
    },

    schedule: function (done) {
      request('https://docs.google.com/spreadsheets/d/16RfbdrnDHhRgP2iZwNw6AVSyWy5VoKn0nB0CpyMa658/pub?gid=0&single=true&output=csv',
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            var csvData = baby.parse(body, {header: true, skipEmptyLines: true});
            var rows = csvData.data;
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
                if (!row.Session) {
                  outData[outData.length - 1].timeslots.push({
                    time: row.Time,
                    title: row.Track1,
                    room: row.Room,
                    track: 0
                  });
                }
              }
            }

            fs.writeFile('src/_data/schedule.yml',
              yaml.dump(outData),
              function (err) {
                if (err) {
                  return console.log(err);
                }
                console.log('Wrote src/_data/schedule.yml');
              });
          } else {
            console.log('Failed to download the schedule data from Google Docs.');
            console.log('Error: ' + error);
            console.log('Response: ' + response);
          }
        });
      done();
    }
  };
};
