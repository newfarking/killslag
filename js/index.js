function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function i() {
    var t = Date.now(), e = t - H;
    H = t, requestAnimationFrame(i, !0), e > 100 || N.update(e / 1e3);
}

// 方块组合变化枚举
var typeDict = {'7': [[[0,0], [1,0], [1,-1], [1,-2]],
                                [[0,0], [1,0], [2,0],[0,-1]],
                                [[0,0], [0,-1], [0,-2],[1,-2]],
                                [[0,0], [1,0], [2,0],[2,1]]],
                        '0': [[[0,0], [-1,0], [0,-1], [-1,-1]]],
                        'J': [[[1,0], [1,-1], [1,-2], [0,-2]],
                                [[0,0], [1,0], [2,0], [0,1]],
                                [[0,0], [0,-1], [0,-2], [1,0]],
                                [[0,0], [1,0], [2,0], [2,-1]]],
                        'T': [[[0,0], [1,0], [2,0], [1,-1]],
                                [[0,0], [1,0], [2,0], [1,1]],
                                [[0,0], [0,-1], [0,-2], [1,-1]],
                                [[0,0], [0,-1], [0,-2], [-1,-1]]],
                        'Z': [[[0,0], [1,0], [1,-1], [2,-1]],
                                [[1,0], [1,-1], [0,-1], [0,-2]]],
                        'S': [[[0,0], [0,-1], [1,-1], [1,-2]],
                                [[0,-1], [1,-1], [1,0], [2,0]]],
                        'I': [[[0,0], [1,0], [2,0], [3,0]],
                                [[0,0], [0,-1], [0,-2], [0,-3]]]
                            }
var o = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var o = e[i];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, i, o) {
        return i && t(e.prototype, i), o && t(e, o), e;
    };
}();

require("./weapp-adapter");

var s = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("./lib/three")), n = t(require("./block")), r = t(require("./ui")), h = t(require("./ground")), c = require("./config"), u = t(require("./tailSystem")), g = t(require("./network/network")), b = t(require("./store/storage")), p = t(require("./store/session")), f = t(require("./pages/full2D")), B = t(require("./store/historyTimes")), T = t(require("./network/reporter")), S = t(require("./gameCtrl")), C = t(require("./gameView")), j = t(require("./gameModel")), L = require("./random"), /*P = t(require("./lib/mue/eventcenter")),*/ D = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth, G = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, U = wx.getSystemInfoSync() || {}, F = "ios" == U.platform, V = U.model, 

K = function() {
    function t(i) {
        e(this, t), this.options = i, this.is_from_wn = 0, this.firstInit = !0, this.distance = 0, 
        this.heightestScore = 0, this.stage = "", this.succeedTime = 0, 
        this.lastStage = "", this.deadTimeout = null, this.currentScore = 0, this.seq = 0, this.straight = !0, this.firstBlood = !1, this.lastHardLevel = 200, 
        this.guider = !1, 
        
        this.typecnt = 0,
        
        this.bSize = 2.5, // 方块长度
        this.nextShapeX = 9, // 下一个预告方块的X坐标位置
        this.fallShapeStartX = 4,
        //  当前在下落的方块、以及预告的下一个方块
        this.currentShape = new s.Group(), this.nextShape = new s.Group(), 
        // 方块地图， 宽高：11 * 16
        this.dituBlocks = new s.Group(), this.ditu_w = 11, this.ditu_h = 16,
        this.ditu = (function(h, arr=[]) {
            for( var ii=0;ii<h;ii++) {
                arr[ii] = [];
            }
            return arr;
        })(this.ditu_h + 1),

        this.fallTimer = null,  // 下落的定时器，0.7s下落一格
        this.hitWall = 0; // 是否自由下落落地了检测
        this.gameOver = false; // 游戏是否结束

        // 推荐方块组合，推荐方块当前组合下标
        this.recomShapes = [], this.recomShapesIndex = 0, 
        this.three = s
        this.slagHeight = 5, // 渣渣灰的层数

        // 开放域的好友排行榜
        this.ranking = null, this.open = null, this.rankingTexture = null;

        // 初始游戏规则介绍向导
        this.myguider = wx.getStorageSync('myguider') || "unfinished";
    
        this.gameSuccess = false, 
        
        // 初始化游戏
        this.init(), 

        // 屏幕常亮
        wx.setKeepScreenOn && wx.setKeepScreenOn({
            keepScreenOn: !0
        });
    }
    return o(t, [{
        key: "update", // 每帧更新
        value: function(t) {
            var e = this;
            if (this.gameOver) { // 检测游戏是否结束
                // 清楚方块下落计时器，分数时间增长计时器
                if (this.fallTimer != null) { 
                    clearInterval(this.fallTimer);
                    this.fallTimer = null;
                }
                if (this.scoreTimer != null) {
                    clearInterval(this.scoreTimer);
                    this.scoreTimer = null;
                }
                if (this.gameSuccess) {
                    this.gameCtrl.gameOver(this.currentScore);
                } else {
                    this.gameCtrl.gameOver(999999);
                }
                this.deadTimeout = setTimeout(function() {
                    e.gameCtrl.gameOverShowPage();
                }, 500);
                this.gameOver = false;
            }
            // 重新渲染屏幕
            this.renderer.render(this.scene, this.camera);
        }
    }, {
        key: "handleWxOnHideEvent",
        value: function() {
            this.show = !1, "prepare" == this.bottle.status && (this.touchObserve = !0), 
             this.gameCtrl.wxOnhide();
        }
    }, {
        key: "initRanking", // 初始化开放域绘制的排行榜在主域中显示
        value: function() {
            // 开放域
            this.open = wx.getOpenDataContext()
        
            // 开放域canvas
            var sharedCanvas = this.open.canvas
            // 缩放到像素比 使之高清
            var gwidth = window.innerWidth;
            var gheight = window.innerHeight;
            var gratio = window.devicePixelRatio
            sharedCanvas.width = gwidth * gratio
            sharedCanvas.height = gheight * gratio
            this.rankingTexture = new this.three.CanvasTexture(sharedCanvas)
            this.rankingTexture.minFilter = this.rankingTexture.magFilter = this.three.LinearFilter
            this.rankingTexture.needsUpdate = true
            let geometry = new this.three.PlaneGeometry(gwidth, gheight)
            let material = new this.three.MeshBasicMaterial({ map: this.rankingTexture, transparent: true})
            this.ranking = new this.three.Mesh(geometry, material)

            let temp = gheight / gwidth / (1334 / 750);
            
            this.ranking.scale.set(0.105 / temp, 0.105 / temp, 0.105 / temp);
            this.ranking.position.x = 0;
            this.ranking.position.y = 0;
            this.ranking.position.z = 9;
        }
    }, {
        key: "init",
        value: function() {
            var t = this, e = wx.getSystemInfoSync();
            console.log("getSystemInfo :", e), b.default.getFirstBlood() || this.options.query.mode || (this.guider = !1), // (this.guider = !0), 

            // MVC结构
            this.gameCtrl = new S.default(this), 
            this.gameView = new C.default(this), 
            this.gameModel = new j.default(this);
            this.historyTimes = new B.default(this);
            this.reporter = new T.default(), this.scene = new s.Scene();
            var i = c.FRUSTUMSIZE, o = G / D;

            // 正交相机 设置
            this.camera = new s.OrthographicCamera(i * o / -2, i * o / 2, i / 2, i / -2, -10, 85), 
            this.camera.position.set(11.5, 25.5, 60), this.camera.lookAt(new s.Vector3(12, 22, 30)), 
            this.scene.add(this.camera), this.renderer = new s.WebGLRenderer({
                antialias: !0,
                canvas: canvas,
                preserveDrawingBuffer: !0
            }), window.renderer = this.renderer, 
            
            F && (V.indexOf("iPhone 4") >= 0 || V.indexOf("iPhone 5") >= 0 || U.system.indexOf("iOS 9") >= 0 || U.system.indexOf("iOS 8") >= 0 || V.indexOf("iPhone 6") >= 0 && V.indexOf("iPhone 6s") < 0) ? (this.renderer.shadowMap.enabled = !1, 
            c.GAME.canShadow = !1, this.renderer.setPixelRatio(1.5)) : void 0 !== U.benchmarkLevel && U.benchmarkLevel < 5 && -1 != U.benchmarkLevel ? (c.GAME.canShadow = !1, 
            this.renderer.shadowMap.enabled = !1, this.renderer.setPixelRatio(window.devicePixelRatio ? F ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio : 1)) : (this.renderer.setPixelRatio(window.devicePixelRatio ? F ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio : 1), 
            this.renderer.shadowMap.enabled = !0), this.renderer.setSize(G, D), this.renderer.localClippingEnabled = !0, 
            

            // ground
            this.ground = new h.default(), this.ground.obj.position.z = -84, this.camera.add(this.ground.obj), 
            
            // 阴影
            this.renderer.shadowMap.enabled && (this.shadowTarget = new s.Mesh(new s.PlaneGeometry(.1, .1), p), 
            this.shadowTarget.visible = !1, this.shadowTarget.name = "shadowTarget", this.scene.add(this.shadowTarget)), 
            
            // 初始化含有排行榜
            this.initRanking();

            // 初始添加渣渣灰
            for(var ii = 0;ii < this.slagHeight;ii++) {
                for(var jj = 0;jj <= 10; jj++) {
                    var slag = new n.default(-2, 0);
                    if ((ii + jj)%2 == 0) {
                        slag.obj.position.set(0 + 2.5 * jj, 2.5 * ii, 0);
                        this.ditu[ii][jj] = 1;
                        this.dituBlocks.add(slag.obj);
                    }
                }
            }
            this.scene.add(this.dituBlocks);

            // 2D界面初始化
            this.full2D = new f.default({
                ranking : this.ranking,
                rankingTexture: this.rankingTexture,
                camera: this.camera,
                scene: this.scene,
                onClickRank: this.gameCtrl.clickRank.bind(this.gameCtrl),
                onClickReplay: this.gameCtrl.clickReplay.bind(this.gameCtrl),
                onClickStart: this.gameCtrl.clickStart.bind(this.gameCtrl),
                onShowFriendRank: this.gameCtrl.showFriendRank.bind(this.gameCtrl),
                friendRankReturn: this.gameCtrl.friendRankReturn.bind(this.gameCtrl),
                onReturnWechat: function() {
                    wx.exitMiniProgram();
                },
                onClickPureShare: function(e) {
                    (0, y.pureShare)(e, t.gameModel.currentScore), t.reporter.bestShare(e);
                }
            });
            this.UI = new r.default(this.scene, this.camera, this.full2D, this);
             
            this.addLight(), this.bindEvent();
            this.UI.hideScore(), this.gameModel.init(), 
            this.gameCtrl.init(), this.gameView.init(), wx.onShow(this.handleWxOnShowEvent.bind(this)), 
            wx.onHide(this.handleWxOnHideEvent.bind(this)), wx.onError(this.handleWxOnError.bind(this)), this.gameCtrl.firstInitGame(this.options), wx.showShareMenu(), wx.onShareAppMessage(function() {
                return {
                    title: "消灭渣渣灰，看看谁最快完成",
                    imageUrl: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJHS4AOib6MiaPhwEaqw1NPcZGtgAGTlVJ4lrBAGtchhnXanMyo7q7toRpD4DukV5F2TA/0?wx_fmt=png"
                };
            });
        }
    }, {
        key: "handleWxOnShowEvent",
        value: function(t) {
            this.gameCtrl.wxOnShow(t)
        }
    }, {
        key: "replayGame",
        value: function(t) {
            this.currentScore = 0; // 时间 、 分数清零
            this.gameCtrl.onReplayGame();
            this.guider ? (this.guiderTimer && (clearInterval(this.guiderTimer), 
            this.guiderTimer = null)) : (this.resetScene(t));
        }
    }, {
        key: "addLight",
        value: function() {
            var t = new s.AmbientLight(16777215, .8);
            if (this.shadowLight = new s.DirectionalLight(16777215, .28), this.shadowLight.position.set(0, 15, 10), 
            this.renderer.shadowMap.enabled) {
                this.shadowLight.castShadow = !0, this.shadowLight.target = this.shadowTarget, this.shadowLight.shadow.camera.near = 5, 
                this.shadowLight.shadow.camera.far = 32, this.shadowLight.shadow.camera.left = -10, 
                this.shadowLight.shadow.camera.right = 10, this.shadowLight.shadow.camera.top = 10, 
                this.shadowLight.shadow.camera.bottom = -10, this.shadowLight.shadow.mapSize.width = 512, 
                this.shadowLight.shadow.mapSize.height = 512;
                var e = new s.PlaneGeometry(22, 25);
                this.shadowGround = new s.Mesh(e, new s.ShadowMaterial({
                    transparent: !0,
                    color: 0,
                    opacity: .3
                })), this.shadowGround.receiveShadow = !0, this.shadowGround.position.x = 0, this.shadowGround.position.y = -18, 
                this.shadowGround.position.z = -14, this.shadowGround.rotation.x = -Math.PI / 2, 
                this.shadowLight.add(this.shadowGround), this.shadowGround.renderOrder = 1;
            }
            this.scene.add(this.shadowLight), this.scene.add(t);
        }
    }, {
        key: "checkHitWall",
        value: function() {
            var minebody = this;
            var cur = this.currentShape;
            var len = this.currentShape.children.length;
            for (var ii = 0 ; ii < len; ii++) {
                var obj = this.currentShape.children[ii];
                var x = Math.round((obj.position.x + this.currentShape.position.x) / 2.5);
                var y = Math.round((obj.position.y + + this.currentShape.position.y) / 2.5);
                if (minebody.ditu[y][x] > 0) {
                    return 2; // game over
                }
                if (minebody.ditu[y - 1][x] > 0) {
                    return 1;
                }
            }
            return 0;
        }
    }, {
        key: "shuffleArray",
        value: function(t) {
            for (var e = t.length - 1; e > 0; e--) {
                var i = Math.floor((0, L.random)() * (e + 1)), o = t[e];
                t[e] = t[i], t[i] = o;
            }
        }
    }, {
        key: "recomShapeToDitu",  //推荐的透明方块放至地图中
        value: function(_recomshape) {
            for (var ii=0;ii < 4;ii++) {
                this.currentShape.children[ii].position.x = _recomshape.position.x + _recomshape.children[ii].position.x;
                this.currentShape.children[ii].position.y = _recomshape.position.y + _recomshape.children[ii].position.y;
                this.currentShape.children[ii].position.z = _recomshape.position.z + _recomshape.children[ii].position.z;
                var x = Math.round(this.currentShape.children[ii].position.x / 2.5);
                var y = Math.round(this.currentShape.children[ii].position.y / 2.5);
                this.ditu[y][x] = 2;
            }
            this.dituBlocks.add(...this.currentShape.children);

            // check满行，消除
            this.checkFullLine();

            // 
            if (this.myguider == "unfinished" && this.currentScore >= 15) {
                this.full2D.hide2DGradually();
                wx.setStorage({
                  data: "finished",
                  key: 'myguider',
                });
                this.myguider = "finished";
            }
        }
    }, {
        key: "checkFullLine",  // 检测一行是否满了，满了消除掉
        value: function() {
            // this.ditu / this.dituBlocks
            // 1. 计算this.ditu 
            var change = [];
            var delLine = 0;
            var hasFull = 0;
            for (var p=0;p<this.ditu_h;p++) {
                var full = 1;
                for (var q=0;q<this.ditu_w;q++) {
                    if (!(this.ditu[p][q] >= 1)) {
                        full = 0;
                        break;
                    }
                }
                if (full) {
                    change[p] = -1;
                    delLine += 1;
                    hasFull = 1;
                    for (var q=0;q<this.ditu_w;q++) {
                        this.ditu[p][q] = 0;
                    }
                } else {
                    // 下降 delLine层
                    change[p] = delLine;
                    if (delLine > 0) {
                        for (var q=0;q<this.ditu_w;q++) {
                            this.ditu[p - delLine][q] = this.ditu[p][q];
                            this.ditu[p][q] = 0;
                        }
                    }
                }
            }

            if (hasFull) {
                if (delLine >= 3) { // 3-4层奖励
                    var reward = delLine - 1;
                    for(var p=0;p<reward;p++) {
                        change[p] = -1;
                    }
                    for(var p = reward;p<this.ditu_h;p++) {
                        if(change[p] != -1) 
                            change[p] += reward;
                    }
                    for(var p=0;p<this.ditu_h - reward;p++) {
                        for (var q=0;q<this.ditu_w;q++) {
                            this.ditu[p][q] = this.ditu[p + reward][q];
                            this.ditu[p + reward][q] = 0;
                        }
                    }
                }

                var delBlocks = [];
                // TODO 待优化，x，y Block自带，而不是每次计算
                for(var p=0;p<this.dituBlocks.children.length;p++) {  
                    var child = this.dituBlocks.children[p];
                    var x = Math.round(child.position.x / 2.5);
                    var y = Math.round(child.position.y / 2.5);
                    if (change[y] == -1) {
                        delBlocks.push(child);
                    } else {
                        child.position.y += -1 * change[y] * 2.5;
                    }
                }
                this.dituBlocks.remove(...delBlocks);
            }
        }
    }, {
        key: "addToDitu",  // 将下落方块添至地图中
        value: function(_shape) {
            var len = _shape.children.length;
            for (var ii = 0 ; ii < len; ii++) {
                var obj = _shape.children[ii];
                var x = Math.round((obj.position.x + _shape.position.x) / 2.5);
                var y = Math.round((obj.position.y + _shape.position.y) / 2.5);
                this.ditu[y][x] = 2;
            }
            var blocks = this.currentShape.children;
            for(var ii=0;ii<blocks.length;ii++) {
                blocks[ii].position.x += this.currentShape.position.x;
                blocks[ii].position.y += this.currentShape.position.y;
                blocks[ii].position.z += this.currentShape.position.z;
            }
            this.dituBlocks.add(...blocks);
            this.checkFullLine();
        }
    },{
        key: "funca",
        value: function(x, y) {
            var slag = new n.default(-3, 0);
            slag.obj.position.set(this.bSize * x, this.bSize * y, 0);
            return slag.obj;
        }
    }, {
        key: "calRecomShapes",  // 计算所有可行的下落方块，并排序
        value: function(shape) {
            var tempShapes = [];
            // 计算地图，每列最高的高度位置
            var calCnt = 0;
            var maxHeights = [];
            for (var jj = 0 ; jj < this.ditu_w ; jj ++) maxHeights[jj] = -1;
            for (var ii = this.ditu_h - 1 ; ii >= 0 ; ii --) {
                for (var jj = 0 ; jj < this.ditu_w ; jj ++) {
                    if (this.ditu[ii][jj] > 0 && maxHeights[jj] == -1) {
                        maxHeights[jj] = ii;
                        calCnt += 1;
                        if (calCnt >= this.ditu_w) break;
                    }
                }
                if (calCnt >= this.ditu_w) break;
            }
            // 计算可行shape
            for( var ii = 0 ; ii < typeDict[shape.shapeType].length ; ii ++) {
                // 每次转90°
                var _shape = this.shapeCloneToRecom(shape);
                this.changeShapeOri(_shape, ii);
                // _shape.rotateZ(Math.PI/2 * ii);
                // 从左往右枚举
                for (var dd = 0 ; dd < this.ditu_w * this.bSize ; dd += this.bSize) {
                    var __shape = this.shapeCloneToRecom(_shape);
                    // 计算__shape最左列放到dd处时，shape.position的(x,y);
                    // 1. 计算最左列世界坐标到dd的距离为 shape.position.x 需要
                    var __shapeMinX = __shape.position.x + Math.min(__shape.children[0].position.x,
                        __shape.children[1].position.x, __shape.children[2].position.x, __shape.children[3].position.x);
                    __shape.position.x -= __shapeMinX - dd;
                    // 2. 计算y
                    var minDis = 99999, maxDis = 0;
                    var bottom = 99999, left = 0, right = 0, top = 0, ss = 0;
                    var sss = [];
                    var out = false;
                    for (var kk = 0; kk < 4; kk ++) {
                        var x = Math.round((__shape.position.x + __shape.children[kk].position.x) / this.bSize);
                        if (x >= this.ditu_w) {
                            out = true;
                            break;
                        }
                        left = Math.round(dd / this.bSize);
                        right = Math.max(right, x);
                        var dis = (__shape.position.y + __shape.children[kk].position.y) - maxHeights[x] * this.bSize;
                        if (sss[x] == undefined || sss[x] > dis) sss[x] = dis;
                        if (minDis > dis) { 
                            minDis = dis; 
                        }
                    }
                    for (var pp = left;pp<=right;pp++) ss += sss[pp] - minDis;
                    if (out) break;   //  宽度越界
                    if (minDis < 0) continue;  // 高度越界

                    for (var kk = 0; kk < 4; kk ++) {
                        var tempTop = (__shape.position.y + __shape.children[kk].position.y) - (minDis - this.bSize);
                        if (tempTop > top) top = tempTop;
                        if (tempTop < bottom) bottom = tempTop;
                    }

                    if (top > (this.ditu_h - 1) * this.bSize + 0.0001) continue; // 高度越界
                     __shape.position.y -= minDis - this.bSize;
                    tempShapes.push({obj: __shape, left: left, right: right, bottom: bottom, ss: ss, top: top})
                }
                _shape = null;
            }
            // 对可行shapes进行排序&分组
            tempShapes.sort((a,b) => a.bottom != b.bottom ? a.bottom - b.bottom : (
                a.ss != b.ss ? a.ss - b.ss : (
                    a.top != b.top ? a.top - b.top : a.left - b.left
                )
            ));
            this.recomShapes = [];
            var groupbyIndex = [];
            var groupbyCnt = 0;
            while (groupbyCnt < tempShapes.length) {
                var selected = [];
                var newGroup = new s.Group();
                for (var p = 0;p<tempShapes.length; p++) {
                    if (groupbyIndex[p] > 0) continue;
                    var shape = tempShapes[p];
                    var ok = 1;
                    for (var k = shape.left;k<=shape.right;k++) {
                        if (selected[k] > 0) {
                            ok = 0; break;
                        }
                    }
                    if (ok) {
                        newGroup.add(shape.obj);
                        for (var k = shape.left;k<=shape.right;k++) selected[k] = 1;
                        groupbyCnt += 1;
                        groupbyIndex[p] = 1;
                    }

                }
                this.recomShapes.push(newGroup);
            }

            this.recomShapesIndex = 0;
        }
    }, {
        key: "removeAllChildren",
        value: function(obj) {
            obj.remove(...obj.children);
        }
    }, {
        key: "generateNextShape",  // 随机生成下一个方块
        value: function(shape) {
            var minebody = this;
            for (var ii = 0;ii < shape.children.length; ii++) {
                shape.remove(shape.children[ii]);
            }
            shape.name = 'shape';
            var shapeTypes = Object.keys(typeDict);
            var shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            
            //var shapeType = ['0','7','J'][this.typecnt++];
            var oriXY = typeDict[shapeType][0];
            shape.add(this.funca(...oriXY[0]), this.funca(...oriXY[1]), this.funca(...oriXY[2]), this.funca(...oriXY[3]));
            shape.shapeType = shapeType;
        }
    }, {
        key: "shapeCloneToRecom",
        value: function(_shape) {
            var __shape = new s.Group();
            for (var ii =0;ii<4;ii++) {
                var b = new n.default(-4, 0);
                b.obj.position.x = _shape.children[ii].position.x;
                b.obj.position.y = _shape.children[ii].position.y;
                __shape.add(b.obj);
            }
            __shape.shapeType = _shape.shapeType;
            __shape.position.x = _shape.position.x;
            __shape.position.y = _shape.position.y;

            var geometry = new this.three.Geometry();

            // 边缘
            for (var p=0;p<4;p++) {
                //p=2;
                var box = __shape.children[p].children[0].children[0].geometry.clone();
                box.translate(_shape.children[p].position.x * 4, _shape.children[p].position.y * 2, 0);
                geometry.merge(box);
            }
            //this.computeFaceCentroids(geometry);
            //geometry.mergeVertices();

            //geometry.computeFaceNormals();
            //geometry.computeVertexNormals();
            //geometry = this.removeDuplicateFaces(geometry);
            //geometry = new this.three.BufferGeometry().fromGeometry( geometry );
            //geometry.computeBoundingSphere();
            var edges = this.generateEdges(geometry); //new this.three.EdgesGeometry(geometry ,0 );
            
            var mat_line = new this.three.LineDashedMaterial( { color: "black", dashSize: 1, gapSize: 1 } );
            var basicline = new this.three.LineBasicMaterial( { color: 0xD57000 } );
            var line = new this.three.LineSegments( edges,  basicline);

            line.renderOrder = 1;
            line.scale.set(.25, 0.5, .25);
            __shape.add(line);
            return __shape;
        }
    }, {
        key: "generateEdges",  //  重写EdgeGeometry类
        value: function(geometry) {
                const vertices = [];
                var ret = new this.three.BufferGeometry();
                // helper variables
                var thresholdAngle = 1;
                const thresholdDot = Math.cos( this.three.Math.DEG2RAD * thresholdAngle );
                const edge = [ 0, 0 ], edges = {};
                let edge1, edge2, key;
                const keys = [ 'a', 'b', 'c' ];
                // prepare source geometry
                let geometry2;
                if ( geometry.isBufferGeometry ) {
                    geometry2 = new this.three.Geometry();
                    geometry2.fromBufferGeometry( geometry );
                } else {
                    geometry2 = geometry.clone();
                }
                geometry2.mergeVertices();
                geometry2.computeFaceNormals();
                const sourceVertices = geometry2.vertices;
                const faces = geometry2.faces;
                var edgecnt = {}
                // now create a data structure where each entry represents an edge with its adjoining faces
                for ( let i = 0, l = faces.length; i < l; i ++ ) {
                    const face = faces[ i ];
                    for ( let j = 0; j < 3; j ++ ) {
                        edge1 = face[ keys[ j ] ];
                        edge2 = face[ keys[ ( j + 1 ) % 3 ] ];
                        edge[ 0 ] = Math.min( edge1, edge2 );
                        edge[ 1 ] = Math.max( edge1, edge2 );
                        key = edge[ 0 ] + ',' + edge[ 1 ];
                        if ( edges[ key ] === undefined ) {
                            edges[ key ] = { index1: edge[ 0 ], index2: edge[ 1 ], face1: i, face2: undefined };
                        } else {
                            edges[ key ].face2 = i;
                        }
                        if (key in edgecnt) {
                            edgecnt[key] += 1;
                        } else {
                            edgecnt[key] = 1;
                        }
                    }
                }
            
                // generate vertices
            
                for ( key in edges ) {
                    const e = edges[ key ];
                    // an edge is only rendered if the angle (in degrees) between the face normals of the adjoining faces exceeds this value. default = 1 degree.
                    if (edgecnt[key] > 2) continue;
                    if ( e.face2 === undefined || faces[ e.face1 ].normal.dot( faces[ e.face2 ].normal ) <= thresholdDot ) {
            
                        let vertex = sourceVertices[ e.index1 ];
                        vertices.push( vertex.x, vertex.y, vertex.z );
            
                        vertex = sourceVertices[ e.index2 ];
                        vertices.push( vertex.x, vertex.y, vertex.z );
                    }
                }
                ret.attributes['position'] =  new this.three.Float32BufferAttribute( vertices, 3 ) ;
                return ret;
        }
    }, {
        key: "changeShapeOri",
        value: function(_shape, _ori) {
            var oriXY = typeDict[_shape.shapeType][_ori];
            for (var ii=0;ii <4;ii++) {
                _shape.children[ii].position.x = oriXY[ii][0] * this.bSize;
                _shape.children[ii].position.y = oriXY[ii][1] * this.bSize;
            }
        }
    }, {
        key: "clearTimer",
        value: function() {
            this.animateTimer && (clearTimeout(this.animateTimer), this.animateTimer = null), 
            this.beginnerTimer && (clearTimeout(this.beginnerTimer), this.beginnerTimer = null), 
            this.suspendTimer && (clearTimeout(this.suspendTimer), this.suspendTimer = null);
            this.scoreTimer && (clearTimeout(this.scoreTimer), this.scoreTimer = null);
        }
    }, {
        key: "resetScene",  // 重置创建，每次游戏开始执行
        value: function(t, e) {
            var i = this;
            var minebody = i;
            this.clearTimer();

            // remove 方块地图  &&  初始化地图
            this.typecnt = 0;
            this.removeChildrenFromScene(this.dituBlocks);
            this.scene.remove(this.dituBlocks);
            this.removeAllChildren(this.dituBlocks);
            this.removeChildrenFromScene(this.currentShape);
            this.scene.remove(this.currentShape);
            this.currentShape = null;
            this.removeChildrenFromScene(this.nextShape);
            this.scene.remove(this.nextShape);
            this.nextShape = null;
            this.scene.remove(this.recomShapes[this.recomShapesIndex]);
            this.ditu = (function(h, arr=[]) {
                for( var ii=0;ii<h;ii++) {
                    arr[ii] = [];
                }
                return arr;
            })(this.ditu_h + 1), 
            this.currentShape = new this.three.Group(), 
            this.nextShape = new this.three.Group(), 
            this.dituBlocks = new this.three.Group(),
            this.fallTimer = null, 
            this.scoreTimer = null, 
            this.hitWall = 0, this.gameOver = false;
            this.recomShapes = [], this.recomShapesIndex = 0;
            for(var ii = 0;ii <= 4;ii++) {
                for(var jj = 0;jj <= 10; jj++) {
                    var slag = new n.default(-2, 0);
                    if ((ii + jj)%2 == 0) {
                        slag.obj.position.set(0 + 2.5 * jj, 2.5 * ii, 0);
                        this.ditu[ii][jj] = 1;
                        this.dituBlocks.add(slag.obj);
                    }
                }
            }
            this.scene.add(this.dituBlocks);

            // 移除分数计数器 & 重新定义分数计数器
            if (this.scoreTimer != null) {
                clearTimeout(this.scoreTimer), this.scoreTimer = null;
            }
            this.gameSuccess = false;
            this.currentScore = 0;
            this.scoreTimer = setInterval(function() {
                minebody.UI.addScore(1, 0, 0);
                minebody.currentScore += 1;
            }, 1000);


            // 生成即将下落方块
            this.generateNextShape(this.currentShape);
            this.currentShape.position.set(this.fallShapeStartX * this.bSize, (this.ditu_h - 1) * this.bSize, 0);
            if (this.checkHitWall() == 2) {
                this.gameOver = true;
                return;
            }

            // 计算可行下落推荐组合
            this.calRecomShapes(this.currentShape);
            this.scene.add(this.recomShapes[this.recomShapesIndex]);
            this.scene.add(this.currentShape);

            // 添加方块下落定时器
            this.fallTimer = setInterval(function() {
                minebody.hitWall = minebody.checkHitWall();
                if (minebody.hitWall == 2) { // 游戏是否结束失败
                    minebody.gameOver = true;
                    return;
                } else if (minebody.hitWall == 1) { // 是否降到底部了？
                    minebody.scene.remove(minebody.recomShapes[minebody.recomShapesIndex]);
                    minebody.addToDitu(minebody.currentShape);
                    minebody.removeAllChildren(minebody.currentShape);

                    // 到底部后，判断游戏是否胜利
                    if (minebody.ditu[0][0] != 1 && minebody.ditu[0][1] != 1) {
                        minebody.gameOver = true;
                        minebody.gameSuccess = true;
                        return;
                    }

                    minebody.currentShape.add(...minebody.nextShape.children);
                    minebody.currentShape.shapeType = minebody.nextShape.shapeType;
                    minebody.currentShape.scale.set(1, 1, 1);
                    minebody.currentShape.position.set(minebody.fallShapeStartX * minebody.bSize, minebody.ditu_h * minebody.bSize, 0);

                    if (minebody.checkHitWall() == 2) {
                        minebody.gameOver = true;
                        return;
                    }

                    minebody.calRecomShapes(minebody.currentShape);
                    if (minebody.recomShapes.length == 0) {
                        minebody.gameOver = true;
                        return;
                    }
                    minebody.scene.add(minebody.recomShapes[minebody.recomShapesIndex]);

                    minebody.generateNextShape(minebody.nextShape);
                    minebody.nextShape.position.set(minebody.nextShapeX * minebody.bSize, minebody.ditu_h * minebody.bSize, 0);
                    minebody.nextShape.scale.set(.7, .7, .7);
                    //minebody.scene.add(minebody.nextShape);
                }
                minebody.currentShape.translateY(-1 * minebody.bSize);
            }, 1500);

            // 下一个预告方块
            this.generateNextShape(this.nextShape);
            this.nextShape.position.set(this.nextShapeX * this.bSize, this.ditu_h * this.bSize, 0);
            this.nextShape.scale.set(.7, .7, .7);
            this.scene.add(this.nextShape);

            // 设置初始游戏规则介绍页面
            setTimeout(function() {
                minebody.myguider == "unfinished" && minebody.full2D.showBeginnerPage();
            },200);
            this.UI.reset();
            this.shadowLight.position.set(0, 15, 10), wx.triggerGC && wx.triggerGC();
        }
    }, {
        key: "removeChildrenFromScene",
        value: function(obj) {
            for (var ii =0;ii<obj.children.length;ii++){
                this.scene.remove(obj.children[ii]);
            }
        }
    }, {
        key: "touchStartAnim", // 点击事件监听
        value: function(t) {
            // 通过射线原理得到被点击的三维物体
            var mouse = new this.three.Vector2();
            mouse.x = ( t.changedTouches[0].clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( t.changedTouches[0].clientY / window.innerHeight ) * 2 + 1;
            var raycaster = new this.three.Raycaster();
            raycaster.setFromCamera(mouse, this.camera);
            var intersects = raycaster.intersectObjects(this.recomShapes[this.recomShapesIndex].children, true);

            var intersect = null;
            if (intersects.length > 0) {
                for(var pp = 0;pp<intersects.length;pp++) {
                    if (intersects[pp].object.type == 'Mesh') { 
                        intersect = intersects[pp];
                        break;
                    }
                }
            }

            // 有点击交集物体。得到选择被推荐的方块
            if (intersects.length > 0 && intersect != null) {
                // 边框去掉
                // 方块存至地图
                this.recomShapeToDitu(intersect.object.parent.parent.parent);
                // 场景中移除推荐的透明方块组合
                this.scene.remove(this.recomShapes[this.recomShapesIndex]);
                this.removeAllChildren(this.currentShape);

                // 检测是否完成任务（所有的灰色方块都消灭掉了）
                if (this.ditu[0][0] != 1 && this.ditu[0][1] != 1) {
                    this.gameOver = true;
                    this.gameSuccess = true;
                    return;
                }

                // 预告中的下一个方块转移至当前即将下落的方块
                this.currentShape.add(...this.nextShape.children);
                this.currentShape.shapeType = this.nextShape.shapeType;
                this.currentShape.scale.set(1, 1, 1);
                this.currentShape.position.set(this.fallShapeStartX * this.bSize, (this.ditu_h) * this.bSize, 0);
                
                // 检测刚出来的方块是否还有没有空间放置，来判定游戏是否失败-结束
                if (this.checkHitWall() == 2) {
                    this.gameOver = true;
                    return;
                }

                // 重新一轮，计算当前方块的可下落的推荐方块组合
                this.calRecomShapes(this.currentShape);
                if (this.recomShapes.length == 0) {
                    this.gameOver = true;
                    return;
                }
                this.scene.add(this.recomShapes[this.recomShapesIndex]);

                // 生成下一个预告方块
                this.generateNextShape(this.nextShape);
                this.nextShape.position.set(this.nextShapeX * this.bSize, this.ditu_h * this.bSize, 0);
                this.nextShape.scale.set(.7, .7, .7);
            } else { // 点击的为非推荐区域，则变换下一组推荐给玩家
                this.scene.remove(this.recomShapes[this.recomShapesIndex]);
                this.recomShapesIndex = (this.recomShapesIndex + 1) % this.recomShapes.length;
                this.scene.add(this.recomShapes[this.recomShapesIndex]);
            }
        }
    }, {
        key: "bindEvent", // 输入事件监控
        value: function() {
            var t = this, e = this;
            // touch事件监听
            canvas.addEventListener("touchstart", function(t) {
                if (!e.pendingReset) if (t.touches.length >= 2) e.touchObserve = !0; else if ("relay" != e.mode || "game" != e.stage || !e.clicked && e.myTurn) 
                    if ("friendRankList" != e.stage && 
                        "battlePage" != e.stage && 
                        "groupRankList" != e.stage && 
                        "singleSettlementPgae" != e.stage && 
                        "startPage" != e.stage)
                        if ("viewerWaiting" != e.stage && 
                            "viewerGG" != e.stage && 
                            "viewerOut" != e.stage) 
                            if ("relayRoom" != e.stage) 
                                if ("getGiftPage" != e.mode) {
                                    if ("game" == e.stage) {
                                        e.touchStartAnim(t);
                                    }
                                } else e.full2D.doTouchStartEvent(t);
                            else e.full2D.doTouchStartEvent(t); 
                        else e.full2D.doTouchStartEvent(t); 
                    else e.full2D.doTouchStartEvent(t);
            });

            canvas.addEventListener("touchend", function(t) {
                t.changedTouches[0].clientX, t.changedTouches[0].clientY;
                if ("relay" == e.mode && "game" == e.stage && e.full2D.doTouchEndEvent(t), "relay" != e.mode || "game" != e.stage || !e.clicked && e.myTurn) if ("singleSettlementPgae" != e.stage && "startPage" != e.stage) if ("viewerWaiting" != e.stage && "viewerGG" != e.stage && "viewerOut" != e.stage) if ("friendRankList" != e.stage) if ("battlePage" != e.stage) if ("groupRankList" != e.stage) {
                    if ("getGiftPage" != e.mode) return "relayRoom" == e.stage ? (console.log(e.stage), 
                    void e.full2D.doTouchEndEvent(t)) : void ("game" == e.stage);
                    e.full2D.doTouchEndEvent(t);
                } else e.full2D.doTouchEndEvent(t); else e.full2D.doTouchEndEvent(t); else e.full2D.doTouchEndEvent(t); else e.full2D.doTouchEndEvent(t); else e.full2D.doTouchEndEvent(t);
            });
        }
    }, {
        key: "report", // 日志上报
        value: function(t) {
            Math.random() <= 1 && (console.log("日志上报：" + t), g.default.logReport("|SM|:" + t));
        }
    }, {
        key: "handleNetworkFucked",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "网络异常,点击确定进入游戏";
            this.rollBackToSingle(), t && wx.showModal({
                title: "提示",
                content: e,
                showCancel: !1
            });
        }
    }, {
        key: "handleWxOnError",
        value: function(t) {
        }
    }, {
        key: "sendServerError",
        value: function(t) {
        }
    } ]), t;
}();

if (wx.getLaunchOptionsSync) N = new K(wx.getLaunchOptionsSync()); else var N = new K();

var H = Date.now();

i();
