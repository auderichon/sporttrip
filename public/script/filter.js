const activityList = document.getElementById("home-activities");
const form = document.getElementById("filter-form");

form.onchange = function (event) {
  const query = {
    "location.country": [],
    requiredLevel: [],
    duration: [],
    sport: [],
  };
  const inputs = form.querySelectorAll("input,select");
  inputs.forEach((input) => {
    if (input.type === "checkbox") {
      if (input.name === "country") {
        if (input.checked) {
          query["location.country"].push(input.value);
        }
      } else if (input.name === "requiredLevel") {
        if (input.checked) {
          query.requiredLevel.push(input.value);
        }
      }
    } else {
      query[input.name] = getSelectValues(input);

      //query[input.name].push(input.value)
    }
  });

  axios
    .get("/filter/search", {
      params: query,
    })
    .then((response) => {
      activityList.innerHTML = "";
      console.log("===============RESPONSE", response.data);

      response.data.forEach((res) => {
        activityList.innerHTML += `<div class="each-activity">
          <a href="/activity/${res._id}"><img src="${
          res.sport.picture
        }" alt=""></a>
          <h4>${res.activityName}</h4>
          <a href="/user/profile/${res.creator._id}">
              <div class="activity-creator">
                  <p>with ${res.creator.firstName}</p>
                  <img src="${res.creator.picture}" alt="${
          res.creator.firstName
        } pic">
              </div>
          </a>
          <p>Level: ${res.requiredLevel}</p>
          <div class="time">
              <p><i class="fas fa-stopwatch"></i>${res.duration}</p>
              <p><i class="fas fa-calendar-day"></i>${res.date.toLocaleDateString(
                "en-GB"
              )}</p>
          </div>
          <div class="activity-button"
              <a href="/activity/ ${res._id} ">Check it out!</a>
          </div>
      </div>`;
      });
    })
    .catch((error) => console.log(error));
};

function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}
