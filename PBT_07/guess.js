const targetNumber = Math.floor(Math.random() * 100) + 1;
const maxAttempts = 7;
let attempts = 0;
let guessedNumbers = [];
let isWin = false;

while (attempts < maxAttempts) {
    let input = prompt(`Lượt ${attempts + 1}/${maxAttempts}: Nhập một số từ 1 đến 100:`);
    
    if (input === null) {
        alert("Bạn đã thoát trò chơi.");
        break;
    }

    let guess = parseInt(input);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Lỗi: Vui lòng chỉ nhập số nguyên trong khoảng từ 1 đến 100!");
        continue;
    }

    let isDuplicate = false;
    for (let i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === guess) {
            isDuplicate = true;
            break;
        }
    }

    if (isDuplicate) {
        alert("Bạn đã đoán số này rồi!");
        continue;
    }

    guessedNumbers.push(guess);
    attempts++;

    if (guess === targetNumber) {
        alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
        isWin = true;
        break;
    } else if (guess < targetNumber) {
        alert("Cao hơn");
    } else {
        alert("Thấp hơn");
    }
}

if (!isWin && attempts === maxAttempts) {
    alert(`Bạn đã hết lượt đoán! Bạn thua cuộc. Đáp án đúng là: ${targetNumber}`);
}