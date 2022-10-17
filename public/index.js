const update = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector('#message');
const trashCan = document.querySelectorAll('.fa-trash-can');

Array.from(trashCan).forEach((elem) => {
    elem.addEventListener('click', deleteExpense);
})

update.addEventListener('click', _ => {
    fetch('/expenses', {
        method: 'put',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({
            expenseItem: 'testing',
            amount: '117'
        })
    })
        .then(res => {
            if(res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true);
        })
})

deleteButton.addEventListener('click', _ => {
    fetch('/expenses', {
        method: 'delete',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify({
            name: 'testing'
        })
    })
        .then(res => {
            if(res.ok) return res.json();
        })
        .then(response => {
            if(response === 'No testing item to delete'){
                messageDiv.textContent = "No testing item to delete";
            }
            else{
                window.location.reload(true);
            }
        })
        .catch(err => console.error(err))
    
})

async function deleteExpense(){
    const expenseItem = this.parentNode.childNodes[2].innerText;
    const expenseAmount = this.parentNode.childNodes[5].innerText;
    const theDate = this.parentNode.childNodes[8].innerText;
    console.log(theDate);
    try{
        const response = await fetch('deleteExpense', {
            method: 'delete',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'expenseItemD' : expenseItem,
                'amountD' : expenseAmount,
                'entryDateD' : theDate
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload();
    }
    catch(err){
        console.error(err);
    }
}
