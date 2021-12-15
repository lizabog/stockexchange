const urlParams = new URLSearchParams(window.location.search);
const symbolString = urlParams.get("symbol");

addProfile(getCompProfile(symbolString));

async function getCompProfile(symbol) {
  const compProfileResponse = await fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
  );
  const compProfile = await compProfileResponse.json();
  return compProfile.profile;
}

async function addProfile(item) {
  const heading = document.getElementById("compName");
  const profile = await item;
  const description = document.getElementById("description");
  heading.innerText = `${profile.companyName}`;
  description.innerText = `${profile.description}`;
  const profImg = document.getElementById("compImg");
  profImg.src = `${profile.image}`;
  const price = document.getElementById("price");

  price.innerText = ` ${profile.price}$ `;
  const percentage = document.getElementById("percentChange");
  if (profile.changesPercentage > 0) {
    percentage.classList.add("light-green-text");
  } else {
    percentage.classList.add("red-text");
  }
  percentage.innerText = ` ${profile.changesPercentage}%`;
  const profLink = document.createElement("a");
  profLink.href = `${profile.website}`;
  profLink.innerText = `Visit Website`;

  description.appendChild(profLink);
}

async function getHistory(symbol)
{
  const responseHistory = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`)
  const history = await responseHistory.json();
   return history.historical
}

async function graph(){
try{
  const ctx = document.getElementById("graphArea").getContext("2d");
const historyData = await getHistory(symbolString)
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [
      {
        data: historyData,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Stocks Historical Data",
      },
      legend: {
        display: false,
      },
    },

    parsing: {
      xAxisKey: "date",
      yAxisKey: "close",
    },
    showLine: false,
  },
});}
catch(e){
  console.error(e)
}
finally{
  loader(false)
}}

function loader(onof) {
  const loadBar = document.getElementById("loader");
  onof ? loadBar.classList.remove("hide") : loadBar.classList.add("hide");
}

graph();