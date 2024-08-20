"use server";

import { z }  from 'zod'
import { singUpSchema } from '@/components/auth/SingUp';
import { prisma } from '@/lib/prisma';
import { Argon2id } from 'oslo/password'
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { singInSchema } from '@/components/auth/SingIn';
 
export const singUpAction = async (values : z.infer<typeof singUpSchema>) => {
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
            email : values.email.toLocaleLowerCase(),
            hashedPassword
         }
      })

      const session = await lucia.createSession(user.id, {})
      const sessionCookie = await lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value , sessionCookie.attributes)
      
      return { message : 'User created successfully', success : true }

   } catch (error) {
      return { message : error, success : false }
   }

}


export const singInAction = async (values : z.infer<typeof singInSchema>) => {
   try {
         const user:any = await prisma.user.findUnique({
            where  : {
               email : values.email.toLocaleLowerCase(),
            }
         })
         
         if(!user){
            return {message : 'User not found', success : false}
         }

         const dcryptPassword = await new Argon2id().verify(user.hashedPassword , values.password)
         if(!dcryptPassword) {
            return {message : 'Password incorrect', success : false}
         }

         // Success Login
         const session = await lucia.createSession(user.id, {})
         const sessionCookie = await lucia.createSessionCookie(session.id)
         cookies().set(sessionCookie.name, sessionCookie.value , sessionCookie.attributes)
         
         return { message : 'User Login Success Fully', success : true }

      }
      catch(error){
         return {message : error, success : false}
      }
}