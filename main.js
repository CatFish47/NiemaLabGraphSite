document.getElementById('upload-files').addEventListener('click', () => {
    generateData();

    let lowerDataBound = BOUNDS.low;
    let upperDataBound = BOUNDS.high;
    loadSBV(lowerDataBound, upperDataBound, tsvDataCount, tsvDataProp);
});

document
    .getElementById('sambamviz-upload')
    .addEventListener('change', () => {
        processFiles(SBV);
    });

document
    .getElementById('fasta-upload')
    .addEventListener('change', () => {
        processFiles(FAS);
    });

document.querySelectorAll('.color-picker').forEach((input) => {
    input.addEventListener('change', () => {
        setVegaScheme();
    });
});

document.getElementById('loadGraph').addEventListener('click', () => {
    let lowerDataBound = BOUNDS.low;
    let upperDataBound = BOUNDS.high;

    lowerDataBound = parseInt(document.getElementById('lower-bound').value);
    upperDataBound =
        parseInt(document.getElementById('upper-bound').value) + 1;
    loadSBV(lowerDataBound, upperDataBound, tsvDataCount, tsvDataProp);
});

async function generateData() {
    try {
        await tsvToArr(tsvString);
    } catch (error) {
        console.log(error);
    }
}

async function processFiles(fileType) {
    try {
        if (fileType === SBV) {
            const sbvFile =
                document.getElementById('sambamviz-upload').files[0];

            if (sbvFile.name.split(".")[1] === "tsv") {
                FILE_STATUS.sbv = true;
                await processSamBamViz(sbvFile);
            } else {
                FILE_STATUS.sbv = false;
            }
        }

        if (fileType === FAS) {
            const fasFile = document.getElementById('fasta-upload').files[0];

            if (fasFile.name.split(".")[1] === "fas") {
                FILE_STATUS.fas = true;
                await processFasta(fasFile);
            } else {
                FILE_STATUS.fas = false;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function processSamBamViz(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            tsvString = reader.result;
            resolve('done');
        };

        reader.readAsText(file);
    });
}

function processFasta(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            genSeq = [];
            let genSeqStr = reader.result;
            for (
                let i = genSeqStr.indexOf('\n') + 1;
                i < genSeqStr.length;
                i++
            ) {
                if (genSeqStr[i] != '\n') {
                    genSeq.push(genSeqStr[i]);
                }
            }
            resolve('done');
        };

        reader.readAsText(file);
    });
}

function setVegaScheme() {
    COLORS.A = document.getElementById('a-color').value;
    COLORS.C = document.getElementById('c-color').value;
    COLORS.G = document.getElementById('g-color').value;
    COLORS.T = document.getElementById('t-color').value;
    COLORS.N = document.getElementById('n-color').value;
}

function checkIssues(lowBounds, highBounds) {
    const fasFile = document.getElementById('fasta-upload').files[0];

    if (!FILE_STATUS.sbv || (fasFile && !FILE_STATUS.fas)) {
        return CHECK_FILES_ERR;
    }

    if (lowBounds > highBounds) {
        return CHECK_BOUNDS_ERR;
    }

    return "";
}

function loadSBV(lowerDataBound, upperDataBound, tsvData, tsvDataProp) {
    let errorMessage = checkIssues(lowerDataBound, upperDataBound);
    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    vega.scheme('strands', [
        COLORS.A,
        COLORS.C,
        COLORS.G,
        COLORS.T,
        COLORS.N
    ]);

    let countData = tsvData.slice(
        lowerDataBound * DATA_PER_POS,
        upperDataBound * DATA_PER_POS
    );

    let propData = tsvDataProp.slice(
        lowerDataBound * DATA_PER_POS,
        upperDataBound * DATA_PER_POS
    );

    if (document.getElementById('count-option').checked) {
        loadBarGraph(countData, COUNT);
    } else if (document.getElementById('log-option').checked) {
        loadBarGraph(countData, LOG);
    } else if (document.getElementById('proportion-option').checked) {
        loadBarGraph(propData, PROPORTION);
    }
}