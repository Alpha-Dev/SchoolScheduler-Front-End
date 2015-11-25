angular.module('myApp', []).controller('namesCtrl', function($scope) {
    var date = new Date("5/1/2015");
    var d = $("html").width()/8
    var c = $("html").height()/8;
    var month = date.getMonth();
    date.setFullYear(date.getFullYear());
    date.setDate(1)
    date.setMonth(month)
    console.log(month)

    var check_day = date.getDay();
    var ender;
    var previous_month;
    var leap_year = false;
    if(date.getFullYear()%4 == 0){
      leap_year = true;
    }
    if(month == 1){
      if(leap_year){
        ender = 29;
      }
      else {
        ender = 28;
      }
      console.log(check_day)
      previous_month = 32 - check_day;
    }
    else{
      if(month == 0||month==2||month==4||month==6||month==7||month==9||month==11){
        ender = 31;
        previous_month = 31 - check_day;
      }
      else{
        ender = 30;
        previous_month = 32 - check_day;
        console.log(leap_year)
        if(month == 2 && leap_year){
          console.log("LEPA YEAR!")
          previous_month = 30 - check_day
        }
        else if(month == 2){
          previous_month = 29 - check_day
        }
      }
    }
    var day_tracker = 0;
    var month_started = false;
    var month_not_ended = true;
    var dater = 1;
    var date_2 = 1;
    var card_number = 0;
    if($("html").width()>600){
      for(var b = 0;b<6;b++){
        $("#cards_holder").append("<div class='calender_row' id='row_"+b+"'></div>")
        for(var a = 0; a<7;a++){
          if(check_day == day_tracker){
            month_started = true;
          }
          card_append(0,5,month_started,month_not_ended,day_tracker);
          day_tracker++;
          if(day_tracker==7){
            day_tracker = 0;
          }
          card_number++;
          if(dater < ender && month_started){
            dater++;
          }
          else if(dater == ender){
              month_not_ended = false;
          }
        }
      }
    }
    function card_append(conflicts,events,month_start,month_end,day){
      $("#row_"+b).append('<div id="card_number_'+card_number+'" class="card" style="width:'+d+'px;height:'+c+'px;font-size:'+d/115+'em"></div>')

      if(month_start && month_end){
        if(conflicts>0)
          $("#card_number_"+card_number).append('<p data-conflicts="'+conflicts+'" class="notice red">!</p>')
        else
          $("#card_number_"+card_number).append('<p class="notice green icon-ok"></p>')
          $("#card_number_"+card_number).append('<p class="date_number">'+dater+'</p>')
        $("#card_number_"+card_number).append('<p class="events">events<span class="events_number">'+events+'</span></p>')
      }
      else{
        if(month_start == false){
          $("#card_number_"+card_number).append('<p class="date_number">'+previous_month+'</p>')
          previous_month++;
        }
        else{
          $("#card_number_"+card_number).append('<p class="date_number">'+date_2+'</p>')
          date_2++;
        }
        $("#card_number_"+card_number).addClass("card_overflow_month")
      }
      var day_letter;
      switch(day){
        case 0: day_letter = "S"
        break;
        case 1: day_letter = "M"
        break;
        case 2: day_letter = "T"
        break;
        case 3: day_letter = "W"
        break;
        case 4: day_letter = "T"
        break;
        case 5: day_letter = "F"
        break;
        case 6: day_letter = "S"
        break;
      }
      $("#card_number_"+card_number).append('<p class="day">'+day_letter+'</p>');
    }
});
