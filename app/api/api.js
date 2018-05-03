/*
 * @Author: Tmac-1 
 * @Date: 2018-04-18 00:15:51 
 * @Last Modified by: Tmac-1
 * @Last Modified time: 2018-05-03 15:19:23
 */

 import Server from './server';

 class API extends Server{

  /**
   *  用途：上传图片
   *  @url  https://elm.cangdu.org/v1/addimg/shop
   *  返回status为1表示成功
   *  @method post
   *  @return {promise}
   */
  
   async uploadImg(params={}){
            try{
                let result = await this.axios('post','//elm.cangdu.org/v1/addimg/shop',params)
                if(result && result.status === 1){
                  return result;
                }else{
                    let err = {
                        tip: '上传图片失败',
                        response: result,
                        data: params,
                        url: '//elm.cangdu.org/v1/addimg/shop',
                      }
                    throw err  
                }
            }catch(err){
                throw err
            }
   }

   /**
    *   用途：获取记录数据
    *   @url  @url http://cangdu.org/shopro/data/record
    *   返回http_code为200表示成功
    *   @method get
    *   @return {promise}
   */
   async getRecord( params ={}){
       try {
          let   result  = await this.axios('get', `/shopro/data/record/${params.type}`)
          if( result && (result.data instanceof Object) && result.http_code === 200){
              return result.data;
          } else{
            let err = {
                tip: '获取记录数据失败',
                response: result,
                data: params,
                url: 'https://api.cangdu.org/shopro/data/record',
              }
              throw err;
          }
         
        }catch(err){
           throw err
       }
   }


  /**
   *  用途：获取商品数据
   *  @url https://api.cangdu.org/shopro/data/products
   *  返回http_code为200表示成功
   *  @method get
   *  @return {promise}
   */

   async getProduction(params ={}){
      try {
          let result = await this.axios('get','/shopro/data/products',params)
          if(result && (result.data instanceof Object) && result.http_code ===200){
              return result.data.data || []
          }else{
              let err ={
                tip: '获取商品数据失败',
                response: result,
                data: params,
                url: 'https://api.cangdu.org/shopro/data/products', 
              }
              throw err;
          }

      }catch(err){
          throw err
      }
   }

  /**
   *  用途：获取佣金数据
   *  @url https://api.cangdu.org/shopro/data/balance
   *  返回http_code为200表示成功
   *  @method get
   *  @return {promise}
   */
 
   async getBalance(params = {} ){
       try{
           let result = await this.axios('get','/shopro/data/balance',params)
           if(result && (result.data instanceof Object) && result.http_code === 200){
               return result.data.data || {}
           }else{
                let err = {
                    tip: '获取佣金数据失败',
                    response: result,
                    data: params,
                    url: 'https://api.cangdu.org/shopro/data/balance',
                }
                throw err;
           }
      
        }catch(err){
          throw err
       }
   }

   // 测试用
   async testDevServer(params ={}){
       try{
           let result = await this.axios('get','/nsi-1.0/manager/talent/list.do',params)
           return result;
       }catch(err){
           throw err
       }
     
   }    

   
 }

 export default new API()