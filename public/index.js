const update = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector('#message');

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