
angular.module('myApp', []).controller('namesCtrl', function($scope) {
    $scope.NumberRepeater = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,101,2,3,4,5,6,7,8,9,101,2,3,4,5,6,7,8,9,10]
    $scope.day_tracker = 0;
    $scope.month_text;
    $scope.mobile = false;
    var working_data = [];
    DetermineMonth = function(month){
      switch(month){
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
    }
    IdentifyConflicts = function(data){
      for(var a = 0;a<data.length;a++){
        if(data[a]!=undefined){
          data[a].conflicts = 0;
          for(var b = 0;b<data[a].events.length;b++){
            var check_start = data[a].events[b].time_start;
            var check_end = data[a].events[b].time_end;
            for(var q = 1;q < data[a].events.length;q++){
              var compare_start = data[a].events[q].time_start;
              var compare_end = data[a].events[q].time_end;
              if((check_start < compare_start && compare_start < check_end)||(check_start < compare_end && compare_end < check_end)){
                data[a].events[b].conflict = q;
                data[a].events[q].conflict = b;
                data[a].conflicts++;
              }
            }
          }
        }
      }
    }
    LoadWorkingData = function(month){

      working_data[15] = {
        events:[{
        name:"School Thing 1",
        desc:"Eat the oooo",
        time_start:1412,
        time_end:1432
      },{
        name:"School Thing 2",
        desc:"Eat the ooo33o",
        time_start:1435,
        time_end:1455
      },{
        name:"School Thing 3",
        desc:"Eat the ooo33o",
        time_start:1515,
        time_end:1652
      }]}
      working_data[12] = {
        events:[{
        name:"School Thing 1",
        desc:"Eat the oooo",
        time_start:1412,
        time_end:1432
      },{
        name:"School Thing 2",
        desc:"Eat the ooo33o",
        time_start:1412,
        time_end:1432
      },{
        name:"School Thing 3",
        desc:"Eat the ooo33o",
        time_start:1415,
        time_end:1429
      }]}
      //Handle if there are no events
      IdentifyConflicts(working_data);
      if(working_data.length== 0){
        $scope.NoEvents = true;
      }
  }

    FindStartingDay = function(date){
        var date;
      if(date == undefined)
        date = new Date();
      else
        date = new Date(date)
      date.setDate(1)
      month = date.getMonth();
      day_number = date.getDay();
      $scope.month_number = month;
      $scope.date = date;
      $scope.day_number = day_number;
    }
    FindPreviousMonthDays = function(){
      var ender;
      var date = $scope.date;
      var month = $scope.month_number;
      var leap_year = false;
      check_day = $scope.day_number;
      if(date.getFullYear()%4 == 0){
        leap_year = true;
      }
      //Feb. Case
      if(month == 1){
        if(leap_year){
          ender = 29;
        }
        else {
          ender = 28;
        }
        previous_month = 31;
      }
      else{
        if(month ==0){
          ender = 31;
          previous_month = 31;
        }
        else if(month==2||month==4||month==6||month==7||month==9||month==11){
          ender = 31;
          previous_month = 30;
        }
        else{
          ender = 30;
          previous_month = 31;
          if(month == 2 && leap_year){
            previous_month = 29
          }
          else if(month == 2){
            previous_month = 28
          }
        }
      }
      //Determines the date of the length of this month and last month

      $scope.calendar_start_date = previous_month;
      $scope.month_length = ender;
    }

    var previous_month_finished = false;
    var calendar_month_finished = false;
    var day_of_the_week_tracker = -1;

    $scope.getDayInfo = function(){
      var day_first_letter;
      var day_abreviation;
      var event_info;
      var conflicts = false;
      var events = false;

      var current_day_data;

      $scope.day_tracker++;
      day_of_the_week_tracker++;
      if(day_of_the_week_tracker > 6 )
        day_of_the_week_tracker = 0;
      //If the day overflows, reset
      //Obtain events info for that day.
      current_day_data = working_data[$scope.day_tracker];

      if(current_day_data != undefined){
        event_info = current_day_data
        if(current_day_data.conflicts > 0){
          conflicts = true;
        }
        events = true;
      }
      //Handle day_info
      switch(day_of_the_week_tracker){
        case 0: day_first_letter = "S"
          day_abreviation = "un"
          break;
        case 1: day_first_letter = "M"
          day_abreviation = "on"
          break;
        case 2: day_first_letter = "T"
          day_abreviation = "ue"
          break;
        case 3: day_first_letter = "W"
          day_abreviation = "ed"
          break;
        case 4: day_first_letter = "T"
          day_abreviation = "hu"
          break;
        case 5: day_first_letter = "F"
          day_abreviation = "ri"
          break;
        case 6: day_first_letter = "S"
          day_abreviation = "at"
          break;
      }

      if($scope.day_tracker > $scope.calendar_start_date && previous_month_finished != true){
        $scope.day_tracker = 1;
        previous_month_finished = true;
      }

      else if($scope.day_tracker > $scope.month_length && calendar_month_finished != true && previous_month_finished == true){
        $scope.day_tracker = 1;
        calendar_month_finished = true;
      }

      return {
        num:$scope.day_tracker,
        letter:day_first_letter,
        abrv:day_abreviation,
        events_info:event_info,
        events_bool:events,
        conflicts_bool:conflicts
      }
    }

    $scope.DetermineIfOverFlowCards = function(){
      if(calendar_month_finished == true){
        return "card_overflow_month"
      }
      else if(previous_month_finished == false){
        return "card_overflow_month"
      }
    }

    $scope.DetermineBorders = function(events,conflicts){
      var BorderType = ""
      if(events == true){
        BorderType = "NoConflict"
        if(conflicts == true){
          BorderType = "Conflict"
        }
      }
      return BorderType;
    }

    ResizeCards = function (){
      var d = $("html").width()/8
      var c = $("html").height()/8;
      $("#card_style").empty();
      if($('html').width()>600){
        $scope.mobile = false;
        $("#card_style").append(".card_style{height:"+c+";width:"+d+";font-size:"+d/115+"em}")
      }
      else{
        $scope.mobile = true;
      }
      $scope.$evalAsync();

    }

    LoadWorkingData();
    //Load the data, and also determine conflicts and inject into data.;
    //Handle resizing
    ResizeCards();
    window.onresize=ResizeCards;

    FindStartingDay();
    //Basically Starts calendar generation
    FindPreviousMonthDays()

    $scope.day_tracker = $scope.calendar_start_date-$scope.day_number;
    //subtract 1 to accoumnt for first ++.
    DetermineMonth($scope.month_number);

});
