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
    elem.className = 'activeSubTab'

}

document.getElementById('keyboard').addEventListener('click', keyboardActive)
document.getElementById('mouse').addEventListener('click', mouseActive)

let alpha = document.getElementById('alphabets')
let number = document.getElementById('numbers')
let symbol = document.getElementById('symbols')
let spKeys = document.getElementById('specialKeys')
let customText = document.getElementById('customText')

alpha.addEventListener('click', activeSubTab)
number.addEventListener('click', activeSubTab)
symbol.addEventListener('click', activeSubTab)
spKeys.addEventListener('click', activeSubTab)
customText.addEventListener('click', activeSubTab)

alpha.val = 'alphabets'
number.val = 'numbers'
symbol.val = 'symbols'
spKeys.val = 'specialKeys'
customText.val = 'customText'


