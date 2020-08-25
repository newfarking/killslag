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

var r = function() {
    function e(e, t) {
        var r = [], n = !0, o = !1, i = void 0;
        try {
            for (var u, a = e[Symbol.iterator](); !(n = (u = a.next()).done) && (r.push(u.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            o = !0, i = e;
        } finally {
            try {
                !n && a.return && a.return();
            } finally {
                if (o) throw i;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), i = e(require("../network/network")), u = e(require("../store/storage")), s = function() {
    function e(r) {
        t(this, e), this.game = r, this.gameCtrl = r.gameCtrl, this.model = r.gameModel, 
        this.loginCb = null, this.serverConfigInterval = null, this.historyTimes = this.game.historyTimes;
    }
    return o(e, [ {
        key: "netWorkLogin",
        value: function(e) {
            e && (this.loginCb = e), i.default.requestLogin(this.afterRequestLogin.bind(this));
        }
    }, {
        key: "afterRequestLogin",
        value: function(e) {
        }
    }, {
        key: "afterGetUserInfo",
        value: function(e) {
            e.appeal_notify && this.gameCtrl.appealNotify();
        }
    }, {
        key: "requestServerInit",
        value: function() {
        }
    }, {
        key: "clearServerInit",
        value: function() {
            this.serverConfigInterval && clearInterval(this.serverConfigInterval);
        }
    }, {
        key: "upDateFriendsScoreList",
        value: function() {
        }
    }, {
        key: "updateUserInfo",
        value: function() {
        }
    }, {
        key: "updateFriendsScore",
        value: function(e, t) {
        }
    }, {
        key: "uploadScore",
        value: function(e) {
            i.default.requestSettlement(e);
        }
    }, {
        key: "requestSettlement",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            i.default.requestSettlement(e, t, r, n);
        }
    }, {
        key: "requestLogin",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
            i.default.requestLogin(e);
        }
    }, {
        key: "sendServerError",
        value: function() {
            i.default.sendServerError(2);
        }
    } ]), e;
}();

exports.default = s;