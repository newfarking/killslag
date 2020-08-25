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

var r = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
}, o = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), i = e(require("./control/queryCtrl")), a = e(require("./control/modeCtrl")), s = e(require("./control/networkCtrl")), h = (require("./lib/animation"), 
require("./config")), c = e(require("./store/session")), f = function() {
    function e(r) {
        t(this, e), this.game = r;
    }
    return o(e, [ {
        key: "init",
        value: function() {
            this.gameView = this.game.gameView;
            this.queryCtrl = new i.default(this.game);
            this.netWorkCtrl = new s.default(this.game);
            this.modeCtrl = new a.default(this.game); 
            this.model = this.game.gameModel;
            this.reporter = this.game.reporter;
            this.historyTimes = this.game.historyTimes;
            this.viewer = this.game.viewer;
        }
    }, {
        key: "firstInitGame",
        value: function(e) {
            this.queryCtrl.identifyMode(e), this.modeCtrl.initFirstPage(e);
        }
    }, {
        key: "identifyModeErr",
        value: function(e) {
            this.gameView.showIdentifyModeErr(e);
        }
    }, {
        key: "onLoginSuccess",
        value: function() {
        }
    }, {
        key: "clickStart",
        value: function() {
            this.modeCtrl.clickStart();
        }
    }, {
        key: "showFriendRank",
        value: function() {
            this.modeCtrl.showFriendRank();
        }
    }, {
        key: "onReturnTo",
        value: function(e) {
            "group" == e ? this.modeCtrl.changeMode("singleCtrl") : "friends" == e ? this.modeCtrl.showFriendRank(!0) : "home" == e && this.modeCtrl.showStartPage();
        }
    }, {
        key: "clickRank",
        value: function() {
            this.modeCtrl.clickRank();
        }
    }, {
        key: "gameOver",  // 储存&更新数据
        value: function(e) {
            if ("relay" != this.model.mode) {
                if (this.model.setScore(e), "observe" != this.model.mode) {
                    var t = this.model.getHighestScore();
                    this.historyTimes.addOne();
                    var r = this.historyTimes.getTimes();
                    e < this.model.getHighestScore() ? this.reporter.playGameReport(e, t, r) : 1;
                }
                // this.reporter.sendReport();
            }
        }
    }, {
        key: "gameOverShowPage",
        value: function() {
            var e = this;
            if ("relay" != this.model.mode) if ("observe" == this.model.mode) this.modeCtrl.showGameOverPage(); else {
                this.model.getHighestScore();
                var t = this.model.getHighestScore(), r = this.model.currentScore;
                r > t ? (this.modeCtrl.showGameOverPage(), this.historyTimes.checkUp()) : function() {
                    var o = e.historyTimes.getTimes();
                    e.model.upLoadScoreData = {
                        currentScore: r,
                        gameTimes: o,
                        verifyData: t
                    }
                    // setUserCloudStorage
                    e.netWorkCtrl.requestSettlement(r, o, e.afterRequestSettlement.bind(e), t); 
                }();
            }
        }
    }, {
        key: "afterRequestSettlement",
        value: function(e, t, o) {

            function i(e, t) {
                a.modeCtrl.showGameOverPage(r({}, e, t, {}));
            }
            var a = this;
            if (e) {
                i(t, o);
                var n = this.model.upLoadScoreData.currentScore;
                if (void 0 == n || t && t.banType) return;
                n <= this.model.weekBestScore && (this.model.weekBestScore = n, this.model.saveWeekBestScore(n), 
                n < this.model.getHighestScore() && this.model.saveHeighestScore(this.model.currentScore));
            } else this.netWorkCtrl.sendServerError();
        }
    }, {
        key: "clickReplay",
        value: function() {
            this.modeCtrl.gameOverClickReplay();
        }
    }, {
        key: "friendRankReturn",
        value: function() {
            this.modeCtrl.friendRankReturn();
        }
    }, {
        key: "netWorkLogin",
        value: function() {
            this.netWorkCtrl.netWorkLogin();
        }
    }, {
        key: "showPlayerGG",
        value: function(e) {
            this.modeCtrl.showPlayerGG(e);
        }
    }, {
        key: "wxOnShow",
        value: function(e) {
            var t = this;
            setTimeout(function() {
                e.query && e.query.hasOwnProperty("mode") ? (t.modeCtrl.reInitFirstPage(e), 
                t.game.guider = !1) : "single" != t.model.mode && "player" != t.model.mode && "battle" != t.model.mode && "relay" != t.model.mode ? (
                t.modeCtrl.changeMode("singleCtrl"), t.game.guider = !1) : t.modeCtrl.wxOnShow();
            }, 300);
        }
    }, {
        key: "wxOnhide",
        value: function() {
            this.modeCtrl.wxOnhide();
        }
    }, {
        key: "onReplayGame",
        value: function() {
        }
    }, {
        key: "onServerConfigForbid",
        value: function() {}
    }, {
        key: "appealNotify",
        value: function() {
            this.modeCtrl.appealNotify();
        }
    }, {
        key: "afterShownStartPage",
        value: function() {
            this.modeCtrl.afterShownStartPage();
        }
    } ]), e;
}();

exports.default = f;