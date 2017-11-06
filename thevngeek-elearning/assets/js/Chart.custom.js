'use strict';

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

(function(global) {
    var Months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var COLORS = [
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba'
    ];

    var Samples = global.Samples || (global.Samples = {});
    var Color = global.Color;

    Samples.utils = {
        // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
        srand: function(seed) {
            this._seed = seed;
        },

        rand: function(min, max) {
            var seed = this._seed;
            min = min === undefined ? 0 : min;
            max = max === undefined ? 1 : max;
            this._seed = (seed * 9301 + 49297) % 233280;
            return min + (this._seed / 233280) * (max - min);
        },

        numbers: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 1;
            var from = cfg.from || [];
            var count = cfg.count || 8;
            var decimals = cfg.decimals || 8;
            var continuity = cfg.continuity || 1;
            var dfactor = Math.pow(10, decimals) || 0;
            var data = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = (from[i] || 0) + this.rand(min, max);
                if (this.rand() <= continuity) {
                    data.push(Math.round(dfactor * value) / dfactor);
                } else {
                    data.push(null);
                }
            }

            return data;
        },

        labels: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 100;
            var count = cfg.count || 8;
            var step = (max - min) / count;
            var decimals = cfg.decimals || 8;
            var dfactor = Math.pow(10, decimals) || 0;
            var prefix = cfg.prefix || '';
            var values = [];
            var i;

            for (i = min; i < max; i += step) {
                values.push(prefix + Math.round(dfactor * i) / dfactor);
            }

            return values;
        },

        months: function(config) {
            var cfg = config || {};
            var count = cfg.count || 12;
            var section = cfg.section;
            var values = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = Months[Math.ceil(i) % 12];
                values.push(value.substring(0, section));
            }

            return values;
        },

        color: function(index) {
            return COLORS[index % COLORS.length];
        },

        transparentize: function(color, opacity) {
            var alpha = opacity === undefined ? 0.5 : 1 - opacity;
            return Color(color).alpha(alpha).rgbString();
        }
    };

    // DEPRECATED
    window.randomScalingFactor = function() {
        return Math.round(Samples.utils.rand(-100, 100));
    };

    // INITIALIZATION

    Samples.utils.srand(Date.now());

    // Google Analytics
    /* eslint-disable */
    if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-28909194-3', 'auto');
        ga('send', 'pageview');
    }
    /* eslint-enable */

}(this));
/* global Chart */

'use strict';

// (function() {
//     Chart.plugins.register({
//         id: 'samples_filler_analyser',

//         beforeInit: function(chart, options) {
//             this.element = document.getElementById(options.target);
//         },

//         afterUpdate: function(chart) {
//             var datasets = chart.data.datasets;
//             var element = this.element;
//             var stats = [];
//             var meta, i, ilen, dataset;

//             if (!element) {
//                 return;
//             }

//             for (i = 0, ilen = datasets.length; i < ilen; ++i) {
//                 meta = chart.getDatasetMeta(i).$filler;
//                 if (meta) {
//                     dataset = datasets[i];
//                     stats.push({
//                         fill: dataset.fill,
//                         target: meta.fill,
//                         visible: meta.visible,
//                         index: i
//                     });
//                 }
//             }

//             this.element.innerHTML = '<table>' +
//                 '<tr>' +
//                 '<th>Dataset</th>' +
//                 '<th>Fill</th>' +
//                 '<th>Target (visibility)</th>' +
//                 '</tr>' +
//                 stats.map(function(stat) {
//                     var target = stat.target;
//                     var row =
//                         '<td><b>' + stat.index + '</b></td>' +
//                         '<td>' + JSON.stringify(stat.fill) + '</td>';

//                     if (target === false) {
//                         target = 'none';
//                     } else if (isFinite(target)) {
//                         target = 'dataset ' + target;
//                     } else {
//                         target = 'boundary "' + target + '"';
//                     }

//                     if (stat.visible) {
//                         row += '<td>' + target + '</td>';
//                     } else {
//                         row += '<td>(hidden)</td>';
//                     }

//                     return '<tr>' + row + '</tr>';
//                 }).join('') + '</table>';
//         }
//     });
// }());
var presets = window.chartColors;
var utils = Samples.utils;
var inputs = {
    min: 20,
    max: 80,
    count: 8,
    decimals: 2,
    continuity: 1
};

function generateData() {
    return utils.numbers(inputs);
}

function generateLabels(config) {
    return utils.months({
        count: inputs.count
    });
}

utils.srand(42);

var data = {
    labels: generateLabels(),
    datasets: [{
        backgroundColor: utils.transparentize(presets.red),
        borderColor: presets.red,
        data: generateData(),
        hidden: true,
        label: 'D0'
    }, {
        backgroundColor: utils.transparentize(presets.orange),
        borderColor: presets.orange,
        data: generateData(),
        label: 'D1',
        fill: '-1'
    }, {
        backgroundColor: utils.transparentize(presets.yellow),
        borderColor: presets.yellow,
        data: generateData(),
        hidden: true,
        label: 'D2',
        fill: 1
    }, {
        backgroundColor: utils.transparentize(presets.green),
        borderColor: presets.green,
        data: generateData(),
        label: 'D3',
        fill: '-1'
    }, {
        backgroundColor: utils.transparentize(presets.blue),
        borderColor: presets.blue,
        data: generateData(),
        label: 'D4',
        fill: '-1'
    }, {
        backgroundColor: utils.transparentize(presets.grey),
        borderColor: presets.grey,
        data: generateData(),
        label: 'D5',
        fill: '+2'
    }, {
        backgroundColor: utils.transparentize(presets.purple),
        borderColor: presets.purple,
        data: generateData(),
        label: 'D6',
        fill: false
    }, {
        backgroundColor: utils.transparentize(presets.red),
        borderColor: presets.red,
        data: generateData(),
        label: 'D7',
        fill: 8
    }, {
        backgroundColor: utils.transparentize(presets.orange),
        borderColor: presets.orange,
        data: generateData(),
        hidden: true,
        label: 'D8',
        fill: 'end'
    }]
};

var options = {
    maintainAspectRatio: false,
    spanGaps: false,
    elements: {
        line: {
            tension: 0.000001
        }
    },
    scales: {
        yAxes: [{
            stacked: true
        }]
    },
    plugins: {
        filler: {
            propagate: false
        },
        samples_filler_analyser: {
            target: 'chart-analyser'
        }
    }
};

var chart = new Chart('chart-0', {
    type: 'line',
    data: data,
    options: options
});

function togglePropagate(btn) {
    var value = btn.classList.toggle('btn-on');
    chart.options.plugins.filler.propagate = value;
    chart.update();
}

function toggleSmooth(btn) {
    var value = btn.classList.toggle('btn-on');
    chart.options.elements.line.tension = value ? 0.4 : 0.000001;
    chart.update();
}

function randomize() {
    chart.data.datasets.forEach(function(dataset) {
        dataset.data = generateData();
    });
    chart.update();
}