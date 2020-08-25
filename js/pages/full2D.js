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
            var a = t[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, i, a) {
        return i && e(t.prototype, i), a && e(t, a), t;
    };
}(), a = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../lib/three")), s = require("../config"), n = e(require("../text")), r = require("../lib/animation"), o = (e(require("../store/storage")), 
e(require("../scroll/scrollHandler")), e(require("../report")), require("./pages2d/base")), h = require("./pages2d/start"), l = require("./pages2d/beginner"), u = require("./pages2d/rank"), p = require("./pages2d/gg"), S = window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio, E = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, x = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth, _ = x * S, P = E * S, R = [ "btn", "list1", "list2", "bg" ], b = s.FRUSTUMSIZE, C = (wx.loadFont("res/num.ttf"), 
function() {
    function e(i) {
        var h = this;
        t(this, e), this.texture = {}, this.material = {}, this.geometry = {}, this.obj = {}, 
        this.canvas = {}, this.context = {}, this._touchInfo = {
            trackingID: -1,
            maxDy: 0,
            maxDx: 0
        }, this.maxscroll = 0, this.options = Object.assign({}, {}, i), this.imgid = {
            btn: 0,
            bg: 0,
            list1: 0,
            list2: 0
        }, this.options.friendRankReturn = i.friendRankReturn,  this.options.onClickRank = i.onClickRank, 
        this.options.onClickReplay = i.onClickReplay, this.options.onClickShare = i.onClickShare, 
        this.options.onClickPureShare = i.onClickPureShare, this.options.onClickStart = i.onClickStart, 
        this.options.onShowFriendRank = i.onShowFriendRank;
    }
    return i(e, [ {
        key: "showFriendRankList",
        value: function(e) {
            this.opt = e || {}, (0, u.drawFriendRankList)({
                self: this
            });
            var minebody = this;
            wx.getOpenDataContext().postMessage({
                type: 'friend',
                key: 'score',
                openId: ''
              })
              minebody.options.camera.add(minebody.options.ranking);
              setTimeout(function() {
                minebody.options.rankingTexture.needsUpdate = true
              }, 5e2);
              setTimeout(function() {
                minebody.options.rankingTexture.needsUpdate = true
            }, 1500);
            setTimeout(function() {
                minebody.options.rankingTexture.needsUpdate = true
            }, 3e3);
              return;
        }
    }, {
        key: "showGroupRankList",
        value: function(e, t) {
            (0, u.drawGroupRankList)(this, e, t);
        }
    }, {
        key: "showGameOverPage",
        value: function(e) {
            e = e || {}, this.opt = e, (0, p.routeGameOver)(this);
        }
    }, {
        key: "showStartPage",
        value: function(e) {
            o.DEBUGVIEW || (this.opt = e || {}, (0, h.drawStartPage)(this));
        }
    }, {
        key: "updateStartPage",
        value: function() {
            this.canvasType == o.CANVASTYPE.start && 1 != this.opt.hideRank && (0, h.drawStartUpdate)(this);
        }
    }, {
        key: "showBeginnerPage",
        value: function() {
            (0, l.drawBeginnerPage)({
                self: this
            });
        }
    }, {
        key: "hide2D",
        value: function() {
            this.options.camera.remove(this.options.ranking);
            (0, o.hide)(this);
        }
    }, {
        key: "hide2DGradually",
        value: function() {
            if (!o.DEBUGVIEW) for (var e = this, t = 0; t < R.length; t++) this.obj[R[t]] && r.customAnimation.to(this.material[R[t]], 1, {
                opacity: 0,
                onComplete: function(t) {
                    return function() {
                        e.material[R[t]].opacity = 1, e.obj[R[t]].visible = !1, e.showState = !1, e.options.camera.remove(e.obj[R[t]]);
                    };
                }(t)
            });
        }
    }, {
        key: "_findDelta",
        value: function(e) {
            var t = this._touchInfo, i = e.touches[0] || e.changedTouches[0];
            return i ? {
                x: i.pageX - t.x,
                y: i.pageY - t.y
            } : null;
        }
    }, {
        key: "doTouchStartEvent",
        value: function(e) {
            if (this.showState) {
                var t = e.changedTouches[0].pageX, i = e.changedTouches[0].pageY;
                if (this.startX = t, this.startY = i, this.canvasType == o.CANVASTYPE.friendRank || this.canvasType == o.CANVASTYPE.groupRank || this.canvasType == o.CANVASTYPE.pk || this.canvasType == o.CANVASTYPE.relayRank || this.canvasType == o.CANVASTYPE.msgBox || this.canvasType == o.CANVASTYPE.shareSkin) {
                    var a = this._touchInfo, s = this.scrollHandler;
                    if (!s) return;
                    a.trackingID = "touch", a.x = e.touches[0].pageX, a.y = e.touches[0].pageY, a.maxDx = 0, 
                    a.maxDy = 0, a.historyX = [ 0 ], a.historyY = [ 0 ], a.historyTime = [ +new Date() ], 
                    a.listener = s, s.onTouchStart && s.onTouchStart();
                } else this.canvasType == o.CANVASTYPE.gameOver ? (t = this._cxp(t), i = this._cyp(i), 
                "skin" != this.opt.type && "tired" != this.opt.type && t > 207 && t < 360 && i > 540 && i < 660 && this._drawGameOverBtnClick()) : this.canvasType == o.CANVASTYPE.start && (t = this._cxp(t), 
                i = this._cyp(i), t > 86 && t < 318 && i > 458 && i < 552 && this._drawStartClick());
            }
        }
    }, {
        key: "doTouchMoveEvent",
        value: function(e) {
            if (this.showState && (this.canvasType == o.CANVASTYPE.friendRank || this.canvasType == o.CANVASTYPE.groupRank || this.canvasType == o.CANVASTYPE.pk || this.canvasType == o.CANVASTYPE.relayRank || this.canvasType == o.CANVASTYPE.msgBox || this.canvasType == o.CANVASTYPE.shareSkin)) {
                var t = this._touchInfo;
                if (-1 == t.trackingID) return;
                e.preventDefault();
                var i = this._findDelta(e);
                if (!i) return;
                t.maxDy = Math.max(t.maxDy, Math.abs(i.y)), t.maxDx = Math.max(t.maxDx, Math.abs(i.x));
                var a = +new Date();
                for (t.historyX.push(i.x), t.historyY.push(i.y), t.historyTime.push(a); t.historyTime.length > 10; ) t.historyTime.shift(), 
                t.historyX.shift(), t.historyY.shift();
                t.listener && t.listener.onTouchMove && t.listener.onTouchMove(i.x, i.y, a);
            }
        }
    }, {
        key: "doTouchEndEvent",
        value: function(e) {
            if (this.showState) {
                var t = e.changedTouches[0].pageX, i = e.changedTouches[0].pageY, a = i, s = !0;
                if (this.canvasType != o.CANVASTYPE.friendRank && this.canvasType != o.CANVASTYPE.groupRank && this.canvasType != o.CANVASTYPE.pk && this.canvasType != o.CANVASTYPE.relayRank && this.canvasType != o.CANVASTYPE.msgBox && this.canvasType != o.CANVASTYPE.record && this.canvasType != o.CANVASTYPE.shareSkin || !(Math.abs(t - this.startX) > 5 || Math.abs(i - this.startY) > 5) || (s = !1), 
                t = this._cxp(t), i = this._cyp(i), this.canvasType == o.CANVASTYPE.start && this._drawStartClickRevert(), 
                s) {
                    if (this.canvasType == o.CANVASTYPE.gameOver && !1 === (0, p.gameOverEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.groupRank && !1 === (0, u.groupRankEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.friendRank && !1 === (0, u.friendRankEve)(this, t, i, this._cyp(a - this.lastScrollY))) return !1;
                    if (this.canvasType == o.CANVASTYPE.start && !1 === (0, h.startEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.pk && !1 === (0, c.pkEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.lookers && !1 === (0, y.lookersEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.verify && !1 === (0, d.verifyEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.relayRoom && !1 === (0, v.relayRoomEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.relayRank && !1 === (0, v.relayRankEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.relayGG && !1 === (0, v.relayGGEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.relayBeginner && !1 === (0, v.relayBeginnerEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.relayQr && !1 === (0, v.relayQrEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.record && !1 === (0, T.recordEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.recordShare && !1 === (0, T.recordShareEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.profile && !1 === (0, f.profileEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.msgBox && !1 === (0, g.msgBoxEve)(this, t, i, this._cyp(a - this.lastScrollY))) return !1;
                    if (this.canvasType == o.CANVASTYPE.skinList && !1 === (0, k.skinListEve)(this, t, i, this._cyp(a - this.lastScrollY))) return !1;
                    if (this.canvasType == o.CANVASTYPE.getNewSkin && !1 === (0, p.getNewSkinEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.shareSkin && !1 === (0, w.shareSkinEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.jiliProp && !1 === (0, p.drawJiLiAdGetPropPageEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.msgDetail5 && !1 === (0, g.drawMsgDetailType5Eve)(this, t, i)) return !1;
                    this.canvasType == o.CANVASTYPE.gameOver && "tired" != this.opt.type && "skin" != this.opt.type && this._drawGameOverBtnClickRevert();
                } else {
                    var n = this._touchInfo;
                    if (-1 == n.trackingID) return;
                    e.preventDefault();
                    var r = this._findDelta(e);
                    if (!r) return;
                    var l = n.listener;
                    n.trackingID = -1, n.listener = null;
                    var A = {
                        x: 0,
                        y: 0
                    };
                    if (n.historyTime.length > 2) for (var m = n.historyTime.length - 1, S = n.historyTime[m], E = n.historyX[m], x = n.historyY[m]; m > 0; ) {
                        m--;
                        var _ = S - n.historyTime[m];
                        if (_ > 30 && _ < 50) {
                            A.x = (E - n.historyX[m]) / (_ / 1e3), A.y = (x - n.historyY[m]) / (_ / 1e3);
                            break;
                        }
                    }
                    n.historyTime = [], n.historyX = [], n.historyY = [], l && l.onTouchEnd && l.onTouchEnd(r.x, r.y, A);
                }
            }
        }
    }, {
        key: "doClickEvent",
        value: function(e) {}
    }, {
        key: "updatePosition",
        value: function(e) {
            var t;
            e > 0 && (e = 0);
            var i = (0, o.cwh)(720) / _ * b, a = (0, o.cwh)(720), s = 12;
            this.canvasType != o.CANVASTYPE.friendRank && this.canvasType != o.CANVASTYPE.groupRank || (t = -(this._cy(157) + a / 2 - _ / 2) / _ * b), 
            this.canvasType == o.CANVASTYPE.pk && (t = -(this._cy(437) + a / 2 - _ / 2) / _ * b), 
            this.canvasType == o.CANVASTYPE.relayRank && (t = -(this._cy(404) + a / 2 - _ / 2) / _ * b, 
            1 != this.opt.my_rank && (t = -(this._cy(318) + a / 2 - _ / 2) / _ * b)), this.canvasType == o.CANVASTYPE.msgBox && (t = -(this._cy(136) + a / 2 - _ / 2) / _ * b, 
            s = 8), this.canvasType == o.CANVASTYPE.shareSkin && (t = -(this._cy(278) + a / 2 - _ / 2) / _ * b);
            var n = Math.floor((t - b * e / x) / i);
            if (this.lastN != n && this.lastN - n < 0) n % 2 == 0 ? this._drawList((n + 1) * s, "list2") : this._drawList((n + 1) * s, "list1"); else if (this.lastN != n && this.lastN - n > 0) {
                var r = n;
                -1 == r && (r = 1), n % 2 == 0 ? this._drawList(n * s, "list1") : this._drawList(r * s, "list2");
            }
            n % 2 == 0 ? (this.obj.list1.position.y = t - b * e / x - n * i, this.obj.list2.position.y = t - b * e / x - (n + 1) * i) : (this.obj.list2.position.y = t - b * e / x - n * i, 
            this.obj.list1.position.y = t - b * e / x - (n + 1) * i), this.lastN = n, this.lastScrollY = e, 
            this.maxscroll = Math.min(this.lastScrollY, this.maxscroll);
        }
    }, {
        key: "_drawList",
        value: function(e, t) {
            this.canvasType != o.CANVASTYPE.pk ? this.canvasType == o.CANVASTYPE.friendRank || this.canvasType == o.CANVASTYPE.groupRank ? (0, 
            u.drawRankList)(this, e, t) : this.canvasType == o.CANVASTYPE.relayRoom ? (0, v.drawRelayList)(this, e, t) : this.canvasType == o.CANVASTYPE.msgBox ? (this.lastScrollY <= this.maxscroll && !this.pending && (this.pending = !0, 
            !!this.opt.onEnd && this.opt.onEnd()), (0, g.drawMsgList)(this, e, t)) : this.canvasType == o.CANVASTYPE.shareSkin && (0, 
            w.drawShareSkinList)(this, e, t) : (0, c.drawPkList)(this, e, t);
        }
    }, {
        key: "_drawGameOverBtnClick",
        value: function() {
            this.context.btn.clearRect(this._cx(140 - 40), this._cy(this.replayBtnPosy - 80), (0, 
            o.cwh)(232), (0, o.cwh)(134)), this._drawImageCenter("res/replay.png", this._cx(256 - 40), this._cy(this.replayBtnPosy), (0, 
            o.cwh)(190), (0, o.cwh)(75), "btn", null, this.imgid.btn);
        }
    }, {
        key: "_drawGameOverBtnClickRevert",
        value: function() {
            this.context.btn.clearRect(this._cx(140 - 40), this._cy(this.replayBtnPosy - 80), (0, 
            o.cwh)(232), (0, o.cwh)(134)), this._drawImageCenter("res/replay.png", this._cx(256 - 40), this._cy(this.replayBtnPosy), (0, 
            o.cwh)(212), (0, o.cwh)(84), "btn", null, this.imgid.btn);
        }
    }, {
        key: "_drawStartClick",
        value: function() {
            this.context.btn.clearRect(this._cx(91), this._cy(448), (0, o.cwh)(232), (0, o.cwh)(104)), 
            this._drawImageCenter("res/play.png", this._cx(207), this._cy(505), (0, o.cwh)(190), (0, 
            o.cwh)(75), "btn", null, this.imgid.btn);
        }
    }, {
        key: "_drawStartClickRevert",
        value: function() {
            this.context.btn.clearRect(this._cx(91), this._cy(448), (0, o.cwh)(232), (0, o.cwh)(104)), 
            this._drawImageCenter("res/play.png", this._cx(207), this._cy(505), (0, o.cwh)(212), (0, 
            o.cwh)(84), "btn", null, this.imgid.btn);
        }
    }, {
        key: "_cx",
        value: function(e) {
            var t = e * E / 414;
            return x / E < 736 / 414 && (t = e * x / 736 + (E - 414 * x / 736) / 2), t * S;
        }
    }, {
        key: "_cy",
        value: function(e) {
            return (x / E > 736 / 414 ? e * E / 414 + (x - 736 * E / 414) / 2 : e * x / 736) * S;
        }
    }, {
        key: "_cxp",
        value: function(e) {
            return x / E < 736 / 414 ? (e - (E - 414 * x / 736) / 2) / x * 736 : e / E * 414;
        }
    }, {
        key: "_cyp",
        value: function(e) {
            return x / E > 736 / 414 ? (e - (x - 736 * E / 414) / 2) / E * 414 : e / x * 736;
        }
    }, {
        key: "_drawImageCenter",
        value: function(e, t, i, a, s, n, r, h, l) {
            "/0" != e && "/96" != e && "/64" != e && e || (e = "res/ava.png");
            var y = new Image(), c = this;
            y.onload = function() {
                c.imgid[n] == h && (c.context[n].drawImage(y, t - a / 2, i - s / 2, a, s), !!r && r(), 
                l || (0, o.updatePlane)({
                    self: c,
                    type: n
                }));
            }, y.onerror = function() {
                !!r && r();
            }, y.src = e;
        }
    } ]), e;
}());

exports.default = C;