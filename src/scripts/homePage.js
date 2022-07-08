var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc%2C%20gecko_desc%2C%20gecko_asc%2C%20market_cap_asc%2C%20market_cap_desc%2C%20volume_asc%2C%20volume_desc%2C%20id_asc%2C%20id_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%20200d%2C%201y&fbclid=IwAR0qOYg7ZrGleOo-0w8T2WExRx9_a5PSsVqE8Elqn9p-EaPQSVizHBlcQvM"
let factsAboutCryptoDiv = $("#facts-about-crypto");
factsAboutCryptoDiv.html("<div id = 'bitcoin-pizza-fact'><h2>Bitcoin Pizza Day<img id = 'pizza-image-facts' class ='facts-image'src='assets/318-3188504_cute-cartoon-png-image-cartoon-pizza-slice-transparent-removebg-preview.png'></h2><p>'On May 22, 2010, Laszlo Hanyecz paid 10,000 BTC for two Papa John's pizzas -- worth about $41 at the time.<br> This was the first commercial Bitcoin transaction and is now commemorated through Bitcoin Pizza day each year.'</p></div><br><br><br><br><div id = 'etherium-facts'><h2>Ethereum is next big crypto<img class ='facts-image' src = 'assets/ethereum-738482-removebg-preview.png'></h2><p>Ethereum was made by cryptocurrency researcher and programmer Vitalik Buterin in 2013,he was just 19 years old at that time.<br>Ethereum went live in mid-2015 and now it has over a million transaction per day.Even the NFT is sold and bought by Ethereum.</p></div><br><br><br><br><div id = 'crypto-mining-acts'><h2>China is the biggest cryptocurrency miner<img class ='facts-image' src = 'assets/how-bitcoin-mining-works-553512-removebg-preview.png'></h2><p>' Mining of cryptocurrency is the process of verifying transactions before they’re placed on the Blockchain’s ledger. It’s an extremely lucrative part of the business, and as of now, China controls around 75% of the mining network.'</p></div></div><br><br><br><br>");

  










$.ajax({

        url:url,
        type:'GET',
        dataType:'text',
        success:function(data){
            data = JSON.parse(data);
            console.log(data);
            let cards = $("#cards")
            
            let card = "";
            
            
            for(let i = 0; i<6; i++){
                card = card + "<div class='singleCard'>"
                card = card + "<img src='"+data[i].image+"' id = 'coinImage' width='65' height='65' >"+
                "<br><h3 id = 'coinName'>"+data[i].name+"</h3>"+
                "<p id = 'coinPrice'> Price: "+data[i].current_price+" $</p>";
                card = card+ "</div>";

            }
    
            cards.append(card);
    
             
        },
        error:function(data){
            console.log(data);
            $('#output').append("<br>"+data.statusText);
        }  
    })


