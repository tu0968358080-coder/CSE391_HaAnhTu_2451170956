Phần A:
A1:(Nguồn:tuan_1_html5/01_introduction_html_universe.md + Cuộc hành trình 0.3 giấy xuyên đại dương)
A1.1:
-Yêu cầu từ link http://shopee.vn được gửi đi qua router wifi
-Qua nhà mạng -> chạy xuyên cáp quang
-Đến data center của shopee
-Data xử lý 
-Response chạy ngược lại về
-Trình duyệt nhận file HTML,CSS,JS ->render ra giao diện->     Shopee
A1.2:
Trong DevTools của Chrome , network cho biết thônng tin:
-Danh sách các yêu cầu
-Thông tin chi tiết
-Thời gian tải
-Kích thước dữ liệu
-Trạng thái
-Bộ lọc
-Theo dõi API
Screnshot:
![alt text](z7740732825962_bc61a2c69e5582d374e910b254b00de3.jpg)
A2:(Nguồn:04_visible_part_html.md + Semantic HTML5 — "Thẻ có ý nghĩa")
-Trang web bị Google đánh giá SEO thấp tại vì chỉ dùng mỗi <div> nên Google sẽ ko hiểu
-Cách sửa:
+)<div class="header"> sửa lại thành <header>
+)<div class="main"> sửa lại thành <main>
+)<div class="footer"> sửa lại thành <footer>
+)<div class="title"> sửa lại thành <title>
 A3:(Nguồn:04_visible_part_html.md + Block vs Inline — Hai loại element cơ bản)
-Text art : 
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3
-Giải thích:
+)<div>Hộp 1</div>,<div>Hộp 2</div>,<div>Hộp 1</div>:Là 1 block , chiếm riêng 1 dòng
+)<span>Text A</span>
<span>Text B</span>,<span>Text C</span>
<strong>Text D</strong>: là inline , nằm cạnh nhau 
A4:(Nguồn:05_tables_hyperlinks.md + Table — Bảng dữ liệu)
-Sự khác nhau: +) <thead>: Tiêu đề cột
               +) <tbody>: Dữ liệu chính
               +) <tfoot>: Tổng kết
-Không nên dùng <table> để tạo layout trang web vì:
+)<table> chỉ dùng cho dữ liệu dạng bảng
+)Bị lặp lại <tr> và <td> quá nhiều -> code bị rối
+)SEO thấp 
Phần B:
B.3:
Lỗi 1: Dòng 1 - Doctype thiếu html - <!DOCTYPE html>
Lỗi 2: Dòng 2 - html thiếu lang = "en" - <html lang ="en">
Lỗi 3: Dòng 4 - title thiếu lệnh - <title>Trang web</title>
Lỗi 4: Dòng 5 - utf8 sai - UTF-8
Lỗi 5: Dòng 8 - <h1> sai - <h1>Welcome to ShopTLU</h1>
Lỗi 6: Dòng 9+10 - thiếu dấu # -  <a href="#home">Trang chủ<a>
                                  <a href="#products">Sản phẩm</a>
Lỗi 7: Dòng 12 - <a> sai - <a href="home">Trang chủ</a>
Lỗi 8: Dòng 19 - src thiếu ngoặc "" - <img src="iphone.jpg">
Lỗi 9: Dòng 21 - </b> sai vị trí - <p>Giá: <b>25.990.000đ</b><?p>
Lỗi 10: Dòng 44 - thiếu </p> -  <p>Copyright 2026</p>
B.4:
B.4.1:
![alt text](image.png)
3 thẻ semantic:-main(Dòng 9)
               -section(Dòng 15)
               -footer(![alt text](image-1.png))
B.4.2:
![alt text](image-2.png)
Table này dùng để hiển thị chi tiết sản phẩm
Ko dùng<thead>,<tbody>
B.4.3:

Phần C:
C.2:
 "Dùng <div> cho mọi thứ rồi thêm class là được, không cần semantic HTML. Tốn thời gian học thêm thẻ mới."
 Không phải lúc nào cũng dùng <div> được cho mọi thứ.Khi dùng <div> , SEO sẽ rất thấp,tại vì dùng quá nhiều lệnh <div> có thể khiến cho trang web rất rối cũng như việc truy cập vào trang web đó rất khó khăn.Sementic không chỉ khiến trang web đó hoạt động nhanh hơn,đôi khi còn giúp chúng ta có nhiều cách để tạo 1 trang web mà sử dụng nhiều câu lệnh 1 cách đa dạng hơn thay vì lạm dụng <div> quá nhiều.! trong những ví dụ như lệnh <section> giúp chúng ta phân đoạn nội dung 1 cách dễ dàng hơn thay vì dùng <div> sẽ rất phức tạp và rối.Lệnh <div> chỉ nên được sử dụng khi bạn muốn viết 1 câu lệnh block.Khi dùng <div> cho block,chúng ta cũng có thể dùng những lệnh khác như <p>.Việc đổi qua đổi lại lệnh sẽ khiến trang web trở nên đa dạng hơn chứ ko phải như 1 bài chỉ được lập trình bằng 1 câu lệnh.


