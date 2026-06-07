Bootstrap:
 Phần A:

A1:

1. Bảng layout theo kích thước màn hình
    | Kích thước           | `< 768px`    | `768px - 991px` | `≥ 992px`    |
    | -------------------- | ------------ | --------------- | ------------ |
    | Số cột mỗi box chiếm | 12 cột       | 6 cột           | 3 cột        |
    | Box layout           | 1 box / hàng | 2 box / hàng    | 4 box / hàng |


2. Minh hoạ layout

    A. Màn hình nhỏ (`< 768px`)
        Do dùng `col-12` nên mỗi box chiếm toàn bộ chiều ngang.
    ```text
        +-------------------+
        | Box 1             |
        +-------------------+
        | Box 2             |
        +-------------------+
        | Box 3             |
        +-------------------+
        | Box 4             |
        +-------------------+
    ```

    B. Tablet (`768px - 991px`)
        Do dùng `col-md-6` nên mỗi box chiếm 6/12 cột → 2 box mỗi hàng.

    ```text
        +-----------+-----------+
        | Box 1     | Box 2     |
        +-----------+-----------+
        | Box 3     | Box 4     |
        +-----------+-----------+
    ```

    C. Desktop (`≥ 992px`)
        Do dùng `col-lg-3` nên mỗi box chiếm 3/12 cột → 4 box trên 1 hàng.

    ```text
        +------+------+------+------+
        | Box1| Box2| Box3| Box4|
        +------+------+------+------+
    ```

3. Câu hỏi thêm
    - `col-md-6` nghĩa là gì?
        - `md` = medium screen (màn hình trung bình, từ 768px)
        - `6` = chiếm 6/12 cột của grid system

=> `col-md-6` nghĩa là: Khi màn hình từ 768px trở lên, phần tử sẽ chiếm 6 cột trong tổng 12 cột.

4. Không cần viết `col-sm-12`vì: 

- Bootstrap hoạt động theo kiểu **mobile-first**.

- Trong code đã có:

    ```html
    col-12
    ```

Điều này đã áp dụng mặc định cho mọi kích thước màn hình nhỏ.

- Nghĩa là:

    - `<576px` → 12 cột
    - `576px - 767px` → vẫn 12 cột
    - đến khi gặp `md` thì mới đổi sang 6 cột

- Vì vậy không cần viết thêm:

    ```html
    col-sm-12
    ```
do `col-12` đã bao phủ luôn kích thước nhỏ (`sm`).

A2:

1. Giải thích class `d-none d-md-block`

-  Ý nghĩa

    ```html
    d-none d-md-block
    ```

    - `d-none` → ẩn element (`display: none`)
    - `d-md-block` → từ màn hình `md` trở lên thì hiển thị dạng `block`

- Element hiển thị khi:

    | Kích thước màn hình | Trạng thái                  |
    | ------------------- | --------------------------- |
    | `< 768px`           | Ẩn                          |
    | `≥ 768px`           | Hiển thị (`display: block`) |


- Ví dụ

    ```html
    <div class="d-none d-md-block">
        Nội dung này chỉ hiện trên tablet và desktop
    </div>
    ```

    ---

2. Liệt kê 5 spacing utilities và giải thích

- Bootstrap spacing utilities dùng để tạo khoảng cách bằng margin (`m`) và padding (`p`).

- Cú pháp chung:

    ```text 
    {property}{side}-{size}
    ```

    - `m` = margin
    - `p` = padding

- Các hướng

    | Ký hiệu | Ý nghĩa      |
    | ------- | ------------ |
    | `t`     | top          |
    | `b`     | bottom       |
    | `s`     | start (left) |
    | `e`     | end (right)  |
    | `x`     | trái + phải  |
    | `y`     | trên + dưới  |

- Ví dụ 5 utility phổ biến

    1. `mt-3`

        ```html
        <div class="mt-3"></div>
        ```

        - `m` = margin
        - `t` = top
        - `3` = kích thước mức 3

        => Tạo margin phía trên.

    2. `px-4`

        ```html
        <div class="px-4"></div>
        ```

        - `p` = padding
        - `x` = trái + phải
        - `4` = mức spacing 4

        => Tạo padding trái và phải.

    3. `mb-auto`

        ```html
        <div class="mb-auto"></div>
        ```

        - `m` = margin
        - `b` = bottom
        - `auto` = tự động

        => Margin-bottom tự động.

    4. `py-2`

        ```html
        <div class="py-2"></div>
        ```

        - Padding trên và dưới mức 2.

    5. `ms-5`

        ```html
        <div class="ms-5"></div>
        ```

        - Margin bên trái (start) mức 5.

3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`

    | Class              | Đặc điểm                                           |
    | ------------------ | -------------------------------------------------- |
    | `.container`       | Có chiều rộng cố định theo từng breakpoint         |
    | `.container-fluid` | Luôn full chiều ngang màn hình (`width: 100%`)     |
    | `.container-md`    | Full width ở màn hình nhỏ, cố định từ `md` trở lên |



- `.container`

    ```html 
    <div class="container"></div>
    ```

    - Responsive theo breakpoint.
    - Có max-width thay đổi theo kích thước màn hình.
    - Thường dùng nhất.


- `.container-fluid`

    ```html
    <div class="container-fluid"></div>
    ```

    - Luôn chiếm 100% chiều ngang.
    - Dùng cho layout full màn hình.


- `.container-md`

    ```html 
    <div class="container-md"></div>
    ```

    - `<768px` → full width
    - `≥768px` → hoạt động giống `.container`

- Minh hoạ

    - `.container`

        ```text 
        |    nội dung cố định giữa màn hình    |
        ```

    - `.container-fluid`

        ```text 
        |nội dung kéo full toàn màn hình|
        ```

    - `.container-md`

        ```text
        Mobile: full width
        Desktop: fixed width
        ```

Phần C:

C1:

1. Đổi màu `$primary` sang `#E63946`

- Mục tiêu

    - Đổi màu Bootstrap mặc định:

        ```scss
        $primary: #0d6efd;
        ```

        thành:

        ```scss
        $primary: #E63946;
        ```

- Quy trình thực hiện
    - Bước 1 — Cài công cụ
        - Cần:
            - Bootstrap source SCSS
            - Sass compiler
        - Cài bằng npm:

            ```bash
            npm install bootstrap
            npm install sass
            ```

    - Bước 2 — Tạo file SCSS riêng
        - Ví dụ:

        ```text
        custom.scss
        ```

    - Bước 3 — Override variable trước khi import Bootstrap

        - Trong `custom.scss`:

            ```scss
            $primary: #E63946;

            @import "../node_modules/bootstrap/scss/bootstrap";
            ```

        - Bootstrap sẽ dùng màu mới để generate:
            - button
            - alert
            - navbar
            - badge
            - border
            - text colors
            - utilities

    - Bước 4 — Compile SCSS → CSS

        - Dùng Sass:

            ```bash
            sass custom.scss custom.css
            ```

    - Bước 5 — Link file CSS mới

        ```html
        <link rel="stylesheet" href="custom.css">
        ```

**Kết quả**
    Các class như:
        - `.btn-primary`
        - `.bg-primary`
        - `.text-primary`
        - `.border-primary`
    đều tự động đổi sang:

        ```css
        #E63946
        ```

2. Tại sao KHÔNG nên override trực tiếp `.btn-primary`?

- Cách KHÔNG tốt

        ```css
        .btn-primary {
        background: red;
        }
        ```

- Lý do không nên

    A. Chỉ đổi được một component
        Đoạn trên chỉ đổi:
            - `.btn-primary`
        Nhưng:
            - `.bg-primary`
            - `.alert-primary`
            - `.text-primary`
            - `.border-primary`
        vẫn giữ màu cũ.
        => Giao diện không đồng bộ.

    B. Dễ conflict CSS
        Bootstrap có:
            - hover
            - active
            - focus
            - disabled
        Ví dụ:
    
    ```css
        .btn-primary:hover
        .btn-primary:focus
        .btn-primary:active
    ```

    - Nếu override thủ công dễ:
        - mất hiệu ứng
        - sai màu
        - CSS bị ghi đè lẫn nhau


    C. Khó maintain
        Khi project lớn:
            - phải sửa nhiều nơi
            - code khó quản lý
            - dễ lỗi sau khi update Bootstrap

    D. Mất lợi ích của Bootstrap theme system
        - Bootstrap được thiết kế theo hệ thống variables:

        ```scss
        $primary;
        $success;
        $danger;
        $warning;        
        ```

    - Khi đổi variable:
        - toàn bộ framework tự cập nhật
        - nhất quán toàn hệ thống


3. Vì sao nên dùng SASS variables?

- Ưu điểm

    | SASS Variables         | Override CSS           |
    | ---------------------- | ---------------------- |
    | Đồng bộ toàn framework | Chỉ sửa từng component |
    | Dễ maintain            | Khó maintain           |
    | Chuẩn Bootstrap        | Không chuẩn            |
    | Hỗ trợ theme system    | Không                  |
    | Ít conflict            | Dễ conflict            |

- Kết luận
    - Nên dùng:

        ```scss
        $primary: #E63946;
        ```

    và compile lại Bootstrap.

    - Không nên:

    ```css
    .btn-primary {
    background: red;
    }
    ```

    - Vì:
        - không đồng bộ
        - khó bảo trì
        - dễ lỗi
        - không tận dụng được hệ thống theme của Bootstrap.

C2:

1. Navbar responsive bằng CSS thuần (PBT trước)

    ```css
    .navbar {
        background: #f8f8f8;
        padding: 16px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        position: sticky;
        top: 0;
    }
    ```

Navbar responsive được xử lý bằng:

```css 
    @media (min-width: 768px) {

        .hamburger {
            display: none;
        }

        .nav-menu {
            display: flex;
        }
    }
```

=> Mobile hiện hamburger

=> Tablet/Desktop hiện menu ngang

2. Product card bằng CSS thuần

    ```css
    .product-card {
        background: white;
        border-radius: 12px;

        display: flex;
        flex-direction: column;

        box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }
    ```

    - Card còn có:
        - hover effect
        - responsive grid
        - image handling
        - button styling

3. Bootstrap version tương đương

Navbar Bootstrap

```html
    <nav class="navbar navbar-expand-lg bg-light">

        <div class="container">

            <a class="navbar-brand">
                ShopZone
            </a>

            <button class="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#menu">

                <span class="navbar-toggler-icon"></span>
            </button>

        </div>

    </nav>
```

Product Card Bootstrap

```html
    <div class="card shadow">

        <img src="product.jpg"
            class="card-img-top">

        <div class="card-body">

            <h5 class="card-title">
                Product Name
            </h5>

            <p class="card-text">
                Product Description
            </p>

            <button class="btn btn-primary">
                Buy Now
            </button>

        </div>

    </div>
```

4. So sánh

    | Tiêu chí      | CSS thuần (PBT)       | Bootstrap           |
    | ------------- | --------------------- | ------------------- |
    | Số dòng CSS   | ~250 dòng             | Gần như không cần   |
    | Responsive    | Tự viết media query   | Có sẵn              |
    | Navbar        | Tự code flex + mobile | Có component sẵn    |
    | Product card  | Tự style toàn bộ      | Có `card` component |
    | Grid layout   | Tự viết CSS Grid      | Có Bootstrap Grid   |
    | Hover effect  | Tự viết               | Có thể thêm utility |
    | Thời gian làm | Lâu hơn               | Nhanh hơn           |

5. Số dòng CSS cần viết

- CSS thuần
    - Trong file PBT khoảng hơn 250 dòng CSS 
    - Phải tự viết:
        - responsive
        - grid
        - hover
        - navbar
        - sidebar
        - spacing
        - typography

- Bootstrap
    - Chỉ cần thêm classes
    - Ví dụ:

        ```html
        class="row col-lg-3 col-md-6"
        ```

    => Bootstrap tự xử lý responsive.

6. Thời gian phát triển

- CSS thuần mất nhiều thời gian vì phải:
    - nghĩ layout
    - viết media query
    - test responsive
    - fix spacing

- Bootstrap nhanh hơn nhiều vì:
    - có sẵn component
    - responsive built-in
    - utility classes mạnh

7. Khả năng tùy biến

- CSS thuần
    - Ưu điểm:
        - toàn quyền thiết kế
        - UI độc đáo
        - animation/custom dễ
    - Nhược điểm:
        - code nhiều
        - khó maintain

- Bootstrap
    - Ưu điểm:
        - đồng bộ
        - nhanh
        - responsive mạnh
    - Nhược điểm:
        - UI dễ giống Bootstrap
        - custom sâu hơi khó nếu không dùng SCSS

8. NÊN dùng Bootstrap khi:
    - Làm admin dashboard
    - Landing page
    - CRUD website
    - Deadline ngắn
    - Prototype nhanh
    - Team nhỏ
    - Không cần UI quá độc đáo
Ví dụ:
    - dashboard
    - ecommerce cơ bản
    - website công ty

9. KHÔNG NÊN dùng Bootstrap khi:
    - Website cần design riêng biệt
    - UI/UX quá custom
    - Animation phức tạp
    - Muốn tối ưu performance cực cao
    - Có design system riêng
Ví dụ:
    - portfolio cao cấp
    - creative website
    - product website độc quyền

10. Kết luận

- CSS thuần (PBT trước)
    - linh hoạt
    - custom mạnh
    - học CSS tốt hơn
    - nhưng code nhiều và lâu hơn

- Bootstrap
    - phát triển nhanh
    - responsive tốt
    - component mạnh
    - phù hợp đa số project thực tế nhỏ và vừa 

