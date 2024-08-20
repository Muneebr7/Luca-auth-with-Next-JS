"use server";

import { z }  from 'zod'
import { singUpSchema } from '../../auth/SingUp';
import { prisma } from '@/lib/prisma';
import { Argon2id } from 'oslo/password'
 
export const singUp = async (values : z.infer<typeof singUpSchema>) => {
   try {
      const existingUser = await prisma.user.findUnique({
         where  : {
            email : values.email
         }
      })

      if(existingUser){
         return {message : 'user already exists' , success : false}
      }

      // Hash the Password
      const hashedPassword = await new Argon2id().hash(values.password)

      const user = await prisma.user.create({
         data  : {
            name : values.name,
            email : values.email,
            hashedPassword
         }
      })

   

   } catch (error) {
      
   }

}