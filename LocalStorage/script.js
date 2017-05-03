//variables 
    const addItems = document.querySelector('.add-items');
    const itemsList = document.querySelector('.plates');
    const checkBtn = addItems.querySelector('[name="check"]');
    const uncheckBtn = addItems.querySelector('[name="uncheck"]');
    const clearBtn = addItems.querySelector('[name="clear"]');
    const items = JSON.parse(localStorage.getItem('starters')) || [];

//functions
  function refreshList() {
        localStorage.setItem('starters', JSON.stringify(items)); 
    populateList(items, itemsList);
  }

  function addItem(e) {
        e.preventDefault();
    const text = this.querySelector('[type=text]').value; 
    const item = {
        text: text,               
        done: false
    };
    items.push(item);
    this.reset();
    refreshList();
  }

  function populateList(plates = [], platesList) {
        platesList.innerHTML = plates.map((plate, i) => {
            return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>      
      `;
        }).join('');
    }

    function toggleDone(e) {
        if(!e.target.matches('input')) return;
        const index = e.target.dataset.index;
        items[index].done = !items[index].done; 
        refreshList();
    }

    function checkAll() {
            items.forEach((element) => {
                element.done = true;
            });
        refreshList();
    }

    function uncheckAll() {
            items.forEach((element) => {
                element.done = false;
            });
        refreshList();
    }

    function clearList() {
            items.length = 0;
        localStorage.removeItem('starters');
    refreshList();
    }
 

//eventListeners
    addItems.addEventListener('submit', addItem);
    itemsList.addEventListener('click', toggleDone);
    checkBtn.addEventListener('click', checkAll);
    uncheckBtn.addEventListener('click', uncheckAll);
    clearBtn.addEventListener('click', clearList);

//IIFE
    populateList(items, itemsList);