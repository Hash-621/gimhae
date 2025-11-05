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
  totalPage = Math.ceil(database.length / limit);

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
  setPageOf(currentPage);
}

function setPageOf(current) {
  const contentList = document.getElementById("post-content-list");

  // 한눈에 보고 싶은 개수
  const limitSize = parseInt(document.getElementById("limitSize").value);

  // 내용물 청소
  contentList.innerHTML = "";

  // 데이터의 시작점
  const start = limitSize * (current - 1);

  // 데이터의 종료점
  const end = limitSize * (current - 1) + limitSize;

  console.log(`배열의 시작점 ${start} 종료점 ${end}`);

  for (let i = start; i < end; i++) {
    const li = document.createElement("li");
    li.className = "post-content";

    li.innerHTML = `<div class="post-container">
    <h4 class="post-number">${database[i].id}</h4>
    <p class="post-title">${database[i].title} </p>
    </div>`;

    contentList.appendChild(li);
  }

  // 원래 색상으로 초기화
  const pageNumberButtons = document.querySelectorAll(".number-button");

  for (let i = 0; i < pageNumberButtons.length; i++) {
    pageNumberButtons[i].style.backgroundColor = "lightsteelblue";
  }

  //현재 버튼 색상변경으로 하이라이팅
  const currentBtn = document.getElementById(`number-button-${currentPage}`);
  currentBtn.style.backgroundColor = "red";
}

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

  setPageOf(currentPage);
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

  setPageOf(currentPage);
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

  setPageOf(1);
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

  setPageOf(1);
}
