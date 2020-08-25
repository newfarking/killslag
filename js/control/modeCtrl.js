function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function r(t, r) {
    if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, r) {
        for (var e = 0; e < r.length; e++) {
            var n = r[e];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(r, e, n) {
        return e && t(r.prototype, e), n && t(r, n), r;
    };
}(), n = t(require("./singleCtrl")), C = require("../config"), y = function() {
    function t(e) {
        r(this, t), this.game = e, this.singleCtrl = new n.default(e, this),
        this.model = e.gameModel, this.gameCtrl = e.gameCtrl, this.currentCtrl = null;
        // o.default.on(C.EVENT.GOSTARTPAGE, this.goToSingleStartPage.bind(this));
    }
    return e(t, [ {
        key: "initFirstPage",
        value: function(t) {
            var r = this.model.getMode();
            switch (console.log("init???", t, r), r) {
              case "single":
                this.currentCtrl = this.singleCtrl, this.singleCtrl.init(t), this.gameCtrl.netWorkLogin();
                break;

              default:
                this.currentCtrl = this.singleCtrl, this.model.setMode("single"), this.singleCtrl.init(t), 
                this.gameCtrl.netWorkLogin();
            }
        }
    }, {
        key: "reInitFirstPage",
        value: function(t) {
            var r = this;
            this.currentCtrl && (this.currentCtrl.destroy(), this.gameCtrl.reviewCtrl.destroy(), 
            this.currentCtrl = null), this.gameCtrl.queryCtrl.identifyMode(t), setTimeout(function() {
                r.initFirstPage(t);
            }, 500);
        }
    }, {
        key: "clickStart",
        value: function() {
            this.currentCtrl && this.currentCtrl.clickStart && this.currentCtrl.clickStart();
        }
    }, {
        key: "showGameOverPage",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.showGameOverPage && this.currentCtrl.showGameOverPage(t);
        }
    }, {
        key: "gameOverClickReplay",
        value: function() {
            this.currentCtrl && (this.currentCtrl.gameOverClickReplay ? this.currentCtrl.gameOverClickReplay() : this.game.handleWxOnError({
                message: "cannot Find this.currentCtrl.gameOverClickReplay",
                stack: this.game.mode + "" + this.game.stage
            }));
        }
    }, {
        key: "showFriendRank",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.showFriendRank && this.currentCtrl.showFriendRank(t);
        }
    }, {
        key: "showStartPage",
        value: function() {
            this.currentCtrl && this.currentCtrl.showStartPage && this.currentCtrl.showStartPage();
        }
    }, {
        key: "friendRankReturn",
        value: function() {
            this.currentCtrl && this.currentCtrl.friendRankReturn && this.currentCtrl.friendRankReturn();
        }
    }, {
        key: "clickRank",
        value: function() {
            this.currentCtrl && this.currentCtrl.clickRank && this.currentCtrl.clickRank();
        }
    }, {
        key: "changeMode",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.destroy && (this.currentCtrl.destroy(), this.gameCtrl.reviewCtrl.destroy()), 
            this.model.setMode(this[t].name), this.currentCtrl = this[t], "singleCtrl" === t && o.default.emitSync(C.EVENT.GOTOSINGLESTARTPAGE, {}), 
            this[t].init();
        }
    }, {
        key: "singleChangeToPlayer",
        value: function() {
            this.model.setMode(this.playerCtrl.name), this.currentCtrl = this.playerCtrl, this.playerCtrl.init();
        }
    }, {
        key: "directPlaySingleGame",
        value: function() {
            this.currentCtrl && this.currentCtrl.destroy(), this.model.setMode(this.singleCtrl.name), 
            this.currentCtrl = this.singleCtrl, this.singleCtrl.clickStart();
        }
    }, {
        key: "goToSingleStartPage",
        value: function(t) {
            this.currentCtrl == this.singleCtrl && this.game.reporter.singleBackStart(), this.changeMode("singleCtrl");
        }
    }, {
        key: "afterShownStartPage",
        value: function() {
            this.currentCtrl && this.currentCtrl.afterShownStartPage && this.currentCtrl.afterShownStartPage();
        }
    }, {
        key: "wxOnShow",
        value: function() {
            this.currentCtrl && this.currentCtrl.wxOnShow && this.currentCtrl.wxOnShow();
        }
    }, {
        key: "wxOnhide",
        value: function() {
            this.currentCtrl && this.currentCtrl.wxOnhide && this.currentCtrl.wxOnhide();
        }
    } ]), t;
}();

exports.default = y;