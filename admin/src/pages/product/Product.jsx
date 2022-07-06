import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  // const [inputs, setInputs] = useState({});
  // const [file, setFile] = useState(null);
  // const [cat, setCat] = useState([]);
  // const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  // const handleChange = (e) => {
  //   setInputs((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  // const handleClick = (e) => {
  //   e.preventDefault();
   
  //   const product = { ...inputs, };
  //   updateProduct(dispatch, "62c31ddc35770ea6366f4474", product);

  // };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Produs</h1>
        
      </div>
      <div className="productTop">
      
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
       
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Titlu</label>
            <input type="text" placeholder={product.title} />
            <label>Descriere</label>
            <input type="text" placeholder={product.desc}  />
            <label>Pret</label>
            <input type="text" placeholder={product.price} />
            {/* <label>In Stock</label> */}
            {/* <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select> */}
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button  className="productButton">Editare</button>
          </div>
        </form>
      </div>
    </div>
  );
}