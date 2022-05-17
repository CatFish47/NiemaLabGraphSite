const DATA_PER_POS = 5;
const COUNT = "count";
const LOG = "log";
const PROPORTION = "proportion";
const FAS = "fasta";
const SBV = "sambamviz";

const CHECK_BOUNDS_ERR = "Please make sure bounds are valid."
const CHECK_FILES_ERR = "Please make sure file types are correct."
const CHECK_DATA_ERR = "Please make sure that file data is corect."

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

const FILE_STATUS = {
    sbv: false,
    fas: false
}

let tsvString;
let genSeq = [];
let tsvDataCount = [];
let tsvDataProp = [];