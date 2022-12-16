import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = async (e) => {
    e.preventDefault();
    try {
      const data = { 
        imageUrl,	
        captions,	
        updatedAt: "updatePhotos",

      // TODO: answer here
    }
  
    await fetch(`http://localhost:3001/photos/${id}`, {
    method: "PATCH",
    headers: {
      // HTTP headers
      "Content-Type": "application/json", // type data yang dikirim
    },
    body: JSON.stringify(data), // data yang dikirim
  })
  navigate("/photos") 
} catch (error) {
  console.log(error);
}
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/photos/${id}`);
        const responseJson = await response.json();
        setCaptions(responseJson.captions);
        setImageUrl(responseJson.imageUrl);
        
        setLoading(false);
        
      } catch (error) {
        console.log(error);
      }
      setLoading(false);

      
    };
    loadData();
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
