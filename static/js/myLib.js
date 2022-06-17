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
                    updateContent = updateContent + '<tr><th>' + pageInfo["uni"] + '</th><th>' + pageInfo["date"] + '</th></tr><tr><td colspan="2">' + pageInfo["degree"] + '</td></tr><tr><td colspan="2">' + pageInfo["major"] + '</td></tr>'
       
                    $(updateContent).appendTo('#eduBody')
                },
                error: function(){
                    alert('There is somer error with your connect, please check your internet!')
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

        drawing:function(ctx_1, x, y){
            ctx_1.lineTo(x, y);
            ctx_1.lineCap = "round"
            // ctx_1.lineJoin = "round";
            ctx_1.strokeStyle = "rgb(0, 255, 255, 0.5)";
            ctx_1.stroke();
        },


        dyLine_start: function(ctx_1, x_1, y_1, ctx_2, x_2, y_2, ctx_3, x_3, y_3){
            ctx_1.beginPath();
            ctx_1.translate(0.5, 0.5);   //重新定义画布坐标轴的原点，这里依旧是以画布的左上角为原点，重新定义原点之后，所有坐标都要以新原点为准
            ctx_1.moveTo(x_1, y_1);  //确定其实作画起点位置
            ctx_1.lineWidth = 1;
            let timer_cu = setInterval(function(){
                if(y_1 > 75){    // 如果不重新定义canvas的尺寸大小， 所有canvas默认的像素 宽高都是 300:150，所以这里可以直接按照这个数字去定位
                    y_1 = y_1 - 1 //- bounds.top;
                    // ctx_1.lineWidth = 1;
                    $.drawing(ctx_1, x_1, y_1);
                }else if(y_1 <= 75){
                    x_1 = x_1 - 1 //- bounds.left;
                    // ctx_1.lineWidth = 1;
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
                            $.dyLine_lc(ctx_2, x_2, y_2, ctx_3, x_3, y_3);
                        })  
                        
                    }else{
                        $.drawing(ctx_1, x_1, y_1)
                    }
                };
            },20)
        },

        dyLine_lc: function(ctx_2, x_2, y_2, ctx_3, x_3, y_3){
            ctx_2.beginPath();
            ctx_2.translate(0.5, 0.5);   //重新定义画布坐标轴的原点，这里依旧是以画布的左上角为原点，重新定义原点之后，所有坐标都要以新原点为准
            ctx_2.moveTo(x_2, y_2);  //确定起始作画起点位置
            let timer_lc = setInterval(function(){
                y_2 = y_2 + 1 //- bounds.top;
                ctx_2.lineWidth = 1;
                if(y_2 >= 150){
                    $.drawing(ctx_2, x_2, y_2);
                    clearInterval(timer_lc);
                    console.log("lc_end");
                    ctx_2.closePath();
                    ctx_2.beginPath();
                    ctx_2.translate(0.5, 0.5);   //重新定义画布坐标轴的原点，这里依旧是以画布的左上角为原点，重新定义原点之后，所有坐标都要以新原点为准
                    ctx_2.moveTo(0, 149);  //确定轴线起始作画起点位置
                    ctx_2.lineWidth = 1;
                    $.drawing(ctx_2, 300, 149);
                    ctx_2.closePath();

                    // const basicDetail_h = $('#basicDetail').height();
                    $('#basicDetail').animate({margin: "0% 0% 0% 0%"}, 2500, function(){ // 这里用绝对值定位，因为百分比在这里目前没有搞懂为什么无法精准控制
                        $.dyLine_cd(ctx_3, x_3, y_3)
                    })  
                }else{
                    $.drawing(ctx_2, x_2, y_2);
                }

            },20)
        },

        dyLine_cd: function(ctx_3, x_3, y_3){
            ctx_3.beginPath();
            ctx_3.translate(0.5, 0.5);   //重新定义画布坐标轴的原点，这里依旧是以画布的左上角为原点，重新定义原点之后，所有坐标都要以新原点为准
            ctx_3.moveTo(x_3, y_3);  //确定起始作画起点位置
            let timer_cd = setInterval(function(){
                x_3 = x_3 + 1 //- bounds.top;
                ctx_3.lineWidth = 1;
                if(x_3 >= 300){
                    $.drawing(ctx_3, x_3, y_3);
                    clearInterval(timer_cd);
                    console.log("cd_end");
                    ctx_3.closePath();
                    ctx_3.beginPath();
                    ctx_3.translate(0.5, 0.5);   //重新定义画布坐标轴的原点，这里依旧是以画布的左上角为原点，重新定义原点之后，所有坐标都要以新原点为准
                    ctx_3.moveTo(298, 150);  //确定轴线起始作画起点位置
                    ctx_3.lineWidth = 1;
                    
                    
                    const cd_h = $('#line_cd').height();
                    const edu_h = $('#educationShow').height();
                    const cd_ed_ratio = edu_h / cd_h

                    $.drawing(ctx_3, 298, 150*(1-cd_ed_ratio));
                    ctx_3.closePath();

                    // const basicDetail_h = $('#basicDetail').height();
                    $('#educationShow').animate({margin: "0% 0% 0% 0%"}, 2500, function(){ // 这里用绝对值定位，因为百分比在这里目前没有搞懂为什么无法精准控制
                        console.log("waitting for next rc1 line")
                    })  
                }else{
                    $.drawing(ctx_3, x_3, y_3);
                }

            },20)
        },





    })


})()