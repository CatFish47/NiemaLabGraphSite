async function tsvToArr(tsvData) {
    tsvDataCount = [];
    tsvDataProp = [];
    BOUNDS.low = 0;
    BOUNDS.high = -1;

    await d3.tsvParse(tsvData, function (data) {
        const total = parseInt(data.A) + parseInt(data.G) + parseInt(data.C) + parseInt(data.T) + parseInt(data.Other) || 1;
        const ref = genSeq[BOUNDS.high + 1]

        // Count Data
        tsvDataCount.push({
            value: parseInt(data.A),
            type: "A",
            pos: parseInt(data.Pos),
            ref: ref
        });
        tsvDataCount.push({
            value: parseInt(data.C),
            type: "C",
            pos: parseInt(data.Pos),
            ref: ref
        });
        tsvDataCount.push({
            value: parseInt(data.G),
            type: "G",
            pos: parseInt(data.Pos),
            ref: ref
        });
        tsvDataCount.push({
            value: parseInt(data.T),
            type: "T",
            pos: parseInt(data.Pos),
            ref: ref
        });
        tsvDataCount.push({
            value: parseInt(data.Other),
            type: "Other",
            pos: parseInt(data.Pos),
            ref: ref
        });

        // Proportion Data
        tsvDataProp.push({
            value: parseInt(data.A) / total,
            type: "A",
            pos: parseInt(data.Pos),
            ref: ref
        });
        tsvDataProp.push({
            value: parseInt(data.C) / total,
            type: "C",
            pos: parseInt(data.Pos),
            ref: ref
        });
        tsvDataProp.push({
            value: parseInt(data.G) / total,
            type: "G",
            pos: parseInt(data.Pos),
            ref: ref
        });
        tsvDataProp.push({
            value: parseInt(data.T) / total,
            type: "T",
            pos: parseInt(data.Pos),
            ref: ref
        });
        tsvDataProp.push({
            value: parseInt(data.Other) / total,
            type: "Other",
            pos: parseInt(data.Pos),
            ref: ref
        });

        BOUNDS.high++;
    });

    document.getElementById('lower-bound').value = BOUNDS.low;
    document.getElementById('upper-bound').value = BOUNDS.high;
    document.getElementById('lower-bound').max = BOUNDS.high;
    document.getElementById('upper-bound').max = BOUNDS.high;
}