[Common]=================================================================================
1. Common/Visuals/Common/
 - jquery-1.11.1.min.js : 커스텀 차트에서 JQuery를 사용하려면 추가
 - d3.min.js : 커스텀 차트에서 d3 차트를 생성하려면 추가

2. cs 형식 이외의 파일을 프로젝트에 추가한 경우, 속성에서 내용 항목을 "포함 리소스"로 변경해야 함

[lamination.css]=========================================================================
- 커스텀 차트 스타일

[lamination.js]==========================================================================
- 커스텀 차트 스크립트
$(window).on("SpotfireLoaded", function() {
    var render = function () {
        Spotfire.read("GetData", {}, function(result) {
            if (result) {
                stopSlider();
                data = JSON.parse(result).data;
                document.getElementById("fromto").innerHTML = data[0].ISP_DTM.replace('T', ' ') + " ~ " + data[data.length - 1].ISP_DTM.replace('T', ' ');
                //document.getElementById("fromto").innerHTML = data[0]["Inspection DateTime"].replace('T', ' ') + " ~ " + data[data.length - 1]["Inspection DateTime"].replace('T', ' ');
                clickThumbnail(0);
            }
        });
    }

    Spotfire.addEventHandler("render", render);
    render();
});

-> SpotfireLoaded : 차트가 로드되면 spotfire에서 javascript에 던지는 이벤트. 해당 이벤트가 발생하면 내부 코드 실행됨

-> var render = function () {} : 이벤트 생성. spotfire에 등록됨

-> Spotfire.read("GetData", {}, function(){});
 - spotfire에서 자동으로 sdk 자바스크립트를 추가해주어서 Spotfire.* 기능 사용 가능
 - Spotfire에 readCore에 GetData 라는 메서드를 호출(LamincationChartView.cs 파일)
 - {} 필요한경우 args추가
 - function(){} : 콜백 함수

-> Spotfire.addEventHandler("render", render);
 - Spotfire RenderCore에 이벤트 등록

[laminationChart.html]===================================================================
- 커스텀 차트 html
- Spotfire에서는 패키지 구분자로 파일을 찾으므로 / 대신 . 사용함
- 브라우저에서 디버깅 시에는 / 로 변경


[cs 파일 생성 순서]
1. CustomIdentifiers.cs 파일에 name, display name, description 등록
2. icon 등록
3. Visual 파일 생성 ex) Lamination.cs
4. Factory 파일 생성 ex) LaminationChartFactory.cs
5. View 파일 생성 ex) LaminationChartView.cs
6. CustomAddin.cs 파일에 차트 등록

[icon 등록]==============================================================================
1. 알파벳 이미 파일 다운로드 ex) https://icons8.com/icons/set/alphabet-letters-m
2. C:\Sources\FPA\SpotfireMenu\Resources 폴더에 저장
3. SpotfireMenu -> Properties 파일 -> 리소스 탭 -> 이미지 -> 기존 파일 추가

[LaminationChart.cs]=====================================================================
-> 커스텀 차트의 데이터 모델 

1. field
 - 차트가 갖고 있을 변수 생성 : 테이블, 마킹 등
 - 일반적으로 UndoableCrossReferenceProperty 타입으로 생성

2. Constructor
 - field 들을 생성자에 추가해준다.

3. Proerties
 - getter, setter 생성

4. Trigger

5. PropertyNames
 - field 이름들. 순서상 먼저 작성한다.

[LaminationChartFactory.cs]==============================================================
-> Factory 파일. CustomAddin 등록에 사용

[LamincationChartView.cs]================================================================
-> 커스텀 차트의 컨트롤

1. 차트 모델 생성
2. 생성자 메서드 생성
3. override
 3.1 GetResourceCore
  - 웹파일 로드 메서드
  - 기본적으로 html파일 반환 후 추가 리소스 반환 (css, js 등)
 3.2 ReadCore
  - spotfire -> javascript 로 데이터 전송
  - javascript에서 method 명과 args 를 담아서 데이터 요청함
  - 리턴값으로 필요한 데이터 형태를 정의하고 값을 넣어서 반환
 3.3 ModifyCore (다른 커스텀차트 참조)
  - javascript -> spotfire 데이터 전송
  - 차트의 이벤트에 의해 spotfire를 컨트롤하고 싶은 경우 사용할 수 있음
 3.4 etc
  - ReadCore와 ModifyCore에 이벤트 전달 시, 메서드명을 지정해야 함 ex) GetData

http://bl.ocks.org/WilliamQLiu/76ae20060e19bf42d774

https://www.tutorialsteacher.com/d3js

https://www.tutorialspoint.com/d3js/index.htm

https://observablehq.com/@d3/gallery

https://api.jquery.com/jQuery.getJSON/#jQuery-getJSON-url-data-success