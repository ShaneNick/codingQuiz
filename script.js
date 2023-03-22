document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.querySelector('.Start-btn');
    const content = document.getElementById('content');

    startBtn.addEventListener('click', function() {
      content.classList.remove('hidden');
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.querySelector('.End-btn');
    const content = document.getElementById('content');

    startBtn.addEventListener('click', function() {
      content.classList.toggle('hidden');
    });
  });

