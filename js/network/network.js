function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function a(e, t, a) {
    var s = {};
    return a.map(function(e) {
        s[e.item_id] = e.poster_min;
    }), e.bottle_skin = s[e.bottle_skin_id], t.map(function(e) {
        e.bottle_skin = s[e.bottle_skin_id];
    }), {
        my_user_info: e,
        user_info: t
    };
}

function s(e, t) {
    var a = t ? e + "(" + t + ")" : e;
    wx.showModal({
        title: "提示",
        content: a,
        showCancel: !1
    });
}

function n() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = void 0;
    try {
        t = JSON.parse(e.resources) || {};
    } catch (e) {
        t = {};
    }
    var a = void 0, s = void 0;
    return e.expire_time && (s = Math.floor(Date.now() / 1e3), a = e.expire_time - s), 
    {
        display_info: t.display_info || {},
        img: t.display_info && t.display_info.poster,
        use_status: e.useble || 0,
        unlock_wording: t.display_info && t.display_info.unlock_wording,
        left_time: a,
        expire_time: e.expire_time,
        type: t.type,
        id: e.item_id,
        property: t.property
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
    }
    return e;
}, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var s = t[a];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, a, s) {
        return a && e(t.prototype, a), s && e(t, s), t;
    };
}();


var u = e(require("../store/session")), d = e(require("../store/storage")), m = function() {
    function e() {
        t(this, e);
    }
    return r(e, null, [ {
        key: "login",
        value: function() {
            var e = this, t = this.loginPromise = new Promise(function(e, t) {
                console.log("wx.login"), wx.login({
                    success: function(a) {
                        a.code ? (u.default.setLoginState(a.code), e(a.code)) : t("sessionId get fail have no res.code");
                    },
                    fail: function() {
                        console.log("wx.login fail"), t("sessionId get fail");
                    }
                });
            });
            return t.catch(function() {
                e.loginPromise = null;
            }), t;
        }
    }, {
        key: "requestLogin",
        value: function(e) {
            e || (e = function() {}), this.loginPromise || this.login(), this.loginPromise.then(function() {
                e(!0);
            }, function(t) {
                e(!1);
            });
        }
    }, {
        key: "requestSettlement",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            if (u.default.sessionId) {
                a(!0, {
                    banType: 0
                }, null);
                return;
            } else a(!1, "n0");
        }
    } ]), e;
}();

exports.default = m;
