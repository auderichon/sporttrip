// const countryFilter = document.getElementsByClassName("checkbox-country");
// const durationFilter = document.getElementById("activity-duration");
// const levelFilter = document.getElementsByClassName("checkbox-level");
// const levelFilter = document.getElementsByClassName("sport-choice");

// try {
//     var choice = Object.defineProperty({}, "passive", {
//       get: function() {
//         passiveSupported = true;
//       }
//     });
  
//     levelFilter.addEventListener("Click", choice, );
//     durationFilter.addEventListener("Click", choice, );
//   } catch(err) {
//     passiveSupported = false;
  console.log(axios)

const form = document.getElementById("filter-form");




form.onchange = function(event){
    const query= {
        "location.country": [],
        requiredLevel: [],
        duration: [],
        sport: [],
    }
   const inputs = form.querySelectorAll("input,select");
  inputs.forEach(input => {
      if(input.type === "checkbox"){
          if(input.name === "country"){
            if(input.checked){
                query["location.country"].push(input.value)
            }
          }else if(input.name === "requiredLevel"){
              if(input.checked){
                  query.requiredLevel.push(input.value)
              }
          }
      }else{
         query[input.name] =  getSelectValues(input)

         //query[input.name].push(input.value)
      }
  })


  axios.get("/toto/search",{
    params: query
} ).then(response => {
    console.log(response.data)
    // afficher chaque element sur la page
}).catch(error => console.log(error))


}

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }

