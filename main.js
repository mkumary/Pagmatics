


"use strict";

var Observer = function(){
   var observerList = [];
   var addData = function(data){
       observerList.push(data);
       updateList(data);
   }
    var render = function(){
        $('tbody').empty();
        var html = "";
        html += "<tr><th>id</th><th>name</th><th>price</th><th>updated</th><th>lastexecuted</th> <th>tags</th></tr>";
        observerList.forEach(function(element, index){
         html += "<tr><td>"+element.id+"</td><td>"+element.name+"</td><td>"+element.price+"</td><td>"+element.datetimes.updated+"</td><td>"+element.datetimes.lastexecuted+"</td><td class='tags'>"+element.tags+"</td></tr>"
        });
        $('tbody').append(html);
    }
    var updateList = function(element){
      $('tbody').append("<tr><td>"+element.id+"</td><td>"+element.name+"</td><td>"+element.price+"</td><td>"+element.datetimes.updated+"</td><td>"+element.datetimes.lastexecuted+"</td><td class='tags'>"+element.tags+"</td></tr>");
    }

    var sortByLastUpdate = function(){
        observerList.sort(function(a,b){
           return new Date(a.datetimes.updated) < new Date(b.datetimes.updated);
        })
        render();
    };
    var sortByLastExecuted = function(){
        observerList.sort(function(a,b){
                return new Date(a.datetimes.lastexecuted) < new Date(b.datetimes.lastexecuted);
        })
        render();
    };

   var getData = function(){
       return observerList;
   }
    return {
        setData  : addData,
        getData   : getData,
        sortByLastUpdate : sortByLastUpdate,
        sortByLastExecuted : sortByLastExecuted
    }
};


$(document).ready(function(){
var ObserverList = new Observer();
    var ajaxActive = false;
    setInterval(function(){
        if(ajaxActive){
            return;
        }
        $.ajax({
            url : 'bidconfig.json',
            beforeSend : function(){
                ajaxActive = true;
            },
            complete : function(){
                ajaxActive = false;
            },
            success : function(response){
                ObserverList.setData(response);
            },
            error : function(response){

            }
        })
    }, 1000)


    $('.lastUpdated').on('click', function(){
        ObserverList.sortByLastUpdate();
    });
    $('.lastExecuted').on('click', function(){
        ObserverList.sortByLastExecuted();
    });
    $('.tagFilter').on('keyup', function(event){
        var searchValue = $(event.target).val();
        $('.tags').each(function(index,element){
            debugger;
            $(element).closest('tr').css('display', $(element).text().indexOf(searchValue) === -1 ? "none" : "");
        })
    })

})