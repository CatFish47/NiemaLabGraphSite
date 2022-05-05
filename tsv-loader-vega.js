// TODO: with super large TSV files it might not finish loading before the graph is generated oops pls fix

let tsvDataCount = [];
let tsvDataProp = [];

async function tsvToArr(tsvData) {
    tsvDataCount = [];
    tsvDataProp = [];
    BOUNDS.low = 0;
    BOUNDS.high = -1;

    await d3.tsvParse(tsvData, function (data) {
        const total = parseInt(data.A) + parseInt(data.G) + parseInt(data.C) + parseInt(data.T) + parseInt(data.Other) || 1;

        // Count Data
        tsvDataCount.push({
            value: parseInt(data.A),
            type: "A",
            pos: parseInt(data.Pos),
        });
        tsvDataCount.push({
            value: parseInt(data.C),
            type: "C",
            pos: parseInt(data.Pos),
        });
        tsvDataCount.push({
            value: parseInt(data.G),
            type: "G",
            pos: parseInt(data.Pos),
        });
        tsvDataCount.push({
            value: parseInt(data.T),
            type: "T",
            pos: parseInt(data.Pos),
        });
        tsvDataCount.push({
            value: parseInt(data.Other),
            type: "Other",
            pos: parseInt(data.Pos),
        });
        // tsvDataCount.push({
        //     value: total,
        //     type: TYPE_CODES.TOTAL,
        //     pos: parseInt(data.Pos),
        // });

        // Proportion Data
        tsvDataProp.push({
            value: parseInt(data.A) / total,
            type: "A",
            // type: TYPE_CODES.A,
            pos: parseInt(data.Pos),
        });
        tsvDataProp.push({
            value: parseInt(data.C) / total,
            type: "C",
            pos: parseInt(data.Pos),
        });
        tsvDataProp.push({
            value: parseInt(data.G) / total,
            type: "G",
            pos: parseInt(data.Pos),
        });
        tsvDataProp.push({
            value: parseInt(data.T) / total,
            type: "T",
            pos: parseInt(data.Pos),
        });
        tsvDataProp.push({
            value: parseInt(data.Other) / total,
            type: "Other",
            pos: parseInt(data.Pos),
        });
        // tsvDataProp.push({
        //     value: total,
        //     type: TYPE_CODES.TOTAL,
        //     pos: parseInt(data.Pos),
        // });

        BOUNDS.high++;
    });

    document.getElementById('lower-bound').value = BOUNDS.low;
    document.getElementById('upper-bound').value = BOUNDS.high;
    document.getElementById('lower-bound').max = BOUNDS.high;
    document.getElementById('upper-bound').max = BOUNDS.high;
}

// tsvToArr("https://raw.githubusercontent.com/niemasd/PRJCA008874-Analysis/main/data/sambamviz/SAMC703641.03.sambamviz.out/nuc_count_NC_045512.2.tsv");