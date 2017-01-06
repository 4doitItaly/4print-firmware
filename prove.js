var WiFiControl = require('./dist/api/wifi-control-node');

  //  Initialize wifi-control package with verbose output
  WiFiControl.init({
    debug: true,
    iface: 'wlp3s0'
  });

  let res = WiFiControl.getIfaceState()
console.log(res);
  // WiFiControl.scanForWiFi( function(err, response) {
  //   if (err) console.log(err);
  //   console.log(response);
  //   response.networks.forEach((res) => {
  //     console.log(res);
  //   })
  // });

  // var _ap = {
  //   ssid: "You Shall Not Quack!",
  //   password: "Duckj4lf!"
  // };
  // var results = WiFiControl.connectToAP( _ap, function(err, response) {
  //   if (err) console.log(err);
  //   console.log(response);
  // });
