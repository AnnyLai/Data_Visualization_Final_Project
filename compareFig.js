class compareFig{
    svg
    g_text
    g_graphic
    mmse_fields
    cdr_fields
    x
    y
    constructor(x, y, width, height, id, data, AB){
        // data process
        const str_attr = localStorage.getItem("storageName")
        const fields = str_attr.split(',');
        this.mmse_fields = dataProcessCompareFig(fields, "MMS")
        this.cdr_fields = dataProcessCompareFig(fields, "CDR")
        // console.log(this.mmse_fields)
        // console.log(this.cdr_fields)
        // 初始化元素
        let svg = d3.select(id)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("transform", `translate(${100}, ${0})`)

        this.g_text = svg.append("g")
                    .attr("transform", `translate(${0}, ${0})`)
        this.g_graphic = svg.append("g")
                    .attr("transform", `translate(${100}, ${0})`)
                    .attr("id", id+"0")

        this.svg = svg
        writeText(200, 550, 0, "Hb-A1C", this.g_text, "20px");
        
        if(AB){
          writeText(200, 100, 0, "CDR", this.g_text, "30px");
          writeText(185, -10, 90, "(the lower score is better)", this.g_text, "15px");
          writeText(230, -30, 90, this.cdr_fields[0], this.g_text, "20px");
          this.buildFig(data, this.cdr_fields[0])
      }else{
          writeText(200, 50, 0, "MMSE", this.g_text, "30px");
          
          writeText(230, -30, 90, this.mmse_fields[0], this.g_text, "20px");
          this.buildFig(data, this.mmse_fields[0])
      }
        
        
    }

    buildFig(data, str_yAxis) {
        
        // Add X axis
        var x = d3.scaleLinear()
          .domain(d3.extent(data, function(d) { 
            return +d["Hb-A1C "]; 
        }))
          .range([ 0, 450 ]);

        this.g_graphic.append("g")
          .attr("transform", "translate(0," + 500 + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          .domain(d3.extent(data, function(d) { 
            return +d[str_yAxis]; 
        }))
          .range([ 500, 100]);

        this.g_graphic.append("g")
          .call(d3.axisLeft(y));


        // // Add dots
        this.g_graphic.append('g')
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
            .attr("cx", function (d) { return x(d["Hb-A1C "]); } )
            .attr("cy", function (d) { return y(d[str_yAxis]); } )
            .attr("r", 2.5)
            .transition()
            .duration(1000)
            .style("fill", "Blue")
            .style("opacity", 0.5)
            
    }

    update(data, str_yAxis, conditions) {
        // console.log(data)

        this.g_graphic
          .selectAll("g")
          .remove();

        const newData = dataFilterCompareFig(data, conditions)
        // console.log(newData)
          this.buildFig(newData, str_yAxis)

    }
}
let figA;
let figB;
let cdrData 
let mmseData

async function main() {
    // load data
    cdrData = await loadCSVData("cdrData.csv");
    mmseData = await loadCSVData("mmseData.csv");
    // console.log(cdrData)
    // console.log(mmseData)
    // clean data
    cdrData = await dataClean(0, cdrData)
    mmseData = await dataClean(1, mmseData)
    const str_attr = localStorage.getItem("storageName")
    const fields = str_attr.split(',');
    console.log(fields)
    for( f of fields){
      if(f.slice(0,3) === "MMS"){
        figB = new compareFig(1600, 600, 800, 600, "#result", mmseData, 0)
      }
      if(f.slice(0,3) === "CDR"){
        figA = new compareFig(1600, 0, 800, 600, "#result", cdrData, 1)
      }
      
    }
}

main()