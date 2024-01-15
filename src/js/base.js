document.getElementById('ethForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const addresses = document.getElementById('addresses').value.split('\n');
    const tokenIdentifier = document.getElementById('token').value;
    const apiKey = document.getElementById('apiKey').value;
    let resultsHTML = '';

    for (let address of addresses) {
        if (address) {
            const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenIdentifier}&address=${address}&tag=latest&apikey=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === '1') {
                const balance = data.result / (10 ** 9); // Adjust for token's decimal places if necessary
                resultsHTML += `<p>${address}: ${balance}</p>`;
            } else {
                resultsHTML += `<p>${address}: Error</p>`;
            }
        }
    }

    document.getElementById('results').innerHTML = resultsHTML;
});
