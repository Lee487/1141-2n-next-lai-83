'use client';
import { useState,useEffect }  from 'react';
import { useParams} from 'next/navigation';

import Wrapper from '../../_wrapper/Shop_xx';
import Product_xx from '../../_components/Product_xx';
import { supabase } from '@/db/clientSupabase';
 
const FetchProductsByCategory_xx = () => {
    const [shop_xx, setShop_xx] = useState([]);
    const parms = useParams();
    const category=parms.category;
    //console.log('category:',category);

    const fetchShopFromSupabase = async () => {
        try {
          let { data , error } = await supabase
  .from('category2_83')
  .select('*, shop_xx(*)').eq('cname',category);
        console.log('data',data[0].shop2_xx);
        if(data.length !== 0){
        setShop_xx(data[0].shop2_xx);
        }
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        fetchShopFromSupabase();
    }, [category]);

  return (
    <Wrapper>
      <div className='shop-page'>
        <div className='section-title'>
          <h3> P1_StaticPage_83, </h3>
          <h4 className='text-center'> Lai,213410383 </h4>
        </div>
        <div className='collection-page'>
          <h1 className='title'>Womens</h1>
          <div className='items'>
            {shop_xx?.map((item) => {
              const { pid, pname, price, img_url } = item;
              return (
                <Product_xx
                key={pid} className='item'
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