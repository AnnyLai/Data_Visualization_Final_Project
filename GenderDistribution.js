//Title



async function main() {
    const str_attr = localStorage.getItem("storageName")
    const fields = str_attr.split(',')
    //console.log(fields)

    for(f of fields) {
        if(f.slice(0,3) == "CDR") {
            gCDRGender.append("text")
                        .attr("x", GenderMARGIN.LEFT + GenderSvgWIDTH/2)
                        .attr("y", GenderMARGIN.TOP * 0.5)
                        .attr("font-size", GenderMARGIN.TOP * 0.3)
                        .attr("text-anchor", "middle")
                        .text("CDR Gender")

            CDRdata = await loadCSVData("CDR_data.csv");

            CDRdata = CDRdata.filter((d) => {
                return d.Age >= 65 && d.Age <= 100 && d.Gender >= 0 && d.Gender <= 1
                && d.Education >= 0 && d.Education <= 23 && d.CDR >= 0 && d.CDR <= 5
                && d.CDR_Memory >= 0 && d.CDR_Memory <= 5 && d.CDR_Orient >= 0 && d.CDR_Orient <= 5
                && d.CDR_ProbSolve >= 0 && d.CDR_ProbSolve <= 5 && d.CDR_Social >= 0 && d.CDR_Social <= 5
                && d.CDR_Home >= 0 && d.CDR_Home <= 5 && d.CDR_SelfCare >= 0 && d.CDR_SelfCare <= 5
                && d.SOB >= 0 && d.SOB <= 30;
            });

            var CDRGenderData = [
                {label: 'Male', startAngle: 0, endAngle: 0, color: "rgb(100,149,237)", index: 0},
                {label: 'Female', startAngle: 0, endAngle: 0, color: "rgb(102,205,170)", index: 1},
            ];

            var CDRGenders = d3.nest()
                                .key((d)=> {
                                    if (Number(d.Gender) == 0) {
                                        return 0;
                                    }else if (Number(d.Gender) == 1) {
                                        return 1;
                                    }
                                })
                                .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                                .rollup((v) => v.length)
                                .entries(CDRdata);

            console.log("CDR Gender")
            console.log(CDRGenders)

            for( let i = 0 ; i < 2 ; i++ ){
                if( i > 0 ){
                    CDRGenderData[i].startAngle = CDRGenderData[i-1].endAngle;
                };
                if( i < 1 ){
                    var amount = 0;
                    amount = CDRGenders[i].value;
                    CDRGenderData[i].endAngle = CDRGenderData[i].startAngle + 2*Math.PI*amount/(CDRGenders[0].value+CDRGenders[1].value);
                }
                else{
                    CDRGenderData[i].endAngle = 2 * Math.PI;
                };
            }
        
            var GenderarcGenerator = d3.arc()
                                    .innerRadius(GenderInnerRadius)
                                    .outerRadius(GenderOuterRadius);

            var CDRGenderChart = CDRGender.selectAll("path")
                                            .exit().remove()
                                            .data(CDRGenderData)
                                            .enter()
                                            .append("path")
                                            .attr("d", GenderarcGenerator)
                                            .attr("fill", (d)=>d.color)
                                            .attr("stroke", (d)=>d.color); 

            var GenderLegendHeight = (GenderHeight-GenderMARGIN.TOP-GenderMARGIN.BOTTOM) * 0.7 * 0.9 / 5;

            var CDRGenderLegendRects = CDRGenderLegend.selectAll("rect")
                                                        .exit().remove()
                                                        .data(CDRGenderData)
                                                        .enter()
                                                        .append("rect")
                                                        .attr("x", GenderMARGIN.RIGHT*8/9*0.1)
                                                        .attr("y", function(d,i){
                                                            return (GenderHeight-GenderMARGIN.TOP-GenderMARGIN.BOTTOM)*0.7*0.05 + GenderLegendHeight*i;
                                                        })
                                                        .attr("width", GenderLegendHeight * 0.8)
                                                        .attr("height", GenderLegendHeight * 0.8)
                                                        .attr("fill", function(d,i){
                                                            return d.color;
                                                        });
            var CDRGenderLegendTexts = CDRGenderLegend.selectAll("text")
                                                        .exit().remove()
                                                        .data(CDRGenderData)
                                                        .enter()
                                                        .append("text")
                                                        .attr("x", GenderMARGIN.RIGHT*8/9*0.15 + GenderLegendHeight)
                                                        .attr("y", function(d,i){
                                                            return (GenderHeight-GenderMARGIN.TOP-GenderMARGIN.BOTTOM)*0.7*0.05 + GenderLegendHeight*(i+0.6);
                                                        })
                                                        .attr("font-size", GenderLegendHeight * 0.65)
                                                        .text(function(d){
                                                            return d.label;
                                                        });

            var GenderClicked = [0, 0];
            CDRGenderLegendRects.on("click", function(d, i) {
                for (let i = 0 ; i < CDRGenderData.length ; i++) {
                    if (d3.color(CDRGenderData[i].color).formatRgb() == d3.select(this).style("fill")) {
                        GenderClicked[i] += 1;
                    }
                }

                if (GenderClicked[0] == 2 || GenderClicked[1] == 2) {
                    delete CDRconditions["gen"];
                    console.log(CDRconditions);

                    UpdateCDRGenderChart(CDRdata);
                    GenderClicked[0] = 0;
                    GenderClicked[1] = 0;

                    //Update Age Chart   
                    UpdateAgeChart(MMSEdata, CDRdata);

                    //Update Education Chart
                    UpdateCDREducationChart(CDRdata);

                    //Update Hospital Chart
                    UpdateHospitalChart(MMSEdata, CDRdata);

                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                } else if (GenderClicked[0] == 1 || GenderClicked[1] == 1) {
                    CDRconditions["gen"] = d;
                    console.log(CDRconditions);

                    for (let i = 0 ; i < CDRGenderData.length ; i++) {
                        if (d3.color(CDRGenderData[i].color).formatRgb() == d3.select(this).style("fill")) {
                            GenderClicked[i] = 1;
                        } else {
                            GenderClicked[i] = 0;
                        }
                    }
                    UpdateCDRGenderChart(CDRdata);
                    
                    //Update Age Charts
                    UpdateAgeChart(MMSEdata, CDRdata);
                    
                    //Update Education Chart
                    UpdateCDREducationChart(CDRdata);

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
            
            gMMSEGender.append("text")
                        .attr("x", GenderMARGIN.LEFT + GenderSvgWIDTH/2)
                        .attr("y", GenderMARGIN.TOP * 0.5)
                        .attr("font-size", GenderMARGIN.TOP * 0.3)
                        .attr("text-anchor", "middle")
                        .text("MMSE Gender")

            MMSEdata = await loadCSVData("MMSE_data.csv");

            MMSEdata = MMSEdata.filter((d) => {
                return d.Age >= 65 && d.Age <= 100 && d.Gender >= 0 && d.Gender <= 1
                && d.Education >= 0 && d.Education <= 23 && d.MMSE >= 0 && d.MMSE <= 30
                && d.MMSE_Orient >= 0 && d.MMSE_Orient <= 10 && d.MMSE_Regist >= 0 && d.MMSE_Regist <= 3
                && d.MMSE_AttCal >= 0 && d.MMSE_AttCal <= 5 && d.MMSE_Recall >= 0 && d.MMSE_Recall <= 3
                && d.MMSE_Lang >= 0 && d.MMSE_Lang <= 9;
            });
            
            var MMSEGenderData = [
                {label: 'Male', startAngle: 0, endAngle: 0, color: "rgb(100,149,237)", index: 0},
                {label: 'Female', startAngle: 0, endAngle: 0, color: "rgb(102,205,170)", index: 1},
            ];

            var MMSEGenders = d3.nest()
                                .key((d)=> {
                                    if (Number(d.Gender) == 0) {
                                        return 0;
                                    }else if (Number(d.Gender) == 1) {
                                        return 1;
                                    }
                                })
                                .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                                .rollup((v) => v.length)
                                .entries(MMSEdata);

            console.log("MMSE Gender")
            console.log(MMSEGenders)

            for( let i = 0 ; i < 2 ; i++ ){
                if( i > 0 ){
                    MMSEGenderData[i].startAngle = MMSEGenderData[i-1].endAngle;
                };
                if( i < 1 ){
                    var amount = 0;
                    amount = MMSEGenders[i].value;
                    MMSEGenderData[i].endAngle = MMSEGenderData[i].startAngle + 2*Math.PI*amount/(MMSEGenders[0].value+MMSEGenders[1].value);
                }
                else{
                    MMSEGenderData[i].endAngle = 2 * Math.PI;
                };
            }

            var GenderarcGenerator = d3.arc()
                                    .innerRadius(GenderInnerRadius)
                                    .outerRadius(GenderOuterRadius);

            //Gender Chart
            var MMSEGenderChart = MMSEGender.selectAll("path")
                                            .exit().remove()
                                            .data(MMSEGenderData)
                                            .enter()
                                            .append("path")
                                            .attr("d", GenderarcGenerator)
                                            .attr("fill", (d)=>d.color)
                                            .attr("stroke", (d)=>d.color);            
            
            //Legends
            var GenderLegendHeight = (GenderHeight-GenderMARGIN.TOP-GenderMARGIN.BOTTOM) * 0.7 * 0.9 / 5;
            var MMSEGenderLegendRects = MMSEGenderLegend.selectAll("rect")
                                                        .exit().remove()
                                                        .data(MMSEGenderData)
                                                        .enter()
                                                        .append("rect")
                                                        .attr("x", GenderMARGIN.RIGHT*8/9*0.1)
                                                        .attr("y", function(d,i){
                                                            return (GenderHeight-GenderMARGIN.TOP-GenderMARGIN.BOTTOM)*0.7*0.05 + GenderLegendHeight*i;
                                                        })
                                                        .attr("width", GenderLegendHeight * 0.8)
                                                        .attr("height", GenderLegendHeight * 0.8)
                                                        .attr("fill", function(d,i){
                                                            return d.color;
                                                        });
            var MMSEGenderLegendTexts = MMSEGenderLegend.selectAll("text")
                                                        .exit().remove()
                                                        .data(MMSEGenderData)
                                                        .enter()
                                                        .append("text")
                                                        .attr("x", GenderMARGIN.RIGHT*8/9*0.15 + GenderLegendHeight)
                                                        .attr("y", function(d,i){
                                                            return (GenderHeight-GenderMARGIN.TOP-GenderMARGIN.BOTTOM)*0.7*0.05 + GenderLegendHeight*(i+0.6);
                                                        })
                                                        .attr("font-size", GenderLegendHeight * 0.65)
                                                        .text(function(d){
                                                            return d.label;
                                                        });

            var GenderClicked = [0, 0];
            MMSEGenderLegendRects.on("click", function(d, i) {
                for (let i = 0 ; i < MMSEGenderData.length ; i++) {
                    if (d3.color(MMSEGenderData[i].color).formatRgb() == d3.select(this).style("fill")) {
                        GenderClicked[i] += 1;
                    }
                }

                if (GenderClicked[0] == 2 || GenderClicked[1] == 2) {
                    delete MMSEconditions["gen"];
                    console.log(MMSEconditions);

                    UpdateMMSEGenderChart(MMSEdata);
                    GenderClicked[0] = 0;
                    GenderClicked[1] = 0;

                    //Update Age Chart   
                    UpdateAgeChart(MMSEdata, CDRdata);

                    //Update Education Chart
                    UpdateMMSEEducationChart(MMSEdata);

                    //Update Hospital Chart
                    UpdateHospitalChart(MMSEdata, CDRdata);

                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                } else if (GenderClicked[0] == 1 || GenderClicked[1] == 1) {
                    MMSEconditions["gen"] = d;
                    console.log(MMSEconditions);

                    for (let i = 0 ; i < MMSEGenderData.length ; i++) {
                        if (d3.color(MMSEGenderData[i].color).formatRgb() == d3.select(this).style("fill")) {
                            GenderClicked[i] = 1;
                        } else {
                            GenderClicked[i] = 0;
                        }
                    }
                    UpdateMMSEGenderChart(MMSEdata);
                    
                    //Update Age Charts
                    UpdateAgeChart(MMSEdata, CDRdata);
                    
                    //Update Education Chart
                    UpdateMMSEEducationChart(MMSEdata);

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