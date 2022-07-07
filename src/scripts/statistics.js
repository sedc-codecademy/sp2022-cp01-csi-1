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
      statistics(data);
      growingCoins(data);
      fallingCoins(data);
    })
    .catch(err => {
      console.log(err);
    });
});

//#region Statistics code
function statistics(data) {
  let coinsTable = $('#resultTable');
  for (x of data) {
    let row = "";
    row = `<tr>
        <td><img src="${x.image} width="40" height="40"/></td>
        <td>
          <div class="wrap">
            <span class="wallet-coin-id">${capitalizeWord(x.name)}</span>
            <p class="wallet-coin-symbol text-secondary" style="font-size: 0.8rem;"><span>${x.symbol.toUpperCase()}</span></p>
          </div>
        </td>
        <td>${x.current_price}$</td>
        <td>${x.price_change_percentage_24h}%</td>
        <td>$${x.total_volume.toLocaleString()}</td>
        <td>$${x.market_cap.toLocaleString()}</td>
        <td>
          <div class="chart-container" style="height:36px; width:120px">
            <canvas id="${x.name + "chart"}"></canvas>
          </div>
        </td>
        </tr>`
    coinsTable.append(row);
    const ctx = document.getElementById(x.name + "chart").getContext('2d');

    const graphData = {
      labels: [...Array(x.sparkline_in_7d.price.length).keys()],
      datasets: [{
        label: '',
        data: x.sparkline_in_7d.price
      }]
    };

    const graphConfig = {
      type: 'line',
      data: graphData,
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          },
          responsive: false,
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
        scales: {
          x: {
            ticks: {
              display: false
            },
            grid: {
              display: false,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              display: false
            },
            grid: {
              display: false,
              drawBorder: false
            }
          }
        }
      }
    }

    new Chart(
      ctx,
      graphConfig
    );
  }
}
//#endregion

//#region Growing code
function growingCoins(data) {
  let coinsTable = $('#growingTable');
  for (x of data) {
    if (x.price_change_percentage_24h > 0) {
      let row = "";
      row = `<tr>
                <td><img src="${x.image} width="40" height="40"/></td>
                <td>
                  <div class="wrap">
                    <span class="wallet-coin-id">${capitalizeWord(x.name)}</span>
                    <p class="wallet-coin-symbol text-secondary" style="font-size: 0.8rem;"><span>${x.symbol.toUpperCase()}</span></p>
                  </div>
                </td>
                <td>${x.price_change_percentage_24h}%</td>
                <td>${x.current_price}$</td>
                <td>
                  <div class="chart-container" style="height:36px; width:120px">
                    <canvas id="${x.name + "chart"}"></canvas>
                  </div>
                </td>
                </tr>`
      coinsTable.append(row);
      const ctx = document.getElementById(x.name + "chart").getContext('2d');

      const graphData = {
        labels: [...Array(x.sparkline_in_7d.price.length).keys()],
        datasets: [{
          label: '',
          data: x.sparkline_in_7d.price
        }]
      };

      const graphConfig = {
        type: 'line',
        data: graphData,
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            },
            responsive: false,
          },
          elements: {
            line: {
              borderColor: '#2EFF1D',
              borderWidth: 1
            },
            point: {
              radius: 0
            }
          },
          scales: {
            x: {
              ticks: {
                display: false
              },
              grid: {
                display: false,
                drawBorder: false
              }
            },
            y: {
              ticks: {
                display: false
              },
              grid: {
                display: false,
                drawBorder: false
              }
            }
          }
        }
      }

      new Chart(
        ctx,
        graphConfig
      )
    }
  }
}
//#endregion

//#region Falling code
function fallingCoins(data) {
  let coinsTable = $('#fallingTable');
  for (x of data) {
    if (x.price_change_percentage_24h < 0) {
      let row = "";
      row = `<tr>
              <td><img src="${x.image} width="40" height="40"/></td>
              <td>
                <div class="wrap">
                  <span class="wallet-coin-id">${capitalizeWord(x.name)}</span>
                  <p class="wallet-coin-symbol text-secondary" style="font-size: 0.8rem;"><span>${x.symbol.toUpperCase()}</span></p>
                </div>
              </td>
              <td>${x.price_change_percentage_24h}%</td>
              <td>${x.current_price}$</td>
              <td>
                <div class="chart-container" style="height:36px; width:120px">
                  <canvas id="${x.name + "chart"}"></canvas>
                </div>
              </td>
            </tr>`
      coinsTable.append(row);
      const ctx = document.getElementById(x.name + "chart").getContext('2d');

      const graphData = {
        labels: [...Array(x.sparkline_in_7d.price.length).keys()],
        datasets: [{
          label: '',
          data: x.sparkline_in_7d.price
        }]
      };

      const graphConfig = {
        type: 'line',
        data: graphData,
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            },
            responsive: false,
          },
          elements: {
            line: {
              borderColor: '#FF1D1D',
              borderWidth: 1
            },
            point: {
              radius: 0
            }
          },
          scales: {
            x: {
              ticks: {
                display: false
              },
              grid: {
                display: false,
                drawBorder: false
              }
            },
            y: {
              ticks: {
                display: false
              },
              grid: {
                display: false,
                drawBorder: false
              }
            }
          }
        }
      }

      new Chart(
        ctx,
        graphConfig
      )
    }
  }
}
//#endregion

//#region Searchbar
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("resultTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
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
//#endregion


