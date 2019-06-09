const beautify = require('js-beautify').js_beautify
const convert = (code, option = {}) => {
    return new Promise((resolve, reject) => {
        const replaceList = {
            "그러니까 그": "",
            "공천": "let",
            "될때까지": "while",
            "는 이것이다 창조": "= new",
            "는 이것이다 ": "= ",
            "친박": "true",
            "비박": "false",
            "코드 텅텅 빌 때까지 한 번 해보세요": "try",
            "예외처리 다 어디 갔냐고": "catch(e)",
            "/ㄹ": "/*",
            "ㄹ/": "*/",
            "한국형": "class",
            "연설": "console.log",
            "구성": "constructor",
            "한국의 ": "this.",
            "를 그렇게": "=>",
            "당선된": "const",
            "사퇴합니다": "return",
            "ㄹㄹ": "//",
            "K-": "K_",
            "완료": "break",
            "고심 끝에 프로세스 해체": "throw ''",
            "이.": "this.",
            "사회 ": "function main() ",
            "만약": "if",
            "아니면": "else"
        }
        lineList = code.split('\n').map((v, i) => {
            let thisLine = v
            thisLine = thisLine.replace(/전부 이렇게 해 가지고 (.*) 으로 들어가도록(\(.*\))/, 'function $1$2')
            thisLine = thisLine.replace(/입당 (.*)\.(.*);$/, option.es6Import ? 'import {$1} from \'$2\'' : 'const {$2} = require(\'$1\')')
            thisLine = thisLine.replace(/입당 (.*)\.(.*)/, option.es6Import ? 'import {$1} from \'$2\'' : 'const {$2} = require(\'$1\')')
            thisLine = thisLine.replace(/입당 (.*)\.(.*)/, option.es6Import ? 'import {$1} from \'$2\'' : 'const {$2} = require(\'$1\')')
            thisLine = thisLine.replace(/판사님, 고양이\((.*?)\)가 했습니다./, 'delete $1')
            for (i in replaceList) {
                thisLine = thisLine.split(i).join(replaceList[i])
            }
            while (thisLine.match(/([가-힣ㄱ-ㅎ])-([가-힣ㄱ-ㅎ])/)) {
                thisLine = thisLine.replace(/([가-힣ㄱ-ㅎ])-([가-힣ㄱ-ㅎ])/, '$1_$2')
            }
            return thisLine
        }).join('\n')
        resolve(beautify(lineList, { indent_size: 2 }))
    })
}
const run = (code, option) => {
    convert(code, option).then(jsCode => {
        try {
            const runCode = `
            ${jsCode}
            if(main) main()
        `
            require('fs').writeFile('./runnable.js', runCode, (e) => {})
            eval(runCode)
        }
        catch (e) {
            console.log({
                'MODULE_NOT_FOUND': '나쁜 부분이 있어서 이 코드를 어떻게 해야 더 희망적인 청소년 복지를 실현하고 확실하게 이것이 실행 가능한 코드라는 사실을 더욱 밝게 보여줘서 신뢰를 받아야 할 의지임을 다시 생각하며 문제를 해결하려면 이렇게 하셔야 한다는 생각입니다.'
            }[e.code])
            console.dir(e)
            throw "\n제가 뭐라고 했습니까?"
        }
    }).catch(e => {

    })

}
module.exports.convert = convert
module.exports.run = run