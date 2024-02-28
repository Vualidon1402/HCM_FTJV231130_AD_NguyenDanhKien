import React, { useState } from "react";
import "./listStudent.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { studentActions } from "../store/slices/ListStudent.slice";

// const randomID = () => {
//   return Math.floor(Math.random() * 100000);
// };

const ListStudent = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const studentList = useSelector((store) => store.studentReducer);
  console.log("studentList", studentList);

  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState({});

  const validate = () => {
    let newError = {};
    if (!userName) {
      newError.userName = "Họ và tên không được để trống";
    }
    if (!dateOfBirth) {
      newError.dateOfBirth = "Ngày sinh không được để trống";
    } else {
      const birthDate = new Date(dateOfBirth);
      const currentDate = new Date();
      birthDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);

      if (birthDate > currentDate) {
        newError.dateOfBirth = "Ngày sinh không được vượt quá hiện tại";
      }
    }
    if (!email) {
      newError.email = "Email không hợp lệ";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let res = await axios.post(`http://localhost:3000/students`, {
          // id: randomID(),
          name: userName,
          date_of_birth: dateOfBirth,
          email: email,
          address: address,
        });
        console.log(res);
        setShowForm(false);
        dispatch(studentActions.findAll());
      } catch (error) {
        console.log(error);
      }
    }
    setUserName("");
    setDateOfBirth("");
    setEmail("");
    setAddress("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      console.log("delete", id);
      dispatch(studentActions.findAll(id));
    } catch (error) {
      console.log(error);
    }
  };

  const [editingStudent, setEditingStudent] = useState(null);

  const handleEdit = async (id) => {
    try {
      const student = studentList.data.find((student) => student.id === id);
      setEditingStudent(student);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = async (event) => {
    setSearchValue(event.target.value);

    if (event.target.value !== "") {
      try {
        const response = await axios.get(
          `http://localhost:3000/students?email=${product.email}`
        );
        setStudentList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
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
              value={searchValue}
              onChange={handleSearchChange}
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
              {studentList.data?.map((student, index) => {
                const isEditing =
                  editingStudent && editingStudent.id === student.id;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{isEditing ? editingStudent.name : student.name}</td>
                    <td>
                      {isEditing
                        ? editingStudent.date_of_birth
                        : student.date_of_birth}
                    </td>
                    <td>{isEditing ? editingStudent.email : student.email}</td>
                    <td>
                      {isEditing ? editingStudent.address : student.address}
                    </td>
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
                      <span
                        onClick={() => {
                          handleEdit(student.id);
                        }}
                        className="button button-edit"
                      >
                        Sửa
                      </span>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          handleDelete(student.id);
                        }}
                        className="button button-delete"
                      >
                        Xóa
                      </span>
                    </td>
                  </tr>
                );
              })}
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
          <form onSubmit={handleSubmit} className="form">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Chỉnh sửa nhân viên</h4>
              <i onClick={handleCloseForm} className="fa-solid fa-xmark"></i>
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
                onChange={(e) => setUserName(e.target.value)}
              />
              <div className="form-text error">
                {error.userName && <div>{error.userName}</div>}
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
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="form-text error">
              {error.dateOfBirth && <div>{error.dateOfBirth}</div>}
            </div>
            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-text error">
              {error.email && <div>{error.email}</div>}
            </div>
            <div>
              <label className="form-label" htmlFor="address">
                Địa chỉ
              </label>
              <textarea
                className="form-control"
                id="address"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button className="w-100 btn btn-primary" type="submit">
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
