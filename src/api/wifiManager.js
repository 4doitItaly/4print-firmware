const WifiManager = require('./wifi-manager')
const config = require('../../config')

WifiManager.init({debug: false, iface: config.network.iface, connectionTimeout: config.network.connectionTimeout})

export function wifiScan(cb) {
  WifiManager.scanForWiFi((err, response) => {
    if (err) {
      cb(err, networks)
      return
    }
    cb(null, response.networks)
  })
}

export function wifiConnect(ssid, password, cb) {
  setTimeout(() => {
    var ap = {
      ssid: ssid,
      password: password
    }
    var results = WifiManager.connectToAP(ap, (err, response) => {
      if (err) {
        cb(err, response)
      }
      cb(null, response)
    });
  }, 500)
}

export function check() {
  return WifiManager.getIfaceState()
}
