
A1:

Cho HTML:

```html
<div id="app">
    <header>
        <h1>Todo App</h1>
        <nav>
            <a href="#" class="active">All</a>
            <a href="#">Active</a>
            <a href="#">Completed</a>
        </nav>
    </header>
    <main>
        <form id="todoForm">
            <input id="todoInput" type="text">
            <button type="submit">Add</button>
        </form>
        <ul id="todoList">
            <li class="todo-item">Learn HTML</li>
            <li class="todo-item completed">Learn CSS</li>
        </ul>
    </main>
</div>
```

1. Vẽ DOM tree (sơ đồ cây) cho HTML trên
div#app
├── header
│   ├── h1
│   └── nav
│       ├── a.active
│       ├── a
│       └── a
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    └── ul#todoList
        ├── li.todo-item
        └── li.todo-item.completed
2. Viết **querySelector** cho mỗi yêu cầu:
    - Chọn thẻ <h1>
    document.querySelector('h1');

    - Chọn input trong form
    document.querySelector('#todoInput');

    - Chọn tất cả .todo-item
    document.querySelectorAll('.todo-item');

    - Chọn link đang active
    document.querySelector('a.active');

    - Chọn <li> đầu tiên trong 
    document.querySelector('#todoList li');

    - Chọn tất cả <a> bên trong <nav>
    document.querySelectorAll('nav a');
A2:

Giải thích sự khác nhau. Cho ví dụ khi nào dùng mỗi cái. 
1. Sự khác nhau giữa innerHTML và textContent
innerHTML: Lấy hoặc thiết lập toàn bộ nội dung của một phần tử dưới dạng mã HTML. Trình duyệt sẽ phân tích cú pháp  chuỗi này và chuyển nó thành các DOM nodes thực sự (render ra các thẻ, in đậm, hình ảnh...)

textContent: Lấy hoặc thiết lập nội dung của phần tử dưới dạng văn bản thuần túy. Bất kỳ thẻ HTML nào nằm trong chuỗi cũng sẽ bị biến thành văn bản bình thường, trình duyệt không render chúng
**Câu hỏi bảo mật:** Tại sao `innerHTML` có thể gây lỗ hổng **XSS**? Viết 1 ví dụ code minh họa:
Lỗ hổng XSS (Cross-Site Scripting) xảy ra khi bạn lấy dữ liệu không an toàn (do user nhập) và đưa trực tiếp vào trang web thông qua innerHTML

Vì innerHTML ép trình duyệt phải biên dịch chuỗi thành mã HTML thực, nếu user cố tình nhập các thẻ chứa mã độc như <script> hoặc gắn sự kiện ẩn như <img onerror="mã_độc">, trình duyệt sẽ tự động thực thi đoạn mã JavaScript đó ngay khi nó được chèn vào DOM. Hậu quả là tin tặc có thể đánh cắp cookie, token, hoặc chiếm quyền điều khiển phiên đăng nhập của người dùng khác
```javascript
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;  // ← Nguy hiểm!
// Sửa thế nào?
// SỬA LẠI THÀNH textContent:
document.querySelector("#result").textContent = userInput;  // ← Tuyệt đối an toàn!

A3:
Không chạy code, dự đoán thứ tự console.log:
```javascript
document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    // e.stopPropagation();  ← nếu bỏ comment → output thay đổi thế nào?
});
```

```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click me</button>
    </div>
</div>
```

Khi click vào button, output = 
BUTTON
INNER
OUTER 
Nếu uncomment `stopPropagation()`, output = BUTTON
C1:
Lỗi addEventListener("onclick", ...) :
Sai: Cú pháp của addEventListener yêu cầu tên sự kiện là "click", không phải "onclick". Sự kiện nút Giảm (#decrementBtn) sẽ hoàn toàn bị liệt

Lỗi ghi đè biến hằng số countDisplay = count :
Sai: Biến countDisplay được khai báo bằng const ở đầu bài. Việc gán thẳng countDisplay = count sẽ ném ra lỗi TypeError: Assignment to constant variable và làm sập app khi nhấn Reset

Lỗi thiếu cặp ngoặc gọi hàm item.remove:
Sai: remove là một phương thức (method) của DOM Node. Viết item.remove mà không có () sẽ không có chuyện gì xảy ra, nút xóa toàn bộ lịch sử bị vô hiệu hóa

Lỗi Logic & Kiểu dữ liệu khi Load từ LocalStorage :
Sai: Giá trị lấy ra từ localStorage.getItem("count") luôn là một chuỗi (String) hoặc null (nếu mở web lần đầu)
Hậu quả: Nếu không ép kiểu về số (Number) và không xử lý trường hợp null, khi bạn bấm tăng, phép toán sẽ biến thành nối chuỗi (ví dụ: "0" + 1 = "01")

Lỗi UI không đồng bộ khi Khởi tạo :
Sai: Đoạn code mới chỉ khôi phục giá trị của hiển thị countDisplay nhưng không gán lại cho biến trạng thái count. Nếu count lưu trên máy là 5, khi bấm nút Tăng, nó sẽ nhảy thành 1 (vì biến let count = 0  chưa được cập nhật)

Lỗi bỏ sót không Load danh sách Lịch sử :
Sai: Ở sự kiện beforeunload, code có lưu historyList.innerHTML vào kho lưu trữ, nhưng lúc load trang thì hoàn toàn bỏ quên, không chịu lấy ra để hiển thị lại cho user

Lỗi rò rỉ bộ nhớ (Memory Leak) / Gắn sự kiện lãng phí :
Sai: Việc gắn trực tiếp sự kiện click vào từng thẻ <li> con ngay khi tạo mới sẽ làm tiêu tốn bộ nhớ nếu danh sách lịch sử kéo dài lên tới hàng trăm, hàng nghìn dòng
Sửa: Nên áp dụng Event Delegation (ủy quyền sự kiện), chỉ gắn 1 listener duy nhất lên thẻ #history cha

Vấn đề bảo mật XSS nguy hiểm:
Hạn chế: Dù biến count hiện tại là số, việc sử dụng .innerHTML = count lặp đi lặp lại phản ánh một thói quen code không an toàn, rất dễ tạo cơ hội cho lỗ hổng XSS nếu sau này logic đổi sang lưu chuỗi ký tự. Nên thay bằng .textContent

Đoạn code sau khi sửa là:
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
// Sửa lỗi 4 + 5: Ép kiểu dữ liệu về Number và handle trường hợp null bằng toán tử ??
let count = Number(localStorage.getItem("count")) || 0;
// HÀM RENDER CHUNG ĐỂ ĐỒNG BỘ UI
function updateUI() {
    countDisplay.textContent = count; // Sửa lỗi 8: Thay innerHTML bằng textContent an toàn hơn
}
// Thêm sự kiện Tăng
document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    updateUI();
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    // Sửa lỗi 7: Bỏ hàm click inline tại đây để chuyển sang Event Delegation ở dưới
    historyList.append(li);
});
// Thêm sự kiện Giảm
document.querySelector("#decrementBtn").addEventListener("click", function() { // Sửa lỗi 1: "onclick" -> "click"
    count--;
    updateUI();
});
// Thêm sự kiện Reset
document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    updateUI(); // Sửa lỗi 2: Gọi hàm cập nhật thay vì gán đè biến hằng số countDisplay
    historyList.textContent = ""; // Dùng chuỗi rỗng thay vì gán giá trị null vô nghĩa
});
// SỬA LỖI 7 (Event Delegation): Gắn sự kiện xóa lên phần tử CHA duy nhất
historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.remove(); // Sử dụng trực tiếp phương thức remove() hiện đại
    }
});
// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); // Sửa lỗi 3: Thêm cặp dấu ngoặc () để thực thi hàm xóa
    });
});
// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("historyHtml", historyList.innerHTML);
});
// Load from localStorage
window.addEventListener("load", () => {
    updateUI(); // Đảm bảo số hiển thị đúng khi mở trang
    
    // SỬA LỖI 6: Khôi phục lại toàn bộ hàng đợi lịch sử cũ đã lưu
    const savedHistory = localStorage.getItem("historyHtml");
    if (savedHistory) {
        historyList.innerHTML = savedHistory;
    }
});
C2:

1. Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là **BAD PRACTICE**? Event Delegation giải quyết thế nào?
Hiệu năng: Bind 1000 sự kiện riêng lẻ gây ngốn RAM và làm chậm trình duyệt. Event Delegation giải quyết bằng cách chỉ gắn 1 sự kiện duy nhất lên thẻ cha, tận dụng cơ chế sủi bọt  để bắt sự kiện từ các thẻ con truyền lên
2. Cho code:
```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ← 1000 lần reflow!
}
```
Đoạn code sau khi refactor:
```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // Chỉ append vào fragment (Không làm thay đổi DOM thật, không gây reflow)
    fragment.appendChild(div);   
}
// Bơm toàn bộ 1000 phần tử từ fragment vào DOM thật cùng một lúc
document.body.appendChild(fragment); // ← Chỉ gây đúng 1 lần Reflow!
```
Refactor dùng `DocumentFragment` để chỉ gây 1 lần reflow. Giải thích tại sao nhanh hơn
DocumentFragment: Hoạt động như một DOM ảo nằm trong bộ nhớ đệm. Gom 1000 phần tử vào Fragment trong vòng lặp không làm thay đổi giao diện thật. Cuối cùng, bơm Fragment vào body giúp trình duyệt chỉ phải tính toán lại cấu trúc hình học đúng 1 lần duy nhất, tối ưu tốc độ render rõ rệt

