const displayData = (data) => {
  document.querySelector('h1').textContent = data;
}


const readDataFromServer = async () => {
    const res = await fetch('http://localhost:3000/api',{
        headers: {
            'Access-Control-Allow-Origin' : 'http://localhost:3000/',
        }
    });
    const data = await res.json();
    displayData(data);
}

readDataFromServer()