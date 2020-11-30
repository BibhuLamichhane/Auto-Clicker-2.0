function keyboardActive() {
    let kTab = document.getElementById('keyboard')
    kTab.className = 'activeTab'
    let mTab = document.getElementById('mouse')
    mTab.className = 'tablinks'
    let k = document.getElementById('key')
    let m = document.getElementById('mou')
    k.className = 'displayContents'
    m.className = 'hideContents'
}

function mouseActive() {
    let mTab = document.getElementById('mouse')
    mTab.className = 'activeTab'
    let kTab = document.getElementById('keyboard')
    kTab.className = 'tablinks'
    let k = document.getElementById('key')
    let m = document.getElementById('mou')
    m.className = 'displayContents'
    k.className = 'hideContents'
}

document.getElementById('keyboard').addEventListener('click', keyboardActive)
document.getElementById('mouse').addEventListener('click', mouseActive)

