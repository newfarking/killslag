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

var a = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, i = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), r = e(require("../pages/single/singleStartPage")),
 n = e(require("../pages/single/singleGamePage")),
 o = e(require("../pages/single/singleGameOverPage")),
 s = e(require("../pages/single/singleFriendRankPage")),
 d = e(require("../network/network")),
 k = e(require("../store/storage")), v = require("../config"), S = function() {
    function e(a, i) {
        t(this, e), this.name = "single", 
        this.game = a, 
        this.gameCtrl = this.game.gameCtrl, 
        this.model = this.game.gameModel, 
        this.view = this.game.gameView, this.modeCtrl = i, 
        this.netWorkCtrl = this.gameCtrl.netWorkCtrl, 
        this.startPage = new r.default(a, null, null), 
        this.gamePage = new n.default(a), this.gameOverPage = new o.default(a), this.friendRankPage = new s.default(a, this.onProfile.bind(this)), 
        this.currentPage = null, this.lastPage = null, 
        this.socketTimeout = null, this.count = 1;
    }
    return i(e, [ {
        key: "init",
        value: function(e) {
            this.startPage.show(), this.model.setStage(this.startPage.name), 
            this.currentPage = this.startPage;
        }
    }, {
        key: "onProfile",
        value: function(e) {
            var t = this, i = k.default.getMyUserInfo();
            i && e.user_data.is_self && !e.user_data.playback_id && i.playback_id && (e.user_data.playback_id = i.playback_id), 
            e.user_data.playback_id || i.playback_id || (console.log("-----------------------------------"), 
            console.log("-----------------------------------"), console.log("-----------------------------------"), 
            console.log("-----------------------------------"), console.log("-----------------------------------"), 
            console.log("-----------------------------------"), console.log(e), console.log(i));
            var r = new g.default(a({}, e, {
                game: this.game,
                onReturn: function() {
                    t.gameCtrl.onReturnTo("friends");
                },
                onGoRecord: function(i) {
                    t.gameCtrl.reviewCtrl.init({
                        user_data: a({}, i, {
                            is_self: e.user_data.is_self
                        }),
                        is_from_share: !1,
                        onHide: function() {
                            t.gameCtrl.reviewCtrl.destroy(), r.showPage();
                        }
                    }), Array.isArray(i.routesArr) && t.reportReview(i.routesArr);
                }
            }));
            r.init(), Array.isArray(e.routesArr) && this.reportGoProfile(e.routesArr);
        }
    }, {
        key: "showStartPage",
        value: function() {
            this.hideCurrentPage(), this.startPage.show(), this.currentPage = this.startPage;
        }
    }, {
        key: "clickStart",
        value: function() {
            this.hideCurrentPage();
            this.gamePage.show(), this.game.replayGame(), this.model.setStage(this.gamePage.name), 
            this.currentPage = this.gamePage;
        }
    }, {
        key: "showGameOverPage",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.hideCurrentPage(), this.gameOverPage.show(t), this.model.setStage(this.gameOverPage.name), 
            this.currentPage = this.gameOverPage;
        }
    }, {
        key: "gameOverClickReplay",
        value: function() {
            this.clickStart();
        }
    }, {
        key: "showFriendRank",
        value: function(e) {
            e || (this.lastPage = this.currentPage), this.hideCurrentPage(), 
            this.friendRankPage.show(), this.model.setStage(this.friendRankPage.name), this.currentPage = this.friendRankPage;
        }
    }, {
        key: "friendRankReturn",
        value: function() {
            this.hideCurrentPage(), this.lastPage.show(), 
            this.model.setStage(this.lastPage.name), this.currentPage = this.lastPage;
        }
    }, {
        key: "clickRank",
        value: function() {
            this.showFriendRank();
        }
    }, {
        key: "afterLogin",
        value: function(e) {
            var t = this;
            e ? d.default.requestCreateGame(function(e, a) {
                e ? (t.model.setGameId(a.data.game_id), t.model.setGameTicket(a.data.up_op_ticket), 
                t.shareObservCardA()) : t.shareObservCardFail(a);
            }) : this.shareObservCardFail();
        }
    }, {
        key: "wxOnhide",
        value: function() {}
    }, {
        key: "wxOnShow",
        value: function() {
            "loading" == this.model.stage && (this.model.setStage("game"), this.modeCtrl.singleChangeToPlayer(), 
            this.currentPage = null);
        }
    }, {
        key: "destroy",
        value: function() {
            this.hideCurrentPage(), this.currentPage = null, this.model.setStage(""), this.model.clearGameId(), 
            this.model.clearGameTicket(), this.clearSocketTimeout(), this.game.resetScene();
        }
    }, {
        key: "hideCurrentPage",
        value: function() {
            this.currentPage && this.currentPage.hide();
        }
    } ]), e;
}();

exports.default = S;