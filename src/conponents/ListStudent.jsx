import React, { useState } from "react";
import "./listStudent.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { studentActions } from "../store/slices/ListStudent.slice";

const ListStudent = () => {
  const [showForm, setShowForm] = useState(false);
  
  const dispatch = useDispatch();
  const students = useSelector((store) => store.students);
  console.log(students);
  const [newStudent, setNewStudent] = useState("");
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // const handleUserNameChange = (e) => {
  //   setUserName(e.target.value);
  // };
  // const validateUserName = () => {
  //   if (userName.trim() === "") {
  //     setUserNameError("Họ và tên không được để trống.");
  //   } else {
  //     setUserNameError("");
  //   }
  // };

  // const handleDateOfBirthChange = (e) => {
  //   setDateOfBirth(e.target.value);
  // };
  // const validateDateOfBirth = () => {
  //   if (dateOfBirth.trim() === "") {
  //     setDateOfBirthError("Ngày sinh không được lớn hơn hiện tại.");
  //   } else {
  //     setDateOfBirthError("");
  //   }
  // };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };
  // const validateEmail = () => {
  //   if (email.trim() === "") {
  //     setEmailError("Email không được để trống.");
  //   } else {
  //     setEmailError("");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newStudent = {
      id: students.length + 1,
      name: e.target.name.value,
state: "đang hoạt động",

      setShowForm(false);
    
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      />
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <button className="btn btn-primary" onClick={handleShowForm}>
              Thêm mới nhân viên
            </button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <input
              style={{ width: "350px" }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
            />
            <i className="fa-solid fa-arrows-rotate" title="Refresh"></i>
          </div>

          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan="2">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nguyễn Văn A</td>
                <td>28/02/1990</td>
                <td>nvana@gmail.com</td>
                <td>Ba Đình, Hà Nội</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div className="status status-active"></div>
                    <span> Đang hoạt động</span>
                  </div>
                </td>
                <td>
                  <span className="button button-block">Chặn</span>
                </td>
                <td>
                  <span className="button button-edit">Sửa</span>
                </td>
                <td>
                  <span className="button button-delete">Xóa</span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Trần Thị B</td>
                <td>15/07/1985</td>
                <td>ttb@gmail.com</td>
                <td>Cầu Giấy, Hà Nội</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div className="status status-stop"></div>
                    <span> Ngừng hoạt động</span>
                  </div>
                </td>
                <td>
                  <span className="button button-block">Bỏ chặn</span>
                </td>
                <td>
                  <span className="button button-edit">Sửa</span>
                </td>
                <td>
                  <span className="button button-delete">Xóa</span>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Lê Văn C</td>
                <td>03/10/2000</td>
                <td>lvc@gmail.com</td>
                <td>Hai Bà Trưng, Hà Nội</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div className="status status-stop"></div>
                    <span> Ngừng hoạt động</span>
                  </div>
                </td>
                <td>
                  <span className="button button-block">Bỏ chặn</span>
                </td>
                <td>
                  <span className="button button-edit">Sửa</span>
                </td>
                <td>
                  <span className="button button-delete">Xóa</span>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Phạm Thị D</td>
                <td>20/05/1995</td>
                <td>ptd@gmail.com</td>
                <td>Hoàn Kiếm, Hà Nội</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div className="status status-active"></div>
                    <span> Đang hoạt động</span>
                  </div>
                </td>
                <td>
                  <span className="button button-block">Chặn</span>
                </td>
                <td>
                  <span className="button button-edit">Sửa</span>
                </td>
                <td>
                  <span className="button button-delete">Xóa</span>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>Ngô Văn E</td>
                <td>12/11/1988</td>
                <td>nve@gmail.com</td>
                <td>Cầu Giấy, Hà Nội</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div className="status status-active"></div>
                    <span> Đang hoạt động</span>
                  </div>
                </td>
                <td>
                  <span className="button button-block">Chặn</span>
                </td>
                <td>
                  <span className="button button-edit">Sửa</span>
                </td>
                <td>
                  <span className="button button-delete">Xóa</span>
                </td>
              </tr>
            </tbody>
          </table>
          <footer className="d-flex justify-content-end align-items-center gap-3">
            <select className="form-select">
              <option selected>Hiển thị 10 bản ghi trên trang</option>
              <option>Hiển thị 20 bản ghi trên trang</option>
              <option>Hiển thị 50 bản ghi trên trang</option>
              <option>Hiển thị 100 bản ghi trên trang</option>
            </select>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </footer>
        </main>
      </div>
      {showForm && (
        <div className="overlay">
          <form className="form">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Chỉnh sửa nhân viên</h4>
              <i className="fa-solid fa-xmark" onClick={handleCloseForm}></i>
            </div>
            <div>
              <label className="form-label" htmlFor="userName">
                Họ và tên
              </label>
              <input
                id="userName"
                type="text"
                className="form-control"
                value={userName}
                onChange={handleUserNameChange}
                onBlur={validateUserName}
              />
              <div className="form-text error">
                {userNameError && (
                  <div className="form-text error">{userNameError}</div>
                )}
              </div>
            </div>
            <div>
              <label className="form-label" htmlFor="dateOfBirth">
                Ngày sinh
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className="form-control"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                onBlur={validateDateOfBirth}
              />
            </div>
            <div className="form-text error">
              {dateOfBirthError && (
                <div className="form-text error">{dateOfBirthError}</div>
              )}
            </div>
            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                onBlur={validateEmail}
              />
            </div>
            <div className="form-text error">
              {emailError && (
                <div className="form-text error">{emailError}</div>
              )}
            </div>
            <div>
              <label className="form-label" htmlFor="address">
                Địa chỉ
              </label>
              <textarea
                className="form-control"
                id="address"
                rows="3"
              ></textarea>
            </div>
            <div>
              <button className="w-100 btn btn-primary" onSubmit={handleSubmit}>
                Thêm mới
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overlay" hidden>
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className="modal-body-custom">
            <span>Bạn có chắc chắn muốn chặn tài khoản này?</span>
          </div>
          <div className="modal-footer-custom">
            <button className="btn btn-light">Hủy</button>
            <button className="btn btn-danger">Xác nhận</button>
          </div>
        </div>
      </div>

      <div className="overlay" hidden>
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className="modal-body-custom">
            <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
          </div>
          <div className="modal-footer-custom">
            <button className="btn btn-light">Hủy</button>
            <button className="btn btn-danger">Xác nhận</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListStudent;
