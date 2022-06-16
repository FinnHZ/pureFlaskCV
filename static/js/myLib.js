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


        dyLine_start: function(ctx_1, x_1, y_1, ctx_2, x_2, y_2){
            ctx_1.beginPath();
            ctx_1.translate(0.5, 0.5);   //重新定义画布坐标轴的原点，这里依旧是以画布的左上角为原点，重新定义原点之后，所有坐标都要以新原点为准
            ctx_1.moveTo(x_1, y_1);  //确定其实作画起点位置
            let timer_cu = setInterval(function(){
                if(y_1 > 75){    // 如果不重新定义canvas的尺寸大小， 所有canvas默认的像素 宽高都是 300:150，所以这里可以直接按照这个数字去定位
                    y_1 = y_1 - 1 //- bounds.top;
                    ctx_1.lineWidth = 2;
                    $.drawing(ctx_1, x_1, y_1);
                }else if(y_1 <= 75){
                    x_1 = x_1 - 1 //- bounds.left;
                    ctx_1.lineWidth = 1;
                    if(x_1 <= 0 ){
                        $.drawing(ctx_1, x_1, y_1);
                        clearInterval(timer_cu);
                        console.log("cu_end");
                        ctx_1.closePath();
                        ctx_1.beginPath();
                        ctx_1.translate(0.5, 0.5);   
                        
                        const title_in_h = $('#titleDetail').height();
                        const title_out_h = $('#titlePart').height();
                        const margin_top_ratio = (title_out_h - title_in_h) / title_out_h * 100

                        ctx_1.moveTo(0, 150 * margin_top_ratio / 100);  
                        $.drawing(ctx_1, 0, 150);
                        ctx_1.closePath();
                        $('#titleDetail').animate({margin: (title_out_h - title_in_h) + "px 0 0 0"}, 2500, function(){ // 这里用绝对值定位，因为百分比在这里目前没有搞懂为什么无法精准控制
                            $.dyLine_lc(ctx_2, x_2, y_2);
                        })  
                        
                    }else{
                        $.drawing(ctx_1, x_1, y_1)
                    }
                };
            },20)
        },


        dyLine_lc: function(ctx, x, y){
            ctx.beginPath();
            ctx.translate(0.5, 0.5);   //重新定义画布坐标轴的原点，这里依旧是以画布的左上角为原点，重新定义原点之后，所有坐标都要以新原点为准
            ctx.moveTo(x, y);  //确定起始作画起点位置
            let timer_lc = setInterval(function(){
                y = y + 1 //- bounds.top;
                ctx.lineWidth = 2;
                if(y >= 150){
                    $.drawing(ctx, x, y);
                    clearInterval(timer_lc);
                    console.log("lc_end");
                    ctx.closePath();
                    ctx.beginPath();
                    ctx.translate(0.5, 0.5);   //重新定义画布坐标轴的原点，这里依旧是以画布的左上角为原点，重新定义原点之后，所有坐标都要以新原点为准
                    ctx.moveTo(0, 149);  //确定起始作画起点位置
                    ctx.lineWidth = 2;
                    $.drawing(ctx, 300, 149);
                    ctx.closePath();


                    // const basicDetail_h = $('#basicDetail').height();
                    $('#basicDetail').animate({margin: "0% 0% 0% 0%"}, 2500, function(){ // 这里用绝对值定位，因为百分比在这里目前没有搞懂为什么无法精准控制
                        console.log("waitting for next cd line")
                    })  
                }else{
                    $.drawing(ctx, x, y);
                }

            },20)
        },

        

    
        drawing:function(ctx_1, x, y){
            ctx_1.lineTo(x, y);
            ctx_1.lineCap = "round"
            // ctx_1.lineJoin = "round";
            ctx_1.strokeStyle = "rgb(0, 255, 255, 0.5)";
            ctx_1.stroke();
        },

        // adjustDpi: function(context){
        //     var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio ||
        //                        context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio ||
        //                        context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
        //     return (window.devicePixelRatio || 1) / backingStore

        // }






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