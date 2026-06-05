A1:

Viết **cùng 1 hàm** `tinhThueBaoHiem(luong)` theo 3 cách:
1. Function Declaration
function tinhThueBaoHiem(luong) {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
}
2. Function Expression
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
3. Arrow Function
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
**Câu hỏi:** 3 cách này có khác nhau về hoisting không? Giải thích bằng ví dụ code cụ thể.
Có sự khác biệt rõ ràng. Chỉ duy nhất Function Declaration được hoisting hoàn toàn 
Function Expression và Arrow Function không thể gọi trước khi định nghĩa vì chúng nằm trong vùng Temporal Dead Zone

// ✅ 1. Function Declaration: Hoạt động bình thường
console.log(funcDecl(15)); // Trả về: { thuong: 1.5, thuc_nhan: 13.5 }
function funcDecl(luong) {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
}
// ❌ 2. Function Expression: Lỗi ReferenceError
console.log(funcExpr(15)); // ReferenceError: Cannot access 'funcExpr' before initialization
const funcExpr = function(luong) {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
// ❌ 3. Arrow Function: Lỗi ReferenceError (giống hệt Expression)
console.log(funcArrow(15)); // ReferenceError: Cannot access 'funcArrow' before initialization
const funcArrow = (luong) => {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
A2:
// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);

}
output:var:2
        var:2
        var:2
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
output: let:0
        let:1
        let:2
Sự khác biệt cốt lõi nằm ở Phạm vi hoạt động:
1. Trường hợp dùng var i (Function Scope / Global Scope)
var không có block scope . Do đó, toàn bộ vòng lặp chỉ dùng chung một biến i duy nhất trong bộ nhớ
Vòng lặp for chạy đồng bộ và kết thúc ngay lập tức, lúc này i đã tăng lên 3 (điều kiện dừng)
100ms sau, các hàm callback trong setTimeout mới được đưa vào Call Stack để chạy. Khi chúng tìm kiếm giá trị của i, chúng đều tham chiếu đến biến i dùng chung hiện tại đã mang giá trị 3

2. Trường hợp dùng let j (Block Scope)
let có phạm vi block. Khi dùng let trong vòng lặp for, cứ mỗi lần lặp , JavaScript lại tạo ra một biến j hoàn toàn mới và gán cho nó giá trị của bước lặp đó
Các hàm callback trong setTimeout tạo ra một Closure bao đóng lên biến j của riêng vòng lặp đó
200ms sau, khi callback chạy, nó trích xuất đúng giá trị j đã được "lưu giữ" trong bộ nhớ riêng của từng vòng lặp (lần lượt là 0, 1, 2)
A3:

Đọc chương 06. Cho mảng: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
Viết **1 dòng code** cho mỗi yêu cầu (dùng arrow function):
// 1. Lấy các số chẵn
nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
nums.map(n => n * 3);

// 3. Tính tổng tất cả
nums.reduce((sum, n) => sum + n, 0);

// 4. Tìm số đầu tiên > 7
nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược mảng (không mutate gốc)
[...nums].reverse(); 
A4:

Không chạy code, dự đoán output:

// Destructuring
console.log(name, price, ram, color);  // Output: iPhone 16 25990000 8 Titan
console.log(specs);                    // Lỗi: ReferenceError: specs is not defined
// (Vì cú pháp specs: { ram, color } chỉ trích xuất ram và color, không tạo ra biến specs)

// Spread
console.log(updated.price);            // Output: 23990000
console.log(updated.sale);             // Output: true
console.log(product.price);            // Output: 25990000 (Gốc không bị đổi)

// Spread gotcha
console.log(product.specs.ram);        // Output: 16

C1:
const processOrders = (orders) => orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
        id, customer, total,
        discount: total * 0.1,
        finalTotal: total * 0.9
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
C2:
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        const hasInitial = arguments.length >= 3;
        let accumulator = hasInitial ? initialValue : arr[0];
        let startIndex = hasInitial ? 0 : 1;

        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

console.log(miniArray.map([1,2,3], x => x * 2));          // → [2,4,6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));    // → [3,4]
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)); // → 10
