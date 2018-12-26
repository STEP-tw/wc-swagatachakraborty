const TAB = '      ';
const SPACE = ' ';
const NEWLINE = '\n';
const EMPTYSRTING = '';


const wc = function (fs, fileName) {
    let content = fs.readFileSync(fileName, 'utf8');
    let lines = content.split(NEWLINE).length - 1;
    let words = content.split(EMPTYSRTING).reduce(function (x, y) {
        if (y != SPACE && y != NEWLINE)
            return ++x;
        return x;
    }, 0);
    let bytes = content.split(EMPTYSRTING).length;
    let result = TAB + lines + TAB + words + TAB + bytes + SPACE + fileName;
    return result;
};

module.exports = { wc, TAB, SPACE };