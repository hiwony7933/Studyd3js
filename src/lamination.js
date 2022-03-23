let data = [];

const weightSize = 2;
const itemWeight = 3;
const pageH = 150 * weightSize; // svg H size
const pageW = 100 * weightSize; // svg W size

let rowIndex = 0; // 데이터 갯수
let svgInterval; // setInterval
let intervalTime = 1000; // play interval value
let isPlay = false; // play 여부
let checkedSVGList = {
    'edge': true,
    'gold': true,
    'silver': true,
    'sky': true,
    'gray': true,
    'black': true
}

function init() {
    initSVG();
}
init();

function initSVG() {
    const svg = d3.select('body')
        .append("svg")
        .attr("xmlns", "http://www.w3.org/2000/svg");
    
    const arrowMarker= svg.append("defs");
    
    // ◀ 모양 big 화살표
    arrowMarker.append("marker")
        .attr("id", "bigLeftArrow")
        .attr("markerWidth", "5")
        .attr("markerHeight", "5")
        .attr("refX", "5")
        .attr("refY", "2.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "5 0, 5 5, 0 2.5")
        .attr("fill", "red");

    // ▶ 모양 big 화살표
    arrowMarker.append("marker")
        .attr("id", "bigRightArrow")
        .attr("markerWidth", "5")
        .attr("markerHeight", "5")
        .attr("refX", "0")
        .attr("refY", "2.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 0, 5 2.5, 0 5")
        .attr("fill", "red");

    // ◀ 모양 small 화살표
    arrowMarker.append("marker")
        .attr("id", "smallLeftArrowPink")
        .attr("markerWidth", "3")
        .attr("markerHeight", "3")
        .attr("refX", "3")
        .attr("refY", "1.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "3 0, 3 3, 0 1.5")
        .attr("fill", "pink");
    arrowMarker.append("marker")
        .attr("id", "smallLeftArrowOrange")
        .attr("markerWidth", "3")
        .attr("markerHeight", "3")
        .attr("refX", "3")
        .attr("refY", "1.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "3 0, 3 3, 0 1.5")
        .attr("fill", "Orange");

    // ▶ 모양 small 화살표
    arrowMarker.append("marker")
        .attr("id", "smallRightArrowPink")
        .attr("markerWidth", "3")
        .attr("markerHeight", "3")
        .attr("refX", "0")
        .attr("refY", "1.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 0, 3 1.5, 0 3")
        .attr("fill", "pink");
    arrowMarker.append("marker")
        .attr("id", "smallRightArrowOrange")
        .attr("markerWidth", "3")
        .attr("markerHeight", "3")
        .attr("refX", "0")
        .attr("refY", "1.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 0, 3 1.5, 0 3")
        .attr("fill", "orange");
    
    // ▲ 모양 화살표
    arrowMarker.append("marker")
        .attr("id", "uparrow")
        .attr("markerWidth", "3")
        .attr("markerHeight", "3")
        .attr("refX", "3")
        .attr("refY", "1.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 1.5, 3 0, 3 3")
        .attr("fill", "red");
    arrowMarker.append("marker")
        .attr("id", "uparrowGreen")
        .attr("markerWidth", "3")
        .attr("markerHeight", "3")
        .attr("refX", "3")
        .attr("refY", "1.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 1.5, 3 0, 3 3")
        .attr("fill", "green");
    arrowMarker.append("marker")
        .attr("id", "uparrowBlue")
        .attr("markerWidth", "3")
        .attr("markerHeight", "3")
        .attr("refX", "3")
        .attr("refY", "1.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 1.5, 3 0, 3 3")
        .attr("fill", "blue");

    // ▼ 모양 화살표
    arrowMarker.append("marker")
        .attr("id", "downarrow")
        .attr("markerWidth", "3")
        .attr("markerHeight", "3")
        .attr("refX", "0")
        .attr("refY", "1.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 0, 3 1.5, 0 3")
        .attr("fill", "red");
    arrowMarker.append("marker")
        .attr("id", "downarrowGreen")
        .attr("markerWidth", "3")
        .attr("markerHeight", "3")
        .attr("refX", "0")
        .attr("refY", "1.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 0, 3 1.5, 0 3")
        .attr("fill", "green");
    arrowMarker.append("marker")
        .attr("id", "downarrowBlue")
        .attr("markerWidth", "3")
        .attr("markerHeight", "3")
        .attr("refX", "0")
        .attr("refY", "1.5")
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 0, 3 1.5, 0 3")
        .attr("fill", "blue");
}

/////////////////////////////// begin of point 계산 ////////////////////////////////////

// edge 좌표 계산
function getEdgePoint(raw, isThumb) {
    const ww = isThumb?1.2:weightSize;
    //Edge 높이
    const WH = (pageH * 0.9/weightSize)*ww;
    const WS = (raw.WS || 0 )* ww;

    // Left Right Top Bottom
    let xL = (pageW*ww/weightSize - WS) / 2;
    let xR = xL + WS;
    let yT = (pageH*ww/weightSize - WH) / 2;
    let yB = yT + WH;

    return [[xL, yT], [xR, yT], [xR, yB], [xL, yB]];
}

// black 좌표 계산
function getCSPoint(raw, edge, isThumb) {
    const ww = (isThumb?1.2:weightSize) * itemWeight;
    
    let xLT = edge[0][0] + (raw.CS_3 || 0) * ww;
    let xRT = edge[1][0] - (raw.CS_2 || 0) * ww;
    let xRB = edge[2][0] - (raw.CS_1 || 0) * ww;
    let xLB = edge[3][0] + (raw.CS_4 || 0) * ww;

    let yLT = edge[0][1] + (raw.CS_C2 || 0) * ww;
    let yRT = edge[1][1] + (raw.CS_C1 || 0) * ww;
    let yRB = edge[2][1] - (raw.CS_A1 || 0) * ww;
    let yLB = edge[3][1] - (raw.CS_A2 || 0) * ww;

    return [[xLT, yLT], [xRT, yRT], [xRB, yRB], [xLB, yLB]];
}

// silver 좌표 계산
function getTCPoint(raw, csPoint, isThumb) {
    const ww = isThumb?1.2:weightSize;
    //let x = csPoint[1][0] - (raw.TPC || 0) * ww - (raw.TWC || 0) * ww;
    let x = (pageW / weightSize - (raw.TWC || 0)) * ww / 2;
    let y = pageH * ww / weightSize * (3/4);
    let width = (raw.TWC || 0) * ww;
    let height = pageH * ww / weightSize / 4

    // 시작 위치 Left Top, 가로, 세로
    return [[x, y], width, height];
}

// gold 좌표 계산
function getTAPoint(raw, isThumb) {
    const ww = isThumb?1.2:weightSize;
    let x = (pageW / weightSize - (raw.TWA || 0)) * ww / 2;
    let y = 0;
    let width = (raw.TWA || 0) * ww;
    let height = pageH * ww / weightSize / 4;

    return [[x, y], width, height];
}

// gray 좌표 계산
function getACPoint(raw, csPoint, isThumb) {
    const ww = isThumb?1.2:weightSize * itemWeight;

    let xLT = csPoint[0][0] - (raw.AC_3 || 0) * ww;
    let xRT = csPoint[1][0] + (raw.AC_2 || 0) * ww;
    let xRB = csPoint[2][0] + (raw.AC_1 || 0) * ww;
    let xLB = csPoint[3][0] - (raw.AC_4 || 0) * ww;

    let yLT = csPoint[0][1] - (raw.AC_C2 || 0) * ww;
    let yRT = csPoint[1][1] - (raw.AC_C1 || 0) * ww;
    let yRB = csPoint[2][1] + (raw.AC_A1 || 0) * ww;
    let yLB = csPoint[3][1] + (raw.AC_A2 || 0) * ww;

    return [[xLT, yLT], [xRT, yRT], [xRB, yRB], [xLB, yLB]];
}

// sky 좌표 계산
function getSMPoint(raw, edgePoint, acPoint, isThumb) {
    const ww = isThumb?1.2:weightSize * itemWeight;
    
    let xLT = edgePoint[0][0];
    let xRT = edgePoint[1][0];
    let xRB = edgePoint[2][0];
    let xLB = edgePoint[3][0];

    let yLT = acPoint[0][1] - (raw.SM_C2 || 0) * ww;
    let yRT = acPoint[1][1] - (raw.SM_C1 || 0) * ww;
    let yRB = acPoint[2][1] + (raw.SM_A1 || 0) * ww;
    let yLB = acPoint[3][1] + (raw.SM_A2 || 0) * ww;

    return [[xLT, yLT], [xRT, yRT], [xRB, yRB], [xLB, yLB]];
}

// raw 1개를 계산된 좌표를 가지는 row로 변경
function getPoint(raw, isThumb) {
    let edgePoint = getEdgePoint(raw, isThumb);
    let csPoint = getCSPoint(raw, edgePoint, isThumb);

    let tcPoint = getTCPoint(raw, csPoint, isThumb);
    let taPoint = getTAPoint(raw, isThumb);

    let acPoint = getACPoint(raw, csPoint, isThumb);
    let smPoint = getSMPoint(raw, edgePoint, acPoint, isThumb);

    return {
        "DateTime": raw.DateTime,
        "cell_id": raw.cell_id,
        "edgePoint": edgePoint,
        "csPoint": csPoint,
        "tcPoint": tcPoint,
        "taPoint": taPoint,
        "acPoint": acPoint,
        "smPoint": smPoint
    }
}

/////////////////////////////// end of point 계산 ////////////////////////////////////

/////////////////////////////// begin of SVG draw ////////////////////////////////////

// SVG 그리는 부분
function appendSVGItem(svg, point, raw, chartType) {
    svg.append("g")     // edgePoint(edge) 그리기
        .attr("class","svg-edge")
        .append("polygon")
        .attr("points", point.edgePoint[3][0] + "," + point.edgePoint[3][1] + " " +
                        point.edgePoint[2][0] + "," + point.edgePoint[2][1] + " " +
                        point.edgePoint[1][0] + "," + point.edgePoint[1][1] + " " +
                        point.edgePoint[0][0] + "," + point.edgePoint[0][1])
        .attr("fill", "rgb(237, 242, 248)")
        .attr("opacity", checkedSVGList['edge']?1:0);

    svg.append("g")     // smPoint(sky) 그리기
        .attr("class","svg-sky")
        .append("polygon")
        .attr("points", point.smPoint[3][0] + "," + point.smPoint[3][1] + " " +
                        point.smPoint[2][0] + "," + point.smPoint[2][1] + " " +
                        point.smPoint[1][0] + "," + point.smPoint[1][1] + " " +
                        point.smPoint[0][0] + "," + point.smPoint[0][1])
        .attr("fill", "rgb(228, 235, 244)")
        .attr("opacity", checkedSVGList['sky']?1:0);

    svg.append("g")     // taPoint(gold)  그리기
        .attr("class","svg-gold")
        .append("rect")
        .attr("x", point.taPoint[0][0])
        .attr("y", point.taPoint[0][1])
        .attr("width", point.taPoint[1])
        .attr("height", point.taPoint[2])
        .attr("fill", "rgb(226, 182, 87)")
        .attr("opacity", checkedSVGList['gold']?1:0);

    svg.append("g")     // tcPoint(silver)  그리기
        .attr("class","svg-silver")
        .append("rect")
        .attr("x", point.tcPoint[0][0])
        .attr("y", point.tcPoint[0][1])
        .attr("width", point.tcPoint[1])
        .attr("height", point.tcPoint[2])
        .attr("fill", "rgb(166, 166, 166)")
        .attr("opacity", checkedSVGList['silver']?1:0);

    svg.append("g")     // acPoint(gray) 그리기
        .attr("class","svg-gray")
        .append("polygon")
        .attr("points", point.acPoint[3][0] + "," + point.acPoint[3][1] + " " +
                        point.acPoint[2][0] + "," + point.acPoint[2][1] + " " +
                        point.acPoint[1][0] + "," + point.acPoint[1][1] + " " +
                        point.acPoint[0][0] + "," + point.acPoint[0][1])
        .attr("fill", "rgb(127, 127, 127)")
        .attr("opacity", checkedSVGList['gray']?1:0);

    svg.append("g")     // csPoint(black) 그리기
        .attr("class","svg-black")
        .append("polygon")
        .attr("points", point.csPoint[3][0] + "," + point.csPoint[3][1] + " " +
                        point.csPoint[2][0] + "," + point.csPoint[2][1] + " " +
                        point.csPoint[1][0] + "," + point.csPoint[1][1] + " " +
                        point.csPoint[0][0] + "," + point.csPoint[0][1])
        .attr("fill", "black")
        .attr("opacity", checkedSVGList['black']?1:0);

    if(chartType == 'main') {
        // WC line 그리기
        svg.append("line")
        .attr("x1", point.csPoint[3][0] + 5)
        .attr("y1", "60")
        .attr("x2", point.csPoint[2][0] - 5)
        .attr("y2", "60")
        .attr("marker-start", "url(#bigLeftArrow)")
        .attr("marker-end", "url(#bigRightArrow)")
        .attr("stroke", "red")
        .attr("stroke-width", "1")

        svg.append("text")
        .attr("dominant-baseline", "middle")
        .attr("x", ((point.csPoint[2][0] - 5) - (point.csPoint[3][0] + 5))/2)
        .attr("y", "55")
        .text("WC : " + raw.WC?.toFixed(3))
        .attr("font-size", "11px")
        .attr("fill", "red")

        // WS line
        svg.append("line")
        .attr("x1", point.edgePoint[3][0] + 5)
        .attr("y1", "150")
        .attr("x2", point.edgePoint[2][0] - 5)
        .attr("y2", "150")
        .attr("marker-start", "url(#bigLeftArrow)")
        .attr("marker-end", "url(#bigRightArrow)")
        .attr("stroke", "red")
        .attr("stroke-width", "1")

        svg.append("text")
        .attr("dominant-baseline", "middle")
        .attr("x", ((point.edgePoint[2][0] - 5) - (point.edgePoint[3][0] + 5))/2)
        .attr("y", "145")
        .text(raw.WS.toFixed(3))
        .attr("font-size", "11px")
        .attr("fill", "red")

        // WA line
        svg.append("line")
        .attr("x1", point.acPoint[3][0] + 5)
        .attr("y1", "240")
        .attr("x2", point.acPoint[2][0] - 5)
        .attr("y2", "240")
        .attr("marker-start", "url(#bigLeftArrow)")
        .attr("marker-end", "url(#bigRightArrow)")
        .attr("stroke", "red")
        .attr("stroke-width", "1")

        svg.append("text")
        .attr("dominant-baseline", "middle")
        .attr("x", ((point.acPoint[2][0] - 5) - (point.acPoint[3][0] + 5))/2)
        .attr("y", "235")
        .text("WA : " + raw.WA?.toFixed(3))
        .attr("font-size", "11px")
        .attr("fill", "red")

        // TWA line
        if(checkedSVGList['gold']) {
            svg.append("line")
            .attr("x1", point.taPoint[0][0] + 5)
            .attr("y1", "10")
            .attr("x2", (point.taPoint[0][0] + point.taPoint[1]) - 5)
            .attr("y2", "10")
            .attr("marker-start", "url(#bigLeftArrow)")
            .attr("marker-end", "url(#bigRightArrow)")
            .attr("stroke", "red")
            .attr("stroke-width", "1");
    
            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", (point.taPoint[0][0] + point.taPoint[1])/2)
            .attr("y", "5")
            .text("TWA : " + (raw.TWA?.toFixed(3)))
            .attr("font-size", "11px")
            .attr("fill", "red");
        }

        // TWC line
        if(checkedSVGList['silver']){
            svg.append("line")
            .attr("x1", point.tcPoint[0][0] + 5)
            .attr("y1", "290")
            .attr("x2", (point.tcPoint[0][0] + point.tcPoint[1]) - 5)
            .attr("y2", "290")
            .attr("marker-start", "url(#bigLeftArrow)")
            .attr("marker-end", "url(#bigRightArrow)")
            .attr("stroke", "red")
            .attr("stroke-width", "1");
    
            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", (point.tcPoint[0][0] + point.tcPoint[1])/2)
            .attr("y", "285")
            .text("TWC : " + (raw.TWC?.toFixed(3)))
            .attr("font-size", "11px")
            .attr("fill", "red");
        }
    }

    if(chartType == 'side' || chartType == 'main') {
        
        if(checkedSVGList['black'] && checkedSVGList['edge']) {
            // CS_A2 line(left top)
            svg.append("line")
            .attr("x1", point.csPoint[0][0] + 2)
            .attr("y1", point.edgePoint[0][1] + 3)
            .attr("x2", point.csPoint[0][0] + 2)
            .attr("y2", point.csPoint[0][1] - 3)
            .attr("marker-start", "url(#uparrow)")
            .attr("marker-end", "url(#downarrow)")
            .attr("stroke", "red")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.csPoint[0][0] + 4)
            .attr("y", ((point.edgePoint[0][1] + 3) + (point.csPoint[0][1] - 3))/2)
            .text(raw.CS_A2?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "red")

            // CS_A1 line (right top)
            svg.append("line")
            .attr("x1", point.csPoint[1][0] - 15)
            .attr("y1", point.edgePoint[1][1] + 3)
            .attr("x2", point.csPoint[1][0] - 15)
            .attr("y2", point.csPoint[1][1] - 3)
            .attr("marker-start", "url(#uparrow)")
            .attr("marker-end", "url(#downarrow)")
            .attr("stroke", "red")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.csPoint[1][0] - 14)
            .attr("y", ((point.edgePoint[1][1] + 3) + (point.csPoint[1][1] - 3))/2)
            .text(raw.CS_A1?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "red")

            // CS_C2 line (left bottom)
            svg.append("line")
            .attr("x1", point.csPoint[3][0] + 2)
            .attr("y1", point.edgePoint[3][1] - 3)
            .attr("x2", point.csPoint[3][0] + 2)
            .attr("y2", point.csPoint[3][1] + 3)
            .attr("marker-start", "url(#uparrow)")
            .attr("marker-end", "url(#downarrow)")
            .attr("stroke", "red")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.csPoint[3][0] + 4)
            .attr("y", ((point.edgePoint[3][1] - 3) + (point.csPoint[3][1] + 3))/2)
            .text(raw.CS_C2?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "red")

            // CS_C1 line (right bottom)
            svg.append("line")
            .attr("x1", point.csPoint[2][0] - 15)
            .attr("y1", point.edgePoint[2][1] - 3)
            .attr("x2", point.csPoint[2][0] - 15)
            .attr("y2", point.csPoint[2][1] + 3)
            .attr("marker-start", "url(#uparrow)")
            .attr("marker-end", "url(#downarrow)")
            .attr("stroke", "red")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.csPoint[2][0] - 14)
            .attr("y", ((point.edgePoint[2][1] - 3) + (point.csPoint[2][1] + 3))/2)
            .text(raw.CS_C1?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "red")
        }

        if(checkedSVGList['black'] && checkedSVGList['sky']) {
            // CS_4 (left top)
            svg.append("line")
            .attr("x1", point.smPoint[0][0] + 3)
            .attr("y1", point.csPoint[0][1] + 3)
            .attr("x2", point.csPoint[0][0] - 3)
            .attr("y2", point.csPoint[0][1] + 3)
            .attr("marker-start", "url(#smallLeftArrowOrange)")
            .attr("marker-end", "url(#smallRightArrowOrange)")
            .attr("stroke", "orange")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", (point.csPoint[0][0] + point.smPoint[0][0])/2)
            .attr("y", point.csPoint[0][1])
            .text(raw.CS_4?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "orange")

            // CS_1 (right top)
            svg.append("line")
            .attr("x1", point.smPoint[1][0] - 3)
            .attr("y1", point.csPoint[1][1] + 3)
            .attr("x2", point.csPoint[1][0] + 3)
            .attr("y2", point.csPoint[1][1] + 3)
            .attr("marker-start", "url(#smallLeftArrowOrange)")
            .attr("marker-end", "url(#smallRightArrowOrange)")
            .attr("stroke", "orange")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", (point.csPoint[1][0] + point.smPoint[1][0])/2)
            .attr("y", point.csPoint[1][1])
            .text(raw.CS_1?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "orange")

            // CS_3 (left bottom)
            svg.append("line")
            .attr("x1", point.smPoint[3][0] + 3)
            .attr("y1", point.csPoint[3][1] - 3)
            .attr("x2", point.csPoint[3][0] - 3)
            .attr("y2", point.csPoint[3][1] - 3)
            .attr("marker-start", "url(#smallLeftArrowOrange)")
            .attr("marker-end", "url(#smallRightArrowOrange)")
            .attr("stroke", "orange")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", (point.csPoint[3][0] + point.smPoint[3][0])/2)
            .attr("y", point.csPoint[3][1] - 7)
            .text(raw.CS_3?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "orange")

            // CS_2 (right bottom)
            svg.append("line")
            .attr("x1", point.smPoint[2][0] - 3)
            .attr("y1", point.csPoint[2][1] - 3)
            .attr("x2", point.csPoint[2][0] + 3)
            .attr("y2", point.csPoint[2][1] - 3)
            .attr("marker-start", "url(#smallLeftArrowOrange)")
            .attr("marker-end", "url(#smallRightArrowOrange)")
            .attr("stroke", "orange")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", (point.csPoint[2][0] + point.smPoint[2][0])/2)
            .attr("y", point.csPoint[2][1] - 7)
            .text(raw.CS_2?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "orange")
        }

        if(checkedSVGList['gray'] && checkedSVGList['sky']) {
            // SM_A2 line(left top)
            svg.append("line")
            .attr("x1", point.acPoint[0][0] + 2)
            .attr("y1", point.smPoint[0][1] + 3)
            .attr("x2", point.acPoint[0][0] + 2)
            .attr("y2", point.acPoint[0][1] - 3)
            .attr("marker-start", "url(#uparrowBlue)")
            .attr("marker-end", "url(#downarrowBlue)")
            .attr("stroke", "blue")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.acPoint[0][0] + 4)
            .attr("y", ((point.smPoint[0][1]) + (point.acPoint[0][1]))/2)
            .text(raw.SM_A2?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "blue")

            // SM_A1 (right top)
            svg.append("line")
            .attr("x1", point.acPoint[1][0] - 2)
            .attr("y1", point.smPoint[1][1] + 3)
            .attr("x2", point.acPoint[1][0] - 2)
            .attr("y2", point.acPoint[1][1] - 3)
            .attr("marker-start", "url(#uparrowBlue)")
            .attr("marker-end", "url(#downarrowBlue)")
            .attr("stroke", "blue")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.acPoint[1][0])
            .attr("y", ((point.smPoint[1][1] + 3) + (point.acPoint[1][1] - 3))/2)
            .text(raw.SM_A1?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "blue")

            // SM_C2 (left bottom)
            svg.append("line")
            .attr("x1", point.acPoint[3][0] + 2)
            .attr("y1", point.smPoint[3][1] - 3)
            .attr("x2", point.acPoint[3][0] + 2)
            .attr("y2", point.acPoint[3][1] + 3)
            .attr("marker-start", "url(#uparrowBlue)")
            .attr("marker-end", "url(#downarrowBlue)")
            .attr("stroke", "blue")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.acPoint[3][0] + 4)
            .attr("y", ((point.smPoint[3][1] - 3) + (point.acPoint[3][1] + 3))/2)
            .text(raw.SM_C2?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "blue")

            // SM_C1 (right bottom)
            svg.append("line")
            .attr("x1", point.acPoint[2][0] - 3)
            .attr("y1", point.smPoint[2][1] - 3)
            .attr("x2", point.acPoint[2][0] - 3)
            .attr("y2", point.acPoint[2][1] + 3)
            .attr("marker-start", "url(#uparrowBlue)")
            .attr("marker-end", "url(#downarrowBlue)")
            .attr("stroke", "blue")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.acPoint[2][0])
            .attr("y", ((point.smPoint[2][1] - 3) + (point.acPoint[2][1] + 3))/2)
            .text(raw.SM_C1?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "blue")
        }

        if(checkedSVGList['gray'] && checkedSVGList['black']) {
            // AC_A2 (left top)
            svg.append("line")
            .attr("x1", point.csPoint[0][0] + 5)
            .attr("y1", point.acPoint[0][1] + 3)
            .attr("x2", point.csPoint[0][0] + 5)
            .attr("y2", point.csPoint[0][1] - 3)
            .attr("marker-start", "url(#uparrowGreen)")
            .attr("marker-end", "url(#downarrowGreen)")
            .attr("stroke", "green")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.csPoint[0][0] + 7)
            .attr("y", ((point.acPoint[0][1]) + (point.csPoint[0][1]))/2)
            .text(raw.AC_A2?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "green")

            // AC_A1 (right top)
            svg.append("line")
            .attr("x1", point.csPoint[1][0] - 2)
            .attr("y1", point.acPoint[1][1] + 3)
            .attr("x2", point.csPoint[1][0] - 2)
            .attr("y2", point.csPoint[1][1] - 3)
            .attr("marker-start", "url(#uparrowGreen)")
            .attr("marker-end", "url(#downarrowGreen)")
            .attr("stroke", "green")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.csPoint[1][0])
            .attr("y", ((point.acPoint[1][1] + 3) + (point.csPoint[1][1] - 3))/2)
            .text(raw.AC_A1?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "green")

            // AC_C2 (left bottom)
            svg.append("line")
            .attr("x1", point.csPoint[3][0] + 5)
            .attr("y1", point.acPoint[3][1] - 3)
            .attr("x2", point.csPoint[3][0] + 5)
            .attr("y2", point.csPoint[3][1] + 3)
            .attr("marker-start", "url(#uparrowGreen)")
            .attr("marker-end", "url(#downarrowGreen)")
            .attr("stroke", "green")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.csPoint[3][0] + 7)
            .attr("y", ((point.acPoint[3][1] - 3) + (point.csPoint[3][1] + 3))/2)
            .text(raw.AC_C2?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "green")

            // AC_C1 (right bottom)
            svg.append("line")
            .attr("x1", point.csPoint[2][0] - 2)
            .attr("y1", point.acPoint[2][1] - 3)
            .attr("x2", point.csPoint[2][0] - 2)
            .attr("y2", point.csPoint[2][1] + 3)
            .attr("marker-start", "url(#uparrowGreen)")
            .attr("marker-end", "url(#downarrowGreen)")
            .attr("stroke", "green")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", point.csPoint[2][0])
            .attr("y", ((point.acPoint[2][1] - 3) + (point.csPoint[2][1] + 3))/2)
            .text(raw.AC_C1?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "green")

            // AC_4 (left top)
            svg.append("line")
            .attr("x1", point.acPoint[0][0] + 3)
            .attr("y1", point.csPoint[0][1] + 15)
            .attr("x2", point.csPoint[0][0] - 3)
            .attr("y2", point.csPoint[0][1] + 15)
            .attr("marker-start", "url(#smallLeftArrowPink)")
            .attr("marker-end", "url(#smallRightArrowPink)")
            .attr("stroke", "pink")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", (point.csPoint[0][0] + point.smPoint[0][0])/2)
            .attr("y", point.csPoint[0][1] + 11)
            .text(raw.AC_4?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "pink")

            // AC_1 (right top)
            svg.append("line")
            .attr("x1", point.acPoint[1][0] - 3)
            .attr("y1", point.csPoint[1][1] + 15)
            .attr("x2", point.csPoint[1][0] + 3)
            .attr("y2", point.csPoint[1][1] + 15)
            .attr("marker-start", "url(#smallLeftArrowPink)")
            .attr("marker-end", "url(#smallRightArrowPink)")
            .attr("stroke", "pink")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", (point.smPoint[1][0] + point.csPoint[1][0])/2)
            .attr("y", point.csPoint[1][1] + 11)
            .text(raw.AC_1?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "pink")

            // AC_3 (left bottom)
            svg.append("line")
            .attr("x1", point.acPoint[3][0] + 3)
            .attr("y1", point.csPoint[3][1] - 11)
            .attr("x2", point.csPoint[3][0] - 3)
            .attr("y2", point.csPoint[3][1] - 11)
            .attr("marker-start", "url(#smallLeftArrowPink)")
            .attr("marker-end", "url(#smallRightArrowPink)")
            .attr("stroke", "pink")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", (point.csPoint[3][0] + point.smPoint[3][0])/2)
            .attr("y", point.csPoint[3][1] - 15)
            .text(raw.AC_3?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "pink")

            // AC_2 (right bottom)
            svg.append("line")
            .attr("x1", point.acPoint[2][0] - 3)
            .attr("y1", point.csPoint[2][1] - 11)
            .attr("x2", point.csPoint[2][0] + 3)
            .attr("y2", point.csPoint[2][1] - 11)
            .attr("marker-start", "url(#smallLeftArrowPink)")
            .attr("marker-end", "url(#smallRightArrowPink)")
            .attr("stroke", "pink")
            .attr("stroke-width", "1")

            svg.append("text")
            .attr("dominant-baseline", "middle")
            .attr("x", (point.smPoint[2][0] + point.csPoint[2][0])/2)
            .attr("y", point.csPoint[2][1] - 15)
            .text(raw.AC_2?.toFixed(3))
            .attr("font-size", "5px")
            .attr("fill", "pink")
        }
    }

    if (chartType == 'thumb') {
        svg.append("text")
        .attr("dominant-baseline", "middle")
        .attr("x", ((point.edgePoint[2][0] - 5) - (point.edgePoint[3][0] + 5))/2)
        .attr("y", "80")
        .text(raw.Result)
        .attr("font-size", "14px")
        .attr("fill", "red")
        svg.append("text")
        .attr("dominant-baseline", "middle")
        .attr("x", ((point.edgePoint[2][0] - 5) - (point.edgePoint[3][0] + 5)) / 2 - 5)
        .attr("y", "100")
        .text(raw.Result=='NG'?'('+raw.NGTYPE+')':'')   // NG Type???
        .attr("font-size", "11px")
        .attr("fill", "red")
    }

}

// 메인 SVG 그리는 함수
function drawSVG(raw, selectId, isThumb) {
    d3.select("#" + selectId).select("svg").remove();
    if (!raw) return;

    var drawableRaw = raw;
    if (!drawableRaw.hasOwnProperty('WA')) drawableRaw['WA'] = 89.0;
    if (!drawableRaw.hasOwnProperty('WC')) drawableRaw['WC'] = 89.0;
    if (!drawableRaw.hasOwnProperty('WS')) drawableRaw['WS'] = 83.0;

    let row = getPoint(drawableRaw, isThumb);

    const ww = isThumb?1.2:weightSize;

    const svg = d3.select("#" + selectId)
        .append("svg")
        .attr("baseProfile", "full")
        .attr("width", pageW / weightSize * ww)
        .attr("height", pageH / weightSize * ww)
        .attr("xmlns", "http://www.w3.org/2000/svg");

    document.getElementById("lotId").innerHTML = drawableRaw.LOT_ID;
    document.getElementById("cellId").innerHTML = drawableRaw.CELL_ID;
    document.getElementById("ispDtm").innerHTML = drawableRaw.ISP_DTM.replace('T', ' ');

    appendSVGItem(svg, row, drawableRaw, isThumb?"thumb":"main");
}

// 각 꼭지점의 확장된 화면 생성
function viewBox(raw, selectId, x, y) {
    var drawableRaw = raw;
    if (!drawableRaw.hasOwnProperty('WA')) drawableRaw['WA'] = 89.0;
    if (!drawableRaw.hasOwnProperty('WC')) drawableRaw['WC'] = 89.0;
    if (!drawableRaw.hasOwnProperty('WS')) drawableRaw['WS'] = 83.0;

    let row = getPoint(drawableRaw);

    d3.select("#" + selectId).select("svg").remove();

    const svg = d3.select("#" + selectId)
        .append("svg")
        .attr("width", "150")
        .attr("height", "150")
        .attr("viewBox", x + " " + y + " " + pageW * 0.225 + " " + pageW * 0.225)
        .attr("xmlns", "http://www.w3.org/2000/svg");

    appendSVGItem(svg, row, drawableRaw, "side");
}

// raw에 따라 SVG 다시 그리기
function changeImage(rowIndex) {

    drawSVG(data[rowIndex], "show-svg");
    thumbnailDraw(rowIndex);

    let xR = pageW * 0.8;
    let yT = pageH * 0.05;
    let yB = pageH * 0.82;
    
    viewBox(data[rowIndex], "show-sub-svg1", 0, yT);
    viewBox(data[rowIndex], "show-sub-svg2", xR, yT);
    viewBox(data[rowIndex], "show-sub-svg3", 0, yB);
    viewBox(data[rowIndex], "show-sub-svg4", xR, yB);
}

function thumbnailDraw(rowIndex) {
    drawSVG(data[parseInt(rowIndex) - 2], "before2", true);
    drawSVG(data[parseInt(rowIndex) - 1], "before1", true);
    drawSVG(data[parseInt(rowIndex)], "now", true);
    drawSVG(data[parseInt(rowIndex) + 1], "after1", true);
    drawSVG(data[parseInt(rowIndex) + 2], "after2", true);
}

/////////////////////////////// end of SVG draw ////////////////////////////////////

/////////////////////////////// begin of Controller ////////////////////////////////////

// start 버튼 클릭 시
function startSlider() {
    isPlay = true;
    play();
    document.getElementById("start").disabled = true;
}

// stop 버튼 클릭 시
function stopSlider() {
    isPlay = false;
    rowIndex = 0;
    clearInterval(svgInterval);
    document.getElementById("start").disabled = false;
}

// pause 버튼 클릭 시
function pauseSlider() {
    isPlay = false;
    clearInterval(svgInterval);
    document.getElementById("start").disabled = false;
}

// Interval 실행함수, slider의 position & text 값 변경
function drawInterval() {
    if(data.length <= rowIndex) {
        clearInterval(svgInterval);
        rowIndex = 0;
        return;
    }

    changeImage(rowIndex);
    rowIndex ++;
}

// 1배속
function speed1() {
    intervalTime = 1000;
    play();
    document.getElementById("spped1").disabled = true;
    document.getElementById("spped2").disabled = false;
    document.getElementById("spped5").disabled = false;
}

// 2배속
function speed2() {
    intervalTime = 500;
    play();
    document.getElementById("spped1").disabled = false;
    document.getElementById("spped2").disabled = true;
    document.getElementById("spped5").disabled = false;
}

// 5배속
function speed5() {
    intervalTime = 200;
    play();
    document.getElementById("spped1").disabled = false;
    document.getElementById("spped2").disabled = false;
    document.getElementById("spped5").disabled = true;
}

// 배속을 할 때 setInterval로 인해 실행이 안되게 하기 위해
function play() {
    clearInterval(svgInterval);
    if(isPlay) {
        svgInterval = setInterval(drawInterval, intervalTime);
    }
}

// checkbox 체크된 내용 확인, SVG에서 hidden 설정
function checkImgBox(color) {
    checkedSVGList[color] = !checkedSVGList[color];
    if(checkedSVGList[color]) {
        d3.selectAll(".svg-" + color).style("opacity", 1);
    } else {
        d3.selectAll(".svg-" + color).style("opacity", 0);
    }
    clickThumbnail(0);
}

// thumbnail 클릭 시 이동
function clickThumbnail(diff) {
    let newIdx = parseInt(rowIndex) + parseInt(diff);
    if(newIdx < 0 || newIdx >= data.length) return;

    rowIndex = newIdx;

    changeImage(rowIndex);
}

/////////////////////////////// end of Controller ////////////////////////////////////

$(window).on("SpotfireLoaded", function() {
    var render = function () {
        Spotfire.read("GetData", {}, function(result) {
            if (result) {
                stopSlider();
                data = JSON.parse(result).data;
                $("#fromto").innerHTML = data[0].ISP_DTM.replace('T', ' ') + " ~ " + data[data.length - 1].ISP_DTM.replace('T', ' ');
                //document.getElementById("fromto").innerHTML = data[0]["Inspection DateTime"].replace('T', ' ') + " ~ " + data[data.length - 1]["Inspection DateTime"].replace('T', ' ');
                clickThumbnail(0);
            }
        });
    }

    Spotfire.addEventHandler("render", render);
    render();
});