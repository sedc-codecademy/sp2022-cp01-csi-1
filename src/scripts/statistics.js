$(document).ready(function () {
  document.getElementById("search").addEventListener("keyup", myFunction);
  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc%2C%20gecko_desc%2C%20gecko_asc%2C%20market_cap_asc%2C%20market_cap_desc%2C%20volume_asc%2C%20volume_desc%2C%20id_asc%2C%20id_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%20200d%2C%201y", {
    method: "GET",
    mode: "cors",
    headers: ({
      'Access-Control-Allow-Origin': '*'
    })
  })
    .then(response => response.json())
    .then(data => {
      let coinsTable = $('#resultTable');
      for (x of data) {
        let row = "";
        row = `<tr>
        <td>${x.name}</td>
        <td>${x.symbol}</td>
        <td><img src="${x.image} width="18" height="18"/></td>
        <td>${x.current_price}$</td>
        <td>${x.price_change_percentage_24h}%</td>
        <td>$${x.total_volume.toLocaleString()}</td>
        <td>$${x.market_cap.toLocaleString()}</td>
        <td><canvas id="${x.name + "chart"}" width="250" height="36"></canvas></td>
        </tr>`
        coinsTable.append(row);
        const ctx = document.getElementById(x.name + "chart").getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: { datasets: [{ data: x.sparkline_in_7d.price }], labels: [...Array(x.sparkline_in_7d.price.length).keys()] },
          options: {
            responsive: false,
            legend: {
              display: false
            },
            elements: {
              line: {
                borderColor: x.price_change_percentage_24h < 0 ? '#FF1D1D' : '#2EFF1D',
                borderWidth: 1
              },
              point: {
                radius: 0
              }
            },
            tooltips: {
              enabled: false
            },
            scales: {
              yAxes: [
                {
                  display: false
                }
              ],
              xAxes: [
                {
                  display: false
                }
              ]
            }
          }
        });
      }

    })
    .catch(err => {
      console.log(err);
    });
});

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("resultTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

