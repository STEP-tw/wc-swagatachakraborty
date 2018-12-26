const { 
    TAB,
    SPACE,
    NEWLINE,
    EMPTYSTRING
 } = require('./util');

const wc = function (fs, fileName) {
    let content = fs.readFileSync(fileName, 'utf8');
    let lines = content.split(NEWLINE).length - 1;
    let words = content.split(NEWLINE)
        .map(function (x) {
            return x.split(' ').reduce(function (x, y) {
                if (y != EMPTYSTRING && y != NEWLINE)
                    return ++x;
                return x;
            }, 0)
        })
        .reduce((x, y) => x + y, 0);
            let bytes = content.split(EMPTYSTRING).length;
            let result = TAB + lines + TAB + words + TAB + bytes + SPACE + fileName;
    return result;
};

module.exports = { wc, TAB, SPACE };