export const getToken = () => {
  return localStorage.getItem("token");
};
export const removeToken = () => {
  localStorage.removeItem("token");
};
export const setToken = (val) => {
  localStorage.setItem("token", val);
};

export const checkError = (error) => {
  switch (error) {
    case "Token not found":
      return "صلاحيتك قد انتهت بالرجاء التسجيل مره اخري";
    case "Network Error":
      return "فشل الاتصال بالانترنت";
    case "Invalid password":
      return "رقم سري غير صحيح";
    case "Invalid email":
      return "بريد الكتروني غير صحيح";
    case "Internal Server Error":
      return "هناك عطل في السيرفير الان عاود المحاوله بعد قليل";
    case "The provided email address is not valid. Please enter a valid email address.":
      return "الايميل هذا ليس صالح";
    case "The email address is already in use. Please use a different email address.":
      return "هذا البريد مستخدم من قبل";
    case "The provided password is not valid or empty. Please enter a valid password.":
      return "بالرجاء ادخال رقم سري قوي";
    case "Same password try another one":
      return "يجب ادخال رقم سري جديد مختلف عن القديم";
    case "Invalid username":
      return "ادخل اسم حقيقي";
    case "Invalid phoneNumber":
      return "رقم هاتف خطأ";
    case "No token, authorization denied":
      return "يجب تسجيل الدخول";
    case "Token is not valid":
      return "خلصت مهلة التسجيل ";
    case "Missing Data Please Enter Missing Data":
      return "هنالك معلومات لم تكتب بشكل صحيح";
    case "Rejected":
      return "طلبك مرفوض";
    case "missing data":
      return "ادخل البيانات كامله";
    case "Please enter a valid username":
      return "ادخل اسم صحيح";
    case "Please enter a valid password":
      return "ادخل رقم سري قوي";
    case "Please enter a valid phone number.":
      return "ادخل رقم هاتف صحيح";
    case "press edit first":
      return "اضغط تعديل اولا";
    default:
      return "هناك عطل في السيرفير الان عاود المحاوله بعد قليل";
  }
};

export const checkSuccess = (success) => {
  switch (success) {
    case "User updated successfully":
      return "تم التحديث بنجاح";
    case "User registered successfully":
      return "اهلا بيك";
    case "Login successful":
      return "تم التسجيل بنجاح";
    case "car is successfully sell":
      return "تم عرض العربيه بنجاح";
    case "upload banner successfully":
      return "تم نشر الاعلان بنجاح";
    case "car deleted successfully":
      return "تم ازاله السياره";
    default:
      return "";
  }
};

export const translateRole = (role) => {
  switch (role) {
    case "buyer":
      return "مشتري";
    case "seller":
      return "تاجر";
    case "showroom-owner":
      return "صاحب معرض";
    default:
      return "فارغ";
  }
};
