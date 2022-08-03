(function(){

    $.extend({
        changeEduPage: function(urlPath, pageNumss){
            // let pageNum_json = JSON.stringify(pageNumss); 
          
            let dict_test = {}
            dict_test['pageNum_json'] = parseInt(pageNumss);
            let dict_json = JSON.stringify(dict_test);

            $.ajax({
                async:true,
                url: urlPath + '/changeEduPage',
                type:'POST',
                // data:{pageNum_json: pageNum_json},           
                data:dict_json,
                dataType:'json',
                contentType: 'application/json; charset=UTF-8',
                success: function(data){
                    let pageInfo = data["pageInfo"]

                    $('#eduBody').empty();

                    let updateContent = ''
                    updateContent = updateContent + '<tr><th>' + pageInfo["uni"] + '</th><th id="eduDate">' + pageInfo["date"] + '</th></tr><tr><td colspan="2">' + pageInfo["degree"] + '</td></tr><tr><td colspan="2"><li>' + pageInfo["major"] + '</li></td></tr>'
       
                    $(updateContent).appendTo('#eduBody')
                },
                error: function(){
                    alert('There is some error with your connect, please check your internet!')
                },
                headers:{a:100, b:200}
            })
        },

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
                    updateContent = updateContent + '<tr><th>' + pageInfo["workCompany"] + '</th><th id="wkDate">' + pageInfo["workDate"] + '</th></tr><tr><td colspan="2">' + pageInfo["workPosition"] + '</td></tr>'
                    for(let i=0; i<pageInfo["workDescription"].length; i++){
                        updateContent = updateContent + '<tr><td colspan="2"><li>' + pageInfo["workDescription"][i] + '</li></td></tr>'
                    }
                    $(updateContent).appendTo('#workBody')
                },
                error: function(){
                    alert('There is some error with your connect, please check your internet!')
                },
                headers:{a:100, b:200}
            })
        },

        changeExpPage: function(urlPath, pageNumss){
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
                    updateContent = updateContent + '<tr><th>' + pageInfo["expCompany"] + '</th><th id="expDate">' + pageInfo["expDate"] + '</th></tr><tr><td colspan="2">' + pageInfo["expPosition"] + '</td></tr>' + '<tr><td colspan="2" style="border-bottom: 2px solid rgb(170, 127, 116, 0.5);">' + pageInfo["expSkills"] + '</td></tr>'+ '<tr><td colspan="2">' + pageInfo["expTitle"] + '</td></tr>'
                    for(let i=0; i<pageInfo["expDescription"].length; i++){
                        updateContent = updateContent + '<tr><td colspan="2"><li>' + pageInfo["expDescription"][i] + '</li></td></tr>'
                    }
                    $(updateContent).appendTo('#expBody')
                },
                error: function(){
                    alert('There is some error with your connect, please check your internet!')
                },
                headers:{a:100, b:200}
            })
        },

        deployStars: function(num, width, height){       
            for(i=0; i<num; i++){
                let left_x = parseInt(Math.random() * width + 1);
                let top_y = parseInt(Math.random() * height * 0.8 + 1);
                let starSize = parseInt(Math.random() * 3 + 1);
                let flashingTime = parseInt(Math.random() * 5 + 2);
                star = '<div style="position: absolute; height: ' + starSize + 'px; width: ' + starSize + 'px; background-color: white; box-shadow: 0 0 3px white; border-radius: 50%; left: ' + left_x + 'px; top:' + top_y + 'px; animation: flashing ' + flashingTime + 's infinite; -webkit-animation: flashing ' + flashingTime + 's infinite;"></div>'
                $(star).appendTo("#nightBackground")
            
            };


        },

        runBall: function(ballPositionDict, time, eId, eName, idShowDict){
            const targetEle0_id = $('.ball').eq(0).attr("id");
            const targetEle0_html = $('.ball').eq(0).html();
            const totalNum_0 = $('.ball').length;
            const animateTime = 2000;
            for(i=0; i<totalNum_0; i++){
                let flag = i;
                if(i == 0 ){
                    $('.ball').eq(i).animate(ballPositionDict[i], time, function(){
                        $('.ball').eq(0).remove()
                    })
                }else if(i == totalNum_0-1){
                    $('.ball').eq(i).animate(ballPositionDict[i], time, function(){
                        $(this).attr("name", flag.toString());                                
                        newEle = '<div id="'+ targetEle0_id +'" name="7" class="ball">' + targetEle0_html +'</div>';
                        $(newEle).appendTo('#ballArea');
                        $('#'+ targetEle0_id.toString()).css(ballPositionDict[7]);
                        if(eName == 1){
                            const btnList = Object.keys(idShowDict);
                            if(eId == "allBtn"){
                                for(let j=0; j<btnList.length; j++){
                                    $('#' + idShowDict[btnList[j]][0]).css({"z-index":"2"});
                                    $('#' + idShowDict[btnList[j]][0]).animate({"opacity":"1"}, animateTime);
                                };
                                $('#currentName').animate({"opacity":"0"}, animateTime/2, function(){
                                    $('#currentName').html("All");
                                    $('#currentName').animate({"opacity":"1"}, animateTime/2);
                                });
                            }else if(eId == "nothingBtn"){
                                for(let j=0; j<btnList.length; j++){
                                    $('#' + idShowDict[btnList[j]][0]).animate({"opacity":"0"}, animateTime);
                                    $('#' + idShowDict[btnList[j]][0]).css({"z-index":"0"});
                                };
                                $('#currentName').animate({"opacity":"0"}, animateTime/2, function(){
                                    $('#currentName').html("");
                                });                                
                            }else{
                                for(let j=0; j<btnList.length; j++){
                                    if(btnList[j] == eId){
                                        $('#' + idShowDict[btnList[j]][0]).css({"z-index":"2"});
                                        $('#' + idShowDict[btnList[j]][0]).animate({"opacity":"1"}, animateTime);
                                        $('#currentName').animate({"opacity":"0"}, animateTime/2, function(){
                                            $('#currentName').html(idShowDict[btnList[j]][1]);
                                            $('#currentName').animate({"opacity":"1"}, animateTime/2);
                                        });        
                                    }else{
                                        $('#' + idShowDict[btnList[j]][0]).animate({"opacity":"0"}, animateTime);
                                        $('#' + idShowDict[btnList[j]][0]).css({"z-index":"0"});
                                    }
                                };
                            }
                        }
                    })
                }else{
                    $('.ball').eq(i).animate(ballPositionDict[i], time, function(){
                        $(this).attr("name", flag.toString())
                    })
                }
            };
        },

        settingValidate: function(urlPath, username, password){
            let dict_validate = {}
            // let list_validate = []
            // list_validate.push(username)
            dict_validate['setting_json'] = [username, password];
            let dict_json = JSON.stringify(dict_validate);
            $.ajax({
                async: true,
                url: urlPath + '/settingsValidate',
                type:'POST',
                // data:{pageNum_json: pageNum_json},           
                data:dict_json,
                dataType:'json',
                contentType: 'application/json; charset=UTF-8',
                success: function(data){
                    let validateResult = data["result"];
                    if(validateResult == "1"){
                        window.location.href = urlPath + '/settings'
                    }
                },
                error: function(){
                    alert('There is some error with your connect, please check your internet!')
                },
                headers:{a:100, b:200}
            })
        },

        changeAccess: function(urlPath, usersData){
            let usersDict = {};
            usersDict['users_json'] = usersData;
            let dict_json = JSON.stringify(usersDict);
            $.ajax({
                async: true,
                url: urlPath + '/settingsChange',
                type: 'POST',
                data: dict_json,
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function(data){
                    if(data['result'] == 1){
                        alert('Successfully! Access update completed!')
                    }else{
                        alert('Unsuccessfully! Please check your source code or internet!')
                    }
                },
                error: function(){
                    alert('There is some error with your connect, please check your internet!')
                },
                headers:{a:100, b:200}

            })
        },

        logoutCommand: function(urlPath, cmd){
            let logDict = {};
            logDict['logout_json'] = cmd;
            let dict_json = JSON.stringify(logDict);
            $.ajax({
                async: true,
                url: urlPath + '/logout',
                type: 'POST',
                data: dict_json,
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function(data){
                    window.location.href = urlPath
                },
                error: function(){
                    alert('There is some error with your connect, please check your internet!')
                },
                headers:{a:100, b:200}

            })
        },

        // closeWin: function(urlPath, cmd){
        //     let logDict = {};
        //     logDict['logout_json'] = cmd;
        //     let dict_json = JSON.stringify(logDict);
        //     $.ajax({
        //         async: false,
        //         url: urlPath + '/logout',
        //         type: 'POST',
        //         data: dict_json,
        //         dataType: 'json',
        //         contentType: 'application/json; charset=UTF-8',
        //         success: function(data){
        //             // window.close()
        //         },
        //         error: function(){
        //             alert('There is some error with your connect, please check your internet!')
        //         },
        //         headers:{a:100, b:200}

        //     })
        // },





    })

})()