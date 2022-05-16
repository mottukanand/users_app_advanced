import * as React from "react";
import Header from "pages/header";
import { getUsers } from "services/usersServices";
// import { Container, Row, Col, Card } from "react-bootstrap";
import Loader from "shared/loader.js";
import { Card, Row, Col } from "antd";
import CardComponent from "./cardComponent";
import {
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
} from "@ant-design/icons";
import UserModal from "./userModal";

const { Meta } = Card;
const titleStyle = { fontWeight: "bold", marginBottom: "0.5rem" };
const colStyle = { textAlign: "-webkit-center", marginBottom: "2rem" };
function Users() {
  const [usersData, setUsersData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [toggleModal, setToggleModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState("");
  React.useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((response) => {
        if (response && response.data && response.data.length) {
          let dat = response.data.map((val) => {
            val.selected = false;
            return val;
          });
          setUsersData(dat);
        } else {
          setUsersData([]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setUsersData([]);
        setIsLoading(false);
      });
  }, []);

  const deleteItem = (data) => {
    let filteredData = usersData.filter((val) => val.id !== data.id);
    setUsersData(filteredData);
  };

  const handleUsersChange = (data) => {
    let dat = JSON.parse(JSON.stringify(usersData));
    dat.forEach((element) => {
      if (element.id === data.id) {
        element.name = data.name;
        element.email = data.email;
        element.phone = data.phone;
        element.website = data.website;
      }
    });
    setUsersData(dat);
  };

  const handleSelected = (data) => {
    let dat = JSON.parse(JSON.stringify(usersData));
    dat.forEach((element) => {
      if (element.id === data.id) {
        element.selected = !element.selected;
      }
    });
    setUsersData(dat);
  };

  return (
    <>
      {/* <Header />
      <CardComponent/> */}
      {isLoading ? (
        <Loader />
      ) : (
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginTop: "3rem" }}
        >
          {usersData && usersData.length
            ? usersData.map((user, index) => (
                <Col
                  className="gutter-row"
                  xs={24}
                  xl={6}
                  span={6}
                  key={index}
                  style={colStyle}
                >
                  <Card
                    actions={[
                      user.selected ? (
                        <HeartFilled
                          onClick={() => handleSelected(user)}
                          style={{ color: "red" }}
                        />
                      ) : (
                        <HeartOutlined
                          key="heart"
                          onClick={() => handleSelected(user)}
                        />
                      ),
                      <EditOutlined
                        key="edit"
                        onClick={() => {
                          setToggleModal(true);
                          setSelectedUser(user);
                        }}
                      />,
                      <DeleteOutlined
                        key="delete"
                        onClick={() => deleteItem(user)}
                      />,
                    ]}
                    hoverable
                    style={{ width: 300, textAlign: "left" }}
                    cover={
                      <img
                        alt="example"
                        src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                      />
                    }
                  >
                    <div style={titleStyle}>{user.name}</div>

                    <div className="mb-3" style={{ textAlign: "left" }}>
                      <MailOutlined /> {user.email}
                    </div>
                    <div className="mb-3">
                      <PhoneOutlined /> {user.phone}
                    </div>
                    <div className="mb-3">
                      <GlobalOutlined /> {user.website}
                    </div>
                  </Card>
                </Col>
              ))
            : null}
        </Row>
      )}

      {toggleModal && (
        <UserModal
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          selectedUser={selectedUser}
          handleUsersChange={handleUsersChange}
        />
      )}
    </>
  );
}

export default Users;
