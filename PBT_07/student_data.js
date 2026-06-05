const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" }
];

let rankCounts = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
let maxStudent = null;
let minStudent = null;
let totalMath = 0, totalPhysics = 0, totalCs = 0;
let totalMaleAvg = 0, maleCount = 0;
let totalFemaleAvg = 0, femaleCount = 0;

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    let sv = students[i];
    let avg = Math.round((sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3) * 10) / 10;
    
    let rank = "";
    if (avg >= 8.0) rank = "Giỏi";
    else if (avg >= 6.5) rank = "Khá";
    else if (avg >= 5.0) rank = "Trung bình";
    else rank = "Yếu";

    rankCounts[rank]++;

    let stt = (i + 1).toString().padEnd(3);
    let name = sv.name.padEnd(6);
    let avgStr = avg.toFixed(1).padEnd(4);
    let rankStr = rank.padEnd(11);
    console.log(`| ${stt} | ${name} | ${avgStr} | ${rankStr} |`);

    if (maxStudent === null || avg > maxStudent.avg) {
        maxStudent = { name: sv.name, avg: avg };
    }
    if (minStudent === null || avg < minStudent.avg) {
        minStudent = { name: sv.name, avg: avg };
    }

    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCs += sv.cs;

    if (sv.gender === "M") {
        totalMaleAvg += avg;
        maleCount++;
    } else if (sv.gender === "F") {
        totalFemaleAvg += avg;
        femaleCount++;
    }
}

console.log("Thống kê xếp loại:");
console.log(`- Giỏi: ${rankCounts["Giỏi"]} SV`);
console.log(`- Khá: ${rankCounts["Khá"]} SV`);
console.log(`- Trung bình: ${rankCounts["Trung bình"]} SV`);
console.log(`- Yếu: ${rankCounts["Yếu"]} SV`);

console.log(`Sinh viên có điểm TB cao nhất: ${maxStudent.name} (${maxStudent.avg.toFixed(1)})`);
console.log(`Sinh viên có điểm TB thấp nhất: ${minStudent.name} (${minStudent.avg.toFixed(1)})`);

let classSize = students.length;
console.log("Điểm trung bình môn toàn lớp:");
console.log(`- Toán: ${(totalMath / classSize).toFixed(1)}`);
console.log(`- Vật lý: ${(totalPhysics / classSize).toFixed(1)}`);
console.log(`- Khoa học máy tính: ${(totalCs / classSize).toFixed(1)}`);

let maleAvg = maleCount > 0 ? (totalMaleAvg / maleCount) : 0;
let femaleAvg = femaleCount > 0 ? (totalFemaleAvg / femaleCount) : 0;
console.log("Điểm trung bình theo giới tính:");
console.log(`- Nam (M): ${maleAvg.toFixed(1)}`);
console.log(`- Nữ (F): ${femaleAvg.toFixed(1)}`);