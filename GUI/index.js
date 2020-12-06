let {PythonShell} = require('python-shell')
let p = require("path")

let keyboardActive = () => {
    let kTab = document.getElementById('keyboard')
    kTab.className = 'activeTab'
    let mTab = document.getElementById('mouse')
    mTab.className = 'tablinks'
    let k = document.getElementById('key')
    let m = document.getElementById('mou')
    k.className = 'displayContents'
    m.className = 'hideContents'
}

let mouseActive = () => {
    let mTab = document.getElementById('mouse')
    mTab.className = 'activeTab'
    let kTab = document.getElementById('keyboard')
    kTab.className = 'tablinks'
    let k = document.getElementById('key')
    let m = document.getElementById('mou')
    m.className = 'displayContents'
    k.className = 'hideContents'
}

let activeSubTab = (evt) =>{
    let elem = document.getElementById(evt.currentTarget.val)
    let subTab = document.getElementById(evt.currentTarget.val.slice(0, 5))
    document.getElementsByClassName('activeSubTab')[0].className = 'subTab'
    elem.className = 'activeSubTab'
    document.getElementsByClassName('displayContentsSubTab')[0].className = 'hideContentsSubTab'
    subTab.className = 'displayContentsSubTab'
}

let updateCommands = (evt) => {
    let output = document.getElementById('textArea')
    let time = document.getElementById('time').value
    time = Number(time)
    if (isNaN(time)) {
        console.log('Invalid time')
    }else {
        if (evt.currentTarget.id === 'add') {
            let val = document.getElementById('text').value
            let radio = document.getElementsByName('custom')
            let checked = ''
            if (radio[0].checked){
                checked = 'Letter by Letter'
            }else if (radio[1].checked){
                checked = 'All at Once'
            }
            if (val.length > 0 && checked !== '') {
                output.value = output.value + 'Type "' + val + '" ' + checked + ' and pause for ' + time + ' sec \n'
                let i = 'Custom,' + val + ',' + checked + ',' + time
                instructionsForBackEnd.push(i)
                instructionLength.push(i.length)
                instructions.push('Type "' + val + '" ' + checked + ' and pause for ' + time + ' sec \n')
                console.log(instructionsForBackEnd)
            }
        }else if (evt.currentTarget.id === 'leftClick' || evt.currentTarget.id === 'rightClick') {
            let x = document.getElementById('xCoord').value
            let y = document.getElementById('yCoord').value
            if (x.trim().length === 0 || y.trim().length === 0){
                x = NaN
                y = NaN
            }else{
                x = Number(x)
                y = Number(y)
            }
            if (isNaN(x) || isNaN(y)) {
                output.value = output.value + 'Press "' + evt.currentTarget.id + '" and pause for ' + time + ' sec \n'
                let i = 'Mouse,' + evt.currentTarget.id + ',' + time
                instructionsForBackEnd.push(i)
                instructionLength.push(i.length)
                instructions.push('Press "' + evt.currentTarget.id + '" and pause for ' + time + ' sec \n')
                console.log(instructionsForBackEnd)
            }else{
                output.value = output.value + 'Press "' + evt.currentTarget.id + '" at (' + x + ' , ' + y + ') and pause for ' + time + ' sec \n'
                let i = 'Mouse,' + evt.currentTarget.id + ',' + 'X:' + x + ',Y:' + y + ',' + time
                instructionsForBackEnd.push(i)
                instructionLength.push(i.length)
                instructions.push('Press "' + evt.currentTarget.id + '" at (' + x + ' , ' + y + ') and pause for ' + time + ' sec \n')
                console.log(instructionsForBackEnd)
            }
        }else {
            output.value = output.value + 'Press "' + evt.currentTarget.id + '" and pause for ' + time + ' sec \n'
            let i = 'Press,' + evt.currentTarget.id + ',' + time
            instructionsForBackEnd.push(i)
            instructionLength.push(i.length)
            instructions.push('Press "' + evt.currentTarget.id + '" and pause for ' + time + ' sec \n')
            console.log(instructionsForBackEnd)
        }
    }
}

let findCoord = (evt) => {
    evt.currentTarget.className = 'extentedButton'
    evt.currentTarget.innerHTML = 'Press C to save'
}

let rm = () => {
    instructionsForBackEnd.pop()
    instructions.pop()
    instructionLength.pop()
    console.log(instructionsForBackEnd)
    let output = document.getElementById('textArea')
    output.value = ''
    for (let i = 0; i < instructions.length; i++){
        output.value = output.value + instructions[i]
    }
}

let clearInstructions = () => {
    instructionsForBackEnd = []
    instructions = []
    instructionLength = []
    let output = document.getElementById('textArea')
    output.value = ''
}

let start = () => {
    let repeat = document.getElementById('repeat').value
    repeat = Number(repeat.trim())
    if (isNaN(repeat)){
        console.log('invalid repeat value')
    }else {
        if (repeat === 0) {
            repeat = 1
        }
        console.log(instructionsForBackEnd + ' from js')
        let options = {
        scriptPath : p.join(__dirname, '../Backend'),
        args : [instructionsForBackEnd, repeat, instructionLength]
        }
        let pyshell = new PythonShell('AutoClicker.py', options)
        pyshell.on('message', function(message) {
            console.log(message);
        })
    }
}

let alpha = document.getElementById('alphabets')
let number = document.getElementById('numbers')
let symbol = document.getElementById('symbols')
let spKeys = document.getElementById('specialKeys')
let customText = document.getElementById('customText')
let findCoords = document.getElementById('findCoords')
let rightButton = document.getElementById('rightClick')
let startExecution = document.getElementById('start')
let clear = document.getElementById('clear')
let removeInstruction = document.getElementById('remove')
let instructionsForBackEnd = []
let instructions = []
let buttons = []
let instructionLength = []

for (let i = 0; i <= 98; i++){
    buttons[i] = document.getElementsByClassName('buttons')[i]
    buttons[i].addEventListener('click', updateCommands)
}

document.getElementById('keyboard').addEventListener('click', keyboardActive)
document.getElementById('mouse').addEventListener('click', mouseActive)
alpha.addEventListener('click', activeSubTab)
number.addEventListener('click', activeSubTab)
symbol.addEventListener('click', activeSubTab)
spKeys.addEventListener('click', activeSubTab)
customText.addEventListener('click', activeSubTab)
findCoords.addEventListener('click', findCoord)
rightButton.addEventListener('click', updateCommands)
startExecution.addEventListener('click', start)
clear.addEventListener('click', clearInstructions)
removeInstruction.addEventListener('click', rm)

alpha.val = 'alphabets'
number.val = 'numbers'
symbol.val = 'symbols'
spKeys.val = 'specialKeys'
customText.val = 'customText'

