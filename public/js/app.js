console.log('Client side JS')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const result1 = document.querySelector('#result-1')
const result2 = document.querySelector('#result-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('testing')
    result2.textContent = ''
    result1.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            result1.textContent = data.error
            result2.textContent = ''
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
            result1.textContent = data.location
            result2.textContent = data.forecast
        }

    })
})
})