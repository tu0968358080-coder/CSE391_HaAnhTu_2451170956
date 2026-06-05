const form = document.getElementById("registerForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const phoneInput = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const successModal = document.getElementById("successModal");
const modalData = document.getElementById("modalData");
const closeModalBtn = document.getElementById("closeModalBtn");

const fieldsState = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
};

function setStatus(input, isValid, errorMsg = "") {
    const group = input.closest(".form-group");
    const icon = group.querySelector(".status-icon");
    const errorDisplay = group.querySelector(".error-msg");

    if (isValid) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        icon.textContent = "✅";
        icon.style.color = "var(--success-color)";
        if (errorDisplay) errorDisplay.textContent = "";
    } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        icon.textContent = "❌";
        icon.style.color = "var(--danger-color)";
        if (errorDisplay && errorMsg) errorDisplay.textContent = errorMsg;
    }
}

function checkFormValidity() {
    const allValid = Object.values(fieldsState).every(state => state === true);
    submitBtn.disabled = !allValid;
}

usernameInput.addEventListener("input", function() {
    const val = usernameInput.value.trim();
    if (val.length >= 2 && val.length <= 50) {
        setStatus(usernameInput, true);
        fieldsState.username = true;
    } else {
        setStatus(usernameInput, false, "Tên phải từ 2 đến 50 ký tự.");
        fieldsState.username = false;
    }
    checkFormValidity();
});

emailInput.addEventListener("input", function() {
    const val = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(val)) {
        setStatus(emailInput, true);
        fieldsState.email = true;
    } else {
        setStatus(emailInput, false, "Email không hợp lệ (Ví dụ: abc@domain.com).");
        fieldsState.email = false;
    }
    checkFormValidity();
});

passwordInput.addEventListener("input", function() {
    const val = passwordInput.value;
    let strength = 0;
    let msg = "";
    let color = "";

    if (val.length === 0) {
        strengthBar.style.width = "0%";
        strengthText.textContent = "";
        setStatus(passwordInput, false, "Mật khẩu không được để trống.");
        fieldsState.password = false;
        validateConfirmPassword();
        checkFormValidity();
        return;
    }

    const hasChar = /[a-zA-Z]/.test(val);
    const hasNum = /[0-9]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);

    if (val.length < 8) {
        strength = 33;
        msg = "Độ mật khẩu: Yếu";
        color = "var(--danger-color)";
    } else if (hasUpper && hasLower && hasNum && hasSpecial) {
        strength = 100;
        msg = "Độ mật khẩu: Mạnh";
        color = "var(--success-color)";
    } else if (hasChar && hasNum) {
        strength = 66;
        msg = "Độ mật khẩu: Trung bình";
        color = "var(--warning-color)";
    } else {
        strength = 33;
        msg = "Độ mật khẩu: Yếu";
        color = "var(--danger-color)";
    }

    strengthBar.style.width = strength + "%";
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = msg;
    strengthText.style.color = color;

    if (val.length >= 8) {
        setStatus(passwordInput, true);
        fieldsState.password = true;
    } else {
        setStatus(passwordInput, false, "Mật khẩu tối thiểu phải từ 8 ký tự.");
        fieldsState.password = false;
    }

    validateConfirmPassword();
    checkFormValidity();
});

function validateConfirmPassword() {
    const pVal = passwordInput.value;
    const cpVal = confirmPasswordInput.value;

    if (cpVal.length > 0 && pVal === cpVal) {
        setStatus(confirmPasswordInput, true);
        fieldsState.confirmPassword = true;
    } else {
        setStatus(confirmPasswordInput, false, "Mật khẩu xác nhận không trùng khớp.");
        fieldsState.confirmPassword = false;
    }
}

confirmPasswordInput.addEventListener("input", function() {
    validateConfirmPassword();
    checkFormValidity();
});

phoneInput.addEventListener("input", function(e) {
    let digits = phoneInput.value.replace(/\D/g, "");
    
    if (digits.length > 10) {
        digits = digits.substring(0, 10);
    }

    let formatted = "";
    if (digits.length > 0) {
        if (digits.length <= 4) {
            formatted = digits;
        } else if (digits.length <= 7) {
            formatted = `${digits.substring(0, 4)}-${digits.substring(4)}`;
        } else {
            formatted = `${digits.substring(0, 4)}-${digits.substring(4, 7)}-${digits.substring(7)}`;
        }
    }

    phoneInput.value = formatted;

    if (digits.length === 10) {
        setStatus(phoneInput, true);
        fieldsState.phone = true;
    } else {
        setStatus(phoneInput, false, "Số điện thoại phải đủ 10 chữ số.");
        fieldsState.phone = false;
    }
    checkFormValidity();
});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    modalData.innerHTML = "";
    
    const items = [
        { label: "Họ và tên", value: usernameInput.value.trim() },
        { label: "Email", value: emailInput.value.trim() },
        { label: "Số điện thoại", value: phoneInput.value }
    ];

    items.forEach(item => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
        modalData.appendChild(p);
    });

    successModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", function() {
    successModal.style.display = "none";
    form.reset();
    strengthBar.style.width = "0%";
    strengthText.textContent = "";
    
    document.querySelectorAll(".status-icon").forEach(icon => icon.textContent = "");
    document.querySelectorAll("input").forEach(input => input.classList.remove("valid", "invalid"));
    
    Object.keys(fieldsState).forEach(key => fieldsState[key] = false);
    checkFormValidity();
});