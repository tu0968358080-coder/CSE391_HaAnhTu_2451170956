Phần A:
A1:
*Inline CSS:
1.Ví dụ: <h1 style="color: #2563eb; font-size: 32px;">Tiêu đề</h1>
2.Nhược điểm:Khó maintain
3.Dùng khi khẩn cấp
*Internal CSS:
1.Ví dụ:
<head>
    <style>
        h1 { color: #2563eb; font-size: 32px; }
    </style>
</head>
2.Ưu điểm: Chấp nhận cho prototype hoặc trang đơn 
3. DÙng cho prototype,single page
*Êxtrnal CSS:
1.Ví dụ: <head>
    <link rel="stylesheet" href="styles.css">
</head>
2.Ưu điểm:Chuẩn production
3.Dùng cho mọi dự án thật
A2:
-h1: ShopTLU
-price: 25.990.000đ và 45.990.000đ
-#app header: Toàn bộ khối tiêu đề và thanh điều hướng (chứa ShopTLU, Home, Products, About)
-nav a:first-child: Home
-product.featured h2: MacBook Pro
-article > p: 25.990.000đ, Mô tả sản phẩm..., 45.990.000đ, và Mô tả sản phẩm...
-a[href="/"]: Home
-top-bar.dark h1: ShopTLU
A3:
-box1:Chiều rộng hiển thị:450px
      Không gian chiếm trên trang:470px
-box2:Chiều rộng hiển thị:400px
      Kích thước content thực tế:350px
      Không gian chiếm trên trang:420px
-box3:Khoảng cách giữa box-a và box-b là:40px
      Tại vì margin so sánh phần lớn hơn để lấy khoảng cách chung
A4:
-Tính specificity score (a, b, c)
Rule A (p): (0, 0, 1)
Rule B (.price): (0, 1, 0)
Rule C (#main-price): (1, 0, 0)
Rule D (p.price): (0, 1, 1)
-Màu của element và giải thích:
Màu: Đỏ (Red)
Giải thích: Rule C có ID selector với điểm specificity cao nhất (1, 0, 0), vượt trội hơn các selector còn lại nên sẽ được áp dụng.
-Nếu thêm Inline Style:
Màu: Cam (Orange)
Giải thích: Inline style có mức độ ưu tiên cao hơn mọi selector khai báo trong file CSS, bao gồm cả ID.
-Nếu Rule A thêm !important:
Màu: Đen (Black)
Giải thích: Từ khóa !important ghi đè lên tất cả các quy tắc tính điểm specificity thông thường và cả inline style, buộc trình duyệt phải sử dụng giá trị của Rule A.
Phần B:
B2:
Phần 1:
Hộp 1 (content-box): chiều rộng thực tế = 350 px
Hộp 2 (border-box): chiều rộng thực tế = 300 px
Giải thích sự khác biệt:
-Với content-box, kích thước width chỉ tính cho phần nội dung bên trong, nên khi thêm padding và border, tổng chiều rộng bị đẩy lớn hơn.
-Với border-box, kích thước width bao gồm cả padding và border, nên tổng chiều rộng của hộp luôn cố định đúng bằng giá trị đã khai báo.
B3:
1.Universal Selector
* { color: gray; }
Specificity Score: 0, 0, 0
2.Element Selectorp 
{ color: silver; }
Specificity Score: 0, 0, 1
3.Descendant Selector (2 Elements)
body p { color: maroon; }
Specificity Score: 0, 0, 2
4.Class Selector.text 
{ color: blue; }
Specificity Score: 0, 1, 0
5.Element + Class Selectorp.text 
{ color: orange; }
Specificity Score: 0, 1, 1
6.Multiple Class Selector.text.highlight 
{ color: green; }
Specificity Score: 0, 2, 0
7.Element + Multiple Class Selectorp.text.highlight 
{ color: purple; }
Specificity Score: 0, 2, 1
8.ID Selector#demo 
{ color: red; }
Specificity Score: 1, 0, 0
9.ID + Element Selectorp#demo 
{ color: brown; }
Specificity Score: 1, 0, 1
10.The "!important" Rule#demo 
{ color: gold !important; }
Specificity Score: Cao nhất 
-Element sẽ hiển thị màu Gold.
-Giải thích: Vì rule đó có sử dụng !important, đây là mức ưu tiên cao nhất trong CSS, vượt qua cả ID selector hay Inline style. Nếu không có !important, màu sẽ là Brown (do p#demo có điểm 1,0,1 cao nhất).
-Kết quả KHÔNG thay đổi
-Giải thích
Trình duyệt tính toán độ ưu tiên dựa trên trọng số Specificity trước. Thứ tự viết code (ai viết sau người đó thắng) chỉ có tác dụng khi hai rule có điểm số bằng nhau hoàn toàn. Vì 10 rules trên có điểm số khác nhau, nên thứ tự trong file không ảnh hưởng đến kết quả cuối cùng.
Phần C:
C1:
1.Chiều rộng thực tế:Sidebar:342px
                     Content:722px
2.
-Tổng chiều rộng Sidebar + Content: 342px + 722px = 1064px
-Chiều rộng Container: 960px
-Vì $1064px > 960px$, nên không còn đủ khoảng trống trên cùng một hàng, khiến khối content bị đẩy xuống dòng tiếp theo.
3.
Có 2 cách sửa:
-Cách 1: Dùng border-box
-Cách 2: Tự trừ đi phần padding và border khỏi giá trị width để tổng cuối cùng khớp với mong muốn.

C2:
1 "Sản phẩm A" (h2)
-font-size = 20px
-Giải thích: Rule .card .title nhắm trực tiếp vào thẻ h2 này. Trong CSS, các thuộc tính được xác định trực tiếp sẽ luôn thắng các thuộc tính được kế thừa từ cha (như body hay .container).
-color = green
-Giải thích: Có 3 rule cùng tác động đến màu sắc của thẻ này: .card (blue), #featured .title (red), và .highlight (green !important). Mặc dù ID selector (#featured .title) có độ ưu tiên cao hơn class, nhưng từ khóa !important trong rule .highlight là mức ưu tiên cao nhất, do đó màu xanh lá cây được áp dụng.

2 "Mô tả sản phẩm" (p trong card featured)
-color = blue
-Giải thích: Thẻ p này có thuộc tính color: inherit. Thuộc tính này ép thẻ p phải lấy giá trị màu từ phần tử cha trực tiếp của nó là .card thay vì lấy từ body. Vì .card có màu xanh da trời (blue), nên thẻ p này hiển thị màu xanh da trời.
3 "Sản phẩm B" (h2)
-font-size = 20px
-Giải thích: Tương tự Sản phẩm A, rule .card .title nhắm trực tiếp vào phần tử này với độ ưu tiên cao hơn các giá trị kế thừa.
-color = blue
-Giải thích: Rule #featured .title không áp dụng cho thẻ này vì nó không nằm trong ID featured. Rule .highlight cũng không có trên thẻ này. Do đó, nó kế thừa màu sắc từ phần tử cha trực tiếp là .card.

4 "Mô tả sản phẩm B" (p.highlight)
-color = green
-Giải thích: Mặc dù thẻ p trong .card thường nhận thuộc tính color: inherit (màu xanh), nhưng thẻ này có class .highlight. Quy tắc Cascade quy định rằng một selector trực tiếp (.highlight) sẽ ghi đè thuộc tính được kế thừa. Đặc biệt, với sự xuất hiện của !important, màu xanh lá cây (green) sẽ chiếm ưu thế tuyệt đối.


