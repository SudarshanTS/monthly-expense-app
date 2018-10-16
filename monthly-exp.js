    var count=0;
    var headcount=0,showcount=0;
    var rowcount=0,editcount=0;
    var displayHead = new Array();
    var showhead =new Array();
    var database=[];
    var showdatabase=[];
    var storemonth;
    var showtablecount=0,checkmonthcount=0,calexpcount=0,creditcount,debitcount,prevalue,preamount;
    var month=[0,1,2,3,4,5,6,7,8,9,10,11];
    displayHead = ['Date',  'Description', 'Status','Amount',"Actions"];
    showhead=["Month","Credit","Debit","Saving"];
    function upload() {
      var daterrequired = document.getElementById("dateid").value;
      var purposerequired = document.getElementById("purpose").value;
      var exprequired = document.getElementById("exp").value;
      var amountrequired = parseInt(document.getElementById("amt").value);
      if(daterrequired && purposerequired && exprequired && amountrequired)
      {
         var  tempData=
              {
                   date:document.getElementById("dateid").value,
                   description:document.getElementById("purpose").value,
                   status: document.getElementById("exp").value,
                   amount:parseInt(document.getElementById("amt").value),
                    id:"database"+count,
              } 
      database.push(tempData);

    if(headcount==0)
      {
         var empTable = document.createElement('table');
             empTable.setAttribute('id', 'empTable');            

        var tr = empTable.insertRow(-1);

        for (var h = 0; h < displayHead.length; h++) {
            var th = document.createElement('th');          
            th.innerHTML = displayHead[h];
            th.setAttribute("style","padding: 32px;");
            tr.appendChild(th);
        }
        var div = document.getElementById('form');
       div.appendChild(empTable);    
       headcount++;
       }

        var empTab = document.getElementById('empTable');
        var rowCnt = empTab.rows.length;        
        var tr = empTab.insertRow(rowCnt);      
        tr = empTab.insertRow(rowCnt);
        
        for (var c = 0; c < displayHead.length; c++) {
            var td = document.createElement('td');          
            td = tr.insertCell(c);
    
            
            if (c==0){

                var date = document.createElement('input');
                date.setAttribute('type', 'date');
                date.setAttribute("value", database[count].date);
                date.setAttribute("id","dt"+count);
                date.setAttribute("class","formstyle");
                date.setAttribute("readonly", true); 
                td.appendChild(date);
            }
            else if (c==1){         
                var purpose = document.createElement('input');
                purpose.setAttribute('type', 'text');
                purpose.setAttribute('value', database[count].description);
                purpose.setAttribute("id","purpose"+count);
                purpose.setAttribute("class","formstyle");
                purpose.setAttribute("style","border:none;margin: 0px 84px;");
                purpose.setAttribute("readonly", true);
                purpose.autocomplete="off";
                td.appendChild(purpose);
               
            }
            else if (c==2){
               
                var exp = document.createElement('input');
                exp.setAttribute('type', 'text');
                exp.setAttribute("id","exp"+count);
                exp.setAttribute('value', database[count].status);
                exp.setAttribute("class","formstyle");

                
                
                if(database[count].status=="")
                {
                  exp.setAttribute("style","background-color:white;");
                }
                database[count].status === "Debit"?exp.setAttribute("class","debitstyle"):exp.setAttribute("class","creditstyle");
                
                exp.setAttribute("readonly", true);
                td.appendChild(exp); 
 
            }
              else if (c==3){
                var amount = document.createElement('input');
                amount.setAttribute('type', 'number');
                amount.setAttribute("id","amount"+count);
                amount.setAttribute('value',database[count].amount);

                amount.setAttribute("class","formstyle");

                amount.setAttribute("readonly", true);
                td.appendChild(amount);
                      }
            else if(c==4)
            {
               var editlink = document.createElement('a');
                   editlink.href ="#";
                   editlink.innerHTML="Edit"; 
                   editlink.setAttribute("id","editcount"+count);  
                   editlink.setAttribute("style","color:blue; cursor: pointer;");
                   editlink.setAttribute("onclick","editableState("+count+")");
                   td.appendChild(editlink);

            }
        }  
                  reset();         
                  createmonth(count);  
                   
                  
        
      }
      else{
          alert("Fill  the all fileds");
      }

                if(checkmonthcount!=0)
                check_month(count);
                checkmonthcount++;

              count++;              
}              
     function editableState(cn)
     {
         var updatenow=document.getElementById("upload");
         var formdisable=document.getElementById("form");
         var editenable=document.getElementById("editcount"+cn);
         predate=database[cn].date;
         prevalue=database[cn].status;
         preamount=database[cn].amount;
         updatenow.setAttribute("value","Update now");
         document.getElementById("link").innerHTML="Cancel Update";
         document.getElementById("link").style="font-size:16px"; 
         document.getElementById("dateid").value=document.getElementById("dt"+cn).value; 
         document.getElementById("purpose").value =database[cn].description;
         document.getElementById("exp").value = database[cn].status;
         document.getElementById("amt").value = database[cn].amount;
         updatenow.setAttribute("onclick","updatechange("+cn+")");
     }
         function updatechange(cn){
            var updatechange=document.getElementById("upload");
            updatechange.setAttribute("value","Add to List");
            document.getElementById("link").innerHTML="Clear";
            document.getElementById("link").style="font-size:16px;margin-right: 85px;";
            var dateidvalue=document.getElementById("dateid").value;
            var purposevalue=document.getElementById("purpose").value;
            var expvalue=document.getElementById("exp").value;
            var amtvalue=parseInt(document.getElementById("amt").value);
            database[cn].date=dateidvalue;
            database[cn].description=purposevalue;
            database[cn].status=expvalue;
            database[cn].status=== "Debit"?document.getElementById("exp"+cn).setAttribute("class","debitstyle"):document.getElementById("exp"+cn).setAttribute("class","creditstyle");
            database[cn].amount=amtvalue;
             createmonth(cn);
               reset();
              document.getElementById("dt"+cn).value=dateidvalue;
              document.getElementById("purpose"+cn).value=database[cn].description;
              document.getElementById("exp"+cn).value=database[cn].status;
              document.getElementById("amount"+cn).value=database[cn].amount;
              updatechange.setAttribute("onclick","upload()");
              if(cn>=0)
              editcheck_month(cn);
            
        }
function createmonth(cn)
{
              var dt=new Date(database[cn].date);  
              storemonth=dt.getMonth();
              database[cn].date=storemonth;
}
   function showdata() {
     
      if(count!=0)
    {   
     if(showcount==0)
     {
      var showtable = document.createElement('table');
        showtable.setAttribute('id', 'showTable');            
         var tr = showtable.insertRow(-1);
         for (var h = 0; h < showhead.length; h++) {
            var th = document.createElement('th');          
            th.innerHTML = showhead[h];
            tr.appendChild(th);
        }
          var div = document.getElementById('show');
          div.appendChild(showtable);    
          showcount++;
        }
            var showTab = document.getElementById('showTable');
            var row = showTab.rows.length;        
            var showtr = showTab.insertRow(row);      
            showtr = showTab.insertRow(row);
             for (var c = 0; c < showhead.length; c++) {
            var showtd = document.createElement('td');          
            showtd = showtr.insertCell(c);
            if (c == 0) { 
                var showmonth = document.createElement('input');
                showmonth.setAttribute("type","text");
                showmonth.setAttribute("id","showdataid"+showtablecount);
                showmonth.setAttribute("value",month[storemonth]);
                showmonth.setAttribute("class","formstyle");
                showmonth.setAttribute("readonly", true);

                showtd.appendChild(showmonth);
                  
                }
             if(c == 1)
             {
              var credit=document.createElement("input");
              credit.setAttribute("type","text");
              credit.setAttribute("id","creditvalue"+showtablecount);
              credit.setAttribute("class","formstyle");
              credit.setAttribute("readonly", true);
             
              showtd.appendChild(credit);
             }
             if(c == 2)
             {
              var debit=document.createElement("input");
              debit.setAttribute("type","text");
              debit.setAttribute("id","debitvalue"+showtablecount);
              debit.setAttribute("class","formstyle");
              debit.setAttribute("readonly", true);
              showtd.appendChild(debit);
             }
             if (c==3) {
              var saving=document.createElement("input");
              saving.setAttribute("type","text");
              saving.setAttribute("id","saving"+showtablecount);
              saving.setAttribute("class","formstyle");
              saving.setAttribute("readonly", true);
              showtd.appendChild(saving);
             }   

     }
             var monthdata={
                           showmonth:document.getElementById("showdataid"+showtablecount).value,
                           creditvalue:parseInt(document.getElementById("creditvalue"+showtablecount).value),
                           debitvalue:parseInt(document.getElementById("debitvalue"+showtablecount).value),
                           saving:parseInt(document.getElementById("saving"+showtablecount).value),
                             }

                          showdatabase.push(monthdata);
     

                           calexp(count);                           
                
    }
    else{
             alert("cannot display table");
        }

                    
                          showtablecount++;
}
function calexp(cn)
{
     var showdb_length=showdatabase.length;
     var databaselen=database.length;
    if(database[databaselen-1].status=="Credit")
  {
    
       showdatabase[showdb_length-1].creditvalue=database[databaselen-1].amount;
       document.getElementById("creditvalue"+showtablecount).value=showdatabase[showdb_length-1].creditvalue;
  } 
  else
  {
      showdatabase[showdb_length-1].debitvalue=database[databaselen-1].amount;
      document.getElementById("debitvalue"+showtablecount).value=showdatabase[showdb_length-1].debitvalue;
  }
     if(isNaN(showdatabase[showdb_length-1].creditvalue))
         showdatabase[showdb_length-1].creditvalue=0;
         document.getElementById("creditvalue"+showtablecount).value=showdatabase[showdb_length-1].creditvalue;      
     if(isNaN(showdatabase[showdb_length-1].debitvalue))
        showdatabase[showdb_length-1].debitvalue=0;
        document.getElementById("debitvalue"+showtablecount).value=showdatabase[showdb_length-1].debitvalue;
        showdatabase[showdb_length-1].saving=(showdatabase[showdb_length-1].creditvalue)-(showdatabase[showdb_length-1].debitvalue);
        document.getElementById("saving"+showtablecount).value=showdatabase[showdb_length-1].saving;   
        
        
        calexpcount++;
  }  

function check_month(cn)
{ 
              var showdb_length=showdatabase.length;
              var storemonthdate=month[database[cn].date];
              var savecount=0;
              var store=[]
              var databaselen=database.length;
              debugger;              
              for (countcheck=0;countcheck<databaselen-1; countcheck++) 
              {          

                          store[countcheck]=database[countcheck].date;//Store the database value
                 
              }
          for(var check=0;check<databaselen-1;check++)
            {
                 
                 var equals=database[cn].date==store[check];// Check the months equal
                 
                 if(equals==true)
                  {                    
                        if(database[cn].status==="Credit")// Current database object status is equal to Credit
                        {
                         
                           var addingcredit=_.sumBy(database, (d)=> {if(d.date === storemonthdate && d.status ==="Credit") return d.amount});
                            showdatabase[showdb_length-1].creditvalue=addingcredit;
                           for (var creditcount = 0;creditcount <=showdb_length-1;creditcount++) //Loop for showtable
                             {
                            
                                var showequal=database[cn].date==showdatabase[creditcount].showmonth;//Current database object  is equal to showdatabase month                          
                                if(showequal==true)
                                {
                              
                                    showdatabase[creditcount].creditvalue=addingcredit;
                                    document.getElementById(`creditvalue${creditcount}`).value=(showdatabase[creditcount].creditvalue);
                                    showdatabase[creditcount].saving=(showdatabase[creditcount].creditvalue)-((showdatabase[creditcount].debitvalue));         
                                    document.getElementById("saving"+creditcount).value=showdatabase[creditcount].saving;  
                                }
                             }
                        }
                        else if(database[cn].status ==="Debit")
                        {
                        
                              var addingdebit=_.sumBy(database, (d)=> {if(d.date === storemonthdate && d.status ==="Debit") return d.amount}); 
                              for (debitcount = 0; debitcount <=showdb_length-1;debitcount++) 
                              {
                             
                                 var showequal=database[cn].date==showdatabase[debitcount].showmonth;                          
                                 if(showequal==true)
                                { 
                                  showdatabase[debitcount].debitvalue=addingdebit;
                                  document.getElementById(`debitvalue${debitcount}`).value=(showdatabase[debitcount].debitvalue);
                                  showdatabase[debitcount].saving=(showdatabase[debitcount].creditvalue)-((showdatabase[debitcount].debitvalue));         
                                  document.getElementById("saving"+debitcount).value=showdatabase[debitcount].saving; 
                                } 
                              }
                        }
                              savecount=0;
                              break;
                  }
                 else
                  {
                      savecount=1;
                  }  
            }
            if(savecount==1)
            {
              
              showdata();//Calling the showdata function to create another row
              savecount=0;
              
            }
}
function editcheck_month(cn)
{ 
              var showdb_length=showdatabase.length;
              var storemonthdate=month[database[cn].date];
              var savecount=0;
              var store=[]
              var databaselen=database.length;
              debugger;              
              for (countcheck=0;countcheck<=databaselen-1; countcheck++) 
              {          

                store[countcheck]=database[countcheck].date;//Store the database value
                 
              }
             if(predate!==database[cn].date)
            {
                  for(var editcheck=0;editcheck<=databaselen-1;editcheck++)
              {
                var equals=database[cn].date==store[editcheck];// Check the months equal
                if(equals==true)
              {                    
                if(database[cn].status==="Credit")// Current database object status is equal to Credit
                 {
                      var editaddingcredit=_.sumBy(database, (d)=> {if(d.date === storemonthdate && d.status ==="Credit") return d.amount});
                      showdatabase[showdb_length-1].creditvalue=editaddingcredit;
                        
                     for (var editcreditcount = 0;editcreditcount <=showdb_length-1;editcreditcount++) //Loop for showtable
                    {               
                                    var showequal=database[cn].date==showdatabase[editcreditcount].showmonth;//Current database object  is equal to showdatabase month                          
                                    if(showequal==true)
                                  {
                                    showdatabase[editcreditcount].creditvalue=editaddingcredit;
                                    if(isNaN(showdatabase[editcreditcount].creditvalue))
                                    document.getElementById(`creditvalue${editcreditcount}`).value=0;
                                    document.getElementById(`creditvalue${editcreditcount}`).value=(showdatabase[editcreditcount].creditvalue);
                                    showdatabase[editcreditcount].saving=(showdatabase[editcreditcount].creditvalue)-((showdatabase[editcreditcount].debitvalue));         
                                    document.getElementById("saving"+editcreditcount).value=showdatabase[editcreditcount].saving;  
                                    savecount=0;
                                    break;
                                  }
                                  else{
                                    savecount=1;
                                  }

                           

                     }
                  }
                        else if(database[cn].status ==="Debit")
                        {
                        
                              var editaddingdebit=_.sumBy(database, (d)=> {if(d.date === storemonthdate && d.status ==="Debit") return d.amount}); 
                              for (editdebitcount = 0; editdebitcount <=showdb_length-1;editdebitcount++) 
                              {
                           
                           
                                 var showequal=database[cn].date==showdatabase[editdebitcount].showmonth;                          
                                 if(showequal==true)
                                { 
                                  showdatabase[editdebitcount].debitvalue=editadding;
                                  if(isNaN(showdatabase[editdebitcount].debitvalue))
                                    document.getElementById(`debitvalue${editdebitcount}`).value=0;
                                  document.getElementById(`debitvalue${editdebitcount}`).value=(showdatabase[editdebitcount].debitvalue);

                                  showdatabase[editdebitcount].saving=(showdatabase[editdebitcount].creditvalue)-((showdatabase[editdebitcount].debitvalue));         
                                  document.getElementById("saving"+editdebitcount).value=showdatabase[editdebitcount].saving; 
                                }
                                else
                                {

                                     savecount=1;
                                }
                                
                            
                            } 
                        }  
                        
                 
                              break;
                  }
                 else
                  {
                      savecount=1;
                  }  

            }
            if(savecount==1)
            {
              
              showdata();//Calling the showdata function to create another row
              savecount=0;
              
            }
          }
            else
            {
           
              for(var check=0;check<=databaselen-1;check++)
              {
                var equals=database[cn].date==store[check];// Check the months equal
                if(equals==true)
              {                    
                if(database[cn].status==="Credit")// Current database object status is equal to Credit
                 {
                      var addingcredit=_.sumBy(database, (d)=> {if(d.date === storemonthdate && d.status ==="Credit") return d.amount});
                      showdatabase[showdb_length-1].creditvalue=addingcredit;
                        
                     for (var creditcount = 0;creditcount <=showdb_length-1;creditcount++) //Loop for showtable
                             {
                           
                           
                           
                                   var showequal=database[cn].date==showdatabase[creditcount].showmonth;//Current database object  is equal to showdatabase month                          
                                    if(showequal==true)
                                  {
                                    showdatabase[creditcount].creditvalue=addingcredit;
                                    if(isNaN(showdatabase[creditcount].creditvalue))
                                    document.getElementById(`creditvalue${creditcount}`).value=0;
                                    document.getElementById(`creditvalue${creditcount}`).value=(showdatabase[creditcount].creditvalue);
                                    showdatabase[creditcount].saving=(showdatabase[creditcount].creditvalue)-((showdatabase[creditcount].debitvalue));         
                                    document.getElementById("saving"+creditcount).value=showdatabase[creditcount].saving;  
                                  }
                           

                     }
                        }
                        else if(database[cn].status ==="Debit")
                        {
                        
                              var addingdebit=_.sumBy(database, (d)=> {if(d.date === storemonthdate && d.status ==="Debit") return d.amount}); 
                              for (debitcount = 0; debitcount <=showdb_length-1;debitcount++) 
                              {
                           
                           
                                 var showequal=database[cn].date==showdatabase[debitcount].showmonth;                          
                                 if(showequal==true)
                                { 
                                  showdatabase[debitcount].debitvalue=addingdebit;
                                  if(isNaN(showdatabase[debitcount].debitvalue))
                                    document.getElementById(`debitvalue${debitcount}`).value=0;
                                  document.getElementById(`debitvalue${debitcount}`).value=(showdatabase[debitcount].debitvalue);

                                  showdatabase[debitcount].saving=(showdatabase[debitcount].creditvalue)-((showdatabase[debitcount].debitvalue));         
                                  document.getElementById("saving"+debitcount).value=showdatabase[debitcount].saving; 
                                }
                                
                            
                            } 
                        }  
                        
                              savecount=0;
                              break;
                  }
                 else
                  {
                      savecount=1;
                  }  
            }
          
            if(savecount==1)
            {
              
              showdata();//Calling the showdata function to create another row
              savecount=0;
              
            }
         }   
}
     function reset()
     {

          document.getElementById("dateid").value="";
          document.getElementById("purpose").value="";
          document.getElementById("exp").value="";
          document.getElementById("amt").value="";
     }




