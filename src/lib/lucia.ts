import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { prisma } from './prisma'
import { cookies } from 'next/headers'


const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
    sessionCookie : {
        name : 'lucia-auth',
        expires : false,
        attributes : {
            secure : process.env.NODE_ENV === "production"
        }
    }
}) 

export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
    if(!sessionId){
        return null
    }
    // Validate the session with Lucia
    const { session , user } = await lucia.validateSession(sessionId)

    try {
        if(session && session.fresh) {
            // Generate the Fresh Session
                const sessionCookie = await lucia.createSessionCookie(session.id)
                cookies().set(sessionCookie.name, sessionCookie.value , sessionCookie.attributes)
        }
        if(!session){
            const blankCookie = await lucia.createBlankSessionCookie()
            cookies().set(blankCookie.name, blankCookie.value , blankCookie.attributes)
        }
    } catch (error) {
        return {message : error , status : false}
    }

    const dbUser = await prisma.user.findUnique({
        where : {
            id : user?.id
        },
        select : {
            name : true,
            email : true,
        }
    })


    return dbUser


}

