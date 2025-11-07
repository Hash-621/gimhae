//지정된 페이지에서
//시작점 종료점 계산
function updateFirstlast(targetPage) {
  console.log(`지금 보고 있는 페이지 ${targetPage}`);
  currentPage = targetPage;

  // 한눈에 보고 싶은 개수
  const limit = parseInt(document.getElementById("limitSize").value);

  // 버튼 갯수 페이지수
  const pageCount = parseInt(document.getElementById("pagingSize").value);

  // 총 페이지수
  totalPage = Math.ceil(data.length / limit);

  // 그릅수
  pageGroup = Math.ceil(targetPage / pageCount);

  console.log(`총 페이지수 ${totalPage}, ${pageGroup}번째 그룹`);

  // 데이터가 완벽하다는 가정
  // 마지막 번호
  lastNumber = pageGroup * pageCount;

  // 시작 번호
  firstNumber = lastNumber - pageCount + 1;

  console.log(`보정전 -> 시작 ${firstNumber} 마지막 ${lastNumber}`);

  // 보정식1
  if (lastNumber > totalPage) {
    lastNumber = totalPage;
  }

  if (firstNumber < 1) {
    firstNumber = 1;
  }

  console.log(`보정후 => 시작 ${firstNumber} 마지막 ${lastNumber}`);
}

// 버튼 만들기
function setPageButtons() {
  const numberButtonWrapper = document.getElementsByClassName(
    "number-button-wrapper"
  )[0];

  // 기존에 있던 버튼들 소거
  numberButtonWrapper.innerHTML = "";

  for (let i = firstNumber; i <= lastNumber; i++) {
    const html = `<button class="number-button" id="number-button-${i}">${i}</button>`;
    numberButtonWrapper.innerHTML += html;
  }
}

// 이벤트 달기
function addNumberButtonListener() {
  const pageNumberButtons = document.querySelectorAll(".number-button");

  for (let i = 0; i < pageNumberButtons.length; i++) {
    pageNumberButtons[i].addEventListener("click", onClickNumberButton);
    pageNumberButtons[i].style.backgroundColor = "lightsteelblue";
  }
}

function onClickNumberButton(e) {
  currentPage = parseInt(e.target.innerHTML);

  console.log(`${currentPage}으로 이동하기`);

  // 페이지 만들기
  // setPageOf(currentPage);
}

// function setPageOf(current) {
//   const container = document.getElementById("post-content-list");
//   container.innerHTML = ""; // 기존 내용 초기화

//   let writeHTML = "";
//   if (data) {
//     const lines = data;

//     for (let i = current; i < lines.length; i++) {
//       let image = lines[i].images[0];
//       writeHTML += '<div class="list-wrapper">';

//       writeHTML += "<img src=" + image + " height=200px width=300px />";

//       writeHTML += '<div class="item-details">';

//       writeHTML += '<div class="item-title">';
//       writeHTML += '<div class="item-number">' + `${i + 1}` + "</div>";
//       writeHTML += '<div class="item-name">' + `${lines[i].name}` + "</div>";
//       writeHTML += "</div>";

//       writeHTML += '<ul class="item-info">';
//       writeHTML +=
//         "<li>" +
//         "<span>축제기간 : </span>" +
//         `${lines[i].sdate}` +
//         " ~ " +
//         `${lines[i].edate}` +
//         "</li>";
//       writeHTML +=
//         "<li>" + "<span>행사장소 : </span>" + `${lines[i].address}` + "</li>";
//       writeHTML +=
//         "<li>" + "<span>관리기관 : </span>" + `${lines[i].opener}` + "</li>";
//       writeHTML +=
//         "<li>" + "<span>전화번호 : </span>" + `${lines[i].phone}` + "</li>";
//       writeHTML += "</ul>";

//       writeHTML += "</div>";

//       writeHTML += '<div class="item-ratings">';
//       writeHTML += '<p class="rating-title">별점 (총 0개의 후기)</p>';
//       writeHTML += '<div class="stars">☆☆☆☆☆</div>';
//       writeHTML += '<p class="score">0</p>';
//       writeHTML += '<div class="item-buttons">';
//       writeHTML += '<button class="blue-btn">스크랩하기</button>';
//       writeHTML += '<button class="action-btn">길찾기</button>';
//       writeHTML += "</div>";
//       writeHTML += "</div>";

//       writeHTML += "</div>";
//     }

//     container.innerHTML = writeHTML;
//   } else {
//     container.innerHTML = "데이터가 없습니다.";
//   }
// }

// 이전, 다음 버튼 이벤트 세팅
function addMovingButtonListener() {
  const preBtn = document.getElementById("pre-button");
  const nextBtn = document.getElementById("next-button");

  preBtn.addEventListener("click", onClickPre);
  nextBtn.addEventListener("click", onClickNext);
}

// 이전으로 이동
function onClickPre(e) {
  const delta = currentPage - 1;

  if (firstNumber <= delta) {
    console.log(`${currentPage}에서 ${delta}으로는 정상`);
  }
  // 그렇다면 마지막 페이지인지
  else if (0 < delta) {
    updateFirstlast(delta);
    setPageButtons();
    addNumberButtonListener();
  }

  if (delta <= 1) {
    currentPage = 1;
  } else {
    currentPage = delta;
  }

  // setPageOf(currentPage);
}

function onClickNext(e) {
  const delta = currentPage + 1;

  if (delta <= lastNumber) {
    console.log(`${currentPage}에서 ${delta}으로는 정상`);
  }
  // 그렇다면 마지막 페이지인지
  else if (delta <= totalPage) {
    updateFirstlast(delta);
    setPageButtons();
    addNumberButtonListener();
  }

  if (totalPage <= delta) {
    currentPage = totalPage;
  } else {
    currentPage = delta;
  }

  // setPageOf(currentPage);
}

function limitSizeOnChange(value) {
  alert(`${value}개씩 보는 것을 선택`);

  // 지정된 페이지에서 시작번호와 종료번호 계산하기
  updateFirstlast(1);

  // 이걸 토대로 버튼 만들기
  setPageButtons();

  // 만들어진 버튼에 이벤트 달기
  addNumberButtonListener();

  // 이전, 다음 버튼 이벤트
  addMovingButtonListener();

  // setPageOf(1);
}

function pagingSizeOnChange(value) {
  alert(`페이지 버튼 ${value}개로 선택`);

  // 지정된 페이지에서 시작번호와 종료번호 계산하기
  updateFirstlast(1);

  // 이걸 토대로 버튼 만들기
  setPageButtons();

  // 만들어진 버튼에 이벤트 달기
  addNumberButtonListener();

  // 이전, 다음 버튼 이벤트
  addMovingButtonListener();

  // setPageOf(1);
}
