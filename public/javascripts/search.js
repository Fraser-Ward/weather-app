const e = new Error('Please try again.');
const APIKEY = process.env.APIKEY;

const weatherCard = document.querySelector(".weatherCard1");
const searchBar = document.querySelector("#searchForm");
searchBar.addEventListener("submit", function (e) {
  try {
    e.preventDefault();
    fetchAndAppend();
    clearHTML();
  } catch (error) {
    console.log(error);
    throw e;
  }
  searchBar.elements.query.value = ""; // clears search bar
});

async function fetchAndAppend() {
  const searchResult = searchBar.elements.query.value;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/find?q=${searchResult}&units=metric&appid=${APIKEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      const { name } = data.list[0];
      const { country } = data.list[0].sys;
      let { temp, temp_max, temp_min } = data.list[0].main;
      const { description, icon } = data.list[0].weather[0];
      const temp1 = Math.round(temp);
      weatherCard.innerHTML += `<div class="card" style="width: 18rem;">
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="card-img-top" alt="...">
                        <h5 class="card-title">${temp1}&deg;</h5>
                        <div class="card-body">
                            <p id="locationName" class="card-text">${name}, ${country}</p>
                        </div>
                        <div class="card-body">
                            <div class="description">${description}</div>
                        </div>
                        <div class="card-body">
                            <div class="low">Low: ${temp_min}&deg;</div>
                            <div class="high">High: ${temp_max}&deg;</div>
                        </div>
                </div>`;
    });
}

function clearHTML() {
  document.querySelector(".weatherCard1").innerHTML = "";
}
