function o(o, e) {
    if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function o(o, e) {
        for (var n = 0; n < e.length; n++) {
            var t = e[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(o, t.key, t);
        }
    }
    return function(e, n, t) {
        return n && o(e.prototype, n), t && o(e, t), e;
    };
}(), n = function() {
    function n(e) {
        o(this, n), this.game = e;
    }
    return e(n, [ {
        key: "init",
        value: function() {}
    }, {
        key: "showIdentifyModeErr",
        value: function(o) {
            this.showModal(o);
        }
    }, {
        key: "showNoSession",
        value: function() {
            this.showModal();
        }
    }, {
        key: "showModal",
        value: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "网络异常,点击确定回到游戏";
            wx.showModal({
                title: "提示",
                content: o,
                showCancel: !1
            });
        }
    }, {
        key: "showSyncopErr",
        value: function() {}
    } ]), n;
}();

exports.default = n;