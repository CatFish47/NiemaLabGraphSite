// TODO: with super large TSV files it might not finish loading before the graph is generated oops pls fix

const { TYPES } = require("vega-lite/build/src/type");

const tsvData = []

async function tsvToArr(filename) {
    await d3.tsv(filename, function (data) {
        tsvData.push({
            value: parseInt(data.A),
            type: TYPE_CODES.A,
            pos: parseInt(data.Pos),
        });
        tsvData.push({
            value: parseInt(data.G),
            type: TYPE_CODES.B,
            pos: parseInt(data.Pos),
        });
        tsvData.push({
            value: parseInt(data.C),
            type: TYPE_CODES.C,
            pos: parseInt(data.Pos),
        });
        tsvData.push({
            value: parseInt(data.T),
            type: TYPE_CODES.T,
            pos: parseInt(data.Pos),
        });
        tsvData.push({
            value: parseInt(data.Other),
            type: TYPE_CODES.OTHER,
            pos: parseInt(data.Pos),
        });
        tsvData.push({
            value: parseInt(data.A) + parseInt(data.G) + parseInt(data.C) + parseInt(data.T),
            type: TYPES.TOTAL,
            pos: parseInt(data.Pos),
        });
        BOUNDS.high += DATA_PER_POS;
    });
}

tsvToArr("https://raw.githubusercontent.com/niemasd/PRJCA008874-Analysis/main/data/sambamviz/SAMC703641.03.sambamviz.out/nuc_count_NC_045512.2.tsv");