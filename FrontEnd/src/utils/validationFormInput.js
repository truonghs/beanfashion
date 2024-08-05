export const checkEmptyKeys = (product) => {
  const emptyKeys = [];
  for (const key in product) {
    if (Array.isArray(product[key])) {
      if (product[key].length === 0) {
        emptyKeys.push(key);
      }
    } else if (typeof product[key] === "object" && product[key] !== null) {
      const childEmptyKeys = checkEmptyKeys(product[key]);
      if (childEmptyKeys.length > 0) {
        emptyKeys.push(
          ...childEmptyKeys.map((childKey) => `${key}.${childKey}`)
        );
      }
    } else {
      if (!product[key] && key !== "discount" && key !== "sold" && key !== "__v") {
        emptyKeys.push(key);
      }
    }
  }

  return emptyKeys;
};

export const generateErrorMessage = (field) => {
  switch (field) {
    case "name":
      return "Tên sản phẩm chưa nhập";
    case "description":
      return "Mô tả sản phẩm chưa nhập";
    case "images":
      return "Hình ảnh sản phẩm chưa nhập";
    case "price":
      return "Giá sản phẩm chưa nhập";
    case "category.categoryType":
      return "Loại sản phẩm chưa nhập";
    case "category.categoryDetail":
      return "Loại sản phẩm chi tiết chưa nhập";
    case "category.fabricType":
      return "Chất liệu chưa nhập";
    case "category.sex":
      return "Phân loại  giới tính chưa nhập";
    case "colors":
      return "Màu sắc chưa nhập";
    case "sizes":
      return "Kích cỡ chưa nhập";
    case "stock":
      return "Số lượng sản phẩm trong kho chưa nhập";
    case "fullName":
      return "Họ và tên chưa nhập";
    case "phoneNumber":
      return "Số diện thoại chưa nhập";
    case "email":
      return "Email chưa nhập";
    case "content":
      return "Nội dung chưa nhập";
    case "shortDesc":
      return "Mô tả tóm tắt chưa nhập";
    default:
      return "";
  }
};
