import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string }}
  ) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.companionId) {
      return new NextResponse("Companion ID is required", { status: 400 })
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401})
    }

    if (!src || !name || !description || !instructions || !seed || !categoryId) {
      return new NextResponse("Missing Required Fields", { status: 400})
    }

    // TODO: Check for subscription
    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse("Pro subscription required", { status: 403 })
    }

    const companion = await prismadb.companion.update({
      where: {
        id: params.companionId,
        userId: user.id
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed
      }
    });

    return NextResponse.json(companion);

  } catch(err) {
    console.log("[COMPANION_PATCH]", err)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { companionId: string }}
) {
  try {
    const { userId } = auth();    // using a different way to collect user info, because we need less info, including for my reference
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const companion = await prismadb.companion.delete({
      // where the id in the URL AND the userId matches with the logged in user
      // makes sure only the creator can delete
      where: {
        userId,
        id: params.companionId
      }
    });

    return NextResponse.json(companion);
    
  } catch(err) {
    console.log('[COMPANION_DELETE]', err)
    return new NextResponse("Internal Error", { status: 500 })
  }
}