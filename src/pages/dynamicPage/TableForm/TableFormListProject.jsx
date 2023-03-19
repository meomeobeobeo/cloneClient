import React, { useEffect, useState } from "react";
import * as page from "../pages.json";

import Icons from "./Icons";
import { Input, Modal, Button } from "antd";
import { Col, Row } from "antd";
import { Space, Table, Tag, Select } from "antd";
import styles from "./styles.module.scss";
import Avatar from "../../../components/Avata/Avatar";
import * as api from "../../../../api/index";
import { useLocation, useParams } from "react-router-dom";
import NotFont from "../../NotFond/NotFont";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "antd";

const TrTag = ({ result, contruct, handleDelete }) => {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [formData, setFormData] = useState({
    name: result.name,
    url: result.url,
    category: result.category,
  });
 
  const [rowData, setRowData] = useState(result);
  console.log(rowData)
  const notify = () => {};

  // function set formData
  const handleSetText = (event, field_id) => {
    if (field_id === "project_name") {
      setFormData({
        ...formData,
        name: event.target.value,
      });
      //else if condition if have more field
    } else if (field_id === "project_url") {
      setFormData({
        ...formData,
        url: event.target.value,
      });
    }
  };
  const handleSetSelect = (value, field_id) => {
    if (field_id === "project_category") {
      setFormData({
        ...formData,
        type: value,
      });
    }
  };

  // action connect database
  const handleUpdateFormData = async () => {
    try {
      const response = (
        await toast.promise(
          api.updateProjectData({ projectId: result.id, formData: formData }),
          {
            pending: "updateing issue",
            success: "update success 👌",
            error: "Update fail 🤯",
          }
        )
      ).data;
      console.log(response);
      setRowData(response);

      hideModalUpdate();
    } catch (error) {
      console.warn(error);
    }
  };
  const deleteData = async () => {
    await api.deleteProject({
      projectId: result.id,
    }),
    handleDelete();
    hideModalDelete();
  };

  const showModal = () => {
    setOpen(true);
  };

  const hideModalUpdate = () => {
    setOpenModalUpdate(false);
  };
  const hideModalDelete = () => {
    setOpenModalDelete(false);
  };

  return (
    <tr className={`bg-blue-100 cursor-pointer hover:bg-blue-200`}>
      <td className={styles.td}>{rowData.name}</td>
      <td className={styles.td}>{rowData.url}</td>
      <td className={styles.td}>{rowData.category}</td>
      <td className={styles.td}>
        {moment(rowData.createdAt).format("MMM Do YY")}
      </td>
      <td className={styles.td}>
        <div className="flex flex-row gap-2 justify-center items-center">
          <div
            onClick={() => {
              setOpenModalDelete(true);
            }}
            className="p-1 flex justify-center items-center bg-blue-500 text-white rounded-full hover:bg-red-400"
          >
            <Icons iconName="FiTrash" size="16px" />
          </div>
          <div
            onClick={() => {
              setOpenModalUpdate(!openModalUpdate);
            }}
            className="p-1 flex justify-center items-center bg-blue-500 text-white rounded-full hover:bg-red-400 "
          >
            <Icons iconName="RxUpdate" size="16px" />
          </div>
        </div>
      </td>

      {/* modal update  */}
      <Modal
        title={contruct.modal.title}
        open={openModalUpdate}
        onOk={hideModalUpdate}
        onCancel={hideModalUpdate}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        footer={[
          <Button
            className="bg-blue-500"
            key="submit"
            type={contruct.buttons.edit_button.type}
            onClick={() => {
              handleUpdateFormData();
            }}
          >
            {contruct.buttons.edit_button.button_text}
          </Button>,
          <Button
            key="back"
            onClick={() => {
              hideModalUpdate();
            }}
          >
            {contruct.buttons.cancel_button.button_text}
          </Button>,
        ]}
      >
        <Row gutter={[8, 8]}>
          {contruct.modal.schema.map((data) => {
            return (
              <Col key={data.id} span={12}>
                <Typography.Title level={5}>{data.label}</Typography.Title>
                {data.html_element === "text" ? (
                  <Input
                    defaultValue={() => {
                      if (data.id === "project_name") {
                        return result.name;
                      } else if (data.id === "project_url") {
                        return result.url;
                      }
                    }}
                    onChange={(event) => {
                      handleSetText(event, data.id);
                    }}
                  />
                ) : data.html_element === "select" ? (
                  <Select
                    defaultValue={() => {
                      if (data.id === "project_category") {
                        return result.category;
                      }
                    }}
                    className="w-full"
                    onChange={(value) => {
                      handleSetSelect(value, data.id);
                    }}
                    options={data?.options}
                  />
                ) : (
                  <div>Empty</div>
                )}
              </Col>
            );
          })}
        </Row>
      </Modal>

      {/* modal delete */}
      <Modal
        title={contruct.modal_delete.title}
        open={openModalDelete}
        onOk={hideModalDelete}
        onCancel={hideModalDelete}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        footer={[
          <Button
            className="bg-red-500"
            key="submit"
            type={contruct.buttons.delete_button.type}
            onClick={() => {
              deleteData();
            }}
          >
            {contruct.buttons.delete_button.button_text}
          </Button>,
          <Button
            key="back"
            onClick={() => {
              hideModalDelete();
            }}
          >
            {contruct.buttons.cancel_button.button_text}
          </Button>,
        ]}
      ></Modal>
      <ToastContainer />
    </tr>
  );
};

const TableFormListProject = () => {
  const userId = JSON.parse(localStorage.getItem("auth"))?.user?.id;

  const [contruct, setContruct] = useState(page.table_project);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  useEffect(() => {
    // change api to get data
    const res = api.getListProjects(userId);

    res.then((data) => {
      setResultSearch(data.data);
      setIsLoading(false);
    });
  }, []);
  // console.log(contruct);
  console.log(resultSearch);
  //  from data send to server
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    category: "",
    userCreateId: userId,
  });
  console.log(formData)

  // function set formData
  const handleSetText = (event, field_id) => {
    if (field_id === "project_name") {
      setFormData({
        ...formData,
        name: event.target.value,
      });
      //else if condition if have more field
    } else if (field_id === "project_url") {
      setFormData({
        ...formData,
        url: event.target.value,
      });
    }
  };

  const handleSetSelect = (value, field_id) => {
    if (field_id === "project_category") {
      setFormData({
        ...formData,
        category: value,
      });
    }
  };

  // action setState
  const handleDelete = (idToDelete) => {
    let newResultSearch = resultSearch.filter((result) => {
      return result.id !== idToDelete;
    });
    setResultSearch(newResultSearch);
  };
  const updateResultSearchState = (data) => {
    // data is newRecord
    const newResultSearch = resultSearch;
    newResultSearch.push(data);
    setResultSearch(newResultSearch);
  };

  // acion connect database
  const handleCreateFormData = async () => {
    console.log(formData);
    try {
      const response = (
        await toast.promise(
          api.createNewProject({ formData: formData }),
          {
            pending: "creating ......",
            success: "create success 👌",
            error: "Create fail 🤯",
          }
        )
      ).data;

      console.log(response);
      updateResultSearchState(response);

      hideModalCreate();
    } catch (error) {
      console.warn(error);
    }
  };

  const hideModalCreate = () => {
    setOpenModalCreate(false);
  };

  return (
    <div className="ml-4 mt-4">
      <h1 className="text-xl">{contruct.table_title}</h1>
      <div className="w-[500px] flex flex-row my-4  ">
        <Input
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <div className="flex bg-blue-500 text-white px-2 items-center rounded-md hover:bg-orange-400">
          <Icons size={"20px"} iconName="AiOutlineSearch" />
        </div>
        <Button
          onClick={() => {
            setOpenModalCreate(true);
          }}
          type={contruct.buttons.create_button.type}
          className="bg-blue-500 text-white ml-3 flex flex-row justify-center items-center"
        >
          <Typography className="  mr-2 text-white">
            {contruct.buttons.create_button.button_text}
          </Typography>
          <Icons
            iconName={contruct.buttons.create_button.button_icon}
            size="20px"
          ></Icons>
        </Button>
      </div>

      {/* table */}
      <table className={styles.table}>
        <thead className="">
          <tr>
            {contruct.table_columns.map((col, index) => {
              return (
                <th key={index} className={styles.th}>
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {resultSearch.map((result , index) => {
            return (
              <TrTag
                key = {index}
                handleDelete={() => {
                  handleDelete(result.id);
                }}
                result={result}
                contruct={contruct}
              ></TrTag>
            );
          })}
        </tbody>
      </table>
      <Modal
        title={contruct.modal.title}
        open={openModalCreate}
        onOk={hideModalCreate}
        onCancel={hideModalCreate}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        footer={[
          <Button
            className="bg-blue-500"
            key="submit"
            type={contruct.buttons.edit_button.type}
            onClick={() => {
              handleCreateFormData();
            }}
          >
            {contruct.buttons.create_button.button_text}
          </Button>,
          <Button
            key="back"
            onClick={() => {
              hideModalCreate();
            }}
          >
            {contruct.buttons.cancel_button.button_text}
          </Button>,
        ]}
      >
        <Row gutter={[8, 8]}>
          {contruct.modal.schema.map((data) => {
            return (
              <Col key={data.id} span={12}>
                <Typography.Title level={5}>{data.label}</Typography.Title>
                {data.html_element === "text" ? (
                  <Input
                    onChange={(event) => {
                      handleSetText(event, data.id);
                    }}
                  />
                ) : data.html_element === "select" ? (
                  <Select
                    className="w-full"
                    onChange={(value) => {
                      handleSetSelect(value, data.id);
                    }}
                    options={data?.options}
                  />
                ) : (
                  <div>Empty</div>
                )}
              </Col>
            );
          })}
        </Row>
      </Modal>
      {/* toast */}
      <ToastContainer />
    </div>
  );
};

export default TableFormListProject;
