function e(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, i) {
        for (var t = 0; t < i.length; t++) {
            var s = i[t];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(i, t, s) {
        return t && e(i.prototype, t), s && e(i, s), i;
    };
}(), t = function(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (i[t] = e[t]);
    return i.default = e, i;
}(require("./lib/three")), s = require("./config"), a = require("./lib/animation"), o = require("./random"), h = {
    green: 6393958,
    white: 15658734,
    lightGreen: 8104320,
    gray: 10395294,
    black: 7171437,
    lightGray: 14408667,
    lightBlack: 13355979,
    brown: 6776679,
    middleLightGreen: 125084537,
    middleLightGray: 12303291,
    middleLightBlack: 8947848
}, r = new t.MeshBasicMaterial({
    // map: s.loader.load("res/cylinder_shadow.png"),
    transparent: !0,
    alphaTest: .01
}), n = new t.MeshBasicMaterial({
    // map: s.loader.load("res/desk_shadow.png"),
    transparent: !0,
    alphaTest: .01
}), l = new t.MeshBasicMaterial({
    // map: s.loader.load("res/shadow.png"),
    transparent: !0,
    alphaTest: .01
}), d = new t.MeshLambertMaterial({
    // map: s.loader.load("res/gray.png")
}), m = new t.MeshLambertMaterial({
    // map: s.loader.load("res/number.png"),
    alphaTest: .6
}), c = new t.BoxGeometry(2 * s.BLOCK.radius + .02, s.BLOCK.height + .04, 2 * s.BLOCK.radius + .02), u = new t.BoxGeometry(2 * s.BLOCK.radius, s.BLOCK.height, 2 * s.BLOCK.radius), y = new t.PlaneGeometry(11, 11), g = s.GAME.canShadow ? t.MeshLambertMaterial : t.MeshBasicMaterial, w = function() {
    function w(i, o) {
        var M = this;
        if (e(this, w), this.radius = s.BLOCK.radius, this.status = "stop", this.scale = 1, 
        this.type = "green", this.types = [ "green", "black", "gray" ], this.radiusScale = 1, 
        this.obj = new t.Object3D(), this.obj.name = "block", this.body = new t.Object3D(), 
        (i <= 8 || 27 == i) && (this.greenMaterial = new t.MeshLambertMaterial({
            color: h.green
        }), this.whiteMaterial = new t.MeshLambertMaterial({
            color: h.white
        })), 32 != i && 33 != i && 34 != i && 35 != i || (this.greenMaterial = new t.MeshLambertMaterial({
            color: h.white
        }), this.whiteMaterial = new t.MeshLambertMaterial({
            color: h.gray
        })), this.shadowWidth = 11, 2 == i || 7 == i ? (this.shadow = new t.Mesh(y, n), 
        this.shadow.position.set(0, -s.BLOCK.height / 2 - .001 * i, -4.5), this.shadow.scale.y = 1.2) : 3 == i || 21 == i || 27 == i || 28 == i || 29 == i ? (this.shadow = new t.Mesh(y, r), 
        this.shadow.position.set(-.1, -s.BLOCK.height / 2 - .001 * i, -2.8), this.shadow.scale.y = 1.4, 
        this.shadow.scale.x = 1) : (this.shadow = new t.Mesh(y, l), this.shadow.position.set(-.74, -s.BLOCK.height / 2 - .001 * i, -2.73), 
        this.shadow.scale.y = 1.4), this.shadow.rotation.x = -Math.PI / 2, this.order = i, 
        this.radiusSegments = 4, this.height = s.BLOCK.height, this.canChange = !0, 0 == i) {
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), O = 3, b = (s.BLOCK.height - O) / 2, C = new t.BoxGeometry(2 * s.BLOCK.radius, b, 2 * s.BLOCK.radius);
            this.geometry = C;
            P = new t.BoxGeometry(2 * s.BLOCK.radius, O, 2 * s.BLOCK.radius);
            this.merge(L, C, 0, [ {
                x: 0,
                y: -O / 2 - b / 2,
                z: 0
            }, {
                x: 0,
                y: O / 2 + b / 2,
                z: 0
            } ]), this.merge(L, P, 1, [ {
                x: 0,
                y: 0,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (1 == i) {
            var B = [ this.greenMaterial, this.whiteMaterial ], L = new t.Geometry(), v = s.BLOCK.height / 5, x = new t.BoxGeometry(2 * s.BLOCK.radius, v, 2 * s.BLOCK.radius);
            this.geometry = x, this.merge(L, x, 0, [ {
                x: 0,
                y: 0,
                z: 0
            }, {
                x: 0,
                y: -2 * v,
                z: 0
            }, {
                x: 0,
                y: 2 * v,
                z: 0
            } ]), this.merge(L, x, 1, [ {
                x: 0,
                y: -v,
                z: 0
            }, {
                x: 0,
                y: v,
                z: 0
            } ]), this.hitObj = new t.Mesh(L, B);
        } else if (-1 == i) {
            var Ce = [ 15622240, 14980702, 15712087, 9089870, 7451844, 6519997, 10772948 ], x = c, S = new t.MeshLambertMaterial({
                color: Ce[o],
                transparent: !0
            });
            this.hitObj = new t.Mesh(x, S);
            var ve = new t.BoxGeometry(2 * s.BLOCK.radius, s.BLOCK.height, 2 * s.BLOCK.radius);
            this.mapUv(100, 88, ve, 2, 0, 0, 5, 5);
            var xe = new t.Mesh(ve, d);
            0 == o && (xe.receiveShadow = !0), this.body.add(xe);
            var Ke, fe, Ge, ze, _ = new t.PlaneGeometry(4, 8);
            Ge = (Ke = o % 4 * 64) + 64, ze = (fe = 128 * parseInt(o / 4)) + 128, this.mapUv(256, 256, _, 0, Ke, ze, Ge, fe), 
            (Me = new t.Mesh(_, m)).rotation.x = -Math.PI / 2, Me.rotation.z = -Math.PI / 2, 
            Me.position.y = s.BLOCK.height / 2 + .05, this.body.add(Me), this.obj.scale.set(.7, 1, .7);
        } else if (-2 == i) {
            x = c;
            S = new t.MeshLambertMaterial({
                color: h.gray,
                transparent: !0
            });
            this.hitObj = new t.Mesh(x, S);
            var ve = new t.BoxGeometry(2 * s.BLOCK.radius, s.BLOCK.height, 2 * s.BLOCK.radius);
            var xe = new t.Mesh(ve, S);
            this.body.add(xe);
            this.obj.scale.set(.25, 0.5, .25);
            //this.obj.rotateZ(-Math.PI / 6);
        } else if (-3 == i) {
            x = c;
            S = new t.MeshLambertMaterial({
                color: h.lightGreen,
                transparent: !0
            });
            this.hitObj = new t.Mesh(x, S);
            var ve = new t.BoxGeometry(2 * s.BLOCK.radius, s.BLOCK.height, 2 * s.BLOCK.radius);
            var xe = new t.Mesh(ve, S);
            this.body.add(xe);
            this.obj.scale.set(.25, 0.5, .25);
            //this.obj.rotateZ(-Math.PI / 6);
        } else if (-4 == i) {
            x = c;
            S = new t.MeshLambertMaterial({
                color: h.lightGreen,
                transparent: !0,
                opacity: 0.5
            });
            this.hitObj = new t.Mesh(x, S);
            var ve = new t.BoxGeometry(2 * s.BLOCK.radius, s.BLOCK.height, 2 * s.BLOCK.radius);
            var xe = new t.Mesh(ve, S);
            this.body.add(xe);
            this.obj.scale.set(.25, 0.5, .25);
            //this.obj.rotateZ(-Math.PI / 6);
        }
        this.shadow.initZ = this.shadow.position.z, this.hitObj.receiveShadow = !0, this.hitObj.name = "hitObj", 
        /*this.body.add(this.hitObj),*/ this.hitObj.matrixAutoUpdate = !1, this.shadow.initScale = this.shadow.scale.y, 
        this.body.position.y = s.BLOCK.height / 2 - this.height / 2, 
        
        -2 != i && -3 != i && -4 !=i ?
        
        this.obj.add(this.shadow):1, 
        this.obj.add(this.body);
    }
    return i(w, [ {
        key: "merge",
        value: function(e, i, s, a) {
            for (var o = 0, h = i.faces.length; o < h; ++o) i.faces[o].materialIndex = 0;
            for (var r = new t.Mesh(i), o = 0, h = a.length; o < h; ++o) r.position.set(a[o].x, a[o].y, a[o].z), 
            r.updateMatrix(), e.merge(r.geometry, r.matrix, s);
        }
    }, {
        key: "showLight",
        value: function(e) {
            var i = this;
            this.light.visible = !0, this.light.material.opacity = 0, this.light.position.set(e.x - this.obj.position.x, 5.6, e.z - this.obj.position.z), 
            this.light.scale.set(1 / this.radiusScale, 1, 1 / this.radiusScale), a.customAnimation.to(this.light.material, 1, {
                opacity: 1
            }), setTimeout(function() {
                i.hideLight();
            }, 1500);
        }
    }, {
        key: "hideLight",
        value: function() {
            var e = this;
            a.customAnimation.to(this.light.material, .5, {
                opacity: 0,
                onComplete: function() {
                    e.light.visible = !1;
                }
            });
        }
    }, {
        key: "update",
        value: function(e) {
            this.perFrame && this.perFrame(), "stop" !== this.status && ("shrink" === this.status ? this._shrink(e) : this.status);
        }
    } ]), w;
}();

exports.default = w;