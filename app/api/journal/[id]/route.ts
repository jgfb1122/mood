import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"
import { analyze } from "@/utils/ai"
import { revalidatePath } from "next/cache"

export const PATCH = async (request: Request, { params }) => {
    const { content } = await request.json()
    const user = await getUserByClerkId()
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
              id: params.id,
              userId: user.id,
            },
          },
        data: {
            content
        },    
    })
    const analysis = await analyze(updatedEntry.content)
    const updated = await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id,
        },
        create: {
            userId: user.id,
            entryId: updatedEntry.id,
            ...analysis
        },
        update: analysis,
    })

    return NextResponse.json({ data: {...updatedEntry}, analysis: updated })
}