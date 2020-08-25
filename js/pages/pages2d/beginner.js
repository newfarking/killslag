Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawBeginnerPage = function(r) {
    var t = (r = Object.assign({}, {
        self: {}
    }, r)).self;
    (0, e.routeCanvas)(t, "beginner"), (0, e.createPlane)(t);
    var a = t.context.bg;
    a.clearRect(0, 0, e.WIDTH, e.HEIGHT), a.fillStyle = "rgba(255,255,255,0.3)", a.fillRect((0, 
    e.cx)(38), (0, e.cy)(145), (0, e.cwh)(220), (0, e.cwh)(165)), (0, e.drawText)({
        t: "1. 以最短时间消除灰色方块",
        self: t,
        size: 17,
        pos: [ 40, 172 ],
        color: "black",
        align: "left"
    }), (0, e.drawText)({
        t: "2. 点击虚线框直接落地",
        self: t,
        size: 17,
        pos: [ 40, 213 ],
        color: "black",
        align: "left"
    }), (0, e.drawText)({
        t: "3. 点击空白切换组合",
        self: t,
        size: 17,
        pos: [ 40, 254 ],
        color: "black",
        align: "left"
    }), (0, e.drawText)({
        t: "4. 一次消3-4层有奖励",
        self: t,
        size: 17,
        pos: [ 40, 295 ],
        color: "black",
        align: "left"
    }), (0, e.updatePlane)({
        self: t,
        type: "bg"
    });
};

var e = require("./base");