const nonSleepers = document.querySelectorAll('.seat');
const sleepers = document.querySelectorAll('.sleep');

nonSleepers.forEach(seat => {
  let toggled = false;
  seat.addEventListener('click', () => {
    toggled = !toggled;
    seat.style.background = toggled ? '#e0f7fa' : 'pink';
  });
});

sleepers.forEach(bed => {
  let toggled = false;
  bed.addEventListener('click', () => {
    toggled = !toggled;
    bed.style.background = toggled ? '#e0f7fa' : 'blue';
  });
});
