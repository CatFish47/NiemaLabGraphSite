const { TOOLTIP } = require("vega-lite/build/src/channel");

function loadBarGraph(data, yAxisData) {
    let viewElement = document.getElementById("view");
    let width = 2 * viewElement.offsetWidth / 3;
    let height = viewElement.offsetHeight / 2;
    let yscale;

    if (yAxisData == LOG) {
        yscale = "symlog";
    } else {
        yscale = "linear";
    }

    // stacked bar chart
    var barChart = {
        $schema: 'https://vega.github.io/schema/vega/v5.json',
        description: 'A basic stacked bar chart example.',
        width: width,
        height: height,
        padding: 5,

        data: [
            {
                name: 'table',
                values: [...data],
                transform: [
                    {
                        type: 'stack',
                        groupby: ['pos'],
                        sort: { field: 'type' },
                        field: 'value',
                        sort: { field: 'value', order: "ascending" }
                    }
                ]
            }
        ],

        "signals": [
            {
              "name": "tooltip",
              "value": {},
              "on": [
                {"events": "rect:mouseover", "update": "datum"},
                {"events": "rect:mouseout",  "update": "{}"}
              ]
            }
          ],

        scales: [
            {
                name: 'x',
                type: 'band',
                range: 'width',
                domain: { data: 'table', field: 'pos' }
            },
            {
                name: 'y',
                type: yscale,
                range: 'height',
                nice: true,
                zero: true,
                domain: { data: 'table', field: 'value' }
            },
            {
                name: 'color',
                type: 'ordinal',
                range: 'category',
                domain: { data: 'table', field: 'type' }
            }
        ],

        legends: [
            {
                fill: 'color',
                orient: 'right',
                title: 'Codes',
                format: '',
                encode: {
                    symbols: {
                        update: {
                            shape: { value: 'square' },
                            stroke: { value: '#ccc' },
                            strokeWidth: { value: 0.2 }
                        }
                    }
                }
            }
        ],

        axes: [
            { orient: 'bottom', scale: 'x', zindex: 1, tickCount: 10 },
            { orient: 'left', scale: 'y', zindex: 1 }
        ],

        marks: [
            {
                type: 'rect',
                from: { data: 'table' },
                encode: {
                    enter: {
                        x: { scale: 'x', field: 'pos' },
                        width: { scale: 'x', band: 1, offset: -1 },
                        y: { scale: 'y', field: 'y0' },
                        y2: { scale: 'y', field: 'y1' },
                        fill: { scale: 'color', field: 'type' }
                    },
                    update: {
                        fillOpacity: { value: 1 }
                    },
                    hover: {
                        fillOpacity: { value: 0.5 }
                    }
                }
            },
            {
                "type": "text",
                "encode": {
                  "enter": {
                    "align": {"value": "center"},
                    "baseline": {"value": "bottom"},
                    "fill": {"value": "#333"}
                  },
                  "update": {
                    "x": {"scale": "x", "signal": "tooltip.pos", "band": 0.5},
                    "y": {"scale": "y", "signal": "tooltip.value", "offset": -2},
                    "text": {"signal": ("tooltip.value" + " Hello")},
                    "fillOpacity": [
                      {"test": "datum === tooltip", "value": 0},
                      {"value": 1}
                    ]
                  }
                }
              }
        ],

        // encoding: {
        //     tooltip:  {
        //         "field": "A",
        //         "type": "quantitative"
        //     }
        // }
    };

    vegaEmbed('#view', barChart, {tooltip: {theme: 'dark'}});
}