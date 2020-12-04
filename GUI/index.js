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
                instructions.push('Custom,' + val + ',' + checked + ',' + time)
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
                instructions.push('Mouse,' + evt.currentTarget.id + ',' + time)
            }else{
                output.value = output.value + 'Press "' + evt.currentTarget.id + '" at (' + x + ' , ' + y + ') and pause for ' + time + ' sec \n'
                instructions.push('Mouse,' + evt.currentTarget.id + ',' + 'X:' + x + ',Y:' + y + ',' + time)
            }
        }else {
            output.value = output.value + 'Press "' + evt.currentTarget.id + '" and pause for ' + time + ' sec \n'
            instructions.push('Press,' + evt.currentTarget.id + ',' + time)
        }
    }
}

let findCoord = (evt) => {
    evt.currentTarget.className = 'extentedButton'
    evt.currentTarget.innerHTML = 'Press C to save'
}

document.getElementById('keyboard').addEventListener('click', keyboardActive)
document.getElementById('mouse').addEventListener('click', mouseActive)

let alpha = document.getElementById('alphabets')
let number = document.getElementById('numbers')
let symbol = document.getElementById('symbols')
let spKeys = document.getElementById('specialKeys')
let customText = document.getElementById('customText')
let findCoords = document.getElementById('findCoords')
let rightButton = document.getElementById('rightClick')
let instructions = []
let buttons = []

for (let i = 0; i <= 98; i++){
    buttons[i] = document.getElementsByClassName('buttons')[i]
    buttons[i].addEventListener('click', updateCommands)
}
alpha.addEventListener('click', activeSubTab)
number.addEventListener('click', activeSubTab)
symbol.addEventListener('click', activeSubTab)
spKeys.addEventListener('click', activeSubTab)
customText.addEventListener('click', activeSubTab)
findCoords.addEventListener('click', findCoord)
rightButton.addEventListener('click', updateCommands)

alpha.val = 'alphabets'
number.val = 'numbers'
symbol.val = 'symbols'
spKeys.val = 'specialKeys'
customText.val = 'customText'

