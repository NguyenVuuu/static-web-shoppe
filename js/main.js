function formValidation() {
  var frm = document.forms["survey"];
  if (frm.fname.length == 0) {
    alert("Bạn Chưa Điền Họ Tên, Làm ơn hãy điền đầy đủ thông tin!!!");
    frm.fname.focus();
    return false;
  }

  return true;
}

function checkfrom() {
  const name = document.getElementById("name").value;
  const mail = document.getElementById("email").value;
  const phone = document.getElementById("number").value;
  const comment = document.getElementById("comment").value;

  if (name === "" || email === "" || phone === "" || comment === "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  document.querySelector("form").submit();
}
document
  .querySelector("input[type='submit']")
  .addEventListener("click", checkfrom);

//Dang ky

function validateForm() {
  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();

  var nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)+$/;
  if (name && !nameRegex.test(name)) {
    alert(
      "Tên không hợp lệ! Tên phải có ít nhất 2 từ và bắt đầu bằng chữ cái hoa và không dấu."
    );
    return false;
  }

  var phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (phone && !phoneRegex.test(phone)) {
    alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.");
    return false;
  }

  var emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (email && !emailRegex.test(email)) {
    alert("Địa chỉ email không hợp lệ");
    return false;
  }

  var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  if (password && !passwordRegex.test(password)) {
    alert(
      "Mật khẩu không hợp lệ. Mật khẩu cần có ít nhất 8 ký tự, bao gồm chữ cái viết thường, chữ cái viết hoa và số."
    );
    return false;
  }

  if (name === "" || phone === "" || email === "" || password === "") {
    alert("Vui lòng điền đầy đủ thông tin.");
    return false;
  }

  var registeredEmails =
    JSON.parse(localStorage.getItem("registeredEmails")) || [];
  if (registeredEmails.includes(email)) {
    alert("Email này đã được đăng ký. Vui lòng sử dụng email khác.");
    return false;
  } else {
    registeredEmails.push(email);
    localStorage.setItem("registeredEmails", JSON.stringify(registeredEmails));
  }

  var userInfo = {
    name: name,
    phone: phone,
    email: email,
    password: password,
  };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  alert("Đăng ký thành công!");
  openSignIn();
  openSignUpButton.addEventListener("click", openSignUp, false);
  openSignInButton.addEventListener("click", openSignIn, false);
  return false;
}

function displayError(id, message) {
  var errorElement = document.getElementById(id);
  errorElement.textContent = message;
}

function clearErrors() {
  var errorMessages = document.getElementsByClassName("error-message");
  for (var i = 0; i < errorMessages.length; i++) {
    errorMessages[i].textContent = "";
  }
}

function login() {
  var userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) {
    var email = document.getElementById("email2").value.trim();
    var password = document.getElementById("password2").value.trim();
    if (email === userInfo.email && password === userInfo.password) {
      alert("Đăng nhập thành công !");
      window.location.href = "../admin1.html";
      return false;
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
      resetForm();
      return false;
    }
  } else {
    alert("Tài khoản không tồn tại!");
    return false;
  }
}
