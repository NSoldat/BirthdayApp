import React, { useCallback, useEffect, useState } from "react";
import ListItem from "./ListItem";

const ItemList = (props) => {
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/items");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const items = await response.json();
      setItemList(items);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  let content = <p>Found no items.</p>;
  if (error) {
    content = <p>{error}</p>;
  }

  const handler = (id) => {
    console.log("Handler function");
    console.log(id);
    props.addToWishList(id);
  }

  if (itemList.length > 0) {
    content = (
      <ul>
        {itemList.map((item) => (
          <ListItem
            addToWishList={handler}
            itemId={item._id}
            existingItems={true}
            key={item._id}
            name={item.name}
            urlLink={item.urlLink}
          ></ListItem>
        ))}
      </ul>
    );
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return <>
  {content}
  </>;
};

export default ItemList;
