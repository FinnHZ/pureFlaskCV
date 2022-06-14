(function(){

    $.extend({
        changeWorkPage: function(urlPath, pageNumss){
            // let pageNum_json = JSON.stringify(pageNumss);           
            let dict_test = {}
            dict_test['pageNum_json'] = parseInt(pageNumss);
            let dict_json = JSON.stringify(dict_test);

            $.ajax({
                async:true,
                url: urlPath + '/changeWorkPage',
                type:'POST',
                // data:{pageNum_json: pageNum_json},           
                data:dict_json,
                dataType:'json',
                contentType: 'application/json; charset=UTF-8',
                success: function(data){
                    let pageInfo = data["pageInfo"]
                    $('#workBody').empty();

                    let updateContent = ''
                    updateContent = updateContent + '<tr><th>' + pageInfo["workCompany"] + '</th><th>' + pageInfo["workDate"] + '</th></tr><tr><td colspan="2">' + pageInfo["workPosition"] + '</td></tr>'
                    for(var i=0; i<pageInfo["workDescription"].length; i++){
                        updateContent = updateContent + '<tr><td colspan="2">' + pageInfo["workDescription"][i] + '</td></tr>'
                    }
                    $(updateContent).appendTo('#workBody')
                },
                error: function(){
                    alert('There is somer error with your connect, please check your internet!')
                },
                headers:{a:100, b:200}
            })
        },

        changeExpPage:function(urlPath, pageNumss){
            // let pageNum_json = JSON.stringify(pageNumss);           
            let dict_test = {}
            dict_test['pageNum_json'] = parseInt(pageNumss);
            let dict_json = JSON.stringify(dict_test);

            $.ajax({
                async:true,
                url: urlPath + '/changeExpPage',
                type:'POST',
                // data:{pageNum_json: pageNum_json},           
                data:dict_json,
                dataType:'json',
                contentType: 'application/json; charset=UTF-8',
                success: function(data){
                    let pageInfo = data["pageInfo"]
                    $('#expBody').empty();

                    let updateContent = ''
                    updateContent = updateContent + '<tr><th>' + pageInfo["expCompany"] + '</th><th>' + pageInfo["expDate"] + '</th></tr><tr><td colspan="2">' + pageInfo["expPosition"] + '</td></tr>' + '<tr><td colspan="2">' + pageInfo["expSkills"] + '</td></tr>'+ '<tr><td colspan="2">' + pageInfo["expTitle"] + '</td></tr>'
                    for(var i=0; i<pageInfo["expDescription"].length; i++){
                        updateContent = updateContent + '<tr><td colspan="2">' + pageInfo["expDescription"][i] + '</td></tr>'
                    }
                    $(updateContent).appendTo('#expBody')
                },
                error: function(){
                    alert('There is somer error with your connect, please check your internet!')
                },
                headers:{a:100, b:200}
            })
        },


        dyLine_cu: function(ctx, startX, startY, stopX, bounds){
            const breakPoint = startY / 2;
            ctx.beginPath();
            ctx.translate(0, 0);   //重新定义画布坐标轴的原点，这里依旧是以画布的左上角为原点，重新定义原点之后，所有坐标都要以新原点为准
            ctx.moveTo(startX, startY);  //确定其实作画起点位置

            let timer_cu = setInterval(function(){

                if(startY > breakPoint){
                    startY = startY - 1 //- bounds.top;
                    ctx.lineWidth = 1;
                }else if(startY <= breakPoint){
                    startX = startX - 1 //- bounds.left;
                    ctx.lineWidth = 1;
                    console.log(startX, stopX, startY)
                    if(startX <= stopX && startY <= breakPoint){
                        clearInterval(timer_cu)
                        
                        console.log("timeouer")
                    }
                };
                $.drawing(ctx, startX, startY)
            },50)
        },



        drawing:function(ctx, x, y){
            ctx.lineTo(x, y);
            ctx.strokeStyle = "red";
            ctx.stroke();
        },

        adjustDpi: function(context){
            var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio ||
                               context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio ||
                               context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore

        }






        // // change password validate
        // validatepassword: function(userName, passWord, modifycover, urlPath){
        //     let validateList = [];
        //     validateList.push(userName);
        //     validateList.push(passWord);
        //     let validateList_json = JSON.stringify(validateList)
        //     $.ajax({
        //         async:true,
        //         url:urlPath+'/modifyUser',
        //         type:'POST',
        //         data:{validateinfo: validateList_json},
        //         dataType:'json',
        //         success: function(data){
        //             if(data['testResult_v'] == 'succseeLogIn'){
        //                 let originalPart_left = $('#originalPart').offset().left;
        //                 let originalPart_top = $('#originalPart').offset().top;
        //                 modifycover.animate({"left":originalPart_left,"top":originalPart_top},500,function(){
        //                     $('#originalName').attr('disabled','disabled');
        //                     $('#originalPassWord').attr('disabled','disabled');
        //                     $('#originalSubmit').attr('disabled','disabled');
        //                     $('#originalReset').attr('disabled','disabled');
        //                     $('#newName').removeAttr('disabled');
        //                     $('#newPassWord').removeAttr('disabled');
        //                     $('#newPassWord_confirm').removeAttr('disabled');
        //                     $('#newSubmit').removeAttr('disabled');
        //                     $('#newReset').removeAttr('disabled');
        //                     $('#newvnote').html('Please insert your new password!');
        //                     $('#orginalnote').html('');
        //                     $('#newName').val(userName)
        //                 })

        //             }else{
        //                 alert('Please insert right password!')
        //             }
        //         },
        //         error:function(){
        //             alert('There is not a user named' + userName + ', Please check user name!')
        //         },
        //         headers:{a:100, b:200}
        //     })
        // },

        // // manual
        // uploadAction_man: function(urlPath,fileData,uploadedNumber,asyncstate){
        //     $.ajax({
        //         async:asyncstate,
        //         url:urlPath+'/uploadManual',
        //         type:'POST',
        //         data:fileData,
        //         dataType:'json',
        //         Cache:false,
        //         contentType:false,
        //         processData:false,
        //         success: function(data){
        //             if(data['uploadresult'] == 'success' ){
        //                 preUploaded = parseInt(uploadedNumber.html());
        //                 uploadedNumber.html(preUploaded + 1);
        //             }else if((data['uploadresult'] == 'unSuccess' || data['uploadresult'] == 'empty') && data['fileName'] != 'null'){
        //                 preUploaded = parseInt(uploadedNumber.html());
        //                 uploadedNumber.html(preUploaded + 1);
        //                 $('<tr><td>' + data['uploadfile'] + '</td><td>' + data['errorline'] + '</td></tr>' ).appendTo('#error_body');  ////////////
        //             }else if(data['fileName'] == 'null'){
        //                 alert("There is some error with your uploading path!")
        //             }   
        //         },
        //         error: function(){
        //             alert("Please check if you have selected right file!")
        //         },
        //         headers:{a:100, b:200}
        //     })
        // },

        // // changepages
        // changePagesFunc: function(urlPath, toNumber, currentPage, asyncstate){
        //     if(currentPage.html() != "0"){
        //         $.ajax({
        //             async:asyncstate,
        //             url:urlPath+'/changePages',
        //             data:{toPage:toNumber},
        //             type:'POST',    
        //             dataType:'json',
        //             success: function(data){
        //                 currentPage.html(toNumber)
    
        //                 $('#exportbody').empty();
        //                 let tem_content = data['tem_content'].replaceAll("'","\"");
        //                 let contentArr = JSON.parse(tem_content);
    
        //                 let contentTable = '';
        //                 for(var j=0; j<contentArr.length; j++){ 
        //                     let tem_detail = '<tr>'   
        //                     for(var t=0; t<contentArr[j].length; t++){
        //                         tem_detail += '<td>' + contentArr[j][t] + '</td>'
        //                     }
        //                     tem_detail += '</tr>'
        //                     contentTable += tem_detail
        //                 };
        //                 $(contentTable).appendTo('#exportbody');
    
        //             },
        //             error:function(){
        //                 console.log('there is some error')
        //             },
        //             headers:{c:300, d:400},
        //        })
        //     }else{
        //         alert("There is no page!")
        //     }
            
        // },

        // //write the upload recording
        // writeRecording: function(recordingDate, recordingstarttime, recordingendtime, recordingWeekDay,recordingNumber,recordingNote){
        //     $('<tr><td>' + recordingDate + '</td><td>' + recordingstarttime + '</td><td>' + recordingendtime + '</td><td>' + recordingWeekDay + '</td><td>' + recordingNumber + '</td><td>' + recordingNote + '</td></tr>').appendTo('#record_body');
        // },

        // // get the current date and time

        // // get all year number
        // getAllYear: function(urlPath, yearInput_chart_left, yearInput_chart_top, yearInput_chart_height, yearInput_chart_width, asyncstate){
        //     $.ajax({
        //         async:asyncstate,
        //         url:urlPath+'/getAllYear',
        //         // data:{downloadsingle:"downloadCSV", downloadpathVal: downloadpathVal},
        //         type:'POST',    
        //         dataType:'json',
        //         success: function(data){
        //             yearlist = data['result'];
        //             heightOfLi = parseInt(yearlist.length) * 20
        //             yearlist_li_str = '';
        //             for(let i=0; i < yearlist.length; i++){
        //                 tem_str = '<li>' + yearlist[i] + '</li>';
        //                 yearlist_li_str = yearlist_li_str + tem_str;
        //             };
                    
        //             let pullDown_Top = yearInput_chart_top + yearInput_chart_height;
        //             let pullDown_Width = yearInput_chart_width;

        //             $('<div id="yearPullDown" style="height:0px; color: black; border:none; position:absolute; left:' + yearInput_chart_left + 'px; top:' + pullDown_Top + 'px; width: ' + pullDown_Width + 'px; overflow: auto">' + yearlist_li_str + '</div>').appendTo('html');
        //             $('#yearPullDown').css({'border':'1px solid black', 'border-top':'none','background-color':'whitesmoke', 'width': pullDown_Width + 'px'});
        //             $('#yearPullDown').animate({height:heightOfLi + 'px'}, 200);
        //         },
        //         error:function(){
        //             console.log('there is some error')
        //         },
        //         headers:{c:300, d:400},
        //    })

        // },


    })


})()