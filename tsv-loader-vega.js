// TODO: with super large TSV files it might not finish loading before the graph is generated oops pls fix

const tsvData = []

async function tsvToArr(filename) {
    await d3.tsv(filename, function (data) {
        tsvData.push({
            value: parseInt(data.A),
            type: 0,
            pos: parseInt(data.Pos),
        });
        tsvData.push({
            value: parseInt(data.G),
            type: 1,
            pos: parseInt(data.Pos),
        });
        tsvData.push({
            value: parseInt(data.C),
            type: 2,
            pos: parseInt(data.Pos),
        });
        tsvData.push({
            value: parseInt(data.T),
            type: 3,
            pos: parseInt(data.Pos),
        });
        tsvData.push({
            value: parseInt(data.Other),
            type: 4,
            pos: parseInt(data.Pos),
        });
        tsvData.push({
            value: parseInt(data.A) + parseInt(data.G) + parseInt(data.C) + parseInt(data.T),
            type: 5,
            pos: parseInt(data.Pos),
        });
    });
}

tsvToArr("https://raw.githubusercontent.com/niemasd/PRJCA008874-Analysis/main/data/sambamviz/SAMC703641.03.sambamviz.out/nuc_count_NC_045512.2.tsv");