document.getElementById('ethForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const addresses = document.getElementById('addresses').value.split('\n');
    const tokenIdentifier = document.getElementById('token').value;
    const apiKey = document.getElementById('apiKey').value;
    let resultsHTML = '';
    let index = 0;

    const sendRequest = async () => {
        if (index < addresses.length) {
            const address = addresses[index];
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
            index++;
            setTimeout(sendRequest, 200); // 200ms delay between each request
        } else {
            document.getElementById('results').innerHTML = resultsHTML;
        }
    };
    sendRequest();
});
