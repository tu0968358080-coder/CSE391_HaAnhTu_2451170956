Phần A:
A1:(Nguồn:07_forms_interactive.md + Core Technical Truth)
10 input types:
-type="email"- Ô nhập text, tự kiểm tra có @ - Dùng cho form đăng ký
-type="password" - Ô nhập text,ẩn kí tự-Dùng cho form đăng nhập
-type="number" - Nút tăng/giảm - Dùng cho đếm số lượng
-type="tel" - Bàn phím số trên mobile - Dùng để bấm số
-type="date"-Date picker - Dùng để nhập ngày
-type="time"-Time picker - Dùng để nhập thời gian
-type="color"- Color picker - Dùng để chọn màu
-type="range" - Slide - DÙng cho khoảng cách
-type="checkbox" - Ô chọn có/không - dùng cho lựa chọn
-type="hidden" - không hiển thị - Dùng cho sự riêng tư
A2:(Nguồn:07_forms_interactive.md + Core Technical Truth)
TH1:Không submit tại required không được để trống
TH2:Không submit tại thiếu @
TH3:Không submit tại value ko nằm trong khoảng min,max
TH4:Không submit vì pattern yêu cầu số mà lại nhập chữ
TH5:Không submit vì password tối thiểu 8 kí tự mà đây nhập có 3 kí tự
So sánh:Đúng hết
A3:(Nguồn:07_forms_interactive.md + Accessibilities)
1.Tại vì nó luôn kết nối label với input,giúp người screen reader có thể biết ô này cần nhập những gì
2.Dùng cho nhóm có realted inputs.Ví dụ: 
<fieldset>
    <legend>Thông tin giao hàng</legend>
    <label for="street">Đường:</label>
    <input type="text" id="street" name="street">
</fieldset>
3.Dùng cho button icon.TẠi vì bị ghi đè,máy sẽ đọc aria-label trước mà bỏ qua những nội dung trước đó
A4:(Nguồn:06_graphics_multimedia.md + Core Technical Truth)
1.loading="lazy" :Tải ảnh khi user scroll đến.Tác dụng:Trang load nhanh hơn.Không nên dùng với ảnh đầu tiên xuất hiện ở trang như logo,....
2.Cung cấp nhiều <source> cho thẻ video để xác định nguồn mà mình chèn vô web ở đâu.
3 Formats:-JPG,PNG,SVG
3.Mô tả ảnh cho screen reader và khi ảnh lỗi
Viết alt:-alt="Iphone 16"
         -alt="Ảnh trang trí(decorative)
         -alt="Biểu đồ doanh thu Q1/2026"
A5:
img chỉ là thêm hình ảnh + tên sản phẩm
Còn figure là thêm ảnh + mô tả + thông tin
Dùng cách 1 khi hình ảnh đó không cần chú thích bằng văn bản trên giao diện và nó là một phần không thể tách rời của nội dung đang đọc.
Dùng cách 2 khi hình ảnh đó là một tài liệu tham chiếu quan trọng, cần có tên gọi, giá cả, nguồn hoặc mô tả chi tiết đi kèm bên dưới.

Phần C:
C1:
-Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">, vi phạm accessibility.
Sửa: <label for="full-name">Tên:</label> <input type="text" id="full-name" name="name" required>
-Lỗi 2: Dòng 4 — Input "Email" dùng placeholder thay thế cho nhãn dán. Khi bắt đầu gõ, placeholder biến mất làm người dùng mất dấu thông tin cần nhập.
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn">
-Lỗi 3: Dòng 6 — Input "Mật khẩu" thiếu thuộc tính name. Khi submit form, dữ liệu ở ô này sẽ không được gửi về server.
Sửa: <input type="password" id="pass" name="password" placeholder="Mật khẩu">
-Lỗi 4: Dòng 7 — Hai ô mật khẩu có cùng placeholder nhưng không có nhãn để phân biệt đâu là ô nhập mới, đâu là ô xác nhận lại.
Sửa: <label for="re-pass">Nhập lại mật khẩu:</label> <input type="password" id="re-pass" name="re_password" placeholder="Nhập lại mật khẩu">
-Lỗi 5: Dòng 9 — Input "Phone" dùng type="text". Điều này không kích hoạt bàn phím số trên điện thoại và thiếu tính ngữ nghĩa.
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567">
-Lỗi 6: Dòng 11 — Thẻ <select> thiếu thuộc tính name và không có nhãn dán mô tả, khiến người dùng dùng Screen Reader không biết danh sách này chọn cái gì.
Sửa: <label for="city">Thành phố:</label> <select id="city" name="city">...</select>
-Lỗi 7: Dòng 16 — Thẻ <label> chứa văn bản nhưng thiếu thẻ <input type="checkbox"> đi kèm. Người dùng nhìn thấy văn bản nhưng không có chỗ để tích "Đồng ý".
Sửa: <label><input type="checkbox" name="agreement" required> Tôi đồng ý điều khoản</label>
-Lỗi 8: Dòng 1 — Thẻ <form> thiếu thuộc tính action và method. Trình duyệt sẽ không biết gửi dữ liệu đi đâu và gửi bằng phương thức nào (GET/POST).
Sửa: <form action="/submit-path" method="POST">
C2:
1.<input type="text" pattern="[0-9]{10,15}"
2.Không.Tại vì rất dễ bị vô hiệu hoá
Link phần D:https://drive.google.com/file/d/1q5Rp1MjT9DuUvd3Z_valmWN4yDZ8mnaa/view?usp=drive_link

