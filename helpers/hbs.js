const hbs = require("hbs");
const moment = require("moment");
const repeat = require("handlebars-helper-repeat");

// CUSTOM HELPERS

hbs.registerHelper("toJSON", (val) => JSON.stringify(val));

// function below: add the ternary operator functionnality to .hbs files
// usage : {{ternary true "yay" "nay "}} => prints yay
// usage : {{ternary NaN "yay" "nay "}} => prints nay
hbs.registerHelper("ternary", (test, yes, no) => (test ? yes : no));

// add comparison operator feature to hbs templates
/* 

USAGE =>

{{#compare 1 10 operator="<"}}
awesome, 1 is less thant 10 !!!
{{/compare}}

*/

hbs.registerHelper("compare", function (lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
    "==": function (l, r) {
      return l == r;
    },
    "===": function (l, r) {
      return l === r;
    },
    "!=": function (l, r) {
      return l != r;
    },
    "<": function (l, r) {
      return l < r;
    },
    ">": function (l, r) {
      return l > r;
    },
    "<=": function (l, r) {
      return l <= r;
    },
    ">=": function (l, r) {
      return l >= r;
    },
    typeof: function (l, r) {
      return typeof l == r;
    },
  };

  if (!operators[operator])
    throw new Error(
      "Handlerbars Helper 'compare' doesn't know the operator " + operator
    );

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("format-date", function (date) {
  return moment(date).format("DD-MM-YYYY");
});
hbs.registerHelper("format-date-birth", function (date) {
  return moment(date).format("YYYY-MM-DD");
});
hbs.registerHelper("format-time", function (time) {
  return moment(time).format("hh:mm");
});

hbs.registerHelper("format-date-input", function (time) {
  return moment(time).format("yyyy-MM-DDThh:mm");
});

/* helper to repeat some code and get a new index each time */
hbs.registerHelper("repeat", require("handlebars-helper-repeat"));

hbs.registerHelper("compareSports", function (sportId, sportId2) {
  if (sportId.toString() === sportId2.toString()) return "selected";
});

hbs.registerHelper("comma", function (array) {
  if (typeof array === "string") return array;
  if (!Array.isArray(array)) return "";
  return array.join(", ");
});
