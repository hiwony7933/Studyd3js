$(document).ready(function () {
  var select_title = [
      "PJT",
      "설비호기",
      "검사기",
      "검사LANE",
      "Recipe명",
      "카메라위치",
      "카메라No",
      "이미지No",
      "진행방향",
      "Lot ID",
      "Cell ID",
      "최종판정",
      "항목명",
      "항목판정"
  ];
  var select_col = ["1호기", "2호기", "3호기", "4호기", "5호기"];

  select_title.forEach(function (item, index) {
      var forName = "select_col_" + index;
      $("#top-filter").append("<div class=" + forName + ">");
      $("div." + forName)
          .append("<label for=" + forName + ">" + item + "</label>")
          .append("<select id=" + forName + " name=" + forName + "></select>");
  });
  for (var i = 0; i <= select_title.length; i++) {
      for (var j = 0; j <= select_col.length; j++) {
          console.log(select_col.length);
          $("select#select_col_" + i).append("<option label=" + select_col[j] + " value=" + (j + 1) + "></option>");
          // document.write(i + "," + j, "<br>");
      }
  }

  // select_title.forEach(function (item, index) {
  //     $("select#select_col_" + index)
  //         .append("<option label=" + "" + ">1</option>")
  //         .append("<option>2</option>")
  //         .append("<option>3</option>")
  //         .append("<option>4</option>")
  //         .append("<option>5</option>")
  //         .append("<option>6</option>")
  //         .append("<option>7</option>");
  // });

  $("select#select_col_0").change(function () {
      var select_name = $(this).val();
      // console.log(select_name);
  });

  $("#onFilter").on("click", function () {
      location.href = "index.html";
  });
});