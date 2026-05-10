Phần A:
A1:
static:-Có	
       -Theo luồng tự nhiên của tài liệu	
       -Có	
       -Giá trị mặc định cho mọi phần tử.

relative:-Có	
         -Chính vị trí ban đầu của nó	
         =Có	
         -Làm gốc tọa độ cho phần tử con dùng absolute hoặc dịch chuyển nhẹ mà không ảnh hưởng xung quanh

absolute:-Không
    	 -Phần tử cha gần nhất có position khác static	
         -Có	
         -Đặt icon, badge hoặc các thành phần trang trí vào vị trí cụ thể trong một khung.

absolute:-Không	
         -Phần tử cha gần nhất có position khác static	
         -Có	
         -Đặt icon, badge hoặc các thành phần trang trí vào vị trí cụ thể trong một khung.

sticky:-Có (cho đến khi dính)
       -Phần tử cha chứa nó và viewport
       -Có (dính ở một vị trí khi cuộn tới)
       -Tiêu đề bảng hoặc mục lục bên cạnh giúp người dùng luôn nhìn thấy khi cuộn nội dung dài.

A2:
TH1:-Bố cục: Một hàng duy nhất, các ô giãn đều bằng nhau

+-----------------------------------------------------------+
|  .container { display: flex; }                            |
+-----------+-----------+-----------+-----------+-----------+
|  [Item 1]  |  [Item 2]  |  [Item 3]  |  [Item 4]  | (flex: 1) |
+-----------+-----------+-----------+-----------+-----------+

TH2:-Bố cục: 3 hàng x 2 cột (mỗi item chiếm ~50% chiều rộng bao gồm cả margin)

+---------------------------------------+
|  [ Item 1 ] (2.5%) [ Item 2 ]         | <--- Hàng 1
|                                       |
|  [ Item 3 ]        [ Item 4 ]         | <--- Hàng 2
|                                       |
|  [ Item 5 ]        [ Item 6 ]         | <--- Hàng 3
+---------------------------------------+

TH3:-Bố cục: Item 1 sát trái, Item 3 sát phải, Item 2 ở giữa. Căn lề giữa theo chiều dọc.

+-----------------------------------------------------------+
|                                                           |
| [ Item 1 ]           [ Item 2 ]           [ Item 3 ]      |
|                                                           |
+-----------------------------------------------------------+

TH4:-Bố cục: Hai cột bên ngoài cố định, cột giữa tự do co giãn theo chiều rộng màn hình.

+---------+---------------------------------------+---------+
|  200px  |            Flexible (1fr)             |  200px  |
+---------+---------------------------------------+---------+
| [Item 1]|            [ Item 2 ]                 |[Item 3] |
+---------+---------------------------------------+---------+
   (gap) 20px                                (gap) 20px

TH5:-Bố cục: Chia làm 3 cột cố định. Item thứ 7 rơi xuống hàng cuối cùng bên trái.

+-----------+-----------+-----------+
|  [ I 1 ]  |  [ I 2 ]  |  [ I 3 ]  | <--- Hàng 1
+-----------+-----------+-----------+
|  [ I 4 ]  |  [ I 5 ]  |  [ I 6 ]  | <--- Hàng 2
+-----------+-----------+-----------+
|  [ I 7 ]  |           |           | <--- Hàng 3
+-----------+-----------+-----------+
 (10px gap)  (10px gap)

 Phần C:
 C1:
 1.Navigation bar ngang (logo + menu + buttons): Sử dụng Flexbox vì đây là bố cục sắp xếp các phần tử dọc theo một trục chiều ngang, giúp căn chỉnh khoảng cách giữa logo và các nút điều hướng rất linh hoạt.

2.Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước): Sử dụng Grid vì đây là bố cục hai chiều; bạn có thể thiết lập số cột cố định và các ảnh sẽ tự động lấp đầy các hàng tiếp theo một cách ngăn nắp.

3.Layout blog: main content + sidebar: Sử dụng Grid để quản lý khung xương tổng thể của trang web, giúp phân chia tỷ lệ diện tích giữa nội dung chính và thanh bên một cách chính xác.

4.Footer với 4 cột thông tin: Nên kết hợp cả hai, dùng Grid để chia toàn bộ footer thành 4 cột đều nhau và dùng Flexbox bên trong mỗi cột để xếp chồng các liên kết theo chiều dọc.

5.Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy): Sử dụng Flexbox với hướng trục dọc, đặt flex: 1 cho phần văn bản ở giữa để đẩy nút bấm luôn nằm sát dưới đáy card.
