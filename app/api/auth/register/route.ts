import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from 'bcrypt'
import { capitalize } from "@/lib/stringModifications";
import { RegisterData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { email, password }: RegisterData = await req.json()

    // Check to see if user already exists:
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (user) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a name for the user based of the user's email:
    const name = capitalize(email.split('@')[0]);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        image: '',
        emailVerified: new Date(),
      }
    })

    return NextResponse.json(newUser);

  } catch (error: Error | any) {
    return NextResponse.json(error.message || 'Error, try again', { status: 400 })
  }
}