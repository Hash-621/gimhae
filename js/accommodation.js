// JSON 파일을 가져와서 출력하는 함수
async function fetchJsonData() {
  //여기서 API 연동하기
  //교차출처오류 방지 - CORS -> 니꺼 맞냐?
  const proxy = "https://nextit.or.kr:41080/";
  const origin = "http://www.gimhae.go.kr/openapi/tour/lodging.do";
  const params = "?page=1";

  const requestURL = `${proxy}${origin}${params}`;
  try {
    // fetch를 사용하여 JSON 파일 가져오기
    const response = await fetch(requestURL);

    // 응답이 정상인지 확인
    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
    }

    const data = await response.json();

    // 콘솔에 데이터 출력 (디버깅 용도)
    console.log("가져온 데이터:", data.results);

    // 데이터를 화면에 표시
    displayData(data.results);

    return data.results;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
    return null;
  }
}

// 데이터를 화면에 표시하는 함수
function displayData(data) {
  const container = document.getElementById("post-content-list");
  container.innerHTML = ""; // 기존 내용 초기화

  let writeHTML = "";
  if (data) {
    const lines = data;

    for (let i = 0; i < lines.length; i++) {
      let image = lines[i].images[0];
      writeHTML += '<div class="list-wrapper">';

      writeHTML += "<img src=" + image + " height=200px width=300px />";

      writeHTML += '<div class="item-details">';

      writeHTML += '<div class="item-title">';
      writeHTML += '<div class="item-number">' + `${i + 1}` + "</div>";
      writeHTML += '<div class="item-name">' + `${lines[i].name}` + "</div>";
      writeHTML += "</div>";

      writeHTML += '<ul class="item-info">';
      writeHTML +=
        "<li>" + "<span>주소 : </span>" + `${lines[i].address}` + "</li>";
      writeHTML +=
        "<li>" + "<span>관리기관 : </span>" + `${lines[i].manage}` + "</li>";
      writeHTML +=
        "<li>" + "<span>전화번호 : </span>" + `${lines[i].phone}` + "</li>";
      writeHTML += "</ul>";

      writeHTML += "</div>";

      writeHTML += '<div class="item-ratings">';
      writeHTML += '<p class="rating-title">별점 (총 0개의 후기)</p>';
      writeHTML += '<div class="stars">☆☆☆☆☆</div>';
      writeHTML += '<p class="score">0</p>';
      writeHTML += '<div class="item-buttons">';
      writeHTML += '<button class="blue-btn">스크랩하기</button>';
      writeHTML += '<button class="action-btn">길찾기</button>';
      writeHTML += "</div>";
      writeHTML += "</div>";

      writeHTML += "</div>";
    }

    container.innerHTML = writeHTML;
  } else {
    container.innerHTML = "데이터가 없습니다.";
  }
}

// 함수 호출하여 JSON 데이터 가져오기
window.onload = fetchJsonData;
