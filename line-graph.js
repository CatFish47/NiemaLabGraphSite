function loadLineGraph(data, yAxisData) {
    let viewElement = document.getElementById("view");
    let width = 2 * viewElement.offsetWidth / 3;
    let height = viewElement.offsetHeight / 2;

    // line chart
    var lineGraph = {
        $schema: "https://vega.github.io/schema/vega/v5.json",
        description: "A basic line chart example.",
        width: width,
        height: height,
        padding: 5,

        signals: [
            {
                name: "interpolate",
                value: "linear",
                bind: {
                    input: "select",
                    options: [
                        "basis",
                        "cardinal",
                        "catmull-rom",
                        "linear",
                        "monotone",
                        "natural",
                        "step",
                        "step-after",
                        "step-before",
                    ],
                },
            },
        ],

        data: [
            {
                name: "table",
                values: [...data],
            },
        ],

        scales: [
            {
                name: "x",
                type: "point",
                range: "width",
                domain: { data: "table", field: "pos" },
            },
            {
                name: "y",
                type: "linear",
                range: "height",
                nice: true,
                zero: true,
                domain: { data: "table", field: "value" },
            },
            {
                name: "color",
                type: "ordinal",
                range: "category",
                domain: { data: "table", field: "type" },
            },
        ],

        axes: [
            { orient: "bottom", scale: "x", tickCount: 10 },
            { orient: "left", scale: "y" },
        ],

        marks: [
            {
                type: "group",
                from: {
                    facet: {
                        name: "series",
                        data: "table",
                        groupby: "type",
                    },
                },
                marks: [
                    {
                        type: "line",
                        from: { data: "series" },
                        encode: {
                            enter: {
                                x: { scale: "x", field: "pos" },
                                y: { scale: "y", field: "value" },
                                stroke: { scale: "color", field: "type" },
                                strokeWidth: { value: 2 },
                            },
                            update: {
                                interpolate: { signal: "interpolate" },
                                strokeOpacity: { value: 1 },
                            },
                            hover: {
                                strokeOpacity: { value: 0.5 },
                            },
                        },
                    },
                ],
            },
        ],
    };;
    vegaEmbed("#view", lineGraph);
}