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

      for (let i = 0; i < response.data.length; i++) {
        activityList.innerHTML += `<div class="each-activity">
          <a href="/activity/${response.data._id} "><img src=" ${response.data.sport.picture} " alt=""></a>
          <h4> ${response.data.activityName} </h4>
          <a href="/user/profile/ ${response.data.creator._id} ">
              <div class="activity-creator">
                  <p>with  ${response.data.creator.firstName} </p>
                  <img src=" ${response.data.creator.picture} " alt=" ${response.data.creator.firstName}  pic">
              </div>
          </a>
          <p>Level:  ${response.data.requiredLevel} </p>
          <div class="time">
              <p><i class="fas fa-stopwatch"></i>  ${response.data.duration} </p>
              <p><i class="fas fa-calendar-day"></i>  format-date ${response.data.date} </p>
          </div>
          <div class="activity-button"
              <a href="/activity/ ${response.data._id} ">Check it out!</a>
          </div>
      </div>`;
      }
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
