document.addEventListener('DOMContentLoaded', function() {
  // 체크박스 이벤트 리스너 추가
  const checkboxes = document.querySelectorAll('.checklist-input');
  const currentScoreElement = document.getElementById('currentScore');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updateTotalScore();
    });
  });

  // 초기 총점 계산
  updateTotalScore();

  // 총점 업데이트 함수
  function updateTotalScore() {
    let totalPoints = 0;
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const points = parseInt(checkbox.getAttribute('data-points')) || 0;
        totalPoints += points;
      }
    });
    currentScoreElement.textContent = totalPoints;
  }

  // "대화 원문 보기" 버튼 클릭 이벤트
  const viewOriginalBtn = document.querySelector('.view-original-btn');
  if (viewOriginalBtn) {
    viewOriginalBtn.addEventListener('click', function() {
      alert('대화 원문 보기 기능입니다. (프로토타입 단계)');
    });
  }
});
