//<script src="https://d3js.org/d3.v7.min.js"></script>
// TODO: with super large TSV files it might not finish loading before the graph is generated oops pls fix

const tsvData = {
    A: [],
    C: [],
    G: [],
    T: [],
    other: [],
    pos: [],
    total: []
}

async function tsvToArr(filename) {
    await d3.tsv(filename, function(data) {
        tsvData.A.push(data.A);
        tsvData.C.push(data.C);
        tsvData.G.push(data.G);
        tsvData.T.push(data.T);
        tsvData.other.push(data.Other);
        tsvData.pos.push(data.Pos);
        tsvData.total.push(data.A + data.C + data.G + data.T);
    });
}

tsvToArr("https://raw.githubusercontent.com/niemasd/PRJCA008874-Analysis/main/data/sambamviz/SAMC703641.03.sambamviz.out/nuc_count_NC_045512.2.tsv");
console.log(tsvData.A);