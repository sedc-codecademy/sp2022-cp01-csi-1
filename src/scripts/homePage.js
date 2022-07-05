var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc%2C%20gecko_desc%2C%20gecko_asc%2C%20market_cap_asc%2C%20market_cap_desc%2C%20volume_asc%2C%20volume_desc%2C%20id_asc%2C%20id_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%20200d%2C%201y&fbclid=IwAR0qOYg7ZrGleOo-0w8T2WExRx9_a5PSsVqE8Elqn9p-EaPQSVizHBlcQvM"
    
    $.ajax({

        url:url,
        type:'GET',
        dataType:'text',
        success:function(data){
            data = JSON.parse(data);
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
            $('#output').append("<br>"+data.statusText);
        }  
    })
