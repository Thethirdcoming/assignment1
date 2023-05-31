var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

var gradeBounds = {
   'a-plus': 95,
   'a': 90,
   'a-minus': 85,
   'b-plus': 80,
   'b': 75,
   'b-minus': 70,
   'c-plus': 65,
   'c': 60,
   'c-minus': 55,
   'd': 50,
   'f': 0
}


document.getElementById('new-grade').addEventListener('keypress', function(e) {
   if(e.key === 'Enter') {
       var newGrade = parseFloat(e.target.value);
       if (isNaN(newGrade)) {
           alert('Invalid input. Please enter a number.');
           return;
       }
       grades.push(newGrade);
       updateHistogram();
   }
});


Object.keys(gradeBounds).forEach(function(grade) {
   document.getElementById(grade).addEventListener('change', function(e) {
       var newBound = parseFloat(e.target.value);
       if (isNaN(newBound)) {
           alert('Invalid input. Please enter a number.');
           return;
       }
       gradeBounds[grade] = newBound;
       updateHistogram();
   });
});


function updateHistogram() {
    var counts = {};


    let keys = Object.keys(gradeBounds).sort((a, b) => gradeBounds[b] - gradeBounds[a]);

    keys.forEach((grade, index) => {
        counts[grade] = grades.filter(g => {
            if ((g >= gradeBounds[grade]) && (index === 0 || g < gradeBounds[keys[index - 1]])) {
                return true;
            }
            return false;
        }).length;
    });

    keys.forEach(function(grade) {
        var bar = document.getElementById(grade + '-bar');
        bar.style.width = (counts[grade] / grades.length * 100) + '%';
    });
}



updateHistogram();
