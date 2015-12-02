
angular.module('myApp', []).controller('namesCtrl', function($scope) {
    var date_origin = new Date();

    function resize_cards(){
      var d = $("html").width()/8
      var c = $("html").height()/8;
      $("#card_style").empty();
      if($('html').width()>600)
        $("#card_style").append(".card_style{height:"+c+";width:"+d+";font-size:"+d/115+"em}")

    }

    resize_cards();
    window.onresize = resize_cards;

    var data_origin = [];
    data_origin[29] = {
      events:[{
      name:"School Thing 1",
      desc:"Eat the oooo",
      time_start:1346,
      time_end:1351
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
    data_origin[2] = {events_number:3,
      events:[{
      name:"School Thing 1",
      desc:"Eat the oooo",
      time_start:1346,
      time_end:1351
    },{
      name:"School Thing 2",
      desc:"Eat the ooo33o",
      time_start:1412,
      time_end:1432
    },
      {
      name:"School Thing 1",
      desc:"Eat the oooo",
      time_start:1346,
      time_end:1351
    },{
      name:"School Thing 3",
      desc:"Eat the ooo33o",
      time_start:1415,
      time_end:1429
    }]}
    data_origin[10] = {
      events:[{
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
    data_origin[12] = {events_number:3,
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
    data_origin[15] = {events_number:3,
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

    calendergenerate(data_origin,date_origin);
    var data;
    var date;
    var month;
    function calendergenerate(data,datehelper){

    var date = new Date(datehelper);
    date.setDate(1)
    month = date.getMonth();
    console.log(month)
    switch(month){
      case 0:
        $("#month_container_text").text("January")
        break;
      case 1:
        $("#month_container_text").text("February")
        break;
      case 2:
        $("#month_container_text").text("March")
        break;
      case 3:
        $("#month_container_text").text("April")
        break;
      case 4:
        $("#month_container_text").text("May")
        break;
      case 5:
      $("#month_container_text").text("June")
        break;
      case 6:
        $("#month_container_text").text("July")
        break;
      case 7:
        $("#month_container_text").text("August")
        break;
      case 8:
        $("#month_container_text").text("September")
        break;
      case 9:
        $("#month_container_text").text("October")
        break;
      case 10:
        $("#month_container_text").text("November")
        break;
      case 11:
        $("#month_container_text").text("December")
        break;
    }
    //THIS HANDLES CONFLICTS ATM
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
        if(month == 2 && leap_year){
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


      for(var b = 0;b<6;b++){
        $("#cards_holder").append("<div class='calender_row' id='row_"+b+"'></div>")
        for(var a = 0; a<7;a++){
          if(check_day == day_tracker){
            month_started = true;
          }
          if(data[dater]!=undefined){
            if(data[dater].conflicts > 0){

              card_append(data[dater].conflicts,data[dater].events.length,month_started,month_not_ended,day_tracker);
            }
            else
              card_append(0,data[dater].events_number,month_started,month_not_ended,day_tracker);
          }
          else
            card_append(0,0,month_started,month_not_ended,day_tracker);
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

    function card_append(conflicts,events,month_start,month_end,day){

      $("#row_"+b).append('<div id="card_number_'+card_number+'" class="card card_style" ></div>')
      if(events == 0)
        $("#card_number_"+card_number).addClass("NoEvents")
      if(month_start && month_end){
        if(conflicts>0 && events > 0){
          $("#card_number_"+card_number).addClass("Conflict")
          $("#card_number_"+card_number).append('<p data-conflicts="'+conflicts+'" class="notice red">!</p>')
        }
        else if(events > 0){
          $("#card_number_"+card_number).addClass("NoConflict")
          $("#card_number_"+card_number).append('<p class="notice green icon-ok"></p>')
          }
          $("#card_number_"+card_number).append('<p class="date_number">'+dater+'</p>')
          if(events > 0){
            $("#card_number_"+card_number).append('<p class="events">events<span class="events_number">'+events+'</span></p>')
          }
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
      var day_abrev;
      switch(day){
        case 0: day_letter = "S"
                day_abrev = "un"
        break;
        case 1: day_letter = "M"
                day_abrev = "on"
        break;
        case 2: day_letter = "T"
                day_abrev = "ue."
        break;
        case 3: day_letter = "W"
                day_abrev = "ed."
        break;
        case 4: day_letter = "T"
                day_abrev = "hu."
        break;
        case 5: day_letter = "F"
                day_abrev = "ri"
        break;
        case 6: day_letter = "S"
                day_abrev = "at"
        break;
      }
      $("#card_number_"+card_number).append('<p class="day">'+day_letter+'<span class="day_abrev">'+day_abrev+'</span></p>');
    }

  }
});
