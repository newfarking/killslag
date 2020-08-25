function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t;
    };
}(), r = e(require("./network")), s = require("../config"), n = function() {
    function e() {
        t(this, e), this.timeOut = null, this.reportList = [], this.singleState = 0,  this.gameStartTime = 0;
        try {
            var i = wx.getSystemInfoSync();
            this.clientInfo = {
                platform: i.platform,
                brand: i.brand,
                model: i.model,
                system: i.system
            };
        } catch (e) {
            console.log(e);
        }
        this.relayGameStartTime = 0, this.bindEvent();
    }
    return i(e, [ {
        key: "bindEvent",
        value: function() {
        }
    }, {
        key: "getTime",
        value: function() {
            var e = Date.now();
            return e = Math.floor(e / 1e3);
        }
    }, {
        key: "enterReport",
        value: function(e) {
        }
    }, {
        key: "quitReport",
        value: function() {
        }
    }, {
        key: "playGameReport",
        value: function(e, t, i) {
            wx.setUserCloudStorage({
                KVDataList: [ {
                    key: "score",
                    value: e + ''
                } ]
            });
        }
    }, {
        key: "record",
        value: function(e) {
            if ("number" == typeof e) {
                var t = {
                    ts: this.getTime(),
                    type: e
                };
                this.reportList.push(t);
            }
        }
    }, {
        key: "bestShare",
        value: function(e) {
            e && ("week" == e && this.weekBestShare(), "history" == e && this.historyShare());
        }
    }, {
        key: "sendReport",
        value: function() {
        }
    }, {
        key: "clearTimer",
        value: function() {
            this.timeOut && clearInterval(this.timeOut);
        }
    }, {
        key: "setTimer",
        value: function(e) {
            this.timeOut = setInterval(this.sendReport.bind(this), e);
        }
    } ]), e;
}();

exports.default = n;