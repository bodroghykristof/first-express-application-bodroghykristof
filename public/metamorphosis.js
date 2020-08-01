initDragAndDrop();

function initDragAndDrop() {
    window.addEventListener('win', winScreen)
    shuffleCards();
    let cards = getAllCards();
    let slots = getAllSlots();
    let desk = getDesk()
    makeCardsDraggable(cards);
    addDraggableListeners(cards);
    addDroppableListeners(slots, desk);
};

function shuffleCards() {
    let mixedCardsContainer = document.querySelector(".mixed-cards");
    for (let i = mixedCardsContainer.children.length; i >= 0; i--) {
        mixedCardsContainer.appendChild(mixedCardsContainer.children[Math.random() * i | 0]);
    }
};

function getAllCards() {
    return document.getElementsByClassName('card');
};

function getAllSlots() {
    return document.getElementsByClassName('card-slot');
};

function getDesk() {
    return document.querySelector('.mixed-cards')
}

function makeCardsDraggable(cards) {
    for (let card of cards) {
        card.setAttribute('draggable', 'true');
    }
};

function addDraggableListeners(cards) {
    for (let card of cards) {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    }
};

function dragStart() {
    this.classList.add('dragged');
    let draggedElement = document.getElementsByClassName('dragged')[0];
    let slots = getAllSlots();
    for (let slot of slots) {
        if (slot.dataset.animal === draggedElement.dataset.animal && slot.innerHTML === "") {
                slot.classList.add('active')
        }
    }
    let desk = document.querySelector('.mixed-cards')
    desk.classList.add('desk-active')
};

function dragEnd() {
    this.classList.remove('dragged');
    let slots = getAllSlots();
    for (let slot of slots) {
        slot.classList.remove('active')
    }
    let desk = document.querySelector('.mixed-cards')
    desk.classList.remove('desk-active')
};

function addDroppableListeners(slots, desk) {
    for (let slot of slots) {
        slot.addEventListener('dragover', dragOverSlot)
        slot.addEventListener('dragleave', dragLeaveSlot)
        slot.addEventListener('drop', dropElementSlot)
    }
    desk.addEventListener('dragover', dragOverDesk)
    desk.addEventListener('dragleave', dragLeaveDesk)
    desk.addEventListener('drop', dropElementDesk)
};

function dragOverSlot(event) {
    let draggedElement = document.getElementsByClassName('dragged')[0];
    if (this.dataset.animal === draggedElement.dataset.animal && this.innerHTML === "") {
        this.classList.add('over');
    }
    event.preventDefault();
}

function dragLeaveSlot() {
    this.classList.remove('over');
}

function dropElementSlot(event) {
    event.preventDefault()
    let draggedElement = document.getElementsByClassName('dragged')[0];
    if (draggedElement.dataset.animal === this.dataset.animal && this.innerHTML === "") {
        draggedElement.classList.add('dropped')
        draggedElement.classList.remove('card')
        this.appendChild(draggedElement);
        this.classList.remove('over');
    }
    checkWin()
}

function dragOverDesk(event) {
    this.classList.add('desk-over');
    event.preventDefault();
}

function dragLeaveDesk() {
    this.classList.remove('desk-over');
}

function dropElementDesk(event) {
    event.preventDefault()
    let draggedElement = document.getElementsByClassName('dragged')[0];
    draggedElement.classList.remove('dropped')
    draggedElement.classList.add('card')
    this.appendChild(draggedElement);
    this.classList.remove('desk-over');
}

function checkWin() {
    let winSituation = true;
    let slots = getAllSlots();
    for (let slot of slots) {
        let contentDiv = slot.querySelector('.dropped')
        if (contentDiv.dataset.order !== slot.dataset.order) {
            winSituation = false
        }
    }
    if (winSituation) {
        let winEvent = new CustomEvent('win', {bubbles: true, cancelable: true})
        window.dispatchEvent(winEvent)
    }
}

function winScreen() {
    let lowerDiv = document.querySelector('.mixed-cards')
    let winBox = document.createElement('div')
    winBox.classList.add('winbox')
    winBox.innerHTML = `<p>Fantastic! You won!</p>`
    lowerDiv.appendChild(winBox)
    let body = document.querySelector('body')
    let linkDiv = document.createElement('div')
    linkDiv.innerHTML = `<a href="${location.href}">Play again!</a>`
    linkDiv.classList.add('new-game')
    body.appendChild(linkDiv)
    setTimeout(removeListeners, 500)
}

function removeListeners() {
    let cards = document.getElementsByClassName('dropped');
    for (let card of cards) {
        card.removeEventListener('dragstart', dragStart)
        card.removeEventListener('dragend', dragEnd)
    }
    let desk = getDesk()
    desk.removeEventListener('dragover', dragOverDesk)
    desk.removeEventListener('dragleave', dragLeaveDesk)
    desk.removeEventListener('drop', dropElementDesk)
    let slots = getAllSlots()
    for (let slot of slots) {
        slot.removeEventListener('dragover', dragOverSlot)
        slot.removeEventListener('dragleave', dragLeaveSlot)
        slot.removeEventListener('drop', dropElementSlot)
    }
}