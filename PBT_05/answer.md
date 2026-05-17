Phần A:

A1:

1. Thẻ `<meta viewport>` chuẩn và giải thích thuộc tính.

        ```html
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ```
    Giải thích:
    - `name="viewport"`: Khai báo thẻ này dùng để điều khiển vùng hiển thị trên thiết bị di động.
    - `width="device-width"`: Dùng để đặt chiều rộng viewport bằng đúng chiều rộng trên màn hình thiết bị.
    - `initial-sacle=1.0`: Có nghĩa là mức zoom ban đầu khi mở trang ra là 100%, không phóng to hay thu nhỏ.

2. Nếu THIẾU thẻ `<meta viewport>, iPhone sẽ: 
- Giẩ định trang web rộng khoảng 980px như desktop, rồi tự thu nhỏ toàn bộ trang lại để vừa màn hình điện thoại.
- Hậu quả:
    - Chữ rất nhỏ.
    - Nút bấm khó nhấn.
    - Người dùng phải zoom mới đọc được
    - UX kém

> Nguồn tham chiếu: 13_creating_responsive_layouts.ms - Viewport Meta Tag — Không thể thiếu

3. Sự khác nhau Mobile-First và Desktop-First
- Mobile-First: Viết CSS cho mobile trước. Sau đó dùng `@media (min-width:...)` để mở rộng cho màn hình lớn hơn.

    ```css
    .container {
        width: 100%;
        font-size: 14px;
    }

    @media (min-width: 768px) {
        .container {
            width: 750px;
            font-size: 18px;
        }
    }
    ```

- Desktop-First: Viết CSS cho desktop trước. Sau đó dùng `@media (max-width:...)` để chỉnh cho màn hình nhỏ hơn.

    ```css
    .container {
        width: 1200px;
        font-size: 18px;
    }

    @media (max-width: 768px) {
        .container {
            width: 100%;
            font-size: 14px;
        }
    }
    ```

- Mobile-First được khuyên dùng vì:
    - Mobile tải ít CSS hơn -> nhanh hơn
    - Buộc lập trình viên ưu tiên nội dung quan trọng trước.
    - Google và performance tools đánh giá cao hơn.

> Nguồn tham chiếu: 13_creating_responsive_layouts.md - Mobile-First vs Desktop-First

A2:
| Tên | Min-width | Thiết bị điển hình | Ví dụ lưới sản phẩm|
|---|---|---|---|
| **Mobile** | < 576px | iPhone SE, các điện thoại nhỏ | 1 cột |
| **Mobile L** | ≥ 576px | iPhone Plus, điện thoại ngang | 2 cột | 
| **Tablet** | ≥ 768px | iPad dọc, tablet | 2 cột |
| **Desktop** | ≥ 992px | Laptop nhỏ | 3 cột |
| **Desktop L** | ≥ 1200px | Desktop, laptop lớn | 4 cột |
| **Desktop XL** | ≥ 1400px | Màn hình 4K, ultrawide | 5-6 cột |

> Nguồn tham chiếu: 13_creating_responsive_layouts.md - Breakpoints chuẩn

A3:

| Chiều rộng màn hình | `.container` width |
| ------------------- | ------------------ |
| 375px (iPhone SE)   | `100%`             |
| 600px               | `540px`            |
| 800px               | `720px`            |
| 1000px              | `960px`            |
| 1400px              | `1140px`           |

A4:

1. Variables (`$primary-color`)
- Dùng để lưu màu sắc, font, sapcing... để sửa 1 chỗ là toàn bộ tự đổi.
- Ví dụ:

    ```SCSS
    $primary-color: #7c3aed;
    $radius: 8px;

    .button {
        background: $primary-color;
        border-radius: $radius;
    }
    ```

    Nếu đổi

    ```SCSS
    $primary-color: red;
    ```
    -> tất cả chỗ dùng `$primary-color` sẽ đổi theo

2. Nesting(CSS lồng nhau)
- Cho phép viết CSS theo cấu trúc HTML, dễ đọc hơn CSS thường.
- Ví dụ:

    ```SCSS
    .navbar {
        background: black;
        
        .logo {
            color: white;
        }

        a {
            color: gray;

            &:hover {
                color: yellow;
            }
        }
    }
    ```

    ```CSS
    .navbar { background: black; }
    .navbar .logo { color: white; }
    .navbar a { color: gray; }
    .navbar a:hover { color: yellow; }
    ```
3. Mixins (`@mixin`, `@inclue`)
- Mixin giống hàm CSS dùng để tái sử dụng code nhiều lần.
    - `@mixin` -> định nghĩa
    - `@include` -> sử dụng
- Ví dụ:

    ```SCSS
    @mixin flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .box {
        @include flex-center;
        height: 200px;
    }
    ```

    ```CSS
    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
    }
    ```

4. `@extend` / Inheritance
- Dùng để kế thừa style từ class khác
- Ví dụ:

    ```SCSS
    .button {
    padding: 10px;
    border-radius: 6px;
    }

    .button-primary {
        @extend .button;
        background: blue;
        color: white;
    }
    ```

    ```CSS
    .button,
    .button-primary {
        padding: 10px;
        border-radius: 6px;
    }

    .button-primary {
        background: blue;
        color: white;
    }
    ```

Trình duyệt không đọc được file `.scss` vì SCSS không phải CSS chuẩn của browser.

Để chuyển SCSS -> CSS thì cần compile SCSS thành CSS bằng SCSS compiler.

Phần B:

B3:

SCSS Compile Command

1.  Install Sass

```bash
npm install -g sass
```

2. Compile SCSS to CSS

```bash
sass scss/style.scss scss/style.css
```

3. Watch Mode

```bash
sass --watch scss/style.scss:scss/style.css
```

Phần C:

C1:

Phân tích giao diện Responsive

1. Navigation thay đổi như thế nào?
- Mobile (375px)
    - Thanh navigation được thu gọn.
    - Xuất hiện biểu tượng hamburger menu (☰).
    - Các chuyên mục chính bị ẩn bớt.
    - Thanh tìm kiếm thu nhỏ hoặc ẩn.
    - Header đơn giản để tiết kiệm không gian.
- Tablet (768px)
    - Menu hiển thị nhiều mục hơn mobile.
    - Một số danh mục vẫn nằm trong dropdown.
    - Layout cân bằng giữa mobile và desktop.
    - Navigation ngang bắt đầu xuất hiện đầy đủ hơn.
- Desktop (1440px)
    - Menu điều hướng đầy đủ.
    - Hiển thị toàn bộ chuyên mục:
        - Thời sự
        - Kinh doanh
        - Thể thao
        - Giải trí
        - Công nghệ...
    - Có thêm:
        - Thanh tìm kiếm
        - Login/account
        - Nhiều menu phụ

📌 Kết luận: VNExpress dùng responsive navigation:
- Mobile → Hamburger menu
- Tablet → Menu rút gọn
- Desktop → Full navigation bar

2. Lưới Content thay đổi bao nhiêu cột?

    | Thiết bị | Layout |
    |---|---|
    | Mobile | 1 cột |
    | Tablet | 2 cột |
    | Desktop | 3–4 cột |

- Mobile
    - Tin tức xếp dọc.
    - Ảnh full width.
    - Bài viết hiển thị dạng card.

- Tablet
    - Bắt đầu chia 2 cột.
    - Sidebar có thể xuất hiện.

- Desktop
    - Nhiều cột:
    - Main content
    - Sidebar
    - Trending/newsfeed
    - Tận dụng không gian màn hình lớn.

3. Elements nào bị ẩn trên Mobile?

- Các thành phần thường bị ẩn:
    - Sidebar quảng cáo
    - Tin nổi bật phụ
    - Banner lớn
    - Một số menu phụ
    - Widget thời tiết/chứng khoán
    - Footer mở rộng

- Mục tiêu
    - Giảm tải nội dung
    - Tăng tốc độ tải
    - Trải nghiệm dễ đọc trên điện thoại

3. Font size có thay đổi không?

- Có.

    | Thiết bị | Font |
    |---|---|
    | Mobile | Nhỏ hơn |
    | Tablet | Trung bình |
    | Desktop | Lớn hơn |

- Ví dụ

    - Mobile:
    - Title khoảng 14–16px

    - Tablet:
    - 16–18px

    - Desktop:
    - 20px+

- Ngoài ra:
    - Khoảng cách padding/margin cũng thay đổi.
    - Line-height lớn hơn trên desktop giúp dễ đọc.


4. Media Queries tìm được trong DevTools

- Media Query 1

    ```css
    @media screen and (max-width: 767px) {
        .sidebar {
            display: none;
        }
    }
    ```
    - Ý nghĩa
        - Khi màn hình nhỏ hơn 768px:
        - Ẩn sidebar
        - Chuyển sang layout mobile



- Media Query 2

    ```css
    @media screen and (min-width: 1024px) {
        .container {
            max-width: 1200px;
        }
    }
    ```
    - Ý nghĩa
        - Với desktop:
        - Tăng chiều rộng container
        - Hiển thị nhiều cột hơn

**Tổng kết**

VNExpress sử dụng thiết kế responsive rất rõ ràng:
    - Mobile
        - Giao diện tối giản
        - Hamburger menu
        - 1 cột content
    -  Tablet
        - 2 cột
        - Menu mở rộng hơn
    - Desktop
        - Full navigation
        - Nhiều sidebar
        - Layout nhiều cột
    - Trang sử dụng nhiều `@media queries` để:
        - Ẩn/hiện thành phần
        - Điều chỉnh grid layout
        - Thay đổi font size
        - Tối ưu trải nghiệm đa thiết bị

C2:

1. Responsive Strategy

    A. Mobile Layout (<768px)

    - Wireframe Mobile

        ```text
            +----------------------+
            | LOGO      ☎ Hotline |
            +----------------------+

            +----------------------+
            |                      |
            |     HERO IMAGE       |
            |                      |
            +----------------------+

            +----------------------+
            | Ảnh 1                |
            +----------------------+
            | Ảnh 2                |
            +----------------------+
            | Ảnh 3                |
            +----------------------+
            | Ảnh 4                |
            +----------------------+
            | Ảnh 5                |
            +----------------------+
            | Ảnh 6                |
            +----------------------+

            +----------------------+
            |   FORM ĐẶT BÀN       |
            | [Ngày]               |
            | [Giờ]                |
            | [Số người]           |
            | [Ghi chú]            |
            | [Button Đặt bàn]     |
            +----------------------+

            +----------------------+
            |     GOOGLE MAP       |
            +----------------------+

            +----------------------+
            |       FOOTER         |
            +----------------------+
        ```

    - Giải thích:
        - Hero image hiển thị full width.
        - Grid ảnh món ăn hiển thị **1 cột**.
        - Form đặt bàn nằm bên dưới gallery để dễ thao tác trên điện thoại.
        - Google Maps hiển thị full width.
        - Có thể ẩn bớt nội dung phụ hoặc giảm chiều cao map.
        - Không sử dụng sidebar.

    B. Tablet Layout (768px → 1023px)

    - Wireframe Tablet

        ```text
            +-----------------------------------+
            | LOGO                 ☎ Hotline    |
            +-----------------------------------+

            +-----------------------------------+
            |                                   |
            |            HERO IMAGE             |
            |                                   |
            +-----------------------------------+

            +---------------+-------------------+
            |    Ảnh 1      |      Ảnh 2        |
            +---------------+-------------------+
            |    Ảnh 3      |      Ảnh 4        |
            +---------------+-------------------+
            |    Ảnh 5      |      Ảnh 6        |
            +---------------+-------------------+

            +-----------------------------------+
            |         FORM ĐẶT BÀN              |
            | [Ngày] [Giờ]                      |
            | [Số người]                        |
            | [Ghi chú.............]            |
            +-----------------------------------+

            +-----------------------------------+
            |          GOOGLE MAP               |
            +-----------------------------------+

            +-----------------------------------+
            |             FOOTER                |
            +-----------------------------------+
        ```

    - Giải thích:
        - Grid ảnh hiển thị **2 cột**.
        - Form đặt bàn vẫn nằm dưới gallery.
        - Google Maps đặt bên dưới form.
        - Header có khoảng cách rộng hơn.
        - Chưa cần sidebar.

    C. Desktop Layout (≥1024px)

    - Wireframe Desktop

        ```text
            +------------------------------------------------------+
            | LOGO                               ☎ Hotline         |
            +------------------------------------------------------+

            +------------------------------------------------------+
            |                                                      |
            |                    HERO IMAGE                        |
            |                                                      |
            +------------------------------------------------------+

            +--------------------------+---------------------------+
            |                          |                           |
            |     GRID 6 ẢNH           |      FORM ĐẶT BÀN        |
            |     (3 cột)              | [Ngày]                   |
            |                          | [Giờ]                    |
            |                          | [Số người]               |
            |                          | [Ghi chú]                |
            |                          | [Button]                 |
            +--------------------------+---------------------------+

            +------------------------------------------------------+
            |                   GOOGLE MAP                         |
            +------------------------------------------------------+

            +------------------------------------------------------+
            |                     FOOTER                           |
            +------------------------------------------------------+
        ```

    - Giải thích:
        - Layout chính sử dụng **2 cột**:
            - Bên trái: gallery món ăn.
            - Bên phải: form đặt bàn.
        - Grid ảnh hiển thị **3 cột**.
        - Form có thể hoạt động như sidebar bên phải.
        - Google Maps hiển thị full width phía dưới.

2. CSS Skeleton (Mobile First)

    ```css
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body{
            font-family: Arial, sans-serif;
        }

        .container{
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
        }

        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .hero{
            height: 300px;
            background: #ddd;
        }

        .food-grid{
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
        }

        .food-item{
            height: 150px;
            background: #ccc;
        }

        .booking-form{
            display: grid;
            gap: 15px;
        }

        .map{
            height: 300px;
            background: #bbb;
        }

        .footer{
            text-align: center;
            padding: 20px;
            background: #eee;
        }

        @media (min-width: 768px){

            .food-grid{
                grid-template-columns: repeat(2, 1fr);
            }

            .booking-form{
                grid-template-columns: 1fr 1fr;
            }

            .booking-form textarea{
                grid-column: span 2;
            }
        }

        @media (min-width: 1024px){

            .main-content{
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 30px;
                align-items: start;
            }

            .food-grid{
                grid-template-columns: repeat(3, 1fr);
            }

            .booking-form{
                grid-template-columns: 1fr;
            }
        }
    ```

3. Tóm tắt Responsive Strategy

    | Thiết bị | Grid ảnh | Form đặt bàn | Sidebar | Google Maps |
    |----------|----------|--------------|----------|--------------|
    | Mobile | 1 cột | Dưới gallery | Không | Full width |
    | Tablet | 2 cột | Dưới gallery | Không | Dưới form |
    | Desktop | 3 cột | Bên phải gallery | Có dạng sidebar | Full width |

