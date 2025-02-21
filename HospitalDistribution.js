
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
            gCDRHospital.append("text")
                        .attr("x", HospitalMARGIN.LEFT + HospitalSvgWIDTH/2)
                        .attr("y", 0.8 * HospitalMARGIN.TOP)
                        .attr("font-size", HospitalMARGIN.TOP * 0.5)
                        .attr("text-anchor", "middle")
                        .text("CDR Hospital");

            gCDRHospital.append("text")
                        .attr("x", HospitalMARGIN.LEFT + HospitalSvgWIDTH/2)
                        .attr("y", HospitalMARGIN.TOP + HospitalSvgHEIGHT + HospitalMARGIN.BOTTOM*0.8)
                        .attr("font-size", HospitalMARGIN.BOTTOM * 0.35)
                        .attr("text-anchor", "middle")
                        .text("Count");

            gCDRHospital.append("text")
                        .attr("x", -(HospitalMARGIN.TOP + HospitalSvgHEIGHT/2))
                        .attr("y", HospitalMARGIN.LEFT*0.4)
                        .attr("font-size", HospitalMARGIN.LEFT * 0.3)
                        .attr("text-anchor", "middle")
                        .attr("transform", "rotate(-90)")
                        .text("hospital id");

            //CDR hospital id Data
            var CDRHospitals = d3.nest()
                            .key((d) => d.hospital_id)
                            .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))//
                            .rollup((v) => v.length)
                            .entries(CDRdata);

            console.log("CDR Hospitals");
            console.log(CDRHospitals);

            var HospitalYscale = d3.scaleLinear()
                                    .domain([0.5,4.5])
                                    .range([HospitalSvgHEIGHT, 0]);

            var CDRHospitalXscale = d3.scaleLinear()
                                        .domain([0, d3.max(CDRHospitals, function(d) { 
                                            return Number(d.value);
                                        })])
                                        .range([0, HospitalSvgWIDTH]);

            var HospitalBarWidth = HospitalYscale(3.5);
            var HospitalLaxis = d3.axisLeft(HospitalYscale).ticks(4);

            //CDR X axis and Y axis
            var CDRHospitalBaxis = d3.axisBottom(CDRHospitalXscale).ticks(8);
            gCDRHospital.append("g")
                .attr("transform", `translate(${HospitalMARGIN.LEFT},${HospitalMARGIN.TOP + HospitalSvgHEIGHT})`)
                .call(CDRHospitalBaxis);
            gCDRHospital.append("g")
                .attr("transform", `translate(${HospitalMARGIN.LEFT},${HospitalMARGIN.TOP})`)
                .call(HospitalLaxis);

            //CDR Hospitals
            CDROutline = gCDRHospitalOutline.selectAll("rect")
                                            .exit().remove()
                                            .data(CDRHospitals)
                                            .enter()
                                            .append("rect")
                                            .attr("x", function(d){
                                                return 0;
                                            })
                                            .attr("y", function(d){
                                                return HospitalYscale(Number(d.key)) - HospitalBarWidth/2 + 0.5;
                                            })
                                            .attr("width", d => {
                                                return CDRHospitalXscale(Number(d.value));
                                            })
                                            .attr("height", function(d){
                                                return HospitalBarWidth;
                                            })
                                            .attr("stroke", "black")
                                            .attr("fill", "rgba(0,0,0,0)");

            CDRFill = gCDRHospitalFill.selectAll("rect")
                                        .exit().remove()
                                        .data(CDRHospitals)
                                        .enter()
                                        .append("rect")
                                        .attr("x", function(d){
                                            return 0;
                                        })
                                        .attr("y", function(d){
                                            return HospitalYscale(Number(d.key)) - HospitalBarWidth/2 + 1;
                                        })
                                        .attr("width", d => {
                                            if(CDRHospitalXscale(Number(d.value)) < 0.5) {
                                                return 0;
                                            }
                                            return CDRHospitalXscale(Number(d.value)) - 0.5;
                                        })
                                        .attr("height", function(d){
                                            return HospitalBarWidth - 1;
                                        })
                                        .attr("stroke", "rgba(0,0,0,0)")
                                        .attr("fill", "rgb(136, 196, 243)");

            ///click
            var HospitalClicked = [0, 0, 0, 0];   

            CDRFill.on("click", function(d, i) {
                for (let i = 0 ; i < CDRHospitals.length ; i++) {
                    if ((HospitalYscale(Number(CDRHospitals[i].key))-HospitalBarWidth/2+1) == d3.select(this).attr("y")) {
                        HospitalClicked[i] += 1;
                    }
                }

                if (HospitalClicked[0] == 2 || HospitalClicked[1] == 2 || HospitalClicked[2] == 2 || HospitalClicked[3] == 2) {
                    delete CDRconditions["hos"];
                    console.log(CDRconditions);

                    UpdateHospitalChart(MMSEdata, CDRdata);
                    HospitalClicked[0] = 0;
                    HospitalClicked[1] = 0;
                    HospitalClicked[2] = 0;
                    HospitalClicked[3] = 0;


                    //Update Age Chart   
                    UpdateAgeChart(MMSEdata, CDRdata);

                    //Update Gender Chart
                    UpdateCDRGenderChart(CDRdata);

                    //Update Education Chart
                    UpdateCDREducationChart(CDRdata);

                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                } else if (HospitalClicked[0] == 1 || HospitalClicked[1] == 1 || HospitalClicked[2] == 1 || HospitalClicked[3] == 1) {
                    CDRconditions["hos"] = d;
                    console.log(CDRconditions);
                    
                    for (let i = 0 ; i < CDRHospitals.length ; i++) {
                        if ((HospitalYscale(Number(CDRHospitals[i].key))-HospitalBarWidth/2+1) == d3.select(this).attr("y")) {
                            HospitalClicked[i] = 1;
                        } else {
                            HospitalClicked[i] = 0;
                        }
                    }
                    UpdateHospitalChart(MMSEdata, CDRdata);
                    
                    //Update Age Charts
                    UpdateAgeChart(MMSEdata, CDRdata);
                    
                    //Update Gender Chart
                    UpdateCDRGenderChart(CDRdata);

                    //Update Education Chart
                    UpdateCDREducationChart(CDRdata);

                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                }
            });
        }
        if(f.slice(0,3) == "MMS") {
            if( fields[0] == "" ) {
                gMMSE.attr("transform", `translate(0, 0)`);
            }
            
            //Title
            gMMSEHospital.append("text")
                .attr("x", HospitalMARGIN.LEFT + HospitalSvgWIDTH/2)
                .attr("y", 0.8 * HospitalMARGIN.TOP)
                .attr("font-size", HospitalMARGIN.TOP * 0.5)
                .attr("text-anchor", "middle")
                .text("MMSE Hospital");

            //X label
            gMMSEHospital.append("text")
                .attr("x", HospitalMARGIN.LEFT + HospitalSvgWIDTH/2)
                .attr("y", HospitalMARGIN.TOP + HospitalSvgHEIGHT + HospitalMARGIN.BOTTOM*0.8)
                .attr("font-size", HospitalMARGIN.BOTTOM * 0.35)
                .attr("text-anchor", "middle")
                .text("Count");

            //Y label
            gMMSEHospital.append("text")
                .attr("x", -(HospitalMARGIN.TOP + HospitalSvgHEIGHT/2))
                .attr("y", HospitalMARGIN.LEFT*0.4)
                .attr("font-size", HospitalMARGIN.LEFT * 0.3)
                .attr("text-anchor", "middle")
                .attr("transform", "rotate(-90)")
                .text("hospital id");

            //MMSE hospital id Data
            var MMSEHospitals = d3.nest()
                            .key((d) => d.hospital_id)
                            .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))//
                            .rollup((v) => v.length)
                            .entries(MMSEdata);
            
            console.log("MMSE Hospitals");
            console.log(MMSEHospitals);
            
            var HospitalYscale = d3.scaleLinear()
                                .domain([0.5,4.5])
                                .range([HospitalSvgHEIGHT, 0]);

            var MMSEHospitalXscale = d3.scaleLinear()
                                        .domain([0, d3.max(MMSEHospitals, function(d) { 
                                            return Number(d.value);
                                        })])
                                        .range([0, HospitalSvgWIDTH]);

            var HospitalBarWidth = HospitalYscale(3.5);
            var HospitalLaxis = d3.axisLeft(HospitalYscale).ticks(4);

            //MMSE X axis and Y axis
            var MMSEHospitalBaxis = d3.axisBottom(MMSEHospitalXscale).ticks(8);
            gMMSEHospital.append("g")
                .attr("transform", `translate(${HospitalMARGIN.LEFT},${HospitalMARGIN.TOP + HospitalSvgHEIGHT})`)
                .call(MMSEHospitalBaxis);
            gMMSEHospital.append("g")
                .attr("transform", `translate(${HospitalMARGIN.LEFT},${HospitalMARGIN.TOP})`)
                .call(HospitalLaxis);

            //MMSE Hospitals
            MMSEOutline = gMMSEHospitalOutline.selectAll("rect")
                                                .exit().remove()
                                                .data(MMSEHospitals)
                                                .enter()
                                                .append("rect")
                                                .attr("x", function(d) {
                                                    return 0;
                                                })
                                                .attr("y", function(d) {
                                                    return HospitalYscale(Number(d.key)) - HospitalBarWidth/2 + 0.5;
                                                })
                                                .attr("width", d => {
                                                    return MMSEHospitalXscale(Number(d.value));
                                                })
                                                .attr("height", function(d) {
                                                    return HospitalBarWidth;
                                                })
                                                .attr("stroke", "black")
                                                .attr("fill", "rgba(0,0,0,0)");
            
            MMSEFill = gMMSEHospitalFill.selectAll("rect")
                                        .exit().remove()
                                        .data(MMSEHospitals)
                                        .enter()
                                        .append("rect")
                                        .attr("x", function(d) {
                                            return 0;
                                        })
                                        .attr("y", function(d) {
                                            return HospitalYscale(Number(d.key)) - HospitalBarWidth/2 + 1;
                                        })
                                        .attr("width", d => {
                                            if(MMSEHospitalXscale(Number(d.value)) < 0.5) {
                                                return 0;
                                            }
                                            return MMSEHospitalXscale(Number(d.value)) - 0.5;
                                        })
                                        .attr("height", function(d) {
                                            return HospitalBarWidth - 1;
                                        })
                                        .attr("stroke", "rgba(0,0,0,0)")
                                        .attr("fill", "rgb(136, 196, 243)");

            ///click
            var HospitalClicked = [0, 0, 0, 0];
            MMSEFill.on("click", function(d, i) {
                for (let i = 0 ; i < MMSEHospitals.length ; i++) {
                    if ((HospitalYscale(Number(MMSEHospitals[i].key))-HospitalBarWidth/2+1) == d3.select(this).attr("y")) {
                        HospitalClicked[i] += 1;
                    }
                }

                if (HospitalClicked[0] == 2 || HospitalClicked[1] == 2 || HospitalClicked[2] == 2 || HospitalClicked[3] == 2) {
                    delete MMSEconditions["hos"];
                    console.log(MMSEconditions);
                    
                    UpdateHospitalChart(MMSEdata, CDRdata);

                    HospitalClicked[0] = 0;
                    HospitalClicked[1] = 0;
                    HospitalClicked[2] = 0;
                    HospitalClicked[3] = 0;


                    //Update Age Chart   
                    UpdateAgeChart(MMSEdata, CDRdata);

                    //Update Gender Chart
                    UpdateMMSEGenderChart(MMSEdata);

                    //Update Education Chart
                    UpdateMMSEEducationChart(MMSEdata);

                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                } else if (HospitalClicked[0] == 1 || HospitalClicked[1] == 1 || HospitalClicked[2] == 1 || HospitalClicked[3] == 1) {
                    MMSEconditions["hos"] = d;
                    console.log(MMSEconditions);

                    for (let i = 0 ; i < MMSEHospitals.length ; i++) {
                        if ((HospitalYscale(Number(MMSEHospitals[i].key))-HospitalBarWidth/2+1) == d3.select(this).attr("y")) {
                            HospitalClicked[i] = 1;
                        } else {
                            HospitalClicked[i] = 0;
                        }
                    }
                    UpdateHospitalChart(MMSEdata, CDRdata);
                    
                    //Update Age Charts
                    UpdateAgeChart(MMSEdata, CDRdata);
                    
                    //Update Gender Chart
                    UpdateMMSEGenderChart(MMSEdata);

                    //Update Education Chart
                    UpdateMMSEEducationChart(MMSEdata);

                    if(figA) figA.update(cdrData, figA.cdr_fields[0], CDRconditions)
                    if(figB) figB.update(mmseData, figB.mmse_fields[0], MMSEconditions)
                }
            });
        }
    }
}

main();