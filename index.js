module.exports.convert = (code, callback) => {
    const beautify = require('js-beautify').js_beautify
    const replaceList = {
        "공천": "let",
        "될때까지": "while",
        "는 이것이다 창조": "= new",
        "는 이것이다 ": "= ",
        "친박": "true",
        "비박": "false",
        "코드 텅텅 빌때까지 한번 해 보세요": "try",
        "예외처리 다 어디 갔냐고": "catch()",
        "/ㄹ": "/*",
        "ㄹ/": "*/",
        "한국형": "class",
        "연설": "console.log",
        "구성": "constructor",
        "한국의 ": "this.",
        "를 그렇게": "=>",
        "그러니까 그": "",
        "당선된": "const",
        "사퇴합니다": "return",
        "ㄹㄹ": "//"
    }
    lineList = code.split('\n').map((v, i) => {
        if (v.match(/전부 이렇게 해 가지고 .* 으로 들어가도록\(.*\)/)) {
            const functionNameStart = v.match(/전부 이렇게 해 가지고 .* 으로 들어가도록\(.*\)/).index + 13
            const functionNameEnd = v.substr(functionNameStart).indexOf(' ');
            const args = v.substr(functionNameStart + functionNameEnd + 9)
            return `function ${v.substr(functionNameStart, functionNameEnd)} ${args}`
        } else if (v.match(/입당 .*/)) {
            if (v.indexOf('.') != -1) {
                let method = v.split('.')[1]
                const package = v.split('.')[0].split('입당 ')[1]
                if (v.indexOf(';') != -1) {
                    method = method.substr(0, method.length - 1)
                }
                return `const ${method} = require("${package}").${method}`
            }
        } else {
            let willRep = v
            for (i in replaceList) {
                willRep = willRep.split(i).join(replaceList[i])
            }
            return willRep
        }
    }).join('\n')
    callback(beautify(lineList, {indent_size: 2}))
    
}