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
    output.value = output.value + evt.currentTarget.id + '\n'
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

alpha.val = 'alphabets'
number.val = 'numbers'
symbol.val = 'symbols'
spKeys.val = 'specialKeys'
customText.val = 'customText'


