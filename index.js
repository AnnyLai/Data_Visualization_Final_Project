const chosenAttr =1
let mmseattrArr=[]
let cdrattrArr=[]

class fig {
    svg
    g_text
    g_graphic
    fields
    dataOrigin
    dataByFields
    dataLen
    data4Reg


    constructor(x, y, width, height, id, fields, data) {
        // 資料再處理
        const onlyFields = fields.map( e=>e.name)
        this.fields = onlyFields
        this.dataOrigin = data
        this.dataLen = data.length
        this.dataByFields = dataCollect(data, this.fields)
        this.data4Reg = data4Regression(this.dataByFields, this.fields)
        // console.log(this.fields)
        // 初始化元素
        let svg = d3.select(id)
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        this.g_text = svg.append("g")
                    .attr("transform", `translate(${x}, ${y})`)
        this.g_graphic = svg.append("g")
                    .attr("transform", `translate(0, 100)`)

        if(fields.length == 8){
            writeText(400, 50, 0, "CDR measure attributes", this.g_text, "20px");
        }else{
            writeText(400, 50, 0, "MMSE measure attributes", this.g_text, "20px");
        }

        
        // data for g
        var y = {}
        for (let i of this.fields) {
            let name = i
            y[name] = d3.scaleLinear()
                        .domain( d3.extent(data, function(d) { 
                            return +d[name]; 
                        }) )
                        .rangeRound([height-150, 0])
            if(id == "#paral-co2" && name=="Hb-A1C "){
                y[name] = d3.scaleLinear()
                        .domain( d3.extent(data, function(d) { 
                            return +d[name]; 
                        }) )
                        .rangeRound([0, height-150])
            }
        }


        x = d3.scalePoint()
                .range([0, width])
                .padding(1)
                .domain(this.fields);
        
        function path(d) {
            return d3.line()(onlyFields.map(function(p) { 
                return [x(p), y[p](d[p])]; 
            }));
        }

        // tree for rendering
        this.g_graphic.selectAll("myPath")
                        .data(data)
                        .enter().append("path")
                        .transition()
                        .duration(1000)
                        .attr("d",  path)
                        .style("fill", "none")
                        .style("stroke", "#69b3a2")
                        .style("opacity", 0.05)

        let texts = this.g_graphic.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
                        .data(fields).enter()
                        .append("g")
                        .attr("class", "axis")
        // I translate this element to its right position on the x axis
                        .attr("transform", function(d) { return "translate(" + x(d.name) + ")"; })
        // And I build the axis with the call function
                        .each(function(d) { 
                            // console.log(y[d])
                            d3.select(this)
                            .call(d3.axisLeft()
                            .scale(y[d.name])); 
                        })
        // Add axis title
                        .append("text")
                            .style("text-anchor", "middle")
                            .attr("y", -9)
                            .attr("class", "paral-text")
                            .text(function(d) { return d.name.concat("  ", d.reg ? Math.round(parseFloat(d.reg)*1000)/1000 : ""); })
                            .style("fill", "black")
                            .on("dblclick", (d,i) => {
                                const element = document.getElementById(id.slice(-9));
                                while (element.hasChildNodes()) {
                                    element.removeChild(element.firstChild);
                                }
                                // regress sum[(x-x.mean)(y-y.mean)]/sumPowOfDiff
                                const compareF = this.fields.filter((field) => field != this.fields[i])
                                
                                // get d's sumPowOfDiff and arr4Diff
                                const sumPowOfDiff = this.data4Reg[this.fields[i]]["sumPowOfDiff"]
                                const arr4Diff = this.data4Reg[this.fields[i]]["arr4Diff"]
                                let objs = []
                                for (f of compareF){
                                    const sumPowOfDiffC = this.data4Reg[f]["sumPowOfDiff"]
                                    const arr4DiffC = this.data4Reg[f]["arr4Diff"]
                                    let sumT=0
                                    for(let i=0; i<arr4DiffC.length; i++){
                                        sumT += arr4DiffC[i] * arr4Diff[i]
                                    }
                                    // reg
                                    let r=sumT/sumPowOfDiff
                                    // obj 
                                    let obj={}
                                    obj["name"] = f
                                    obj["reg"] = r
                                    objs.push(obj)
                                    
                                }
                                // console.log(objs)
                                objs.sort((i1, i2)=> i2.reg-i1.reg)
                                let newFields = []
                                newFields.push({"name":this.fields[i], "reg":''})
                                objs.forEach( i => newFields.push(i))
                                // console.log(newFields)
                                let fA=new fig(0, 0, 1200, 500, id, newFields, data)
                                writeText(100, 450, 0, "reg", this.g_text, "20px");
                            }).on("click", (d,i) => {
                                if(d.name != "Hb-A1C "){
                                    if(d.name.slice(0,3) == "CDR"){
                                        if(!cdrattrArr.find((element) => element == d.name)){
                                            cdrattrArr.push(d.name)
                                            let e = document.getElementsByClassName("cdr_attr");
                                            while (e[0].hasChildNodes()) {
                                                e[0].removeChild(e[0].firstChild);
                                              }
                                            if(cdrattrArr.length > chosenAttr ) cdrattrArr = cdrattrArr.slice(1)
                                            for(let a of cdrattrArr){
                                                const newContent = document.createTextNode(a);
                                                const br = document.createElement("br");
                                                e[0].appendChild(newContent);
                                                e[0].appendChild(br);
                                            }
                                        }

                                    }else{
                                        if(!mmseattrArr.find((element) => element == d.name)){
                                            mmseattrArr.push(d.name)
                                            let e = document.getElementsByClassName("mmse_attr");
                                            while (e[0].hasChildNodes()) {
                                                e[0].removeChild(e[0].firstChild);
                                              }
                                            if(mmseattrArr.length > chosenAttr ) mmseattrArr = mmseattrArr.slice(1)
                                            for(let a of mmseattrArr){
                                                const newContent = document.createTextNode(a);
                                                const br = document.createElement("br");
                                                e[0].appendChild(newContent);
                                                e[0].appendChild(br);
                                            }
                                        }

                                    }
                                    
                                }
                                console.log(attrArr)

                            })

                            function getS(){
                                console.log(this.fields)
                            }

    }
}

function newPage(){
    let attrArr = [[...cdrattrArr], [...mmseattrArr]]
    localStorage.setItem("storageName",attrArr);
    var newUrl = 'http://127.0.0.1:5501/Project.html'
    window.location.replace(newUrl);
}



async function main() {
    console.log(window.innerWidth); // 瀏覽器寬度
    console.log(document.documentElement.scrollWidth); // 網頁正文全文寬度
    // load data
    cdrData = await loadCSVData("cdrData.csv");
    mmseData = await loadCSVData("mmseData.csv");
    cdrFields = cdrData.columns
    mmseFields = mmseData.columns
    // console.log(cdrData)
    // console.log(mmseData)
    // clean data
    cdrData = await dataClean(0, cdrData)
    mmseData = await dataClean(1, mmseData)
    // prepare data 
    const cfields = dataProcessFig(cdrFields)
    const mfields = dataProcessFig(mmseFields)
    const figA = new fig(0, 0, 1200, 500, "#paral-co1", cfields, cdrData)
    const figB = new fig(0, 0, 1200, 500, "#paral-co2", mfields, mmseData)
    
    
    


}



main()

