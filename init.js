let DATA_PER_POS = 5;
const COUNT = "count";
const LOG = "log";
const PROPORTION = "proportion";
const FAS = "fasta";
const SBV = "sambamviz";
const BOUNDS = {
    low: 0,
    high: -1,
};
const COLORS = {
    A: '#65F73E',
    C: '#FFB340',
    G: '#EB413C',
    T: '#3C89EE',
    N: '#000000'
};
let tsvString;
let genSeq = [];
let tsvDataCount = [];
let tsvDataProp = [];