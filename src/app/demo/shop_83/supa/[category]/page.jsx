"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Wrapper from "../../_wrapper/Shop_xx";
import Product_xx from "../../_components/Product_xx";
import { supabase } from "@/db/clientSupabase";

const FetchProductsByCategory_xx = () => {
  const [shop_xx, setShop_xx] = useState([]);
  const parms = useParams();
  const category = parms.category;
  //console.log('category:',category);

  const fetchShopFromSupabase = async () => {
    try {
      console.log("Fetching category for:", category);

      // DEBUG: Check if we can read the table at all (RLS check)

      const { data: allCats, error: allCatsError } = await supabase
        .from("category2_83")
        .select("*");

      console.log("DEBUG: All categories:", allCats);

      if (allCatsError)
        console.error("DEBUG: Error fetching all:", allCatsError);
      let { data: categoryData, error: categoryError } = await supabase

        .from("category2_83")
        .select("cid")
        .ilike("cname", category)
        .maybeSingle();

      console.log("Category Data:", categoryData);

      console.log("Category Error:", categoryError);

      if (categoryError) throw categoryError;

      if (categoryData) {
        const cid = categoryData.cid;

        let { data: shopData, error: shopError } = await supabase

          .from("shop2_83")
          .select("*")
          .eq("cat_id", cid);

        if (shopError) throw shopError;

        console.log("Fetched shop data:", shopData);
        setShop_xx(shopData || []);
      } else {
        console.log("No category found for:", category);
        setShop_xx([]);
      }
    } catch (error) {
      console.error("Error fetching shop data:", error);

      setShop_xx([]);
    }
  };

  useEffect(() => {
    fetchShopFromSupabase();
  }, [category]);

  return (
    <Wrapper>
      <div className="shop-page">
        <div className="section-title">
          <h3> P1_StaticPage_83, </h3>
          <h4 className="text-center"> Lai,213410383 </h4>
        </div>
        <div className="collection-page">
          <h1 className="title">Womens</h1>
          <div className="items">
            {shop_xx?.map((item) => {
              const { pid, pname, price, img_url } = item;
              return (
                <Product_xx
                  key={pid}
                  className="item"
                  img_url={img_url}
                  pname={pname}
                  price={price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default FetchProductsByCategory_xx;
