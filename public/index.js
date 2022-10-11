const update = document.querySelector("#update-button");

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