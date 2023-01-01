import { Box, Button } from "@material-ui/core";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import Icon from "./components/Icon/Icon";
import { auth, db } from "./firebase/firebase";
import "./Orders.css";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          setOrders((prev) => [...prev, order]);
        });
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    };
    getOrders();
  }, []);

  const renderEmptyTable = () => (
    <tr>
      <td colSpan={12} className="empty-row">
        <small>{loading ? "Loading..." : "No orders found."}</small>
      </td>
    </tr>
  );

  const navigate = useNavigate();

  return (
    <div className="orders-container">
      <div className="nav">
        <span className="logo-name" onClick={() => navigate("/")}>
          <RiceBowlIcon
            sx={{ fontSize: "28px", color: "#6d7ae0", mr: "10px" }}
          />
          Shoyo's Creamery
        </span>
        <Button
          variant="contained"
          color="primary"
          onClick={() => auth.signOut()}
          size={"medium"}
        >
          Sign Out
        </Button>
      </div>
      <div className="orders-overlay">
        <h2>Order History</h2>
        <div className="orders">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Instructions</th>
                <th>Items Ordered</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length
                ? orders?.map((order, index) => {
                    const items = order.items.map(
                      (item, index) => `${item.name} - ${item.qty} `
                    );
                    const isActive = index === isOpen;

                    return (
                      <>
                        <tr
                          onClick={() => setIsOpen(isActive ? null : index)}
                          className="table-row"
                          key={index}
                          style={{ borderWidth: isActive ? 0 : "1px" }}
                        >
                          <td colSpan={1} className="arrow-column">
                            <Icon
                              icon="arrow"
                              fill="#6d7ae0"
                              width={8}
                              height={15}
                              style={{
                                transform: isActive ? "rotate(90deg)" : "",
                                marginRight: "19px",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all .3s ease",
                              }}
                            />
                            {order.fullName}
                          </td>
                          <td>{order.email}</td>
                          <td>{order.phone}</td>
                          <td className="items-column">
                            {order.instructions || "-"}
                          </td>
                          <td className="items-column">{items}</td>
                        </tr>
                        {isActive ? (
                          <tr>
                            <td colSpan={12} className="hidden-table-content">
                              <Box
                                sx={{
                                  py: ["30px", "24px", "24px"],
                                }}
                                className="grid grid-cols-7 gap-4 "
                              >
                                <ul>
                                  <li className="data-row">
                                    <div className="data-title">
                                      Full Name:{" "}
                                    </div>
                                    <span className="data-content">
                                      {order.fullName}
                                    </span>
                                  </li>
                                  <li className="data-row">
                                    <div className="data-title">Email: </div>
                                    <span className="data-content">
                                      {order.email}
                                    </span>
                                  </li>
                                  <li className="data-row">
                                    <div className="data-title">
                                      Phone Number:{" "}
                                    </div>
                                    <span className="data-content">
                                      {order.phone}
                                    </span>
                                  </li>
                                  <li className="data-row">
                                    <div className="data-title">
                                      Instructions:{" "}
                                    </div>
                                    <span className="data-content">
                                      {order.instructions || "-"}
                                    </span>
                                  </li>
                                  <li className="data-row">
                                    <div className="data-title">
                                      Items bought:{" "}
                                    </div>
                                    <span className="data-content">
                                      {items}
                                    </span>
                                  </li>
                                </ul>
                              </Box>
                            </td>
                          </tr>
                        ) : null}
                      </>
                    );
                  })
                : renderEmptyTable()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
