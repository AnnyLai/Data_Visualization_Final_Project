
async function main() {
    const str_attr = localStorage.getItem("storageName")
    const fields = str_attr.split(',')
    //console.log(fields)

    for(f of fields) {
        if(f.slice(0,3) == "CDR") {
            gCDREducation.append("text")
                .attr("x", EducationMARGIN.LEFT + EducationSvgWIDTH/2)
                .attr("y", EducationMARGIN.TOP * 0.5)
                .attr("font-size", EducationMARGIN.TOP * 0.3)
                .attr("text-anchor", "middle")
                .text("CDR Education");

            CDRdata = await loadCSVData("CDR_data.csv");

            CDRdata = CDRdata.filter((d) => {
                return d.Age >= 65 && d.Age <= 100 && d.Gender >= 0 && d.Gender <= 1
                && d.Education >= 0 && d.Education <= 23 && d.CDR >= 0 && d.CDR <= 5
                && d.CDR_Memory >= 0 && d.CDR_Memory <= 5 && d.CDR_Orient >= 0 && d.CDR_Orient <= 5
                && d.CDR_ProbSolve >= 0 && d.CDR_ProbSolve <= 5 && d.CDR_Social >= 0 && d.CDR_Social <= 5
                && d.CDR_Home >= 0 && d.CDR_Home <= 5 && d.CDR_SelfCare >= 0 && d.CDR_SelfCare <= 5
                && d.SOB >= 0 && d.SOB <= 30;
            });

            var CDREducationData = [
                {label: 'No', startAngle: 0, endAngle: 0, color: "rgb(154,205,50)", index: 0},
                {label: 'Elementary', startAngle: 0, endAngle: 0, color: "rgb(255,99,71)", index: 1},
                {label: 'Junior High', startAngle: 0, endAngle: 0, color: "rgb(64,224,208)", index: 2},
                {label: 'Senior High', startAngle: 0, endAngle: 0, color: "rgb(240,230,140)", index: 3},
                {label: 'College+', startAngle: 0, endAngle: 0, color: "rgb(123,104,238)", index: 4},
            ];

            var CDREducationLevel = d3.nest()
                                        .key((d)=> {
                                            if(Number(d.Education) == 0) {
                                                return 0;
                                            }else if(Number(d.Education) <= 6) {
                                                return 1;
                                            }else if(Number(d.Education) <= 9) {
                                                return 2;
                                            }else if(Number(d.Education) <= 12) {
                                                return 3;
                                            }else {
                                                return 4;
                                            }
                                        })
                                        .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                                        .rollup((v) => v.length)
                                        .entries(CDRdata);

            console.log("CDR Education");
            console.log(CDREducationLevel);

            for( let i = 0 ; i < 5 ; i++ ){
                if( i > 0 ){
                    CDREducationData[i].startAngle = CDREducationData[i-1].endAngle;
                };
                if( i < 4 ){
                    var amount = 0;
                    amount = CDREducationLevel[i].value;
                    CDREducationData[i].endAngle = CDREducationData[i].startAngle + 2*Math.PI*amount/CDRdata.length;
                }
                else{
                    CDREducationData[i].endAngle = 2 * Math.PI;
                };
            }
        
            var EducationarcGenerator = d3.arc()
                                        .innerRadius(EducationInnerRadius)
                                        .outerRadius(EducationOuterRadius);

            var CDREducationChart = CDREducation.selectAll("path")
                                                .exit().remove()
                                                .data(CDREducationData)
                                                .enter()
                                                .append("path")
                                                .attr("d", EducationarcGenerator)
                                                .attr("fill", (d)=>d.color)
                                                .attr("stroke", (d)=>d.color); 

            var EducationLegendHeight = (EducationHeight-EducationMARGIN.TOP-EducationMARGIN.BOTTOM) * 0.7 * 0.9 / 5;

            var CDREducationLegendRects = CDREducationLegend.selectAll("rect")
                                                            .exit().remove()
                                                            .data(CDREducationData)
                                                            .enter()
                                                            .append("rect")
                                                            .attr("x", EducationMARGIN.RIGHT*8/9*0.1)
                                                            .attr("y", function(d,i){
                                                                return (EducationHeight-EducationMARGIN.TOP-EducationMARGIN.BOTTOM)*0.7*0.05 + EducationLegendHeight*i;
                                                            })
                                                            .attr("width", EducationLegendHeight * 0.8)
                                                            .attr("height", EducationLegendHeight * 0.8)
                                                            .attr("fill", function(d,i){
                                                                return d.color;
                                                            });
            var CDREducationLegendTexts = CDREducationLegend.selectAll("text")
                                                            .exit().remove()
                                                            .data(CDREducationData)
                                                            .enter()
                                                            .append("text")
                                                            .attr("x", EducationMARGIN.RIGHT*8/9*0.15 + EducationLegendHeight)
                                                            .attr("y", function(d,i){
                                                                return (EducationHeight-EducationMARGIN.TOP-EducationMARGIN.BOTTOM)*0.7*0.05 + EducationLegendHeight*(i+0.6);
                                                            })
                                                            .attr("font-size", EducationLegendHeight * 0.65)
                                                            .text(function(d){
                                                                return d.label;
                                                            });

            ///click
            var EducationClicked = [0, 0, 0, 0, 0];
            CDREducationLegendRects.on("click", function(d, i) {
                for (let i = 0 ; i < CDREducationData.length ; i++) {
                    if (d3.color(CDREducationData[i].color).formatRgb() == d3.select(this).style("fill")) {
                        EducationClicked[i] += 1;
                    }
                }

                if (EducationClicked[0] == 2 || EducationClicked[1] == 2 || EducationClicked[2] == 2 || EducationClicked[3] == 2 || EducationClicked[4] == 2) {
                    delete CDRconditions["edu"];
                    console.log(CDRconditions);
                    
                    UpdateCDREducationChart(CDRdata);
                    EducationClicked[0] = 0;
                    EducationClicked[1] = 0;
                    EducationClicked[2] = 0;
                    EducationClicked[3] = 0;
                    EducationClicked[4] = 0;

                    //Update Age Chart   
                    UpdateAgeChart(MMSEdata, CDRdata);

                    //Update Gender Chart
                    UpdateCDRGenderChart(CDRdata);

                    //Update Hospital Chart
                    UpdateHospitalChart(MMSEdata, CDRdata);

                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                } else if (EducationClicked[0] == 1 || EducationClicked[1] == 1 || EducationClicked[2] == 1 || EducationClicked[3] == 1 || EducationClicked[4] == 1) {
                    CDRconditions["edu"] = d;
                    console.log(CDRconditions);
                    
                    for (let i = 0 ; i < CDREducationData.length ; i++) {
                        if (d3.color(CDREducationData[i].color).formatRgb() == d3.select(this).style("fill")) {
                            EducationClicked[i] = 1;
                        } else {
                            EducationClicked[i] = 0;
                        }
                    }
                    UpdateCDREducationChart(CDRdata);
                    
                    //Update Age Charts
                    UpdateAgeChart(MMSEdata, CDRdata);
                    
                    //Update Gender Chart
                    UpdateCDRGenderChart(CDRdata);

                    //Update Hospital Chart
                    UpdateHospitalChart(MMSEdata, CDRdata);

                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                }
            });
        }
        if(f.slice(0,3) == "MMS") {
            if( fields[0] == "" ) {
                gMMSE.attr("transform", `translate(0, 0)`);
            }

            gMMSEEducation.append("text")
                            .attr("x", EducationMARGIN.LEFT + EducationSvgWIDTH/2)
                            .attr("y", EducationMARGIN.TOP * 0.5)
                            .attr("font-size", EducationMARGIN.TOP * 0.3)
                            .attr("text-anchor", "middle")
                            .text("MMSE Education");

            MMSEdata = await loadCSVData("MMSE_data.csv");

            MMSEdata = MMSEdata.filter((d) => {
                return d.Age >= 65 && d.Age <= 100 && d.Gender >= 0 && d.Gender <= 1
                && d.Education >= 0 && d.Education <= 23 && d.MMSE >= 0 && d.MMSE <= 30
                && d.MMSE_Orient >= 0 && d.MMSE_Orient <= 10 && d.MMSE_Regist >= 0 && d.MMSE_Regist <= 3
                && d.MMSE_AttCal >= 0 && d.MMSE_AttCal <= 5 && d.MMSE_Recall >= 0 && d.MMSE_Recall <= 3
                && d.MMSE_Lang >= 0 && d.MMSE_Lang <= 9;
            });

            ////Education
            var MMSEEducationData = [
                {label: 'No', startAngle: 0, endAngle: 0, color: "rgb(154,205,50)", index: 0},
                {label: 'Elementary', startAngle: 0, endAngle: 0, color: "rgb(255,99,71)", index: 1},
                {label: 'Junior High', startAngle: 0, endAngle: 0, color: "rgb(64,224,208)", index: 2},
                {label: 'Senior High', startAngle: 0, endAngle: 0, color: "rgb(240,230,140)", index: 3},
                {label: 'College+', startAngle: 0, endAngle: 0, color: "rgb(123,104,238)", index: 4},
            ];
            
            var MMSEEducationLevel = d3.nest()
                                        .key((d)=> {
                                            if(Number(d.Education) == 0) {
                                                return 0;
                                            }else if(Number(d.Education) <= 6) {
                                                return 1;
                                            }else if(Number(d.Education) <= 9) {
                                                return 2;
                                            }else if(Number(d.Education) <= 12) {
                                                return 3;
                                            }else {
                                                return 4;
                                            }
                                        })
                                        .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                                        .rollup((v) => v.length)
                                        .entries(MMSEdata);

            console.log("MMSE Education");
            console.log(MMSEEducationLevel);
            
            for( let i = 0 ; i < 5 ; i++ ){
                if( i > 0 ){
                    MMSEEducationData[i].startAngle = MMSEEducationData[i-1].endAngle;
                };
                if( i < 4 ){
                    var amount = 0;
                    amount = MMSEEducationLevel[i].value;
                    MMSEEducationData[i].endAngle = MMSEEducationData[i].startAngle + 2*Math.PI*amount/MMSEdata.length;
                }
                else{
                    MMSEEducationData[i].endAngle = 2 * Math.PI;
                };
            }

            var EducationarcGenerator = d3.arc()
                                        .innerRadius(EducationInnerRadius)
                                        .outerRadius(EducationOuterRadius);
            
            //Education Chart
            var MMSEEducationChart = MMSEEducation.selectAll("path")
                                                    .exit().remove()
                                                    .data(MMSEEducationData)
                                                    .enter()
                                                    .append("path")
                                                    .attr("d", EducationarcGenerator)
                                                    .attr("fill", (d)=>d.color)
                                                    .attr("stroke", (d)=>d.color);    
                        
            //Legends
            var EducationLegendHeight = (EducationHeight-EducationMARGIN.TOP-EducationMARGIN.BOTTOM) * 0.7 * 0.9 / 5;
            var MMSEEducationLegendRects = MMSEEducationLegend.selectAll("rect")
                                                .exit().remove()
                                                .data(MMSEEducationData)
                                                .enter()
                                                .append("rect")
                                                .attr("x", EducationMARGIN.RIGHT*8/9*0.1)
                                                .attr("y", function(d,i){
                                                    return (EducationHeight-EducationMARGIN.TOP-EducationMARGIN.BOTTOM)*0.7*0.05 + EducationLegendHeight*i;
                                                })
                                                .attr("width", EducationLegendHeight * 0.8)
                                                .attr("height", EducationLegendHeight * 0.8)
                                                .attr("fill", function(d,i){
                                                    return d.color;
                                                });
            var MMSEEducationLegendTexts = MMSEEducationLegend.selectAll("text")
                                                .exit().remove()
                                                .data(MMSEEducationData)
                                                .enter()
                                                .append("text")
                                                .attr("x", EducationMARGIN.RIGHT*8/9*0.15 + EducationLegendHeight)
                                                .attr("y", function(d,i){
                                                    return (EducationHeight-EducationMARGIN.TOP-EducationMARGIN.BOTTOM)*0.7*0.05 + EducationLegendHeight*(i+0.6);
                                                })
                                                .attr("font-size", EducationLegendHeight * 0.65)
                                                .text(function(d){
                                                    return d.label;
                                                });

            ///click
            var EducationClicked = [0, 0, 0, 0, 0];
            MMSEEducationLegendRects.on("click", function(d, i) {
                for (let i = 0 ; i < MMSEEducationData.length ; i++) {
                    if (d3.color(MMSEEducationData[i].color).formatRgb() == d3.select(this).style("fill")) {
                        EducationClicked[i] += 1;
                    }
                }
        
                if (EducationClicked[0] == 2 || EducationClicked[1] == 2 || EducationClicked[2] == 2 || EducationClicked[3] == 2 || EducationClicked[4] == 2) {
                    delete MMSEconditions["edu"];
                    console.log(MMSEconditions);
        
                    UpdateMMSEEducationChart(MMSEdata);
                    EducationClicked[0] = 0;
                    EducationClicked[1] = 0;
                    EducationClicked[2] = 0;
                    EducationClicked[3] = 0;
                    EducationClicked[4] = 0;
        
        
                    //Update Age Chart   
                    UpdateAgeChart(MMSEdata, CDRdata);
        
                    //Update Gender Chart
                    UpdateMMSEGenderChart(MMSEdata);
        
                    //Update Hospital Chart
                    UpdateHospitalChart(MMSEdata, CDRdata);
        
                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                } else if (EducationClicked[0] == 1 || EducationClicked[1] == 1 || EducationClicked[2] == 1 || EducationClicked[3] == 1 || EducationClicked[4] == 1) {
                    MMSEconditions["edu"] = d;
                    console.log(MMSEconditions);
        
                    for (let i = 0 ; i < MMSEEducationData.length ; i++) {
                        if (d3.color(MMSEEducationData[i].color).formatRgb() == d3.select(this).style("fill")) {
                            EducationClicked[i] = 1;
                        } else {
                            EducationClicked[i] = 0;
                        }
                    }
                    UpdateMMSEEducationChart(MMSEdata);
                    
                    //Update Age Charts
                    UpdateAgeChart(MMSEdata, CDRdata);
        
                    //Update Gender Chart
                    UpdateMMSEGenderChart(MMSEdata);
        
                    //Update Hospital Chart
                    UpdateHospitalChart(MMSEdata, CDRdata);
        
                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                }
            });
        }
    }
}

main();

