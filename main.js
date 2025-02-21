let MMSEconditions = {}
let CDRconditions = {}

const svg = d3.select("#Chart").append("svg")
                .attr("width", 1500)
                .attr("height", 1500);


const AgeX = 0, AgeY = 0; 
const AgeWidth = 750, AgeHeight = 250;
const GenderX = 850, GenderY = 0;
const GenderWidth = 300, GenderHeight = 300;
const EducationX = 50, EducationY = 250;
const EducationWidth = 300, EducationHeight = 300;
const HospitalX = 400, HospitalY = 300; 
const HospitalWidth = 750, HospitalHeight = 250;

var gCDR = svg.append("g")
                .attr("transform", `translate(0, 0)`)
var gMMSE = svg.append("g")
                .attr("transform", `translate(0, ${AgeY+AgeHeight+EducationHeight+50})`)
                
////Age Chart
const AgeMARGIN = { LEFT: AgeWidth * 0.1, RIGHT: AgeWidth * 0.05, TOP: AgeHeight * 0.15, BOTTOM: AgeHeight * 0.2 };

const gMMSEAge = gMMSE.append("g")
                .attr("transform", `translate(0,0)`);
const gCDRAge = gCDR.append("g")
                .attr("transform", `translate(0,0)`);

var MMSEchoice = gMMSEAge.append("g")
                .attr("transform",`translate(${AgeMARGIN.LEFT},${AgeMARGIN.TOP})`);
var CDRchoice = gCDRAge.append("g")
            .attr("transform",`translate(${AgeMARGIN.LEFT},${AgeMARGIN.TOP})`);
const gMMSEAgeOutline = gMMSEAge.append("g")
                        .attr("transform", `translate(${AgeMARGIN.LEFT},${AgeMARGIN.TOP})`)
const gMMSEAgeFill = gMMSEAge.append("g")
                        .attr("transform", `translate(${AgeMARGIN.LEFT},${AgeMARGIN.TOP})`)
const gCDRAgeOutline = gCDRAge.append("g")
                        .attr("transform", `translate(${AgeMARGIN.LEFT},${AgeMARGIN.TOP})`)
const gCDRAgeFill = gCDRAge.append("g")
                        .attr("transform", `translate(${AgeMARGIN.LEFT},${AgeMARGIN.TOP})`)
                        
const AgeSvgWIDTH = AgeWidth - (AgeMARGIN.LEFT + AgeMARGIN.RIGHT);
const AgeSvgHEIGHT = AgeHeight - (AgeMARGIN.TOP + AgeMARGIN.BOTTOM);


//Gender Chart
const GenderMARGIN = { LEFT: GenderWidth * 0.02, RIGHT: GenderWidth * 0.45, TOP: GenderHeight * 0.3, BOTTOM: GenderHeight * 0.05 };

const gMMSEGender = gMMSE.append("g")
                        .attr("transform", `translate(${GenderX}, ${GenderY})`);
const gCDRGender = gCDR.append("g")
                        .attr("transform", `translate(${GenderX}, ${GenderY})`)

const GenderSvgWIDTH = GenderWidth - (GenderMARGIN.LEFT + GenderMARGIN.RIGHT);
const GenderSvgHEIGHT = GenderHeight - (GenderMARGIN.TOP + GenderMARGIN.BOTTOM);
const GenderOuterRadius = GenderSvgWIDTH / 2;
const GenderInnerRadius = 0;
const MMSEGender = gMMSEGender.append("g")
                        .attr("transform", `translate(${GenderMARGIN.LEFT+GenderSvgWIDTH/2},${GenderMARGIN.TOP+GenderSvgHEIGHT/2})`);
const CDRGender = gCDRGender.append("g")
                    .attr("transform", `translate(${GenderMARGIN.LEFT+GenderSvgWIDTH/2},${GenderMARGIN.TOP+GenderSvgHEIGHT/2})`);
const MMSEGenderLegend = gMMSEGender.append("g")
                    .attr("transform", `translate(${GenderMARGIN.LEFT+GenderSvgWIDTH+GenderMARGIN.LEFT},${GenderMARGIN.TOP+(GenderHeight-GenderMARGIN.TOP-GenderMARGIN.BOTTOM)*0.3})`)
const CDRGenderLegend = gCDRGender.append("g")
                    .attr("transform", `translate(${GenderMARGIN.LEFT+GenderSvgWIDTH+GenderMARGIN.LEFT},${GenderMARGIN.TOP+(GenderHeight-GenderMARGIN.TOP-GenderMARGIN.BOTTOM)*0.3})`)


////Education Chart
const EducationMARGIN = { LEFT: EducationWidth * 0.02, RIGHT: EducationWidth * 0.45, TOP: EducationHeight * 0.3, BOTTOM: EducationHeight * 0.05 };

const gMMSEEducation = gMMSE.append("g")
                            .attr("transform", `translate(${EducationX}, ${EducationY})`);
const gCDREducation = gCDR.append("g")
                            .attr("transform", `translate(${EducationX}, ${EducationY})`);

const EducationSvgWIDTH = EducationWidth - (EducationMARGIN.LEFT + EducationMARGIN.RIGHT);
const EducationSvgHEIGHT = EducationHeight - (EducationMARGIN.TOP + EducationMARGIN.BOTTOM);
const EducationOuterRadius = EducationSvgWIDTH / 2;
const EducationInnerRadius = EducationOuterRadius * 0.6;
const MMSEEducation = gMMSEEducation.append("g")
                                    .attr("transform", `translate(${EducationMARGIN.LEFT+EducationSvgWIDTH/2},${EducationMARGIN.TOP+EducationSvgHEIGHT/2})`);
const MMSEEducationLegend = gMMSEEducation.append("g")
                                            .attr("transform", `translate(${EducationMARGIN.LEFT+EducationSvgWIDTH+EducationMARGIN.LEFT},${EducationMARGIN.TOP+(EducationHeight-EducationMARGIN.TOP-EducationMARGIN.BOTTOM)*0.3})`)
const CDREducation = gCDREducation.append("g")
                                    .attr("transform", `translate(${EducationMARGIN.LEFT+EducationSvgWIDTH/2},${EducationMARGIN.TOP+EducationSvgHEIGHT/2})`);
const CDREducationLegend = gCDREducation.append("g")
                                        .attr("transform", `translate(${EducationMARGIN.LEFT+EducationSvgWIDTH+EducationMARGIN.LEFT},${EducationMARGIN.TOP+(EducationHeight-EducationMARGIN.TOP-EducationMARGIN.BOTTOM)*0.3})`)


////Hospital Chart
const HospitalMARGIN = { LEFT: HospitalWidth * 0.1, RIGHT: HospitalWidth * 0.05, TOP: HospitalHeight * 0.15, BOTTOM: HospitalHeight * 0.2 };

const gMMSEHospital = gMMSE.append("g")
                .attr("transform", `translate(${HospitalX}, ${HospitalY})`);
const gCDRHospital = gCDR.append("g")
                .attr("transform", `translate(${HospitalX}, ${HospitalY})`);

const gMMSEHospitalOutline = gMMSEHospital.append("g")
                        .attr("transform", `translate(${HospitalMARGIN.LEFT},${HospitalMARGIN.TOP})`)
const gMMSEHospitalFill = gMMSEHospital.append("g")
                        .attr("transform", `translate(${HospitalMARGIN.LEFT},${HospitalMARGIN.TOP})`)
const gCDRHospitalOutline = gCDRHospital.append("g")
                        .attr("transform", `translate(${HospitalMARGIN.LEFT},${HospitalMARGIN.TOP})`)
const gCDRHospitalFill = gCDRHospital.append("g")
                        .attr("transform", `translate(${HospitalMARGIN.LEFT},${HospitalMARGIN.TOP})`)
                        
const HospitalSvgWIDTH = HospitalWidth - (HospitalMARGIN.LEFT + HospitalMARGIN.RIGHT);
const HospitalSvgHEIGHT = HospitalHeight - (HospitalMARGIN.TOP + HospitalMARGIN.BOTTOM);


// const loadCSVData = function (fileName) {
//     return new Promise((resolve) => {
//         d3.csv(fileName).then(data => {
//             resolve(data);
//         }).catch(function (error) {
//             console.log(error);
//         });
//     })

// }

const UpdateMMSEData = function (Data) {
    var NewData = Data.filter((d) => {
        if(MMSEconditions["edu"]) {
            if(MMSEconditions["gen"]) {
                if(MMSEconditions["hos"]) {
                    if(MMSEconditions["age"]) {
                        if(MMSEconditions["age"] == 85) {
                            if(MMSEconditions["edu"].index == 0) {
                                return d.Education == MMSEconditions["edu"].index && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                            } else if(MMSEconditions["edu"].index == 1) {
                                return d.Education > 0 && d.Education <= 6 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                            } else if(MMSEconditions["edu"].index == 2) {
                                return d.Education > 6 && d.Education <= 9 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                            } else if(MMSEconditions["edu"].index == 3) {
                                return d.Education > 9 && d.Education <= 12 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                            } else {
                                return d.Education > 12 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                            }
                        } else {
                            if(MMSEconditions["edu"].index == 0) {
                                return d.Education == MMSEconditions["edu"].index && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                            } else if(MMSEconditions["edu"].index == 1) {
                                return d.Education > 0 && d.Education <= 6 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                            } else if(MMSEconditions["edu"].index == 2) {
                                return d.Education > 6 && d.Education <= 9 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                            } else if(MMSEconditions["edu"].index == 3) {
                                return d.Education > 9 && d.Education <= 12 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                            } else {
                                return d.Education > 12 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                            }
                        }
                    } else {
                        if(MMSEconditions["edu"].index == 0) {
                            return d.Education == MMSEconditions["edu"].index && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key;
                        } else if(MMSEconditions["edu"].index == 1) {
                            return d.Education > 0 && d.Education <= 6 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key;
                        } else if(MMSEconditions["edu"].index == 2) {
                            return d.Education > 6 && d.Education <= 9 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key;
                        } else if(MMSEconditions["edu"].index == 3) {
                            return d.Education > 9 && d.Education <= 12 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key;
                        } else {
                            return d.Education > 12 && d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key;
                        }
                    }
                } else if(MMSEconditions["age"]) {
                    if(MMSEconditions["age"] == 85) {
                        if(MMSEconditions["edu"].index == 0) {
                            return d.Education == MMSEconditions["edu"].index && d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(MMSEconditions["edu"].index == 1) {
                            return d.Education > 0 && d.Education <= 6 && d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(MMSEconditions["edu"].index == 2) {
                            return d.Education > 6 && d.Education <= 9 && d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(MMSEconditions["edu"].index == 3) {
                            return d.Education > 9 && d.Education <= 12 && d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else {
                            return d.Education > 12 && d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        }
                    } else {
                        if(MMSEconditions["edu"].index == 0) {
                            return d.Education == MMSEconditions["edu"].index && d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                        } else if(MMSEconditions["edu"].index == 1) {
                            return d.Education > 0 && d.Education <= 6 && d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                        } else if(MMSEconditions["edu"].index == 2) {
                            return d.Education > 6 && d.Education <= 9 && d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                        } else if(MMSEconditions["edu"].index == 3) {
                            return d.Education > 9 && d.Education <= 12 && d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                        } else {
                            return d.Education > 12 && d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                        }
                    }
                } else {
                    if(MMSEconditions["edu"].index == 0) {
                        return d.Education == MMSEconditions["edu"].index && d.Gender == MMSEconditions["gen"].index;
                    } else if(MMSEconditions["edu"].index == 1) {
                        return d.Education > 0 && d.Education <= 6 && d.Gender == MMSEconditions["gen"].index;
                    } else if(MMSEconditions["edu"].index == 2) {
                        return d.Education > 6 && d.Education <= 9 && d.Gender == MMSEconditions["gen"].index;
                    } else if(MMSEconditions["edu"].index == 3) {
                        return d.Education > 9 && d.Education <= 12 && d.Gender == MMSEconditions["gen"].index;
                    } else {
                        return d.Education > 12 && d.Gender == MMSEconditions["gen"].index;
                    }
                }
            } else if(MMSEconditions["hos"]) {
                if(MMSEconditions["age"]) {
                    if(MMSEconditions["age"] == 85) {
                        if(MMSEconditions["edu"].index == 0) {
                            return d.Education == MMSEconditions["edu"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(MMSEconditions["edu"].index == 1) {
                            return d.Education > 0 && d.Education <= 6 && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(MMSEconditions["edu"].index == 2) {
                            return d.Education > 6 && d.Education <= 9 && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(MMSEconditions["edu"].index == 3) {
                            return d.Education > 9 && d.Education <= 12 && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else {
                            return d.Education > 12 && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        }
                    } else {
                        if(MMSEconditions["edu"].index == 0) {
                            return d.Education == MMSEconditions["edu"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                        } else if(MMSEconditions["edu"].index == 1) {
                            return d.Education > 0 && d.Education <= 6 && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                        } else if(MMSEconditions["edu"].index == 2) {
                            return d.Education > 6 && d.Education <= 9 && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                        } else if(MMSEconditions["edu"].index == 3) {
                            return d.Education > 9 && d.Education <= 12 && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                        } else {
                            return d.Education > 12 && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                        }
                    }
                } else {
                    if(MMSEconditions["edu"].index == 0) {
                        return d.Education == MMSEconditions["edu"].index && d.hospital_id == MMSEconditions["hos"].key;
                    } else if(MMSEconditions["edu"].index == 1) {
                        return d.Education > 0 && d.Education <= 6 && d.hospital_id == MMSEconditions["hos"].key;
                    } else if(MMSEconditions["edu"].index == 2) {
                        return d.Education > 6 && d.Education <= 9 && d.hospital_id == MMSEconditions["hos"].key;
                    } else if(MMSEconditions["edu"].index == 3) {
                        return d.Education > 9 && d.Education <= 12 && d.hospital_id == MMSEconditions["hos"].key;
                    } else {
                        return d.Education > 12 && d.hospital_id == MMSEconditions["hos"].key;
                    }
                }
            } else if(MMSEconditions["age"]) {
                if(MMSEconditions["age"] == 85) {
                    if(MMSEconditions["edu"].index == 0) {
                        return d.Education == MMSEconditions["edu"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else if(MMSEconditions["edu"].index == 1) {
                        return d.Education > 0 && d.Education <= 6 && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else if(MMSEconditions["edu"].index == 2) {
                        return d.Education > 6 && d.Education <= 9 && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else if(MMSEconditions["edu"].index == 3) {
                        return d.Education > 9 && d.Education <= 12 && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else {
                        return d.Education > 12 && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    }
                } else {
                    if(MMSEconditions["edu"].index == 0) {
                        return d.Education == MMSEconditions["edu"].index && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                    } else if(MMSEconditions["edu"].index == 1) {
                        return d.Education > 0 && d.Education <= 6 && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                    } else if(MMSEconditions["edu"].index == 2) {
                        return d.Education > 6 && d.Education <= 9 && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                    } else if(MMSEconditions["edu"].index == 3) {
                        return d.Education > 9 && d.Education <= 12 && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                    } else {
                        return d.Education > 12 && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                    }
                }
            } else {
                if(MMSEconditions["edu"].index == 0) {
                    return d.Education == MMSEconditions["edu"].index;
                } else if(MMSEconditions["edu"].index == 1) {
                    return d.Education > 0 && d.Education <= 6;
                } else if(MMSEconditions["edu"].index == 2) {
                    return d.Education > 6 && d.Education <= 9;
                } else if(MMSEconditions["edu"].index == 3) {
                    return d.Education > 9 && d.Education <= 12;
                } else {
                    return d.Education > 12;
                }
            }
        } else if(MMSEconditions["gen"]) {
            if(MMSEconditions["hos"]) {
                if(MMSEconditions["age"]) {
                    if(MMSEconditions["age"] == 85) {
                        return d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else {
                        return d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                    }
                } else {
                    return d.Gender == MMSEconditions["gen"].index && d.hospital_id == MMSEconditions["hos"].key;
                }
            } else {
                if(MMSEconditions["age"]) {
                    if(MMSEconditions["age"] == 85) {
                        return d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else {
                        return d.Gender == MMSEconditions["gen"].index && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                    }
                } else {
                    return d.Gender == MMSEconditions["gen"].index;
                }
            }
        } else if(MMSEconditions["hos"]) {
            if(MMSEconditions["age"]) {
                if(MMSEconditions["age"] == 85) {
                    return d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                } else {
                    return d.hospital_id == MMSEconditions["hos"].key && Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
                }
            } else {
                return d.hospital_id == MMSEconditions["hos"].key;
            }
        } else if(MMSEconditions["age"]) {
            if(MMSEconditions["age"] == 85) {
                return Number(d.Age) >= 85 && Number(d.Age) <= 100;
            } else {
                return Number(d.Age) >= MMSEconditions["age"] && Number(d.Age) < (MMSEconditions["age"]+5);
            }
        } else {
            return d;
        }
    })

    return NewData;
}

const UpdateCDRData = function (Data) {
    var NewData = Data.filter((d) => {
        if(CDRconditions["edu"]) {
            if(CDRconditions["gen"]) {
                if(CDRconditions["hos"]) {
                    if(CDRconditions["age"]) {
                        if(CDRconditions["age"] == 85) {
                            if(CDRconditions["edu"].index == 0) {
                                return d.Education == CDRconditions["edu"].index && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                            } else if(CDRconditions["edu"].index == 1) {
                                return d.Education > 0 && d.Education <= 6 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                            } else if(CDRconditions["edu"].index == 2) {
                                return d.Education > 6 && d.Education <= 9 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                            } else if(CDRconditions["edu"].index == 3) {
                                return d.Education > 9 && d.Education <= 12 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                            } else {
                                return d.Education > 12 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                            }
                        } else {
                            if(CDRconditions["edu"].index == 0) {
                                return d.Education == CDRconditions["edu"].index && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                            } else if(CDRconditions["edu"].index == 1) {
                                return d.Education > 0 && d.Education <= 6 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                            } else if(CDRconditions["edu"].index == 2) {
                                return d.Education > 6 && d.Education <= 9 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                            } else if(CDRconditions["edu"].index == 3) {
                                return d.Education > 9 && d.Education <= 12 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                            } else {
                                return d.Education > 12 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                            }
                        }
                    } else {
                        if(CDRconditions["edu"].index == 0) {
                            return d.Education == CDRconditions["edu"].index && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key;
                        } else if(CDRconditions["edu"].index == 1) {
                            return d.Education > 0 && d.Education <= 6 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key;
                        } else if(CDRconditions["edu"].index == 2) {
                            return d.Education > 6 && d.Education <= 9 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key;
                        } else if(CDRconditions["edu"].index == 3) {
                            return d.Education > 9 && d.Education <= 12 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key;
                        } else {
                            return d.Education > 12 && d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key;
                        }
                    }
                } else if(CDRconditions["age"]) {
                    if(CDRconditions["age"] == 85) {
                        if(CDRconditions["edu"].index == 0) {
                            return d.Education == CDRconditions["edu"].index && d.Gender == CDRconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(CDRconditions["edu"].index == 1) {
                            return d.Education > 0 && d.Education <= 6 && d.Gender == CDRconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(CDRconditions["edu"].index == 2) {
                            return d.Education > 6 && d.Education <= 9 && d.Gender == CDRconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(CDRconditions["edu"].index == 3) {
                            return d.Education > 9 && d.Education <= 12 && d.Gender == CDRconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else {
                            return d.Education > 12 && d.Gender == CDRconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        }
                    } else {
                        if(CDRconditions["edu"].index == 0) {
                            return d.Education == CDRconditions["edu"].index && d.Gender == CDRconditions["gen"].index && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                        } else if(CDRconditions["edu"].index == 1) {
                            return d.Education > 0 && d.Education <= 6 && d.Gender == CDRconditions["gen"].index && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                        } else if(CDRconditions["edu"].index == 2) {
                            return d.Education > 6 && d.Education <= 9 && d.Gender == CDRconditions["gen"].index && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                        } else if(CDRconditions["edu"].index == 3) {
                            return d.Education > 9 && d.Education <= 12 && d.Gender == CDRconditions["gen"].index && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                        } else {
                            return d.Education > 12 && d.Gender == CDRconditions["gen"].index && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                        }
                    }
                } else {
                    if(CDRconditions["edu"].index == 0) {
                        return d.Education == CDRconditions["edu"].index && d.Gender == CDRconditions["gen"].index;
                    } else if(CDRconditions["edu"].index == 1) {
                        return d.Education > 0 && d.Education <= 6 && d.Gender == CDRconditions["gen"].index;
                    } else if(CDRconditions["edu"].index == 2) {
                        return d.Education > 6 && d.Education <= 9 && d.Gender == CDRconditions["gen"].index;
                    } else if(CDRconditions["edu"].index == 3) {
                        return d.Education > 9 && d.Education <= 12 && d.Gender == CDRconditions["gen"].index;
                    } else {
                        return d.Education > 12 && d.Gender == CDRconditions["gen"].index;
                    }
                }
            } else if(CDRconditions["hos"]) {
                if(CDRconditions["age"]) {
                    if(CDRconditions["age"] == 85) {
                        if(CDRconditions["edu"].index == 0) {
                            return d.Education == CDRconditions["edu"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(CDRconditions["edu"].index == 1) {
                            return d.Education > 0 && d.Education <= 6 && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(CDRconditions["edu"].index == 2) {
                            return d.Education > 6 && d.Education <= 9 && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else if(CDRconditions["edu"].index == 3) {
                            return d.Education > 9 && d.Education <= 12 && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        } else {
                            return d.Education > 12 && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                        }
                    } else {
                        if(CDRconditions["edu"].index == 0) {
                            return d.Education == CDRconditions["edu"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                        } else if(CDRconditions["edu"].index == 1) {
                            return d.Education > 0 && d.Education <= 6 && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                        } else if(CDRconditions["edu"].index == 2) {
                            return d.Education > 6 && d.Education <= 9 && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                        } else if(CDRconditions["edu"].index == 3) {
                            return d.Education > 9 && d.Education <= 12 && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                        } else {
                            return d.Education > 12 && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                        }
                    }
                } else {
                    if(CDRconditions["edu"].index == 0) {
                        return d.Education == CDRconditions["edu"].index && d.hospital_id == CDRconditions["hos"].key;
                    } else if(CDRconditions["edu"].index == 1) {
                        return d.Education > 0 && d.Education <= 6 && d.hospital_id == CDRconditions["hos"].key;
                    } else if(CDRconditions["edu"].index == 2) {
                        return d.Education > 6 && d.Education <= 9 && d.hospital_id == CDRconditions["hos"].key;
                    } else if(CDRconditions["edu"].index == 3) {
                        return d.Education > 9 && d.Education <= 12 && d.hospital_id == CDRconditions["hos"].key;
                    } else {
                        return d.Education > 12 && d.hospital_id == CDRconditions["hos"].key;
                    }
                }
            } else if(CDRconditions["age"]) {
                if(CDRconditions["age"] == 85) {
                    if(CDRconditions["edu"].index == 0) {
                        return d.Education == CDRconditions["edu"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else if(CDRconditions["edu"].index == 1) {
                        return d.Education > 0 && d.Education <= 6 && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else if(CDRconditions["edu"].index == 2) {
                        return d.Education > 6 && d.Education <= 9 && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else if(CDRconditions["edu"].index == 3) {
                        return d.Education > 9 && d.Education <= 12 && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else {
                        return d.Education > 12 && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    }
                } else {
                    if(CDRconditions["edu"].index == 0) {
                        return d.Education == CDRconditions["edu"].index && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                    } else if(CDRconditions["edu"].index == 1) {
                        return d.Education > 0 && d.Education <= 6 && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                    } else if(CDRconditions["edu"].index == 2) {
                        return d.Education > 6 && d.Education <= 9 && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                    } else if(CDRconditions["edu"].index == 3) {
                        return d.Education > 9 && d.Education <= 12 && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                    } else {
                        return d.Education > 12 && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                    }
                }
            } else {
                if(CDRconditions["edu"].index == 0) {
                    return d.Education == CDRconditions["edu"].index;
                } else if(CDRconditions["edu"].index == 1) {
                    return d.Education > 0 && d.Education <= 6;
                } else if(CDRconditions["edu"].index == 2) {
                    return d.Education > 6 && d.Education <= 9;
                } else if(CDRconditions["edu"].index == 3) {
                    return d.Education > 9 && d.Education <= 12;
                } else {
                    return d.Education > 12;
                }
            }
        } else if(CDRconditions["gen"]) {
            if(CDRconditions["hos"]) {
                if(CDRconditions["age"]) {
                    if(CDRconditions["age"] == 85) {
                        return d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else {
                        return d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                    }
                } else {
                    return d.Gender == CDRconditions["gen"].index && d.hospital_id == CDRconditions["hos"].key;
                }
            } else {
                if(CDRconditions["age"]) {
                    if(CDRconditions["age"] == 85) {
                        return d.Gender == CDRconditions["gen"].index && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                    } else {
                        return d.Gender == CDRconditions["gen"].index && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                    }
                } else {
                    return d.Gender == CDRconditions["gen"].index;
                }
            }
        } else if(CDRconditions["hos"]) {
            if(CDRconditions["age"]) {
                if(CDRconditions["age"] == 85) {
                    return d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= 85 && Number(d.Age) <= 100;
                } else {
                    return d.hospital_id == CDRconditions["hos"].key && Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
                }
            } else {
                return d.hospital_id == CDRconditions["hos"].key;
            }
        } else if(CDRconditions["age"]) {
            if(CDRconditions["age"] == 85) {
                return Number(d.Age) >= 85 && Number(d.Age) <= 100;
            } else {
                return Number(d.Age) >= CDRconditions["age"] && Number(d.Age) < (CDRconditions["age"]+5);
            }
        } else {
            return d;
        }
    })

    return NewData;
}



const UpdateAgeChart = function (MMSEdata, CDRdata) {
    var UpdatedMMSEdata = UpdateMMSEData(MMSEdata);
    var UpdatedCDRdata = UpdateCDRData(CDRdata);

    var MMSEAges = d3.nest()
                    .key((d) => d.Age)
                    .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                    .rollup((v) => v.length)
                    .entries(MMSEdata);
    var CDRAges = d3.nest()
                    .key((d) => d.Age)
                    .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                    .rollup((v) =>  v.length)
                    .entries(CDRdata);

    var uMMSEAges = d3.nest()
                    .key((d) => {
                        return d.Age;
                    })
                    .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                    .rollup((v) => {
                        return v.length;
                    })
                    .entries(UpdatedMMSEdata);
    var uCDRAges = d3.nest()
                    .key((d) => d.Age)
                    .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                    .rollup((v) =>  v.length)
                    .entries(UpdatedCDRdata);

    for (let i = 0 ; i < 36 ; i++) {
        if (!uMMSEAges[i] || uMMSEAges[i].key != String(i+65)) {
            for (let j = 35 ; j >= i ; j--) {
                if(uMMSEAges[j]) {
                    uMMSEAges[j+1] = uMMSEAges[j];
                }
            }
            uMMSEAges[i] = {key: String(i+65), value: 0};
        }
        if (!uCDRAges[i] || uCDRAges[i].key != String(i+65)) {
            for (let j = 35 ; j >= i ; j--) {
                if(uCDRAges[j]) {
                    uCDRAges[j+1] = uCDRAges[j];
                }
            }
            uCDRAges[i] = {key: String(i+65), value: 0};
        }
    }

    var AgeXscale = d3.scaleLinear()
                        .domain([64.5,100.5])
                        .range([0,AgeSvgWIDTH]);
    var AgeBarWidth = AgeXscale(65.5);
    var MMSEAgeYscale = d3.scaleLinear()
                            .domain([0, d3.max(MMSEAges, function(d) { 
                                return Number(d.value);
                            })])
                            .range([AgeSvgHEIGHT, 0]);
    var CDRAgeYscale = d3.scaleLinear()
                            .domain([0, d3.max(CDRAges, function(d) { 
                                return Number(d.value);
                            })])
                            .range([AgeSvgHEIGHT, 0]);

    gMMSEAgeFill.selectAll("rect")
                .data(uMMSEAges)
                .join("rect")
                .transition()
                .duration(2000)
                .attr("y", function(d){
                    return MMSEAgeYscale(Number(d.value)) + AgeBarWidth*0.025;
                })
                .attr("height", function(d){
                    if(AgeSvgHEIGHT-MMSEAgeYscale(Number(d.value)) < AgeBarWidth*0.025) {
                        return 0;
                    }else{
                        return AgeSvgHEIGHT - MMSEAgeYscale(Number(d.value)) - AgeBarWidth*0.025;
                    }
                });

    gCDRAgeFill.selectAll("rect")
                .data(uCDRAges)
                .join("rect")
                .transition()
                .duration(2000)
                .attr("y", function(d){
                    return CDRAgeYscale(Number(d.value)) + AgeBarWidth*0.025;
                })
                .attr("height", function(d){
                    if(AgeSvgHEIGHT-CDRAgeYscale(Number(d.value)) < AgeBarWidth*0.025) {
                        return 0;
                    }else{
                        return AgeSvgHEIGHT - CDRAgeYscale(Number(d.value)) - AgeBarWidth*0.025;
                    }
                });
}

const UpdateMMSEGenderChart = function (MMSEdata) {
    var UpdatedMMSEdata = UpdateMMSEData(MMSEdata);

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
                        .entries(UpdatedMMSEdata);

    for (let i = 0 ; i < 2 ; i++) {
        if (!MMSEGenders[i] || MMSEGenders[i].key != String(i)) {
            for (let j = i+1 ; j < 2 ; j++) {
                MMSEGenders[j] = MMSEGenders[j-1];
            }
            MMSEGenders[i] = {key: String(i), value: 0};
        }
    }

    for( let i = 0 ; i < 2 ; i++ ){
        if( i > 0 ){
            MMSEGenderData[i].startAngle = MMSEGenderData[i-1].endAngle;
        };
        if( i < 1 ){
            var amount = 0;
            amount = MMSEGenders[i].value;
            MMSEGenderData[i].endAngle = MMSEGenderData[i].startAngle + 2*Math.PI*amount/(UpdatedMMSEdata.length);
        }
        else{
            MMSEGenderData[i].endAngle = 2 * Math.PI;
        };
    }
    if(MMSEconditions["gen"]) {
        for( let i = 0 ; i < 2 ; i++ ) {
            MMSEGenderData[i].color = MMSEconditions["gen"].color;
        }
    }

    var GenderarcGenerator = d3.arc()
                                .innerRadius(GenderInnerRadius)
                                .outerRadius(GenderOuterRadius);

    MMSEGender.selectAll("path")
                .data(MMSEGenderData)
                .join("path")
                .style("stroke",(d) => d.color)
                .style("fill",(d) => d.color)
                .transition()
                .duration(2000)
                .attrTween("d", function(d) {
                    var d3Interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                    return function(t) {
                        return GenderarcGenerator(d3Interpolate(t));
                    }
                });
}

const UpdateCDRGenderChart = function (CDRdata) {
    var UpdatedCDRdata = UpdateCDRData(CDRdata);

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
                        .entries(UpdatedCDRdata);

    for (let i = 0 ; i < 2 ; i++) {
        if (!CDRGenders[i] || CDRGenders[i].key != String(i)) {
            for (let j = i+1 ; j < 2 ; j++) {
                CDRGenders[j] = CDRGenders[j-1];
            }
            CDRGenders[i] = {key: String(i), value: 0};
        }
    }

    for( let i = 0 ; i < 2 ; i++ ){
        if( i > 0 ){
            CDRGenderData[i].startAngle = CDRGenderData[i-1].endAngle;
        };
        if( i < 1 ){
            var amount = 0;
            amount = CDRGenders[i].value;
            CDRGenderData[i].endAngle = CDRGenderData[i].startAngle + 2*Math.PI*amount/(UpdatedCDRdata.length);
        }
        else{
            CDRGenderData[i].endAngle = 2 * Math.PI;
        };
    }
    if(CDRconditions["gen"]) {
        for( let i = 0 ; i < 2 ; i++ ) {
            CDRGenderData[i].color = CDRconditions["gen"].color;
        }
    }

    var GenderarcGenerator = d3.arc()
                                .innerRadius(GenderInnerRadius)
                                .outerRadius(GenderOuterRadius);
                
    CDRGender.selectAll("path")
            .data(CDRGenderData)
            .join("path")
            .style("stroke",(d) => d.color)
            .style("fill",(d) => d.color)
            .transition()
            .duration(2000)
            .attrTween("d", function(d) {
                var d3Interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                return function(t) {
                    return GenderarcGenerator(d3Interpolate(t));
                }
            });
}

const UpdateMMSEEducationChart = function (MMSEdata, CDRdata) {
    var UpdatedMMSEdata = UpdateMMSEData(MMSEdata);

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
                                .entries(UpdatedMMSEdata);
    for (let i = 0 ; i < 5 ; i++) {
        if (!MMSEEducationLevel[i] || MMSEEducationLevel[i].key != String(i)) {
            for (let j = 4 ; j >= i ; j--) {
                if(MMSEEducationLevel[j]) {
                    MMSEEducationLevel[j+1] = MMSEEducationLevel[j];
                }
            }
            MMSEEducationLevel[i] = {key: String(i), value: 0};
        }
    }

    for( let i = 0 ; i < 5 ; i++ ){
        if( i > 0 ){
            MMSEEducationData[i].startAngle = MMSEEducationData[i-1].endAngle;
        };
        if( i < 4 ){
            var amount = 0;
            amount = MMSEEducationLevel[i].value;
            MMSEEducationData[i].endAngle = MMSEEducationData[i].startAngle + 2*Math.PI*amount/(UpdatedMMSEdata.length);
        }
        else{
            MMSEEducationData[i].endAngle = 2 * Math.PI;
        };
    }
    if(MMSEconditions["edu"]) {
        for( let i = 0 ; i < 5 ; i++ ) {
            MMSEEducationData[i].color = MMSEconditions["edu"].color;
        }
    }

    var EducationarcGenerator = d3.arc()
                                    .innerRadius(EducationInnerRadius)
                                    .outerRadius(EducationOuterRadius);
    
    MMSEEducation.selectAll("path")
                .data(MMSEEducationData)
                .join("path")
                .style("stroke",(d) => d.color)
                .style("fill",(d) => d.color)
                .transition()
                .duration(2000)
                .attrTween("d", function(d) {
                    var d3Interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                    return function(t) {
                        return EducationarcGenerator(d3Interpolate(t));
                    }
                });
}

const UpdateCDREducationChart = function (CDRdata) {
    var UpdatedCDRdata = UpdateCDRData(CDRdata);

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
                                .entries(UpdatedCDRdata);
    for (let i = 0 ; i < 5 ; i++) {
        if (!CDREducationLevel[i] || CDREducationLevel[i].key != String(i)) {
            for (let j = 4 ; j >= i ; j--) {
                if(CDREducationLevel[j]) {
                    CDREducationLevel[j+1] = CDREducationLevel[j];
                }
            }
            CDREducationLevel[i] = {key: String(i), value: 0};
        }
    }

    for( let i = 0 ; i < 5 ; i++ ){
        if( i > 0 ){
            CDREducationData[i].startAngle = CDREducationData[i-1].endAngle;
        };
        if( i < 4 ){
            var amount = 0;
            amount = CDREducationLevel[i].value;
            CDREducationData[i].endAngle = CDREducationData[i].startAngle + 2*Math.PI*amount/(UpdatedCDRdata.length);
        }
        else{
            CDREducationData[i].endAngle = 2 * Math.PI;
        };
    }
    if(CDRconditions["edu"]) {
        for( let i = 0 ; i < 5 ; i++ ) {
            CDREducationData[i].color = CDRconditions["edu"].color;
        }
    }

    var EducationarcGenerator = d3.arc()
                                    .innerRadius(EducationInnerRadius)
                                    .outerRadius(EducationOuterRadius);

    CDREducation.selectAll("path")
                .data(CDREducationData)
                .join("path")
                .style("stroke",(d) => d.color)
                .style("fill",(d) => d.color)
                .transition()
                .duration(2000)
                .attrTween("d", function(d) {
                    var d3Interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                    return function(t) {
                        return EducationarcGenerator(d3Interpolate(t));
                    }
                });
}

const UpdateHospitalChart = function (MMSEdata, CDRdata) {
    var UpdatedMMSEdata = UpdateMMSEData(MMSEdata);
    var UpdatedCDRdata = UpdateCDRData(CDRdata);

    var MMSEHospitals = d3.nest()
                    .key((d) => d.hospital_id)
                    .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))//
                    .rollup((v) => v.length)
                    .entries(MMSEdata);
    var CDRHospitals = d3.nest()
                    .key((d) => d.hospital_id)
                    .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))//
                    .rollup((v) => v.length)
                    .entries(CDRdata);

    var uMMSEHospitals = d3.nest()
                            .key((d) => d.hospital_id)
                            .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                            .rollup((v) => v.length)
                            .entries(UpdatedMMSEdata);
    var uCDRHospitals = d3.nest()
                            .key((d) => d.hospital_id)
                            .sortKeys((a,b)=>d3.ascending(Number(a),Number(b)))
                            .rollup((v) =>  v.length)
                            .entries(UpdatedCDRdata);
    
    for (let i = 0 ; i < 4 ; i++) {
        if (!uMMSEHospitals[i] || uMMSEHospitals[i].key != String(i+1)) {
            for (let j = 4 ; j >= i ; j--) {
                if(uMMSEHospitals[j]) {
                    uMMSEHospitals[j+1] = uMMSEHospitals[j];
                }
            }
            uMMSEHospitals[i] = {key: String(i+1), value: 0};
        }
        if (!uCDRHospitals[i] || uCDRHospitals[i].key != String(i+1)) {
            for (let j = 4 ; j >= i ; j--) {
                if(uCDRHospitals[j]) {
                    uCDRHospitals[j+1] = uCDRHospitals[j];
                }
            }
            uCDRHospitals[i] = {key: String(i+1), value: 0};
        }
    }
    
    var MMSEHospitalXscale = d3.scaleLinear()
                                .domain([0, d3.max(MMSEHospitals, function(d) { 
                                    return Number(d.value);
                                })])
                                .range([0, HospitalSvgWIDTH]);
    var CDRHospitalXscale = d3.scaleLinear()
                                .domain([0, d3.max(CDRHospitals, function(d) { 
                                    return Number(d.value);
                                })])
                                .range([0, HospitalSvgWIDTH]);

    gMMSEHospitalFill.selectAll("rect")
                    .data(uMMSEHospitals)
                    .join("rect")
                    .transition()
                    .duration(2000)
                    .attr("width", d => {
                        if(MMSEHospitalXscale(Number(d.value)) < 0.5) {
                            return 0;
                        }
                        return MMSEHospitalXscale(Number(d.value)) - 0.5;
                    });

    gCDRHospitalFill.selectAll("rect")
                    .data(uCDRHospitals)
                    .join("rect")
                    .transition()
                    .duration(2000)
                    .attr("width", d => {
                        if(CDRHospitalXscale(Number(d.value)) < 0.5) {
                            return 0;
                        }
                        return CDRHospitalXscale(Number(d.value)) - 0.5;
                    });
}

function lastPage(){
    let attrArr = []
    localStorage.setItem("storageName",attrArr);
    var newUrl = 'http://127.0.0.1:5501/index.html'
    window.location.replace(newUrl);
}