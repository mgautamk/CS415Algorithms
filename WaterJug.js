function pour(indexA, indexB, glasses) {  // Pour from A to B.
  var a = glasses[indexA],
      b = glasses[indexB],
      delta = Math.min(a.volume, b.max - b.volume);
  a.volume -= delta;
  b.volume += delta;
}

function glassesToKey(glasses) {
  return JSON.stringify(glasses);
}

function keyToGlasses(key) {
  return JSON.parse(key);
}

function print(s) {
  s = s || '';
  document.write(s + '<br />');
}

function displayKey(key) {
  var glasses = keyToGlasses(key);
      parts = glasses.map(function (glass) {
        return glass.volume + '/' + glass.max;
      });
  print('volumes: ' + parts.join(', '));
}

var startGlasses = [ { volume: 0, max: 10 },
                     { volume: 9, max: 9 },
                     { volume: 2, max: 2 } ];

var startKey = glassesToKey(startGlasses);

function solve(targetVolume) {
  var actions = {},
      queue = [ startKey ],
      tail = 0;
  while (tail < queue.length) {
    var key = queue[tail++];                          // Pop from tail.
    for (var i = 0; i < startGlasses.length; ++i) {   // Pick source.
      for (var j = 0; j < startGlasses.length; ++j) { // Pick target.
        if (i != j) {
          var glasses = keyToGlasses(key);
          pour(i, j, glasses);
          var nextKey = glassesToKey(glasses);
          if (actions[nextKey] !== undefined) {
            continue;
          }
          actions[nextKey] = { key: key, source: i, target: j };
          for (var k = 1; k < glasses.length; ++k) {
            if (glasses[k].volume === targetVolume) { // Are we done?
              var path = [ actions[nextKey] ];
              while (key != startKey) {               // Backtrack.
                var action = actions[key];
                path.push(action);
                key = action.key;
              }
              path.reverse();
              path.forEach(function (action) {        // Display path.
                displayKey(action.key);
                print('pour from glass ' + (action.source + 1) +
                      ' to glass ' + (action.target + 1));
                print();
              });
              displayKey(nextKey);
              return;
            }
            queue.push(nextKey);
          }
        }
      }
    }
  }
}
