const $ = (id) => document.getElementById(id)

const expenseName = $('expenseName').value;
const amount = $('amount').value;
const category = $('expenseCategory').value;
const date = $('date').value;
const submitBtn = $('form');

const table = document.getElementById('table');
const tr = document.createElement('tr').classList.add('tr');
const tbody = document.createElement('tbody');
table.append(tbody);

const editBtn = document.createElement('button');
editBtn.classList.add('edit');
editBtn.textContent = 'Edit';

const delBtn = document.createElement('button');
delBtn.classList.add('delete');
delBtn.textContent = 'Delete';

function addExpense(){
  
    const rows = [expenseName, amount, category, date];

    for(let element of rows){
        td = document.createElement('td').classList.add('td');
        td.textContent = element;

        tr.append(td);
    }
    const td = document.createElement('td');
    td.append(editBtn, delBtn)
    tr.append(td)
    tbody.append(tr)
}

submitBtn.addEventListener('click', () => {
    preventDefault()
    addExpense
})
