
/*
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License for more details.
 You should have received a copy of the GNU Lesser General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/*
 Example: factorial of 5
 jQuery.factorial(5)
 120
 */
jQuery.factorial = function(n){
    var fact = 1;
    for (i = n; i > 0; i--) 
        fact *= i;
    return fact;
}

/*
 Example: combinations of 5 from 52 items
 jQuery.combination(52,5)
 2598960
 */
jQuery.combination = function(n, k){
    return jQuery.factorial(n) / jQuery.factorial(k) / jQuery.factorial(n - k);
}

/*
 Example: permutations of 5 from 52 items
 jQuery.permutation(52,5)
 311875200
 */
jQuery.permutation = function(n, r){
    return jQuery.factorial(n) / jQuery.factorial(n - r);
}

/*
 Example: gamma function at .5
 jQuery.gamma(.5)
 1.7724538509055165
 */
jQuery.gamma = function(x){
    if (x > 0) {
        if (x != Math.floor(x)) {
            with (Math) {
                var v = 1;
                while (x < 8) {
                    v *= x;
                    x++
                }
                var w = 1 / (x * x);
                return exp(((((((((-3617 / 122400) * w + 7 / 1092) * w -
                691 / 360360) *
                w +
                5 / 5940) *
                w -
                1 / 1680) *
                w +
                1 / 1260) *
                w -
                1 / 360) *
                w +
                1 / 12) /
                x +
                0.5 * log(2 * PI) -
                log(v) -
                x +
                (x - 0.5) * log(x));
            }
        }
        else {
            return jQuery.factorial(x - 1);
        }
    }
    return false;
}

/*Example: Round to fourth decimal place
 jQuery.precision(3.14159,1e-3)
 3.1412
 */
jQuery.precision = function(x, eps){
    var dec = Math.pow(10, Math.floor(Math.log(1 / eps) * Math.LOG10E));
    return Math.round(dec * x) / dec;
}

/*Example: Minimum value of an array
 jQuery.minimum([1,2,3])
 1
 */
jQuery.minimum = function(arr){
    var min = arr[0];
    for (i = 0; i < arr.length; i++) 
        if (arr[i] < min) 
            min = arr[i];
    return min;
}

/*Example: Maximum value of an array
 jQuery.minimum([1,2,3])
 3
 */
jQuery.maximum = function(arr){
    var max = arr[0];
    for (i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
    
}

/*Example: Mean value of an array
 jQuery.minimum([1,2,3])
 2
 */
jQuery.mean = function(arr){
    return jQuery.sum(arr) / arr.length;
}

/*Example: Sum of an array
 jQuery.minimum([1,2,3])
 6
 */
jQuery.sum = function(arr){
    var sum = 0;
    for (i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum;
}

/*Example: Mode of an array
 jQuery.mode([1,2,2,3])
 2
 */
jQuery.mode = function(arr){

    var arrsort = arr.sort(function(a, b){
        return a - b;
    });
    var count = 1;
    var position = 0;
    var frequencies = [];
    var values = [];
    for (i = 0; i < arrsort.length; i++) {
        if (arrsort[i] == arrsort[i + 1]) {
            count++
        }
        else {
            frequencies[position] = count;
            values[position] = arrsort[i];
            position++;
            count = 1;
        }
    }
    var max = frequencies[0];
    for (i = 0; i < frequencies.length; i++) 
        if (frequencies[i] > max) {
            max = frequencies[i];
            position = i;
        }
    return values[position];
}

/*Example: Median of an array
 jQuery.median([1,2,3,6,9])
 3
 */
jQuery.median = function(arr){
    arrsort = arr.sort(function(a, b){
        return a - b;
    })
    return arrsort[Math.round((arr.length) / 2) - 1];
}

/*Example: Quartiles of an array
 jQuery.quartiles([1,2,3,6,9,3,1,2,5])
 [1,3,5]
 */
jQuery.quartiles = function(arr){
    arrsort = arr.sort(function sortNumber(a, b){
        return a - b;
    });
    return [arrsort[Math.round((arrsort.length) / 4) - 1], arrsort[Math.round((arrsort.length) / 2) - 1], arrsort[Math.round((arrsort.length) * 3 / 4) - 1]];
}

/*Example: Variance of an array
 jQuery.variance([1,2,3,6,9,3,1,2,5])
 6.246913580246913
 */
jQuery.variance = function(arr){
    var sq_dev = [];
    u = jQuery.mean(arr);
    for (i = 0; i < arr.length; i++) {
        sq_dev[i] = Math.pow(arr[i] - u, 2);
    }
    return jQuery.sum(sq_dev) / arr.length;
}

/*Example: Mean deviation of an array
 jQuery.meandev([1,2,3,6,9,3,1,2,5])
 2.074074074074074
 */
jQuery.meandev = function(arr){
    var dev = [];
    u = jQuery.mean(arr);
    for (i = 0; i < arr.length; i++) {
        dev[i] = Math.abs(arr[i] - u);
    }
    return jQuery.sum(dev) / arr.length;
}


/*Example: Standard deviation of an array
 jQuery.stdev([1,2,3,6,9,3,1,2,5])
 2.499382639822665
 */
jQuery.stdev = function(arr){
    return Math.sqrt(jQuery.variance(arr));
}
/*Example: Covariance of two arrays
 jQuery.covariance([1,2,3,6,9,3,1,2,5],[2,3,5,2,5,7,8,9,6])
 -1.1234567901234567
 */
jQuery.covariance = function(arr1, arr2){
    var u = jQuery.mean(arr1);
    var v = jQuery.mean(arr2);
    var sq_dev = [];
    for (i = 0; i < arr1.length; i++) {
        sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);
    }
    return jQuery.sum(sq_dev) / arr1.length;
}

/*Example: Correlation coefficient of two arrays
 jQuery.corr_coeff([1,2,3,6,9,3,1,2,5],[2,3,5,2,5,7,8,9,6])
 -0.18780499704286396
 */
jQuery.corr_coeff = function(arr1, arr2){
    return jQuery.covariance(arr1, arr2) / jQuery.stdev(arr1) / jQuery.stdev(arr2);
}

/*Example: Probability of (x<.5) of uniform distibution with parameters 0,2
 jQuery.uniform(0,2,.5)
 0.25
 */
jQuery.uniformcdf = function(a, b, x){
    if (x < a) 
        return 0;
    else 
        if (x < b) 
            return (x - a) / (b - a);
    return 1;
}

/*Example: Probability of (x=2) of binomial distribution of 5 trials with probability 1/2
 jQuery.binomial(5,1/2,2)
 0.3125
 */
jQuery.binomial = function(n, p, k){
    return jQuery.combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

/*Example: Probability of (x<=2) of binomial distribution of 5 trials with probability 1/2
 jQuery.binomialcdf(5,1/2,2)
 0.5
 */
jQuery.binomialcdf = function(n, p, x){
    if (x < 0) 
        return 0;
    var binomarr = [];
    for (k = 0; k < n; k++) 
        binomarr[k] = jQuery.binomial(n, p, k);
    
    if (x < n) {
        var sum = 0;
        for (i = 0; i <= x; i++) 
            sum += binomarr[i];
        return sum;
    }
    return 1;
    
}
/*Example: Probability of exactly 1 success before 2nd failure of an event with probability 1/2
 jQuery.negbin(2,1/2,1)
 0.25
 */
jQuery.negbin = function(r, p, x){
    if (x != Math.floor(x)) 
        return false;
    if (x < 0) 
        return 0;
    else 
        return jQuery.combination(x + r - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, x);
}


/*Example: Probability of 1 success or less before 2nd failure of an event with probability 1/2
 jQuery.negbincdf(2,1/2,1)
 0.5
 */
jQuery.negbincdf = function(n, p, x){
    if (x < 0) 
        return 0;
    var sum = 0;
    for (k = 0; k <= x; k++) 
        sum += jQuery.negbin(n, p, k);
    return sum;
}


/* Example: Probability of selecting 5 items of a type from 50 items in 10 trials if 25 items are of the type
 * jQuery.hypgeom(50,25,10,5)
 * 0.27479755252772714
 */
jQuery.hypgeom = function(N, m, n, x){
    if (x != Math.floor(x)) {
        return false;
    }
    if (x < 0) 
        return 0;
    else 
        return jQuery.combination(m, x) * jQuery.combination((N - m), n - x) / jQuery.combination(N, n);
}

/* Example: Probability of selecting 5 or less items of a type from 50 items in 10 trials if 25 items are of the type
 jQuery.hypgeomcdf(50,25,10,5)
 0.6373987762638635
 */
jQuery.hypgeomcdf = function(N, m, n, x){
    if (x < 0) 
        return 0;
    var sum = 0;
    for (k = 0; k <= x; k++) 
        sum += jQuery.hypgeom(N, m, n, k);
    return sum;
}

/* Example Probability an exponentially distributed variable with parameter l=.5 is less than 2
 jQuery.exponentialcdf(.5,2)
 0.8646647167633873
 */
jQuery.exponentialcdf = function(l, x){
    return 1 - Math.exp(-1 * x);
}

/* Example Probability a possion variable with parameter l=2 is less than or equal to 3
 jQuery.poisson(2,3)
 0.1804470443154836
 */
jQuery.poisson = function(l, x){
    return Math.pow(l, x) * Math.exp(-l) / jQuery.factorial(x)
}

/* Example Probability a possion variable with parameter l=2 is less than or equal to 3
 jQuery.poissoncdf(2,3)
 0.8571234604985472
 */
jQuery.poissoncdf = function(l, x){
    if (x < 0) 
        return 0;
    var sum = 0;
    for (k = 0; k <= x; k++) 
        sum += jQuery.poisson(l, k);
    return sum;
}

/* Example: Probability a normal variable with mean 5 and standard deviation 2 is less than 9
 jQuery.normcdf(4,2,9)
 0.9937903346742201
 */
jQuery.normcdf = function(u, s, t){
    if (t < u) {
        t = u + (u - t);
        var neg = 1
    }
    else 
        var neg = 0;
    var z = jQuery.asr(Function("x", "return Math.exp(-Math.pow(x-" + u + ",2)/Math.pow(" + s + ",2)/2)/" + s + "/Math.sqrt(2*Math.PI)"), u, t, 1e-14);
    if (!neg) 
        return .5 + z;
    else 
        return 1 - (.5 + z)
}

/* Example return a least squares function using data points from two arrays 
 jQuery.linear_reg_eq(7,3,8,3,2],[13,7,15,7,3])
 function anonymous(x) { return 0.5416666666666666 * x + -0.27500000000000036; }
 */
jQuery.linear_reg_eq = function(arrf, arrx){
    var u = jQuery.mean(arrf);
    var v = jQuery.mean(arrx);
    var sq_dev = [];
    var devx = [];
    for (i = 0; i < arrf.length; i++) {
        sq_dev[i] = (arrf[i] - u) * (arrx[i] - v);
        devx[i] = Math.pow(arrx[i] - v, 2);
    }
    var linear_eq_coeff = jQuery.sum(sq_dev) / jQuery.sum(devx);
    var linear_eq_const = u - linear_eq_coeff * v;
    return Function("x", "return " + linear_eq_coeff + "*x+" + linear_eq_const);
}

/* Example return an exponential least squares fit function using data points from two arrays 
 jQuery.exp_reg_eq([48,10,63,8,5],[7,3,8,3,2])
 function anonymous(x) { return Math.exp(0.4171835379487424 * x) * 2.4160060454307533; }
 */
jQuery.exp_reg_eq = function(arrf, arrx){
    for (i = 0; i < arrf.length; i++) {
        (arrf[i] = Math.log(arrf[i]));
    }
    var u = jQuery.mean(arrf);
    var v = jQuery.mean(arrx);
    var sq_dev = [];
    var devx = [];
    for (i = 0; i < arrf.length; i++) {
        sq_dev[i] = (arrf[i] - u) * (arrx[i] - v);
        devx[i] = Math.pow(arrx[i] - v, 2);
    }
    var exp_coeff = jQuery.sum(sq_dev) / jQuery.sum(devx);
    var exp_const = Math.exp(u - exp_coeff * v);
    return Function("x", "return Math.exp(" + exp_coeff + "*x)*" + exp_const);
}

/* Find the zero of function f(x)=x^3-5 on the interval [0,5] to a precision of 1e-15 in 1000 iterations
 jQuery.secantmethod(function f(x) {return x*x*x-5},0,5,1e-15,1000)
 1.709975946676697
 */
jQuery.secantmethod = function(func, min, max, error, maxiter){
    var d;
    for (n = 1; n <= maxiter; n++) {
        var fmx = func(max);
        d = (max - min) / (fmx - func(min)) * fmx;
        if (Math.abs(d) < error) {
            return max;
        }
        min = max;
        max = max - d;
    }
    return max;
}

/* Approximate the derivative of f(x)=x^3-5 at the point 2 using step size of 1e-3
 jQuery.fivept(function (x){return x*x*x-5},2,1e-3)
 11.99999999999912
 */
jQuery.fivept = function(func, x, h){
    return (-func(x + h * 2) + 8 * func(x + h) - 8 * func(x - h) + func(x - h * 2)) / h / 12;
}

/* Find the critical points of cos(x) on the interval 3,4
 jQuery.fcrit(function (x){return Math.cos(x)}, 3,4)
 3.14159265359
 */
jQuery.fcrit = function(f, a, b){
    return jQuery.precision(jQuery.secantmethod(Function("t", "return jQuery.fivept(" + f + ",t,1e-3)"), a, b, 1e-13, 99999), 1e-12)
}

/* Find the numerical integral of sin(x^2) from 0,5 to 1e-15
 jQuery.asr(function (x){return Math.sin(x*x)},0,5, 1e-15)
 0.52791728116532
 */
jQuery.asr = function(f, a, b, eps){
    var c = (a + b) / 2;
    var h = (b - a) / 6;
    var fa = f(a);
    var fb = f(b);
    var fc = f(c);
    var recursive_asr = function(f, a, b, c, eps, sum, fa, fb, fc){
        var cl = (a + c) / 2;
        var cr = (c + b) / 2;
        var h = (c - a) / 6;
        var fcr = f(cr);
        var fcl = f(cl);
        var left = (fa + 4 * fcl + fc) * h;
        var right = (fc + 4 * fcr + fb) * h;
        if (Math.abs(left + right - sum) <= 15 * eps) {
            return left + right + (left + right - sum) / 15;
        }
        return recursive_asr(f, a, c, cl, eps / 2, left, fa, fc, fcl) + recursive_asr(f, c, b, cr, eps / 2, right, fc, fb, fcr);
    }
    return jQuery.precision(recursive_asr(f, a, b, c, eps, h * (fa + fb + 4 * fc), fa, fb, fc), eps);
}


