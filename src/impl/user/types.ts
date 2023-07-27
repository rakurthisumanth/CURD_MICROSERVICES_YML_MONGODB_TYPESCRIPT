
import { DeleteUserResponse, GetUserResponse, UpdateUserResponse, UserApi, UserCreateResponse } from "../../../dict/api/user/types";
import { Api } from "../../../dict/models";
import {collections} from '../../../src/admin/types'


export class UserApiImpl implements UserApi {
    getUser(): Promise<GetUserResponse>  {
        return new Promise<GetUserResponse>((resolve,reject)=>{
            collections.users!.find({}).toArray(function (err: any,result:any){
                console.log(result,"resultttttttttttttttttttttttttttttt")
                if(err) {
                    const response=<GetUserResponse>{
                        status: 400,
                       body:{message: `something went wrong`},
                    }
                    resolve(response)                   
                }
                const response=<GetUserResponse>{
                    status:201,
                    body: result
                }
                resolve(response)    
            })  
        })   
    }

 deleteUser(email:string):Promise<DeleteUserResponse>{
    return new Promise<DeleteUserResponse>((resolve,reject)=>{
        collections.users!.deleteOne(
            {email: email},
            function(err: any,result: any){
                if(err){
                    const response=<DeleteUserResponse>{
                        status:400,
                        body:{message:`someting went wrong`}
                    }
                    resolve(response)
                }
                const response=<DeleteUserResponse>{
                    status:201,
                    body:{
                        message:`delete User Sucessfully`
                    }
                }
                resolve(response)
            }
        )
        
    })
 }

 updateUser (email: string, request: Api.BODYDATA | undefined) : Promise<UpdateUserResponse>
 {
    return new Promise<UpdateUserResponse>((resolve,reject)=>{
        collections.users!.updateOne(
            {email:email},
            {$set:request},
            function(err:any,result: any){
                if(err){
                    const response=<UpdateUserResponse>{
                        status: 400,
                        body:{message:`Somting Went Wrong`}
                    }
                    resolve(response)
                }
                const response=<UpdateUserResponse>{
                    status:201,
                    body:{message:`Update User Sucessfully`}
                }
                resolve(response)
               
            }    
        )

    })
 }


 userCreate(request: Api.BODYDATA | undefined): Promise<UserCreateResponse>
 {
    return new Promise<UpdateUserResponse>((resolve,reject)=>{
        console.log("firstttttt")
        collections.users!.findOne(
            {email:request?.email},
            function(err:any,result:any){
                console.log(result,"reesultttttttttttttttttt")
                if(result){
                    const response=<UpdateUserResponse>{
                        status:400,
                        body:{message:`User Already Created`}
                    }
                    resolve(response)
                }
                else{
                    console.log("Secondddddddddddddddddddddddddddddddddddddddd")

                    collections.users!.insertOne(
                        {phonenumber:request?.phonenumber,email:request?.email},
                        function(err:any,result:any){
                            console.log(err,"erorororororoor")
                            console.log(result,"resulttttttttttttttttttttttt")
                          if(err){
                            const response=<UpdateUserResponse>{
                                status:400,
                                body:{message:`Someting Went Wrong`}
                            }
                            resolve(response)
                          }
                          else{
                            const response=<UpdateUserResponse>{
                                status:201,
                                body:{message:`Create User Sucessfuly`}
                            }
                            resolve(response)
                          }
                            
                        }

                    )
                }
            }
        )
    })
 }
}

   
  








