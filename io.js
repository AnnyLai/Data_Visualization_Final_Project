function writeText(x, y, rotate, text, g, px) {
    g.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("font-size", px)
        .attr("transform", `rotate(${rotate})`)
        .text(text);
    return g;
}

function loadCSVData(fileName) {
    return new Promise((resolve) => {
        d3.csv(fileName).then(data => {
            resolve(data);
        }).catch(function (error) {
            console.log(error);
        });
    })

}

function dataCollect(arr, fields){
    let objs = {}
    const headers = arr[0]
    for(let i =0; i< fields.length; i++){
        objs[fields[i]] = []
    }

    for(let i =0; i< arr.length; i++){
        for(let j =0; j< fields.length; j++){
            objs[fields[j]].push(parseFloat(arr[i][fields[j]]))
        }
        
    }
    // console.log(objs)
    return objs
}

function data4Regression(dataByFields, fields){
    // console.log(fields)
    // console.log(dataByFields)
    let objs = {}
    for(let i =0; i< fields.length; i++){
        objs[fields[i]] = {}
        arrData = dataByFields[fields[i]]
        let sum =0
        arrData.forEach(element => {
            sum += element
        });
        objs[fields[i]]["max"] = Math.max(...arrData)
        objs[fields[i]]["sum"] = sum
        mean = sum/arrData.length
        objs[fields[i]]["mean"] = mean
        arr4Diff= []
        arr4powOfDiff =[]
        arrData.forEach(element => {
            arr4Diff.push(element-mean)
            arr4powOfDiff.push(Math.pow(element-mean, 2))
        });
        let sumPowOfDiff =0
        arr4powOfDiff.forEach(element => {
            sumPowOfDiff += element
        });
        objs[fields[i]]["arr4Diff"] = arr4Diff
        objs[fields[i]]["sumPowOfDiff"] = sumPowOfDiff
        
    }
    // console.log(objs)
    return objs

}

function dataProcessFig(fields){
    let nfields = []
    for(f of fields){
        let obj={}
        if(f.slice(0,3) == "CDR" || f.slice(0,5) == "MMSE_" || f.slice(0,3) == "Hb-" ) {
            obj["name"] = f
            obj["reg"] = ''
            nfields.push(obj)
        }
    }
    return nfields
        
}

function dataProcessCompareFig(fields, key){
    let nfields = []
    for(f of fields){
        if(f.slice(0,3) == key) {
            nfields.push(f)
        }
    }
    return nfields
}

function dataFilterCompareFig(data, conditions){
    let ndata=[]
    // condition
    let eduUp=25
    let eduDown=0
    if(conditions["edu"]){
        switch (conditions["edu"].label) {
            case "No":
                eduUp = 0;
                eduDown = 0;
                break;
            case "Elementary":
                eduUp = 6;
                eduDown = 1;
                break;
            case "Junior High":
                eduUp = 9;
                eduDown = 7;
                break;
            case "Senior High":
                eduUp = 12;
                eduDown = 10;
                break;
            case "College+":
                eduUp = 25;
                eduDown = 13;
                break;
    
        }
    }
    let gender=2
    if(conditions["gen"]){
        if(conditions["gen"].label == "Male"){
            gender=0
        }else{
            gender=1
        }
    }
    let hospital=0
    if(conditions["hos"]){
        hospital = conditions["hos"].key
    }
    let ageDown=65
    let ageUp=100
    if(conditions["age"]){
        ageDown= parseInt(conditions.age)
        ageUp = ageDown==85 ? ageDown+15 : ageDown+5
    }
    // console.log(data)
    for (d of data){
        if(parseInt(d.hospital) == hospital || hospital==0){
            
            if(parseInt(d.gender) == gender || gender ==2){
                
                if((parseInt(d.eduQ) >= eduDown) && (parseInt(d.eduQ) <= eduUp )){
                    if(parseInt(d.age) >= ageDown && parseInt(d.age) <= ageUp){
                        ndata.push(d)
                    }
                    
                }
            }
        }
    }
    return ndata
}



function dataClean(measure, data){
    filteredData = []
    for( row in data){
        d= data[row]
        if( parseInt(d.age) >=65
            && (parseInt(d.hospital) >=1 || parseInt(d.hospital) <=4)
            && (parseInt(d.gender) ==0 || parseInt(d.gender) ==1)
            && d.eduQ <= 23){
            if(measure == 0 && // cdr
                parseInt(d.CDR)<=5 &&
                parseInt(d.CDR_Memory)<=5 && parseInt(d.CDR_Memory)>=0 &&
                parseInt(d.CDR_Orient)<=5 && parseInt(d.CDR_Orient)>=0 &&
                parseInt(d.CDR_ProbSolve)<=5 && parseInt(d.CDR_ProbSolve)>=0 &&
                parseInt(d.CDR_Social)<=5 && parseInt(d.CDR_Social)>=0 &&
                parseInt(d.CDR_Home)<=5 && parseInt(d.CDR_Home)>=0 &&
                parseInt(d.CDR_SelfCare)<=5 && parseInt(d.CDR_SelfCare)>=0 &&
                parseInt(d.SOB) <=30
            ){
                filteredData.push(d)
            }
            if(measure == 1 && // mmse
                parseInt(d.MMSE)<=30 &&
                parseInt(d.MMSE_Orient)<=10 &&
                parseInt(d.MMSE_Regist)<=3 &&
                parseInt(d.MMSE_AttCal)<=5 &&
                parseInt(d.MMSE_Recall)<=3 &&
                parseInt(d.MMSE_Lang)<=9 
            ){
                filteredData.push(d)
            }
        }
        
    }
    return new Promise((resolve) => { 
        resolve(filteredData) 
    }).catch(function (error) {
        console.log(error);
    });
    
}

