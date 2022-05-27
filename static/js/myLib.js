(function(){

    $.extend({
        // prase url
        praseUrl: function(url, urlPath){
            if( url.indexOf("?") != -1 && url.indexOf("&") != -1){
                let urlsplit = url.split("?");
                let infor_url = urlsplit[1]
                let praseresult = infor_url.split("&");
                if(praseresult.length != 2){
                    window.location = urlPath;
                }else{
                    if(praseresult[0].length == 0 || praseresult[1].length == 0){
                        window.location = urlPath;
                    }else{
                        return praseresult
                    }
                }
            }else{
                window.location = urlPath;
            }
            
        },

        // secret password ( encrypt )
        encryptPassword: function(passWord){
            let encrypt_str = '';
            let encryLib = ['0','1','2','3','4','5','6','7','8','9',
                        'a','b','c','d','e','f','g','!','h','i','j','k','l','@','m','n','o','p','q','r','s','^','t','u','v','w','x','y','z',
                        'A','B','C','D','E','F','G','H','I','#','J','K','L','$','M','N','O','P','%','Q','R','S','T','U','V','W','X','Y','Z','*'];  //69
            let passwordList = passWord.split("");
            let endLib = ['k','#','O','7','^','G','3','b','H','endcoverLib']
            let endCoverNumber = Math.floor(1 + Math.random() * 9); //[0:9]  end encrypt lib
            let endCover = '';
            for(let i=0; i<endCoverNumber; i++){               // [0,1,2,3,4,5,6,7,8]
                let endPick = Math.floor(0 + Math.random() * 9); 
                endCover = endCover + endLib[endPick]          //[0:9]  end encrypt lib
            };

            for(let j=0; j<passwordList.length; j++){
                let passWordItem = passwordList[j];
                let lib_Num = Math.round(Math.random() * 1);
                let libs = [                                 //header encrypt lib
                    ["number","1","2","3","4","5","6","7","8","9"],
                    ["letter","a","b","c","d","e","f","g","h","i"]
                ];

                let selected_lib = libs[lib_Num];
                let picknumber = Math.floor(1 + Math.random() * 9);  // generate the length of each encrypt part randomly[1:9]([a:i] -> [1:9]) based on the libs list
                let headerspassword = selected_lib[picknumber];

                encrypt_str = encrypt_str + headerspassword;
                for(let i=0; i<picknumber; i++){
                    let pickIndex = Math.round(1 + Math.random() * 68);
                    encrypt_str = encrypt_str + encryLib[pickIndex]
                };
                encrypt_str = encrypt_str + passWordItem
            };

            encrypt_str = encrypt_str + endCover + endCoverNumber;

            return encrypt_str

        },

        // decrypt
        decryptPassword: function(passWordPart){
            let praseList = passWordPart.split("");
            let endNumber = parseInt(praseList[praseList.length-1]);
            praseList.splice((praseList.length-endNumber-1),endNumber+1);
    
            let libs ={"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"a":1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8,"i":9};

            let flag = 0;
            let passpraseresult = ''
            while(flag<praseList.length){
                let initial = libs[praseList[flag]];  // find the flag number/letter according to the libs dictionary
                let tem = praseList[flag + initial + 1];
                passpraseresult = passpraseresult + tem;
                flag = flag + initial + 2;
            };

            return passpraseresult
        },

        // test password
        testpassword: function(userName, passWord, userNameDisplay, urlPath, asyncstate){
            let testinfoList = [];
            testinfoList.push(userName);
            testinfoList.push(passWord);
            let testinfoList_json = JSON.stringify(testinfoList)

            $.ajax({
                async:asyncstate,
                url:urlPath+'/testPassword',
                type:'POST',
                data:{testinfo: testinfoList_json},
                dataType:'json',
                success: function(data){
                    if(data['testResult'] == 'succseeLogIn'){
                        userNameDisplay.html(userName);
                    }else{
                        window.location = urlPath;
                    }
                },
                error:function(){
                    console.log('there is some error')
                },
                headers:{a:100, b:200}
            })
        },

        // change password validate
        validatepassword: function(userName, passWord, modifycover, urlPath){
            let validateList = [];
            validateList.push(userName);
            validateList.push(passWord);
            let validateList_json = JSON.stringify(validateList)
            $.ajax({
                async:true,
                url:urlPath+'/modifyUser',
                type:'POST',
                data:{validateinfo: validateList_json},
                dataType:'json',
                success: function(data){
                    if(data['testResult_v'] == 'succseeLogIn'){
                        let originalPart_left = $('#originalPart').offset().left;
                        let originalPart_top = $('#originalPart').offset().top;
                        modifycover.animate({"left":originalPart_left,"top":originalPart_top},500,function(){
                            $('#originalName').attr('disabled','disabled');
                            $('#originalPassWord').attr('disabled','disabled');
                            $('#originalSubmit').attr('disabled','disabled');
                            $('#originalReset').attr('disabled','disabled');
                            $('#newName').removeAttr('disabled');
                            $('#newPassWord').removeAttr('disabled');
                            $('#newPassWord_confirm').removeAttr('disabled');
                            $('#newSubmit').removeAttr('disabled');
                            $('#newReset').removeAttr('disabled');
                            $('#newvnote').html('Please insert your new password!');
                            $('#orginalnote').html('');
                            $('#newName').val(userName)
                        })

                    }else{
                        alert('Please insert right password!')
                    }
                },
                error:function(){
                    alert('There is not a user named' + userName + ', Please check user name!')
                },
                headers:{a:100, b:200}
            })
        },

        // chaneg password function
        changepassword_func: function(userName, passWord, newvnote, urlPath){
            let changeList = [];
            changeList.push(userName);
            changeList.push(passWord);
            let changeList_json = JSON.stringify(changeList)
            $.ajax({
                async:true,
                url:urlPath+'/changePassword',
                type:'POST',
                data:{changeinfo: changeList_json},
                dataType:'json',
                success: function(data){
                    if(data['testResult_c'] == 'success'){
                        $('#newPart_title').html('Successfully');
                        let waitInterval = 10
                        let waitTimer = setInterval(function(){
                            newvnote.html("Page will return to login page in " + waitInterval.toString() + "s")
                            waitInterval = waitInterval - 1
                            if(waitInterval < 0){
                                window.clearInterval(waitTimer);
                                window.location = urlPath
                            }
                        },1000)
                    }else{
                        alert("There is some error, please try later!")
                    }
                },
                error:function(){
                    console.log('there is some error')
                },
                headers:{a:100, b:200}
            })
        },

        // for test the circle and dynamic update data
        DynamicCircle: function(angle,displaynum,middlelayer,lefttop,rightbottom,leftbottom,righttop,centercircle){
                if(angle >= 0 && angle < 90){
                    middlelayer.css({'opacity':0})
                    lefttop.css({'transform':'rotate(0deg)','background-color':'rgba(235, 235, 235)','opacity':1});
                    rightbottom.css({'transform':'rotate(0deg)','background-color':'rgba(235, 235, 235)','opacity':1});
                    leftbottom.css({'transform':'rotate(0deg)','background-color':'rgba(235, 235, 235)','opacity':1});
                    righttop.css({'transform':'rotate(' + angle + 'deg)','background-color':'rgba(235, 235, 235)','opacity':1});
                    centercircle.html(displaynum);
                }else if(angle >= 90 && angle < 180){
                    righttop.css({'transform':'rotate(0deg)','opacity':0});
                    rightbottom.css({'transform':'rotate(' + (angle-90) + 'deg)'});
                    centercircle.html(displaynum);
                }else if(angle >= 180 && angle < 270){
                    rightbottom.css({'transform':'rotate(0deg)','opacity':0});
                    leftbottom.css({'transform':'rotate(' + (angle-180) + 'deg)'});
                    centercircle.html(displaynum);
                }else if(angle >= 270 && angle <= 360){
                    leftbottom.css({'transform':'rotate(0deg)','opacity':0});
                    middlelayer.css({'opacity':1})  
                    lefttop.css({'transform':'rotate(' + (angle-270) + 'deg)'});
                    centercircle.html(displaynum);
                }else{
                    angle = 0
                }
        },

        // pie chart function
        PassingChart: function(angle,middlelayer,lefttop,rightbottom,leftbottom,righttop,centercircle,displaynum){
            if(angle >= 0 && angle < 90){
                middlelayer.css({'opacity':0})
                lefttop.css({'transform':'rotate(0deg)','background-color':'rgba(235, 235, 235)','opacity':1});
                rightbottom.css({'transform':'rotate(0deg)','background-color':'rgba(235, 235, 235)','opacity':1});
                leftbottom.css({'transform':'rotate(0deg)','background-color':'rgba(235, 235, 235)','opacity':1});
                righttop.css({'transform':'rotate(' + angle + 'deg)','background-color':'rgba(235, 235, 235)','opacity':1});
                centercircle.html(displaynum);
            }else if(angle >= 90 && angle < 180){
                righttop.css({'transform':'rotate(0deg)','opacity':0});
                rightbottom.css({'transform':'rotate(' + (angle-90) + 'deg)'});
                centercircle.html(displaynum);
            }else if(angle >= 180 && angle < 270){
                righttop.css({'transform':'rotate(0deg)','opacity':0});
                rightbottom.css({'transform':'rotate(0deg)','opacity':0});
                leftbottom.css({'transform':'rotate(' + (angle-180) + 'deg)'});
                centercircle.html(displaynum);
            }else if(angle >= 270 && angle <= 360){
                righttop.css({'transform':'rotate(0deg)','opacity':0});
                rightbottom.css({'transform':'rotate(0deg)','opacity':0});
                leftbottom.css({'transform':'rotate(0deg)','opacity':0});
                middlelayer.css({'opacity':1})  
                lefttop.css({'transform':'rotate(' + (angle-270) + 'deg)'});
                centercircle.html(displaynum);
            }else{
                angle = 0
                centercircle.html('Error');
            }

            
        },

        // dynamic pie chart function
        dynamicPassingRate: function(urlPath,angle,middlelayer,lefttop,rightbottom,leftbottom,righttop,centercircle,displaynum,asyncstate){
            $.ajax({
                async:asyncstate,
                url:urlPath+'/passingRate',
                type:'POST',
                data:{c:300, d:400},
                dataType:'json',
                success: function(data){
                    let passnumber = data['passnumber'];
                    let totalnumber = data['totalnumber'];
                    displaynum = (passnumber/totalnumber*100).toFixed(2) + '%';
                    angle = (360/totalnumber)*passnumber;
                    $.PassingChart(angle,middlelayer,lefttop,rightbottom,leftbottom,righttop,centercircle,displaynum);
                },
                error:function(){
                    console.log('there is some error')
                },
                headers:{a:100, b:200}
            })
        },

        // export function
        exportfunction: function(urlPath,delivery_p,delivery_e,delivery_d, currentPage, totalPages, exportButton, lastpage, nextpage, firstpage, finalpage, downloadpath, asyncstate){
            $.ajax({
                async:asyncstate,
                url:urlPath+'/export',
                data:{exportcolumn_p:delivery_p, exportcolumn_e:delivery_e, daterange:delivery_d},
                type:'POST',    
                dataType:'json',
                success: function(data){
                    $('#exportHead').empty();
                    $('#exportbody').empty();
                    totalPages.html(data['pages_number']);
                    $('#coverdiv').remove();
                    $('#loadingcircle').remove();

                    if(data['pages_number'] != '0'){
                        currentPage.html('1')
                        let tem_column = data['tem_column'].replaceAll("'","\"");
                        let tem_content = data['tem_content'].replaceAll("'","\"");
                        let columnArr= JSON.parse(tem_column);
                        let contentArr = JSON.parse(tem_content);
                        let columnTable ='';
                        for(var i=0; i<columnArr.length; i++){    
                            columnTable += '<th>' + columnArr[i] + '</th>'
                        };
                        let contentTable = '';
                        for(var j=0; j<contentArr.length; j++){ 
                            let tem_detail = '<tr>'   
                            for(var t=0; t<contentArr[j].length; t++){
                                tem_detail += '<td>' + contentArr[j][t] + '</td>'
                            }
                            tem_detail += '</tr>'
                            contentTable += tem_detail
                        };
                        $('<tr></tr>').append(
                            columnTable
                        ).appendTo('#exportHead');
                        $(contentTable).appendTo('#exportbody');
                    }else if(data['pages_number'] == '0'){
                        currentPage.html('0');
                        totalPages.html('0');
                        exportButton.attr("disabled","disabled");
                        lastpage.attr("disabled","disabled");
                        nextpage.attr("disabled","disabled");
                        firstpage.attr("disabled","disabled");
                        finalpage.attr("disabled","disabled");
                        downloadpath.attr("disabled","disabled");
                        alert("There is no data for preview!")
                    }

                    
                    
                },
                error:function(){
                    console.log('there is some error')
                },
                headers:{c:300, d:400},
           })
        },

        // automatic  
        uploadAction: function(urlPath,deliverydata,uploadedNumber,needUploadNumber,asyncstate){     
            $.ajax({
                async:asyncstate,
                url:urlPath+'/mainpage',
                type:'POST',
                data:deliverydata,
                Cache:false,   ////////???????????
                dataType:'json',
                contentType: 'application/json; charset=UTF-8',
                success: function(data){
                    // if(data['pathResult']){
                    //     alert(data['pathResult'])
                    // };

                    if(data['shouldUpload']){
                        needUploadNumber.html(data['shouldUpload'])
                    };
                    if(data['uploadresult'] == 'success'){
                        preUploaded = parseInt(uploadedNumber.html());
                        uploadedNumber.html(preUploaded + 1);
                    }else if((data['uploadresult'] == 'unSuccess' || data['uploadresult'] == 'empty') && data['fileName'] != 'null'){
                        preUploaded = parseInt(uploadedNumber.html());
                        uploadedNumber.html(preUploaded + 1);




                        //////////////
                        $('<tr><td>' + data['uploadfile'] + '</td><td>' + data['errorline'] + '</td></tr>' ).appendTo('#error_body');
                    }else if(data['fileName'] == 'null'){
                        alert("There is some error with your uploading path!")
                    }
           
                },
                error:function(){
                    alert("There is some error! Please check your file or uploading path!")
                },
                headers:{a:100, b:200}
            })
        },

        // manual
        uploadAction_man: function(urlPath,fileData,uploadedNumber,asyncstate){
            $.ajax({
                async:asyncstate,
                url:urlPath+'/uploadManual',
                type:'POST',
                data:fileData,
                dataType:'json',
                Cache:false,
                contentType:false,
                processData:false,
                success: function(data){
                    if(data['uploadresult'] == 'success' ){
                        preUploaded = parseInt(uploadedNumber.html());
                        uploadedNumber.html(preUploaded + 1);
                    }else if((data['uploadresult'] == 'unSuccess' || data['uploadresult'] == 'empty') && data['fileName'] != 'null'){
                        preUploaded = parseInt(uploadedNumber.html());
                        uploadedNumber.html(preUploaded + 1);
                        $('<tr><td>' + data['uploadfile'] + '</td><td>' + data['errorline'] + '</td></tr>' ).appendTo('#error_body');  ////////////
                    }else if(data['fileName'] == 'null'){
                        alert("There is some error with your uploading path!")
                    }   
                },
                error: function(){
                    alert("Please check if you have selected right file!")
                },
                headers:{a:100, b:200}
            })
        },

        // changepages
        changePagesFunc: function(urlPath, toNumber, currentPage, asyncstate){
            if(currentPage.html() != "0"){
                $.ajax({
                    async:asyncstate,
                    url:urlPath+'/changePages',
                    data:{toPage:toNumber},
                    type:'POST',    
                    dataType:'json',
                    success: function(data){
                        currentPage.html(toNumber)
    
                        $('#exportbody').empty();
                        let tem_content = data['tem_content'].replaceAll("'","\"");
                        let contentArr = JSON.parse(tem_content);
    
                        let contentTable = '';
                        for(var j=0; j<contentArr.length; j++){ 
                            let tem_detail = '<tr>'   
                            for(var t=0; t<contentArr[j].length; t++){
                                tem_detail += '<td>' + contentArr[j][t] + '</td>'
                            }
                            tem_detail += '</tr>'
                            contentTable += tem_detail
                        };
                        $(contentTable).appendTo('#exportbody');
    
                    },
                    error:function(){
                        console.log('there is some error')
                    },
                    headers:{c:300, d:400},
               })
            }else{
                alert("There is no page!")
            }
            
        },

        // download csv
        downloadCSVfunc: function(urlPath, downloadpath, asyncstate){
            downloadpathVal = downloadpath.val()
            $.ajax({
                async:asyncstate,
                url:urlPath+'/downloadCSV',
                data:{downloadsingle:"downloadCSV", downloadpathVal: downloadpathVal},
                type:'POST',    
                dataType:'json',
                success: function(data){
                    if(data['downloadrownumber']){
                        alert("You have downloaded a file which saved in the " + downloadpathVal.toString())
                        // alert("You have download " + data['downloadrownumber'] + "datas!")
                    }
                },
                error:function(){
                    console.log('there is some error')
                },
                headers:{c:300, d:400},
           })
        },
        
        //write the upload recording
        writeRecording: function(recordingDate, recordingstarttime, recordingendtime, recordingWeekDay,recordingNumber,recordingNote){
            $('<tr><td>' + recordingDate + '</td><td>' + recordingstarttime + '</td><td>' + recordingendtime + '</td><td>' + recordingWeekDay + '</td><td>' + recordingNumber + '</td><td>' + recordingNote + '</td></tr>').appendTo('#record_body');
        },

        // get the current date and time
        getNow: function(){
            let dateContainer = [];
            let myDate = new Date;
            let myYear = myDate.getFullYear();
            let myMonth = myDate.getMonth() + 1;
            let myDay = myDate.getDate();
            let myHours = myDate.getHours();
            let myMin = myDate.getMinutes();
            let mySec = myDate.getSeconds();
            let myWeekDay = myDate.getDay();
            let myWeeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday"];

            let nowDate = ''
            if(myMonth < 10 && myDay < 10){
                nowDate = myYear.toString() + "-" + "0" + myMonth.toString() + "-" + "0" + myDay.toString();
            }else if(myMonth < 10 && myDay >= 10){
                nowDate = myYear.toString() + "-" + "0" + myMonth.toString() + "-" +  myDay.toString();
            }else if(myMonth >= 10 && myDay < 10){
                nowDate = myYear.toString() + "-" + myMonth.toString() + "-" + "0" +  myDay.toString();
            }else{
                nowDate = myYear.toString() + "-" + myMonth.toString() + "-" + myDay.toString();
            }
 
            let nowTime = myHours.toString() + ":" + myMin.toString() + ":" + mySec.toString();
            let nowWeekDay = myWeeks[myWeekDay];

            let currentFirstOfMonth = '';
            if(myMonth < 10 ){
                currentFirstOfMonth = myYear.toString() + "-" + "0" + myMonth.toString() + "-" + "01";
            }else{
                currentFirstOfMonth = myYear.toString() + "-" + myMonth.toString() + "-" + "01";
            }
   
            let nextFirstOfMonth = '';
            if(myMonth < 10 ){
                nextFirstOfMonth = myYear.toString() + "-" + "0" + (myDate.getMonth() + 2).toString() + "-" + "01";
            }else{
                nextFirstOfMonth = myYear.toString() + "-" + (myDate.getMonth() + 2).toString() + "-" + "01";
            }
            
            dateContainer.push(nowDate);
            dateContainer.push(nowTime);
            dateContainer.push(nowWeekDay);
            dateContainer.push(currentFirstOfMonth);
            dateContainer.push(nextFirstOfMonth);
            return dateContainer
        },

        // get all year number
        getAllYear: function(urlPath, yearInput_chart_left, yearInput_chart_top, yearInput_chart_height, yearInput_chart_width, asyncstate){
            $.ajax({
                async:asyncstate,
                url:urlPath+'/getAllYear',
                // data:{downloadsingle:"downloadCSV", downloadpathVal: downloadpathVal},
                type:'POST',    
                dataType:'json',
                success: function(data){
                    yearlist = data['result'];
                    heightOfLi = parseInt(yearlist.length) * 20
                    yearlist_li_str = '';
                    for(let i=0; i < yearlist.length; i++){
                        tem_str = '<li>' + yearlist[i] + '</li>';
                        yearlist_li_str = yearlist_li_str + tem_str;
                    };
                    
                    let pullDown_Top = yearInput_chart_top + yearInput_chart_height;
                    let pullDown_Width = yearInput_chart_width;

                    $('<div id="yearPullDown" style="height:0px; color: black; border:none; position:absolute; left:' + yearInput_chart_left + 'px; top:' + pullDown_Top + 'px; width: ' + pullDown_Width + 'px; overflow: auto">' + yearlist_li_str + '</div>').appendTo('html');
                    $('#yearPullDown').css({'border':'1px solid black', 'border-top':'none','background-color':'whitesmoke', 'width': pullDown_Width + 'px'});
                    $('#yearPullDown').animate({height:heightOfLi + 'px'}, 200);
                },
                error:function(){
                    console.log('there is some error')
                },
                headers:{c:300, d:400},
           })

        },

        // validate decimal or integer
        isNumber: function(inputNum){
            let regExp_dec = /^\d+\.\d+$/;
            let regExp_int = /^[1-9]*[1-9][0-9]*$/
            return (regExp_dec.test(inputNum) || regExp_int.test(inputNum))
        },

        // validate end date greater than start date
        greaterDate: function(startDate, endDate){
            let startDate_str = startDate.val();
            let endDate_str = endDate.val();
            let startDate_date = new Date(Date.parse(startDate_str.replace("-","/"))); 
            let endDate_date = new Date(Date.parse(endDate_str.replace("-","/")));
            if(endDate_date < startDate_date){
                return false
            }else if(startDate_str == '' || endDate_str == ''){
                return false
            }else{
                return true
            };
        }

    })


})()