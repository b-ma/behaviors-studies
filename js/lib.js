var extend = function extend() {
    var args = Array.prototype.slice.call(arguments);
    var host = args.shift();
    var copy = args.shift();

    for (var i in copy) { host[i] = copy[i]; }
    args.unshift(host);

    if (args.length > 1) { return extend.apply(null, args) }
    return host;
}

// var b = extend({}, { a: '1', b: '2' }, { b: "3", c: function() { return true; } });
// console.log(b);

// 2d vectors
var Vector = function(x, y) {
    this.x = x;
    this.y = y;
};

// static
Vector.add = function(v1, v2) {
    return new this(v1.x + v2.x, v1.y + v2.y);
};

Vector.substract = function(v1, v2) {
    return new this(v1.x - v2.x, v1.y - v2.y);
};

Vector.multiply = function(v1, v2) {
    return new this(v1.x * v2.x, v1.y * v2.y);
};

extend(Vector.prototype, {
    add: function(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    },

    multiply: function(value) {
        this.x *= value;
        this.y *= value;
        return this;
    },

    divide: function(value) {
        return this.multiply(1/value);
    },

    normalize: function(multiplier) {
        var multiplier = multiplier ? multiplier : 1;
        var mag = this.magnitude();

        this.x = (this.x / mag) * multiplier;
        this.y = (this.y / mag) * multiplier;

        return this;
    },

    magnitude: function() {
        var hyp = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        return Math.abs(hyp);
    }
});

// var v1 = new Vector(2, 2);
// var v2 = new Vector(3, 3);
//
// var v3 = Vector.add(v1, v2);
// console.log(v3);

