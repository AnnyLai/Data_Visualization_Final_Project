

async function main() {
    const str_attr = localStorage.getItem("storageName")
    const fields = str_attr.split(',')
    //console.log(fields)

    CDRdata = await loadCSVData("CDR_data.csv");
            
    CDRdata = CDRdata.filter((d) => {
        return d.Age >= 65 && d.Age <= 100 && d.Gender >= 0 && d.Gender <= 1
        && d.Education >= 0 && d.Education <= 23 && d.CDR >= 0 && d.CDR <= 5
        && d.CDR_Memory >= 0 && d.CDR_Memory <= 5 && d.CDR_Orient >= 0 && d.CDR_Orient <= 5
        && d.CDR_ProbSolve >= 0 && d.CDR_ProbSolve <= 5 && d.CDR_Social >= 0 && d.CDR_Social <= 5
        && d.CDR_Home >= 0 && d.CDR_Home <= 5 && d.CDR_SelfCare >= 0 && d.CDR_SelfCare <= 5
        && d.SOB >= 0 && d.SOB <= 30;
    });

    MMSEdata = await loadCSVData("MMSE_data.csv");
    
    MMSEdata = MMSEdata.filter((d) => {
        return d.Age >= 65 && d.Age <= 100 && d.Gender >= 0 && d.Gender <= 1
        && d.Education >= 0 && d.Education <= 23 && d.MMSE >= 0 && d.MMSE <= 30
        && d.MMSE_Orient >= 0 && d.MMSE_Orient <= 10 && d.MMSE_Regist >= 0 && d.MMSE_Regist <= 3
        && d.MMSE_AttCal >= 0 && d.MMSE_AttCal <= 5 && d.MMSE_Recall >= 0 && d.MMSE_Recall <= 3
        && d.MMSE_Lang >= 0 && d.MMSE_Lang <= 9;
    });

    for(f of fields) {
        if(f.slice(0,3) == "CDR") {
            //Title
            gCDRAge.append("text")
                .attr("x", AgeMARGIN.LEFT + AgeSvgWIDTH/2)
                .attr("y", 0.8 * AgeMARGIN.TOP)
                .attr("font-size", AgeMARGIN.TOP * 0.5)
                .attr("text-anchor", "middle")
                .text("CDR Age");
            //X label
            gCDRAge.append("text")
                .attr("x", AgeMARGIN.LEFT + AgeSvgWIDTH/2)
                .attr("y", AgeMARGIN.TOP + AgeSvgHEIGHT + AgeMARGIN.BOTTOM*0.8)
                .attr("font-size", AgeMARGIN.BOTTOM * 0.35)
                .attr("text-anchor", "middle")
                .text("Age");
            //Y label
            gCDRAge.append("text")
                .attr("x", -(AgeMARGIN.TOP + AgeSvgHEIGHT/2))
                .attr("y", AgeMARGIN.LEFT*0.35)
                .attr("font-size", AgeMARGIN.LEFT * 0.3)
                .attr("text-anchor", "middle")
                .attr("transform", "rotate(-90)")
                .text("Count");
            
            var CDRAges = d3.nest()
                            .key((d) => d.Age)
                            .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                            .rollup((v) => v.length)
                            .entries(CDRdata);

            console.log("CDR Age");
            console.log(CDRAges);

            var AgeXscale = d3.scaleLinear()
                                .domain([64.5,100.5])
                                .range([0,AgeSvgWIDTH]);
            
            var CDRAgeYscale = d3.scaleLinear()
                                .domain([0, d3.max(CDRAges, function(d) { 
                                        return Number(d.value);
                                })])
                                .range([AgeSvgHEIGHT, 0]);

            var AgeBarWidth = AgeXscale(65.5);
            var AgeBaxis = d3.axisBottom(AgeXscale).ticks(10);
                
            //CDR X axis and Y axis
            var CDRAgeLaxis = d3.axisLeft(CDRAgeYscale).ticks(8);
            gCDRAge.append("g")
                .attr("transform", `translate(${AgeMARGIN.LEFT},${AgeMARGIN.TOP})`)
                .call(CDRAgeLaxis);
            gCDRAge.append("g")
                .attr("transform", `translate(${AgeMARGIN.LEFT},${AgeMARGIN.TOP + AgeSvgHEIGHT})`)
                .call(AgeBaxis);
            //CDR Ages
            CDROutline = gCDRAgeOutline.selectAll("rect")
                                            .exit().remove()
                                            .data(CDRAges)
                                            .enter()
                                            .append("rect")
                                            .attr("x", function(d){
                                                return AgeXscale(Number(d.key)) - AgeBarWidth/2 + AgeBarWidth*0.035;
                                            })
                                            .attr("y", function(d){
                                                return CDRAgeYscale(Number(d.value));
                                            })
                                            .attr("width", d => {
                                                return AgeBarWidth;
                                            })
                                            .attr("height", function(d){
                                                return AgeSvgHEIGHT - CDRAgeYscale(Number(d.value));
                                            })
                                            .attr("stroke", "black")
                                            .attr("fill", "rgba(0,0,0,0)");
            
            CDRFill = gCDRAgeFill.selectAll("rect")
                                        .exit().remove()
                                        .data(CDRAges)
                                        .enter()
                                        .append("rect")
                                        .attr("x", function(d){
                                            return AgeXscale(Number(d.key)) - AgeBarWidth/2 + AgeBarWidth*0.06;
                                        })
                                        .attr("y", function(d){
                                            return CDRAgeYscale(Number(d.value)) + AgeBarWidth*0.025;
                                        })
                                        .attr("width", d => {
                                            return AgeBarWidth * 0.95;
                                        })
                                        .attr("height", function(d){
                                            if(AgeSvgHEIGHT-CDRAgeYscale(Number(d.value)) < AgeBarWidth*0.025) {
                                                return 0;
                                            }else{
                                                return AgeSvgHEIGHT - CDRAgeYscale(Number(d.value)) - AgeBarWidth*0.025;
                                            }
                                        })
                                        .attr("stroke", "rgba(0,0,0,0)")
                                        .attr("fill", "rgb(136, 196, 243)");

            //Age boundary
            var selections = [65, 70, 75, 80, 85]
            
            var CDRselection = CDRchoice.selectAll("rect")
                                        .exit().remove()
                                        .data(selections)
                                        .enter()
                                        .append("rect")
                                        .attr("x", function(d){
                                            return AgeXscale(d) - AgeBarWidth/2 + AgeBarWidth*0.06;
                                        })
                                        .attr("y", 0)
                                        .attr("width", (d, i) => {
                                            if (i == selections.length - 1) {
                                                return (AgeXscale(100.5))-(AgeXscale(d)-AgeBarWidth/2+AgeBarWidth*0.06);
                                            } else {
                                                return (AgeXscale(selections[i+1])-AgeBarWidth/2+AgeBarWidth*0.06)-(AgeXscale(d)-AgeBarWidth/2+AgeBarWidth*0.06);
                                            }
                                        })
                                        .attr("height", AgeSvgHEIGHT)
                                        .attr("stroke", "black")
                                        .attr("fill", "rgb(220,220,220)");

            ///click
            var AgeClicked = [0, 0, 0, 0, 0];
            CDRselection.on("click", function(d, i) {
                for (let i = 0 ; i < selections.length ; i++) {
                    if ((AgeXscale(selections[i])-AgeBarWidth/2+AgeBarWidth*0.06) == d3.select(this).attr("x")) {
                        AgeClicked[i] += 1;
                    }
                }

                if (AgeClicked[0] == 2 || AgeClicked[1] == 2 || AgeClicked[2] == 2 || AgeClicked[3] == 2 || AgeClicked[4] == 2) {
                    delete CDRconditions["age"];
                    console.log(CDRconditions);

                    AgeClicked[0] = 0;
                    AgeClicked[1] = 0;
                    AgeClicked[2] = 0;
                    AgeClicked[3] = 0;
                    UpdateAgeChart(MMSEdata, CDRdata);
                    CDRselection.attr("stroke", "black")
                                    .attr("fill", "rgb(220,220,220)");

                    //Update Gender Chart
                    UpdateCDRGenderChart(CDRdata);

                    //Update Education Chart
                    UpdateCDREducationChart(CDRdata);

                    //Update Hospital Chart   
                    UpdateHospitalChart(MMSEdata, CDRdata);

                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                } else if (AgeClicked[0] == 1 || AgeClicked[1] == 1 || AgeClicked[2] == 1 || AgeClicked[3] == 1 || AgeClicked[4] == 1) {
                    CDRconditions["age"] = d;
                    console.log(CDRconditions);
                    
                    for (let i = 0 ; i < selections.length ; i++) {
                        if ((AgeXscale(selections[i])-AgeBarWidth/2+AgeBarWidth*0.06) == d3.select(this).attr("x")) {
                            AgeClicked[i] = 1;
                        } else {
                            AgeClicked[i] = 0;
                        }
                    }
                    UpdateAgeChart(MMSEdata, CDRdata);
                    CDRselection.attr("stroke", (d, i) => {
                                    if(AgeClicked[i] == 1) {
                                        return "black";
                                    } else {
                                        return "gray";
                                    }
                                })
                                .attr("fill", (d, i) => {
                                    if(AgeClicked[i] == 1) {
                                        return "rgb(220,220,220)";
                                    } else {
                                        return "rgba(220,220,220,0.6)";
                                    }
                                });
                    
                    //Update Gender Chart
                    UpdateCDRGenderChart(CDRdata);

                    //Update Education Chart
                    UpdateCDREducationChart(CDRdata);
                    
                    //Update Hospital Charts
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

            gMMSEAge.append("text")
                .attr("x", AgeMARGIN.LEFT + AgeSvgWIDTH/2)
                .attr("y", 0.8 * AgeMARGIN.TOP)
                .attr("font-size", AgeMARGIN.TOP * 0.5)
                .attr("text-anchor", "middle")
                .text("MMSE Age");

            gMMSEAge.append("text")
                    .attr("x", AgeMARGIN.LEFT + AgeSvgWIDTH/2)
                    .attr("y", AgeMARGIN.TOP + AgeSvgHEIGHT + AgeMARGIN.BOTTOM*0.8)
                    .attr("font-size", AgeMARGIN.BOTTOM * 0.35)
                    .attr("text-anchor", "middle")
                    .text("Age");

            gMMSEAge.append("text")
                    .attr("x", -(AgeMARGIN.TOP + AgeSvgHEIGHT/2))
                    .attr("y", AgeMARGIN.LEFT*0.35)
                    .attr("font-size", AgeMARGIN.LEFT * 0.3)
                    .attr("text-anchor", "middle")
                    .attr("transform", "rotate(-90)")
                    .text("Count");

            var MMSEAges = d3.nest()
                            .key((d) => d.Age)
                            .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                            .rollup((v) => v.length)
                            .entries(MMSEdata);

            console.log("MMSE Age");
            console.log(MMSEAges);

            var AgeXscale = d3.scaleLinear()
                                .domain([64.5,100.5])
                                .range([0,AgeSvgWIDTH]);

            var MMSEAgeYscale = d3.scaleLinear()
                                    .domain([0, d3.max(MMSEAges, function(d) { 
                                        return Number(d.value);
                                    })])
                                    .range([AgeSvgHEIGHT, 0]); 

            var AgeBarWidth = AgeXscale(65.5);
            var AgeBaxis = d3.axisBottom(AgeXscale).ticks(10);   
            
            //MMSE X axis and Y axis
            var MMSEAgeLaxis = d3.axisLeft(MMSEAgeYscale).ticks(8);
            gMMSEAge.append("g")
                .attr("transform", `translate(${AgeMARGIN.LEFT},${AgeMARGIN.TOP})`)
                .call(MMSEAgeLaxis);
            gMMSEAge.append("g")
                .attr("transform", `translate(${AgeMARGIN.LEFT},${AgeMARGIN.TOP + AgeSvgHEIGHT})`)
                .call(AgeBaxis);

            //MMSE Ages
            MMSEOutline = gMMSEAgeOutline.selectAll("rect")
                                            .exit().remove()
                                            .data(MMSEAges)
                                            .enter()
                                            .append("rect")
                                            .attr("x", function(d){
                                                return AgeXscale(Number(d.key)) - AgeBarWidth/2 + AgeBarWidth*0.035;
                                            })
                                            .attr("y", function(d){
                                                return MMSEAgeYscale(Number(d.value));
                                            })
                                            .attr("width", d => {
                                                return AgeBarWidth;
                                            })
                                            .attr("height", function(d){
                                                return AgeSvgHEIGHT - MMSEAgeYscale(Number(d.value));
                                            })
                                            .attr("stroke", "black")
                                            .attr("fill", "rgba(0,0,0,0)");
            
            MMSEFill = gMMSEAgeFill.selectAll("rect")
                                        .exit().remove()
                                        .data(MMSEAges)
                                        .enter()
                                        .append("rect")
                                        .attr("x", function(d){
                                            return AgeXscale(Number(d.key)) - AgeBarWidth/2 + AgeBarWidth*0.06;
                                        })
                                        .attr("y", function(d){
                                            return MMSEAgeYscale(Number(d.value)) + AgeBarWidth*0.025;
                                        })
                                        .attr("width", d => {
                                            return AgeBarWidth * 0.95;
                                        })
                                        .attr("height", function(d){
                                            if(AgeSvgHEIGHT-MMSEAgeYscale(Number(d.value)) < AgeBarWidth*0.025) {
                                                return 0;
                                            }else{
                                                return AgeSvgHEIGHT - MMSEAgeYscale(Number(d.value)) - AgeBarWidth*0.025;
                                            }
                                        })
                                        .attr("stroke", "rgba(0,0,0,0)")
                                        .attr("fill", "rgb(136, 196, 243)");

            var selections = [65, 70, 75, 80, 85]

            var MMSEselection = MMSEchoice.selectAll("rect")
                                            .exit().remove()
                                            .data(selections)
                                            .enter()
                                            .append("rect")
                                            .attr("x", function(d){
                                                return AgeXscale(d) - AgeBarWidth/2 + AgeBarWidth*0.06;
                                            })
                                            .attr("y", 0)
                                            .attr("width", (d, i) => {
                                                if (i == selections.length - 1) {
                                                    return (AgeXscale(100.5))-(AgeXscale(d)-AgeBarWidth/2+AgeBarWidth*0.06);
                                                } else {
                                                    return (AgeXscale(selections[i+1])-AgeBarWidth/2+AgeBarWidth*0.06)-(AgeXscale(d)-AgeBarWidth/2+AgeBarWidth*0.06);
                                                }
                                            })
                                            .attr("height", AgeSvgHEIGHT)
                                            .attr("stroke", "black")
                                            .attr("fill", "rgb(220,220,220)");

            ///click
            var AgeClicked = [0, 0, 0, 0, 0];
            MMSEselection.on("click", function(d, i) {
                for (let i = 0 ; i < selections.length ; i++) {
                    if ((AgeXscale(selections[i])-AgeBarWidth/2+AgeBarWidth*0.06) == d3.select(this).attr("x")) {
                        AgeClicked[i] += 1;
                    }
                }

                if (AgeClicked[0] == 2 || AgeClicked[1] == 2 || AgeClicked[2] == 2 || AgeClicked[3] == 2 || AgeClicked[4] == 2) {
                    delete MMSEconditions["age"];
                    console.log(MMSEconditions);
                    
                    AgeClicked[0] = 0;
                    AgeClicked[1] = 0;
                    AgeClicked[2] = 0;
                    AgeClicked[3] = 0;
                    AgeClicked[4] = 0;
                    UpdateAgeChart(MMSEdata, CDRdata);
                    MMSEselection.attr("stroke", "black")
                                    .attr("fill", "rgb(220,220,220)");

                    //Update Gender Chart
                    UpdateMMSEGenderChart(MMSEdata);

                    //Update Education Chart
                    UpdateMMSEEducationChart(MMSEdata);

                    //Update Hospital Chart   
                    UpdateHospitalChart(MMSEdata, CDRdata);

                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                } else if (AgeClicked[0] == 1 || AgeClicked[1] == 1 || AgeClicked[2] == 1 || AgeClicked[3] == 1 || AgeClicked[4] == 1) {
                    MMSEconditions["age"] = d;
                    console.log(MMSEconditions);

                    for (let i = 0 ; i < selections.length ; i++) {
                        if ((AgeXscale(selections[i])-AgeBarWidth/2+AgeBarWidth*0.06) == d3.select(this).attr("x")) {
                            AgeClicked[i] = 1;
                        } else {
                            AgeClicked[i] = 0;
                        }
                    }
                    UpdateAgeChart(MMSEdata, CDRdata);
                    MMSEselection.attr("stroke", (d, i) => {
                                        if(AgeClicked[i] == 1) {
                                            return "black";
                                        } else {
                                            return "gray";
                                        }
                                    })
                                    .attr("fill", (d, i) => {
                                        if(AgeClicked[i] == 1) {
                                            return "rgb(220,220,220)";
                                        } else {
                                            return "rgba(220,220,220,0.6)";
                                        }
                                    });
                    
                    //Update Gender Chart
                    UpdateMMSEGenderChart(MMSEdata);

                    //Update Education Chart
                    UpdateMMSEEducationChart(MMSEdata);
                    
                    //Update Hospital Charts
                    UpdateHospitalChart(MMSEdata, CDRdata);

                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                }
            });
        }
    }
}

main();