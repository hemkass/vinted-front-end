import "../App.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Publish = () => {
  const token = Cookies.get("Login");
  const [data, setData] = useState();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [files, setFiles] = useState({});
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [etat, setEtat] = useState("");
  const [couleur, setCouleur] = useState("");
  const [ville, setVille] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (event) => {
    console.log("ce que j'envoie", file);
    event.preventDefault();
    try {
      const formData = new FormData();

      Object.keys(files).forEach((file) => {
        formData.append("picture", files[file]);
      });

      formData.append("title", title);
      formData.append("description", title);
      formData.append("picture", file);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("color", couleur);
      formData.append("size", size);
      formData.append("condition", etat);
      formData.append("city", ville);

      const response = await axios.post(
        /*"https://myvintedapp.herokuapp.com/offer/publish"  */ "http://localhost:4000/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Vends ton article </h1>
        <div>
          <input
            multiple={true}
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
          ></input>
          {console.log("mon fichier", file)}
        </div>
        <div>
          <p>
            <label>
              Titre :
              <input
                type="text"
                name="titre"
                placeholder="ex chemise verte Sézanne"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              ></input>
            </label>
          </p>
          <p>
            <label>
              Décris ton article :
              <input
                type="text"
                name="description"
                placeholder="ex porté quelques fois, taille correctement"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></input>
            </label>
          </p>
        </div>
        <div>
          <p>
            <label>
              Marque :
              <input
                type="text"
                name="Marque"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              ></input>
            </label>
          </p>
          <p>
            <label>
              Taille :
              <input
                type="text"
                name="Taille"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              ></input>
            </label>
          </p>
          <p>
            <label>
              Couleur:
              <input
                type="text"
                name="Couleur"
                value={couleur}
                onChange={(event) => {
                  setCouleur(event.target.value);
                }}
              ></input>
            </label>
          </p>
          <p>
            <label>
              Ville :
              <input
                type="text"
                name="ville"
                value={ville}
                onChange={(event) => {
                  setVille(event.target.value);
                }}
              ></input>
            </label>
          </p>
          <p>
            <label>
              Etat:
              <select
                type="text"
                name="Etat"
                value={brand}
                onChange={(event) => {
                  setEtat(event.target.value);
                }}
              >
                <option value="neufavec"> neuf avec étiquette </option>
                <option value="neufsans"> neuf sans étiquette </option>
                <option value="Très bon"> Très bon état </option>{" "}
                <option value="bon"> bon état </option>
                <option value="bof">état satisfaisant </option>
              </select>
            </label>
          </p>
          <p>
            <input type="text" name="Ville"></input>
          </p>
        </div>
        <div>
          <label>
            Prix :
            <input
              type="number"
              value={price}
              placeholder="ex 22, merci de ne pas le signe €"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            ></input>
          </label>
        </div>
        <button type="submit"> ajouter</button>
      </form>
      {isLoading === false && <div> </div>}
    </div>
  );
};

export default Publish;
