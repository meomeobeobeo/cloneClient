import React, { useEffect, useState } from "react";
import * as pages from "../pages.json";

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
import useMethod from "../../../hooks/useMethod";
import { Spin } from "antd";
const TrTag = ({ result, contruct, handleDelete, handleChangeData }) => {
  console.log(result);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idPage = searchParams.get("idPage");

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  // set formData auto
  // o day co 3 trương name , url , category
  // can phai  lay du lieu tuong ung tu result va set up vao formData
  //
  //   console.log(result[keysOfFormData[1]]) vi du nhu nay de lay value
  //   set up form
  const keysOfFormData = Object.keys(contruct?.formDataUpdate);
  //   console.log(keysOfFormData);
  let formSetUpAsArray = [];
  for (let i = 0; i < keysOfFormData.length; i++) {
    const myObject = {
      [keysOfFormData[i]]: result[keysOfFormData[i]],
    };
    formSetUpAsArray.push(myObject);
  }
  //
  const formSetUp = formSetUpAsArray.reduce((result, current) => {
    return Object.assign(result, current);
  }, {});

  // form setup return needed value

  //   console.log(formSetUp);

  const [formData, setFormData] = useState(formSetUp);
  const deleteMethod = useMethod(contruct?.methodData?.deleteData);
  const updateMethod = useMethod(contruct?.methodData?.updateData);
  const listFieldId = contruct?.modal?.schema.map((value) => {
    return value.id;
  });
  //   useEffect(() => {
  //     // console.log(result)
  //     setRowData(result);
  //   }, [idPage]);
  //   console.log(rowData);
  // function set formData
  const handleSetText = (event, field_id, field_name) => {
    listFieldId.forEach((idOfSchema) => {
      if (field_id === idOfSchema) {
        setFormData({
          ...formData,
          [field_name]: event.target.value,
        });
      }
    });
  };
  const handleSetSelect = (value, field_id, field_name) => {
    listFieldId.forEach((idOfSchema) => {
      if (field_id === idOfSchema) {
        setFormData({
          ...formData,
          [field_name]: value,
        });
      }
    });
  };

  // action connect database
  const handleUpdateFormData = async () => {
    try {
      if (contruct.id === "table-project") {
        const response = (
          await toast.promise(
            updateMethod({ projectId: result.id, formData: formData }),
            {
              pending: "updateing issue",
              success: "update success 👌",
              error: "Update fail 🤯",
            }
          )
        ).data;
        //   console.log(response);
        handleChangeData({ formData: response });
      } // else if codition
      else {
        const response = (
          await toast.promise(
            updateMethod({ id: result.id, formData: formData }),
            {
              pending: "updateing issue",
              success: "update success 👌",
              error: "Update fail 🤯",
            }
          )
        ).data;
        //   console.log(response);
        handleChangeData({ formData: response });
      }

      hideModalUpdate();
    } catch (error) {
      console.warn(error);
    }
  };
  const deleteData = async () => {
    if (contruct.id === "table-project") {
      await deleteMethod({
        projectId: result.id,
      });
    } // else if condition
    else {
      await deleteMethod({
        id: result.id,
      });
    }

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
      {keysOfFormData.map((value, index) => {
        // console.log(rowData[value]);
        return (
          <td key={index} className={styles.td}>
            {result[value]}
          </td>
        );
      })}
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
        title={contruct?.modal?.title}
        open={openModalUpdate}
        onOk={hideModalUpdate}
        onCancel={hideModalUpdate}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        footer={[
          <Button
            className="bg-blue-500"
            key="submit"
            type={contruct?.buttons?.edit_button?.type}
            onClick={() => {
              handleUpdateFormData();
            }}
          >
            {contruct?.buttons?.edit_button?.button_text}
          </Button>,
          <Button
            key="back"
            onClick={() => {
              hideModalUpdate();
            }}
          >
            {contruct?.buttons?.cancel_button?.button_text}
          </Button>,
        ]}
      >
        <Row gutter={[8, 8]}>
          {contruct?.modal?.schema.map((data) => {
            return (
              <Col key={data.id} span={12}>
                <Typography.Title level={5}>{data.label}</Typography.Title>
                {data.html_element === "text" ? (
                  <Input
                    defaultValue={() => {
                      return result[data.name];
                    }}
                    onChange={(event) => {
                      handleSetText(event, data.id, data.name);
                    }}
                  />
                ) : data.html_element === "select" ? (
                  <Select
                    defaultValue={() => {
                      return result[data.name];
                    }}
                    className="w-full"
                    onChange={(value) => {
                      handleSetSelect(value, data.id, data.name);
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
        title={contruct?.modal_delete?.title}
        open={openModalDelete}
        onOk={hideModalDelete}
        onCancel={hideModalDelete}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        footer={[
          <Button
            className="bg-red-500"
            key="submit"
            type={contruct?.buttons?.delete_button?.type}
            onClick={() => {
              deleteData();
            }}
          >
            {contruct?.buttons?.delete_button?.button_text}
          </Button>,
          <Button
            key="back"
            onClick={() => {
              hideModalDelete();
            }}
          >
            {contruct?.buttons?.cancel_button?.button_text}
          </Button>,
        ]}
      ></Modal>
    </tr>
  );
};

const TableViewer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idPage = searchParams.get("idPage");
  if (!idPage) {
    return <NotFont />;
  }
  const [listPages, setListPages] = useState(pages.default);
  let contruct = {};
  //   console.log(listPages);
  contruct = listPages.find((page) => page.id === idPage);

  useEffect(() => {
    // window.location.reload();
    contruct = listPages.find((page) => page.id === idPage);
  }, [idPage]);

  // If no matching page is found, render the NotFont component

  if (!contruct) {
    return <NotFont />;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  let getMethod = useMethod(contruct?.methodData?.filterData);
  let createMethod = useMethod(contruct?.methodData?.createData);
  const formCreate = contruct.formDataCreate;
  const [formData, setFormData] = useState(formCreate);
  console.log(resultSearch);

  const listFieldId = contruct?.modal?.schema.map((value) => {
    return value.id;
  });
  //   useEffect to reset formData and api when idPage change
  useEffect(() => {
    getMethod = useMethod(contruct?.methodData?.filterData);
    createMethod = useMethod(contruct?.methodData?.createData);
    setFormData(contruct.formDataCreate);
    const keysOfFormData = Object?.keys(contruct?.formDataCreate);
    keysOfFormData.forEach((key) => {
      if (key === "userCreateId") {
        const userId = JSON.parse(localStorage.getItem("auth"))?.user?.id;

        if (!userId) {
          return <NotFont />;
        }
        setFormData({
          ...formData,
          [key]: userId,
        });
      } /// else if condition when have more condition want setting
      else if (false) {
        /// code logic
      }
    });

    // recall data
    console.log("recall data");
    const res = getMethod({ searchText : "" });

    res.then((data) => {
      setResultSearch(data.data);
      setIsLoading(false);
    });
    setSearchText("");
  }, [idPage]);

  // console.log(contruct);
  //   console.log(resultSearch);
  //  from data send to server

  //   console.log(formData);

  // function set formData
  const handleSetText = (event, field_id, field_name) => {
    listFieldId.forEach((idOfSchema) => {
      if (field_id === idOfSchema) {
        setFormData({
          ...formData,
          [field_name]: event.target.value,
        });
      }
    });
  };
  const handleSetSelect = (value, field_id, field_name) => {
    listFieldId.forEach((idOfSchema) => {
      if (field_id === idOfSchema) {
        setFormData({
          ...formData,
          [field_name]: value,
        });
      }
    });
  };

  // action setState
  const handleDelete = (idToDelete) => {
    let newResultSearch = resultSearch.filter((result) => {
      return result.id !== idToDelete;
    });
    setResultSearch(newResultSearch);
  };
  //
  const handleChangeData = ({ formData }) => {
    const index = resultSearch.findIndex((obj) => obj.id === formData.id);
    if (index !== -1) {
      setResultSearch([
        ...resultSearch.slice(0, index), // lay tat ca du lieu truoc index
        { ...resultSearch[index], ...formData }, // update
        ...resultSearch.slice(index + 1), // lay tat ca du lieu sau index
      ]);
    }
  };
  const updateResultSearchState = (data) => {
    // data is newRecord
    const newResultSearch = resultSearch;
    newResultSearch.push(data);
    setResultSearch(newResultSearch);
  };

  // acion connect database
  const handleCreateFormData = async () => {
    // console.log(formData);
    try {
      const response = (
        await toast.promise(createMethod({ formData: formData }), {
          pending: "creating ......",
          success: "create success 👌",
          error: "Create fail 🤯",
        })
      ).data;

      //   console.log(response);
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
      <h1 className="text-xl">{contruct?.table_title}</h1>
      <div className="w-[500px] flex flex-row my-4  ">
        <Input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <div
          onClick={async () => {
            const res = await getMethod({ searchText });
            setResultSearch(res.data);
            toast.success("Search success !", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }}
          className="flex bg-blue-500 text-white px-2 items-center rounded-md hover:bg-orange-400"
        >
          <Icons size={"20px"} iconName="AiOutlineSearch" />
        </div>
        <Button
          onClick={() => {
            setOpenModalCreate(true);
          }}
          type={contruct?.buttons?.create_button?.type}
          className="bg-blue-500 text-white ml-3 flex flex-row justify-center items-center"
        >
          <Typography className="  mr-2 text-white">
            {contruct?.buttons?.create_button?.button_text}
          </Typography>
          <Icons
            iconName={contruct?.buttons?.create_button?.button_icon}
            size="20px"
          ></Icons>
        </Button>
      </div>

      {/* table */}
      {!isLoading ? (
        <table className={styles.table}>
          <thead className="">
            <tr>
              {contruct?.table_columns.map((col, index) => {
                return (
                  <th key={index} className={styles.th}>
                    {col}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {resultSearch.map((result, index) => {
              return (
                <TrTag
                  key={index}
                  handleDelete={() => {
                    handleDelete(result.id);
                  }}
                  result={result}
                  contruct={contruct}
                  handleChangeData={handleChangeData}
                ></TrTag>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full flex justify-center items-center mt-20">
          <Spin size="large" />
        </div>
      )}
      <Modal
        title={contruct?.modal?.title}
        open={openModalCreate}
        onOk={hideModalCreate}
        onCancel={hideModalCreate}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        footer={[
          <Button
            className="bg-blue-500"
            key="submit"
            type={contruct?.buttons?.edit_button?.type}
            onClick={() => {
              handleCreateFormData();
            }}
          >
            {contruct?.buttons?.create_button?.button_text}
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
          {contruct?.modal?.schema.map((data) => {
            return (
              <Col key={data.id} span={12}>
                <Typography.Title level={5}>{data.label}</Typography.Title>
                {data.html_element === "text" ? (
                  <Input
                    onChange={(event) => {
                      handleSetText(event, data.id, data.name);
                    }}
                  />
                ) : data.html_element === "select" ? (
                  <Select
                    className="w-full"
                    onChange={(value) => {
                      handleSetSelect(value, data.id, data.name);
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

export default TableViewer;
