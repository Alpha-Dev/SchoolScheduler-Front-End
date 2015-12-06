angular.module('myApp', []).controller('namesCtrl', function ($scope) {
  $scope.NumberRepeater = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 101, 2, 3, 4, 5, 6, 7, 8, 9, 101, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  $scope.mobile = false;
  var working_data = [];
  DetermineMonth = function (month) {
    switch (month) {
    case 0:
      $scope.month_text = "January"
      break;
    case 1:
      $scope.month_text = "February"
      break;
    case 2:
      $scope.month_text = "March"
      break;
    case 3:
      $scope.month_text = "April"
      break;
    case 4:
      $scope.month_text = "May"
      break;
    case 5:
      $scope.month_text = "June"
      break;
    case 6:
      $scope.month_text = "July"
      break;
    case 7:
      $scope.month_text = "August"
      break;
    case 8:
      $scope.month_text = "September"
      break;
    case 9:
      $scope.month_text = "October"
      break;
    case 10:
      $scope.month_text = "November"
      break;
    case 11:
      $scope.month_text = "December"
      break;
    }

    for (var a = 0; a < 42; a++) {
      $scope.getDayInfo();
    }
    $scope.$evalAsync();
  }
  IdentifyConflicts = function (data) {
    for (var a = 0; a < data.length; a++) {
      if (data[a] != undefined) {
        data[a].conflicts = 0;
        for (var b = 0; b < data[a].events.length; b++) {
          var check_start = data[a].events[b].time_start;
          var check_end = data[a].events[b].time_end;
          for (var q = 1; q < data[a].events.length; q++) {
            var compare_start = data[a].events[q].time_start;
            var compare_end = data[a].events[q].time_end;
            if ((check_start < compare_start && compare_start < check_end) || (check_start < compare_end && compare_end < check_end)) {
              data[a].events[b].conflict = q;
              data[a].events[q].conflict = b;
              data[a].conflicts++;
            }
          }
        }
      }
    }
  }
  LoadWorkingData = function (month) {
    var actual_data = [];

    actual_data[2015] = []
    actual_data[2015][11] = []
    actual_data[2015][11][15] = {
      events: [{
        name: "School Thing 1",
        desc: "Eat the oooo",
        time_start: 1412,
        time_end: 1432
      }, {
        name: "School Thing 2",
        desc: "Eat the ooo33o",
        time_start: 1435,
        time_end: 1455
      }, {
        name: "School Thing 3",
        desc: "Eat the ooo33o",
        time_start: 1515,
        time_end: 1652
      }]
    }
    actual_data[2015][11][23] = {
      events: [{
        name: "School Thing 1",
        desc: "Eat the oooo",
        time_start: 1412,
        time_end: 1432
      }, {
        name: "School Thing 2",
        desc: "Eat the ooo33o",
        time_start: 1435,
        time_end: 1545
      }, {
        name: "School Thing 3",
        desc: "Eat the ooo33o",
        time_start: 1515,
        time_end: 1652
      }]
    }
    for (var a = 2000; a < actual_data.length; a++) {
      if (actual_data[a] != undefined) {
        if(a == $scope.year){
        for (var b = 0; b < actual_data[a].length; b++) {
          if ($scope.month_number == b) {
            if (actual_data[a][b] != undefined)
              for (var c = 0; c < actual_data[a][b].length; c++) {
                if (actual_data[a][b][c] != undefined) {
                  working_data[c] = actual_data[a][b][c];
                }
              }
          }
        }
        }
      }
    }
    //Handle if there are no events

    IdentifyConflicts(working_data);
    console.log(working_data)
    if (working_data.length == 0) {
      $scope.NoEvents = true;
    }
    else{
      $scope.NoEvents = false;
    }
  }
  var card_tracker;
  $scope.FindStartingDay = function (date) {
    working_data = []
    calendar_month_finished = false;
    previous_month_finished = false;
    $scope.day_tracker = 0;
    $scope.month_text;
    $scope.day_data_array = [];
    card_tracker = 0;
    var date;
    date = new Date(date)
    date.setDate(1)
    month = date.getMonth();
    day_number = date.getDay();
    $scope.month_number = month;
    $scope.date = date;
    $scope.day_number = day_number;
    $scope.year = date.getFullYear();
    LoadWorkingData();
    FindPreviousMonthDays()
  }
  FindPreviousMonthDays = function () {
    var ender;
    var date = $scope.date;
    var month = $scope.month_number;
    var leap_year = false;
    check_day = $scope.day_number;
    if (date.getFullYear() % 4 == 0) {
      leap_year = true;
    }
    //Feb. Case
    if (month == 1) {
      if (leap_year) {
        ender = 29;
      } else {
        ender = 28;
      }
      previous_month = 31;
    } else {
      if (month == 0) {
        ender = 31;
        previous_month = 31;
      } else if (month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        ender = 31;
        previous_month = 30;
      } else {
        ender = 30;
        previous_month = 31;
        if (month == 2 && leap_year) {
          previous_month = 29
        } else if (month == 2) {
          previous_month = 28
        }
      }
    }
    //Determines the date of the length of this month and last month

    $scope.calendar_start_date = previous_month;
    $scope.month_length = ender;
    $scope.day_tracker = $scope.calendar_start_date - $scope.day_number;
    DetermineMonth($scope.month_number);
  }

  var previous_month_finished = false;
  var calendar_month_finished = false;
  var day_of_the_week_tracker = -1;
  var day_tracker_2 = 0;
  $scope.AddDay = function () {
    day_tracker_2++;
    return day_tracker_2;
  }
  $scope.getDayInfo = function () {
    var day_first_letter;
    var day_abreviation;
    var event_info;
    var conflicts = false;
    var events = false;
    var overflow = false;

    var current_day_data;

    $scope.day_tracker++;
    card_tracker++;
    day_of_the_week_tracker++;
    if (day_of_the_week_tracker > 6)
      day_of_the_week_tracker = 0;
    //If the day overflows, reset
    //Obtain events info for that day.
    current_day_data = working_data[$scope.day_tracker];
    if (current_day_data != undefined) {
      event_info = current_day_data
      if (current_day_data.conflicts > 0) {
        conflicts = true;
      }
      events = true;
    }
    //Handle day_info
    switch (day_of_the_week_tracker) {
    case 0:
      day_first_letter = "S"
      day_abreviation = "un"
      break;
    case 1:
      day_first_letter = "M"
      day_abreviation = "on"
      break;
    case 2:
      day_first_letter = "T"
      day_abreviation = "ue"
      break;
    case 3:
      day_first_letter = "W"
      day_abreviation = "ed"
      break;
    case 4:
      day_first_letter = "T"
      day_abreviation = "hu"
      break;
    case 5:
      day_first_letter = "F"
      day_abreviation = "ri"
      break;
    case 6:
      day_first_letter = "S"
      day_abreviation = "at"
      break;
    }
    if ($scope.day_tracker > $scope.calendar_start_date && previous_month_finished != true) {
      $scope.day_tracker = 1;
      previous_month_finished = true;
    } else if ($scope.day_tracker > $scope.month_length && calendar_month_finished != true && previous_month_finished == true) {
      $scope.day_tracker = 1;
      calendar_month_finished = true;
    }
    if (calendar_month_finished || previous_month_finished == false) {
      overflow = true;
    }
    $scope.day_data_array[card_tracker] = {
      overflow: overflow,
      num: $scope.day_tracker,
      letter: day_first_letter,
      abrv: day_abreviation,
      events_info: event_info,
      events_bool: events,
      conflicts_bool: conflicts
    };
    //console.log($scope.day_data_array)
    return card_tracker;
  }

  $scope.NewCalendar = function (date, forwards_or_backwards) {
    var month = date.getMonth();
    var year = date.getFullYear();
    var final_date;
    if (forwards_or_backwards == 0) {
      if (month == 0) {
        month = 12;
        year--;
      }
    } else if (forwards_or_backwards == 1) {
      month += 2;
      if (month > 12) {
        month = 1;
        year++;
      }
    }
    final_date = month + "/1/" + year;
    $scope.FindStartingDay(final_date)

  }


  $scope.ShowDayData = function (event_info) {
    console.log(event_info)
  }

  ResizeCards = function () {
    var d = $("html").width() / 8
    var c = $("html").height() / 8;
    $("#card_style").empty();
    if ($('html').width() > 724) {
      $scope.mobile = false;
      $("#card_style").append(".card_style{height:" + c + ";width:" + d + ";font-size:" + d / 115 + "em}")
    } else {
      $scope.mobile = true;
    }
    $scope.$evalAsync();

  }


  //Load the data, and also determine conflicts and inject into data.;
  //Handle resizing
  ResizeCards();
  window.onresize = ResizeCards;
  Today = new Date();
  $scope.FindStartingDay(Today);

  //Basically Starts calendar generation



  //subtract 1 to accoumnt for first ++.


});
