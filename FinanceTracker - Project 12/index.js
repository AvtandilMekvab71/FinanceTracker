let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const form = document.getElementById('form');
const tbody = document.getElementById('tbody');  
const filter = document.getElementById('filter'); 
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');

const editName = document.getElementById('productName');
const editAmount = document.getElementById('quantity');
const editCategory = document.getElementById('category');
const editDate = document.getElementById('editDate');

let editingId = null;
let total = document.getElementById('total');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('expenseName').value.trim();
    const amount = Number(document.getElementById('amount').value);
    const category = document.getElementById('expenseCategory').value;
    const date = document.getElementById('date');     
    if(name.length === 0 || date.valueAsNumber > Date.now()){
        window.alert('Invalid input');
        return
    }
    if(isGibberish(name)){
        window.alert("Please enter a valid response");
        return
    } 
                                                                                    
    id += 1;
    const data = {id: id, name: name, amount: amount, category: category, date: date.value};
    expenses.push(data);
    
    render();
    form.reset();

    save()
})   // The key is that we are rewriting the innerHTML. 

function render(){
    tbody.innerHTML = '';
    let totalAmount = 0;
    let visible = expenses;

    if(filter.value !== 'all'){
        visible = expenses.filter(x => x.category === filter.value)
    }

    if(visible.length === 0 ){
        tbody.innerHTML += '<tr class = "bg"><td colspan="5" class="default">No expenses recorded</td></tr>';
        total.textContent = `Total: $${totalAmount.toFixed(2)}`;
    }

    for(let expense of visible){
        const tr = document.createElement('tr');

        tr.innerHTML += `<td class="td">${expense.name}</td>`;                  
        tr.innerHTML += `<td class="td">$${(expense.amount.toFixed(2))}</td>`;
        tr.innerHTML += `<td class="td">${expense.category}</td>`;
        tr.innerHTML += `<td class="td">${expense.date}</td>`;
        tr.innerHTML += `<td class="td">
            <button class="delete" data-id="${expense.id}">Delete</button>
            <button class="edit" data-id="${expense.id}">Edit</button>
        </td>`;

        totalAmount += expense.amount;
        total.textContent = `Total: $${totalAmount.toFixed(2)}`;

        tbody.append(tr);  
}}


tbody.addEventListener('click', (e) => {
        const clickedId = Number(e.target.dataset.id)

        if(e.target.classList.contains('delete')){
            const idToDelete = Number(e.target.dataset.id);                     
            expenses = expenses.filter(x => x.id !== idToDelete);
            render()
        }
        if(e.target.classList.contains('edit')){
            const expense = expenses.find(x => x.id === clickedId);
        
            editName.value = expense.name;
            editAmount.value = expense.amount;
            editCategory.value = expense.category;
            editDate.value = expense.date;

            editingId = clickedId;
            openWindow();
        } 
        save()
})

saveBtn.addEventListener('click', () => {
    const expense = expenses.find(x => x.id === editingId);

    const name = editName.value.trim();
    const amount = Number(editAmount.value);
    const date = editDate;
    if(name.length===0 || amount <=0 || date.valueAsNumber >  Date.now() || date.value === ''){
        window.alert('Invalid input');
        return
    }
    if(isGibberish(name)){
        window.alert("Please enter a valid response");
        return
    } 
    expense.name = name;
    expense.amount = amount;
    expense.category = editCategory.value;
    expense.date = editDate.value;

    render();
    closeWindow();

    save()
})

cancelBtn.addEventListener('click', closeWindow);
overlay.addEventListener('click', closeWindow )

filter.addEventListener('change', render)

function openWindow(){
    modal.classList.add('active');
    overlay.classList.add('active')
}

function closeWindow(){
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function save(){
    localStorage.setItem('expenses', JSON.stringify(expenses))
}

function isGibberish(text){
    const consonantSmash = /[^aeiouy\s]{5,}/i
    return consonantSmash.test(text)
}


render()